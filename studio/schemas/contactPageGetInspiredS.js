import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPageGIS',
  title: 'Get Inspired Section',
  type: 'document',
  fields: [
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
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'text1', title: 'Text 1', type: 'localeText',
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'text2', title: 'Text 2', type: 'localeText',
      validation: Rule => Rule.required()
    }),
  ],
  preview: {
    prepare() {
      // const {date, completion} = selection
      return { title: 'Get Inspired Section' }
    },
  },
})