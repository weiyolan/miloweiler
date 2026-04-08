import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'businessInfo',
  title: 'Business Info',
  type: 'document',
  fieldsets: [
    { name: 'contact', title: 'Contact', options: { columns: 2 } },
    { name: 'templates', title: 'Message Templates', options: { collapsible: true, collapsed: true } },
    { name: 'socials', title: 'Socials', options: { columns: 3 } },
  ],
  fields: [
    // ── Contact ──
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      fieldset: 'contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      fieldset: 'contact',
      description: 'Include country code, e.g. +32 476 50 62 09',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vat',
      title: 'VAT Number',
      type: 'string',
      fieldset: 'contact',
      description: 'e.g. BE 0791 549 197',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      fieldset: 'contact',
      description: 'Digits only with country code, e.g. 32476506209',
    }),

    // ── Address ──
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      options: { columns: 2 },
      fields: [
        defineField({ name: 'street', title: 'Street', type: 'string' }),
        defineField({ name: 'postalCode', title: 'Postal Code', type: 'string' }),
        defineField({ name: 'city', title: 'City', type: 'string' }),
        defineField({ name: 'country', title: 'Country', type: 'string' }),
      ],
    }),

    // ── Message Templates ──
    defineField({
      name: 'mailtoSubject',
      title: 'Email Subject Template',
      type: 'localeString',
      fieldset: 'templates',
      description: 'Pre-filled subject line when visitors click the email link.',
    }),
    defineField({
      name: 'mailtoBody',
      title: 'Email Body Template',
      type: 'localeText',
      fieldset: 'templates',
      description: 'Pre-filled email body when visitors click the email link.',
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'WhatsApp Message Template',
      type: 'localeText',
      fieldset: 'templates',
      description: 'Pre-filled message when visitors click the WhatsApp link.',
    }),

    // ── Socials ──
    defineField({
      name: 'socialInstagram',
      title: 'Instagram URL',
      type: 'url',
      fieldset: 'socials',
    }),
    defineField({
      name: 'socialUnsplash',
      title: 'Unsplash URL',
      type: 'url',
      fieldset: 'socials',
    }),
    defineField({
      name: 'socialLinkedin',
      title: 'LinkedIn URL',
      type: 'url',
      fieldset: 'socials',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Business Info' }
    },
  },
})
