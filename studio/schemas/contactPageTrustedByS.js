import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPageTBS',
  title: 'Trusted By Section',
  type: 'document',
  fields: [
    defineField({ 
      name: 'title', title: 'Section Title', type: 'localeString',
      // options: {collapsible: true, collapsed: true},
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'artists', title: 'Artist Logos', type: 'array', of: [{type: 'trustedByLogo'}],
      // options: {collapsible: true, collapsed: true},
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'companies', title: 'Company Logos', type: 'array', of: [{type: 'trustedByLogo'}],
      // options: {collapsible: true, collapsed: true},
      validation: Rule => Rule.required()
    }),
  ],
  preview: {
    prepare() {
      // const {date, completion} = selection
      return { title: 'Trusted By Section' }
    },
  },
})