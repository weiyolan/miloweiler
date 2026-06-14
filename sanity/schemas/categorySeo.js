import { defineType, defineField } from 'sanity'

// Mirrors the category keys/labels used in categoryNames.js (minus "highlighted").
// Only the description is pre-populated with the value currently hardcoded on the
// category overview pages; the title is left empty on purpose so it keeps falling
// back to the live, localized category name ("Milo Weiler | <category>").
const CATEGORY_FIELDS = [
  { name: 'bts', title: 'Set Photography' },
  { name: 'corp', title: 'Corporate & Brand Photography' },
  { name: 'events', title: 'Event & Documentary Photography' },
  { name: 'docu', title: 'Portraits & Professional Headshots' },
  { name: 'studio', title: 'Product & Food Photography' },
  { name: 'art', title: 'Fine Art & Personal Projects' },
]

const INITIAL_DESCRIPTION = { en: 'Specialised Set & Studio Photography' }

export default defineType({
  name: 'categorySeo',
  title: 'Category SEO',
  type: 'document',
  // Each category is a single collapsible section. The `seo` object type is
  // already collapsible, so we deliberately do NOT also wrap it in a fieldset
  // (that would nest a collapsible inside a collapsible — double indentation).
  fields: CATEGORY_FIELDS.map(({ name, title }) =>
    defineField({
      name,
      title,
      type: 'seo',
      initialValue: { seoDescription: INITIAL_DESCRIPTION },
    })
  ),
  preview: {
    prepare() {
      return { title: 'Category SEO' }
    },
  },
})
