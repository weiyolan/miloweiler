import client from "../../lib/sanity";
// import { supportedLanguages } from "studio/schemas/supportedLanguages";

function generateSiteMap(projects) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      <url>
          <loc>https://miloweiler.com/</loc>
          <xhtml:link
              rel='alternate'
              hreflang='en'
              href='https://miloweiler.com/'/>
          <xhtml:link
              rel='alternate'
              hreflang='fr'
              href='https://miloweiler.com/fr'/>
          <lastmod>2023-10-17T17:34:10+00:00</lastmod>
          <priority>1.00</priority>
      </url>
      <url>
         <loc>https://miloweiler.com/fr</loc>
          <xhtml:link
              rel='alternate'
              hreflang='en'
              href='https://miloweiler.com/'/>
          <xhtml:link
              rel='alternate'
              hreflang='fr'
              href='https://miloweiler.com/fr'/>
          <lastmod>2023-10-17T17:34:10+00:00</lastmod>
          <priority>0.80</priority>
      </url>
        <url>
         <loc>https://miloweiler.com/contact</loc>
          <xhtml:link
              rel='alternate'
              hreflang='en'
              href='https://miloweiler.com/contact'/>
          <xhtml:link
              rel='alternate'
              hreflang='fr'
              href='https://miloweiler.com/fr/contact'/>
          <lastmod>2023-10-17T17:34:10+00:00</lastmod>
          <priority>0.80</priority>
      </url>
      <url>
         <loc>https://miloweiler.com/fr/contact</loc>
          <xhtml:link
              rel='alternate'
              hreflang='en'
              href='https://miloweiler.com/contact'/>
          <xhtml:link
              rel='alternate'
              hreflang='fr'
              href='https://miloweiler.com/fr/contact'/>
          <lastmod>2023-10-17T17:34:10+00:00</lastmod>
          <priority>0.80</priority>
      </url>
      <url>
         <loc>https://miloweiler.com/gallery</loc>
          <xhtml:link
              rel='alternate'
              hreflang='en'
              href='https://miloweiler.com/gallery'/>
          <xhtml:link
              rel='alternate'
              hreflang='fr'
              href='https://miloweiler.com/fr/gallery'/>
          <lastmod>2023-10-17T17:34:10+00:00</lastmod>
          <priority>0.80</priority>
      </url>
      <url>
         <loc>https://miloweiler.com/fr/gallery</loc>
          <xhtml:link
              rel='alternate'
              hreflang='en'
              href='https://miloweiler.com/gallery'/>
          <xhtml:link
              rel='alternate'
              hreflang='fr'
              href='https://miloweiler.com/fr/gallery'/>
          <lastmod>2023-10-17T17:34:10+00:00</lastmod>
          <priority>0.80</priority>
      </url>
    ${projects
      .map(({ slug }) => {
        return `
        <url>
        <loc>https://miloweiler.com/gallery/${slug}</loc>
         <xhtml:link
             rel='alternate'
             hreflang='en'
             href='https://miloweiler.com/gallery/${slug}'/>
         <xhtml:link
             rel='alternate'
             hreflang='fr'
             href='https://miloweiler.com/fr/gallery/${slug}'/>
         <lastmod>2023-10-17T17:34:10+00:00</lastmod>
         <priority>0.80</priority>
     </url>
     <url>
        <loc>https://miloweiler.com/fr/gallery/${slug}</loc>
         <xhtml:link
             rel='alternate'
             hreflang='en'
             href='https://miloweiler.com/gallery/${slug}'/>
         <xhtml:link
             rel='alternate'
             hreflang='fr'
             href='https://miloweiler.com/fr/gallery/${slug}'/>
         <lastmod>2023-10-17T17:34:10+00:00</lastmod>
         <priority>0.80</priority>
     </url>
    `;
      })
      .join("")}
  </urlset>
`;
}

export default function SiteMap() {}

export async function getServerSideProps() {
  const projects = await client.fetch(`*[_type == "project"]|{slug}`);
  // const projects = await client.fetch(`*[_type == "project"]|{slug, title, subTitle, by, cat, description, mainImage{alt,image{asset->{url,metadata}, ...asset{_ref}}}}`);
  const sitemap = generateSiteMap(projects);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
