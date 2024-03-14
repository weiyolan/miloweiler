import { defineField, defineType } from "sanity";

export default defineType({
  name: "trustedByLogo",
  title: "Logo",
  type: "object",
  // orderings: [orderRankOrdering],
  fields: [
    // orderRankField({ type: 'document', hidden: true }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      // type: 'array',
      // of: [{ type: 'image' }],
      options: {
        hotspot: false,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Official webpage",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

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
