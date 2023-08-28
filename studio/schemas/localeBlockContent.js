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
  title: 'Localized blockContent',
  name: 'localeBlockContent',
  type: 'object',
  options: { collapsible: true, collapsed:true }, 
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true , collapsed:false}
    }
  ],
  fields: supportedLanguages.map(lang => defineField({
    title: lang.title,
    name: lang.id,
    type: 'blockContent',
    fieldset: lang.isDefault ? null : 'translations',
    validation: Rule => Rule.required()
  }))
}

)
