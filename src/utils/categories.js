// Sanity cat enum value → URL slug
const CATEGORY_MAP = {
  bts: 'set-photography',
  corp: 'brand',
  events: 'events',
  docu: 'portraits',
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

// Display names per locale (fallback when Sanity categoryNames document is unavailable)
const CATEGORY_LABELS = {
  'highlighted': { en: 'Highlighted', fr: 'En Vedette', nl: 'Uitgelicht' },
  'set-photography': { en: 'Set Photography', fr: 'Photographie de Plateau', nl: 'Setfotografie' },
  'brand': { en: 'Corporate & Brand Photography', fr: 'Photographie Corporate & de Marque', nl: 'Corporate & Merkfotografie' },
  'events': { en: 'Event & Documentary Photography', fr: 'Photographie Événementielle & Documentaire', nl: 'Evenementen- & Documentairefotografie' },
  'portraits': { en: 'Portraits & Professional Headshots', fr: 'Portraits & Headshots Professionnels', nl: 'Portretten & Professionele Headshots' },
  'products': { en: 'Product & Food Photography', fr: 'Photographie de Produits & Culinaire', nl: 'Product- & Foodfotografie' },
  'personal-work': { en: 'Fine Art & Personal Projects', fr: 'Beaux-Arts & Projets Personnels', nl: 'Beeldende Kunst & Persoonlijke Projecten' },
};

function getCategorySlug(cat) {
  return CATEGORY_MAP[cat];
}

function getCatFromSlug(slug) {
  return SLUG_TO_CAT[slug];
}

// Convert Sanity categoryNames doc (keyed by enum) to slug-keyed label map
function buildCategoryLabels(sanityDoc) {
  if (!sanityDoc) return CATEGORY_LABELS;
  const labels = { highlighted: sanityDoc.highlighted || CATEGORY_LABELS['highlighted'] };
  for (const [enumVal, slug] of Object.entries(CATEGORY_MAP)) {
    labels[slug] = sanityDoc[enumVal] || CATEGORY_LABELS[slug];
  }
  return labels;
}

module.exports = { CATEGORY_MAP, SLUG_TO_CAT, CATEGORY_SLUGS, ALL_CATEGORY_SLUGS, CATEGORY_LABELS, RESERVED_SLUGS, getCategorySlug, getCatFromSlug, buildCategoryLabels };
