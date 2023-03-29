import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Portfolio Project',
  type: 'document',
  groups: [
    {
      name: 'details',
      title: 'Project Details',
    }, {
      name: 'images',
      title: 'Images',
    },
  ],
  fieldsets: [
    {
      title: 'Project Details',
      name: 'details',
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    defineField({
      name: 'title', title: 'Project Title', type: 'string', description: 'Title of your project baby!',
      group: 'details',
      validation: Rule => Rule.required()
    }), 
    defineField({
      name: 'cat', title: 'Category', type: 'string',
      group: 'details',
      options:{
        list: [
          { title: 'Behind The Scenes', value: 'bts' },
          { title: 'Documentary', value: 'docu' },
          { title: 'Fine Art', value: 'art' },
          { title: 'Studio', value: 'studio' },
        ],
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subTitle', title: 'Subtitle', type: 'string', description: 'Optioneel. De tekst tussen haakjes vlak naast de titel',
      group: 'details',
      fieldset: 'details',
      // validation: Rule => Rule.required()
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      fieldset: 'details',
      group: 'details',
      // options: {dateFormat: 'YYYY',calendarTodayLabel: 'Today'},
    }),
    defineField({
      name: 'album', title: 'Album', type: 'string',
      group: 'details',
      fieldset: 'details',
      hidden: ({document}) => document?.cat !== 'bts',
    }),
    // ======================================= 
    defineField({
      name: 'by', title: 'By', type: 'array', of: [{ type: 'string' }],
      group: 'details',
      fieldset: 'details',
    }),
    defineField({
      name: 'directed', title: 'Directed By', type: 'array', of: [{ type: 'string' }],
      group: 'details',
      fieldset: 'details',
      hidden: ({document}) => document?.cat !== 'bts',
    }),
    defineField({
      name: 'produced', title: 'Produced By', type: 'array', of: [{ type: 'string' }],
      group: 'details',
      fieldset: 'details',
    }),
    defineField({
      name: 'description', title: 'Description', type: 'localeText',
      group: 'details',
    }),
    defineField({
      name: 'mainImage', title: 'Main Image', type: 'altImage', group: 'images',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'otherImages', title: 'Project Images', type: 'array', of: [{ type: 'image' }],
      group: 'images',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subTitle: 'subTitle',
      date: 'date',
      // completion: 'completion',
    },
    prepare(selection) {
      const { title, date, subTitle } = selection
      return { title: `${title} (${subTitle})`, subtitle: date.slice(0, 4) }
    },
  },
})
