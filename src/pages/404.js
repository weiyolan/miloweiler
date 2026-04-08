import { PageWrapper } from "@/utils/pageContext";
import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/Layout";
import Footer2 from "@/components/Footer2";
import { ReactLenis } from "lenis/react";
import { useAppContext } from "@/utils/appContext";

export async function getStaticProps({ locale }) {
  return { props: { locale } };
}

export default function Custom404() {
  const { locale } = useAppContext();

  return (
    <>
      <Head>
        <title>Milo Weiler | 404</title>
        <meta name="robots" content="noindex" />
      </Head>
      <ReactLenis root options={{ wheelMultiplier: 0.9 }}>
        <main className="w-full min-h-screen flex flex-col bg-background text-foreground">
          <PageWrapper darkMode={true}>
            <Layout className="relative pt-12 flex-1 flex flex-col items-center justify-center text-center">
              <p className="font-mono text-sm tracking-widest uppercase opacity-60 mb-4">
                404
              </p>
              <h1 className="font-serif text-5xl md:text-7xl mb-6">
                {locale === "fr" ? "Pellicule vierge" : locale === "nl" ? "Blanco film" : "Blank Film"}
              </h1>
              <p className="font-mono text-base max-w-md opacity-80 mb-10">
                {locale === "fr"
                  ? "Cette page n\u2019a jamais \u00e9t\u00e9 d\u00e9velopp\u00e9e. Peut-\u00eatre qu\u2019elle le sera un jour."
                  : locale === "nl"
                  ? "Dit frame is nooit ontwikkeld. Misschien op een dag."
                  : "This frame was never developed. Maybe one day it will be."}
              </p>
              <Link
                href="/"
                className="font-mono text-sm border border-foreground/40 px-6 py-3 rounded hover:bg-foreground/10 transition-colors"
              >
                {locale === "fr" ? "Retour \u00e0 l\u2019accueil" : locale === "nl" ? "Terug naar portfolio" : "Back to Portfolio"}
              </Link>
            </Layout>
            <Footer2 className="relative" noMotion noMargin />
          </PageWrapper>
        </main>
      </ReactLenis>
    </>
  );
}
