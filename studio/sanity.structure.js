// import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const myStructure = (S, context) => {
  return (
    S.list()
      .title('Content ~ Enjoy Broertje ❤️')
      .items([
        S.listItem()
          .title('Contact Page')
          .child(
            S.list()
              .title('Sections')
              .items([
                S.listItem()
                  .title('Contact Details')
                  .child(
                    S.document()
                      .schemaType('contactPageCDS')
                      .documentId('contactPageCDS')),
                S.listItem()
                  .title('Trusted By')
                  .child(
                    S.document()
                      .schemaType('contactPageTBS')
                      .documentId('contactPageTBS')),
                S.listItem()
                  .title('Contact Form')
                  .child(
                    S.document()
                      .schemaType('contactPageAOS')
                      .documentId('contactPageAOS')),
                S.listItem()
                  .title('Printing Service')
                  .child(
                    S.document()
                      .schemaType('contactPagePSS')
                      .documentId('contactPagePSS')),
                S.listItem()
                  .title('Portfolio')
                  .child(
                    S.document()
                      .schemaType('contactPagePFS')
                      .documentId('contactPagePFS')),
                S.listItem()
                  .title('Get Inspired')
                  .child(
                    S.document()
                      .schemaType('contactPageGIS')
                      .documentId('contactPageGIS')),
              ])
          ),
        // S.divider(),
        ...S.documentTypeListItems().filter(
          (listItem) => !['contactPageGIS','contactPageCDS','contactPageTBS','contactPageAOS','contactPagePSS','contactPagePFS',].includes(listItem.getId()))
      ])
  )
}