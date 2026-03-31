import { defineMigration, patch, at, replace } from 'sanity/migrate'

export default defineMigration({
  title: 'Wrap mainPageXIntro images in altImage objects',
  documentTypes: ['mainPageXIntro'],
  migrate: {
    document(doc) {
      const images = doc.images
      if (!Array.isArray(images) || images.length === 0) return []

      return images
        .filter((img: any) => img._type === 'image' || img._type === 'metaImage')
        .flatMap((img: any) => {
          const { _key, _type, ...imageProps } = img
          return [
            patch(
              doc._id,
              at(
                ['images'],
                replace(
                  [
                    {
                      _type: 'altImage',
                      _key,
                      image: { _type: 'image', ...imageProps },
                      alt: { en: '', fr: '' },
                    },
                  ],
                  { _key }
                )
              )
            ),
          ]
        })
    },
  },
})
