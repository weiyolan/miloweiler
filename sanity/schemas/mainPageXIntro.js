import {defineField, defineType} from 'sanity'
// import { BlockElementIcon } from '@sanity/icons'

export default defineType({
  name: 'mainPageXIntro',
  title: 'Intro: Logo',
  type: 'document',
  // icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'images',
      title: 'Randomized Images',
      type: 'array',
      of: [{type: 'metaImage'}],
      // group: ['details', 'images'],
      // group: 'images',
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: 'text2', title: 'Text 2', type: 'localeText',
    //   validation: Rule => Rule.required()
    // }),
  ],
  preview: {
    prepare() {
      // const {date, completion} = selection
      return {title: 'Intro: Logo'}
    },
  },
})
