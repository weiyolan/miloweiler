import {defineType, defineField} from 'sanity'
import {supportedLanguages} from './supportedLanguages'

export default defineType({
  title: 'Localized File',
  name: 'localeFile',
  description: 'Wait untill uploading is completed before publishing.',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: supportedLanguages.map((lang) =>
    defineField({
      title: lang.title,
      name: lang.id,
      type: 'file',
      // // fieldset: 'translations',
      // fieldset: lang.isDefault ? null : 'translations',
      validation: (Rule) => Rule.required(),
    })
  ),
})
