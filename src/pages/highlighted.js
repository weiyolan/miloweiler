import CategoryPage from "@/components/CategoryPage";
import client from "../../lib/sanity";
import { ReactLenis } from "lenis/react";

export default function Highlighted(props) {
  return (
    <ReactLenis root options={{ wheelMultiplier: 0.9 }}>
      <CategoryPage {...props} />
    </ReactLenis>
  );
}

export async function getStaticProps() {
  const projects = await client.fetch(
    `*[_type == "project" && highlighted == true && grid == true]|order(date desc){
      title, subTitle, by, date, description, commissionedBool, cat, slug, gridCols,
      mainImage{alt, image{asset->{url, metadata}, ...asset{_ref}}},
      otherImages[]{_key, _type, alt, border, position, image{asset->{url, metadata}, ...asset{_ref}}}
    }`
  );
  return { props: { projects, category: "highlighted" } };
}
