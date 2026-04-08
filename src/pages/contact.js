import React, { useEffect, useRef } from 'react'
import Head from 'next/head'
import { canonicalUrl } from '@/utils/seo'
import SubTitle from '@components/SubTitle'
import Layout from '@/components/Layout'
import LayoutSection from '@/components/LayoutSection'
// import AccentTitle from '@/components/AccentTitle'
import { PageWrapper } from '@/utils/pageContext'
import ArrowLink from '@/components/ArrowLink'
// import ContactB from '@/components/ContactB'
import useDimensions from '@/utils/useDimensions'
import Form from '@/components/Form'
import client from '../../lib/sanity'
import TrustedBy from '@/sections/TrustedBy'
import { useAppContext } from '@/utils/appContext'
import ContactDetails from '@/sections/ContactDetails'
import SanityImage from '@/components/SanityImage'
import PrintingDetails from '@/sections/PrintingDetails'
import Logo from '@/components/Logo'
// import { gsap } from 'gsap/dist/gsap'
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import useLayoutEffect from '@/utils/useIsomorphicLayoutEffect'
import { ReactLenis } from 'lenis/react'
import Footer2 from '@/components/Footer2'
// import { useRouter } from 'next/router';


import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import { supportedLanguages } from "../../sanity/schemas/supportedLanguages";

export default function Contact({ contactDetailsData, trustedByData, contactFormData, printingData, portfolioData, inspirationData }) {
  let textRef = useRef(null);
  let { width, locale } = useAppContext();
  let { height: textHeight } = useDimensions(textRef);
  let pageMobile = width < 648;
  let darkMode = true;
  // console.log(contactFormData)
  // const router = useRouter();
  let tl = useRef();
  let ctx = useRef();

  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  let getRatio = (el) => window.innerHeight / (window.innerHeight + el.offsetHeight);

  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {
      let mobile = width < 648;

      // Form section staggered fade
      gsap.timeline({
        scrollTrigger: {
          trigger: ".form-parent",
          start: `top ${mobile ? "90%" : "80%"}`,
          end: `top ${mobile ? "50%" : "40%"}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
        .to(".form-child", { autoAlpha: 1, duration: 1, ease: "ease.out", stagger: 0.1 })
        .fromTo(".form-child", { translateX: -20 }, { translateX: 0, duration: 1, ease: "ease.out", stagger: 0.1 }, "<");

      // Portfolio section staggered fade
      gsap.timeline({
        scrollTrigger: {
          trigger: ".portfolio-parent",
          start: `top ${mobile ? "90%" : "80%"}`,
          end: `top ${mobile ? "50%" : "40%"}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
        .to(".portfolio-child", { autoAlpha: 1, duration: 1, ease: "ease.out", stagger: 0.1 })
        .fromTo(".portfolio-child", { translateX: -20 }, { translateX: 0, duration: 1, ease: "ease.out", stagger: 0.1 }, "<");

      // Inspiration section staggered fade
      gsap.timeline({
        scrollTrigger: {
          trigger: ".inspiration-parent",
          start: `top ${mobile ? "90%" : "80%"}`,
          end: `top ${mobile ? "50%" : "40%"}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
        .to(".inspiration-child", { autoAlpha: 1, duration: 1, ease: "ease.out", stagger: 0.1 })
        .fromTo(".inspiration-child", { translateX: -20 }, { translateX: 0, duration: 1, ease: "ease.out", stagger: 0.1 }, "<");

      gsap.utils.toArray("[data-speed]").forEach((logo, i) => {
        // console.log(logo)
        // console.log(logo.getAttribute("data-speed"))
        gsap.to(logo, {
          translateX: parseFloat(logo.getAttribute("data-direction")) * (1 - parseFloat(logo.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window),
          // x: parseFloat(logo.getAttribute("data-direction")) * (1 - parseFloat(logo.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window),
          opacity: 0,
          // translateX: (a, logo) => (i % 2 === 0 ? -1 : 1) * (1 - parseFloat(logo.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window),
          // y:0,
          // ease: "none",
          scrollTrigger: {
            trigger: ".trusted-by",
            start: width < 648 ? "30% 20%" : "center 20%",
            // start: 'top bottom',
            // end: "max",
            invalidateOnRefresh: true,
            scrub: 2,
            markers: i ? false : false,
            // markers: ()=>i?false:false,
          },
          lazy: false,
        });
      });

      gsap.utils.toArray("[data-imagecontainer]").forEach((image, i) => {
        image.bg = image.querySelector(".imageFill");
        // console.log(image)
        // console.log(image.getAttribute('data-imagecontainer'))

        // // Give the backgrounds some random images
        // image.bg.style.backgroundImage = `url(https://picsum.photos/1600/800?random=${i})`;
        // the first image (i === 0) should be handled differently because it should start at the very top.
        // use function-based values in order to keep things responsive
        if (image.getAttribute("data-imagecontainer") === "true") {
          gsap.fromTo(
            image.bg,
            {
              objectPosition: i ? `50% ${-window.innerHeight * getRatio(image)}px` : "50% 0px",
            },
            {
              objectPosition: `50% ${width < 648 ? "" : ""}${(window.innerHeight * (1 - getRatio(image))) / 3}px`,
              // objectPosition: () => `50% ${window.innerHeight * (1 - getRatio(image))}px`,
              ease: "none",
              lazy: false,

              scrollTrigger: {
                trigger: image,
                start: "top top",
                // start: i ? "top top" : width < 648 ? "top top" : width<800? 'top top':"top top ",
                end: "bottom top",
                scrub: true,
                markers: false,
                // markers: () => i ? false : false,
                invalidateOnRefresh: true, // to make it responsive
              },
            }
          );
        }
      });
      // gsap.to('.logo-artist', {opacity:1, duration: 0.5, stagger: 0.2});
      // gsap.to('.logo-company', {opacity:1, duration: 0.5, stagger: 0.2});
    }, ".contact-page");

    return () => ctx.current.revert();
  }, [width]);

  return (
    <>
      <Head>
        <title>Milo Weiler Photography | A Unique Style In Artistic Photography</title>
        <meta name="description" content="Discover the power of visual storytelling through my lens." />
        <link rel="canonical" href={canonicalUrl(locale, '/contact')} />
        <link rel="alternate" hrefLang="en" href={canonicalUrl('en', '/contact')} />
        <link rel="alternate" hrefLang="fr" href={canonicalUrl('fr', '/contact')} />
        <link rel="alternate" hrefLang="nl" href={canonicalUrl('nl', '/contact')} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl('en', '/contact')} />
        <meta property="og:title" content={"A Unique Style In Artistic Photography"} />
        <meta property="og:description" content={`Discover the power of visual storytelling through my lens.`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="miloweiler.com" />
        <meta property="og:image" content={`https://cdn.sanity.io/images/erjr84ua/production/10a6c74de0cb8dd19f628619d6c1508ef1e32795-618x817.jpg?w=1200&h=630&fit=crop`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Milo Weiler Photography - Contact" />
        <meta property="og:locale" content={locale} />
        <meta property="og:url" content={canonicalUrl(locale, '/contact')} />
        <meta property="fb:app_id" content="659504862954849" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="miloweiler.com" />
        <meta property="twitter:url" content={canonicalUrl(locale, '/contact')} />
        <meta name="twitter:title" content="A Unique Style In Artistic Photography" />
        <meta name="twitter:description" content="Discover the power of visual storytelling through my lens." />
        <meta name="twitter:image" content={`https://cdn.sanity.io/images/erjr84ua/production/10a6c74de0cb8dd19f628619d6c1508ef1e32795-618x817.jpg?w=1200&h=630&fit=crop`} />
      </Head>
      {/* duration:0.9,  */}
      <ReactLenis ref={lenisRef} autoRaf={false} root options={{ wheelMultiplier: 0.9, print: false }}>
        {/* bg-gradient-to-br from-primary to-[#FFEAD6] */}
        <main className={`min-h-screen flex flex-col bg-background text-foreground ${darkMode ? "font-extralight" : ""} relative contact-page overflow-x-hidden`}>
          <div className="fixed top-0 w-[140vw] sm:w-full lg:w-4/5 lg:left-1/2 lg:-translate-x-1/2">
            <Logo darkMode={darkMode} className="w-full relative opacity-[0.02]  -translate-x-14 md:translate-x-0 -translate-y-0 md:translate-y-40 lg:-translate-y-40" />
          </div>
          <PageWrapper
            // ctx={ctx} tl={tl}
          >
            <Layout className={"relative lg:px-16 xl:px-24 max-w-7xl flex-1"}>
              <h1 className="invisible uppercase font-serif text-center text-3xl ">Contact Page</h1>

              {/* =======CONTACT DETAILS======== */}
              <ContactDetails contactDetails={contactDetailsData} portfolioLink={portfolioData.portfolio.url[locale] + "?dl=" + portfolioData.portfolio.fileName[locale]} />
              {/* {console.log(contactDetailsData)} */}

              {/* =======TRUSTED BY======== */}
              <TrustedBy trustedBy={trustedByData} />

              {/* =======OFFER FORM======== */}
              <LayoutSection right className={`flex-col-reverse form-parent`}>
                <div className="flex flex-col w-full form-child invisible">
                  {/* <SubTitle mainTitle={'test'} SubTitle='' left /> */}
                  <SubTitle mainTitle={contactFormData.title[locale]} SubTitle="" left />
                  <Form />
                </div>
                <SanityImage fill containerClass="form-child invisible" image={contactFormData.image.image.asset} alt={contactFormData.image.alt[locale]} />
              </LayoutSection>

              {/* =======PRINTING SERVICE======== */}
              <PrintingDetails printingData={printingData} />

              {/* ======PRORTFOLIO======== */}
              <LayoutSection center className="portfolio-parent">
                <div className="w-full text-center">
                  <SubTitle className="portfolio-child invisible max-w-[750px] mx-auto mb-2" mainTitle={portfolioData.title[locale]} subTitle={portfolioData.text[locale]} />
                  <ArrowLink className="portfolio-child invisible ml-8 " inText text="download" to={portfolioData.portfolio.url[locale] + "?dl=" + portfolioData.portfolio.fileName[locale]} />
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-24 px-0 sm:px-12 mt-4">
                    <SanityImage
                      intrinsic
                      priority
                      className="w-full xs:w-4/5 sm:w-1/3 portfolio-child invisible flex-1 rounded-2xl my-auto"
                      image={portfolioData.image1.image.asset}
                      alt={portfolioData.image1.alt[locale]}
                    />
                    <SanityImage
                      intrinsic
                      priority
                      className="w-full xs:w-4/5 sm:w-1/3 portfolio-child invisible flex-1 rounded-2xl my-auto"
                      image={portfolioData.image2.image.asset}
                      alt={portfolioData.image2.alt[locale]}
                    />
                  </div>
                </div>
              </LayoutSection>

              {/* ======INSPIRATION======== */}
              <LayoutSection center className="inspiration-parent">
                <div className="w-full text-center mb-4">
                  <SubTitle className="inspiration-child invisible max-w-[70%] mx-auto" mainTitle={inspirationData.title[locale]} subTitle={""} />
                  {!pageMobile && <ArrowLink inText className="inspiration-child invisible ml-8 w-fit self-center mb-2" text="Contact me" to="#contactSection" />}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-12 lg:gap-24 px:gap-8 md:px-12">
                    <div className="inspiration-child invisible flex-1 flex flex-col justify-start">
                      <h3 className="font-sans font-semibold text-lg sm:text-xl mt-2 mb-2 sm:mb-5">{inspirationData.subTitle1[locale]}</h3>
                      <p
                        ref={textRef}
                        className={`text-justify font-sans  first-letter:float-left first-letter:text-6xl first-letter:pr-2 first-letter:font-normal first-letter:uppercase  ${
                          darkMode ? "font-extralight" : "font-normal"
                        }`}>
                        {inspirationData.text1[locale]}
                      </p>
                      <ArrowLink inText className="ml-8 w-fit mt-5" text="Go to homepage" to="/" />
                    </div>
                    <div className="inspiration-child invisible flex-1 flex flex-col justify-start">
                      <h3 className="font-sans font-semibold text-lg sm:text-xl mt-2 mb-2 sm:mb-5">{inspirationData.subTitle2[locale]}</h3>
                      <p
                        style={{ height: pageMobile ? "auto" : textHeight ? textHeight + "px" : "auto" }}
                        className={`text-justify font-sans  first-letter:float-left first-letter:text-6xl first-letter:pr-2 first-letter:font-normal first-letter:uppercase  ${
                          darkMode ? "font-extralight" : "font-normal"
                        }`}>
                        {inspirationData.text2[locale]}
                      </p>
                      <ArrowLink inText className="ml-8 w-fit self-center text-center mt-5" text="Visit my gallery" to="/commissioned" />
                    </div>
                  </div>
                </div>
              </LayoutSection>
            </Layout>
            {/* <Footer /> */}
            <Footer2 className={`relative `} noMotion />

          </PageWrapper>
        </main>
      </ReactLenis>
    </>
  );
}

export async function getStaticProps() {
  let langObjPortfolioUrl = "";
  let langObjPortfolioName = "";

  supportedLanguages.forEach((lang) => {
    langObjPortfolioUrl = langObjPortfolioUrl + `'${lang.id}':portfolio.document.${lang.id}.asset->url,`;
    langObjPortfolioName = langObjPortfolioName + `'${lang.id}':portfolio.document.${lang.id}.asset->originalFilename,`;
  });

  const [
    contactDetailsData,
    trustedByData,
    contactFormData,
    printingData,
    portfolioRaw,
    inspirationData,
  ] = await Promise.all([
    client.fetch(`*[_type == "contactPageCDS"][0]`),
    client.fetch(`*[_type == "contactPageTBS"][0]`),
    client.fetch(`*[_type == "contactPageAOS"][0]`),
    client.fetch(`*[_type == "contactPagePSS"][0]`),
    client.fetch(
      `*[_type == "contactPagePFS"][0]{image1,image2,title,text,'portfolio':{'url':{${langObjPortfolioUrl}},'fileName':{${langObjPortfolioName}}}}`
    ),
    client.fetch(`*[_type == "contactPageGIS"][0]`),
  ]);

  const { image1, image2, title, text, portfolio } = portfolioRaw;

  return {
    props: {
      contactDetailsData: contactDetailsData,
      trustedByData: trustedByData,
      contactFormData: contactFormData,
      printingData: printingData,
      portfolioData: { image1, image2, title, text, portfolio },
      inspirationData: inspirationData,
    },
  };
}
