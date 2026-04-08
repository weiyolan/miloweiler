import client from "../../lib/sanity";
import { CATEGORY_MAP, ALL_CATEGORY_SLUGS } from "@/utils/categories";

function generateSiteMap(projects) {
  const now = new Date(Date.now()).toISOString();

  function urlEntry(path) {
    return `
      <url>
        <loc>https://miloweiler.com${path}</loc>
        <xhtml:link rel='alternate' hreflang='en' href='https://miloweiler.com${path}'/>
        <xhtml:link rel='alternate' hreflang='fr' href='https://miloweiler.com/fr${path}'/>
        <lastmod>${now}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>https://miloweiler.com/fr${path}</loc>
        <xhtml:link rel='alternate' hreflang='en' href='https://miloweiler.com${path}'/>
        <xhtml:link rel='alternate' hreflang='fr' href='https://miloweiler.com/fr${path}'/>
        <lastmod>${now}</lastmod>
        <priority>0.80</priority>
      </url>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      <url>
          <loc>https://miloweiler.com/</loc>
          <xhtml:link rel='alternate' hreflang='en' href='https://miloweiler.com/'/>
          <xhtml:link rel='alternate' hreflang='fr' href='https://miloweiler.com/fr'/>
          <lastmod>${now}</lastmod>
          <priority>1.00</priority>
      </url>
      <url>
         <loc>https://miloweiler.com/fr</loc>
          <xhtml:link rel='alternate' hreflang='en' href='https://miloweiler.com/'/>
          <xhtml:link rel='alternate' hreflang='fr' href='https://miloweiler.com/fr'/>
          <lastmod>${now}</lastmod>
          <priority>0.80</priority>
      </url>
    ${urlEntry('/about')}
    ${urlEntry('/contact')}
    ${ALL_CATEGORY_SLUGS.map(slug => urlEntry(`/${slug}`)).join('')}
    ${projects.map(({ cat, slug }) => urlEntry(`/${CATEGORY_MAP[cat]}/${slug}`)).join('')}
  </urlset>
`;
}

export default function SiteMap() {}

export async function getServerSideProps({ req, res }) {
  const projects = await client.fetch(`*[_type == "project"]|{'slug':slug.current, cat}`);
  const sitemap = generateSiteMap(projects);

  res.setHeader("Content-Type", "text/xml");
  res.statusCode = 200;
  res.end(sitemap);

  return {
    props: {},
  };
}
