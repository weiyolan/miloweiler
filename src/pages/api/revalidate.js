/**
 * Sanity webhook → on-demand revalidation (ISR). Milo publishes in the Studio →
 * the affected pages are re-rendered within seconds, no Netlify rebuild needed.
 * Setup (webhook URL, filter, projection, secret): README → "Publish → live".
 *
 * - `project` changes refresh only what shows that project: its page (new + old
 *   slug/category), its category siblings (prev/next links), its category page(s),
 *   Highlighted, home and about.
 * - Page content (contact, about, legal, SEO) refreshes just those pages.
 * - Anything else (category names, business info, theme, fonts — used in _app /
 *   _document on every page — or an unknown type) refreshes the whole site.
 */
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { createClient } from "next-sanity";
import { config as sanityConfig } from "../../../lib/config";
import { ALL_CATEGORY_SLUGS, CATEGORY_MAP, RESERVED_SLUGS } from "@/utils/categories";

// Raw body is needed to check the signature.
export const config = { api: { bodyParser: false } };

// Never the API CDN here: it may still hold the pre-publish version for a moment.
const client = createClient({ ...sanityConfig, useCdn: false });

const LOCALES = ["en", "fr", "nl"];
const DEFAULT_LOCALE = "en";
const STATIC_PAGES = ["/", "/about", "/contact", "/legal-notice", "/terms-of-use", "/cookie-notice"];
const CATEGORY_PAGES = ALL_CATEGORY_SLUGS.filter((s) => !RESERVED_SLUGS.includes(s)).map((s) => `/${s}`);
// Asset documents change with every upload; the project/page referencing them fires its own webhook.
const IGNORED_TYPES = new Set(["sanity.imageAsset", "sanity.fileAsset"]);
const CONCURRENCY = 8;

// Documents only used by specific pages (everything not listed → whole site).
const PAGES_BY_TYPE = {
  contactPageCDS: ["/contact"],
  contactPageTBS: ["/contact"],
  contactPageAOS: ["/contact"],
  contactPagePSS: ["/contact"],
  contactPagePFS: ["/contact"],
  contactPageGIS: ["/contact"],
  contactPageFaq: ["/contact"],
  mainPageXIntro: ["/about"],
  mainPageXXX: ["/about"],
  mainPageYYY: ["/about"],
  legalNotice: ["/legal-notice"],
  termsOfUse: ["/terms-of-use"],
  cookieNotice: ["/cookie-notice"],
  pageSeo: ["/", "/about", "/contact"],
  categorySeo: CATEGORY_PAGES,
};

/** '/about' → ['/about', '/fr/about', '/nl/about'] ('/' → '/', '/fr', '/nl'). */
function localized(path) {
  return LOCALES.map((l) => (l === DEFAULT_LOCALE ? path : path === "/" ? `/${l}` : `/${l}${path}`));
}

const projectPath = (cat, slug) => (CATEGORY_MAP[cat] && slug ? `/${CATEGORY_MAP[cat]}/${slug}` : null);

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  return Buffer.concat(chunks).toString("utf8");
}

/** Paths to refresh, split in `paths` (always render) and `maybeGone` (only if they were generated before). */
async function affectedPaths(doc) {
  if (PAGES_BY_TYPE[doc._type]) return { paths: PAGES_BY_TYPE[doc._type], maybeGone: [] };

  const projects = await client.fetch(`*[_type == "project" && defined(slug.current)]{"slug": slug.current, cat}`);
  const allProjectPaths = projects.map((p) => projectPath(p.cat, p.slug)).filter(Boolean);

  if (doc._type !== "project") {
    return { paths: [...STATIC_PAGES, ...CATEGORY_PAGES, ...allProjectPaths], maybeGone: [] };
  }

  const cats = new Set([doc.cat, doc.beforeCat].filter((c) => CATEGORY_MAP[c]));
  const now = projectPath(doc.cat, doc.slug);
  const before = projectPath(doc.beforeCat, doc.beforeSlug);
  const siblings = projects.filter((p) => cats.has(p.cat)).map((p) => projectPath(p.cat, p.slug)).filter(Boolean);

  const paths = new Set(["/", "/about", "/highlighted", ...[...cats].map((c) => `/${CATEGORY_MAP[c]}`), ...siblings]);
  if (now) paths.add(now);
  // Old URL after a slug/category change or a delete/unpublish → re-render it as a 404,
  // but only if it was generated before (don't create cache entries for random paths).
  const maybeGone = before && !paths.has(before) ? [before] : [];
  return { paths: [...paths], maybeGone };
}

async function runLimited(tasks, limit) {
  const results = [];
  let i = 0;
  const worker = async () => {
    while (i < tasks.length) {
      const idx = i++;
      results[idx] = await tasks[idx]();
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker));
  return results;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "POST only" });

  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return res.status(500).json({ message: "SANITY_REVALIDATE_SECRET is not set" });

  const body = await readBody(req);
  const signature = req.headers[SIGNATURE_HEADER_NAME];
  if (!(await isValidSignature(body, signature, secret))) {
    return res.status(401).json({ message: "Invalid signature" });
  }

  let doc;
  try {
    doc = JSON.parse(body);
  } catch {
    return res.status(400).json({ message: "Bad body" });
  }
  if (!doc?._type || IGNORED_TYPES.has(doc._type)) {
    return res.status(200).json({ revalidated: false, type: doc?._type ?? null });
  }

  const { paths, maybeGone } = await affectedPaths(doc);
  const jobs = [
    ...paths.flatMap(localized).map((p) => ({ path: p, opts: {} })),
    ...maybeGone.flatMap(localized).map((p) => ({ path: p, opts: { unstable_onlyGenerated: true } })),
  ];

  const failed = (
    await runLimited(
      jobs.map(({ path, opts }) => async () => {
        try {
          await res.revalidate(path, opts);
          return null;
        } catch (err) {
          console.error(`[revalidate] ${path}:`, err?.message || err);
          return path;
        }
      }),
      CONCURRENCY
    )
  ).filter(Boolean);

  // 2xx even with a few failures: Sanity would otherwise retry the whole batch.
  // Failed pages keep serving their previous version (and refresh on the daily fallback).
  return res.status(200).json({
    revalidated: true,
    type: doc._type,
    count: jobs.length - failed.length,
    failed,
  });
}
