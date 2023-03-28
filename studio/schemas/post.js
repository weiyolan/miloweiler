import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: Rule => Rule.required()
    }),

    // defineField({
    //   name: 'slug',
    //   title: 'Slug',
    //   type: 'slug',
    //   options: {
    //     // source: 'title',
    //     source: (doc, context) => context.parent.title.en,

    //     maxLength: 96,
    //   },
    //   validation: Rule => Rule.required()
    // }),
    defineField({
      name: 'completion',
      title: 'Completion Percentage',
      type: 'number',
      validation: Rule => Rule.required()
    }),

    // defineField({
    //   name: 'author',
    //   title: 'Author',
    //   type: 'reference',
    //   to: {type: 'author'},
    // }),
    // defineField({
    //   name: 'mainImage',
    //   title: 'Main image',
    //   type: 'image',
    //   options: {
    //     hotspot: true,
    //   },
    // }),
    // defineField({
    //   name: 'categories',
    //   title: 'Categories',
    //   type: 'array',
    //   of: [{type: 'reference', to: {type: 'category'}}],
    // }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: Rule => Rule.required()

    }),
    defineField({
      name: 'body',
      title: 'Blog Text',
      type: 'localeBlockContent',
      validation: Rule => Rule.required()
    }),
    // defineField({
    //   name: 'bodyFR',
    //   title: 'Text pour ton blog FR',
    //   type: 'blockContent',
    //   validation: Rule => Rule.required()
    // }),
  ],

  preview: {
    select: {
      title: 'title.en',
      date: 'date',
      completion: 'completion',
    },
    prepare(selection) {
      const {date, completion} = selection
      return {...selection, subtitle: `${completion}%, ${new Intl.DateTimeFormat("en-US", { day: 'numeric', month: 'short', year:'numeric' }).format(new Date(date))}`}
    },
  },
})
