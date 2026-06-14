import { defineType, defineField } from 'sanity'

// Pre-populated with the SEO copy that is currently hardcoded in each page's
// <Head>, so Milo starts from the live values instead of empty fields. Only the
// English defaults are seeded (the pages only had English literals); fr/nl can
// be filled in by Milo. Empty fields fall back to the in-page defaults.
const PAGE_FIELDS = [
  {
    name: 'home',
    title: 'Home',
    initialValue: {
      seoTitle: { en: 'Milo Weiler Photography | Set, Portrait & Corporate Photographer' },
      seoDescription: { en: 'Witness the Beauty of Life' },
    },
  },
  {
    name: 'about',
    title: 'About',
    initialValue: {
      seoTitle: { en: 'Milo Weiler Photography | About Me' },
      seoDescription: { en: 'From behind the scenes Set Photography to the Studio and Outdoors.' },
    },
  },
  {
    name: 'contact',
    title: 'Contact',
    initialValue: {
      seoTitle: { en: 'Milo Weiler Photography | A Unique Style In Artistic Photography' },
      seoDescription: { en: 'Discover the power of visual storytelling through my lens.' },
    },
  },
]

export default defineType({
  name: 'pageSeo',
  title: 'Page SEO',
  type: 'document',
  fieldsets: PAGE_FIELDS.map(({ name, title }) => ({
    name,
    title,
    options: { collapsible: true, collapsed: true },
  })),
  fields: PAGE_FIELDS.map(({ name, title, initialValue }) =>
    defineField({
      name,
      title,
      type: 'seo',
      fieldset: name,
      initialValue,
    })
  ),
  preview: {
    prepare() {
      return { title: 'Page SEO' }
    },
  },
})
