import Logo from "@/components/Logo";
import { useAppContext } from "@/utils/appContext";
import { PageWrapper, usePageContext } from "@/utils/pageContext";
import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import client from "../../../../lib/sanity";
// import { IoClose} from 'react-icons/io5'
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import {  AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Layout from "@/components/Layout";
// import ProjectDescriptionTop from "@/components/ProjectDescriptionTop";
import { gsap } from "gsap/dist/gsap";
import { Observer } from "gsap/dist/Observer";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import Line from "@/components/Line";
import Masonry from "react-masonry-css";
import SanityImage from "@/components/SanityImage";
import { ReactLenis } from "lenis/react";
const ProjectCarousel = dynamic(() => import("@/components/ProjectCarousel"), { ssr: false });
import Footer2 from "@/components/Footer2";
import { CATEGORY_MAP } from "@/utils/categories";
import { getCatFromSlug } from "@/utils/categories";

export default function Project({ project, slug, slugs, category }) {
  // console.log(project)
  let darkMode = true;
  const { width, locale, height } = useAppContext();
  let pageMobile = width < 648;

  const lenisRef = useRef();
  const [carouselIsOpen, setCarouselIsOpen] = useState(false);
  let [descriptionOpen, setDescriptionOpen] = useState(false);
  let [animating, setAnimating] = useState(false);
  // const [firstIndex, setFirstIndex] = useState(0);
  const ctx = useRef(gsap.context(() => {}));
  let [visibleItem, setVisibleItem] = useState(initiateVisibility());

  useEffect(() => {
    return () => ctx.current.revert();
  }, []);

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

  function initiateVisibility() {
    let visibility = new Array(project.otherImages.length + 1).fill(false);
    visibility[0] = true;
    return visibility;
  }

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
  }, [visibleItem, animating]);

  // console.log(animating)

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
    ctx.current.add(() => {
      gsap.to(".project-pictures", {
        // x: selected === id ? 200 : 0,
        scrollTo: { x: `#pictureThumb${visibleItem?.indexOf(true)}`, offsetX: width < 350 ? (width - 80) / 2 : (width - 112) / 2 },
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

  function nextVisibility() {
    // console.log(visibleItem)

    if (animating && width < 1024) return;

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
    if (animating && width < 1024) return;
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

  useEffect(() => {
    if (carouselIsOpen) {
      lenisRef.current?.lenis?.stop();
    } else {
      lenisRef.current?.lenis?.start();
    }
  }, [carouselIsOpen]);

  const showDialog = () => setCarouselIsOpen(true);
  const closeDialog = () => setCarouselIsOpen(false);

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
        <meta property="og:url" content={`https://miloweiler.com/${locale === "en" ? "" : locale + "/"}projects/${category}/${slug}`} />
        <meta property="fb:app_id" content="659504862954849" />
        {/* TWITTER */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="miloweiler.com" />
        <meta property="twitter:url" content={`https://miloweiler.com/${locale === "en" ? "" : locale + "/"}projects/${category}/${slug}`} />
        <meta name="twitter:title" content={project.title} />
        <meta name="twitter:description" content={project?.by?.[0] !== undefined ? `In collaboration with ${project?.by?.[0]}` : "Get Inspired By The Best Of"} />
        <meta name="twitter:image" content={`${project.mainImage.image.asset.url}?w=500&h=500&fit=crop`} />
      </Head>
      {/* bg-gradient-to-br  from-darkGrey to-[#070013] */}
      <ReactLenis ref={lenisRef} root options={{ wheelMultiplier: 0.9 }}>
        <main
          onKeyDown={(e) => {
            e.key === "Escape" && closeDialog();
          }}
          className={`focus:outline-none w-full relative transition-colors duration-700 min-h-screen flex flex-col  ${darkMode ? "text-primary bg-darkGrey" : "text-darkPrimary bg-primary"}`}>
          <PageWrapper darkMode={darkMode}>
            {/* <div className={`w-full h-full absolute`}> */}
            {/* <Logo darkMode={darkMode} className="w-1/4 fixed left-1/2 top-1/2 z-0 -translate-x-[50%] -translate-y-1/2 opacity-5" /> */}
            {/* </div> */}
            <ProjectCarousel
              prevVisibility={prevVisibility}
              nextVisibility={nextVisibility}
              handleVisibility={handleVisibility}
              visibleItem={visibleItem}
              setVisibleItem={(array) => setVisibleItem(array)}
              project={project}
              slug={slug}
              open={carouselIsOpen}
              closeModal={() => closeDialog()}
            />
            <Layout cardSection className={"relative w-full h-full flex flex-col flex-1 gap-6 md:gap-8 px-6 mt-12"}>
              <div className={"relative w-full flex flex-col flex-1 gap-6 md:gap-8 max-w-7xl mx-auto"}>
                <nav className={`flex mt-16 md:mt-20 lg:gap-12 justify-between text-sm`}>
                  {/* =======================BACK TO GALLERY======================= */}
                  <Link
                    title={locale === "fr" ? "Retour à la galerie" : "Back to gallery"}
                    className={`group relative flex gap-1 items-center w-fit h-fit font-mono font-normal transition-all `}
                    href={`/projects/${category}`}>
                    {/* <IoArrowBack className={`w-5 h-5 ${darkMode ? "fill-primary" : "fill-darkPrimary"} transition-all`} /> */}
                      <Arrow/>
                    <div>
                      {locale === "fr" ? "Retour à la galerie" : "Back to gallery"}
                      {/* <Line
                        className={`w-0 group-hover:w-full border-transparent ${
                          darkMode ? "group-hover:border-b-primary" : "group-hover:border-b-darkPrimary"
                        } group-focus:w-full transition-all duration-300`}
                      /> */}
                    </div>
                  </Link>
                  <div className={`flex font-mono font-normal gap-4 mr-auto`}>
                    {/* =======================PREVIOUS======================= */}
                    <Link
                      title={locale === "fr" ? "Précédent projet" : "Previous project"}
                      className={`hidden group transition-all md:flex items-center gap-1 w-fit h-fit`}
                      href={`/projects/${category}/${prevSlug()}`}>
                      <AiFillCaretLeft className={`${darkMode ? "fill-primary" : "fill-darkPrimary"} opacity-100 w-3 h-3 transition-all group-hover:-translate-x-1 group-hover:scale-105`} />
                      <div>
                        {locale === "fr" ? "Précédent" : "Previous"}
                        {/* <Line
                          className={`w-0 group-hover:w-full border-transparent ${
                            darkMode ? "group-hover:border-b-primary" : "group-hover:border-b-darkPrimary"
                          } group-focus:w-full transition-all duration-300`}
                        /> */}
                      </div>
                    </Link>
                    {/* =======================NEXT======================= */}
                    <Link
                      title={locale === "fr" ? "Suivant projet" : "Next project"}
                      className={`hidden group transition-all md:flex items-center gap-1 w-fit h-fit`}
                      href={`/projects/${category}/${nextSlug()}`}>
                      <div>
                        {locale === "fr" ? "Suivant" : "Next"}
                        {/* <Line    className={`w-0 group-hover:w-full border-transparent ${ darkMode ? "group-hover:border-b-primary" : "group-hover:border-b-darkPrimary"
                          } group-focus:w-full transition-all duration-300`}
                        /> */}
                      </div>
                      <AiFillCaretRight className={`${darkMode ? "fill-primary" : "fill-darkPrimary"} opacity-100 w-3 h-3 transition-all group-hover:translate-x-1 group-hover:scale-105`} />
                    </Link>
                  </div>
                </nav>
                <div className={`relative text-5xl md:text-7xl font-serif flex-col w-fit  ${darkMode ? "text-primary" : "text-darkPrimary"}`}>
                  <h1 className={``}>
                    {project.title}
                    {project?.subTitle ? <Span text={` (${project.subTitle})`} /> : null}
                  </h1>
                  {project?.minimalText == false && project?.by?.[0] ? (
                    <h2>
                      <Span text={locale === "fr" ? "par " : "by "} />
                      <Link
                        className={`w-fit relative inline-flex ${project?.partnerLink ? "group" : "select-none cursor-default"}`}
                        // as={project?.partnerLink ? "a" : "div"}
                        title={project?.partnerLink ? `${locale === "fr" ? "Visitez le site" : "Visit the website"}` : undefined}
                        target="_blank"
                        href={project?.partnerLink ? project?.partnerLink : ""}
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          project?.partnerLink === undefined && e.preventDefault();
                        }}>
                        <div>
                          {`${project?.by?.[0]}`}
                          <Line
                            className={`w-0 group-hover:w-full border-transparent  ${
                              darkMode ? "group-hover:border-b-primary" : "group-hover:border-b-darkPrimary"
                            } group-focus:w-full transition-all duration-300`}
                          />
                        </div>
                      </Link>
                    </h2>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-10 relative mb-16">
                  {project?.minimalText == false && (
                    <div className="relative flex flex-col gap-4 md:basis-1/3  font-serif ">
                      {project?.date ? <Detail title={locale === "fr" ? "An" : "Year"} text={[project.date.slice(0, 4)]} /> : null}
                      {project?.album ? <Detail title="Album" text={[project.album]} /> : null}
                      {project?.directed ? <Detail title={locale === "fr" ? "Réalisé Par" : "Directed By"} text={project.directed} /> : null}
                      {project?.produced ? <Detail title={locale === "fr" ? "Produit Par" : "Produced By"} text={project.produced} /> : null}
                      {project?.designed ? <Detail title={locale === "fr" ? "Conçu Par" : "Designed By"} text={project.designed} /> : null}
                      {project?.created ? <Detail title={locale === "fr" ? "Créé Par" : "Created By"} text={project.created} /> : null}
                      {project?.developed ? <Detail title={locale === "fr" ? "Développé Par" : "Developed By"} text={project.developed} /> : null}
                      {project?.commissioned ? <Detail title={locale === "fr" ? "Commandée Par" : "Commissioned By"} text={project.commissioned} /> : null}
                      {project?.artist ? (
                        <Detail title={locale === "fr" ? `Artiste${project.artist.length > 1 ? "s" : ""}` : `Artist${project.artist.length > 1 ? "s" : ""}`} text={project.artist} />
                      ) : null}
                    </div>
                  )}

                  <p
                    className={`text-base w-full max-w-3xl ${project?.minimalText == false && " md:basis-2/3"} font-normal text-justify whitespace-pre-wrap first-letter:float-left first-letter:text-4xl first-letter:pr-2 first-letter:font-normal first-letter:uppercase first-letter:font-serif`}>
                    {project?.description?.[locale] || ""}
                  </p>
                </div>
              </div>
              {project?.grid ? (
                <div
                  style={{
                    gridTemplateColumns: `repeat(${project?.gridCols?.[width < 648 ? "sm" : "lg"]},1fr)`,
                    // gridAutoRows: `calc(minmax(calc(100vw - ${width < 648 ? 4 : 8}px), 1280px) - calc(8px * calc(${project?.gridCols?.[width < 648 ? "sm" : "lg"]} - 1)) / ${
                    //   project?.gridCols?.[width < 648 ? "sm" : "lg"]
                    // }))`,
                    // gridAutoRows: `calc(calc(minmax(calc(100vw - ${2 * 8}px), 1280px) - calc(8px * calc(${24} - 1))) / ${24})`,
                    gridAutoRows: `calc(calc(calc(min(calc(100vw - ${2 * (width < 648 ? 8 : 40)}px), 12000px)) - calc(${width < 648 ? 4 : 8}px * calc(${
                      project?.gridCols?.[width < 648 ? "sm" : "lg"]
                    } - 1))) / ${project?.gridCols?.[width < 648 ? "sm" : "lg"]})`,
                  }}
                  className="grid gap-1 sm:gap-2 w-full mb-6">
                  {/* <div className="bg-red-300  row-start-1 col-start-1 row-span-2 col-span-3"></div> */}
                  {[...project.otherImages].map((image, i) => (
                    <GridPhoto
                      key={i}
                      image={image}
                      i={i}
                      onClick={() => {
                        handleVisibility(i + 1, "left");
                        showDialog();
                      }}
                    />
                  ))}
                </div>
              ) : (
                <Masonry
                  breakpointCols={{
                    default: 4,
                    1100: 3,
                    700: 2,
                    // 500: 1,
                  }}
                  className="flex w-auto ml-[-6px] mt-6 md:mt-12 mb-12 relative"
                  columnClassName="pl-[6px] bg-clip-padding ">
                  {[{ image: project.mainImage.image, alt: project.mainImage.alt }, ...project.otherImages.map((oImage) => ({ image: oImage.image, alt: oImage.alt }))].map((item, i) => (
                    <Photo
                      key={i}
                      image={item.image}
                      alt={item.alt}
                      i={i}
                      onClick={() => {
                        handleVisibility(i, "left");
                        showDialog();
                      }}
                    />
                  ))}
                </Masonry>
              )}
            </Layout>
            
            <Footer2 className={`relative mt-24`} noMotion noMargin />
          </PageWrapper>
        </main>
      </ReactLenis>
    </>
  );
}

function Arrow({arrowClassName="" }) {
  return (
    <span className='block duration-300 relative  w-10 h-5 overflow-hidden -ml-4 '>
      <span className={`absolute duration-300 top-1/2 right-0 -translate-y-1/2 group-hover:-translate-x-full group-hover:scale-105 group-hover:opacity-0 opacity-100`}>
        <IoArrowBack className={`text-inherit fill-inherit text-xl md:text-xl ${arrowClassName}`} />
      </span>
      <span className={`absolute duration-300 top-1/2 right-0 -translate-y-1/2 group-hover:-translate-x-1/4 group-hover:scale-105 group-hover:opacity-100 translate-x-[100%] opacity-0'}`}>
        <IoArrowBack className={`text-inherit fill-inherit text-xl md:text-xl ${arrowClassName}`} />
      </span>
    </span>
  )
}

function Photo({ image, alt: altText, i, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const fotoThumb = useRef(null);
  const ctx = useRef(gsap.context(() => {}));
  const { width, locale } = useAppContext();
  useEffect(() => {
    // function onLoad() {
    if (loaded) {
      ctx.current.add(() => {
        gsap.to(fotoThumb.current, {
          // scale: 1,
          opacity: 1,
          duration: 0.5,
          // delay: 0.2,
          stagger: 0.5,
          ease: "expo.out",
          scrollTrigger: {
            scroller: window,
            trigger: fotoThumb.current,
            // start: '-=50% bottom',
            start: "+=10% bottom",
            // end: '150% top',
            end: "90% top",
            // pin:true,width < 1024
            // scrub: 1,
            toggleActions: "play reverse play reverse",
            // markers: true,
            invalidateOnRefresh: true,
          },
          // onStart: () => console.log('start')
        });
      });
    }
    return () => ctx.current.revert();
    // }
    // onLoad()
  }, [loaded]);

  return (
    <SanityImage
      ref={fotoThumb}
      blur
      key={i}
      className={`opacity-0  mb-[6px] cursor-pointer transition-transform duration-200 hover:scale-[0.97]`}
      onLoad={() => setLoaded(true)}
      intrinsic
      factor={width < 850 ? 0.1 : 0.2}
      image={image}
      sizes="(max-width: 700px) 50vw, 25vw"
      alt={altText?.[locale] || `Project picture ${i + 1}`}
      {...props}
    />
  );
}

function GridPhoto({ image, i, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const fotoThumb = useRef(null);
  const ctx = useRef(gsap.context(() => {}));
  const { width, locale } = useAppContext();
  const { darkMode } = usePageContext();
  useEffect(() => {
    // function onLoad() {
    if (loaded) {
      ctx.current.add(() => {
        gsap.to(fotoThumb.current, {
          // scale: 1,
          opacity: 1,
          duration: 0.5,
          // delay: 0.2,
          stagger: 0.5,
          ease: "expo.out",
          scrollTrigger: {
            scroller: window,
            trigger: fotoThumb.current,
            // start: '-=50% bottom',
            start: "+=10% bottom",
            // end: '150% top',
            end: "90% top",
            // pin:true,width < 1024
            // scrub: 1,
            toggleActions: "play reverse play reverse",
            // markers: true,
            invalidateOnRefresh: true,
          },
          // onStart: () => console.log('start')
        });
      });
    }
    return () => ctx.current.revert();
    // }
    // onLoad()
  }, [loaded]);
  // console.log(image.position.lg);
  return (
    <div
      className={`relative opacity-0 cursor-pointer transition-transform duration-200 hover:scale-[0.97] ${image?.border && `before:absolute ${darkMode ? "before:bg-darkGrey" : "before:bg-white"} before:-top-1 sm:before:-top-2 before:-left-1 sm:before:-left-2 before:-right-1 sm:before:-right-2 before:-bottom-1 sm:before:-bottom-2`}`}
      ref={fotoThumb}
      style={{
        width: "auto",
        height: "auto",
        gridRow: `${image.position[width < 648 ? "sm" : "lg"]?.y} / span ${image.position[width < 648 ? "sm" : "lg"]?.height}`,
        gridColumn: `${image.position[width < 648 ? "sm" : "lg"]?.x} / span ${image.position[width < 648 ? "sm" : "lg"]?.width}`,
      }}>
      <SanityImage
        blur
        style={
          {
            // width: "auto",
            // height: "auto",
            // gridRow: `${image.position[width < 648 ? "sm" : "lg"].y} / span ${image.position[width < 648 ? "sm" : "lg"].width}`,
            // gridColumn: `${image.position[width < 648 ? "sm" : "lg"].x} / span ${image.position[width < 648 ? "sm" : "lg"].height}`,
          }
        }
        key={i}
        fill
        className={` relative object-cover`}
        onLoad={() => setLoaded(true)}
        containerClass="rounded-none"
        factor={width < 850 ? 0.1 : 0.2}
        image={image.image}
        sizes="(max-width: 700px) 50vw, 25vw"
        alt={image?.alt?.[locale] || `Project picture ${i + 1}`}
        {...props}
      />
    </div>
  );
}

// function GetItems(project, slug) {
//   let [visibleItem, setVisibleItem] = useLocalStorage(`${slug}-visibleItem`, initiateVisibility())
//   return [visibleItem, setVisibleItem]
// }

function Detail({ title, text }) {
  let { locale } = useAppContext();
  let string;

  if (text.length === 1) {
    string = text[0];
  } else if (text.length === 2) {
    string = text[0] + (locale === "fr" ? " et " : " and ") + text[1];
  } else {
    // console.log(text);
    let firsts = text.slice(0, -1);
    string = firsts.join(", ") + (locale === "fr" ? " et " : " and ") + text.slice(-1);
  }

  return (
    <h3 className="text-base md:text-xl leading-4">
      {title + ": "}
      <Span detail text={string} />
    </h3>
  );
}

function Span({ text, detail }) {
  return <span className={`font-mono font-medium text-sm ${detail ? "text-base" : ""}`}>{text}</span>;
}

export async function getStaticPaths({ locales }) {
  const projects = await client.fetch(`*[_type == "project"]{slug, cat}`);
  const paths = projects.flatMap(project =>
    locales.map(locale => ({
      params: { category: CATEGORY_MAP[project.cat], slug: project.slug.current },
      locale,
    }))
  );
  return { paths, fallback: false };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }) {
  const cat = getCatFromSlug(params.category);
  const [project, categorySlugs] = await Promise.all([
    client.fetch(
      `*[_type == "project" && slug.current == "${params.slug}"][0]{...,grid,gridSize,commissionedBool,mainImage{alt,image{asset->{url,metadata},...asset{_ref}}},otherImages[]{_key,_type,alt,border,position,image{asset->{url,metadata},...asset{_ref}}}}`
    ),
    client.fetch(`*[_type == "project" && cat == "${cat}"]|order(date desc){slug}`),
  ]);
  const slugNames = categorySlugs.map(p => p.slug.current);
  return {
    props: { key: params.slug, project, slug: params.slug, slugs: slugNames, category: params.category },
  };
}
