import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPageCDS',
  title: 'Contact Details Section',
  type: 'document',
  fields: [
    // defineField({
    //   name: 'title', hidden:false, title: 'Title', type: 'string',
    //   // validation: Rule => Rule.required()
    // }),
    defineField({
      name: 'title', title: 'Section Title', type: 'localeString',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subTitle', title: 'Intro Title', type: 'localeString',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'text', title: 'Intro Text', type: 'localeText',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image', title: 'Image', type: 'altImage',
      validation: Rule => Rule.required()
    }),
    
    // defineField({
    //   name: 'subTitle2', title: 'Subtitle 2', type: 'localeString',
    //   validation: Rule => Rule.required()
    // }),
    // defineField({
    //   name: 'subTitle3', title: 'Subtitle 3', type: 'localeString',
    //   validation: Rule => Rule.required()
    // })
  ],
  preview: {
    // select: {
    // title: 'name',
    // subtitle: 'type',
  // },
  prepare() {
    // const {date, completion} = selection
    return {title: 'Contact Details Section'}
  },
},
})