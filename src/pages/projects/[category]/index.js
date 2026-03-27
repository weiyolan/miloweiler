import ProjectThumb from "@/components/ProjectThumb";
import { useAppContext } from "@/utils/appContext";
import { PageWrapper } from "@/utils/pageContext";
import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import client from "../../../../lib/sanity";
import Footer2 from "@/components/Footer2";
import { ReactLenis } from "lenis/react";
import Layout from "@/components/Layout";
import GalleryTitle from "@/components/GalleryTitle";
import { getCatFromSlug, ALL_CATEGORY_SLUGS, getCategorySlug, CATEGORY_LABELS } from "@/utils/categories";

export default function CategoryGallery({ projects, category }) {
  let { width, locale } = useAppContext();
  let darkMode = true;
  let [activeIndex, setActiveIndex] = useState(null);
  const ctx = useRef(gsap.context(() => {}));

  useEffect(() => {
    ctx.current = gsap.context(() => {
      gsap.from('.galleryPage > *', {
        autoAlpha: 0,
        // y: 30,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
      });
    });
    return () => ctx.current.revert();
  }, []);

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
        <meta property="og:url" content={`https://miloweiler.com/${locale === "en" ? "" : locale + "/"}projects/${category}`} />
        <meta property="fb:app_id" content="659504862954849" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="miloweiler.com" />
        <meta property="twitter:url" content={`https://www.miloweiler.com/projects/${category}`} />
        <meta name="twitter:title" content={label} />
        <meta name="twitter:description" content="Specialised Set & Studio Photography" />
        {projects[0]?.mainImage?.image?.asset?.url && (
          <meta name="twitter:image" content={`${projects[0].mainImage.image.asset.url}?w=500&h=500&fit=crop`} />
        )}
      </Head>
      <ReactLenis root options={{ wheelMultiplier: 0.9 }}>
        <main className={`w-full min-h-screen flex flex-col ${darkMode ? "bg-darkGrey text-primary" : "bg-primary text-darkPrimary"}`}>
          <PageWrapper darkMode={darkMode}>
            <Layout className="relative pt-12 lg:px-16 xl:px-24 max-w-full mb-12 flex-1">
              <GalleryTitle h1 className="">
                {label}
              </GalleryTitle>

              <GalleryTitle className="">{label}</GalleryTitle>
              {/* {ALL_CATEGORY_SLUGS.map(slug => (
                              <DropdownItem key={slug} text={CATEGORY_LABELS[slug][locale]} to={`/projects/${slug}`} isDark={isDark} />
                            ))} */}

              <div className="galleryPage w-full mx-auto relative grid gap-8 py-1 md:px-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, i) => (
                  <ProjectThumb
                    categorySlug={category === 'highlighted' ? getCategorySlug(project.cat) : category}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    index={i}
                    key={i}
                    project={project}
                  />
                ))}
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
  const paths = ALL_CATEGORY_SLUGS.flatMap((category) =>
    locales.map((locale) => ({ params: { category }, locale }))
  );
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  let projects;
  if (params.category === 'highlighted') {
    projects = await client.fetch(
      `*[_type == "project" && highlighted == true]|order(date desc){title, subTitle, partnerLink, by, cat, commissionedBool, date, description, mainImage{alt,image{asset->{url,metadata}, ...asset{_ref}}}, slug}`
    );
  } else {
    const cat = getCatFromSlug(params.category);
    if (!cat) return { notFound: true };
    projects = await client.fetch(
      `*[_type == "project" && cat == "${cat}"]|order(date desc){title, subTitle, partnerLink, by, cat, commissionedBool, date, description, mainImage{alt,image{asset->{url,metadata}, ...asset{_ref}}}, slug}`
    );
  }

  return {
    props: {
      projects,
      category: params.category,
    },
  };
}
