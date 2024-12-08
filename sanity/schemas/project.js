import { defineField, defineType } from 'sanity'
import { PresentationIcon } from '@sanity/icons'

export default defineType({
  name: "project",
  title: "Gallery",
  type: "document",
  icon: PresentationIcon,
  groups: [
    {
      name: "details",
      title: "Primary Info",
    },
    {
      name: "images",
      title: "Images",
    },
  ],
  fieldsets: [
    {
      name: "details",
      title: "Project Details",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "options",
      title: "Options",
      options: { collapsible: false, collapsed: false, columns: 3 },
    },
  ],
  preview: {
    select: {
      title: "title",
      subTitle: "subTitle",
      cat: "cat",
      by: "by",
      date: "date",
      media: "mainImage",
    },

    prepare(selection) {
      const { title, date, cat, by, subTitle, media } = selection;
      return {
        title: getTitle(title, subTitle),
        subtitle: getSubTitle(cat, by, date),
        media: media?.image,
      };
    },
  },
  fields: [
    defineField({
      name: "grid",
      title: "Grid",
      group: ["details", "images"],
      fieldset: ["options"],
      type: "boolean",
      initialValue: false,
      // description: "Toggle om de foto's van je project al dan niet op een grid te plaatsen.",
      // options: {columns: 3},
    }),

    defineField({
      name: "commissionedBool",
      title: "Commissioned",
      group: ["details"],
      fieldset: ["options"],
      type: "boolean",
      initialValue: false,
      // description: "Toggle om de foto's van je project al dan niet op een grid te plaatsen.",
      // options: {columns: 3},
    }),
    defineField({
      name: "minimalText",
      title: "Minimal Text",
      fieldset: ["options"],
      group: ["details"],
      type: "boolean",
      initialValue: false,
      // description: "Toggle om de foto's van je project al dan niet op een grid te plaatsen.",
      // options: {columns: 3},
    }),

    defineField({
      name: "gridCols",
      title: "Grid Dimensies",
      type: "object",
      group: ["details", "images"],
      hidden: ({ document }) => !document?.grid,
      description: "Het aantal kolommen voor een groot en klein scherm.",
      options: { columns: 2 },
      fields: [
        // defineField({
        //   name: 'cols',
        //   title: 'Aantal Kolommen',
        //   type: 'object',
        //   options: {columns: 2},
        //   fields: [
        defineField({
          name: "lg",
          title: "Desktop",
          type: "number",
          initialValue: 24,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "sm",
          title: "Mobile",
          type: "number",
          initialValue: 9,
          validation: (Rule) => Rule.required(),
        }),
      ],
      // validation: (Rule) => Rule.required(),
      // }),
      // defineField({
      //   name: 'sm',
      //   title: 'Mobile',
      //   type: 'object',
      //   options: {columns: 2},
      //   fields: [
      //     defineField({
      //       name: 'cols',
      //       title: 'Kolommen',
      //       type: 'number',
      //       initialValue: 12,
      //       validation: (Rule) => Rule.required(),
      //     }),
      //     defineField({
      //       name: 'rows',
      //       title: 'Rijen',
      //       type: 'number',
      //       initialValue: 32,
      //       validation: (Rule) => Rule.required(),
      //     }),
      //   ],
      //   validation: (Rule) => Rule.required(),
      // }),
      // ],
    }),
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      description: "Title of your project baby!",
      group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subTitle",
      title: "Subtitle",
      type: "string",
      description: "De tekst tussen haakjes vlak naast de titel",
      // group: 'details',
      // validation: Rule => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Komt hier: www.miloweiler.com/gallery/[slug]. ",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "by",
      title: "By",
      type: "array",
      of: [{ type: "string" }],
      // group: 'details',
    }),
    defineField({
      name: "partnerLink",
      title: "Partner Link",
      type: "url",
      group: "details",
      // validation: (Rule) => Rule.required(),
      // group: 'details',
    }),
    defineField({
      name: "cat",
      title: "Category",
      description: "Fine Art projecten verschijnen nooit bij de commissioned projecten. Kijk de toggle dus goed na ;)",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Set Photography", value: "bts" },
          { title: "Portrait", value: "docu" },
          { title: "Corporate Events", value: "events" },
          { title: "Product", value: "studio" },
          { title: "Fine Art", value: "art" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // =============DETAILS FIELDSET=======================

    defineField({
      name: "date",
      title: "Date",
      type: "date",
      fieldset: "details",
      // group: 'details',
      // options: {dateFormat: 'YYYY',calendarTodayLabel: 'Today'},
    }),
    defineField({
      name: "album",
      title: "Album",
      type: "string",
      // group: 'details',
      fieldset: "details",
    }),

    defineField({
      name: "directed",
      title: "Directed By",
      type: "array",
      of: [{ type: "string" }],
      // group: 'details',
      fieldset: "details",
    }),
    defineField({
      name: "produced",
      title: "Produced By",
      type: "array",
      of: [{ type: "string" }],
      // group: 'details',
      fieldset: "details",
    }),
    defineField({
      name: "designed",
      title: "Designed By",
      type: "array",
      of: [{ type: "string" }],
      // group: 'details',
      fieldset: "details",
    }),
    defineField({
      name: "created",
      title: "Created By",
      type: "array",
      of: [{ type: "string" }],
      // group: 'details',
      fieldset: "details",
    }),
    defineField({
      name: "developed",
      title: "Developed By",
      type: "array",
      of: [{ type: "string" }],
      // group: 'details',
      fieldset: "details",
    }),
    defineField({
      name: "commissioned",
      title: "Commissioned By",
      type: "array",
      of: [{ type: "string" }],
      // group: 'details',
      fieldset: "details",
    }),
    defineField({
      name: "artist",
      title: "Artists",
      type: "array",
      of: [{ type: "string" }],
      // group: 'details',
      fieldset: "details",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
      group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "altImage",
      // group: 'images',
      group: ["details", "images"],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "otherImages",
      title: "Project Images",
      type: "array",
      // of: [{type: 'metaImage'}],
      options: {
        layout: "list",
      },
      of: [
        {
          type: "object",
          name: "otherImage",
          preview: {
            select: {
              image: "image",
              position: "position",
              border: "border",
            },
            prepare(selection) {
              const { image, position, border } = selection;
              // console.log(image)
              return {
                media: image.asset,
                title: `x: ${position.lg.x} y: ${position.lg.y} | Breedte: ${position.lg.width} Hoogte: ${position.lg.height} Rand: ${border}`,

                // subtitle: new Date(date).getFullYear() // YYYY-MM-DD --> YYYY
              };
            },
          },
          fields: [
            { type: "metaImage", name: "image" },
            { type: "boolean", name: "border", title: "Border", initialValue: false },
            {
              type: "object",
              name: "position",
              title: "Grid Positie",
              // options: {columns: 4},
              fields: [
                {
                  type: "object",
                  name: "lg",
                  title: "Desktop",
                  options: { columns: 4, collapsible: false },
                  fields: [
                    {
                      type: "number",
                      title: "X start",
                      name: "x",
                      // description: 'De kolom waarin de foto start. Begint bij 1.',
                      initialValue: 1,
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      type: "number",
                      title: "Breedte",
                      name: "width",
                      // description: 'Het #kolommen de foto breed is. Minimum 1.',
                      initialValue: 1,
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      type: "number",
                      title: "Y start",
                      name: "y",
                      // description: 'De rij waarin de foto start. Begint bij 1.',
                      initialValue: 1,
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      type: "number",
                      title: "Hoogte",
                      name: "height",
                      // description: 'Het #rijen de foto hoog is. Minimum 1.',
                      initialValue: 1,
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                },
                {
                  type: "object",
                  name: "sm",
                  title: "Mobile",
                  options: { columns: 4, collapsible: false },
                  fields: [
                    {
                      type: "number",
                      title: "X start",
                      name: "x",
                      // description: 'De kolom waarin de foto start. Begint bij 1.',
                      initialValue: 1,
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      type: "number",
                      title: "Breedte",
                      name: "width",
                      // description: 'Het #kolommen de foto breed is. Minimum 1.',
                      initialValue: 1,
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      type: "number",
                      title: "Y start",
                      name: "y",
                      // description: 'De rij waarin de foto start. Begint bij 1.',
                      initialValue: 1,
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      type: "number",
                      title: "Hoogte",
                      name: "height",
                      // description: 'Het #rijen de foto hoog is. Minimum 1.',
                      initialValue: 1,
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],

      group: ["details", "images"],
      // group: 'images',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
function getTitle(title, subTitle) {
  if (title === undefined && subTitle === undefined) {
    return 'No title given'
  } else if (subTitle === undefined) {
    return `${title}`
  } else if (title === undefined) {
    return `... (${subTitle})`
  } else {
    return `${title} (${subTitle})`
  }
}
function getSubTitle(cat, by, date) {
  let tekst = '';

  tekst = tekst + (cat === undefined ? 'Category?, ' : `${cat}, `);
  tekst = tekst + (date === undefined ? 'Date?, ' : `${date?.slice(0, 4)}, `);
  tekst = tekst + (by === undefined ? 'By?' : `By ${by}`);

  return tekst
} 