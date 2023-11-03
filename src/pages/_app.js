import '../styles/globals.css'
import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Poppins, Lora } from "next/font/google";
import { AppWrapper } from "@utils/appContext";
// import Script from 'next/script';
import { Toaster } from "react-hot-toast";

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { usePreserveScroll } from "@/utils/usePreserveScroll";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);

// import Lenis from '@studio-freight/lenis'

// const workSans = Work_Sans({
//   subsets: ['latin'],
//   variable: '--font-worksans',
//   display: 'swap',
// })
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  // display: 'optional',
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  // display: 'swap',
});

export default function App({ Component, pageProps }) {
  let scrolled = useRef(0);
  // const router = useRouter();
  // usePreserveScroll();
  function handleScroll() {
    scrolled.current = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
  }

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
      <AppWrapper scrolled={scrolled} className={`${poppins.variable} ${lora.variable} font-pop relative w-full `}>
        <Component {...pageProps} />
        <Toaster />
      </AppWrapper>
    </>
  );
}
