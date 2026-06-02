import { useAppContext } from "@/utils/appContext";
import { PageWrapper } from "@/utils/pageContext";
// import Image from "next/image";
import React, { useState, useEffect, useRef } from "react"
// import { IoClose} from 'react-icons/io5'
import ProjectPictures from "@/components/ProjectPictures";
import ProjectPicture from "@/components/ProjectPicture";
import Layout from "@/components/Layout";
// import ProjectDescriptionTop from "@/components/ProjectDescriptionTop";
import { gsap } from 'gsap/dist/gsap'
import useLocalStorage from "@/utils/useLocalStorage";
import { Observer } from 'gsap/dist/Observer'
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Draggable } from "gsap/dist/Draggable";
import { InertiaPlugin } from "gsap/dist/InertiaPlugin";
import { Flip } from "gsap/dist/Flip";
import PictureIndicator from "@/components/PictureIndicator";

gsap.registerPlugin(Observer, ScrollToPlugin, ScrollTrigger, Draggable, InertiaPlugin, Flip)

export default function ProjectCarousel({ project, open, visibleItem, setVisibleItem, nextVisibility, prevVisibility, handleVisibility, closeModal, onDragActiveChange }) {
  const { locale } = useAppContext()
  const containerRef = useRef(null)
  const backdropRef = useRef(null)
  const sheetRef = useRef(null)
  // Keep latest callbacks without re-subscribing effects every render
  const closeModalRef = useRef(closeModal)
  closeModalRef.current = closeModal
  const navRef = useRef({})
  navRef.current = { prevVisibility, nextVisibility }
  const lastFocusRef = useRef(null)
  const pointerStartRef = useRef(null)
  let [indicatorPosition, setIndicatorPosition] = useState(null)
  let [mainPictureHeight, setMainPictureHeight] = useState(null)
  let [mainPictureWidth, setMainPictureWidth] = useState(null)

  const activeIndex = visibleItem ? visibleItem.indexOf(true) : -1
  const dialogLabel = locale === 'fr' ? `Galerie photo : ${project.title}` : locale === 'nl' ? `Fotogalerij: ${project.title}` : `${project.title} photo gallery`

  const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const getThumbEl = (idx) => (typeof document !== 'undefined' ? document.querySelector(`[data-thumb-index="${idx}"]`) : null)
  const inViewport = (el) => {
    const r = el.getBoundingClientRect()
    return r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth
  }

  // Animated close (X / Esc / click-outside): morph the photo back into its
  // thumbnail with Flip while the backdrop fades, then unmount.
  function animatedClose() {
    const container = containerRef.current
    const sheet = sheetRef.current
    const done = () => closeModalRef.current()
    if (!container || !sheet) { done(); return }
    if (prefersReduced()) { gsap.set(container, { autoAlpha: 0 }); done(); return }
    const img = sheet.querySelector(`.mainPicture-${activeIndex}`)
    const thumb = getThumbEl(activeIndex)
    gsap.killTweensOf([container, backdropRef.current])
    gsap.to(container, { opacity: 0, duration: 0.45, ease: 'power2.in' })
    if (img && thumb && inViewport(thumb)) {
      Flip.fit(img, thumb, { duration: 0.45, ease: 'power3.inOut', absolute: true, scale: true, onComplete: done })
    } else {
      gsap.delayedCall(0.3, done)
    }
  }
  const animatedCloseRef = useRef(animatedClose)
  animatedCloseRef.current = animatedClose


  useEffect(() => {
    if (!open) return
    function handleKeyDown(e) {
      if (e.key === "Escape") { e.preventDefault(); animatedCloseRef.current() }
      else if (e.key === "ArrowLeft") navRef.current.prevVisibility()
      else if (e.key === "ArrowRight") navRef.current.nextVisibility()
      else if (e.key === "Tab") {
        const c = containerRef.current
        if (!c) return
        const f = c.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"]), [role="button"]')
        if (!f.length) return
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open])

  // Open: fade the backdrop in, morph the photo from its thumbnail (Flip),
  // wire up Draggable + InertiaPlugin swipe-to-dismiss, and trap focus.
  useEffect(() => {
    const container = containerRef.current
    const sheet = sheetRef.current
    const backdrop = backdropRef.current
    if (!open || !container || !sheet) return

    const reduced = prefersReduced()
    const ih = window.innerHeight
    const closeDist = ih * 0.25
    lastFocusRef.current = document.activeElement

    const backdropTo = gsap.quickTo(backdrop, 'opacity', { duration: 0.12, ease: 'none' })

    // Reveal the modal. Backdrop opacity is driven independently (so dragging
    // dims the backdrop while the sheet stays solid); the overall fade-in uses
    // the container so chrome appears smoothly.
    gsap.set(backdrop, { opacity: 1 })
    gsap.set(container, { autoAlpha: 1 })
    if (!reduced) gsap.fromTo(container, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })

    // Flip the active photo from its grid/masonry thumbnail (after layout).
    const idx = visibleItem.indexOf(true)
    const flipRaf = requestAnimationFrame(() => {
      const imgs = sheet.querySelectorAll('[class*="mainPicture-"]')
      // Reset any inline transform/position left by a previous Flip or the nav
      // cross-fade so the morph measures the photo's true natural box.
      gsap.set(imgs, { clearProps: 'transform,position,top,left,right,bottom,width,height,borderRadius' })
      gsap.set(imgs, { autoAlpha: 0 })
      const img = sheet.querySelector(`.mainPicture-${idx}`)
      if (img) gsap.set(img, { autoAlpha: 1 })
      const thumb = getThumbEl(idx)
      if (img && thumb && !reduced) {
        Flip.fit(img, thumb, { duration: 0.6, ease: 'power3.inOut', absolute: true, scale: true, runBackwards: true })
      }
    })

    const focusRaf = requestAnimationFrame(() => {
      const btn = container.querySelector('button')
      ;(btn || container).focus({ preventScroll: true })
    })

    // Swipe / flick-to-dismiss via Draggable (+ InertiaPlugin for velocity).
    InertiaPlugin.track(sheet, 'y')
    const created = Draggable.create(sheet, {
      type: 'y',
      lockAxis: true,
      inertia: false,
      dragClickables: false,
      allowContextMenu: true,
      edgeResistance: 0.92,
      bounds: { minY: 0, maxY: ih },
      cursor: 'grab',
      activeCursor: 'grabbing',
      onDragStart() {
        onDragActiveChange && onDragActiveChange(true)
        gsap.set(sheet, { willChange: 'transform' })
      },
      onDrag() {
        backdropTo(1 - Math.min((this.y / closeDist) * 0.85, 0.85))
      },
      onRelease() {
        onDragActiveChange && onDragActiveChange(false)
        let vy = 0
        try { vy = InertiaPlugin.getVelocity(sheet, 'y') } catch (e) {}
        const dismiss = this.y > closeDist || (!reduced && vy > 900)
        if (dismiss) {
          gsap.to(sheet, { y: ih, duration: 0.32, ease: 'power2.in', force3D: true })
          gsap.to([backdrop, container], { opacity: 0, duration: 0.32, ease: 'power2.in', onComplete: () => closeModalRef.current() })
        } else {
          gsap.to(sheet, { y: 0, duration: 0.5, ease: 'power3.out', force3D: true, onComplete: () => gsap.set(sheet, { willChange: 'auto' }) })
          gsap.to(backdrop, { opacity: 1, duration: 0.35, ease: 'power3.out' })
        }
      },
    })
    const drag = created && created[0]

    return () => {
      cancelAnimationFrame(flipRaf)
      cancelAnimationFrame(focusRaf)
      onDragActiveChange && onDragActiveChange(false)
      if (drag) drag.kill()
      try { InertiaPlugin.untrack(sheet, 'y') } catch (e) {}
      gsap.killTweensOf([container, sheet, backdrop])
      gsap.set(sheet, { clearProps: 'transform,willChange' })
      gsap.set(container, { clearProps: 'opacity,visibility' })
      gsap.set(backdrop, { clearProps: 'opacity' })
      const last = lastFocusRef.current
      if (last && last.focus) last.focus({ preventScroll: true })
    }
  }, [open])

  // Hide the site navbar while the carousel is open (covers mobile + desktop nav)
  useEffect(() => {
    const el = document.documentElement
    if (open) el.classList.add('carousel-open')
    else el.classList.remove('carousel-open')
    return () => { el.classList.remove('carousel-open') }
  }, [open])

  useEffect(() => {
    // console.log(descriptionPosition)
    // console.log(indicatorPosition)
    setMainPictureHeight(indicatorPosition?.top - 50)
    // console.log('height: ' + (descriptionPosition - indicatorPosition))

  }, [indicatorPosition, open])


  let palette = project.mainImage.image.asset.metadata.palette
  // let palette = Object.keys(project.mainImage.image.asset.metadata.palette).map((color,i)=>color.background);
  // {console.log(palette)}
  // let tl = useRef(null)

  // function initiateVisibility() {
  //   let visibility = new Array(project.otherImages.length + 1).fill(false)
  //   visibility[firstIndex] = true
  //   return visibility
  // }


  // useEffect(() => {
  //   // setDescriptionOpen(false)
  //   // firstLoad()

  //   // handleVisibility(visibleItem.indexOf(true), 'left')

  //   console.log(open)
  // }, [open])


  //  ========================================================================================
  // function firstLoad() {
  //   if (visibleItem !== null) {
  //     let activeIndex = visibleItem?.indexOf(true)
  //     gsap.to(`.mainPicture-${activeIndex}`, {
  //       autoAlpha: 1,
  //     })
  //   }
  // }

  // useEffect(() => {
  //   let observer = Observer.create({
  //     target: window,         // can be any element (selector text is fine)
  //     ignore: ".project-pictures, .project-grid, .imageFill",
  //     type: "touch, scroll, pointer",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
  //     preventDefault: false,
  //     onRight: () => {
  //       // console.log('right/prev');
  //       // setAnimating(true)
  //       prevVisibility()
  //     },
  //     onLeft: () => {
  //       // console.log('left/next');
  //       // setAnimating(true)
  //       nextVisibility()
  //     },
  //     lockAxis: true,
  //   })
  //   return () => { observer.disable() }
  // }, [visibleItem, animating])

  // // console.log(animating)



  // function vanish(index1, index2, direction) {
  //   let xAmount = 30;
  //   let scaleAmount = 0.95;
  //   gsap.killTweensOf(`.mainPicture-${index1}`)
  //   gsap.killTweensOf(`.mainPicture-${index2}`)
  //   // tl.current
  //   // , ' appeared: ', index2, ' to: ', direction
  //   // { onComplete: () => { console.log('vanished: ', index1, ' appeared: ', index2, ' to: ', direction) } }
  //   let tl = gsap.timeline({ autoRemoveChildren: true, onComplete: () => setAnimating(false) })
  //     .set(`.mainPicture-${index2}`, {
  //       x: () => direction === 'left' ? `${xAmount}` : `-${xAmount}`,
  //       scale: scaleAmount,
  //       borderRadius: 0,
  //       // autoAlpha: 0,
  //     })
  //     .to(`.mainPicture-${index1}`,
  //       {
  //         x: () => direction === 'left' ? `-=${xAmount}` : `+=${xAmount}`,
  //         scale: scaleAmount,
  //         autoAlpha: 0,
  //         borderRadius: 0,
  //         ease: 'expo.out',
  //         // ease:'power4.out',
  //         duration: 0.7,
  //       })
  //     .to(`.mainPicture-${index2}`, {
  //       x: 0,
  //       scale: 1,
  //       autoAlpha: 1,
  //       borderRadius: 5,
  //       ease: 'expo.out',
  //       // ease:'power4.out',
  //       duration: 0.7,
  //     }, '<+=0.1')
  //   // .set(`.mainPicture-${index1}`,
  //   //   {
  //   //     x: 0,
  //   //   scale:0.8,
  //   //   // autoAlpha: 0,
  //   //   })
  // }

  // useEffect(() => {
  //   return () => ctx.current.revert();
  // }, []);

  // useEffect(() => {
  //   ctx.current.add(() => {
  //     gsap.to('.project-pictures', {
  //       // x: selected === id ? 200 : 0,
  //       scrollTo:
  //         width < 1024
  //           ? { x: `#pictureThumb${visibleItem?.indexOf(true)}`, offsetX: width < 350 ? ((width - 80) / 2) : ((width - 112) / 2) }
  //           : { y: `#pictureThumb${visibleItem?.indexOf(true)}`, offsetY: (height - 167) / 2 },
  //       ease: 'power1.inout',
  //       duration: 0.7
  //       // duration: width < 1024 ? 0.7 : 1,
  //       // ease: 'expo.inout',
  //     });
  //   });
  // }, [visibleItem]);


  // function handleVisibility(nextItem, direction) {
  //   // console.log(visibleItem)
  //   let currentItem = visibleItem.indexOf(true);
  //   let newVisibility = new Array(visibleItem.length).fill(false);
  //   newVisibility[nextItem] = true;
  //   setVisibleItem(newVisibility)
  //   if (nextItem !== currentItem) {
  //     vanish(currentItem, nextItem, direction || (currentItem > nextItem ? 'right' : 'left'))
  //   }
  // }

  // function nextVisibility() {
  //   // console.log(visibleItem)

  //   if ((animating) && width < 1024) return;

  //   let currentItem = visibleItem.indexOf(true);
  //   if (currentItem === -1) {
  //     // handleVisibility(true, 0) // Cannot hurt to provide safety against no visibility although should not happen apriori.
  //     // handleVisibility(0) // Cannot hurt to provide safety against no visibility although should not happen apriori.
  //     // console.log('currentItem is -1!')
  //   } else {
  //     let nextItem = currentItem === visibleItem.length - 1 ? 0 : currentItem + 1;
  //     // handleVisibility(true, nextItem)
  //     handleVisibility(nextItem, 'left')
  //     // vanish(currentItem, nextItem, 'left')
  //     // console.log(currentItem, nextItem)
  //   }
  // }

  // function prevVisibility() {
  //   if ((animating) && width < 1024) return;
  //   // console.log('prev')
  //   let currentItem = visibleItem.indexOf(true);
  //   if (currentItem === -1) {
  //     // handleVisibility(0)
  //     // console.log('currentItem is -1!')
  //     // handleVisibility(true, 0)
  //   } else {
  //     let nextItem = currentItem === 0 ? visibleItem.length - 1 : currentItem - 1;
  //     handleVisibility(nextItem, 'right')
  //     // vanish(nextItem, 'right')
  //     // vanishToLeft(currentItem, nextItem)

  //     // handleVisibility(true, nextItem)
  //   }
  // }

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={dialogLabel}
      className={`carouselContainer focus:outline-none w-full h-[100dvh] z-[100] fixed overscroll-y-none overflow-y-hidden top-0 invisible opacity-0 text-foreground`}
      onPointerDownCapture={(e) => { pointerStartRef.current = { x: e.clientX, y: e.clientY } }}
      onClick={(e) => {
        const p = pointerStartRef.current
        const moved = p && Math.hypot(e.clientX - p.x, e.clientY - p.y) > 10
        if (!moved && (e.target === sheetRef.current || e.target === backdropRef.current)) animatedClose()
      }}
    >
      <div ref={backdropRef} aria-hidden className="absolute inset-0 bg-background bg-opacity-80" />
      <PageWrapper palette={palette} >
        <Layout cardSection className={"carouselContainer relative h-full flex items-center justify-center"}>
          <div style={{}} className={`carouselContainer relative w-[100%] h-full xl:w-[100%] max-w-[1700px] border-0 `}>

            {/* {visibleItem && ( */}
            <div ref={sheetRef} id="carouselContainer" className="relative flex flex-col justify-end  w-full h-full  pb-0 pt-10 mobm:pt-14  lg:py-8  ">
              {/* Drag affordance: rounded grabber bar indicating the modal is draggable */}
              <div aria-hidden className="absolute top-2 mobm:top-3 left-1/2 -translate-x-1/2 w-10 mobm:w-12 h-1.5 rounded-full bg-foreground/40 z-[2] pointer-events-none" />
              <ProjectPicture
                setMainPictureWidth={setMainPictureWidth}
                mainPictureHeight={mainPictureHeight}
                images={[project.mainImage.image, ...project.otherImages.map((oImage) => oImage.image)]}
                visibleItem={visibleItem}
                handleVisibility={handleVisibility}
                nextVisibility={nextVisibility}
                prevVisibility={prevVisibility}
              />
              <PictureIndicator mainPictureWidth={mainPictureWidth} setPosition={setIndicatorPosition} handleVisibility={handleVisibility} visibleItem={visibleItem} />
              <ProjectPictures images={[project.mainImage.image, ...project.otherImages.map((oImage) => oImage.image)]} handleVisibility={handleVisibility} visibleItem={visibleItem} />
            </div>
            {/* )} */}

            <button title={`Close carousel`} aria-label={locale === 'fr' ? 'Fermer' : locale === 'nl' ? 'Sluiten' : 'Close'} onClick={animatedClose} className={'flex justify-center items-center w-[50px] h-[50px] fixed top-0 right-0 z-[3] '}>
              <svg className='w-[17px] sm:w-[20px]' viewBox="0 0 23 23">
                <path
                  d="M 3 16.5 L 17 2.5"
                  fill="transparent"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                />
                <path
                  d="M 3 2.5 L 17 16.346"
                  fill="transparent"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                />
              </svg>
            </button>

          </div>
        </Layout>

      </PageWrapper>
    </div>
  );
}
