import { defineType, defineField } from 'sanity'
import { ColorInput } from '../components/ColorInput'
import { ImagePickerInput } from '../components/ImagePickerInput'

const CATEGORIES = [
  { name: 'highlighted', title: 'Highlighted', filter: 'highlighted == true' },
  { name: 'bts', title: 'Set Photography', filter: 'cat == "bts"' },
  { name: 'docu', title: 'Portraits', filter: 'cat == "docu"' },
  { name: 'events', title: 'Corporate & Events', filter: 'cat == "events"' },
  { name: 'studio', title: 'Products', filter: 'cat == "studio"' },
  { name: 'art', title: 'Personal Work', filter: 'cat == "art"' },
]

function categoryField({ name, title, filter }) {
  return defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({
        name: 'project',
        title: 'Project',
        type: 'reference',
        to: [{ type: 'project' }],
        options: {
          filter,
        },
      }),
      defineField({
        name: 'image',
        title: 'Image',
        type: 'image',
        options: { hotspot: true, metadata: ['lqip', 'palette'] },
        components: { input: ImagePickerInput },
      }),
      defineField({
        name: 'bgColor',
        title: 'Background Color',
        type: 'string',
        description: 'Optional hex color override for the carousel background.',
        components: { input: ColorInput },
        validation: (Rule) =>
          Rule.regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color', invert: false }),
      }),
    ],
  })
}

export default defineType({
  name: 'homepageConfig',
  title: 'Homepage',
  type: 'document',
  fields: CATEGORIES.map(categoryField),
  preview: {
    prepare() {
      return { title: 'Homepage' }
    },
  },
})
