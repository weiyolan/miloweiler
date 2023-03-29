import { defineType, defineField } from 'sanity'
import { supportedLanguages } from './supportedLanguages'

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


// const baseLanguage = supportedLanguages.find(l => l.isDefault)

export default defineType({
  title: 'Localized string',
  name: 'localeString',
  type: 'object',
  options: { collapsible: true, collapsed:false }, 
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true , collapsed:true}
    }
  ],
  fields: supportedLanguages.map(lang => defineField({
    title: lang.title,
    name: lang.id,
    type: 'string',
    // fieldset: 'translations',
    fieldset: lang.isDefault ? null : 'translations',
    // validation: Rule => Rule.required()
  }))
}

)
