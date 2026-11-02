import { defineMigration, at, setIfMissing } from "sanity/migrate";
import LOCATIONS from "./data/projectLocations.json";

// Pre-fills the optional `location` field on projects whose description already says where they
// were shot (data + source quote per project in ./data/projectLocations.json). `setIfMissing`
// never overwrites a value Milo entered, so it is safe to re-run.
//
// Run from the repo root:
//   npx sanity migration run seedProjectLocations             # dry run
//   npx sanity migration run seedProjectLocations --no-dry-run
// The Sanity CLI crashes on Android/Termux (device-id lookup); use the plain script there instead:
//   npm run seed:locations   (then npm run seed:locations:apply)
const ids = Object.keys(LOCATIONS);

export default defineMigration({
  title: "Seed project locations from their descriptions",
  documentTypes: ["project"],
  // Published + draft versions of the listed projects.
  filter: `_id in ${JSON.stringify(ids.flatMap((id) => [id, `drafts.${id}`]))}`,
  migrate: {
    document(doc) {
      const loc = (LOCATIONS as Record<string, { en: string; fr: string; nl: string }>)[doc._id.replace(/^drafts\./, "")];
      if (!loc) return;
      return at("location", setIfMissing({ _type: "localeStringOptional", en: loc.en, fr: loc.fr, nl: loc.nl }));
    },
  },
});
