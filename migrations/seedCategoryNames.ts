import { defineMigration, at, set, createOrReplace } from "sanity/migrate";

const doc = {
  _id: "categoryNames",
  _type: "categoryNames",
  highlighted: { _type: "localeString", en: "Highlighted", fr: "En Vedette", nl: "Uitgelicht" },
  bts: { _type: "localeString", en: "Set Photography", fr: "Photographie de Plateau", nl: "Setfotografie" },
  corp: { _type: "localeString", en: "Corporate & Brand Photography", fr: "Photographie Corporate & de Marque", nl: "Corporate & Merkfotografie" },
  events: { _type: "localeString", en: "Event & Documentary Photography", fr: "Photographie Événementielle & Documentaire", nl: "Evenementen- & Documentairefotografie" },
  docu: { _type: "localeString", en: "Portraits & Professional Headshots", fr: "Portraits & Headshots Professionnels", nl: "Portretten & Professionele Headshots" },
  studio: { _type: "localeString", en: "Product & Food Photography", fr: "Photographie de Produits & Culinaire", nl: "Product- & Foodfotografie" },
  art: { _type: "localeString", en: "Fine Art & Personal Projects", fr: "Beaux-Arts & Projets Personnels", nl: "Beeldende Kunst & Persoonlijke Projecten" },
};

export default defineMigration({
  title: "Seed categoryNames singleton with default translations",
  async *migrate() {
    yield createOrReplace(doc);
  },
});
