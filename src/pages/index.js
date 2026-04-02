import { useAppContext } from "@/utils/appContext";
import { PageWrapper } from "@/utils/pageContext";
import Head from "next/head";
import React from "react";
import dynamic from "next/dynamic";
import client from "../../lib/sanity";
import { ALL_CATEGORY_SLUGS, CATEGORY_LABELS } from "@/utils/categories";

const CardCarousel = dynamic(() => import("@/components/carousel/CardCarousel"), { ssr: false });

const SLUG_TO_QUERY_KEY = {
  'highlighted': 'highlighted',
  'set-photography': 'bts',
  'portraits': 'docu',
  'corporate-events': 'events',
  'products': 'studio',
  'personal-work': 'art',
};

export default function Home({ categories }) {
  const { locale } = useAppContext();

  const localizedCategories = categories.map((cat) => ({
    ...cat,
    label: CATEGORY_LABELS[cat.slug]?.[locale] || CATEGORY_LABELS[cat.slug]?.en || cat.slug,
  }));

  const firstImage = categories.find((c) => c.image);

  return (
    <>
      <Head>
        <title>{"Milo Weiler Photography | Witness The Beauty Of Life"}</title>
        <meta name="description" content="Specialised Set & Studio Photography" />
        <meta property="og:title" content={"Witness The Beauty Of Life"} />
        <meta property="og:description" content="Specialised Set & Studio Photography" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="miloweiler.com" />
        {firstImage?.ogUrl && (
          <meta property="og:image" itemProp="image" content={firstImage.ogUrl} />
        )}
        <meta property="og:locale" content={locale} />
        <meta property="og:url" content={`https://miloweiler.com/${locale === "en" ? "" : locale + "/"}`} />
        <meta property="fb:app_id" content="659504862954849" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="miloweiler.com" />
        <meta property="twitter:url" content="https://www.miloweiler.com/" />
        <meta name="twitter:title" content="Witness The Beauty Of Life" />
        <meta name="twitter:description" content="Specialised Set & Studio Photography" />
        {firstImage?.ogUrl && (
          <meta name="twitter:image" content={firstImage.ogUrl} />
        )}
      </Head>
      <main className="w-full h-screen overflow-hidden bg-darkGrey text-primary">
        <PageWrapper darkMode={true}>
          <CardCarousel categories={localizedCategories} />
        </PageWrapper>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const data = await client.fetch(`{
    'highlighted': *[_type == "project" && highlighted == true]|order(date desc)[0]{
      mainImage{alt, image{..., asset->{url, metadata}, ...asset{_ref}}},
      date
    },
    'highlightedCount': count(*[_type == "project" && highlighted == true]),

    'bts': *[_type == "project" && cat == "bts"]|order(date desc)[0]{
      mainImage{alt, image{..., asset->{url, metadata}, ...asset{_ref}}},
      date
    },
    'btsCount': count(*[_type == "project" && cat == "bts"]),

    'docu': *[_type == "project" && cat == "docu"]|order(date desc)[0]{
      mainImage{alt, image{..., asset->{url, metadata}, ...asset{_ref}}},
      date
    },
    'docuCount': count(*[_type == "project" && cat == "docu"]),

    'events': *[_type == "project" && cat == "events"]|order(date desc)[0]{
      mainImage{alt, image{..., asset->{url, metadata}, ...asset{_ref}}},
      date
    },
    'eventsCount': count(*[_type == "project" && cat == "events"]),

    'studio': *[_type == "project" && cat == "studio"]|order(date desc)[0]{
      mainImage{alt, image{..., asset->{url, metadata}, ...asset{_ref}}},
      date
    },
    'studioCount': count(*[_type == "project" && cat == "studio"]),

    'art': *[_type == "project" && cat == "art"]|order(date desc)[0]{
      mainImage{alt, image{..., asset->{url, metadata}, ...asset{_ref}}},
      date
    },
    'artCount': count(*[_type == "project" && cat == "art"]),
  }`);

  const categories = ALL_CATEGORY_SLUGS
    .map((slug) => {
      const queryKey = SLUG_TO_QUERY_KEY[slug];
      const item = data[queryKey];
      if (!item?.mainImage?.image) return null;

      const palette = item.mainImage.image?.asset?.metadata?.palette
      const bgColor =  palette?.darkMuted?.background ||'#1a1a1a'

      return {
        slug,
        image: item.mainImage.image,
        alt: item.mainImage.alt || '',
        projectCount: data[`${queryKey}Count`] || 0,
        year: item.date ? item.date.slice(0, 4) : '',
        href: `/projects/${slug}`,
        bgColor,
        ogUrl: item.mainImage.image?.asset?.url
          ? `${item.mainImage.image.asset.url}?w=500&h=500&fit=crop`
          : null,
      };
    })
    .filter(Boolean);

  return {
    props: {
      categories,
    },
  };
}
