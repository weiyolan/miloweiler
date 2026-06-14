import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'localeStringOptional',
      description: 'Title shown in browser tabs, search results and social shares. Leave empty to use the default page title.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'localeStringOptional',
      description: 'Meta description for search engines and social sharing. Keep under 160 characters. Leave empty to use the default.',
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      description: 'Custom image for social sharing (1200×630 recommended). Leave empty to use the default page image.',
      options: { hotspot: true },
    }),
  ],
})
