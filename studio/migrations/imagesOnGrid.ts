import {
  defineMigration,
  patch,
  at,
  set,
  unset,
  setIfMissing,
  createIfNotExists,
  replace,
} from 'sanity/migrate'

export default defineMigration({
  title: 'Migrate to new projectImage structure',
  documentTypes: ['project'],

  // https://www.sanity.io/docs/content-migration-cheatsheet

  migrate: {
    document(doc, context) {
      const projectImages = doc.otherImages
      // console.log(projectImages)
      if (Array.isArray(projectImages) && projectImages.length > 0) {
        return (
          projectImages
            // skip pets that have already been converted to a reference
            .filter((image) => image._type === 'metaImage')
            .flatMap((image) => {
              // avoid carrying over the array _key to the pet document
              const {_key, ...attributes} = image

              return [
                patch(
                  doc._id,
                  at(
                    ['otherImages'],
                    replace(
                      [
                        {
                          // _id: petId,
                          _type: 'object',
                          image: {...attributes},
                          border: false,
                          position: {x: 1, width: 1, y: 1, height: 1},
                        },
                      ],
                      {_key}
                    )
                  )
                ),
              ]
            })
        )
      }
    },
    // boolean(node, path, context) {
    //   console.log(node, path, context)
    //   // this will be called for every boolean node in every document of the matching type
    // },
    // object(node, path, context) {
    //   // this will be called for every object node in every document of the matching type
    //   // if (path)
    // },
    // array(node, path, context) {
    //   if (path[0] == 'otherImages') {
    //     console.log(node)
    //       return [at('projectImages', setIfMissing(false))]
    //     // }
    //     // this will be called for every array node in every document of the matching type
    //   }
    // },
  },
})
