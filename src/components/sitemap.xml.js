import client from "@lib/sanity";
import { supportedLanguages } from "sanity/schemas/supportedLanguages";

function languify(url) {
  let obj = {};
  supportedLanguages.forEach((lang) => (obj = { ...obj, ...{ [lang.id]: url.replace("*", lang.id) } }));
  return obj;
}
export default async function sitemap() {
  // let projects = await getProjects();
  const projects = await client.fetch(`*[_type == "project"]|{'slug':slug.current,commissionedBool}`);
  //[
  //   { slug: 'nyx' },
  //   { slug: 'boite-savon' },
  //   { slug: 'le-pack-total' },
  //   { slug: 'bon-luxe' },
  //   { slug: 'porte-savon' },
  //   { slug: 'chaos' }
  // ]

  let output = [
    {
      url: "https://miloweiler.com",
      lastModified: new Date(),
      alternates: {
        languages: languify("https://miloweiler.com/*"),
      },
      priority: 1,
    },
    {
      url: "https://miloweiler.com/contact",
      lastModified: new Date(),
      alternates: {
        languages: languify("https://miloweiler.com/*/contact"),
      },
      priority: 0.6,
    },

    ...projects.map((project) =>
      project.commissionedBool
        ? {
            url: `https://miloweiler.com/commissioned/${project.slug}`,
            lastModified: new Date(),
            alternates: {
              languages: languify(`https://miloweiler.com/*/commissioned/${project.slug}`),
            },
            priority: 0.9,
          }
        : {
            url: `https://miloweiler.com/personal/${project.slug}`,
            lastModified: new Date(),
            alternates: {
              languages: languify(`https://miloweiler.com/*/personal/${project.slug}`),
            },
            priority: 0.9,
          }
    ),
  ];

  return output;
}
