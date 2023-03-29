import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const myStructure = (S, context) => {
  return (
    S.list()
      .title('Content')
      .items([
        S.listItem()
          .title('Contact Page')
          .child(
            S.list()
              .title('Contact Page')
              .items([
                S.listItem()
                  .title('Contact Details Section')
                  .child(
                    S.document()
                      .schemaType('contactPageCDS')
                      .documentId('contactPageCDS')),
                S.listItem()
                  .title('Trusted By Section')
                  .child(
                    S.document()
                      .schemaType('contactPageTBS')
                      .documentId('contactPageTBS')),
                S.listItem()
                  .title('Contact Form Section')
                  .child(
                    S.document()
                      .schemaType('contactPageAOS')
                      .documentId('contactPageAOS')),
                S.listItem()
                  .title('Printing Service Section')
                  .child(
                    S.document()
                      .schemaType('contactPagePSS')
                      .documentId('contactPagePSS')),
                S.listItem()
                  .title('Portfolio Section')
                  .child(
                    S.document()
                      .schemaType('contactPagePFS')
                      .documentId('contactPagePFS')),
                S.listItem()
                  .title('Get Inspired Section')
                  .child(
                    S.document()
                      .schemaType('contactPageGIS')
                      .documentId('contactPageGIS')),
                // orderableDocumentListDeskItem({
                //   type: 'trustedBy',
                //   title: 'Trusted By Logos',
                //   id: 'trustedBy',
                //   S, context
                // }),
              ])
          ),
        // Minimum required configuration
        S.divider(),
        ...S.documentTypeListItems().filter(
          (listItem) => !['contactPageGIS','contactPageCDS','contactPageTBS','contactPageAOS','contactPagePSS','contactPagePFS',].includes(listItem.getId()))
      ])
  )
}