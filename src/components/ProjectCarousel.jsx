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
import PictureIndicator from "@/components/PictureIndicator";

gsap.registerPlugin(Observer, ScrollToPlugin, ScrollTrigger, Draggable, InertiaPlugin)

export default function ProjectCarousel({ project, open, visibleItem, setVisibleItem, nextVisibility, prevVisibility, handleVisibility, closeModal, onDragActiveChange, onZoomActiveChange }) {
  const { locale } = useAppContext()
  const containerRef = useRef(null)
  const backdropRef = useRef(null)
  const sheetRef = useRef(null)
  const handleRef = useRef(null)
  const dragRef = useRef(null)
  // Latest zoom callback without re-subscribing effects
  const onZoomActiveChangeRef = useRef(onZoomActiveChange)
  onZoomActiveChangeRef.current = onZoomActiveChange

  // While a photo is zoomed: suspend the sheet's vertical drag-to-dismiss and let
  // the page suspend its swipe-to-navigate, so pan gestures stay on the image.
  function handleZoomActive(v) {
    const d = dragRef.current
    if (d) { v ? d.disable() : d.enable() }
    onZoomActiveChangeRef.current && onZoomActiveChangeRef.current(v)
  }
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

  // Subtle photo metadata (mono font): "NN / NN · year · W×H"
  const allImages = [project.mainImage.image, ...project.otherImages.map((o) => o.image)]
  const totalImages = allImages.length
  const activeDims = allImages[activeIndex]?.asset?.metadata?.dimensions
  const projectYear = project.date ? String(project.date).slice(0, 4) : null
  const pad2 = (n) => String(n).padStart(2, '0')
  const metaText = [
    activeIndex >= 0 ? `${pad2(activeIndex + 1)} / ${pad2(totalImages)}` : null,
    projectYear,
    activeDims?.width && activeDims?.height ? `${activeDims.width}×${activeDims.height}` : null,
  ].filter(Boolean).join('   ·   ')

  // Animated close (X / Esc / click-outside): slide the sheet down a touch while the
  // whole modal — including the big picture — fades out, then unmount.
  function animatedClose() {
    const container = containerRef.current
    const sheet = sheetRef.current
    const done = () => closeModalRef.current()
    if (!container || !sheet) { done(); return }
    if (prefersReduced()) { gsap.set(container, { autoAlpha: 0 }); done(); return }
    gsap.killTweensOf([container, sheet, backdropRef.current])
    gsap.timeline({ onComplete: done })
      .to(sheet, { y: 44, duration: 0.42, ease: 'power2.in' }, 0)
      .to(container, { opacity: 0, duration: 0.4, ease: 'power2.in' }, 0.04)
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

  // Open: slide the sheet up with a fade (modal entrance), fade the active photo in,
  // grow the grabber from a dot into a bar, stagger the thumbnails in from the centre,
  // then wire up Draggable + InertiaPlugin swipe-to-dismiss and trap focus.
  useEffect(() => {
    const container = containerRef.current
    const sheet = sheetRef.current
    const backdrop = backdropRef.current
    const handle = handleRef.current
    if (!open || !container || !sheet) return

    const reduced = prefersReduced()
    const ih = window.innerHeight
    const closeDist = ih * 0.25
    lastFocusRef.current = document.activeElement

    const backdropTo = gsap.quickTo(backdrop, 'opacity', { duration: 0.12, ease: 'none' })

    const idx = visibleItem.indexOf(true)
    const imgs = sheet.querySelectorAll('[class*="mainPicture-"]')
    const img = sheet.querySelector(`.mainPicture-${idx}`)
    const thumbs = sheet.querySelectorAll('.picture-thumb')

    // Base (pre-animation) state.
    gsap.set(backdrop, { opacity: 1 })
    gsap.set(imgs, { autoAlpha: 0 })
    if (reduced) {
      gsap.set(container, { autoAlpha: 1 })
      gsap.set(sheet, { y: 0 })
      if (img) gsap.set(img, { autoAlpha: 1 })
      if (handle) gsap.set(handle, { width: 44 })
      gsap.set(thumbs, { autoAlpha: 1 })
    } else {
      gsap.set(container, { visibility: 'visible', opacity: 0 }) // visible but transparent; the timeline fades it in
      gsap.set(sheet, { y: 52 })
      if (handle) gsap.set(handle, { width: 6 })
      gsap.set(thumbs, { autoAlpha: 0 })
    }

    // Run the entrance on the next frame so the photo + thumbnails are laid out first.
    let openTl
    const openRaf = requestAnimationFrame(() => {
      if (reduced) return
      openTl = gsap.timeline()
      openTl
        .fromTo(container, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 0)
        .to(sheet, { y: 0, duration: 0.6, ease: 'power3.out' }, 0)
      if (img) openTl.to(img, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, 0.08)
      if (handle) openTl.to(handle, { width: 44, duration: 0.4, ease: 'power2.out' }, 0.32)
      if (thumbs.length) openTl.to(thumbs, { autoAlpha: 1, duration: 0.4, ease: 'power2.out', stagger: { each: 0.05, from: idx } }, 0.28)
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
    dragRef.current = drag

    return () => {
      cancelAnimationFrame(openRaf)
      cancelAnimationFrame(focusRaf)
      if (openTl) openTl.kill()
      onDragActiveChange && onDragActiveChange(false)
      if (drag) drag.kill()
      dragRef.current = null
      try { InertiaPlugin.untrack(sheet, 'y') } catch (e) {}
      gsap.killTweensOf([container, sheet, backdrop])
      gsap.set(sheet, { clearProps: 'transform,willChange' })
      gsap.set(container, { clearProps: 'opacity,visibility' })
      gsap.set(backdrop, { clearProps: 'opacity' })
      if (handle) gsap.set(handle, { clearProps: 'width' })
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
      className={`carouselContainer focus:outline-none w-full h-[100dvh] z-[100] fixed overscroll-y-none overflow-y-hidden top-0 invisible opacity-0 text-foreground ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      onPointerDownCapture={(e) => { pointerStartRef.current = { x: e.clientX, y: e.clientY } }}
      onClick={(e) => {
        const p = pointerStartRef.current
        const moved = p && Math.hypot(e.clientX - p.x, e.clientY - p.y) > 10
        if (!moved && (e.target === sheetRef.current || e.target === backdropRef.current)) animatedClose()
      }}
    >
      <div ref={backdropRef} aria-hidden className="absolute inset-0 bg-background/80 bg-opacity-95 " />
      {/* Thin hairline framing the top edge of the modal */}
      <div aria-hidden className="absolute top-0 inset-x-0 h-px bg-foreground opacity-20 z-[4] pointer-events-none" />
      <PageWrapper palette={palette} >
        <Layout cardSection className={"carouselContainer relative h-full flex items-center justify-center "}>

          <div style={{}} className={`carouselContainer relative w-[100%] h-full xl:w-[100%] max-w-[1700px] border-0 `}>

            {/* {visibleItem && ( */}
            <div ref={sheetRef} id="carouselContainer" className="relative flex flex-col justify-end overflow-x-hidden w-full h-full  pb-0 pt-10 mobm:pt-14  lg:py-8  ">
              {/* Drag affordance: grows from a round dot into a rounded grabber bar on open */}
              <div ref={handleRef} aria-hidden className="absolute top-2 mobm:top-3 left-1/2 -translate-x-1/2 w-10 mobm:w-12 h-1.5 rounded-full bg-foreground/40 z-[2] pointer-events-none" />
              {/* Subtle photo metadata (number · year · dimensions) */}
              {metaText && (
                <div aria-hidden className="absolute top-2.5 mobm:top-4 left-3 sm:left-4 z-[2] font-mono text-[10px] sm:text-xs tracking-wide text-foreground/50 pointer-events-none">
                  {metaText}
                </div>
              )}
              <ProjectPicture
                setMainPictureWidth={setMainPictureWidth}
                mainPictureHeight={mainPictureHeight}
                images={[project.mainImage.image, ...project.otherImages.map((oImage) => oImage.image)]}
                visibleItem={visibleItem}
                handleVisibility={handleVisibility}
                nextVisibility={nextVisibility}
                prevVisibility={prevVisibility}
                onZoomActiveChange={handleZoomActive}
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
