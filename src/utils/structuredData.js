import { SITE_URL, SITE_NAME, canonicalUrl } from "@/utils/seo";

// schema.org JSON-LD shared across pages. Entities get stable @ids so Google can join them up
// (the photographer on /about = the creator of every project = the founder of the business).
export const PERSON_ID = `${SITE_URL}/#milo`;
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const SAME_AS = [
  "https://www.instagram.com/miloweiler/",
  "https://unsplash.com/@miloweiler",
  "https://www.linkedin.com/in/mwphotography",
];

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Hof Savelkoul 40",
  addressLocality: "Mortsel",
  postalCode: "2640",
  addressCountry: "BE",
};

const AREA_SERVED = [
  { "@type": "City", name: "Antwerp" },
  { "@type": "City", name: "Brussels" },
  { "@type": "Country", name: "Belgium" },
];

const JOB_TITLE = { en: "Photographer", fr: "Photographe", nl: "Fotograaf" };

export function person(locale = "en", image) {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Milo Weiler",
    jobTitle: JOB_TITLE[locale] || JOB_TITLE.en,
    url: SITE_URL,
    ...(image ? { image } : {}),
    sameAs: SAME_AS,
    address: ADDRESS,
    knowsAbout: ["Set photography", "Portrait photography", "Corporate photography", "Event photography", "Product photography", "Fine art photography"],
  };
}

export function business(image) {
  return {
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    url: SITE_URL,
    telephone: "+32476506209",
    email: "milo.weiler@gmail.com",
    address: ADDRESS,
    areaServed: AREA_SERVED,
    ...(image ? { image } : {}),
    sameAs: SAME_AS,
    founder: { "@id": PERSON_ID },
  };
}

export function website() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["en", "fr", "nl"],
    publisher: { "@id": BUSINESS_ID },
  };
}

// items: [{ name, path }] after Home; paths are locale-less ("/set-photography").
export function breadcrumb(locale, items) {
  const home = { en: "Home", fr: "Accueil", nl: "Home" }[locale] || "Home";
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: home, path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonicalUrl(locale, item.path === "/" ? "" : item.path),
    })),
  };
}

// Image licence metadata: lets Google Images show "Licensable", the credit and the copyright.
export function imageObject(locale, url, caption) {
  return {
    "@type": "ImageObject",
    contentUrl: url,
    ...(caption ? { caption } : {}),
    creator: { "@id": PERSON_ID },
    creditText: "Milo Weiler",
    copyrightNotice: "© Milo Weiler",
    copyrightHolder: { "@id": PERSON_ID },
    license: canonicalUrl(locale, "/terms-of-use"),
    acquireLicensePage: canonicalUrl(locale, "/contact"),
  };
}

// Wraps nodes in a single @graph script payload, escaped for safe inlining.
export function jsonLd(...nodes) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes.filter(Boolean) }).replace(/</g, "\\u003c");
}
