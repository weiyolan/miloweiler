import ProjectRow from "@/components/ProjectRow";
import { useAppContext } from "@/utils/appContext";
import { PageWrapper } from "@/utils/pageContext";
import Head from "next/head";
import { canonicalUrl, resolveSeo } from "@/utils/seo";
import React, { useState } from "react";
import client from "../../../lib/sanity";
import Footer2 from "@/components/Footer2";
import Layout from "@/components/Layout";
import GalleryTitle from "@/components/GalleryTitle";
import { getCatFromSlug, ALL_CATEGORY_SLUGS, getCategorySlug, getVisibleCategorySlugs, CATEGORY_LABELS, RESERVED_SLUGS } from "@/utils/categories";
import Link from "next/link";

export default function CategoryGallery({ projects, category, highlightedEnabled, seo }) {
  let { width, locale, categoryLabels, categoryShortLabels } = useAppContext();
  let darkMode = true;
  let [hoveredRow, setHoveredRow] = useState(null);

  const label = categoryLabels?.[category]?.[locale] || CATEGORY_LABELS[category]?.[locale] || category;
  const visibleSlugs = getVisibleCategorySlugs(highlightedEnabled);

  const fallbackImage = projects[0]?.mainImage?.image?.asset?.url
    ? `${projects[0].mainImage.image.asset.url}?w=1200&h=630&fit=crop`
    : null;
  const pageSeo = resolveSeo(seo, locale, {
    title: `Milo Weiler | ${label}`,
    description: 'Specialised Set & Studio Photography',
    image: fallbackImage,
  });
  // og/twitter title keeps the bare category label until Milo sets an SEO title.
  const socialTitle = seo?.seoTitle?.[locale] || label;

  return (
    <>
      <Head>
        <title>{pageSeo.title}</title>
        <meta name="description" content={pageSeo.description} />
        <link rel="canonical" href={canonicalUrl(locale, `/${category}`)} />
        <link rel="alternate" hrefLang="en" href={canonicalUrl('en', `/${category}`)} />
        <link rel="alternate" hrefLang="fr" href={canonicalUrl('fr', `/${category}`)} />
        <link rel="alternate" hrefLang="nl" href={canonicalUrl('nl', `/${category}`)} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl('en', `/${category}`)} />
        <meta property="og:title" content={socialTitle} />
        <meta property="og:description" content={pageSeo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="miloweiler.com" />
        {pageSeo.image && (
          <>
            <meta property="og:image" content={pageSeo.image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={`Milo Weiler - ${label}`} />
          </>
        )}
        <meta property="og:locale" content={locale} />
        <meta property="og:url" content={canonicalUrl(locale, `/${category}`)} />
        <meta property="fb:app_id" content="659504862954849" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="miloweiler.com" />
        <meta property="twitter:url" content={canonicalUrl(locale, `/${category}`)} />
        <meta name="twitter:title" content={socialTitle} />
        <meta name="twitter:description" content={pageSeo.description} />
        {pageSeo.image && (
          <meta name="twitter:image" content={pageSeo.image} />
        )}
      </Head>
      <main className={`w-full min-h-screen flex flex-col bg-background text-foreground`}>
          <PageWrapper>
            <Layout className="relative pt-12 lg:px-16 xl:px-24 max-w-full mb-12 flex-1">
              <GalleryTitle h1 className="">
                {label}
              </GalleryTitle>

              <nav className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm mb-12 mt-24">
                {visibleSlugs.map((slug, i) => (
                  <React.Fragment key={slug}>
                    {i > 0 && <span className="opacity-60 select-none">|</span>}
                    <Link
                      href={`/${slug}`}
                      className={`${slug === category ? "font-semibold" : "font-normal opacity-60 hover:opacity-100"} transition-opacity`}
                    >
                      <span className="sm:hidden">{categoryShortLabels?.[slug]?.[locale] || slug}</span>
                      <span className="hidden sm:inline">{categoryLabels?.[slug]?.[locale] || CATEGORY_LABELS[slug]?.[locale] || slug}</span>
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

  const hpHighlighted = await client.fetch(
    `*[_type == "homepageConfig" && _id == "homepageConfig"][0].highlighted.enabled`
  );

  // Per-category SEO (no dedicated SEO for the "highlighted" pseudo-category).
  let seo = null;
  if (params.category !== 'highlighted') {
    const cat = getCatFromSlug(params.category);
    if (cat) {
      seo = await client.fetch(
        `*[_type == "categorySeo" && _id == "categorySeo"][0].${cat}{ seoTitle, seoDescription, seoImage{asset->{url}} }`
      );
    }
  }

  return {
    props: {
      projects,
      category: params.category,
      highlightedEnabled: hpHighlighted !== false,
      seo: seo || null,
    },
  };
}
