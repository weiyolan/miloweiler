import Logo from "@/components/Logo";
import ProjectDescription from "@/components/ProjectDescription";
import { useAppContext } from "@/utils/appContext";
import { PageWrapper } from "@/utils/pageContext";
import Head from "next/head";
// import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import client from "../../../lib/sanity";
// import { IoClose} from 'react-icons/io5'
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import ProjectPictures from "@/components/ProjectPictures";
import ProjectPicture from "@/components/ProjectPicture";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Layout from "@/components/Layout";
// import ProjectDescriptionTop from "@/components/ProjectDescriptionTop";
import { gsap } from "gsap/dist/gsap";
import useLocalStorage from "@/utils/useLocalStorage";
import { Observer } from "gsap/dist/Observer";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import PictureIndicator from "@/components/PictureIndicator";
import Line from "@/components/Line";

gsap.registerPlugin(Observer, ScrollToPlugin, ScrollTrigger);

export default function Project({ project, slug, slugs }) {
  // console.log(project)
  let [animating, setAnimating] = useState(false);
  let darkMode = true;
  const { width, height, locale } = useAppContext();
  // let [loaded, setLoaded] = useState(false)
  let [visibleItem, setVisibleItem] = useLocalStorage(`${slug}-visibleItem`, initiateVisibility());
  // let [clicked, setClicked] = useState(false)
  let [descriptionOpen, setDescriptionOpen] = useState(false);
  let [indicatorPosition, setIndicatorPosition] = useState(null);
  let [descriptionPosition, setDescriptionPosition] = useState(null);
  let [mainPictureHeight, setMainPictureHeight] = useState(null);
  let [mainPictureWidth, setMainPictureWidth] = useState(null);
  const ctx = useRef(gsap.context(() => {}));

  // let [activeIndex, setActiveIndex] = useLocalStorage(`${slug}-activeIndex`, 0)

  useEffect(() => {
    // console.log(descriptionPosition)
    // console.log(indicatorPosition)
    setMainPictureHeight(indicatorPosition?.top - descriptionPosition?.bottom);
    // console.log('height: ' + (descriptionPosition - indicatorPosition))
  }, [indicatorPosition, descriptionPosition]);

  let palette = project.mainImage.image.asset.metadata.palette;
  // let palette = Object.keys(project.mainImage.image.asset.metadata.palette).map((color,i)=>color.background);
  // {console.log(palette)}
  let tl = useRef(null);

  useEffect(() => {
    setDescriptionOpen(false);
    firstLoad();
    // console.log(visibleItem)
  }, [visibleItem]);

  useEffect(() => {
    let observer = Observer.create({
      target: window, // can be any element (selector text is fine)
      ignore: ".project-pictures, .project-grid, .imageFill",
      type: "touch, scroll, pointer", // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      preventDefault: false,
      onRight: () => {
        // console.log('right/prev');
        // setAnimating(true)
        prevVisibility();
      },
      onLeft: () => {
        // console.log('left/next');
        // setAnimating(true)
        nextVisibility();
      },
      lockAxis: true,
    });
    return () => {
      observer.disable();
    };
  }, [visibleItem, animating, descriptionOpen]);

  // console.log(animating)

  function initiateVisibility() {
    let visibility = new Array(project.otherImages.length + 1).fill(false);
    visibility[0] = true;
    return visibility;
  }

  function firstLoad() {
    if (visibleItem !== null) {
      let activeIndex = visibleItem.indexOf(true);
      gsap.to(`.mainPicture-${activeIndex}`, {
        autoAlpha: 1,
      });
    }
  }

  function vanish(index1, index2, direction) {
    let xAmount = 30;
    let scaleAmount = 0.95;
    gsap.killTweensOf(`.mainPicture-${index1}`);
    gsap.killTweensOf(`.mainPicture-${index2}`);
    // tl.current
    // , ' appeared: ', index2, ' to: ', direction
    // { onComplete: () => { console.log('vanished: ', index1, ' appeared: ', index2, ' to: ', direction) } }
    let tl = gsap
      .timeline({ autoRemoveChildren: true, onComplete: () => setAnimating(false) })
      .set(`.mainPicture-${index2}`, {
        x: () => (direction === "left" ? `${xAmount}` : `-${xAmount}`),
        scale: scaleAmount,
        borderRadius: 0,
        // autoAlpha: 0,
      })
      .to(`.mainPicture-${index1}`, {
        x: () => (direction === "left" ? `-=${xAmount}` : `+=${xAmount}`),
        scale: scaleAmount,
        autoAlpha: 0,
        borderRadius: 0,
        ease: "expo.out",
        // ease:'power4.out',
        duration: 0.7,
      })
      .to(
        `.mainPicture-${index2}`,
        {
          x: 0,
          scale: 1,
          autoAlpha: 1,
          borderRadius: 5,
          ease: "expo.out",
          // ease:'power4.out',
          duration: 0.7,
        },
        "<+=0.1"
      );
    // .set(`.mainPicture-${index1}`,
    //   {
    //     x: 0,
    //   scale:0.8,
    //   // autoAlpha: 0,
    //   })
  }

  useEffect(() => {
    return () => ctx.current.revert();
  }, []);

  useEffect(() => {
    ctx.current.add(() => {
      gsap.to(".project-pictures", {
        // x: selected === id ? 200 : 0,
        scrollTo:
          width < 1024
            ? { x: `#pictureThumb${visibleItem?.indexOf(true)}`, offsetX: width < 350 ? (width - 80) / 2 : (width - 112) / 2 }
            : { y: `#pictureThumb${visibleItem?.indexOf(true)}`, offsetY: (height - 167) / 2 },
        ease: "power1.inout",
        duration: 0.7,
        // duration: width < 1024 ? 0.7 : 1,
        // ease: 'expo.inout',
      });
    });
  }, [visibleItem]);

  function handleVisibility(nextItem, direction) {
    // console.log(visibleItem)
    let currentItem = visibleItem.indexOf(true);
    let newVisibility = new Array(visibleItem.length).fill(false);
    newVisibility[nextItem] = true;
    setVisibleItem(newVisibility);
    if (nextItem !== currentItem) {
      vanish(currentItem, nextItem, direction || (currentItem > nextItem ? "right" : "left"));
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

    if ((animating || descriptionOpen) && width < 1024) return;

    let currentItem = visibleItem.indexOf(true);
    if (currentItem === -1) {
      // handleVisibility(true, 0) // Cannot hurt to provide safety against no visibility although should not happen apriori.
      // handleVisibility(0) // Cannot hurt to provide safety against no visibility although should not happen apriori.
      // console.log('currentItem is -1!')
    } else {
      let nextItem = currentItem === visibleItem.length - 1 ? 0 : currentItem + 1;
      // handleVisibility(true, nextItem)
      handleVisibility(nextItem, "left");
      // vanish(currentItem, nextItem, 'left')
      // console.log(currentItem, nextItem)
    }
  }

  function prevVisibility() {
    if ((animating || descriptionOpen) && width < 1024) return;
    // console.log('prev')
    let currentItem = visibleItem.indexOf(true);
    if (currentItem === -1) {
      // handleVisibility(0)
      // console.log('currentItem is -1!')
      // handleVisibility(true, 0)
    } else {
      let nextItem = currentItem === 0 ? visibleItem.length - 1 : currentItem - 1;
      handleVisibility(nextItem, "right");
      // vanish(nextItem, 'right')
      // vanishToLeft(currentItem, nextItem)

      // handleVisibility(true, nextItem)
    }
  }

  function prevSlug() {
    let currentItem = slugs.indexOf(slug);
    let nextItem = currentItem === 0 ? slugs.length - 1 : currentItem - 1;
    return slugs[nextItem];
    // console.log(slugs[nextItem])
  }
  function nextSlug() {
    let currentItem = slugs.indexOf(slug);
    let nextItem = currentItem === slugs.length - 1 ? 0 : currentItem + 1;
    return slugs[nextItem];
    // console.log(slugs[nextItem])
  }

  return (
    <>
      <Head>
        <title>{`Milo Weiler | ${project?.title}`}</title>
        <meta name="description" content={`${project?.description?.[locale]}`} />

        <meta property="og:title" content={project.title} />
        {/* <meta property="og:type" content="article" /> */}
        <meta property="og:type" content="website" />
        <meta property="og:description" content={project?.by?.[0] !== undefined ? `In collaboration with ${project?.by?.[0]}` : "Get Inspired By The Best Of"} />
        <meta property="og:site_name" content="miloweiler.com" />
        <meta property="og:image" itemProp="image" content={`${project.mainImage.image.asset.url}?w=500&h=500&fit=crop`} />
        <meta property="og:locale" content={locale} />
        <meta property="og:url" content={`https://miloweiler.com/${locale === "en" ? "" : locale + "/"}/gallery/${project.slug.current}`} />
        <meta property="fb:app_id" content="659504862954849" />
        {/* TWITTER */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="miloweiler.com" />
        <meta property="twitter:url" content={`https://miloweiler.com/${locale === "en" ? "" : locale + "/"}/gallery/${project.slug.current}`} />
        <meta name="twitter:title" content={project.title} />
        <meta name="twitter:description" content={project?.by?.[0] !== undefined ? `In collaboration with ${project?.by?.[0]}` : "Get Inspired By The Best Of"} />
        <meta name="twitter:image" content={`${project.mainImage.image.asset.url}?w=500&h=500&fit=crop`} />
      </Head>
      {/* bg-gradient-to-br  from-darkGrey to-[#070013] */}
      <main
        tabIndex={0}
        style={{ backgroundColor: palette.dominant.background }}
        className={`focus:outline-none w-full h-[100dvh] relative transition-colors duration-700  overflow-hidden ${darkMode ? "text-primary" : "text-darkPrimary"}`}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            prevVisibility();
          } else if (e.key === "ArrowRight") {
            nextVisibility();
          }
        }}>
        <PageWrapper palette={palette} descriptionOpen={descriptionOpen} setDescriptionOpen={setDescriptionOpen} darkMode={darkMode}>
          <Layout cardSection className={"relative h-full flex items-center justify-center"}>
            {/* ========================INSIDE======================== */}
            {/* <div className={`relative w-screen h-[100%] xl:w-[95%] max-w-[1700px] md:rounded-3xl 
          after:absolute after:w-full after:h-full after:top-0 after:left-0 after:md:rounded-3xl after:md:shadow-inner-3xl after:shadow-black/60 after:select-none before:z-[1]`}> */}
            {/* { borderColor: palette.darkMuted.background } */}
            <div style={{}} className={`relative w-[100%] h-full xl:w-[100%] max-w-[1700px] border-0 `}>
              <div className={`w-full h-full absolute`}>
                {/* <Image fill className="opacity-100" style={{ objectFit: 'cover', objectPosition: 'center' }} src='/images/projectBackground.jpg' alt='' priority quality={100} /> */}
                {/* <div className="w-full h-full bg-slate-50/10 relative"></div> */}
                <Logo darkMode={darkMode} className="w-1/4 absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-1/2 opacity-5" />
              </div>

              {visibleItem && (
                <div className="relative flex flex-col justify-end lg:flex-row lg:items-start lg:justify-between w-full h-full z-[2] pb-0 pt-10 mobm:pt-14  lg:p-0  ">
                  {/* {console.log([project.mainImage.image, ...project.otherImages] )} */}
                  {/* <div> */}
                  <ProjectPicture
                    setMainPictureWidth={setMainPictureWidth}
                    mainPictureHeight={mainPictureHeight}
                    images={[project.mainImage.image, ...project.otherImages]}
                    visibleItem={visibleItem}
                    handleVisibility={handleVisibility}
                    nextVisibility={nextVisibility}
                    prevVisibility={prevVisibility}
                  />
                  <PictureIndicator mainPictureWidth={mainPictureWidth} setPosition={setIndicatorPosition} handleVisibility={handleVisibility} visibleItem={visibleItem} />
                  {/* </div> */}
                  <ProjectPictures images={[project.mainImage.image, ...project.otherImages]} handleVisibility={handleVisibility} visibleItem={visibleItem} />
                  <ProjectDescription setPosition={setDescriptionPosition} project={project} mainPictureWidth={mainPictureWidth} />
                </div>
              )}

              {/* {Object.keys(palette).map((name, i) => <div style={{ transform: `translateX(${i * 170}px)`, backgroundColor: palette[name].background }} className="w-40 h-40 absolute bottom-0 left-0 bg-red-300 z-20">{name}</div>)} */}
            </div>
          </Layout>
          <div
            className={`absolute flex w-full lg:w-fit z-[10] top-4 lg:left-4 px-3 lg:px-0 lg:gap-12 justify-between ${
              width < 1024 ? (descriptionOpen ? "" : "invisible select-none") : ""
            }`}>
            <Link
              title={locale === "fr" ? "Retour à la galerie" : "Back to gallery"}
              className={` group flex items-center w-fit h-fit font-pop text-xs mobm:text-sm font-extralight transition-all 
                ${width < 1024 ? `transition-all  ${descriptionOpen ? `opacity-100 visible duration-700 delay-500` : ` delay-[0] opacity-0 duration-150 invisible`}` : ""}`}
              href="/gallery">
              <IoArrowBack className="w-5 h-5 fill-primary group-hover:scale-110 transition-all " />
              <div>
                {locale === "fr" ? "Retour à la galerie" : "Back to gallery"}
                <Line className={`w-0 group-hover:w-full border-transparent  group-hover:border-b-primary group-focus:w-full transition-all duration-300`} />
              </div>
            </Link>
            <div className={`flex font-pop text-xs mobm:text-sm font-extralight gap-4`}>
              <Link
                title={locale === "fr" ? "Précédent projet" : "Previous project"}
                className={` group transition-all flex items-center gap-1 w-fit h-fit 
              ${
                width < 1024
                  ? `transition-all  ${descriptionOpen ? `opacity-100 visible duration-700 delay-[0.6s]` : ` select-none delay-[0] opacity-0 duration-150 invisible`}`
                  : ""
              }`}
                href={`/gallery/${prevSlug()}`}>
                <AiFillCaretLeft className=" fill-primary opacity-100 w-3 h-3 transition-all group-hover:scale-110" />
                <div>
                  {locale === "fr" ? "Précédent" : "Previous"}
                  <Line className={`w-0 group-hover:w-full  border-transparent group-hover:border-b-primary group-focus:w-full transition-all duration-300`} />
                </div>
              </Link>
              <Link
                title={locale === "fr" ? "Suivant projet" : "Next project"}
                className={` group transition-all flex items-center gap-1 w-fit h-fit
              ${
                width < 1024
                  ? `transition-all  ${descriptionOpen ? `opacity-100 visible duration-700 delay-[0.70s]` : ` select-none delay-[0] opacity-0 duration-150 invisible`}`
                  : ""
              }`}
                href={`/gallery/${nextSlug()}`}>
                <div>
                  {locale === "fr" ? "Suivant" : "Next"}
                  <Line className={`w-0 group-hover:w-full border-transparent group-hover:border-b-primary group-focus:w-full transition-all duration-300`} />
                </div>
                <AiFillCaretRight className=" fill-primary opacity-100 w-3 h-3 transition-all group-hover:scale-110" />
              </Link>
            </div>
          </div>
          {/* <Link className='absolute z-10 w-fit h-fit top-10 right-4' href='/gallery'>
            <IoClose className="w-6 h-6 fill-darkGrey hover:scale-110 " />
          </Link> */}
        </PageWrapper>
      </main>
    </>
  );
}

// function GetItems(project, slug) {
//   let [visibleItem, setVisibleItem] = useLocalStorage(`${slug}-visibleItem`, initiateVisibility())
//   return [visibleItem, setVisibleItem]
// }

export async function getStaticPaths({ locales }) {
  const projects = await client.fetch(`*[_type == "project"]{slug}`);

  const slugs = projects.map((project) => project.slug.current);

  const paths = slugs
    .map((slug) =>
      locales.map((locale) => ({
        params: { slug: slug },
        locale,
      }))
    )
    .flat(); // to avoid nested arrays

  // let paths = [{params:{slug:'project-1'}}]
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }) {
  // const project = await client.fetch(`*[_type == "project" && slug.current == "${params.slug}"][0]`);
  const project = await client.fetch(
    `*[_type == "project" && slug.current == "${params.slug}"][0]{...,mainImage{alt,image{asset->{url,metadata}, ...asset{_ref}}},otherImages[]{_key,_type, asset->{url,metadata}, ...asset{_ref}}}`
  );
  // *[_type == "project" ][0]{...,mainImage{alt,image{asset->{_ref,_type,url,metadata}}},otherImages[]{_key,_type,asset->{_ref,_type,url,metadata}}}

  const projectSlugs = await client.fetch(`*[_type == "project"]|order(date){slug}`);
  const slugNames = projectSlugs.map((projectSlug) => projectSlug.slug.current);
  return {
    props: { key: params.slug, project, slug: params.slug, slugs: slugNames },
  };
}
