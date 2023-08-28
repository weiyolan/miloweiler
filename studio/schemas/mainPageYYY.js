import { defineField, defineType } from 'sanity'
// import { BlockElementIcon } from '@sanity/icons'

export default defineType({
  name: 'mainPageYYY',
  title: 'Section Description',
  type: 'document',
  // icon: BlockElementIcon,
  fieldsets: [
    {
      title: 'Link 1',
      name: 'link1',
      options: { collapsible: true, collapsed: true }
    },
    {
      title: 'Link 2',
      name: 'link2',
      options: { collapsible: true, collapsed: true }
    },
    {
      title: 'Link 3',
      name: 'link3',
      options: { collapsible: true, collapsed: true }
    }
  ],
  fields: [
    // defineField({
    //   name: 'title', title: 'Section Title', type: 'localeString',
    //   validation: Rule => Rule.required()
    // }),
    defineField({
      name: 'text', title: 'Main Text', type: 'localeText',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'linkText1', title: 'Text', type: 'localeString',
      fieldset: 'link1',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'linkUrl1', title: 'URL', type: 'string',
      fieldset: 'link1',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'linkText2', title: 'Text', type: 'localeString',
      fieldset: 'link2',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'linkUrl2', title: 'URL', type: 'string',
      fieldset: 'link2',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'linkText3', title: 'Text', type: 'localeString',
      fieldset: 'link3',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'linkUrl3', title: 'URL', type: 'string',
      fieldset: 'link3',
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