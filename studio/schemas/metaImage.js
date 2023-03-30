import { defineType, defineField } from 'sanity'
import { supportedLanguages } from './supportedLanguages'

export default defineType({
  title: 'Image',
  name: 'metaImage',
  type: 'image',
  options: {
    metadata: [
      'lqip',
      'palette',
    ],
  },
})


