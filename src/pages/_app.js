import "../styles/globals.css";
import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Playfair_Display, Instrument_Sans, Space_Mono } from "next/font/google";
import { AppWrapper, useAppContext } from "@utils/appContext";
import { buildCategoryLabels, buildCategoryShortLabels, buildCategoryDescriptions } from "@utils/categories";
import client from "../../lib/sanity";
import { Toaster } from "react-hot-toast";
import Navigation from "@/components/Navigation";
import NavigationMobile from "@/components/NavigationMobile";
// import TransitionOverlay from "@/components/TransitionOverlay";
import { TransitionProvider } from "@/utils/transitionContext";

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { Observer } from "gsap/dist/Observer";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin, Observer);

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "900"],
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: "variable",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-spacemono",
  weight: ["400"],
});

export default function App({ Component, pageProps, categoryLabels, categoryShortLabels, categoryDescriptions, businessInfo }) {
  let scrolled = useRef(0);
  // const router = useRouter();
  // usePreserveScroll();

  // useEffect(()=>{

  // })

  // ============ Change Scrollbar For different pages =================
  // useEffect(() => {
  //   // console.log('start')
  //   // console.log(router.pathname)
  //   // const body = document.querySelector('body');
  //   // console.log(body.style)

  //   const handleRouteChange = (url) => {
  //     const body = document.querySelector('body');
  //     // const { pathname } = new URL(url);
  //     // console.log(router.pathname  === '/contact')
  //     // Add or remove the desired className based on the pathname
  //     if (router.pathname === '/contact') {
  //       body.classList.add('dark-scrollbar');
  //     } else if (router.pathname === '/' || router.pathname === '') {
  //       body.classList.add('no-scrollbar');
  //     }
  //   };

  //   handleRouteChange()

  //   router.events.on('routeChangeComplete', handleRouteChange);
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, [router]);

  useEffect(() => {
    function handleScroll() {
      scrolled.current = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    }
    scrolled.current = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    // setScrolled(ratio)
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // console.log(poppins)
  return (
    <>
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"/> */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
      </Head>
      {/* ${poppins.variable} */}
      <AppWrapper scrolled={scrolled} categoryLabels={categoryLabels} categoryShortLabels={categoryShortLabels} categoryDescriptions={categoryDescriptions} businessInfo={businessInfo} className={`${playfair.variable} ${instrument.variable} ${spaceMono.variable} font-sans relative w-full min-h-screen`}>
        <TransitionProvider>
          <NavRenderer />
          <Component {...pageProps} />
          {/* <TransitionOverlay /> */}
        </TransitionProvider>
        <Toaster />
      </AppWrapper>
    </>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  try {
    const [catNames, bizInfo] = await Promise.all([
      client.fetch(`*[_type == "categoryNames" && _id == "categoryNames"][0]`),
      client.fetch(`*[_type == "businessInfo" && _id == "businessInfo"][0]{email,phone,vat,address,mailtoSubject,mailtoBody,whatsappNumber,whatsappMessage,socialInstagram,socialUnsplash,socialLinkedin}`),
    ]);
    return {
      pageProps,
      categoryLabels: buildCategoryLabels(catNames),
      categoryShortLabels: buildCategoryShortLabels(catNames),
      categoryDescriptions: buildCategoryDescriptions(catNames),
      businessInfo: bizInfo || null,
    };
  } catch (e) {
    console.error("Failed to fetch app data:", e);
    return { pageProps, categoryLabels: buildCategoryLabels(null), categoryShortLabels: buildCategoryShortLabels(null), categoryDescriptions: buildCategoryDescriptions(null), businessInfo: null };
  }
};

function NavRenderer() {
  const { isMobile } = useAppContext()
  return isMobile ? <NavigationMobile /> : <Navigation />
}
