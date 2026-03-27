import { useAppContext } from "@/utils/appContext";
import { PageWrapper } from "@/utils/pageContext";
import Head from "next/head";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import client from "../../lib/sanity";
import Footer2 from "@/components/Footer2";
import { ReactLenis } from "lenis/react";
import Layout from "@/components/Layout";
import GalleryTitle from "@/components/GalleryTitle";
import { ALL_CATEGORY_SLUGS, CATEGORY_LABELS, CATEGORY_MAP } from "@/utils/categories";
import SanityImage from "@/components/SanityImage";
import Link from "next/link";

const SLUG_TO_QUERY_KEY = {
  'highlighted': 'highlighted',
  'set-photography': 'bts',
  'portraits': 'docu',
  'corporate-events': 'events',
  'products': 'studio',
  'personal-work': 'art',
};

export default function Home({ categoryImages }) {
  let { width, locale } = useAppContext();
  let darkMode = true;
  const ctx = useRef(gsap.context(() => {}));

  useEffect(() => {
    ctx.current = gsap.context(() => {
      gsap.from('.category-tile', {
        autoAlpha: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    });
    return () => ctx.current.revert();
  }, []);

  const firstImage = categoryImages?.[Object.keys(categoryImages).find((k) => categoryImages[k]?.mainImage)];

  return (
    <>
      <Head>
        <title>{"Milo Weiler Photography | Witness The Beauty Of Life"}</title>
        <meta name="description" content="Specialised Set & Studio Photography" />

        <meta property="og:title" content={"Witness The Beauty Of Life"} />
        <meta property="og:description" content={`Specialised Set & Studio Photography`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="miloweiler.com" />
        {firstImage?.mainImage && (
          <meta property="og:image" itemProp="image" content={`${firstImage.mainImage.image.asset.url}?w=500&h=500&fit=crop`} />
        )}
        <meta property="og:locale" content={locale} />
        <meta property="og:url" content={`https://miloweiler.com/${locale === "en" ? "" : locale + "/"}`} />
        <meta property="fb:app_id" content="659504862954849" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="miloweiler.com" />
        <meta property="twitter:url" content="https://www.miloweiler.com/" />
        <meta name="twitter:title" content="Witness The Beauty Of Life" />
        <meta name="twitter:description" content="Specialised Set & Studio Photography" />
        {firstImage?.mainImage && (
          <meta name="twitter:image" content={`${firstImage.mainImage.image.asset.url}?w=500&h=500&fit=crop`} />
        )}
      </Head>
      <ReactLenis root options={{ wheelMultiplier: 0.9 }}>
        <main className={`w-full min-h-screen flex flex-col ${darkMode ? "bg-darkGrey text-primary" : "bg-primary text-darkPrimary"}`}>
          <PageWrapper darkMode={darkMode}>
            <Layout className={`relative pt-12 lg:px-16 xl:px-24 max-w-7xl mb-12 flex-1`}>
              <GalleryTitle h1 className="">
                Portfolio
              </GalleryTitle>
              <GalleryTitle className="">Portfolio</GalleryTitle>

              <div className="w-full mx-auto relative grid gap-8 py-1 md:px-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                {ALL_CATEGORY_SLUGS.map((slug) => {
                  const queryKey = SLUG_TO_QUERY_KEY[slug];
                  const data = categoryImages?.[queryKey];
                  const label = CATEGORY_LABELS[slug]?.[locale] || CATEGORY_LABELS[slug]?.en || slug;

                  if (!data?.mainImage) return null;

                  return (
                    <Link href={`/projects/${slug}`} key={slug}>
                      <div className="category-tile relative aspect-[3/2] overflow-hidden group">
                        <SanityImage
                          image={data.mainImage.image}
                          fill
                          blur
                          sizes="(max-width: 640px) 100vw, 50vw"
                          alt={data.mainImage.alt || label}
                          className="group-hover:scale-105 transition-transform duration-500"
                          containerClass="rounded-none"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/20 to-transparent ">
                          <span className="text-white font-serif text-xl font-black tracking-wide">
                            {label}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Layout>

            <Footer2 className={`relative`} noMotion noMargin />
          </PageWrapper>
        </main>
      </ReactLenis>
    </>
  );
}

export async function getStaticProps() {
  const categoryImages = await client.fetch(`{
    'highlighted': *[_type == "project" && highlighted == true]|order(date desc)[0]{mainImage{alt,image{asset->{url,metadata}, ...asset{_ref}}}},
    'bts': *[_type == "project" && cat == "bts"]|order(date desc)[0]{mainImage{alt,image{asset->{url,metadata}, ...asset{_ref}}}},
    'docu': *[_type == "project" && cat == "docu"]|order(date desc)[0]{mainImage{alt,image{asset->{url,metadata}, ...asset{_ref}}}},
    'events': *[_type == "project" && cat == "events"]|order(date desc)[0]{mainImage{alt,image{asset->{url,metadata}, ...asset{_ref}}}},
    'studio': *[_type == "project" && cat == "studio"]|order(date desc)[0]{mainImage{alt,image{asset->{url,metadata}, ...asset{_ref}}}},
    'art': *[_type == "project" && cat == "art"]|order(date desc)[0]{mainImage{alt,image{asset->{url,metadata}, ...asset{_ref}}}},
  }`);

  return {
    props: {
      categoryImages,
    },
  };
}
