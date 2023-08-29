// import ArrowLink from '@/components/ArrowLink';
import Logo from '@/components/Logo';
import ProjectThumb from '@/components/ProjectThumb';
import { useAppContext } from '@/utils/appContext';
import { PageWrapper } from '@/utils/pageContext';
import { gsap } from 'gsap';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import client from '../../../lib/sanity';
import Footer2 from '@/components/Footer2';
import Navigation from '@/components/Navigation';
import { Lenis as ReactLenis } from '@studio-freight/react-lenis'
import NavigationMobile from '@/components/NavigationMobile';
import Layout from '@/components/Layout';
import LanguageToggle from '@/components/LanguageToggle';

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);

export default function Gallery({ projects }) {
  let { width, locale } = useAppContext()
  let pageMobile = width < 648;
  let darkMode = false
  let [activeIndex, setActiveIndex] = useState(null)
  const gallery = useRef();
  const ctx = useRef();

  useEffect(() => {
    // console.log('context')
    ctx.current = gsap.context(() => { }, gallery); // nothing initially (we'll add() to the context when endX changes)
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
        <title>Milo Weiler | Enjoy My Gallery </title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReactLenis root options={{ wheelMultiplier: 0.9 }}>
        {/* from-darkGrey to-[#070013]
        bg-gradient-to-br from-primary to-[#FFEAD6]  */}
        <main className={`bg-[#FFEAD6]  w-full  min-h-screen ${darkMode ? 'text-primary' : 'text-darkPrimary'}`}>
          <PageWrapper darkMode={darkMode}>
            <Layout className={'relative lg:px-16 xl:px-24 max-w-7xl'}>
              <Logo darkMode={darkMode} className='w-2/5 fixed left-1/2 top-1/2 -translate-x-[50%] -translate-y-1/2 opacity-5' />
              <h1 className={` font-lora text-center md:text-left font-semibold text-3xl mb-2 pt-3 md:pt-12 `}>{locale==='fr'?'Galerie':'Gallery'}</h1>
              <h2> {locale==='fr'?'Voici mes projets.':'Have a look at my projects.'}</h2>
              <div ref={gallery} className='w-full mx-auto relative grid gap-4 sm:gap-8 py-1 sm:px-8 md:px-0 md:gap-14 md:py-14 grid-cols-2 xs:grid-cols-3 md:grid-cols-4 '>
                {projects.map((project, i) => <ProjectThumb activeIndex={activeIndex} setActiveIndex={setActiveIndex} index={i} key={i} project={project} />)}
              </div>
              {/* <div className='flex gap-8 py-8 relative'>
              <div className='columns-1 w-1/5'>
                {projects.map((project, i) => <ProjectThumb activeIndex={activeIndex} setActiveIndex={setActiveIndex} index={i} key={i} project={project} />)}
              </div>
            </div> */}
            </Layout>

            <Footer2 className={`relative`} noMotion noMargin />

            {pageMobile ? <NavigationMobile /> : <Navigation />}
            {pageMobile ? <></> : <LanguageToggle />}
          </PageWrapper>
        </main>
      </ReactLenis>
    </>
  )
}

export async function getStaticProps() {
  const projects = await client.fetch(`*[_type == "project"]|order(date desc){title, subTitle, by, cat, description, mainImage{alt,image{asset->{url,metadata}, ...asset{_ref}}}, slug}`);
  // console.log(projects)

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
      projects: projects
      // projects: [...projects, ...projects, ...projects, ...projects, ...projects, ...projects]
    }
  };
}