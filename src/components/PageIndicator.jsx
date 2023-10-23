import React, { useState, useEffect, useRef } from "react"
// import { useDimensions } from "@/utils/useDimensions"
import { useAppContext } from "@utils/appContext.js"
// import { Path, TextAnimate } from '@/components/line/pathUtils'
// import { SVGWrapper } from "./contextSVG"
// import { usePageContext } from "@utils/pageContext"
// import { PageWrapper } from "@context/pageContext"
// import AnimateSVG from "./AnimateSVG"
// import AnimateSVGBanner from "./AnimateSVGBanner"
import { gsap } from "gsap/dist/gsap"

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


export default function PageIndicator({ className, style }) {
  // let { locale, scrolled, mobileHeight: height, mobile } = useAppContext()
  // let [down, setDown] = useState(false)
  let myCtx = useRef(gsap.context(() => { }))

  useEffect(() => {
    myCtx.current.add(() => {
      gsap.to('.screenIndicatorItem', {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'expo.out',
        delay: 0.5,
      })
    })
    return () => myCtx.current.revert()
  }, [])

  // useEffect(() => {
  //   // screenAnimation
  //   function scrubScreen1() {
  //     let tl = gsap.timeline()
  //       .to('#movingScreensInner', {
  //         yPercent: -3,
  //         duration: 1,
  //         ease: 'expo.inout',
  //         // overwrite: false,
  //       }, 0)
  //     return tl
  //   }
  //   //screenAnimation
  //   function moveScreen1() {
  //     let tl = gsap.timeline()
  //       .to('#movingScreens', {
  //         yPercent: -17.2 + 3 * 1 + 3 * 1,
  //         duration: 0.3,
  //         overwrite: false,
  //         // ease:'elastic.out(1, 0.5)'
  //       }, 0)

  //     return tl
  //   }
  //   //screenAnimation
  //   function scrubScreen2() {
  //     let tl = gsap.timeline()
  //       .to('#movingScreensInner', {
  //         yPercent: -3 * 2 - 3,
  //         duration: 6.3,
  //         ease: 'expo.inout',
  //         // overwrite: false,
  //       }, 0)
  //     return tl
  //   }
  //   //screenAnimation
  //   function moveScreen2() {
  //     let tl = gsap.timeline()
  //       .to('#movingScreens', {
  //         yPercent: -17.2 - 17.2 + 3 * 2 + 3 * 2,
  //         duration: 0.3,
  //         overwrite: false,
  //         // ease:'elastic.out(1, 0.5)'
  //       }, 0)
  //     return tl
  //   }
  //   //screenAnimation
  //   function scrubScreen3() {
  //     let tl = gsap.timeline()
  //       .to('#movingScreensInner', {
  //         yPercent: -3 * 3 - 3 * 2,
  //         duration: 2,
  //         ease: 'expo.inout',
  //         // overwrite: false,
  //       }, 0)
  //     return tl
  //   }
  //   //screenAnimation
  //   function moveScreen3() {
  //     let tl = gsap.timeline()
  //       .to('#movingScreens', {
  //         yPercent: -17.2 * 3 + 3 * 3 + 3 * 3,
  //         duration: 0.3,
  //         overwrite: false,
  //         // ease:'elastic.out(1, 0.5)'
  //       }, 0)
  //     return tl
  //   }
  //   //screenAnimation
  //   function scrubScreen4() {
  //     let tl = gsap.timeline()
  //       .to('#movingScreensInner', {
  //         yPercent: -3 * 4 - 3 * 3,
  //         duration: 100,
  //         ease: 'expo.inout',
  //         // overwrite: false,
  //       }, 0)
  //     return tl
  //   }
  //   //screenAnimation
  //   function moveScreen4() {
  //     let tl = gsap.timeline()
  //       .to('#movingScreens', {
  //         yPercent: -17.2 * 4 + 3 * 4 + 3 * 4,
  //         duration: 0.3,
  //         overwrite: false,
  //         // ease:'elastic.out(1, 0.5)'
  //       }, 0)
  //     return tl
  //   }
  //   //screenAnimation
  //   function scrubScreen5() {
  //     let tl = gsap.timeline()
  //       .to('#movingScreensInner', {
  //         yPercent: -3 * 5 - 3 * 4,
  //         duration: 1.6,
  //         ease: 'expo.inout',
  //         // overwrite: false,
  //       }, 0)
  //     return tl
  //   }
  //   //screenAnimation
  //   function moveScreen5() {
  //     let tl = gsap.timeline()
  //       .to('#movingScreens', {
  //         yPercent: -17.2 * 5 + 3 * 5 + 3 * 4,
  //         duration: 0.3,
  //         overwrite: false,
  //         // ease:'elastic.out(1, 0.5)'
  //       }, 0)
  //     return tl
  //   }
  //   //screenAnimation
  //   function scrubScreen6() {
  //     let tl = gsap.timeline()
  //       .to('#movingScreensInner', {
  //         yPercent: -3 * 6 - 3 * 4,
  //         duration: mobile ? 145 : 159,
  //         ease: 'expo.inout',
  //         // overwrite: false,
  //       }, 0)
  //     return tl
  //   }

  //   let transition1 = moveScreen1().progress(0)
  //   // setTransitionTl1(transition1);
  //   ScrollTrigger.create({
  //     start: `bottom bottom-=${0.81 * height}`,
  //     end: `bottom bottom-=${0.81 * height}`,
  //     invalidateOnRefresh: false,
  //     toggleActions: 'play none reverse none',
  //     preventOverlaps: true,
  //     markers: false,
  //     onEnter: () =>
  //       gsap.to(transition1, {
  //         overwrite: true,
  //         progress: 1,
  //         duration: 5,
  //         ease: "power1.out",
  //       }),
  //     onLeaveBack: () =>
  //       gsap.to(transition1, {
  //         overwrite: true,
  //         progress: 0,
  //         duration: 1,
  //         ease: "ease.out",
  //       }),
  //   })


  //   let transition2 = moveScreen2().progress(0)
  //   // setTransitionTl2(transition2)
  //   ScrollTrigger.create({
  //     start: () => `bottom+=${1 * height} bottom-=${0.81 * height}`,
  //     // end: (self)=>self.start,
  //     end: () => `bottom+=${1 * height} bottom-=${0.81 * height}`,
  //     invalidateOnRefresh: false,
  //     toggleActions: 'play none reverse none',
  //     preventOverlaps: true,
  //     markers: false,
  //     onEnter: () =>
  //       gsap.to(transition2, {
  //         // id: 'transition2In',
  //         overwrite: true,
  //         progress: 1,
  //         duration: 5,
  //         ease: "power1.out",
  //       }),
  //     onLeaveBack: () =>
  //       gsap.to(transition2, {
  //         // id: 'transition2Out',
  //         overwrite: true,
  //         progress: 0,
  //         duration: 1,
  //         ease: "ease.out",
  //       })
  //   })

  //   let transition3 = moveScreen3().progress(0)
  //   // setTransitionTl3(transition3)
  //   ScrollTrigger.create({
  //     start: `bottom+=${2 * height} bottom-=${0.81 * height}`,
  //     end: `bottom+=${2 * height} bottom-=${0.81 * height}`,
  //     invalidateOnRefresh: false,
  //     toggleActions: 'play none reverse none',
  //     preventOverlaps: true,
  //     markers: false,
  //     onEnter: () => {
  //       gsap.to(transition3, {
  //         // id: 'transition3In',
  //         overwrite: true,
  //         progress: 1,
  //         duration: mobile ? 6 : 4,
  //         ease: "power1.out",
  //       });

  //       // gsap.getById('transition1In')?.progress(1)
  //       // console.log(gsap.getById('transition1In')?.progress())
  //     },
  //     onLeaveBack: () =>
  //       gsap.to(transition3, {
  //         // id: 'transition3Out',
  //         overwrite: true,
  //         progress: 0,
  //         duration: 1,
  //         ease: "ease.out",
  //       })
  //   })

  //   let transition4 = moveScreen4().progress(0)
  //   // setTransitionTl4(transition4)
  //   ScrollTrigger.create({
  //     start: `bottom+=${3 * height} bottom-=${0.81 * height}`,
  //     end: `bottom+=${3 * height} bottom-=${0.81 * height}`,
  //     invalidateOnRefresh: false,
  //     toggleActions: 'play none reverse none',
  //     preventOverlaps: true,
  //     markers: false,
  //     onEnter: () => {
  //       gsap.to(transition4, {
  //         // id: 'transition4In',
  //         overwrite: true,
  //         progress: 1,
  //         duration: 4,
  //         ease: "power1.out",
  //       });
  //     },
  //     onLeaveBack: () =>
  //       gsap.to(transition4, {
  //         // id: 'transition4Out',
  //         overwrite: true,
  //         progress: 0,
  //         duration: 1,
  //         ease: "ease.out"
  //       })
  //   })

  //   let transition5 = moveScreen5().progress(0)
  //   ScrollTrigger.create({
  //     start: () => `bottom+=${4 * height} bottom-=${0.81 * height}`,
  //     end: () => `bottom+=${4 * height} bottom-=${0.81 * height}`,
  //     invalidateOnRefresh: false,
  //     toggleActions: 'play none reverse none',
  //     preventOverlaps: true,
  //     markers: false,
  //     // id: 'page5',
  //     onEnter: () =>
  //       gsap.to(transition5, {
  //         // id: 'transition5In',
  //         overwrite: true,
  //         progress: 1,
  //         duration: 4,
  //         ease: "power1.out",
  //       }),
  //     onLeaveBack: () =>
  //       gsap.to(transition5, {
  //         // id: 'transition5Out',
  //         overwrite: true,
  //         progress: 0,
  //         duration: 1,
  //         ease: "ease.out"
  //       }),
  //   })

  //   let animation0 = scrubScreen1().paused(true).progress(0);
  //   gsap.to(animation0,
  //     // {progress:0}, 
  //     {
  //       progress: 1,
  //       // ease:'ease.out',
  //       ease: 'none',
  //       scrollTrigger: {
  //         // id: 'starScrub',
  //         start: () => 'bottom bottom',
  //         end: () => `+=${0.79 * height}px`,
  //         scrub: 1,
  //         markers: false,
  //         invalidateOnRefresh: false,
  //         overwrite: true,
  //         // preventOverlaps: true,
  //       },
  //     });

  //   let animation1 = scrubScreen2().paused(true).progress(0);
  //   gsap.to(animation1,
  //     {
  //       progress: 1,
  //       ease: 'none',
  //       // id: 'moonScrubTlId',
  //       scrollTrigger: {
  //         // id: 'moonScrub',
  //         start: () => `bottom+=${0.90 * height} bottom`,
  //         end: () => `+=${0.85 * height}px`,
  //         scrub: 1,
  //         markers: false,
  //         invalidateOnRefresh: false,
  //         overwrite: true,
  //         // preventOverlaps: true,
  //       }
  //     });

  //   let animation2 = scrubScreen3().paused(true).progress(0);
  //   gsap.to(animation2,
  //     {
  //       progress: 1,
  //       ease: 'none',
  //       scrollTrigger: {
  //         // id: 'animalScrub',
  //         start: () => `bottom+=${1.90 * height} bottom`,
  //         end: () => `+=${0.85 * height}px`,
  //         scrub: 1,
  //         markers: false,
  //         invalidateOnRefresh: false,
  //         overwrite: true,
  //         // preventOverlaps: true,
  //       }
  //     });

  //   let animation3 = scrubScreen4().paused(true).progress(0);
  //   gsap.to(animation3,
  //     {
  //       progress: 1,
  //       ease: 'none',
  //       scrollTrigger: {
  //         // id: 'kakScrub',
  //         start: () => `bottom+=${2.90 * height} bottom`,
  //         end: () => `+=${0.85 * height}px`,
  //         scrub: 1,
  //         markers: false,
  //         invalidateOnRefresh: false,
  //         overwrite: true,
  //         // preventOverlaps: true,
  //       }
  //     });

  //   let animation4 = scrubScreen5().paused(true).progress(0);
  //   gsap.to(animation4,
  //     {
  //       progress: 1,
  //       ease: 'none',
  //       scrollTrigger: {
  //         // id: 'studioScrub',
  //         start: () => `bottom+=${3.90 * height} bottom`,
  //         end: () => `+=${0.85 * height}px`,
  //         scrub: 1,
  //         markers: false,
  //         invalidateOnRefresh: false,
  //         overwrite: true,
  //         // preventOverlaps: true,
  //       }
  //     });

  //   let animation5 = scrubScreen6().paused(true).progress(0);
  //   gsap.to(animation5,
  //     {
  //       progress: 1,
  //       ease: 'none',
  //       scrollTrigger: {
  //         // id: 'finalScrub',
  //         start: () => `bottom+=${4.90 * height} bottom`,
  //         // end: () => `+=${0.85 * height}px`,
  //         end: () => `+=${1.1 * height}px`,
  //         // end: () => `+=${1 * height}px`,
  //         scrub: 1,
  //         markers: false,
  //         invalidateOnRefresh: false,
  //         overwrite: true,
  //         // preventOverlaps: true,
  //       }
  //     });
  //   return () => myCtx.current.revert()
  // }, [height])

  return (
    <div style={style} className={`${className && className}`}>

      <svg className='screenIndicatorInner w-14 md:w-14' width="71" height="280" viewBox="0 0 71 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className='screenIndicatorItem translate-x-[200%] opacity-0' id="upLine" d="M55 132H15" stroke="#FFF5EA" strokeWidth="1.12632" strokeLinecap="round" strokeLinejoin="round" />
        <path className='screenIndicatorItem translate-x-[200%] opacity-0' id="downLine" d="M55 157H15" stroke="#FFF5EA" strokeWidth="1.12632" strokeLinecap="round" strokeLinejoin="round" />

        <g mask="url(#mask0_1061_1697)">
          <g id="movingScreens">
            <g id="movingScreensInner">
              <Path i={1 - 1} id="screen_1" d="M18.5723 137.176C18.7816 135.572 20.1351 134.367 21.7516 134.306C31.8878 133.923 38.5364 133.878 48.4207 134.294C50.0034 134.361 51.3349 135.528 51.5466 137.098C52.3208 142.841 52.1055 147.009 51.4889 152.131C51.2946 153.746 49.9529 154.977 48.3288 155.054C38.5968 155.515 31.9658 155.518 21.6807 155.045C20.0962 154.972 18.7686 153.8 18.5504 152.229C17.799 146.82 17.8272 142.886 18.5723 137.176Z" stroke="#FFF5EA" strokeWidth="1.68947" />
              <Path i={2 - 1} id="screen_2" d="M18.5723 163.081C18.7816 161.477 20.1351 160.272 21.7516 160.211C31.8878 159.828 38.5364 159.783 48.4207 160.2C50.0034 160.266 51.3349 161.433 51.5466 163.003C52.3208 168.747 52.1055 172.915 51.4889 178.037C51.2946 179.651 49.9529 180.883 48.3288 180.96C38.5968 181.421 31.9658 181.423 21.6807 180.95C20.0962 180.878 18.7686 179.705 18.5504 178.134C17.799 172.725 17.8272 168.791 18.5723 163.081Z" stroke="#FFF5EA" strokeWidth="1.68947" />
              <Path i={3 - 1} id="screen_3" d="M18.5723 188.986C18.7816 187.382 20.1351 186.178 21.7516 186.117C31.8878 185.733 38.5364 185.689 48.4207 186.105C50.0034 186.172 51.3349 187.338 51.5466 188.908C52.3208 194.652 52.1055 198.82 51.4889 203.942C51.2946 205.556 49.9529 206.788 48.3288 206.865C38.5968 207.326 31.9658 207.329 21.6807 206.856C20.0962 206.783 18.7686 205.61 18.5504 204.039C17.799 198.63 17.8272 194.696 18.5723 188.986Z" stroke="#FFF5EA" strokeWidth="1.68947" />
              <Path i={4 - 1} id="screen_4" d="M18.5723 214.892C18.7816 213.287 20.1351 212.083 21.7516 212.022C31.8878 211.638 38.5364 211.594 48.4207 212.01C50.0034 212.077 51.3349 213.244 51.5466 214.813C52.3208 220.557 52.1055 224.725 51.4889 229.847C51.2946 231.462 49.9529 232.693 48.3288 232.77C38.5968 233.231 31.9658 233.234 21.6807 232.761C20.0962 232.688 18.7686 231.516 18.5504 229.945C17.799 224.535 17.8272 220.602 18.5723 214.892Z" stroke="#FFF5EA" strokeWidth="1.68947" />
              <Path i={5 - 1} id="screen_5" d="M18.5723 240.797C18.7816 239.193 20.1351 237.988 21.7516 237.927C31.8878 237.544 38.5364 237.499 48.4207 237.915C50.0034 237.982 51.3349 239.149 51.5466 240.719C52.3208 246.462 52.1055 250.63 51.4889 255.753C51.2946 257.367 49.9529 258.599 48.3288 258.675C38.5968 259.137 31.9658 259.139 21.6807 258.666C20.0962 258.593 18.7686 257.421 18.5504 255.85C17.799 250.441 17.8272 246.507 18.5723 240.797Z" stroke="#FFF5EA" strokeWidth="1.68947" />
              <Path i={6 - 1} id="screen_6" d="M18.5723 266.702C18.7816 265.098 20.1351 263.894 21.7516 263.832C31.8878 263.449 38.5364 263.405 48.4207 263.821C50.0034 263.887 51.3349 265.054 51.5466 266.624C52.3208 272.368 52.1055 276.536 51.4889 281.658C51.2946 283.272 49.9529 284.504 48.3288 284.581C38.5968 285.042 31.9658 285.044 21.6807 284.571C20.0962 284.499 18.7686 283.326 18.5504 281.755C17.799 276.346 17.8272 272.412 18.5723 266.702Z" stroke="#FFF5EA" strokeWidth="1.68947" />
            </g>
          </g>
        </g>

        <mask id="mask0_1061_1697" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="71" height="280">
          <rect id="Mask" width="71" height="280" fill="url(#paint0_linear_1061_1697)" />
        </mask>

        <defs>
          <linearGradient id="paint0_linear_1061_1697" x1="35.5" y1="0" x2="35.5" y2="280" gradientUnits="userSpaceOnUse">
            {/* <stop offset="0" stopColor="#D9D9D9" stopOpacity="0" /> */}
            <stop offset="0.247917" stopColor="#D9D9D9" stopOpacity="0" />
            <stop offset="0.444395" stopColor="#D9D9D9" stopOpacity="0.25" />
            <stop offset="0.46934" stopColor="#D9D9D9" stopOpacity="1" />
            <stop offset="0.560823" stopColor="#D9D9D9" stopOpacity="1" />
            <stop offset="0.586353" stopColor="#D9D9D9" stopOpacity="0.25" />
            <stop offset="0.758333" stopColor="#D9D9D9" stopOpacity="0" />
            {/* <stop offset="1" stopColor="#D9D9D9" stopOpacity="0" /> */}
          </linearGradient>
        </defs>
      </svg>


    </div>
  )
}

function Path({ i, ...props }) {
  let [hovering, setHovering] = useState(false)
  let [selected, setSelected] = useState(false)
  let myCtx = useRef(gsap.context(() => { }))
  let { height } = useAppContext();

  useEffect(() => {
    return () => myCtx.current.revert()
  }, [])

  useEffect(() => {
    myCtx.current.add(() => {
      gsap.to(`.screen${i}`, {
        scale: selected ? 0.9 : hovering ? 1.1 : 1,
        transformOrigin: 'center',
        duration: 0.15,
      })
    })
  }, [hovering, selected])

  return <path className={`screen${i} hover:cursor-pointer screenIndicatorItem translate-x-[200%] opacity-0`} onMouseDown={() => setSelected(true)} onMouseUp={() => { setSelected(false) }} onClick={() => { gsap.to(window, { duration: 0.5, scrollTo: height * i - 0.1 * height }) }} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} fill='transparent' {...props} />
}