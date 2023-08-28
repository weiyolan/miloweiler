import { defineField, defineType } from 'sanity'
// import { BlockElementIcon } from '@sanity/icons'

export default defineType({
  name: 'mainPageXXX',
  title: 'Section Description',
  type: 'document',
  // icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'title', title: 'Section Title', type: 'localeString',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'text', title: 'Main Text', type: 'localeText',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'linkText', title: 'Link Text', type: 'localeString',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'linkUrl', title: 'Link URL', type: 'string',
      validation: Rule => Rule.required()
    }),
    // defineField({
    //   name: 'text2', title: 'Text 2', type: 'localeText',
    //   validation: Rule => Rule.required()
    // }),
  ],
  preview: {
    prepare() {
      // const {date, completion} = selection
      return { title: 'Section Description' }
    },
  },
})