import { defineType, defineField } from 'sanity'
import { supportedLanguages } from './supportedLanguages'

export default defineType({
  title: 'Image',
  name: 'altImage',
  type: 'object',
  options: { collapsible: true, collapsed: false },

  preview: {
    select: {
      media: 'image',
      alt: 'alt.en',
    },
    prepare({ media, alt }) {
      return {
        title: alt || 'Image',
        media,
      }
    },
  },

  fields: [
    defineField({
      name: 'image', title: 'Image', type: 'image',
      options: {
        hotspot: true,
        metadata: [
          'lqip',       // Default: included
          'palette',    // Default: included
        ],
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'alt', title: 'Alt', type: 'localeStringOptional', description: 'A simple description of what is shown on the picture for people using screenreaders.'
    }),
  ]
})
