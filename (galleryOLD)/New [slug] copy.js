import Logo from "@/components/Logo";
import { useAppContext } from "@/utils/appContext";
import { PageWrapper, usePageContext } from "@/utils/pageContext";
import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import client from "../lib/sanity";
// import { IoClose} from 'react-icons/io5'
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Layout from "@/components/Layout";
// import ProjectDescriptionTop from "@/components/ProjectDescriptionTop";
import { gsap } from "gsap/dist/gsap";
import { Observer } from "gsap/dist/Observer";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Line from "@/components/Line";
import Masonry from "react-masonry-css";
import SanityImage from "@/components/SanityImage";
import { Lenis as ReactLenis } from "@studio-freight/react-lenis";
import ProjectCarousel from "@/components/ProjectCarousel";

gsap.registerPlugin(Observer, ScrollToPlugin, ScrollTrigger);

export default function Project({ project, slug, slugs }) {
  // console.log(project)
  let darkMode = false;
  const { width, locale, height } = useAppContext();
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

  const showDialog = () => {
    setCarouselIsOpen(true);
    const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}`;
  };
  const closeDialog = () => {
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = "";
    body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
    setCarouselIsOpen(false);
  };

  useEffect(() => {
    function setScroll() {
      document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
    }
    window.addEventListener("scroll", setScroll);

    return () => window.removeEventListener("scroll", setScroll);
  }, []);

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
      <ReactLenis root options={{ wheelMultiplier: 0.9 }}>
        <main
          onKeyDown={(e) => {
            e.key === "Escape" && closeDialog();
          }}
          className={`focus:outline-none w-full relative transition-colors duration-700 min-h-screen  ${darkMode ? "text-primary bg-darkPrimary" : "text-darkPrimary bg-primary"}`}>
          <PageWrapper descriptionOpen={descriptionOpen} setDescriptionOpen={setDescriptionOpen} darkMode={darkMode}>
            <Layout cardSection className={"relative h-full flex flex-col gap-6 md:gap-8  max-w-7xl "}>
              <div className={`w-full h-full absolute`}>
                <Logo darkMode={darkMode} className="w-1/4 fixed left-1/2 top-1/2 z-0 -translate-x-[50%] -translate-y-1/2 opacity-5" />
              </div>
              <div className={`relative mt-12 md:mt-24 text-3xl  flex-col w-fit  ${darkMode ? "text-primary" : "text-darkPrimary"}`}>
                <h1 className={``}>
                  {project.title}
                  {project?.subTitle ? <Span text={` (${project.subTitle})`} /> : null}
                </h1>
                {project?.by?.[0] ? (
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
              <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-10 relative ">
                <div className="relative flex flex-col gap-4 md:basis-1/3  font-lora ">
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

                <p className="text-base w-full md:basis-2/3 font-normal text-justify whitespace-pre-wrap first-letter:float-left first-letter:text-4xl first-letter:pr-2 first-letter:font-normal first-letter:uppercase first-letter:font-lora">
                  {project?.description?.[locale] || ""}
                </p>
              </div>
              <Masonry
                breakpointCols={{
                  default: 4,
                  1100: 3,
                  700: 2,
                  // 500: 1,
                }}
                className="flex w-auto ml-[-6px] mt-6 md:mt-12 mb-12 relative"
                columnClassName="pl-[6px] bg-clip-padding ">
                {[project.mainImage.image, ...project.otherImages].map((image, i) => (
                  <Photo
                    key={i}
                    image={image}
                    i={i}
                    onClick={() => {
                      handleVisibility(i, "left");
                      showDialog();
                    }}
                  />
                ))}
              </Masonry>
            </Layout>
            <nav className={`flex absolute w-full lg:w-full top-3  px-3 lg:px-6  lg:gap-12 justify-between `}>
              {/* =======================BACK TO GALLERY======================= */}
              <Link
                title={locale === "fr" ? "Retour à la galerie" : "Back to gallery"}
                className={` group flex gap-1 items-center w-fit h-fit font-pop  font-normal transition-all `}
                href="/gallery">
                <IoArrowBack className={`w-5 h-5 ${darkMode ? "fill-primary" : "fill-darkPrimary"} transition-all `} />
                <div>
                  {locale === "fr" ? "Retour à la galerie" : "Back to gallery"}
                  <Line
                    className={`w-0 group-hover:w-full border-transparent  ${
                      darkMode ? "group-hover:border-b-primary" : "group-hover:border-b-darkPrimary"
                    } group-focus:w-full transition-all duration-300`}
                  />
                </div>
              </Link>
              <div className={`flex font-pop  font-normal gap-4`}>
                {/* =======================PREVIOUS======================= */}
                <Link
                  title={locale === "fr" ? "Précédent projet" : "Previous project"}
                  className={`hidden group transition-all md:flex items-center gap-1 w-fit h-fit `}
                  href={`/gallery/${prevSlug()}`}>
                  <AiFillCaretLeft className={` ${darkMode ? "fill-primary" : "fill-darkPrimary"} opacity-100 w-3 h-3 transition-all`} />
                  <div>
                    {locale === "fr" ? "Précédent" : "Previous"}
                    <Line
                      className={`w-0 group-hover:w-full  border-transparent ${
                        darkMode ? "group-hover:border-b-primary" : "group-hover:border-b-darkPrimary"
                      }  group-focus:w-full transition-all duration-300`}
                    />
                  </div>
                </Link>
                {/* =======================NEXT======================= */}
                <Link
                  title={locale === "fr" ? "Suivant projet" : "Next project"}
                  className={`hidden group transition-all md:flex items-center gap-1 w-fit h-fit`}
                  href={`/gallery/${nextSlug()}`}>
                  <div>
                    {locale === "fr" ? "Suivant" : "Next"}
                    <Line
                      className={`w-0 group-hover:w-full border-transparent ${
                        darkMode ? "group-hover:border-b-primary" : "group-hover:border-b-darkPrimary"
                      }  group-focus:w-full transition-all duration-300`}
                    />
                  </div>
                  <AiFillCaretRight className={` ${darkMode ? "fill-primary" : "fill-darkPrimary"} opacity-100 w-3 h-3 transition-all `} />
                </Link>
              </div>
              {/* =======================CONTACT ME======================= */}
              <Link
                title={locale === "fr" ? "Contactez-moi" : "Contact me"}
                className={` group flex items-center w-fit h-fit font-pop gap-2 font-normal transition-all  ml-auto `}
                href="/contact">
                <div>
                  {locale === "fr" ? "Contactez-moi" : "Contact me"}
                  <Line
                    className={`w-0 group-hover:w-full border-transparent  ${
                      darkMode ? "group-hover:border-b-primary" : "group-hover:border-b-darkPrimary"
                    } group-focus:w-full transition-all duration-300`}
                  />
                </div>
                <IoArrowBack className={`w-5 h-5 ${darkMode ? "fill-primary" : "fill-darkPrimary"} rotate-180 transition-all `} />
              </Link>
            </nav>
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
          </PageWrapper>
        </main>
      </ReactLenis>
    </>
  );
}

function Photo({ image, i, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const fotoThumb = useRef(null);
  const ctx = useRef(gsap.context(() => {}));
  const { width } = useAppContext();
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
      onLoadingComplete={() => setLoaded(true)}
      intrinsic
      factor={width < 850 ? 0.1 : 0.2}
      image={image}
      sizes="(max-width: 700px) 50vw, 25vw"
      alt={`Project picture ${i + 1}`}
      {...props}
    />
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
    console.log(text);
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
  return <span className={`font-pop font-medium text-sm ${detail ? "text-base" : ""}`}>{text}</span>;
}

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
    `*[_type == "project" && slug.current == "${params.slug}"][0]{...,grid, mainImage{alt,image{asset->{url,metadata}, ...asset{_ref}}},otherImages[]{_key,_type, asset->{url,metadata}, ...asset{_ref}}}`
  );
  // *[_type == "project" ][0]{...,mainImage{alt,image{asset->{_ref,_type,url,metadata}}},otherImages[]{_key,_type,asset->{_ref,_type,url,metadata}}}

  const projectSlugs = await client.fetch(`*[_type == "project"]|order(date){slug}`);
  const slugNames = projectSlugs.map((projectSlug) => projectSlug.slug.current);
  return {
    props: { key: params.slug, project, slug: params.slug, slugs: slugNames },
  };
}
