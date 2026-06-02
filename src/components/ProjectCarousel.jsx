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
import PictureIndicator from "@/components/PictureIndicator";

gsap.registerPlugin(Observer, ScrollToPlugin, ScrollTrigger)

export default function ProjectCarousel({ project, open, visibleItem, setVisibleItem, nextVisibility, prevVisibility, handleVisibility, closeModal }) {
  // let [animating, setAnimating] = useState(false)
  // const { width, height, locale } = useAppContext()
  // let [visibleItem, setVisibleItem] = useState(initiateVisibility())
  // let [visibleItem, setVisibleItem] = useLocalStorage(`${slug}-visibleItem`, initiateVisibility())
  const containerRef = useRef(null)
  const sheetRef = useRef(null)
  // Keep latest closeModal without re-subscribing the drag listeners every render
  const closeModalRef = useRef(closeModal)
  closeModalRef.current = closeModal
  let [indicatorPosition, setIndicatorPosition] = useState(null)
  let [mainPictureHeight, setMainPictureHeight] = useState(null)
  let [mainPictureWidth, setMainPictureWidth] = useState(null)


  useEffect(() => {
    if (!open) return
    function handleKeyDown(e) {
      if (e.key === "Escape") closeModal()
      else if (e.key === "ArrowLeft") prevVisibility()
      else if (e.key === "ArrowRight") nextVisibility()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, prevVisibility, nextVisibility])

  // Subtle upward slide-in on open; clear any leftover drag transforms on close
  useEffect(() => {
    const sheet = sheetRef.current
    const container = containerRef.current
    if (open) {
      if (sheet) gsap.fromTo(sheet, { y: 24 }, { y: 0, duration: 0.6, ease: 'expo.out' })
    } else {
      if (sheet) gsap.set(sheet, { clearProps: 'transform' })
      if (container) container.style.removeProperty('opacity')
    }
  }, [open])

  // Drag / swipe down to dismiss (pointer events, all viewports).
  // Only vertical-dominant downward gestures are hijacked, so horizontal
  // swipe navigation and the thumbnail strip's horizontal scroll keep working.
  useEffect(() => {
    if (!open) return
    const container = containerRef.current
    const sheet = sheetRef.current
    if (!container || !sheet) return

    const SLOP = 8
    let activeId = null
    let startX = 0, startY = 0
    let locked = false      // engaged a vertical-down drag
    let bailed = false      // decided this gesture is not ours
    let lastY = 0, prevY = 0, lastTime = 0, prevTime = 0

    const closeDistance = () => window.innerHeight * 0.25

    function onDown(e) {
      if (activeId !== null) return
      activeId = e.pointerId
      startX = e.clientX
      startY = e.clientY
      locked = false
      bailed = false
      prevY = lastY = e.clientY
      prevTime = lastTime = e.timeStamp
    }

    function onMove(e) {
      if (e.pointerId !== activeId || bailed) return
      const dx = e.clientX - startX
      const dy = e.clientY - startY

      if (!locked) {
        if (Math.abs(dx) < SLOP && Math.abs(dy) < SLOP) return
        // Horizontal-dominant or upward → leave it to the Observer / native scroll
        if (Math.abs(dx) > Math.abs(dy) || dy <= 0) {
          bailed = true
          return
        }
        locked = true
        gsap.killTweensOf(sheet)
        try { container.setPointerCapture(activeId) } catch {}
      }

      // engaged: follow the finger downward
      const drag = Math.max(0, dy)
      prevY = lastY; prevTime = lastTime
      lastY = e.clientY; lastTime = e.timeStamp
      gsap.set(sheet, { y: drag })
      container.style.opacity = String(1 - Math.min(drag / closeDistance() * 0.85, 0.85))
      e.preventDefault()
    }

    function settle() {
      const dy = Math.max(0, lastY - startY)
      const dt = lastTime - prevTime
      const velocity = dt > 0 ? (lastY - prevY) / dt : 0 // px/ms, +ve = downward
      const dismiss = dy > closeDistance() || velocity > 0.5
      if (dismiss) {
        gsap.timeline({ onComplete: () => closeModalRef.current() })
          .to(sheet, { y: window.innerHeight, duration: 0.35, ease: 'power2.in' }, 0)
          .to(container, { opacity: 0, duration: 0.35, ease: 'power2.in' }, 0)
      } else {
        gsap.to(sheet, { y: 0, duration: 0.5, ease: 'power3.out' })
        gsap.to(container, { opacity: 1, duration: 0.4, ease: 'power3.out', onComplete: () => container.style.removeProperty('opacity') })
      }
    }

    // Swallow the click synthesized after a drag so it can't hit the
    // click-outside-to-close handler or a prev/next click zone.
    function suppressNextClick() {
      const swallow = (ev) => { ev.stopPropagation(); ev.preventDefault() }
      container.addEventListener('click', swallow, { capture: true, once: true })
      setTimeout(() => container.removeEventListener('click', swallow, { capture: true }), 350)
    }

    function onUp(e) {
      if (e.pointerId !== activeId) return
      try { container.releasePointerCapture(activeId) } catch {}
      if (locked) { settle(); suppressNextClick() }
      activeId = null
      locked = false
      bailed = false
    }

    container.addEventListener('pointerdown', onDown)
    container.addEventListener('pointermove', onMove, { passive: false })
    container.addEventListener('pointerup', onUp)
    container.addEventListener('pointercancel', onUp)
    return () => {
      container.removeEventListener('pointerdown', onDown)
      container.removeEventListener('pointermove', onMove)
      container.removeEventListener('pointerup', onUp)
      container.removeEventListener('pointercancel', onUp)
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
      // style={{ backgroundColor: palette.dominant.background }}
      className={`carouselContainer focus:outline-none w-full h-[100dvh] bg-opacity-80 bg-background z-[100] fixed overscroll-y-none overflow-y-hidden top-0 transition-[opacity,visibility] duration-500 ${open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'} text-foreground`}
      onClick={(e) => { if (e.target === document.getElementById("carouselContainer")) { closeModal() } }}
      // onClick={(e) => console.log(e.target, Array.from(document.querySelectorAll(".carouselContainer")))}
>
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

            <button title={`Close carousel`} onClick={closeModal} className={'flex justify-center items-center w-[50px] h-[50px] fixed top-0 right-0 '}>
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
