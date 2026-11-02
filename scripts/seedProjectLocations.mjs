/**
 * Pre-fills the optional `location` field on projects (data: migrations/data/projectLocations.json).
 * Plain Node + @sanity/client, so it also runs where the Sanity CLI does not (e.g. Termux/Android).
 * Only fills projects whose location is still empty: never overwrites what Milo entered. Safe to re-run.
 * Patches the published document and, if one exists, its draft.
 *
 * Usage (from the repo root):
 *   SANITY_TOKEN=<token> node scripts/seedProjectLocations.mjs           # dry run: shows what would change
 *   SANITY_TOKEN=<token> node scripts/seedProjectLocations.mjs --apply   # writes to Sanity
 *
 * Token: https://www.sanity.io/manage → project → API → Tokens → "Add API token", permission "Editor".
 * Delete the token afterwards if you only needed it for this.
 */
import { readFileSync } from 'node:fs'
import { createClient } from '@sanity/client'

const LOCATIONS = JSON.parse(readFileSync(new URL('../migrations/data/projectLocations.json', import.meta.url), 'utf8'))
const apply = process.argv.includes('--apply')

if (!process.env.SANITY_TOKEN) {
  console.error('Missing SANITY_TOKEN (Editor token from sanity.io/manage → API → Tokens).')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'erjr84ua',
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const ids = Object.keys(LOCATIONS)
const docs = await client.fetch(`*[_type == "project" && _id in $ids]{_id, title, location}`, {
  ids: ids.flatMap((id) => [id, `drafts.${id}`]),
})

const tx = client.transaction()
let changes = 0
for (const doc of docs) {
  const loc = LOCATIONS[doc._id.replace(/^drafts\./, '')]
  const filled = doc.location && (doc.location.en || doc.location.fr || doc.location.nl)
  if (filled) {
    console.log(`skip  ${doc.title} (${doc._id}): already "${doc.location.en || doc.location.fr || doc.location.nl}"`)
    continue
  }
  console.log(`${apply ? 'set ' : 'would set'}  ${doc.title} (${doc._id}) → ${loc.en} / ${loc.fr} / ${loc.nl}`)
  tx.patch(doc._id, (p) => p.set({ location: { _type: 'localeStringOptional', en: loc.en, fr: loc.fr, nl: loc.nl } }))
  changes++
}

const missing = ids.filter((id) => !docs.some((d) => d._id === id))
for (const id of missing) console.warn(`warn  no published project with _id ${id}`)

if (!changes) {
  console.log('Nothing to do.')
} else if (apply) {
  await tx.commit()
  console.log(`Done: ${changes} document(s) updated. Publish isn't needed for published docs; drafts stay drafts.`)
} else {
  console.log(`\nDry run: ${changes} document(s) would change. Re-run with --apply to write.`)
}
