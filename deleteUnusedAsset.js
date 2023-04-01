// This script will find and delete all assets that are not
// referenced (in use) by other documents. Sometimes refered
// to as "orphaned" assets.
//
// Place this script somewhere and run it through
// `sanity exec <script-filename.js> --with-user-token`

/* eslint-disable no-console */
// import client from '../lib/sanity'
// import {client} from 'part:@sanity/base/client'

import {
  createClient,
} from "next-sanity";

const config = {
  dataset: "production",
  projectId: 'erjr84ua',
  apiVersion: "2023-02-06", 
  token: 'skfQfHDoNFICsM4GjThHa9FsI2fuq0lGIJRUBtdUXJ0CHp09UnxIw9GXRGwm7gwlacVtQS33mzM6lsQW5fVQnl9ZykGdjKtAUhrBNqQOw9uv08L6JvyHyUHWTSa1Bom8i1btinlgS5I1XB4ABFhhoTASIW7yz2QWv2HmE2yPcsy3NC7eiWCg',
  useCdn: false
};

const client = createClient(config);


const query = `
  *[ _type in ["sanity.imageAsset", "sanity.fileAsset"] ]
  {_id, "refs": count(*[ references(^._id) ])}
  [ refs == 0 ]
  ._id
`

client
  .fetch(query)
  .then(ids => {
    if (!ids.length) {
      console.log('No assets to delete')
      return true
    }

    console.log(`Deleting ${ids.length} assets`)
    return ids
      .reduce((trx, id) => trx.delete(id), client.transaction())
      .commit()
      .then(() => console.log('Done!'))
  })
  .catch(err => {
    if (err.message.includes('Insufficient permissions')) {
      console.error(err.message)
      console.error('Did you forget to pass `--with-user-token`?')
    } else {
      console.error(err.stack)
    }
  })