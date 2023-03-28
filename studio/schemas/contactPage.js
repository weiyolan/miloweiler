// import { defineField, defineType } from 'sanity'

// export default defineType({
//   name: 'contactPageImages',
//   title: 'Contact Page Images',
//   type: 'document',
//   fields: [
//     defineField({
//       name: 'name', title: 'Name', type: 'string',
//       validation: Rule => Rule.required()
//     }),
//     defineField({
//       name: 'image', title: 'Image', type: 'image',
//       // type: 'array',
//       // of: [{ type: 'image' }],
//       options: {
//         hotspot: false,
//       },
//       validation: Rule => Rule.required()
//     }),
//     defineField({
//       name: 'type', title: 'Type', type: 'string', options: {
//         list: [
//           { title: 'Artist', value: 'artist' },
//           { title: 'Company', value: 'company' },
//         ], // <-- predefined values
//         //layout: 'radio' // <-- defaults to 'dropdown'
//       },
//       validation: Rule => Rule.required()
//     }),
//     defineField({
//       name: 'link', title: 'Official webpage', type: 'string',
//       validation: Rule => Rule.required()
//     })
//   ],
//   preview: {
//     select: {
//     title: 'name',
//     subtitle: 'type',
//   }
//   // prepare(selection) {
//   //   const {date, completion} = selection
//   //   return {...selection, subtitle: `${completion}%, ${new Intl.DateTimeFormat("en-US", { day: 'numeric', month: 'short', year:'numeric' }).format(new Date(date))}`}
//   // },
// },
// })