import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'termsOfUse',
  title: 'Terms of Use',
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
      return { title: 'Terms of Use' }
    },
  },
})
