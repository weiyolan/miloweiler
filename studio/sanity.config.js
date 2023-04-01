import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { dashboardTool } from "@sanity/dashboard";
import { netlifyWidget } from "sanity-plugin-dashboard-widget-netlify";
import { myStructure } from './sanity.structure';
import {Love} from './actions'

export default defineConfig({
  name: 'default',
  title: "Milo's Studio 📷",
  projectId: 'erjr84ua',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: myStructure
    }),
    visionTool(),
    dashboardTool({
      widgets: [
        netlifyWidget({
          title: 'Netlify deploy',
          sites: [
            {
              title: 'miloweiler.com',
              apiId: 'a375466f-a5ae-4321-b4d1-1db8f9255656',
              buildHookId: '6422eff2de1ba2032935243d',
              name: 'miloweiler',
            },]
        })],
    }),
  ],
  document:{
    actions: [Love],
  },
  schema: {
    types: schemaTypes,
  },
})
