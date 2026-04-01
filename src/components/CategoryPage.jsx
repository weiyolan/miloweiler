import { useAppContext } from "@/utils/appContext";
import { PageWrapper } from "@/utils/pageContext";
import Head from "next/head";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap/dist/gsap";
import Footer2 from "@/components/Footer2";
import { useLenis } from "lenis/react";
import Layout from "@/components/Layout";
import GalleryTitle from "@/components/GalleryTitle";
import { CATEGORY_LABELS } from "@/utils/categories";
import ProjectGrid from "@/components/ProjectGrid";
import CarouselFocus from "@/components/CarouselFocus";

export default function CategoryPage({ projects, category }) {
  const { width, locale } = useAppContext();
  const darkMode = true;
  const label = CATEGORY_LABELS[category]?.[locale] || category;

  // CarouselFocus state
  const [focusOpen, setFocusOpen] = useState(false);
  const [focusImage, setFocusImage] = useState(null);
  const [focusAlt, setFocusAlt] = useState('');

  // Lenis pause/resume on lightbox
  const lenis = useLenis();
  useEffect(() => {
    if (focusOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [focusOpen, lenis]);

  const openFocus = useCallback((project, imageIndex) => {
    const img = project.otherImages[imageIndex];
    if (img) {
      setFocusImage(img.image);
      setFocusAlt(img.alt?.[locale] || '');
      setFocusOpen(true);
    }
  }, [locale]);

  const closeFocus = useCallback(() => {
    setFocusOpen(false);
  }, []);

  // Scroll to project
  const scrollToProject = useCallback((slug) => {
    gsap.to(window, {
      scrollTo: { y: `#project-${slug}`, offsetY: 80 },
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  // Entry animations
  const ctx = useRef(gsap.context(() => {}));
  useEffect(() => {
    ctx.current = gsap.context(() => {
      gsap.from('.overview-item', {
        autoAlpha: 0,
        y: 10,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
      });
    });
    return () => ctx.current.revert();
  }, []);

  return (
    <>
      <Head>
        <title>{`Milo Weiler | ${label}`}</title>
        <meta name="description" content={`${label} — Photography by Milo Weiler`} />
        <meta property="og:title" content={`${label} — Milo Weiler`} />
        <meta property="og:description" content={`${label} — Photography by Milo Weiler`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="miloweiler.com" />
        {projects[0]?.mainImage?.image?.asset?.url && (
          <meta property="og:image" itemProp="image" content={`${projects[0].mainImage.image.asset.url}?w=500&h=500&fit=crop`} />
        )}
        <meta property="og:locale" content={locale} />
        <meta property="og:url" content={`https://miloweiler.com/${locale === "en" ? "" : locale + "/"}${category}`} />
      </Head>

      <main className="w-full min-h-screen flex flex-col bg-darkGrey text-primary">
        <PageWrapper darkMode={darkMode}>
          <CarouselFocus
            image={focusImage}
            alt={focusAlt}
            open={focusOpen}
            onClose={closeFocus}
          />

          <Layout cardSection className="relative pt-12 max-w-full mb-12 flex-1">
            {/* Category Title */}
            <GalleryTitle h1>{label}</GalleryTitle>

            {/* Project Overview List */}
            <nav className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm mb-16 mt-12">
              {projects.map((project) => (
                <button
                  key={project.slug.current}
                  className="overview-item opacity-60 hover:opacity-100 transition-opacity"
                  onClick={() => scrollToProject(project.slug.current)}
                >
                  {project.title}
                </button>
              ))}
            </nav>

            {/* Stacked Project Sections */}
            {projects.map((project) => (
              <section
                key={project.slug.current}
                id={`project-${project.slug.current}`}
                className="relative mb-24"
              >
                {/* Background title */}
                <div className="pointer-events-none select-none text-[12vw] md:text-[8vw] font-serif font-black text-white/[0.03] leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-0">
                  {project.title}
                </div>

                {/* Metadata */}
                <div className="relative z-10 mb-8">
                  <div className="text-3xl md:text-5xl font-serif text-primary mb-4">
                    <h2>
                      {project.title}
                      {project?.subTitle ? <span className="font-mono font-medium text-sm">{` (${project.subTitle})`}</span> : null}
                    </h2>
                    {project?.by?.[0] && (
                      <p className="font-mono font-medium text-sm mt-1">
                        {locale === "fr" ? "par " : "by "}{project.by[0]}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-10">
                    <div className="flex flex-col gap-2 md:basis-1/3 font-serif">
                      {project?.date && (
                        <p className="font-mono font-medium text-sm">
                          {locale === "fr" ? "An" : "Year"}: {project.date.slice(0, 4)}
                        </p>
                      )}
                      {project?.commissionedBool && (
                        <span className="font-mono text-xs uppercase tracking-wider opacity-60">
                          {locale === "fr" ? "Commandé" : "Commissioned"}
                        </span>
                      )}
                    </div>
                    {project?.description?.[locale] && (
                      <p className="text-base w-full max-w-3xl md:basis-2/3 font-normal text-justify whitespace-pre-wrap first-letter:float-left first-letter:text-4xl first-letter:pr-2 first-letter:font-normal first-letter:uppercase first-letter:font-serif">
                        {project.description[locale]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Project Grid */}
                <div className="relative z-10">
                  <ProjectGrid
                    project={project}
                    onImageClick={(i) => openFocus(project, i)}
                  />
                </div>
              </section>
            ))}
          </Layout>

          <Footer2 className="relative" noMotion noMargin />
        </PageWrapper>
      </main>
    </>
  );
}
