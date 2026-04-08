import { defineType, defineField } from 'sanity'
import { ColorInput } from '../components/ColorInput'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'primary',
      title: 'Primary',
      type: 'string',
      description: 'Main text color on dark backgrounds. Also used for the scrollbar thumb.',
      initialValue: '#FFFFFF',
      components: { input: ColorInput },
      validation: (Rule) => Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color', invert: false }),
    }),
    defineField({
      name: 'darkPrimary',
      title: 'Dark Primary',
      type: 'string',
      description: 'Text color on light sections. Also used as the page background color.',
      initialValue: '#000000',
      components: { input: ColorInput },
      validation: (Rule) => Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color', invert: false }),
    }),
    defineField({
      name: 'darkGrey',
      title: 'Dark Grey',
      type: 'string',
      description: 'Dark surface color used for card backgrounds and the scrollbar track.',
      initialValue: '#303030',
      components: { input: ColorInput },
      validation: (Rule) => Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color', invert: false }),
    }),
    defineField({
      name: 'accent',
      title: 'Accent',
      type: 'string',
      description: 'Accent/highlight color used for text selection and interactive elements.',
      initialValue: '#4100A4',
      components: { input: ColorInput },
      validation: (Rule) => Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color', invert: false }),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Theme' }
    },
  },
})
