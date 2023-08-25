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
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
// import { PathGSAPStandalone } from "./pathUtilsGsap"
// import { PathGSAP } from "@/components/line/pathUtilsGsap"
// import useStateRef from "@/utils/useStateRef"
gsap.registerPlugin(ScrollTrigger)

export default function ScrollDown({ className, style, ctx }) {
  let { locale, scrolled , height} = useAppContext()
  let [down, setDown] = useState(false)

  let myCtx = useRef(gsap.context(() => { }))


  // useEffect(() => {
  //   myCtx.current.add(() => {
  //     gsap.to(['.scrollDown'], {
  //       opacity: 1,
  //       // autoAlpha: down ? 0 : 1,
  //       duration: 1,
  //       y:down?'-5vh':0,
  //       yoyo: down ? false : true,
  //       repeat: down ? 0 : -1,
  //       // repeatDelay:0.2,
  //       // repeat: down ? 0 : -1,
  //     }, 5)
  //   })
  //   return () => myCtx.current.revert()
  // }, [down])




  useEffect(() => {
    ctx && ctx.current.add(() => {
      gsap.to(['.scrollDownInner'], {
        id: 'scrollDown',
        opacity: 1,
        // autoAlpha: down ? 0 : 1,
        duration: 1.5,
        yoyo: true,
        // yoyo: down ? false : true,
        repeat: -1,
        // repeat: down ? 0 : -1,
      }, 5)

      // down && gsap.to(['.scrollDownSvg'], {
      //   yPercent: -50,
      //   autoAlpha: 0,
      //   duration: 0.3,
      //   ease: 'expo.out',
      // })

    })
  }, [ctx, down])

  useEffect(() => {
    if (scrolled > 0.005 && !down) {
      // setDown(true)
      //     // gsap.to(gsap.getById('scrollDown'), { progress: 1 })
      //     // gsap.getById('scrollDown').repeat(0)
      //     // myCtx.current.add(() => {
      //     //   gsap.to(['.scrollDown'], {
      //     //     autoAlpha: 0,
      //     //     y: '-5vh',
      //     //     // autoAlpha: down ? 0 : 1,
      //     //     duration: 1,
      //     //     // yoyo: true,
      //     //     // yoyo: down ? false : true,
      //     //     // repeat: -1,
      //     //     // overwrite: true,
      //     //     // repeat: down ? 0 : -1,
      //     //   }, 5)
      //     // })
      //     // gsap.getById('scrollDown').revert()

      ctx.current.add(()=>{
        gsap.to(['.scrollDownSvg'], {
            yPercent: -40,
            autoAlpha: 0,
            duration: 0.5,
            ease: 'expo.out',
          })
      })
    }
  }, [ctx, scrolled])

  return (
    // <div style={style} className={`${className && className}`} onClick={()=>{console.log( gsap.getById('showPage1Tl').scrollTrigger.labelToScroll("myLabel")});}}>
    <div style={style} className={`${className && className}`} onClick={()=>{gsap.to(window, {duration:0.5,scrollTo:0.90  *height})}}>
      {/* <svg className={`scrollDownSvgInner w-full h-full relative top-0 `} width="17" height="109" viewBox="0 0 17 109" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.49951 1.03123C8.51676 0.479219 8.08325 0.0177384 7.53123 0.000487924C6.97922 -0.0167626 6.51774 0.41675 6.50049 0.968765L8.49951 1.03123ZM7.5 109L13.7758 99.3073L2.24381 98.7187L7.5 109ZM6.50049 0.968765C5.99673 17.0891 8.13972 25.9585 10.4281 32.6966C12.7217 39.4498 15 43.7156 15 51H17C17 43.2844 14.5283 38.5502 12.3219 32.0534C10.1103 25.5415 8.00327 16.9109 8.49951 1.03123L6.50049 0.968765ZM15 51C15 58.082 11.5019 62.0839 7.79289 65.7929C4.14908 69.4367 0 72.999 0 79H2C2 74.001 5.35092 71.0633 9.20711 67.2071C12.9981 63.4161 17 58.918 17 51H15ZM0 79C0 82.7846 1.63774 85.7768 3.23334 88.8661C4.84466 91.9858 6.50603 95.3459 6.96342 100.107L8.95426 99.9158C8.45808 94.7509 6.64003 91.1036 5.01032 87.9483C3.3649 84.7625 2 82.212 2 79H0Z" fill="#FFF5EA" />
      </svg> */}
      <span className="text-primary font-lora scrollDownInner opacity-0" >scroll down</span>
      <svg className='scrollDownInner opacity-0' width="12" height="23" viewBox="0 0 12 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="Vector 121" d="M5.50157 1.5C5 6 7.5 6.5 7.5 9C7.5 11.5 4.5 11 4.5 13C4.5 15 6.5 15.5 6 20.5L1 17L6 22L10.5 17L6 20" stroke="#FFF5EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
