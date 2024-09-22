/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...index]]\page.jsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { netlifyWidget } from "sanity-plugin-dashboard-widget-netlify";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
// import {schema} from './sanity/schema'
import { schemaTypes } from "./sanity/schemas";
import { myStructure } from "./sanity.structure";
import { Love } from "./sanity/actions";
import { dashboardTool } from "@sanity/dashboard";
import myLogo from "./sanity/lib/logo";

export default defineConfig({
  basePath: "/studio",
  // name: 'default',
  // title: "Milo's Studio 📷",
  projectId,
  dataset,
  icon: myLogo,
  plugins: [
    structureTool({
      structure: myStructure,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    dashboardTool({
      widgets: [
        netlifyWidget({
          title: "Netlify deploy",
          sites: [
            {
              title: "miloweiler.com",
              apiId: "a375466f-a5ae-4321-b4d1-1db8f9255656",
              buildHookId: "6422eff2de1ba2032935243d",
              name: "miloweiler",
            },
          ],
        }),
      ],
    }),
  ],
  document: {
    actions: [Love],
    // unstable_comments: {
    //   enabled: false,
    // },
  },
  schema: {
    types: schemaTypes,
  },
});
