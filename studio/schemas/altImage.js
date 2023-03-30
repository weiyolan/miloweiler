import { defineType, defineField } from 'sanity'
import { supportedLanguages } from './supportedLanguages'

export default defineType({
  title: 'Image',
  name: 'altImage',
  type: 'object',
  options: { collapsible: true, collapsed: false },

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
      name: 'alt', title: 'Description', type: 'localeString', description: 'A simple description of what is shown on the picture for people using screenreaders.',
      // options: {collapsible: true, collapsed: true},
      validation: Rule => Rule.required()
    }),
  ]
})
