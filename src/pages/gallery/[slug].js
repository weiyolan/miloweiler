import Logo from "@/components/Logo";
import ProjectDescription from "@/components/ProjectDescription";
import { useAppContext } from "@/utils/appContext";
import { PageWrapper } from "@/utils/pageContext";
import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react"
import client from '../../../lib/sanity'
import { IoClose, IoArrowBack } from 'react-icons/io5'
import Link from "next/link";
import ProjectPictures from "@/components/ProjectPictures";
import ProjectPicture from "@/components/ProjectPicture";
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import Layout from "@/components/Layout";
import ProjectDescriptionTop from "@/components/ProjectDescriptionTop";
import gsap from 'gsap/dist/gsap'
import useLocalStorage from "@/utils/useLocalStorage";
import { Observer } from 'gsap/dist/Observer'
import PictureIndicator from "@/components/PictureIndicator";
gsap.registerPlugin(Observer)


export default function Project({ project, slug, slugs }) {
  // console.log(project)
  let [animating, setAnimating] = useState(false)
  let darkMode = true
  const { width } = useAppContext()
  // let [loaded, setLoaded] = useState(false)
  let [visibleItem, setVisibleItem] = useLocalStorage(`${slug}-visibleItem`, initiateVisibility())
  let [clicked, setClicked] = useState(false)
  let [descriptionOpen, setDescriptionOpen] = useState(false)
  // let [activeIndex, setActiveIndex] = useLocalStorage(`${slug}-activeIndex`, 0)

  let palette = project.mainImage.image.asset.metadata.palette
  // let palette = Object.keys(project.mainImage.image.asset.metadata.palette).map((color,i)=>color.background);
  // {console.log(palette)}
  let tl = useRef(null)

  useEffect(() => {
    setDescriptionOpen(false)
    firstLoad()
    // console.log(visibleItem)
  }, [visibleItem])


  useEffect(() => {
    let observer = Observer.create({
      target: window,         // can be any element (selector text is fine)
      ignore: ".project-pictures, .project-grid, .imageFill",
      type: "touch, scroll, pointer",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      onRight: () => {
        console.log('right/prev');
        // setAnimating(true)
        prevVisibility()
      },
      onLeft: () => {
        console.log('left/next');
        // setAnimating(true)
        nextVisibility()
      },
      lockAxis: true,
    })
    return () => { observer.disable() }
  }, [visibleItem, animating, descriptionOpen])

  // console.log(animating)

  function initiateVisibility() {
    let visibility = new Array(project.otherImages.length + 1).fill(false)
    visibility[0] = true
    return visibility
  }

  function firstLoad() {
    if (visibleItem !== null) {
      let activeIndex = visibleItem.indexOf(true)
      gsap.to(`.mainPicture-${activeIndex}`, {
        autoAlpha: 1,
      })
    }
  }

  function vanish(index1, index2, direction) {
    let xAmount = 30;
    let scaleAmount = 0.95;
    gsap.killTweensOf(`.mainPicture-${index1}`)
    gsap.killTweensOf(`.mainPicture-${index2}`)
    // tl.current
    // , ' appeared: ', index2, ' to: ', direction
    // { onComplete: () => { console.log('vanished: ', index1, ' appeared: ', index2, ' to: ', direction) } }
    let tl = gsap.timeline({ autoRemoveChildren: true, onComplete: () => setAnimating(false) })
      .set(`.mainPicture-${index2}`, {
        x: () => direction === 'left' ? `${xAmount}` : `-${xAmount}`,
        scale: scaleAmount,
        borderRadius: 70,
        // autoAlpha: 0,
      })
      .to(`.mainPicture-${index1}`,
        {
          x: () => direction === 'left' ? `-=${xAmount}` : `+=${xAmount}`,
          scale: scaleAmount,
          autoAlpha: 0,
          borderRadius: 70,
          ease: 'expo.out',
          // ease:'power4.out',
          duration: 0.7,
        })
      .to(`.mainPicture-${index2}`, {
        x: 0,
        scale: 1,
        autoAlpha: 1,
        borderRadius: 5,
        ease: 'expo.out',
        // ease:'power4.out',
        duration: 0.7,
      }, '<+=0.1')
    // .set(`.mainPicture-${index1}`,
    //   {
    //     x: 0,
    //   scale:0.8,
    //   // autoAlpha: 0,
    //   })
  }



  function handleVisibility(nextItem, direction) {
    // console.log(visibleItem)
    let currentItem = visibleItem.indexOf(true);
    let newVisibility = new Array(visibleItem.length).fill(false);
    newVisibility[nextItem] = true;
    setVisibleItem(newVisibility)
    if (nextItem !== currentItem) {
      vanish(currentItem, nextItem, direction || (currentItem > nextItem ? 'right' : 'left'))
    }
  }

  // function handleVisibility(newVal, i) {
  // if (newVal === true) {
  //   let newVisibility = new Array(qualities.length).fill(false);
  //   newVisibility[i] = newVal;
  //   setVisibleItem(newVisibility)
  // } 
  // else if (newVal === false) {
  //   randomVisibility(visibleItem)
  // }
  // }

  // function randomVisibility(visibleItems) {
  //   let currentItem = visibleItems.indexOf(true);
  //   let indexes = new Array(visibleItems.length).fill(0).map((val, i) => { return i })
  //   if (currentItem > -1) {
  //     indexes.splice(currentItem, 1);
  //   }
  //   let newIndex = indexes[Math.floor(Math.random() * indexes.length)];
  //   handleVisibility(true, newIndex)
  // }


  function nextVisibility() {
    // console.log(visibleItem)

    if (animating || descriptionOpen) return;

    let currentItem = visibleItem.indexOf(true);
    if (currentItem === -1) {
      // handleVisibility(true, 0) // Cannot hurt to provide safety against no visibility although should not happen apriori.
      // handleVisibility(0) // Cannot hurt to provide safety against no visibility although should not happen apriori.
      console.log('currentItem is -1!')
    } else {
      let nextItem = currentItem === visibleItem.length - 1 ? 0 : currentItem + 1;
      // handleVisibility(true, nextItem)
      handleVisibility(nextItem, 'left')
      // vanish(currentItem, nextItem, 'left')
      // console.log(currentItem, nextItem)
    }
  }

  function prevVisibility() {
    if (animating || descriptionOpen) return;
    // console.log('prev')
    let currentItem = visibleItem.indexOf(true);
    if (currentItem === -1) {
      // handleVisibility(0)
      console.log('currentItem is -1!')
      // handleVisibility(true, 0)
    } else {
      let nextItem = currentItem === 0 ? visibleItem.length - 1 : currentItem - 1;
      handleVisibility(nextItem, 'right')
      // vanish(nextItem, 'right')
      // vanishToLeft(currentItem, nextItem)

      // handleVisibility(true, nextItem)
    }
  }

  function prevSlug() {
    let currentItem = slugs.indexOf(slug);
    let nextItem = currentItem === 0 ? slugs.length - 1 : currentItem - 1;
    return slugs[nextItem]
    // console.log(slugs[nextItem])
  }
  function nextSlug() {
    let currentItem = slugs.indexOf(slug);
    let nextItem = currentItem === slugs.length - 1 ? 0 : currentItem + 1;
    return slugs[nextItem]
    // console.log(slugs[nextItem])
  }

  return (
    <>
      <Head>
        <title>Photography</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* bg-gradient-to-br  from-darkGrey to-[#070013] */}
      <main tabIndex={0} style={{ backgroundColor: palette.vibrant.background }} className={`focus:outline-none w-full h-[100vh] relative transition-colors duration-700  overflow-hidden ${darkMode ? 'text-primary' : 'text-darkPrimary'}`}
        onKeyDown={(e) => { if (e.key === "ArrowLeft") { prevVisibility() } else if (e.key === "ArrowRight") { nextVisibility() } }}
      >
        <PageWrapper palette={palette} descriptionOpen={descriptionOpen} setDescriptionOpen={setDescriptionOpen} darkMode={darkMode}>

          <Layout cardSection className={'relative h-full flex items-center justify-center'}>

            {/* ========================INSIDE======================== */}
            {/* <div className={`relative w-screen h-[100%] xl:w-[95%] max-w-[1700px] md:rounded-3xl 
          after:absolute after:w-full after:h-full after:top-0 after:left-0 after:md:rounded-3xl after:md:shadow-inner-3xl after:shadow-black/60 after:select-none before:z-[1]`}> */}
            {/* { borderColor: palette.darkMuted.background } */}
            <div style={{}} className={`relative w-[100%] h-full xl:w-[100%] max-w-[1700px] md:h-[100%] border-0 overflow-hidden 
          before:absolute `}>

              <div className={`w-full h-full absolute`}>
                {/* <Image fill className="opacity-100" style={{ objectFit: 'cover', objectPosition: 'center' }} src='/images/projectBackground.jpg' alt='' priority quality={100} /> */}
                {/* <div className="w-full h-full bg-slate-50/10 relative"></div> */}
                <Logo darkMode={darkMode} className='w-1/4 absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-1/2 opacity-5' />
              </div>

              {visibleItem &&
                <div className="relative flex flex-col justify-end md:flex-row w-full h-full z-[2] py-2 mobm:py-4 gap-4 ">
                  {/* {console.log([project.mainImage.image, ...project.otherImages] )} */}
                  <ProjectPicture images={[project.mainImage.image, ...project.otherImages]} visibleItem={visibleItem} handleVisibility={handleVisibility} nextVisibility={nextVisibility} prevVisibility={prevVisibility} />
                  <PictureIndicator handleVisibility={handleVisibility} visibleItem={visibleItem} />
                  <ProjectPictures images={[project.mainImage.image, ...project.otherImages]} handleVisibility={handleVisibility} visibleItem={visibleItem} />
                  <ProjectDescription project={project} />

                </div>}

              {/* {Object.keys(palette).map((name, i) => <div style={{ transform: `translateX(${i * 170}px)`, backgroundColor: palette[name].background }} className="w-40 h-40 absolute bottom-0 left-0 bg-red-300 z-20">{name}</div>)} */}



              <Link title='Previous project' className={`absolute flex items-center gap-1 z-10 w-fit h-fit font-pop text-xs mobm:text-sm font-extralight top-5 md:top-6 right-24 
              ${width < 768 ? `transition-all  ${descriptionOpen ? `opacity-100 visible duration-700 delay-[0.6s]` : ` delay-[0] opacity-0 duration-150 invisible`}` : ''}`} href={`/gallery/${prevSlug()}`}>
                <AiFillCaretLeft className='relative fill-primary opacity-100 w-3 h-3  md:px-1' />
                <div>Prev</div>
              </Link>

              <Link title='Back to gallery'
                className={`absolute flex items-center z-10 w-fit h-fit font-pop text-xs mobm:text-sm font-extralight top-4 md:top-6 left-3 
                ${width < 768 ? `transition-all  ${descriptionOpen ? `opacity-100 visible duration-700 delay-500` : ` delay-[0] opacity-0 duration-150 invisible`}` : ''}`}
                href='/gallery'>
                <IoArrowBack className="w-5 h-5 md:w-6 md:h-6 fill-primary hover:scale-110 " />
                <div>Back to gallery</div>
              </Link>

              <Link title='Next project' className={`absolute flex items-center gap-1 z-10 w-fit h-fit font-pop text-xs mobm:text-sm font-extralight top-5 md:top-6 right-3 
              ${width < 768 ? `transition-all  ${descriptionOpen ? `opacity-100 visible duration-700 delay-[0.70s]` : ` delay-[0] opacity-0 duration-150 invisible`}` : ''}`} href={`/gallery/${nextSlug()}`}>
                <div>Next</div>
                <AiFillCaretRight className='relative fill-primary opacity-100 w-3 h-3 ' />
              </Link>
            </div>

          </Layout>
          {/* <Link className='absolute z-10 w-fit h-fit top-10 right-4' href='/gallery'>
            <IoClose className="w-6 h-6 fill-darkGrey hover:scale-110 " />
          </Link> */}

        </PageWrapper>
      </main>
    </>
  )
}

function GetItems(project, slug) {
  let [visibleItem, setVisibleItem] = useLocalStorage(`${slug}-visibleItem`, initiateVisibility())
  return [visibleItem, setVisibleItem]
}

export async function getStaticPaths() {
  const projects = await client.fetch(`*[_type == "project"]{slug}`);
  const paths = projects.map((project) => {
    return {
      params: { slug: project.slug.current },
    }
  })
  // let paths = [{params:{slug:'project-1'}}]
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }) {
  // const project = await client.fetch(`*[_type == "project" && slug.current == "${params.slug}"][0]`);
  const project = await client.fetch(`*[_type == "project" && slug.current == "${params.slug}"][0]{...,mainImage{alt,image{asset->{url,metadata}, ...asset{_ref}}},otherImages[]{_key,_type, asset->{url,metadata}, ...asset{_ref}}}`);
  // *[_type == "project" ][0]{...,mainImage{alt,image{asset->{_ref,_type,url,metadata}}},otherImages[]{_key,_type,asset->{_ref,_type,url,metadata}}}

  const projectSlugs = await client.fetch(`*[_type == "project"]|order(date){slug}`);
  const slugNames = projectSlugs.map((projectSlug) => projectSlug.slug.current);
  return {
    props: { key: params.slug, project, slug: params.slug, slugs: slugNames },
  }
}