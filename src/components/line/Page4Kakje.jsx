import React, { useState, useEffect, useRef } from "react"
// import { useDimensions } from "@/utils/useDimensions"
import { useAppContext } from "@utils/appContext.js"
import { Path, TextAnimate } from '@/components/line/pathUtils'
// import { SVGWrapper } from "./contextSVG"
import { usePageContext } from "@utils/pageContext"
// import { PageWrapper } from "@context/pageContext"
import AnimateSVG from "./AnimateSVG"
// import AnimateSVGBanner from "./AnimateSVGBanner"
import { gsap } from "gsap/dist/gsap"
import { PathGSAP, PathGSAPStandalone } from "./pathUtilsGsap"
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
// import useStateRef from "@/utils/useStateRef"
// gsap.registerPlugin(ScrollTrigger)

let kakjes = [
  "M22.9437 24.5001C20.9437 21.5001 22.9454 22.5001 22.9437 19.0001C22.9421 15.8134 28.7198 11.7035 31.5 14.5C32.4971 15.5029 32.4435 16.5001 30.9435 19.0001C29.4435 21.5001 32.4435 23.0001 30.9435 24.5001C29.4435 26.0001 28.9437 27.0001 26.9435 27.5001C24.9432 28.0001 24.0001 26.0848 22.9437 24.5001Z",
  "M17.7605 58.9673C19.7555 49.0966 22.9473 47.1226 26.9372 48.3071C27.3363 49.4917 34.9171 49.4915 28.1342 53.8345C21.3514 58.1776 27.7352 57.7829 24.5433 64.1001C21.3514 70.4173 26.9372 68.8381 22.9473 74.3658C18.9573 79.8934 17.7604 75.5502 14.9675 71.9967C12.1745 68.4432 15.7655 68.8381 17.7605 58.9673Z",
  "M19.5002 62.0001C20.9998 58.0001 17.8152 57.3585 20.8091 52.1656C22.0061 49.3585 24.6249 47.4909 30.5 53.0001C32.8091 55.1654 25.8776 57.0594 26.5999 64.1002C26.9999 68 24.5001 68.9184 24.5001 73C24.5001 78.5 20.3171 77.5502 17.5242 73.9968C14.7313 70.4433 17.8885 66.2989 19.5002 62.0001Z",
];

export default function Page4Kakje({ scrollMin, scrollMax, scrubTl, transitionTl }) {

  let { locale, scrolled, width, height } = useAppContext()
  // 
  // let { mobile } = usePageContext()
  // const ctx = useRef(gsap.context(() => { }));
  // let tl = useRef()
  // let [started, setStarted] = useState(false)

  let colorPrimary = "#FFF5EA";

  useEffect(() => {
    transitionTl && transitionTl
      .set(['#splashL1', '#splashL2', '#splashR1', '#splashR2'], {
        scale: 0,
        opacity: 0,
        transformOrigin: '50% 50%',
      }, 0)
      .to('.svgKakScrub', {
        y: -50,
        autoAlpha: 0,
        duration: 0.5,
      }, 0)
      .to('#kakje0', {
        attr: { d: "M96 256C98.6115 250.197 94.5 253.5 92.5 246.5C89.29 235.265 80.2413 246.5 74 246.5C65.1024 246.5 60.1861 245.411 51.9999 242C47.2064 240.003 46.9568 265.634 59 256C63.5362 252.371 72.0479 263.291 78 258C82.5 254 91.5 266 96 256Z" },
        duration: 1,
        ease: 'ease.in',
      }, 1)
      .to(['#splashL1', '#splashL2', '#splashR1', '#splashR2'], {
        opacity: 1,
        scale: 1,
        duration: 0.1,
      }, 2)
      .to(['#splashL2'], {
        motionPath: {
          path: '#alongPathL2',
          align: '#alongPathL2',
          immediateRender: true,
          alignOrigin: [0.5, 0.5],
          autoRotate: 90,
        },
        // y: -40,
        // x:-40,
        duration: 0.75,
        transformOrigin: '50% 50%',
      }, 2)
      .to(['#splashL1'], {
        motionPath: {
          path: '#alongPathL1',
          align: '#alongPathL1',
          immediateRender: true,
          alignOrigin: [0.5, 0.5],
          autoRotate: 90,
        },
        // y: -30,
        // x: -10,
        // opacity:0,
        ease: 'power.out',
        duration: 0.75,
        transformOrigin: '50% 50%',
      }, 2)
      .to(['#splashR1'], {
        motionPath: {
          path: '#alongPathR1',
          align: '#alongPathR1',
          immediateRender: true,
          alignOrigin: [0.5, 0.5],
          autoRotate: 90,
        },
        // y: -40,
        // x: 15,
        ease: 'power.out',
        duration: 0.75,
        transformOrigin: '50% 50%',
      }, 2)
      .to(['#splashR2'], {
        motionPath: {
          path: '#alongPathR2',
          align: '#alongPathR2',
          immediateRender: true,
          alignOrigin: [0.5, 0.5],
          autoRotate: 90,
        },
        // y: -45,
        // x: 40,
        scale: 1.2,
        ease: 'power.out',
        duration: 0.75,
        transformOrigin: '50% 50%',
      }, 2)
      .to(['#splashL1', '#splashL2', '#splashR1', '#splashR2'], {
        opacity: 0,
        scale: 0,
        duration: 0.1,
      }, 2.65)
      .to('#kakje0', {
      opacity:0,
      duration:0.5,
      },3)
  }, [transitionTl])

  // useEffect(() => {
  //   scrubTl && scrubTl
  //   // .set('#anus', {
  //   //   scale: 0,
  //   //   opacity: 0,
  //   //   transformOrigin: '50% 50%',
  //   // }, 0)
  //   // .to('#anus', {
  //   //   scale: 1,
  //   //   opacity: 1,
  //   //   duration: 15,
  //   // }, 0)
  //   // .to('#kak1', {
  //   //   opacity: 1,
  //   //   duration: 20,
  //   // }, 10)
  //   // .to('#kak1', {
  //   //   attr: { d: kakjes[0] },
  //   //   duration: 20,
  //   //   ease: 'none',
  //   // }, 30)
  //   // .to('#kak1', {
  //   //   attr: { d: kakjes[1] },
  //   //   duration: 20,
  //   //   ease: 'none',
  //   // }, 50)
  //   // .to()
  //   // .to('#kak1', {
  //   //   y: 150,
  //   //   x: -15,
  //   //   attr: { d: kakjes[1] },
  //   //   duration: 40,
  //   //   ease: 'none',
  //   // }, 50)

  // }, [scrubTl])


  let tweenAppear = {
    timeline: transitionTl,
    ratio: 0.99,
    attr: { duration: 0.6, ease: 'none', y: 100 },
    position: 1.1
  }

  let bounceAppear = {
    timeline: transitionTl,
    ratio: 0.995,
    attr: { duration: 0.6, ease: 'none', },
    position: 2,
  }

  let bounceDisappear = {
    timeline: transitionTl,
    ratio: 0.995,
    attr: { duration: 0.1, stroke: 'transparent', },
    position: 2.5,
  }

  return (<>

    <svg className='fixed left-[75%] bottom-[calc(65%)] -translate-x-1/2 w-[11%] svgKakje' viewBox="0 0 146 259" fill="none" >
      <path className={``} id="kakje0" d="M95.7814 26.4313C95.9756 36.4997 93.2881 39.1192 89.1363 38.8287C88.4897 37.7589 81.0895 39.4039 86.7684 33.6926C92.4474 27.9814 86.3013 29.7517 88.0464 22.8925C89.7916 16.0332 84.6815 18.7867 87.3771 12.5251C90.0726 6.26342 92.1833 10.2435 95.6808 13.1063C99.1782 15.9691 95.5871 16.3628 95.7814 26.4313Z" fill={`${colorPrimary}`} stroke={`${colorPrimary}`} strokeLinecap="round" />
      {/* <path className={`opacity-0`} id="kakje1" d="M81.7814 138.431C81.9756 148.5 79.2881 151.119 75.1363 150.829C74.4897 149.759 67.0895 151.404 72.7684 145.693C78.4474 139.981 72.3013 141.752 74.0464 134.892C75.7916 128.033 70.6815 130.787 73.3771 124.525C76.0726 118.263 78.1833 122.243 81.6808 125.106C85.1782 127.969 81.5871 128.363 81.7814 138.431Z" fill={`${colorPrimary}`} stroke={`${colorPrimary}`} strokeLinecap="round" /> */}

      <PathGSAPStandalone id="speedje3" tweens={[{ id: `speedje1Appear`, ...tweenAppear }]} inverse transitStrokeAnimation transitPortion={0.94} d="M88.11 114.5C87.11 92 93.11 50.5 98.61 40" stroke={`${colorPrimary}`} strokeLinecap="round" />
      <PathGSAPStandalone id="speedje2" tweens={[{ id: `speedje2Appear`, ...tweenAppear }]} inverse transitStrokeAnimation transitPortion={0.94} d="M78.5002 128.5C77.5002 106 83.5002 64.5 89.0002 54" stroke={`${colorPrimary}`} strokeLinecap="round" />
      <PathGSAPStandalone id="speedje1" tweens={[{ id: `speedje3Appear`, ...tweenAppear }]} inverse transitStrokeAnimation transitPortion={0.94} d="M73.11 101.5C72.11 79 78.11 37.5 83.61 27" stroke={`${colorPrimary}`} strokeLinecap="round" />

      {/* <path className={`opacity-0`} id="kakje2" d="M73.2513 249.738C67.8597 254.514 64.4229 253.974 61.4984 251.135C61.6063 250.22 55.2045 246.16 62.5634 247.221C69.9223 248.283 64.3832 245.097 69.451 243.066C74.5189 241.035 69.2088 238.979 74.6541 237.843C80.0993 236.707 79.479 239.919 80.503 243.519C81.5271 247.119 78.6429 244.962 73.2513 249.738Z" fill={`${colorPrimary}`} stroke={`${colorPrimary}`} strokeLinecap="round" /> */}
      {/* <path className={`opacity-0`} id="kakje3" d="M96 256C98.6115 250.197 94.5 253.5 92.5 246.5C89.29 235.265 80.2413 246.5 74 246.5C65.1024 246.5 60.1861 245.411 51.9999 242C47.2064 240.003 46.9568 265.634 59 256C63.5362 252.371 72.0479 263.291 78 258C82.5 254 91.5 266 96 256Z" fill={`${colorPrimary}`} stroke={`${colorPrimary}`} strokeLinecap="round" /> */}
      <path className={`opacity-0`} id="splashL2" d="M53.5319 251.838C50.9638 249.681 50.3062 249.421 49.1144 246.667C47.9217 244.459 50.7372 241.606 54.4835 242.709C58.2297 243.811 57.0656 248.674 58.2573 251.427C59.4491 254.18 62.401 253.447 60.6408 256.933C58.8807 260.419 57.8877 258.125 53.5319 251.838Z" fill={`${colorPrimary}`} stroke={`${colorPrimary}`} strokeLinecap="round" />
      <path className={`opacity-0`} id="splashL1" d="M63.907 251.243C65.1071 254.643 63.4071 255.243 60.3072 256.043C58.7072 254.843 61.107 249.143 60.3069 246.043C59.5068 242.943 62.707 247.843 63.907 251.243Z" fill={`${colorPrimary}`} stroke={`${colorPrimary}`} strokeLinecap="round" />
      <path className={`opacity-0`} id="splashR1" d="M81.4234 250.362C78.8742 251.943 79.665 253.218 80.9242 257.144C82.7653 256.002 86.5355 252.721 86.8877 248.736C87.3279 243.756 88.2213 246.144 85.7899 244.122C83.3585 242.1 83.9726 248.78 81.4234 250.362Z" fill={`${colorPrimary}`} stroke={`${colorPrimary}`} strokeLinecap="round" />
      <path className={`opacity-0`} id="splashR2" d="M86.2572 251.018C86.0007 254.915 81.0878 256.452 77.8979 256.178C77.5004 254.419 78.8788 252.971 81.6357 250.073L81.636 250.072C84.393 247.174 82.5818 245.451 84.9942 242.915C86.9242 240.887 88.8791 242.701 89.6153 243.861C88.5814 244.948 86.4624 247.901 86.2572 251.018Z" fill={`${colorPrimary}`} stroke={`${colorPrimary}`} strokeLinecap="round" />

      {/* <path className={`opacity-0`} id="splashL2" d="M10.2848 210.833C7.28479 212.333 6.78479 212.833 3.78479 212.833C1.28479 213.051 -0.215212 209.333 2.28479 206.333C4.78479 203.333 8.78479 206.333 11.7848 206.333C14.7848 206.333 15.2848 203.333 17.7848 206.333C20.2848 209.334 17.7848 209.333 10.2848 210.833Z" fill={`${colorPrimary}`} stroke={`${colorPrimary}`} strokeLinecap="round" /> */}
      {/* <path className={`opacity-0`} id="splashL1" d="M50.2847 211.833C53.2847 213.833 52.2847 215.333 50.2847 217.833C48.2847 217.833 46.7847 211.833 44.2847 209.833C41.7847 207.833 47.2847 209.833 50.2847 211.833Z" fill={`${colorPrimary}`} stroke={`${colorPrimary}`} strokeLinecap="round" /> */}
      {/* <path className={`opacity-0`} id="splashR1" d="M111.785 208.333C108.785 208.333 108.785 209.833 107.785 213.833C109.951 213.833 114.885 213.033 117.285 209.833C120.285 205.833 119.785 208.333 118.785 205.333C117.785 202.333 114.785 208.333 111.785 208.333Z" fill={`${colorPrimary}`} stroke={`${colorPrimary}`} strokeLinecap="round" /> */}
      {/* <path className={`opacity-0`} id="splashR2" d="M137.5 221.5C134.5 224 130 221.5 128 219C129 217.5 131 217.5 135 217.5H135C139 217.5 139 215 142.5 215C145.3 215 145.333 217.667 145 219C143.5 219 139.9 219.5 137.5 221.5Z" fill={`${colorPrimary}`} stroke={`${colorPrimary}`} strokeLinecap="round" /> */}
      <PathGSAPStandalone id="bounceL2" tweens={[{ id: `bounceL2Appear`, ...bounceAppear }, { id: `bounceL2Disppear`, ...bounceDisappear }]} transitStrokeAnimation transitPortion={0.95} strokeWidth='1' d="M47.5 230.5C37.1 215.3 28.5 212.5 25.5 213" stroke={`${colorPrimary}`} strokeLinecap="round" />
      <PathGSAPStandalone id="bounceL1" tweens={[{ id: `bounceL1Appear`, ...bounceAppear }, { id: `bounceL1Disppear`, ...bounceDisappear }]} transitStrokeAnimation transitPortion={0.95} strokeWidth='1' d="M61.5 230.5C60.5 219.5 63 217 57.5 210.5C52 204 51 200.5 41 198" stroke={`${colorPrimary}`} strokeLinecap="round" />
      <PathGSAPStandalone id="bounceR1" tweens={[{ id: `bounceR1Appear`, ...bounceAppear }, { id: `bounceR1Disppear`, ...bounceDisappear }]} transitStrokeAnimation transitPortion={0.95} strokeWidth='1' d="M92 230C97.5 220 100 215 103 215" stroke={`${colorPrimary}`} strokeLinecap="round" />
      <PathGSAPStandalone id="bounceR2" tweens={[{ id: `bounceR2Appear`, ...bounceAppear }, { id: `bounceR2Disppear`, ...bounceDisappear }]} transitStrokeAnimation transitPortion={0.95} strokeWidth='1' d="M98.5 237C104.5 226 115.5 221.5 120.5 221.5" stroke={`${colorPrimary}`} strokeLinecap="round" />

      <path className='opacity-0' id="alongPathR1" d="M85 251C85 235 94.5 219 108 212.5" stroke="black" />
      <path className='opacity-0' id="alongPathR2" d="M89 251.5C93 234.5 106.5 221.5 133.5 219.5" stroke="black" />
      <path className='opacity-0' id="alongPathL2" d="M55.5 249.5C55.5 233 28.5 210.5 9.5 210.5" stroke="black" />
      <path className='opacity-0' id="alongPathL1" d="M62 251C62 235 51.5 219.5 44 214" stroke="black" />


    </svg>

    {/* <PathGSAPStandalone inverse tweens={[{ id: `speed1AnimationAppear`, ...tweenAppear },
      { id: `speed1AnimationDisapp`, ...tweenDisapp }
      ]}
         key={'speedPath' + 1} id={'speed1'} d="M23.11 103.5C22.11 81 28.11 39.5 33.61 29" />

      <PathGSAPStandalone inverse tweens={[{ id: `speed2AnimationAppear`, ...tweenAppear },
      { id: `speed2AnimationDisapp`, ...tweenDisapp }
      ]}
         key={'speedPath' + 2} id={'speed2'} d="M13.5002 117.5C12.5002 95 18.5002 53.5 24.0002 43" />

      <PathGSAPStandalone inverse tweens={[{ id: `speed3AnimationAppear`, ...tweenAppear },
      { id: `speed3AnimationDisapp`, ...tweenDisapp }
      ]}
         key={'speedPath' + 3} id={'speed3'} d="M8.11005 90.5C7.11005 68 13.11 26.5 18.61 16" /> */}

  </>
  )
}