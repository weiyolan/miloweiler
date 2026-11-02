import { defineMigration, at, setIfMissing } from "sanity/migrate";

// Pre-fills the new optional `location` field (localeStringOptional) on projects whose
// description already says where they were shot. Projects without a clear location are left
// empty for Milo to fill in (or leave blank). Keyed by document _id (two projects share the
// title "Blendclub XL"); `setIfMissing` never overwrites a value Milo has already entered,
// so it is safe to re-run.
//
// Run (from the repo root, logged in with `npx sanity login`):
//   npx sanity migration run seedProjectLocations            # dry run
//   npx sanity migration run seedProjectLocations --no-dry-run
const LOCATIONS: Record<string, { en: string; fr: string; nl: string }> = {
  // Mastercard at Money20/20 Europe 2026: "held at the RAI Amsterdam"
  "d51a65d8-f688-4431-98da-d52cc296f6c0": { en: "RAI Amsterdam, Netherlands", fr: "RAI Amsterdam, Pays-Bas", nl: "RAI Amsterdam, Nederland" },
  // Mastercard & ECES: "at the Convene venue in London"
  "29662b1d-612c-4a9e-8dfe-bc54ce4871bb": { en: "London, United Kingdom", fr: "Londres, Royaume-Uni", nl: "Londen, Verenigd Koninkrijk" },
  // Mastercard & SCEWC: "Smart City Expo World Congress 2023 in Barcelona"
  "0cc0f84d-f288-454b-8738-cb688631bac4": { en: "Barcelona, Spain", fr: "Barcelone, Espagne", nl: "Barcelona, Spanje" },
  // KRAAK KRAAK KRAAK: "an abandoned house on the edge of Antwerp"
  "b7ffd404-bb93-453e-8db6-505af564bb2d": { en: "Antwerp, Belgium", fr: "Anvers, Belgique", nl: "Antwerpen, België" },
  // 20km through Brussels
  "1270e70b-d2fc-4d12-9452-86db6abe58f1": { en: "Brussels, Belgium", fr: "Bruxelles, Belgique", nl: "Brussel, België" },
  // MNM - Back to the 90's: "at the AFAS Dome" (Antwerp)
  "e6df2a51-4ef2-4838-bf3c-9098e65a0aa3": { en: "AFAS Dome, Antwerp", fr: "AFAS Dome, Anvers", nl: "AFAS Dome, Antwerpen" },
  // KU Leuven 600 Years: "across the city of Leuven"
  "c08c688d-d031-4432-ab16-cfbad00607bd": { en: "Leuven, Belgium", fr: "Louvain, Belgique", nl: "Leuven, België" },
  // Come Back at Film Festival Oostende
  "2b8b107e-80f5-4ca2-9267-88ffa7e52e3b": { en: "Ostend, Belgium", fr: "Ostende, Belgique", nl: "Oostende, België" },
  // Alban a Stranger: "on the coast of Asturias in northern Spain"
  "e3dfb76f-6ce4-4884-8ad8-67852b2aa6bf": { en: "Asturias, Spain", fr: "Asturies, Espagne", nl: "Asturië, Spanje" },
  // Glassware in the Wild: "travelling through France and Spain"
  "6c3ee4e4-f181-4e39-bd75-1a8d8d956719": { en: "France & Spain", fr: "France & Espagne", nl: "Frankrijk & Spanje" },
  // Piet Boon Studio: "made in their Amsterdam showroom"
  "795d56db-0657-4b45-92c1-944dee5c311b": { en: "Amsterdam, Netherlands", fr: "Amsterdam, Pays-Bas", nl: "Amsterdam, Nederland" },
  // Tom: "portraits made in Brussels"
  "a3901c26-cc6f-46b8-bfbb-680952ef9204": { en: "Brussels, Belgium", fr: "Bruxelles, Belgique", nl: "Brussel, België" },
  // Oak Properties: "developments across Belgium"
  "4663d36c-30ec-41dc-86c2-53029ae35942": { en: "Belgium", fr: "Belgique", nl: "België" },
};

export default defineMigration({
  title: "Seed project locations from their descriptions",
  documentTypes: ["project"],
  // Published + draft versions of the listed projects.
  filter: `_id in ${JSON.stringify(Object.keys(LOCATIONS).flatMap((id) => [id, `drafts.${id}`]))}`,
  migrate: {
    document(doc) {
      const loc = LOCATIONS[doc._id.replace(/^drafts\./, "")];
      if (!loc) return;
      return at("location", setIfMissing({ _type: "localeStringOptional", ...loc }));
    },
  },
});
