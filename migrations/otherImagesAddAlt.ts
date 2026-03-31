import { defineMigration, patch, at, setIfMissing } from 'sanity/migrate'

export default defineMigration({
  title: 'Add alt text field to project otherImages',
  documentTypes: ['project'],
  migrate: {
    document(doc) {
      const otherImages = doc.otherImages
      if (!Array.isArray(otherImages) || otherImages.length === 0) return []

      return otherImages
        .filter((img: any) => !img.alt)
        .map((img: any) => {
          const index = otherImages.indexOf(img)
          return patch(doc._id, [
            at(['otherImages', index, 'alt'], setIfMissing({ en: '', fr: '' })),
          ])
        })
    },
  },
})
