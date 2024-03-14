import { defineType, defineField } from 'sanity'
import { supportedLanguages } from './supportedLanguages'

export default defineType({
  title: 'Image',
  name: 'metaImage',
  type: 'image',
  options: {
    hotspot: true,
    metadata: [
      'blurhash', // Default: included
      'lqip', // Default: included
      'palette', // Default: included
      'exif', // Default: not included
      'location', // Default: not included
    ],
  },
})


