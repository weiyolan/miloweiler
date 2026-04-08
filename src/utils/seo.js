const SITE_URL = 'https://miloweiler.com';

export function canonicalUrl(locale, path = '') {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

export function ogImageUrl(baseUrl) {
  return `${baseUrl}?w=1200&h=630&fit=crop`;
}
