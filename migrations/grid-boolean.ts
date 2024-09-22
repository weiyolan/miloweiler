import { defineMigration, patch, at, set, unset, setIfMissing } from "sanity/migrate";
// import {defineMigration} from 'sanity/migrate'

export default defineMigration({
  title: "Set all Grid Toggles to false by default",
  documentTypes: ["project"],
  async *migrate(documents, context) {
    for await (const document of documents()) {
      // console.log(document.title)
      yield patch(document._id, [
        at(
          "minimalTekst",
          // set({
          // _id: petId,
          // _type: 'object',
          // grid: false,
          // cols: {lg: 24, sm: 12},
          // rows: {lg: 10, sm: 20},
          // })
          unset()
        ),
        at(
          "minimalText",
          // set({
          // _id: petId,
          // _type: 'object',
          // grid: false,
          // cols: {lg: 24, sm: 12},
          // rows: {lg: 10, sm: 20},
          // })
          setIfMissing(false)
        ),
      ]);
    }
  },
  // migrate: {
  //   document(doc, context) {
  //     console.log(doc.title, doc.grid)
  //     return [at('newGrid', setIfMissing(false))]
  //   },
  // boolean(node, path, context) {
  //   console.log(node, path, context)
  //   // this will be called for every boolean node in every document of the matching type
  // },
  // object(node, path, context) {
  //   // this will be called for every object node in every document of the matching type
  //   // if (path)
  // },
  // array(node, path, context) {
  //   // this will be called for every array node in every document of the matching type
  // },
  // },
});
