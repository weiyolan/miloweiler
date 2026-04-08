import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'legalNotice',
  title: 'Legal Notice',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'localeBlockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Legal Notice' }
    },
  },
})
