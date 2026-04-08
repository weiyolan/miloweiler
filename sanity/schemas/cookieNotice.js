import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cookieNotice',
  title: 'Cookie Notice',
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
      return { title: 'Cookie Notice' }
    },
  },
})
