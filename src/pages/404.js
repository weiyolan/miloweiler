import { PageWrapper } from "@/utils/pageContext";
import Head from "next/head";
import Link from "next/link";
import { useRef } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { gsap } from "gsap/dist/gsap";
import useLayoutEffect from "@/utils/useIsomorphicLayoutEffect";
import Layout from "@/components/Layout";
import Footer2 from "@/components/Footer2";
import { ReactLenis } from "lenis/react";
import { useAppContext } from "@/utils/appContext";

export async function getStaticProps({ locale }) {
  return { props: { locale } };
}

export default function Custom404() {
  const { locale } = useAppContext();
  const ctx = useRef();

  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {
      gsap.fromTo(
        ".fade-404",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }
      );
    }, ".content-404");

    return () => ctx.current.revert();
  }, []);

  return (
    <>
      <Head>
        <title>Milo Weiler | 404</title>
        <meta name="robots" content="noindex" />
      </Head>
      <ReactLenis root options={{ wheelMultiplier: 0.9 }}>
        <main className="w-full min-h-screen flex flex-col bg-background text-foreground">
          <PageWrapper darkMode={true}>
            <Layout className="content-404 relative pt-12 flex-1 flex flex-col items-center justify-center text-center">
              <p className="fade-404 invisible font-mono text-sm tracking-widest uppercase opacity-60 mb-4">
                404
              </p>
              <h1 className="fade-404 invisible font-serif text-5xl md:text-7xl mb-6">
                {locale === "fr" ? "Pellicule vierge" : locale === "nl" ? "Blanco film" : "Blank Film"}
              </h1>
              <p className="fade-404 invisible font-mono text-base max-w-md opacity-80 mb-10">
                {locale === "fr"
                  ? "Cette page n’a jamais été développée. Mais il y a de belles images à découvrir."
                  : locale === "nl"
                  ? "Dit frame is nooit ontwikkeld. Maar er zijn prachtige beelden te ontdekken."
                  : "This frame was never developed. But there are beautiful pictures to discover."}
              </p>
              <Link
                href="/"
                className="fade-404 invisible group inline-flex items-center gap-1.5 rounded-full border border-foreground/40 px-6 py-3 font-sans text-sm font-semibold uppercase tracking-widest text-foreground transition-all hover:scale-105 hover:bg-foreground/10 active:scale-95"
              >
                {locale === "fr" ? "Voir de belles photos" : locale === "nl" ? "Bekijk mooie foto’s" : "See beautiful pictures"}
                <BsArrowRightShort className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Layout>
            <Footer2 className="relative" noMotion noMargin />
          </PageWrapper>
        </main>
      </ReactLenis>
    </>
  );
}
