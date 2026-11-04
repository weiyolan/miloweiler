import client from "../../lib/sanity";
import { CATEGORY_MAP, ALL_CATEGORY_SLUGS, getCatFromSlug } from "@/utils/categories";
import { canonicalUrl } from "@/utils/seo";
import { imageVanityName, withVanity } from "@/utils/a11y";

const LOCALES = ["en", "fr", "nl"];

const localeUrl = (locale, path) => canonicalUrl(locale, path);

const escapeXml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

// One <url> per locale, each listing all language alternates (+ x-default).
// `lastmod` is the real content date from Sanity (_updatedAt), not the build time: a lastmod that changes on
// every deploy teaches Google to ignore it. `images` adds an image-sitemap entry per photo (Google Images).
function urlEntries(path, { lastmod, images = [] } = {}) {
  const alternates = [
    ...LOCALES.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${localeUrl(l, path)}"/>`),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${localeUrl("en", path)}"/>`,
  ].join("");
  const imageTags = images.map((src) => `<image:image><image:loc>${escapeXml(src)}</image:loc></image:image>`).join("");
  return LOCALES.map(
    (l) =>
      `<url><loc>${localeUrl(l, path)}</loc>${alternates}${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}${imageTags}</url>`
  ).join("\n");
}

const latest = (dates) => dates.filter(Boolean).sort().at(-1);

function generateSiteMap({ projects, pages, highlightedEnabled }) {
  const allProjectDates = projects.map((p) => p.updatedAt);
  const categorySlugs = ALL_CATEGORY_SLUGS.filter((slug) => slug !== "highlighted" || highlightedEnabled);

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries("/", { lastmod: latest([...allProjectDates, pages.home]) })}
${urlEntries("/about", { lastmod: pages.about })}
${urlEntries("/contact", { lastmod: pages.contact })}
${categorySlugs
  .map((slug) => {
    const cat = getCatFromSlug(slug);
    const inCat = slug === "highlighted" ? projects.filter((p) => p.highlighted) : projects.filter((p) => p.cat === cat);
    return urlEntries(`/${slug}`, { lastmod: latest(inCat.map((p) => p.updatedAt)) });
  })
  .join("\n")}
${projects
  .filter((p) => CATEGORY_MAP[p.cat] && p.slug)
  .map((p) => urlEntries(`/${CATEGORY_MAP[p.cat]}/${p.slug}`, { lastmod: p.updatedAt, images: p.images.filter(Boolean).map((src, i) => withVanity(src, imageVanityName(p.slug, i + 1, "milo-weiler-photography"))) }))
  .join("\n")}
</urlset>
`;
}

export default function SiteMap() {}

export async function getServerSideProps({ res }) {
  const data = await client.fetch(`{
    'projects': *[_type == "project"]|order(date desc){
      'slug': slug.current, cat, highlighted, 'updatedAt': _updatedAt,
      'images': [mainImage.image.asset->url] + otherImages[].image.asset->url
    },
    'pages': {
      'home': *[_type in ["homepageConfig", "pageSeo"]]|order(_updatedAt desc)[0]._updatedAt,
      'about': *[_type in ["mainPageXIntro", "mainPageXXX", "mainPageYYY", "pageSeo"]]|order(_updatedAt desc)[0]._updatedAt,
      'contact': *[_type match "contactPage*" || _type == "pageSeo"]|order(_updatedAt desc)[0]._updatedAt
    },
    'highlightedEnabled': *[_type == "homepageConfig" && _id == "homepageConfig"][0].highlighted.enabled
  }`);
  const sitemap = generateSiteMap({
    projects: data.projects || [],
    pages: data.pages || {},
    highlightedEnabled: data.highlightedEnabled !== false,
  });

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.statusCode = 200;
  res.end(sitemap);

  return { props: {} };
}
