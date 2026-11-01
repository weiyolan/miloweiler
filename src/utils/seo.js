export const SITE_URL = 'https://miloweiler.com';
export const SITE_NAME = 'Milo Weiler Photography';

// Last-resort share image so every page always has a preview on WhatsApp,
// Facebook, LinkedIn, X, iMessage, Slack, ... (1200×630 JPG via the Sanity CDN).
export const DEFAULT_OG_IMAGE = 'https://cdn.sanity.io/images/erjr84ua/production/fe1e8cf935c84727fece77a78415feb50aa19168-1200x798.jpg?w=1200&h=630&fit=crop&fm=jpg&q=80';

// Open Graph wants language_TERRITORY.
export const OG_LOCALES = { en: 'en_GB', fr: 'fr_BE', nl: 'nl_BE' };

export function canonicalUrl(locale, path = '') {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

// Builds a 1200×630 JPG share image from a Sanity CDN url (or an image object
// `{ asset: { url }, hotspot }`). JPG + q80 keeps it well under WhatsApp's
// ~300KB preview limit; WhatsApp/Facebook don't reliably render WebP/AVIF/PNG
// originals of several MB. When a hotspot is set, the crop is centred on it.
export function ogImageUrl(source) {
  const url = typeof source === 'string' ? source : source?.asset?.url;
  if (!url) return null;
  const base = url.split('?')[0];
  const params = new URLSearchParams({ w: '1200', h: '630', fit: 'crop', fm: 'jpg', q: '80' });
  const hotspot = typeof source === 'object' ? source?.hotspot : null;
  if (hotspot && typeof hotspot.x === 'number' && typeof hotspot.y === 'number') {
    params.set('crop', 'focalpoint');
    params.set('fp-x', hotspot.x.toFixed(4));
    params.set('fp-y', hotspot.y.toFixed(4));
  }
  return `${base}?${params.toString()}`;
}

// Resolves the editable SEO values from Sanity (a `seo` object) for the active
// locale, falling back to the page's existing defaults when a field is empty.
export function resolveSeo(seo, locale, fallback = {}) {
  return {
    title: seo?.seoTitle?.[locale] || fallback.title || '',
    description: seo?.seoDescription?.[locale] || fallback.description || '',
    image: ogImageUrl(seo?.seoImage) || fallback.image || DEFAULT_OG_IMAGE,
  };
}
