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
          <lastmod>${new Date(Date.now()).toISOString()}</lastmod>
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
          <lastmod>${new Date(Date.now()).toISOString()}</lastmod>
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
          <lastmod>${new Date(Date.now()).toISOString()}</lastmod>
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
          <lastmod>${new Date(Date.now()).toISOString()}</lastmod>
          <priority>0.80</priority>
      </url>
      <url>
         <loc>https://miloweiler.com/commissioned</loc>
          <xhtml:link
              rel='alternate'
              hreflang='en'
              href='https://miloweiler.com/commissioned'/>
          <xhtml:link
              rel='alternate'
              hreflang='fr'
              href='https://miloweiler.com/fr/commissioned'/>
          <lastmod>${new Date(Date.now()).toISOString()}</lastmod>
          <priority>0.80</priority>
      </url>
      <url>
         <loc>https://miloweiler.com/fr/commissioned</loc>
          <xhtml:link
              rel='alternate'
              hreflang='en'
              href='https://miloweiler.com/commissioned'/>
          <xhtml:link
              rel='alternate'
              hreflang='fr'
              href='https://miloweiler.com/fr/commissioned'/>
          <lastmod>${new Date(Date.now()).toISOString()}</lastmod>
          <priority>0.80</priority>
      </url>
       <url>
         <loc>https://miloweiler.com/personal</loc>
          <xhtml:link
              rel='alternate'
              hreflang='en'
              href='https://miloweiler.com/personal'/>
          <xhtml:link
              rel='alternate'
              hreflang='fr'
              href='https://miloweiler.com/fr/personal'/>
          <lastmod>${new Date(Date.now()).toISOString()}</lastmod>
          <priority>0.80</priority>
      </url>
      <url>
         <loc>https://miloweiler.com/fr/personal</loc>
          <xhtml:link
              rel='alternate'
              hreflang='en'
              href='https://miloweiler.com/personal'/>
          <xhtml:link
              rel='alternate'
              hreflang='fr'
              href='https://miloweiler.com/fr/personal'/>
          <lastmod>${new Date(Date.now()).toISOString()}</lastmod>
          <priority>0.80</priority>
      </url>
    ${projects
      .map(({ commissionedBool, slug }) => {
        if (commissionedBool) {
          return `
          <url>
          <loc>https://miloweiler.com/commissioned/${slug}</loc>
           <xhtml:link
               rel='alternate'
               hreflang='en'
               href='https://miloweiler.com/commissioned/${slug}'/>
           <xhtml:link
               rel='alternate'
               hreflang='fr'
               href='https://miloweiler.com/fr/commissioned/${slug}'/>
           <lastmod>${new Date(Date.now()).toISOString()}</lastmod>
           <priority>0.80</priority>
       </url>
       <url>
          <loc>https://miloweiler.com/fr/commissioned/${slug}</loc>
           <xhtml:link
               rel='alternate'
               hreflang='en'
               href='https://miloweiler.com/commissioned/${slug}'/>
           <xhtml:link
               rel='alternate'
               hreflang='fr'
               href='https://miloweiler.com/fr/commissioned/${slug}'/>
           <lastmod>${new Date(Date.now()).toISOString()}</lastmod>
           <priority>0.80</priority>
       </url>
      `;
        } else {
          return `
        <url>
        <loc>https://miloweiler.com/personal/${slug}</loc>
         <xhtml:link
             rel='alternate'
             hreflang='en'
             href='https://miloweiler.com/personal/${slug}'/>
         <xhtml:link
             rel='alternate'
             hreflang='fr'
             href='https://miloweiler.com/fr/personal/${slug}'/>
         <lastmod>${new Date(Date.now()).toISOString()}</lastmod>
         <priority>0.80</priority>
     </url>
     <url>
        <loc>https://miloweiler.com/fr/personal/${slug}</loc>
         <xhtml:link
             rel='alternate'
             hreflang='en'
             href='https://miloweiler.com/personal/${slug}'/>
         <xhtml:link
             rel='alternate'
             hreflang='fr'
             href='https://miloweiler.com/fr/personal/${slug}'/>
         <lastmod>${new Date(Date.now()).toISOString()}</lastmod>
         <priority>0.80</priority>
     </url>
    `;
        }
      })
      .join("")}
  </urlset>
`;
}

export default function SiteMap() {}

export async function getServerSideProps({ req, res }) {
  const projects = await client.fetch(`*[_type == "project"]|{'slug':slug.current,commissionedBool}`);
  // const projects = await client.fetch(`*[_type == "project"]|{slug, title, subTitle, by, cat, description, mainImage{alt,image{asset->{url,metadata}, ...asset{_ref}}}}`);
  const sitemap = generateSiteMap(projects);

  res.setHeader("Content-Type", "text/xml");
  res.statusCode = 200;
  // we send the XML to the browser
  // res.write(sitemap);
  // res.writeHead(200, { "Content-Type": "application/xml" });
  res.end(sitemap);

  // const stream = new SitemapStream({
  //   hostname: `https://${req.headers.host}`,
  // });

  // res.writeHead(200, {
  //   'Content-Type': 'application/xml',
  // });

  // const xmlString = await streamToPromise(
  //   Readable.from(links).pipe(stream),
  // ).then((data) => data.toString());

  // res.end(xmlString);

  return {
    props: {},
  };
}
