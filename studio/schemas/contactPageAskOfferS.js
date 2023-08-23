import { defineField, defineType } from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export default defineType({
  name: 'contactPageAOS',
  title: 'Ask Offer Section',
  type: 'document',
  icon:BlockElementIcon,
  fields: [
    defineField({
      name: 'title', title: 'Section Title', type: 'localeString',
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'image', title: 'Image', type: 'altImage',
      // options: {collapsible: true, collapsed: true},
      validation: Rule => Rule.required()
    }),
  ],
  preview: {
    prepare() {
      // const {date, completion} = selection
      return { title: 'Ask Offer Section' }
    },
  },
})