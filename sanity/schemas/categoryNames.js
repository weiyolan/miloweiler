import { defineType, defineField } from 'sanity'

const CATEGORY_FIELDS = [
  { name: 'highlighted', title: 'Highlighted' },
  { name: 'bts', title: 'Set Photography' },
  { name: 'corp', title: 'Corporate & Brand Photography' },
  { name: 'events', title: 'Event & Documentary Photography' },
  { name: 'docu', title: 'Portraits & Professional Headshots' },
  { name: 'studio', title: 'Product & Food Photography' },
  { name: 'art', title: 'Fine Art & Personal Projects' },
]

export default defineType({
  name: 'categoryNames',
  title: 'Category Names',
  type: 'document',
  fieldsets: CATEGORY_FIELDS.map(({ name, title }) => ({
    name,
    title,
    options: { collapsible: true, collapsed: true },
  })),
  fields: CATEGORY_FIELDS.flatMap(({ name, title }) => [
    defineField({
      name,
      title: 'Full Name',
      type: 'localeString',
      fieldset: name,
    }),
    defineField({
      name: `${name}Short`,
      title: 'Short Name',
      type: 'localeString',
      fieldset: name,
      description: 'Short name for navigation and footer display.',
    }),
    defineField({
      name: `${name}Description`,
      title: 'Description',
      type: 'object',
      fieldset: name,
      description: 'Shown on the homepage and as intro text on the gallery page (helps Google). A few sentences, e.g. what kind of shoots and where.',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'fr', title: 'French', type: 'text', rows: 3 },
        { name: 'nl', title: 'Dutch', type: 'text', rows: 3 },
      ],
    }),
  ]),
  preview: {
    prepare() {
      return { title: 'Category Names' }
    },
  },
})
