// import ArrowLink from '@/components/ArrowLink';
import Logo from "@/components/Logo";
import ProjectThumb from "@/components/ProjectThumb";
import { useAppContext } from "@/utils/appContext";
import { PageWrapper } from "@/utils/pageContext";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import client from "../../../lib/sanity";
import Footer2 from "@/components/Footer2";
import Navigation from "@/components/Navigation";
import { Lenis as ReactLenis } from "@studio-freight/react-lenis";
import NavigationMobile from "@/components/NavigationMobile";
import Layout from "@/components/Layout";
import LanguageToggle from "@/components/LanguageToggle";

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import ProjectThumbRot from "@/components/ProjectThumbRot";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);

export default function Gallery({ projects, sectionInfo }) {
  let { width, locale } = useAppContext();
  let pageMobile = width < 648;
  let darkMode = false;
  let [activeIndex, setActiveIndex] = useState(null);
  const gallery = useRef();
  const ctx = useRef(gsap.context(() => {}, gallery.current));
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  });

  useEffect(() => {
    gsap.to(gallery.current, {
      translateX: "-=100%",
      ease: "none",
      scrollTrigger: {
        // id: "animalScrub",
        // start: () => `bottom bottom`,
        // end: () => `+=${0.85 * screenHeight}px`,
        scrub: true,
        markers: false,
        // ease:'n
        // invalidateOnRefresh: false,
        // overwrite: true,
        // preventOverlaps: true,
      },
    });

    // console.log('context')
    // ctx.current = ; // nothing initially (we'll add() to the context when endX changes)
    return () => ctx.current.revert();
  }, [ctx]);

  // function pushCardsOnClick() {
  //   // console.log('push')
  //   ctx.current.add(() => {
  //     gsap.to(".inactiveCard", {
  //       scale: 0.6,
  //       duration: 0.3,
  //       // y: 20,
  //       // yoyo: true,
  //       // repeat: -1,
  //       // ease: "expo.out",
  //       stagger: {
  //         // amount: 0.5,
  //         each: 0.2,
  //         grid: "auto",
  //         from: activeIndex
  //       }
  //     })
  //   })
  // }

  // useEffect(() => {
  //   let obj = { myNum: 10, myColor: "red" };
  //   gsap.to(obj, {
  //     myNum: 200,
  //     myColor: "blue",
  //     onUpdate: () => console.log(obj.myNum, obj.myColor)
  //   });
  // }, [])

  // function handleMouseEnter(i) {
  //   setActiveIndex(i);
  //   ctx.current.add(() => {
  //     gsap.to(`.index-${i}`, { scale: 1.05, duration: 0.5, ease: "power4.out" })
  //   })
  // }

  // function handleMouseLeave(i) {
  //   setActiveIndex(null)
  //   ctx.current.add(() => {
  //     gsap.to(`.index-${i}`, { scale: 1, duration: 0.5, })
  //   })
  // }

  // console.log(projects)

  return (
    <>
      <Head>
        <title>{"Milo Weiler | A Gallery of Captivating Shots"}</title>
        <meta name="description" content="Specialised Set & Studio Photography" />

        <meta property="og:title" content={"A Gallery of Captivating Shots"} />
        <meta property="og:description" content={`Specialised Set & Studio Photography`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="miloweiler.com" />
        <meta property="og:image" itemProp="image" content={`${projects.filter(({ slug }) => slug.current === "opel-kadett")[0].mainImage.image.asset.url}?w=500&h=500&fit=crop`} />
        <meta property="og:locale" content={locale} />
        <meta property="og:url" content={`https://miloweiler.com/${locale === "en" ? "" : locale + "/"}gallery`} />
        <meta property="fb:app_id" content="659504862954849" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="miloweiler.com" />
        <meta property="twitter:url" content="https://www.miloweiler.com/gallery" />
        <meta name="twitter:title" content="A Gallery of Captivating Shots" />
        <meta name="twitter:description" content="Specialised Set & Studio Photography" />
        <meta name="twitter:image" content={`${projects.filter(({ slug }) => slug.current === "opel-kadett")[0].mainImage.image.asset.url}?w=500&h=500&fit=crop`} />
      </Head>
      <ReactLenis ref={lenisRef} autoRaf={false} root options={{ wheelMultiplier: 0.9 }}>
        {/* from-darkGrey to-[#070013]
        bg-gradient-to-br from-primary to-[#FFEAD6] bg-[#FFEAD6] */}
        <main className={`  w-full  min-h-screen ${darkMode ? "bg-[#141414] text-primary" : "bg-primary text-darkPrimary"} overflow-x-hidden`}>
          <PageWrapper darkMode={darkMode}>
            <Layout className={`relative pt-12 lg:px-16 xl:px-24 max-w-7xl mb-36`}>
              <Logo darkMode={darkMode} className="w-2/5 fixed left-1/2 top-1/2 -translate-x-[50%] -translate-y-1/2 opacity-5" />
              <h1 className={`hidden font-lora text-center md:text-left font-semibold text-3xl mb-2 pt-3 md:pt-12 `}>{locale === "fr" ? "Galerie" : "Gallery"}</h1>
              {/* <h2> {locale === "fr" ? "Voici mes projets." : "Have a look at my projects."}</h2> */}
              {/* <h2>info={sectionInfo.filter((section) => section._id === "mainPageFIN")[0]}</h2> */}

              {/* <h2 className="font-lora text-center  text-inherit font-semibold text-3xl mb-4 pt-3 md:pt-8 sm:mb-12">
                {sectionInfo.filter((section) => section._id === "mainPageBTS")[0].title?.[locale]}
              </h2> */}
              {/* <h2>{console.log(sectionInfo.filter((section) => section._id === "mainPageBTS")[0].title)}</h2> */}

              <div
                ref={gallery}
                className="galleryPage sm:w-3/5 translate-x-1/2 -rotate-12 mx-auto relative grid gap-4 sm:gap-8 py-1 my-[30vh] sm:px-8 md:px-0 md:gap-8 md:py-8 grid-cols-2 ">
                {projects
                  .filter((project) => true)
                  // .filter((project) => project.cat === "bts")
                  .map((project, i) => (
                    <ProjectThumbRot activeIndex={activeIndex} setActiveIndex={setActiveIndex} index={i} key={i} project={project} />
                  ))}
              </div>
              {/* <h2 className="font-lora text-center  text-inherit font-semibold text-3xl mb-4 pt-3 md:pt-8 ">
                {sectionInfo.filter((section) => section._id === "mainPageDOC")[0].title?.[locale]}
              </h2>
              <div
                ref={gallery}
                className="galleryPage w-full mx-auto relative grid gap-4 sm:gap-8 py-1  sm:px-8 md:px-0 md:gap-8 md:py-8 grid-cols-2 xs:grid-cols-3 md:grid-cols-4 ">
                {projects
                  .filter((project) => project.cat === "docu")
                  .map((project, i) => (
                    <ProjectThumb activeIndex={activeIndex} setActiveIndex={setActiveIndex} index={i} key={i} project={project} />
                  ))}
              </div>
              <h2 className="font-lora text-center  text-inherit font-semibold text-3xl mb-4 pt-3 md:pt-8 ">
                {sectionInfo.filter((section) => section._id === "mainPageFIN")[0].title?.[locale]}
              </h2>

              <div
                ref={gallery}
                className="galleryPage w-full mx-auto relative grid gap-4 sm:gap-8 py-1  sm:px-8 md:px-0 md:gap-8 md:py-8 grid-cols-2 xs:grid-cols-3 md:grid-cols-4 ">
                {projects
                  .filter((project) => project.cat === "art")
                  .map((project, i) => (
                    <ProjectThumb activeIndex={activeIndex} setActiveIndex={setActiveIndex} index={i} key={i} project={project} />
                  ))}
              </div>

              <h2 className="font-lora text-center  text-inherit font-semibold text-3xl mb-4 pt-3 md:pt-8 ">
                {sectionInfo.filter((section) => section._id === "mainPageSTU")[0].title?.[locale]}
              </h2>
              <div
                ref={gallery}
                className="galleryPage w-full mx-auto relative grid gap-4 sm:gap-8 py-1  sm:px-8 md:px-0 md:gap-8 md:py-8 grid-cols-2 xs:grid-cols-3 md:grid-cols-4 ">
                {projects
                  .filter((project) => project.cat === "studio")
                  .map((project, i) => (
                    <ProjectThumb activeIndex={activeIndex} setActiveIndex={setActiveIndex} index={i} key={i} project={project} />
                  ))}
              </div>
               */}
            </Layout>

            <Footer2 className={`relative`} noMotion noMargin />

            {pageMobile ? <NavigationMobile /> : <Navigation />}
            {pageMobile ? <></> : <LanguageToggle />}
          </PageWrapper>
        </main>
      </ReactLenis>
    </>
  );
}

export async function getStaticProps() {
  const projects = await client.fetch(
    `*[_type == "project"]|order(date desc){title, subTitle, by, cat, date, description, mainImage{alt,image{asset->{url,metadata}, ...asset{_ref}}}, slug}`
  );
  // console.log(projects)
  const sectionInfo = await client.fetch(`*[_type == "mainPageXXX" || _type == "mainPageYYY"]`);

  // function artificialProjects (length) {
  //   console.log(Math.floor(Math.random()*projects.length))
  //   let artificialArray = new Array(length).fill(0).map(()=>{
  //     let randomI = Math.floor(Math.random()*projects.length)
  //     // console.log(randomI)
  //     // console.log(projects[randomI])
  //     return projects[randomI]
  //   })
  //   return artificialArray
  // }

  return {
    props: {
      // projects: artificialProjects(40)
      projects: projects,
      sectionInfo,
      // projects: [...projects, ...projects, ...projects, ...projects, ...projects, ...projects]
    },
  };
}
