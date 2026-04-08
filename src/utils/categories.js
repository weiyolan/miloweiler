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
const RESERVED_SLUGS = ['about', 'contact', 'studio', 'legal-notice', 'terms-of-use', 'cookie-notice'];

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

// Descriptions per locale (fallback when Sanity description fields are unavailable)
const CATEGORY_DESCRIPTIONS = {
  'highlighted': { en: 'A curated selection of our finest work across all disciplines.', fr: 'Une sélection soignée de nos meilleurs travaux dans toutes les disciplines.', nl: 'Een zorgvuldige selectie van ons beste werk in alle disciplines.' },
  'set-photography': { en: 'Behind-the-scenes and on-set photography capturing the energy of film and TV productions.', fr: 'Photographie en coulisses et sur le plateau capturant l\'énergie des productions cinématographiques et télévisées.', nl: 'Behind-the-scenes en on-set fotografie die de energie van film- en tv-producties vastlegt.' },
  'brand': { en: 'Visual storytelling for brands and businesses — from headshots to full campaign shoots.', fr: 'Narration visuelle pour les marques et les entreprises — des portraits aux campagnes complètes.', nl: 'Visueel verhaal voor merken en bedrijven — van headshots tot volledige campagneshoots.' },
  'events': { en: 'Documentary photography that preserves the authentic moments of your events.', fr: 'Photographie documentaire qui préserve les moments authentiques de vos événements.', nl: 'Documentaire fotografie die de authentieke momenten van uw evenementen vastlegt.' },
  'portraits': { en: 'Portraits and professional headshots that reveal character and presence.', fr: 'Portraits et headshots professionnels qui révèlent caractère et présence.', nl: 'Portretten en professionele headshots die karakter en aanwezigheid onthullen.' },
  'products': { en: 'Clean, bold product and food photography designed to sell.', fr: 'Photographie de produits et culinaire, nette et percutante, conçue pour vendre.', nl: 'Heldere, gedurfde product- en foodfotografie ontworpen om te verkopen.' },
  'personal-work': { en: 'Fine art projects and personal explorations pushing the boundaries of the medium.', fr: 'Projets d\'art et explorations personnelles repoussant les limites du médium.', nl: 'Fine art projecten en persoonlijke verkenningen die de grenzen van het medium verleggen.' },
};

// Short display names per locale (fallback when Sanity shortName fields are unavailable)
const CATEGORY_SHORT_LABELS = {
  'highlighted': { en: 'Highlighted', fr: 'En Vedette', nl: 'Uitgelicht' },
  'set-photography': { en: 'Sets', fr: 'Plateaux', nl: 'Sets' },
  'brand': { en: 'Brand', fr: 'Marque', nl: 'Merk' },
  'events': { en: 'Events', fr: 'Événements', nl: 'Evenementen' },
  'portraits': { en: 'Portraits', fr: 'Portraits', nl: 'Portretten' },
  'products': { en: 'Products', fr: 'Produits', nl: 'Producten' },
  'personal-work': { en: 'Personal', fr: 'Personnel', nl: 'Persoonlijk' },
};

// Convert Sanity categoryNames doc (keyed by enum) to slug-keyed short label map
function buildCategoryShortLabels(sanityDoc) {
  if (!sanityDoc) return CATEGORY_SHORT_LABELS;
  const labels = { highlighted: sanityDoc.highlightedShort || CATEGORY_SHORT_LABELS['highlighted'] };
  for (const [enumVal, slug] of Object.entries(CATEGORY_MAP)) {
    labels[slug] = sanityDoc[`${enumVal}Short`] || CATEGORY_SHORT_LABELS[slug];
  }
  return labels;
}

function getCategorySlug(cat) {
  return CATEGORY_MAP[cat];
}

function getCatFromSlug(slug) {
  return SLUG_TO_CAT[slug];
}

// Convert Sanity categoryNames doc (keyed by enum) to slug-keyed description map
function buildCategoryDescriptions(sanityDoc) {
  if (!sanityDoc) return CATEGORY_DESCRIPTIONS;
  const descriptions = { highlighted: sanityDoc.highlightedDescription || CATEGORY_DESCRIPTIONS['highlighted'] };
  for (const [enumVal, slug] of Object.entries(CATEGORY_MAP)) {
    descriptions[slug] = sanityDoc[`${enumVal}Description`] || CATEGORY_DESCRIPTIONS[slug];
  }
  return descriptions;
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

module.exports = { CATEGORY_MAP, SLUG_TO_CAT, CATEGORY_SLUGS, ALL_CATEGORY_SLUGS, CATEGORY_LABELS, CATEGORY_SHORT_LABELS, CATEGORY_DESCRIPTIONS, RESERVED_SLUGS, getCategorySlug, getCatFromSlug, buildCategoryLabels, buildCategoryShortLabels, buildCategoryDescriptions };
