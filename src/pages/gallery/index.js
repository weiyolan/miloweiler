import ArrowLink from '@/components/ArrowLink';
import Logo from '@/components/Logo';
import ProjectThumb from '@/components/ProjectThumb';
import { useAppContext } from '@/utils/appContext';
import { PageWrapper } from '@/utils/pageContext';
import { gsap } from 'gsap';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react'
import client from '../../../lib/sanity'

export default function Gallery({ projects }) {
  let { width, locale } = useAppContext()
  let pageMobile = width < 648;
  let darkMode = true
  let [activeIndex, setActiveIndex] = useState(null)
  const gallery = useRef();
  const ctx = useRef();

  useEffect(() => {
    // console.log('context')
    ctx.current = gsap.context(() => {}, gallery); // nothing initially (we'll add() to the context when endX changes)
    return () => ctx.current.revert();
  }, [ctx]);

  function pushCardsOnClick() {
    // console.log('push')
    ctx.current.add(() => {
      gsap.to(".inactiveCard", {
        scale: 0.6,
        duration:0.3,
        // y: 20,
        // yoyo: true, 
        // repeat: -1, 
        // ease: "expo.out",
        stagger: {
          // amount: 0.5,
          each: 0.2,
          grid: "auto",
          from: activeIndex
        }
      })
    })
  }

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
        <title>Photography</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`bg-gradient-to-br from-darkGrey to-[#070013] w-full ${darkMode ? 'text-primary' : 'text-darkPrimary'}`}>
        <PageWrapper darkMode={darkMode}>
          <Logo darkMode={darkMode} className='w-1/4 absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-1/2 opacity-5' />
          <h1 className={`uppercase font-lora text-center text-3xl py-4 `}>Gallery</h1>

          <div ref={gallery} className='w-full relative grid gap-1 grid-cols-2 xs:grid-cols-3  md:grid-cols-6'>
            {projects.map((project, i) => <ProjectThumb handleClick={pushCardsOnClick}  index={i} key={i} project={project} />)}
            {/* {console.log(artificialProjects(20))} */}
          </div>

        </PageWrapper>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const projects = await client.fetch(`*[_type == "project"]|order(date desc){title, cat, mainImage{alt,image{asset->{url,metadata}, ...asset{_ref}}}, slug}`);
  // console.log(projects)
  // {...,mainImage{alt,image{asset->{url,metadata}, ...asset{_ref}}},otherImages[]{_key,_type, asset->{url,metadata}, ...asset{_ref}}}
  
  function artificialProjects (length) {
    console.log(Math.floor(Math.random()*projects.length))
    let artificialArray = new Array(length).fill(0).map(()=>{
      let randomI = Math.floor(Math.random()*projects.length)
      // console.log(randomI)
      // console.log(projects[randomI])
      return projects[randomI]
    })
    return artificialArray
  }
  
  return {
    props: {
      projects: artificialProjects(40)
      // projects: [...projects, ...projects, ...projects, ...projects, ...projects, ...projects]
    }
  };
}