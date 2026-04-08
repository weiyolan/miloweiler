import { defineType, defineField } from 'sanity'
import { ColorInput } from '../components/ColorInput'

const colorField = (name, title, description, lightDefault, darkDefault) =>
  defineField({
    name,
    title,
    type: 'object',
    description,
    fields: [
      defineField({
        name: 'light',
        title: 'Light Mode',
        type: 'string',
        initialValue: lightDefault,
        components: { input: ColorInput },
        validation: (Rule) => Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color', invert: false }),
      }),
      defineField({
        name: 'dark',
        title: 'Dark Mode',
        type: 'string',
        initialValue: darkDefault,
        components: { input: ColorInput },
        validation: (Rule) => Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color', invert: false }),
      }),
    ],
  })

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    colorField('background', 'Background', 'Page background, splash screen, scrollbar track.', '#FCF9EE', '#303030'),
    colorField('foreground', 'Foreground', 'Body text, icons, borders, scrollbar thumb.', '#3C0B03', '#FCF9EE'),
    colorField('accent', 'Accent', 'Highlights, text selection, hover states.', '#001643', '#001643'),
    colorField('link', 'Link', 'Links, call-to-action buttons, interactive elements.', '#D9481C', '#D9481C'),
    colorField('surface', 'Surface', 'Footer background, card surfaces.', '#A23615', '#A23615'),
    colorField('muted', 'Muted', 'Secondary text, captions, timestamps.', '#A06602', '#A06602'),
  ],
  preview: {
    prepare() {
      return { title: 'Theme' }
    },
  },
})
