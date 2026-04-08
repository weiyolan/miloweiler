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
  'brand': 'corp',
  'events': 'events',
  'portraits': 'docu',
  'products': 'studio',
  'personal-work': 'art',
};

export default function Home({ categories }) {
  const { locale, categoryLabels } = useAppContext();
  const labels = categoryLabels || CATEGORY_LABELS;

  const localizedCategories = categories.map((cat) => ({
    ...cat,
    label: labels[cat.slug]?.[locale] || labels[cat.slug]?.en || cat.slug,
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
      <main className="w-full h-screen overflow-hidden bg-background text-foreground">
        <PageWrapper>
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

    'corp': *[_type == "project" && cat == "corp"]|order(date desc)[0]{
      mainImage{alt, image{..., asset->{url, metadata}, ...asset{_ref}}},
      date
    },
    'corpCount': count(*[_type == "project" && cat == "corp"]),

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

    'homepageConfig': *[_type == "homepageConfig" && _id == "homepageConfig"][0]{
      highlighted{ project->{_id}, image{..., asset->{url, metadata}, ...asset{_ref}}, bgColor },
      bts{ project->{_id}, image{..., asset->{url, metadata}, ...asset{_ref}}, bgColor },
      corp{ project->{_id}, image{..., asset->{url, metadata}, ...asset{_ref}}, bgColor },
      events{ project->{_id}, image{..., asset->{url, metadata}, ...asset{_ref}}, bgColor },
      docu{ project->{_id}, image{..., asset->{url, metadata}, ...asset{_ref}}, bgColor },
      studio{ project->{_id}, image{..., asset->{url, metadata}, ...asset{_ref}}, bgColor },
      art{ project->{_id}, image{..., asset->{url, metadata}, ...asset{_ref}}, bgColor }
    }
  }`);

  const hpConfig = data.homepageConfig || {};

  const categories = ALL_CATEGORY_SLUGS
    .map((slug) => {
      const queryKey = SLUG_TO_QUERY_KEY[slug];
      const latestProject = data[queryKey];
      const override = hpConfig[queryKey];

      // Image: use override only when BOTH project AND image are set
      const hasOverride = override?.project?._id && override?.image?.asset;
      const image = hasOverride ? override.image : latestProject?.mainImage?.image;
      const alt = hasOverride ? '' : (latestProject?.mainImage?.alt || '');

      if (!image) return null;

      // Color fallback: custom bgColor (as-is) → override image palette → latest project palette → #1a1a1a
      const overridePaletteBg = override?.image?.asset?.metadata?.palette?.darkMuted?.background;
      const latestPaletteBg = latestProject?.mainImage?.image?.asset?.metadata?.palette?.darkMuted?.background;

      let bgColor;
      let customBgColor = false;
      if (override?.bgColor) {
        bgColor = override.bgColor;
        customBgColor = true;
      } else if (hasOverride && overridePaletteBg) {
        bgColor = overridePaletteBg;
      } else if (latestPaletteBg) {
        bgColor = latestPaletteBg;
      } else {
        bgColor = '#1a1a1a';
      }

      return {
        slug,
        image,
        alt,
        projectCount: data[`${queryKey}Count`] || 0,
        year: latestProject?.date ? latestProject.date.slice(0, 4) : '',
        href: `/${slug}`,
        bgColor,
        customBgColor,
        ogUrl: image?.asset?.url
          ? `${image.asset.url}?w=500&h=500&fit=crop`
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
