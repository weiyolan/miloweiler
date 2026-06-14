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
  fieldsets: CATEGORY_FIELDS.map(({ name, title }) => ({
    name,
    title,
    options: { collapsible: true, collapsed: true },
  })),
  fields: CATEGORY_FIELDS.map(({ name, title }) =>
    defineField({
      name,
      title,
      type: 'seo',
      fieldset: name,
      initialValue: { seoDescription: INITIAL_DESCRIPTION },
    })
  ),
  preview: {
    prepare() {
      return { title: 'Category SEO' }
    },
  },
})
