import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'fontSettings',
  title: 'Font Settings',
  type: 'document',
  fields: [
    
    defineField({
      name: 'fontSerif',
      title: 'Heading Font',
      type: 'string',
      description: 'Used for page titles and headings.',
      initialValue: 'playfair-display',
      options: {
        list: [
          { title: 'Playfair Display', value: 'playfair-display' },
          { title: 'Fiona', value: 'fiona' },
          { title: 'Monotalic', value: 'monotalic' },
          { title: 'Monotalic Narrow', value: 'monotalic-narrow' },
          { title: 'Monotalic Wide', value: 'monotalic-wide' },
        ],
      },
    }),
    defineField({
      name: 'fontSans',
      title: 'Body Font',
      type: 'string',
      description: 'Used for body text, buttons, and navigation.',
      initialValue: 'instrument-sans',
      options: {
        list: [
          { title: 'Instrument Sans', value: 'instrument-sans' },
          { title: 'Brandon Grotesque', value: 'brandon-grotesque' },
        ],
      },
    }),
    defineField({
      name: 'fontMono',
      title: 'Detail Font',
      type: 'string',
      description: 'Used for labels, captions, form fields, and small details.',
      initialValue: 'space-mono',
      options: {
        list: [
          { title: 'Space Mono', value: 'space-mono' },
        ],
      },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Fonts' }
    },
  },
})
