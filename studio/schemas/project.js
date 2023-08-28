import { defineField, defineType } from 'sanity'
import { PresentationIcon } from '@sanity/icons'

export default defineType({
  name: 'project',
  title: 'Gallery',
  type: 'document',
  icon: PresentationIcon,
  groups: [
    {
      name: 'details',
      title: 'Primary Info',
    }, {
      name: 'images',
      title: 'Images',
    },
  ],
  fieldsets: [
    {
      name: 'details',
      title: 'Project Details',
      options: { collapsible: true, collapsed: false }
    }
  ],
  preview: {
    select: {
      title: 'title',
      subTitle: 'subTitle',
      by: 'by',
      date: 'date',
      media:'mainImage',
    },
    prepare(selection) {
      const { title, date, by, subTitle, media } = selection
      return { title: getTitle(title,subTitle), subtitle: getSubTitle(by, date), media:media.image }
    },
  },
  fields: [
    defineField({
      name: 'title', title: 'Project Title', type: 'string', description: 'Title of your project baby!',
      group: 'details',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subTitle', title: 'Subtitle', type: 'string', description: 'De tekst tussen haakjes vlak naast de titel',
      // group: 'details',
      // validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug', description: 'Komt hier: www.miloweiler.com/gallery/[slug]. ',
      options: {
        source: 'title',
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'by', title: 'By', type: 'array', of: [{ type: 'string' }],
      // group: 'details',
    }),
    defineField({
      name: 'cat', title: 'Category', type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Behind The Scenes', value: 'bts' },
          { title: 'Documentary', value: 'docu' },
          { title: 'Fine Art', value: 'art' },
          { title: 'Studio', value: 'studio' },
        ],
      },
      validation: Rule => Rule.required()
    }),

    // =============DETAILS FIELDSET=======================

    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      fieldset: 'details',
      // group: 'details',
      // options: {dateFormat: 'YYYY',calendarTodayLabel: 'Today'},
    }),
    defineField({
      name: 'album', title: 'Album', type: 'string',
      // group: 'details',
      fieldset: 'details',
    }),

    defineField({
      name: 'directed', title: 'Directed By', type: 'array', of: [{ type: 'string' }],
      // group: 'details',
      fieldset: 'details',
    }),
    defineField({
      name: 'produced', title: 'Produced By', type: 'array', of: [{ type: 'string' }],
      // group: 'details',
      fieldset: 'details',
    }),
    defineField({
      name: 'designed', title: 'Designed By', type: 'array', of: [{ type: 'string' }],
      // group: 'details',
      fieldset: 'details',
    }),
    defineField({
      name: 'created', title: 'Created By', type: 'array', of: [{ type: 'string' }],
      // group: 'details',
      fieldset: 'details',
    }),
    defineField({
      name: 'developed', title: 'Developed By', type: 'array', of: [{ type: 'string' }],
      // group: 'details',
      fieldset: 'details',
    }),
    defineField({
      name: 'commissioned', title: 'Commissioned By', type: 'array', of: [{ type: 'string' }],
      // group: 'details',
      fieldset: 'details',
    }),
    defineField({
      name: 'artist', title: 'Artists', type: 'array', of: [{ type: 'string' }],
      // group: 'details',
      fieldset: 'details',
    }),
    defineField({
      name: 'description', title: 'Description', type: 'localeText',
      group: 'details',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage', title: 'Main Image', type: 'altImage', group: 'images',
      group: ['details', 'images'],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'otherImages', title: 'Project Images', type: 'array', of: [{ type: 'metaImage' }],
      group: ['details', 'images'],
      // group: 'images',
      validation: Rule => Rule.required()
    }),
  ],
})
function getTitle(title, subTitle) {
  if (title === undefined  && subTitle === undefined) {
    return 'No title given'
  } else if (subTitle === undefined) {
    return `${title}`
  } else if (title === undefined) {
    return `... (${subTitle})`
  } else {
    return `${title} (${subTitle})`
  }
}
function getSubTitle(by, date) {
  if (by===undefined && date===undefined) {
    return 'No date given'
  } else if (by === undefined) {
    return `${date.slice(0, 4)}`
  } else if (date === undefined) {
    return `By ${by[0]}`
  } else {
    return `By ${by[0]}, ${date.slice(0, 4)}`
  }
}