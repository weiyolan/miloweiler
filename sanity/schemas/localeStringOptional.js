import { defineType, defineField } from 'sanity'
import { supportedLanguages } from './supportedLanguages'

export default defineType({
  title: 'Localized string (optional)',
  name: 'localeStringOptional',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: supportedLanguages.map(lang => defineField({
    title: lang.title,
    name: lang.id,
    type: 'string',
  }))
})
