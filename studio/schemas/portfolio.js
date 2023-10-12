import { defineType, defineField } from "sanity";
// import { supportedLanguages } from "./supportedLanguages";
// import { InlineElementIcon } from "@sanity/icons";

export default defineType({
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "document",
      title: "File",
      type: "localeFile",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare(selection) {
      const { title } = selection;
      return { title: title?.en };
    },
  },
});
