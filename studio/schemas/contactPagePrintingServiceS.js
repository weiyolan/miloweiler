import { defineField, defineType } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export default defineType({
  name: 'contactPagePSS',
  title: 'Printing Service Section',
  type: 'document',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'title', title: 'Section Title', type: 'localeString',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'text', title: 'Intro Text', type: 'localeText',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subTitle', title: 'List Title', type: 'localeString',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'list', title: 'List', type: 'array', of: [{ type: 'localeString' }],
      // options: {collapsible: true, collapsed: true},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image1', title: 'Image 1', type: 'altImage',
      // options: {collapsible: true, collapsed: true},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image2', title: 'Image 2', type: 'altImage',
      // options: {collapsible: true, collapsed: true},
      validation: Rule => Rule.required()
    }),
  ],
  preview: {
    prepare() {
      // const {date, completion} = selection
      return { title: 'Printing Service Section' }
    },
  },
})