// Sanity cat enum value → URL slug
const CATEGORY_MAP = {
  bts: 'set-photography',
  docu: 'portraits',
  events: 'corporate-events',
  studio: 'products',
  art: 'personal-work',
};

// URL slug → Sanity cat enum value
const SLUG_TO_CAT = Object.fromEntries(
  Object.entries(CATEGORY_MAP).map(([k, v]) => [v, k])
);

// Genre category URL slugs (excludes highlighted)
const CATEGORY_SLUGS = Object.values(CATEGORY_MAP);

// All category slugs including highlighted (for nav dropdown + homepage tiles)
const ALL_CATEGORY_SLUGS = ['highlighted', ...CATEGORY_SLUGS];

// Slugs reserved for static pages — must never be used as category slugs
const RESERVED_SLUGS = ['about', 'contact', 'studio'];

// Display names per locale
const CATEGORY_LABELS = {
  'highlighted': { en: 'Highlighted', fr: 'En Vedette' },
  'set-photography': { en: 'Set Photography', fr: 'Photographie de Plateau' },
  'portraits': { en: 'Portraits', fr: 'Portraits' },
  'corporate-events': { en: 'Corporate & Events', fr: 'Corporate & Événements' },
  'products': { en: 'Products', fr: 'Produits' },
  'personal-work': { en: 'Personal Work', fr: 'Travail Personnel' },
};

function getCategorySlug(cat) {
  return CATEGORY_MAP[cat];
}

function getCatFromSlug(slug) {
  return SLUG_TO_CAT[slug];
}

module.exports = { CATEGORY_MAP, SLUG_TO_CAT, CATEGORY_SLUGS, ALL_CATEGORY_SLUGS, CATEGORY_LABELS, RESERVED_SLUGS, getCategorySlug, getCatFromSlug };
