import { defineField, defineType } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'
export default defineType({
  name: 'contactPagePFS',
  title: 'Portfolio Section',
  type: 'document',
  icon: BlockElementIcon,
  groups: [
    {name: 'images', title: 'Images'},
    {name: 'file', title: 'Portfolio'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'localeString',
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'localeText',
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'portfolio',
      title: 'Portfolio',
      type: 'portfolio',
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image1',
      title: 'Image 1',
      type: 'altImage',
      // options: {collapsible: true, collapsed: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image2',
      title: 'Image 2',
      type: 'altImage',
      // options: {collapsible: true, collapsed: true},
      // validation: Rule => Rule.required()
    }),
  ],
  preview: {
    prepare() {
      // const {date, completion} = selection
      return {title: 'Portfolio Section'}
    },
  },
})