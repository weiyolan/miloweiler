// import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { MasterDetailIcon } from '@sanity/icons'
import { BlockElementIcon } from '@sanity/icons'

export const myStructure = (S) => {
  return S.list()
    .title('Content ~ Enjoy Broertje ❤️')
    .items([
      S.listItem()
        .title('Main Page')
        .icon(MasterDetailIcon)
        .child(
          S.list()
            .title('Sections')
            .items([
              S.listItem()
                .title('Intro: Logo')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('mainPageXIntro').documentId('mainPageINT')),
              S.listItem()
                .title('1: Behind The Scenes')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('mainPageXXX').documentId('mainPageBTS')),
              S.listItem()
                .title('2: Documentary')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('mainPageXXX').documentId('mainPageDOC')),
              S.listItem()
                .title('3: Fine Art')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('mainPageXXX').documentId('mainPageFIN')),
              S.listItem()
                .title('4: Studio')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('mainPageXXX').documentId('mainPageSTU')),
              S.listItem()
                .title('Outro: Milo')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('mainPageYYY').documentId('mainPageOUT')),
            ])
        ),
      S.listItem()
        .title('Contact Page')
        .icon(MasterDetailIcon)
        .child(
          S.list()
            .title('Sections')
            .items([
              S.listItem()
                .title('Contact Details')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('contactPageCDS').documentId('contactPageCDS')),
              S.listItem()
                .title('Trusted By')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('contactPageTBS').documentId('contactPageTBS')),
              S.listItem()
                .title('Contact Form')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('contactPageAOS').documentId('contactPageAOS')),
              S.listItem()
                .title('Printing Service')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('contactPagePSS').documentId('contactPagePSS')),
              S.listItem()
                .title('Portfolio')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('contactPagePFS').documentId('contactPagePFS')),
              S.listItem()
                .title('Get Inspired')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('contactPageGIS').documentId('contactPageGIS')),
            ])
        ),
      // S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'portfolio',
            'contactPageGIS',
            'contactPageCDS',
            'contactPageTBS',
            'contactPageAOS',
            'contactPagePSS',
            'contactPagePFS',
            'mainPageXXX',
            'mainPageXIntro',
            'mainPageYYY',
          ].includes(listItem.getId())
      ),
    ])
}