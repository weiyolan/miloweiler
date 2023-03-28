import { defineType, defineField } from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

const supportedLanguages = [
  { id: 'en', title: 'English', isDefault: true },
  // { id: 'no', title: 'Norwegian' },
  { id: 'fr', title: 'French' }
]

// const baseLanguage = supportedLanguages.find(l => l.isDefault)

export default defineType({
  title: 'Localized string',
  name: 'localeString',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true }
    }
  ],
  fields: supportedLanguages.map(lang => defineField({
    title: lang.title,
    name: lang.id,
    type: 'string',
    fieldset: lang.isDefault ? null : 'translations',
    validation: Rule => Rule.required()
  }))
}

)
