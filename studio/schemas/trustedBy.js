import { defineField, defineType } from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'trustedBy',
  title: 'Trusted By',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'document', hidden: true }),
    defineField({
      name: 'name', title: 'Name', type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image', title: 'Image', type: 'image',
      // type: 'array',
      // of: [{ type: 'image' }],
      options: {
        hotspot: false,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'type', title: 'Type', type: 'string', options: {
        list: [
          { title: 'Artist', value: 'artist' },
          { title: 'Company', value: 'company' },
        ], // <-- predefined values
        //layout: 'radio' // <-- defaults to 'dropdown'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'link', title: 'Official webpage', type: 'string',
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
    }
    // prepare(selection) {
    //   const {date, completion} = selection
    //   return {...selection, subtitle: `${completion}%, ${new Intl.DateTimeFormat("en-US", { day: 'numeric', month: 'short', year:'numeric' }).format(new Date(date))}`}
    // },
  },
})

// types: (schemaTypes) => {
//   return [
//     ...schemaTypes,
//     {
//       name: "category",
//       title: "Category",
//       type: "document",
//       // Optional: The plugin also exports a set of 'orderings' for use in other Document Lists
//       // https://www.sanity.io/docs/sort-orders
//       orderings: [orderRankOrdering],
//       fields: [
//         // Minimum required configuration
//         // orderRankField({ type: "category" }),

//         // OR you can override _some_ of the field settings
//         orderRankField({ type: 'category', hidden: false }),

//         // ...all other fields
//       ],
//     },
//   ]
// }