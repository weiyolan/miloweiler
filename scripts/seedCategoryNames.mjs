/**
 * One-time script to populate the categoryNames singleton in Sanity.
 *
 * Usage:
 *   SANITY_PROJECT_ID=<id> SANITY_TOKEN=<token> node scripts/seedCategoryNames.mjs
 *
 * Get a token from: https://www.sanity.io/manage → API → Tokens
 */
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const doc = {
  _id: 'categoryNames',
  _type: 'categoryNames',
  highlighted: { _type: 'localeString', en: 'Highlighted', fr: 'En Vedette', nl: 'Uitgelicht' },
  bts: { _type: 'localeString', en: 'Set Photography', fr: 'Photographie de Plateau', nl: 'Setfotografie' },
  corp: { _type: 'localeString', en: 'Corporate & Brand Photography', fr: 'Photographie Corporate & de Marque', nl: 'Corporate & Merkfotografie' },
  events: { _type: 'localeString', en: 'Event & Documentary Photography', fr: 'Photographie Événementielle & Documentaire', nl: 'Evenementen- & Documentairefotografie' },
  docu: { _type: 'localeString', en: 'Portraits & Professional Headshots', fr: 'Portraits & Headshots Professionnels', nl: 'Portretten & Professionele Headshots' },
  studio: { _type: 'localeString', en: 'Product & Food Photography', fr: 'Photographie de Produits & Culinaire', nl: 'Product- & Foodfotografie' },
  art: { _type: 'localeString', en: 'Fine Art & Personal Projects', fr: 'Beaux-Arts & Projets Personnels', nl: 'Beeldende Kunst & Persoonlijke Projecten' },
}

try {
  const result = await client.createOrReplace(doc)
  console.log('Category names seeded:', result._id)
} catch (err) {
  console.error('Failed to seed category names:', err.message)
  process.exit(1)
}
