import { defineField, defineType } from 'sanity'
import { PresentationIcon } from '@sanity/icons'
import { ImageImportInput } from '../components/ImageImportInput'
import { ProjectPreview } from '../components/ProjectPreview'

export default defineType({
  name: "project",
  title: "Gallery",
  type: "document",
  icon: PresentationIcon,
  components: {
    preview: ProjectPreview,
  },
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
      options: { collapsible: true, collapsed: true, columns: 2 },
    },
    {
      name: "options",
      title: "Options",
      options: { collapsible: true, collapsed: true, columns: 3 },
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
      _id: "_id",
      _rev: "_rev",
    },

    prepare(selection) {
      const { title, date, cat, by, subTitle, media, _id, _rev } = selection;
      return {
        title: getTitle(title, subTitle),
        subtitle: getSubTitle(cat, by, date),
        media: media?.image,
        _id,
        _rev,
      };
    },
  },
  fields: [
    // =============TOP-LEVEL FIELDS=======================

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
      name: "cat",
      title: "Category",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Set Photography", value: "bts" },
          { title: "Corporate & Brand Photography", value: "corp" },
          { title: "Event & Documentary Photography", value: "events" },
          { title: "Portraits & Professional Headshots", value: "docu" },
          { title: "Product & Food Photography", value: "studio" },
          { title: "Fine Art & Personal Projects", value: "art" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "by",
      title: "By",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "partnerLink",
      title: "Partner Link",
      type: "url",
    }),

    // =============OPTIONS FIELDSET=======================

    defineField({
      name: "grid",
      title: "Grid",
      group: ["details", "images"],
      fieldset: ["options"],
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "commissionedBool",
      title: "Commissioned",
      group: ["details"],
      fieldset: ["options"],
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "highlighted",
      title: "Highlighted",
      group: ["details"],
      fieldset: ["options"],
      type: "boolean",
      initialValue: false,
      description: "Highlighted projects appear on the homepage.",
    }),
    defineField({
      name: "minimalText",
      title: "Minimal Text",
      fieldset: ["options"],
      group: ["details"],
      type: "boolean",
      initialValue: false,
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
    }),

    // =============DETAILS FIELDSET=======================

    defineField({
      name: "date",
      title: "Date",
      type: "date",
      fieldset: "details",
    }),
    defineField({
      name: "album",
      title: "Album",
      type: "string",
      fieldset: "details",
    }),
    defineField({
      name: "directed",
      title: "Directed By",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "details",
    }),
    defineField({
      name: "produced",
      title: "Produced By",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "details",
    }),
    defineField({
      name: "designed",
      title: "Designed By",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "details",
    }),
    defineField({
      name: "created",
      title: "Created By",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "details",
    }),
    defineField({
      name: "developed",
      title: "Developed By",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "details",
    }),
    defineField({
      name: "commissioned",
      title: "Commissioned By",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "details",
    }),
    defineField({
      name: "artist",
      title: "Artists",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "details",
    }),

    // =============CONTENT & IMAGES=======================

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
      group: ["details", "images"],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "otherImages",
      title: "Project Images",
      type: "array",
      // of: [{type: 'metaImage'}],
      components: {
        input: ImageImportInput,
      },
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
            {
              type: "image",
              name: "image",
              options: {
                hotspot: true,
                metadata: ['lqip', 'palette'],
              },
            },
            {
              type: "localeStringOptional",
              name: "alt",
              title: "Alt Text",
            },
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