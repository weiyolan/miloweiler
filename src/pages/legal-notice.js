import { PageWrapper } from "@/utils/pageContext";
import Head from "next/head";
import Layout from "@/components/Layout";
import Footer2 from "@/components/Footer2";
import { ReactLenis } from "lenis/react";
import { useAppContext } from "@/utils/appContext";
import { canonicalUrl } from "@/utils/seo";
import { PortableText } from "@portabletext/react";
import portableTextComponents from "@/components/PortableTextComponents";
import SubTitle from "@/components/SubTitle";
import client from "../../lib/sanity";

export async function getStaticProps() {
  const data = await client.fetch(
    `*[_type == "legalNotice" && _id == "legalNotice"][0]{title,body}`
  );
  return { props: { data: data || null } };
}

export default function LegalNoticePage({ data }) {
  const { locale } = useAppContext();
  const title = data?.title?.[locale] || "Legal Notice";

  return (
    <>
      <Head>
        <title>{`Milo Weiler | ${title}`}</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={canonicalUrl(locale, "/legal-notice")} />
        <link rel="alternate" hrefLang="en" href={canonicalUrl("en", "/legal-notice")} />
        <link rel="alternate" hrefLang="fr" href={canonicalUrl("fr", "/legal-notice")} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl("en", "/legal-notice")} />
      </Head>
      <ReactLenis root options={{ wheelMultiplier: 0.9 }}>
        <main className="w-full min-h-screen flex flex-col bg-background text-foreground">
          <PageWrapper darkMode={true}>
            <Layout className="relative pt-24 sm:pt-32 pb-12 flex-1 max-w-3xl">
              <SubTitle mainTitle={title} left />
              {data?.body?.[locale] && (
                <PortableText value={data.body[locale]} components={portableTextComponents} />
              )}
            </Layout>
            <Footer2 className="relative" noMotion noMargin />
          </PageWrapper>
        </main>
      </ReactLenis>
    </>
  );
}
