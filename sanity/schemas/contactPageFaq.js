import { defineField, defineType } from 'sanity'
import { FAQ_DEFAULTS } from './contactPageFaqDefaults'

// Contact page FAQ. Shown at the bottom of /contact and sent to Google as FAQPage structured data,
// so keep answers factual and the same in all three languages.
export default defineType({
  name: 'contactPageFaq',
  title: 'FAQ Section',
  type: 'document',
  // Pre-filled with the current questions the first time the document is opened; publish to take over.
  initialValue: {
    enabled: true,
    title: { _type: 'localeString', ...FAQ_DEFAULTS.title },
    items: FAQ_DEFAULTS.items.map((item, i) => ({
      _key: `faq${i + 1}`,
      _type: 'faqItem',
      question: { _type: 'localeString', ...item.q },
      answer: { _type: 'localeText', ...item.a },
    })),
  },
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show FAQ on the contact page',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'localeString',
    }),
    defineField({
      name: 'items',
      title: 'Questions',
      description: 'Drag to reorder. Short, factual answers work best (Google reads them too).',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'Question',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'localeString', validation: (Rule) => Rule.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'localeText', validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: 'question.en', subtitle: 'answer.en' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'FAQ Section' }
    },
  },
})
