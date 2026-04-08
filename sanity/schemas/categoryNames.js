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
  fields: CATEGORY_FIELDS.map(({ name, title }) =>
    defineField({
      name,
      title,
      type: 'localeString',
    })
  ),
  preview: {
    prepare() {
      return { title: 'Category Names' }
    },
  },
})
