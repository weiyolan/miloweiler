import ProjectRow from "@/components/ProjectRow";
import { useAppContext } from "@/utils/appContext";
import { PageWrapper } from "@/utils/pageContext";
import Head from "next/head";
import React, { useState } from "react";
import client from "../../../lib/sanity";
import Footer2 from "@/components/Footer2";
import { ReactLenis } from "lenis/react";
import Layout from "@/components/Layout";
import GalleryTitle from "@/components/GalleryTitle";
import { getCatFromSlug, ALL_CATEGORY_SLUGS, getCategorySlug, CATEGORY_LABELS, RESERVED_SLUGS } from "@/utils/categories";
import Link from "next/link";

export default function CategoryGallery({ projects, category }) {
  let { width, locale } = useAppContext();
  let darkMode = true;
  let [hoveredRow, setHoveredRow] = useState(null);

  const label = CATEGORY_LABELS[category]?.[locale] || category;

  return (
    <>
      <Head>
        <title>{`Milo Weiler | ${label}`}</title>
        <meta name="description" content="Specialised Set & Studio Photography" />

        <meta property="og:title" content={label} />
        <meta property="og:description" content="Specialised Set & Studio Photography" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="miloweiler.com" />
        {projects[0]?.mainImage?.image?.asset?.url && (
          <meta property="og:image" itemProp="image" content={`${projects[0].mainImage.image.asset.url}?w=500&h=500&fit=crop`} />
        )}
        <meta property="og:locale" content={locale} />
        <meta property="og:url" content={`https://miloweiler.com/${locale === "en" ? "" : locale + "/"}${category}`} />
        <meta property="fb:app_id" content="659504862954849" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="miloweiler.com" />
        <meta property="twitter:url" content={`https://www.miloweiler.com/${category}`} />
        <meta name="twitter:title" content={label} />
        <meta name="twitter:description" content="Specialised Set & Studio Photography" />
        {projects[0]?.mainImage?.image?.asset?.url && (
          <meta name="twitter:image" content={`${projects[0].mainImage.image.asset.url}?w=500&h=500&fit=crop`} />
        )}
      </Head>
      <ReactLenis root options={{ wheelMultiplier: 0.9 }}>
        <main className={`w-full min-h-screen flex flex-col bg-background text-foreground`}>
          <PageWrapper>
            <Layout className="relative pt-12 lg:px-16 xl:px-24 max-w-full mb-12 flex-1">
              <GalleryTitle h1 className="">
                {label}
              </GalleryTitle>

              <nav className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm mb-12 mt-24">
                {ALL_CATEGORY_SLUGS.map((slug, i) => (
                  <React.Fragment key={slug}>
                    {i > 0 && <span className="opacity-60 select-none">|</span>}
                    <Link
                      href={`/${slug}`}
                      className={`${slug === category ? "font-semibold" : "font-normal opacity-60 hover:opacity-100"} transition-opacity`}
                    >
                      {CATEGORY_LABELS[slug]?.[locale] || slug}
                    </Link>
                  </React.Fragment>
                ))}
              </nav>

              <div className="galleryPage w-full mx-auto relative flex flex-col">
                {projects.map((project, i) => (
                  <React.Fragment key={project.slug?.current || i}>
                    <div className={`h-px bg-foreground transition-opacity duration-300 ${
                      hoveredRow === i || hoveredRow === i - 1 ? 'opacity-100' : 'opacity-0'
                    }`} />
                    <ProjectRow
                      project={project}
                      index={i}
                      categorySlug={category === 'highlighted' ? getCategorySlug(project.cat) : category}
                      onMouseEnter={() => setHoveredRow(i)}
                      onMouseLeave={() => setHoveredRow(null)}
                    />
                  </React.Fragment>
                ))}
                <div className={`h-px bg-foreground transition-opacity duration-300 ${
                  hoveredRow === projects.length - 1 ? 'opacity-100' : 'opacity-0'
                }`} />
              </div>
            </Layout>

            <Footer2 className="relative" noMotion noMargin />
          </PageWrapper>
        </main>
      </ReactLenis>
    </>
  );
}

export async function getStaticPaths({ locales }) {
  const paths = ALL_CATEGORY_SLUGS
    .filter((category) => !RESERVED_SLUGS.includes(category))
    .flatMap((category) =>
      locales.map((locale) => ({ params: { category }, locale }))
    );
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  let projects;
  if (params.category === 'highlighted') {
    projects = await client.fetch(
      `*[_type == "project" && highlighted == true]|order(date desc){title, subTitle, partnerLink, by, cat, commissionedBool, date, description, mainImage{alt,image{..., asset->{url,metadata}, ...asset{_ref}}}, slug}`
    );
  } else {
    const cat = getCatFromSlug(params.category);
    if (!cat) return { notFound: true };
    projects = await client.fetch(
      `*[_type == "project" && cat == "${cat}"]|order(date desc){title, subTitle, partnerLink, by, cat, commissionedBool, date, description, mainImage{alt,image{..., asset->{url,metadata}, ...asset{_ref}}}, slug}`
    );
  }

  return {
    props: {
      projects,
      category: params.category,
    },
  };
}
