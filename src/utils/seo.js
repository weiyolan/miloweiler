const SITE_URL = 'https://miloweiler.com';

export function canonicalUrl(locale, path = '') {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

export function ogImageUrl(baseUrl) {
  return `${baseUrl}?w=1200&h=630&fit=crop`;
}

// Resolves the editable SEO values from Sanity (a `seo` object) for the active
// locale, falling back to the page's existing defaults when a field is empty.
export function resolveSeo(seo, locale, fallback = {}) {
  return {
    title: seo?.seoTitle?.[locale] || fallback.title || '',
    description: seo?.seoDescription?.[locale] || fallback.description || '',
    image: seo?.seoImage?.asset?.url ? ogImageUrl(seo.seoImage.asset.url) : (fallback.image || null),
  };
}
