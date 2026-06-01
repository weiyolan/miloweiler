import { defineField, defineType } from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
export default defineType({
  name: 'contactPageGIS',
  title: 'Get Inspired Section',
  type: 'document',
    icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'singleText',
      title: 'Single large text',
      type: 'boolean',
      initialValue: false,
      description: 'When on, the bottom section shows one large full-width text (built from Text 1) with a single link, instead of the two-column Subtitle/Text 1 + Subtitle/Text 2 layout.',
    }),
    defineField({
      name: 'title', title: 'Section Title', type: 'localeString',
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'subTitle1', title: 'Subtitle 1', type: 'localeString',
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'subTitle2', title: 'Subtitle 2', type: 'localeString',
    }),
    defineField({ 
      name: 'text1', title: 'Text 1', type: 'localeText',
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'text2', title: 'Text 2', type: 'localeText',
    }),
  ],
  preview: {
    prepare() {
      // const {date, completion} = selection
      return { title: 'Get Inspired Section' }
    },
  },
})