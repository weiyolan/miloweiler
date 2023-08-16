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
  "M67.5005 229C67.5003 231 67.0001 232.29 69.5 233.5C72.5001 234.952 68.933 237.5 71.5002 237.5C75.0625 237.5 73 232.993 73 230.5C73 227.146 75.5002 227 76.0002 225.5C76.5702 223.79 76.0002 224 76.5002 222.5C76.6583 222.026 76.5002 221.5 76.0002 219C75.716 217.579 76.0002 215.542 74.5002 214C73.0002 212.458 76.2137 210.107 74.0002 209C72.0002 208 70.2379 208.549 69.5002 211.5C69.0002 213.5 66.5003 212.556 67.0003 218.556C67.1193 219.984 69.0001 222.056 67.5002 223.056C66.5362 223.699 68.5004 224.382 68.5002 225.5C68.5 226.951 67.5007 226.5 67.5005 229Z"
  , "M60.5 251C60.4998 253 64.0002 255.29 66.5001 256.5C69.5002 257.952 68.4998 255.548 71.0671 255.548C74.6293 255.548 73.4998 253.5 79.5001 254.451C82.8128 254.977 84.0001 252.952 84.5001 251.451C85.0701 249.741 83.6267 248.452 82.5001 248.451C82.0001 248.451 77.9999 245.5 77.4999 243C77.2158 241.579 77 240.042 75.5 238.5C74 236.958 77.7134 233.106 75.5 232C73.5 231 75.0001 228 72.0001 228.5C69.1236 228.979 66.0001 234 66.5001 240C66.6191 241.428 68.4999 243.5 67 244.5C66.036 245.143 65.0001 246.5 64 247C62.4621 247.769 60.5002 248.5 60.5 251Z"
  , "M51.4998 251C51.9328 255.451 53.3213 258.047 59.567 255.549C64.567 253.549 65.7852 255.328 71.0671 255.549C77.8952 255.834 77.2867 252.894 85.5 257C88.5 258.5 90 255.5 90.5 254C91.07 252.29 89.6266 251 88.5 251C88 251 87.4329 249.971 86.5 249.5C85.9329 249.214 85.1448 249.663 84.5 249C83.8552 248.337 82 249 79.5669 248.549C72.1276 247.168 70.2302 250.551 67.5 246C65.9998 243.499 62 245 61 245C59.567 245 58.921 245.61 58 246C56.933 246.452 54.9331 245.951 53.933 246.452C52.3951 247.221 51.2578 248.512 51.4998 251Z"
  , "M52.5672 248.548C52.1721 256.348 53.3214 258.047 59.567 255.548C64.567 253.548 65.7852 255.328 71.0671 255.548C77.8953 255.833 77.567 252.048 86.5672 257.048C92.8252 260.525 88.4999 254.5 90 251C91.5277 247.436 94.7966 241.297 94 240.5C91.7853 238.285 90.5266 253 86.5672 251C81.6179 248.5 89.9593 236.5 88.5 235C87.0407 233.5 84.9804 248.007 79.567 248.548C72.0381 249.301 65.7972 250.1 63.067 245.548C61.5668 243.048 62.7001 230.1 61.5 231C60.2999 231.9 63.0449 242.022 58.567 246.048C55.8663 248.476 50.013 230.918 48.0001 233C46.8048 234.236 53.0002 240 52.5672 248.548Z"
  , "M55.5 245C56.5002 247.5 56.5178 250.982 60 247.5C63 244.5 66.7181 249.28 72 249.5C78.8281 249.785 81.1445 248.596 84 250.5C85.5 251.5 89.2291 255.301 89 251.5C88.7589 247.5 97.4706 235.781 97 235C95.7952 233 88.4255 250.687 86 250.5C79.5 250 92 231 91 229C90 227 83.9291 247.599 79 248.5C71.5569 249.861 65.5291 248.082 64.0003 243C63.2459 240.492 62.6635 222.245 61.0003 223.5C60.4323 223.929 64.8057 241.236 59.5003 245.5C56.6696 247.775 47.4294 227.482 46.0003 230C45.5023 230.877 54.5579 242.645 55.5 245Z"
]
export default function Page4Kakje({ scrubTl, transitionTl }) {

  let { locale, scrolled, width, height } = useAppContext()
  let [myPosition, setMyPosition] = useState({ x: 0.43, y: 0.63 })

  // let { mobile } = usePageContext()
  // const ctx = useRef(gsap.context(() => { }));
  // let tl = useRef()
  // let [started, setStarted] = useState(false)

  let colorPrimary = "#FFF5EA";

  useEffect(() => {
    transitionTl && transitionTl
      .to('.svgKakScrub', {
        y: -50,
        autoAlpha: 0,
        duration: 0.5,
      }, 0)

    scrubTl && scrubTl
      .set(['#splashL1', '#splashL2', '#splashR1', '#splashR2'], {
        scale: 0,
        opacity: 0,
        transformOrigin: '50% 50%',
      }, 0)
      .to('#kakje0', {
        opacity: 1,
        duration: 0.2,
        ease: 'none',
      }, 0)
      .to('#kakje0', {
        attr: { d: kakjes[0] },
        duration: 0.7,
        ease: 'none',
      }, 1 - 1)
      .to('#kakje0', {
        attr: { d: kakjes[1] },
        duration: 0.15,
        ease: 'none',
      }, 1.7 - 1)
      .to('#kakje0', {
        attr: { d: kakjes[2] },
        duration: 0.15,
        ease: 'none',
      }, 1.85 - 1)
      .to('#kakje0', {
        attr: { d: kakjes[3] },
        duration: 0.15,
        ease: 'none',
      }, 2 - 1)
      .to('#kakje0', {
        attr: { d: kakjes[4] },
        duration: 0.15,
        ease: 'none',
      }, 2.15 - 1)
      .to('#kakje0', {
        // attr: { d:kakjes[4] },
        opacity: 0,
        duration: 0.15,
        ease: 'none',
      }, 2.3 - 1)
      // .to('#kakje0', {
      //   // attr: { d:kakjes[4] },
      //   opacity:0,
      //   duration: 0.15,
      //   ease: 'none',
      // }, 2.1)
      .to(['#splashL1', '#splashL2', '#splashR1', '#splashR2'], {
        opacity: 1,
        scale: 1,
        duration: 0.1,
      }, 2 - 1)
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
        duration: 0.5,
        transformOrigin: '50% 50%',
      }, 2 - 1)
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
        duration: 0.5,
        transformOrigin: '50% 50%',
      }, 2 - 1)
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
        duration: 0.5,
        transformOrigin: '50% 50%',
      }, 2 - 1)
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
        duration: 0.5,
        transformOrigin: '50% 50%',
      }, 2 - 1)
      .to(['#splashL1', '#splashL2', '#splashR1', '#splashR2'], {
        // opacity: 0,
        scale: 0,
        duration: 0.2,
      }, 2.3 - 1)
      .to(['#splashL1', '#splashL2', '#splashR1', '#splashR2'], {
        opacity: 0,
        // scale: 0,
        duration: 0.05,
      }, 2.45 - 1)

  }, [transitionTl, scrubTl])

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
    // timeline: transitionTl,
    timeline: scrubTl,
    ratio: 0.99,
    attr: { duration: 0.6, ease: 'none', y: 100 },
    position: 1.4 - 1
  }

  let bounceAppear = {
    // timeline: transitionTl,
    timeline: scrubTl,
    ratio: 0.995,
    attr: { duration: 0.3, ease: 'none', },
    position: 2.2 - 1,
  }

  let bounceDisappear = {
    // timeline: transitionTl,
    timeline: scrubTl,
    ratio: 0.995,
    attr: { duration: 0.1, stroke: 'transparent', },
    position: 2.4 - 1,
  }

  //==============X FROM CENTER, Y FROM BOTTOM============
  // let originalY = 0.630861
  let originalY = width < 800 ? 0.62 : 0.61
  let originalX = 0.4896694
  let r2 = 2420 / 3006
  let r1 = width / (height * 2)

  function getY() {
    if (r2 / r1 < 1) {
      return (originalY - (1 - r2 / r1) / 2) * r1 / r2
    } else return originalY
  }

  function getX() {
    if (r2 / r1 < 1) {
      return originalX
    } else {
      return (originalX - (1 - r1 / r2) / 2) * r2 / r1
      // (0.4896694 - (1-width*3006/2420/height/2)/2) * 2420*height*2/3006/width
      // (0.4896694 - (1-100vw*3006/2420/100lvh/2)/2) * 2420*100lvh*2/3006/100vw
    }
  }

  useEffect(() => {
    let newX = getX()

    console.log(Math.abs(newX - myPosition.x) / myPosition.x)

    if (Math.abs(newX - myPosition.x) / myPosition.x > 0.05) {
      console.log('changed')
      setMyPosition({ x: getX(), y: getY() })
    }
  }, [width, height])
  //==============FROM CENTER============

  // left: `calc(50vw + 50vw*${myPosition.x})`,
  // left-[calc((0.4896694-(1-100vw*3006/2420/100lvh/2)/2)*2420*100lvh*2/3006/100vw)] 
  return (<>
    <svg style={{ left: `calc(50vw + 50vw*${myPosition.x})`, bottom: `${myPosition.y * 100}lvh` }} className='fixed -translate-x-1/2 w-[30%] md:w-[11%] svgKakje' viewBox="0 0 146 259" fill="none" >
      <path className={`opacity-0`} id="kakje0" d="M87.5657 29.4585C87.5655 31.4585 85.0658 33.2904 87.5657 34.5C90.5658 35.9516 89.9328 36.5 92.5 36.5C96.0622 36.5 94.5654 33.9926 94.5654 31.5C94.5654 28.146 96.0655 28.5 96.5654 27C97.1354 25.2897 96.0654 24.4585 96.5654 22.9585C96.7235 22.4842 98.5 22 98 19.5C97.7158 18.0792 98.0654 15.5418 96.5654 14C95.0654 12.4582 96.2789 10.5651 94.0654 9.45859C92.0654 8.4588 90.3031 9.00798 89.5654 11.9585C89.0654 13.9584 88.0654 12.0003 88.5654 18C88.6844 19.428 89.0653 22.5144 87.5654 23.5144C86.6015 24.157 88.5656 24.8403 88.5654 25.9585C88.5652 27.41 87.5659 26.9584 87.5657 29.4585Z" fill={`${colorPrimary}`} stroke={`${colorPrimary}`} strokeLinecap="round" />


      {/* <path className={`opacity-0`} id="kakje1" d="M81.7814 138.431C81.9756 148.5 79.2881 151.119 75.1363 150.829C74.4897 149.759 67.0895 151.404 72.7684 145.693C78.4474 139.981 72.3013 141.752 74.0464 134.892C75.7916 128.033 70.6815 130.787 73.3771 124.525C76.0726 118.263 78.1833 122.243 81.6808 125.106C85.1782 127.969 81.5871 128.363 81.7814 138.431Z" fill={`${colorPrimary}`} stroke={`${colorPrimary}`} strokeLinecap="round" /> */}
      {/* <path id="kakje1" d="M75.6888 231C78.3003 225.197 79.6886 228 77.6886 221C74.4786 209.765 80.7413 200.5 74.5 200.5C65.6024 200.5 66.1887 215 69.6887 219.5C73.1887 224 63.1888 226 68.6888 231C72.9871 234.908 66.7366 247.291 72.6888 242C77.1888 238 71.1888 241 75.6888 231Z" fill="#FF0000" stroke="#FF0000" stroke-linecap="round"/> */}
      {/* <path id="kakje2" d="M85.5 253.5C88.1115 247.697 80.4998 242 78.4998 235C75.2899 223.765 76.2411 231.501 69.9998 231.501C61.1023 231.501 64.4998 233.501 67.9998 238.001C71.4998 242.501 51.5 248.5 57 253.5C61.2983 257.408 66.5478 263.791 72.5 258.501C77 254.501 81 263.5 85.5 253.5Z" fill="#FF0000" stroke="#FF0000" stroke-linecap="round"/> */}
      {/* <path id="kakje3" d="M95 256C97.6115 250.197 93.5 253.5 91.5 246.5C88.29 235.265 79.2413 246.5 73 246.5C64.1024 246.5 59.1861 245.411 50.9999 242C46.2064 240.003 45.9568 265.634 58 256C62.5362 252.371 71.0479 263.291 77 258C81.5 254 90.5 266 95 256Z" fill="#FF0000" stroke="#FF0000" stroke-linecap="round"/> */}
      {/* <path id="kakje4" d="M91.5 244.5C94.1115 238.697 81.6749 249.21 84.5 242.5C88.5 233 70.9653 242.665 65 244.5C58.5 246.5 57 236 51.5003 243.5C47.7602 248.6 39.6814 239 46.5001 254C49.0003 259.5 92.0001 263.5 96.0001 254C98.3365 248.451 87 254.5 91.5 244.5Z" fill="#FF0000" stroke="#FF0000" stroke-linecap="round"/> */}

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
      <PathGSAPStandalone id="bounceL2" tweens={[{ id: `bounceL2Appear`, ...bounceAppear }, { id: `bounceL2Disppear`, ...bounceDisappear }]} transitStrokeAnimation transitPortion={0.95} strokeWidth='1' d="M44.5 228.5C43.3078 226.758 43.6392 224.93 42.5 223.5C40.8756 221.46 38.9883 222.472 37.5 221C34.91 218.438 34.5402 216.174 32.5 215C31.3041 214.312 29.6691 214.326 28.5 214C26.6021 213.471 25.3121 212.865 24.5 213" stroke={`${colorPrimary}`} strokeLinecap="round" />
      <PathGSAPStandalone id="bounceL1" tweens={[{ id: `bounceL1Appear`, ...bounceAppear }, { id: `bounceL1Disppear`, ...bounceDisappear }]} transitStrokeAnimation transitPortion={0.95} strokeWidth='1' inverse d="M40 198C42.4877 198.622 43.4184 200.224 45 201C46.7283 201.849 49.0397 201.89 50.2054 203C51.3587 204.098 51.3693 205.568 52.5 207C53.3846 208.121 55.8427 208.632 57 210C58.5488 211.83 57.9632 213.525 58.5 215C59.3371 217.3 60.5255 217.327 60.5 220.5" stroke={`${colorPrimary}`} strokeLinecap="round" />
      <PathGSAPStandalone id="bounceR1" tweens={[{ id: `bounceR1Appear`, ...bounceAppear }, { id: `bounceR1Disppear`, ...bounceDisappear }]} transitStrokeAnimation transitPortion={0.95} strokeWidth='1' d="M92 228C92.6825 226.759 93.9167 225.955 94.5 225C95.2928 223.702 94.8529 222.365 95.5 221.5C96.4246 220.263 98.2659 220.127 99 219.5C100.42 218.287 100.101 217.199 101.5 216.5" stroke={`${colorPrimary}`} strokeLinecap="round" />
      <PathGSAPStandalone id="bounceR2" tweens={[{ id: `bounceR2Appear`, ...bounceAppear }, { id: `bounceR2Disppear`, ...bounceDisappear }]} transitStrokeAnimation transitPortion={0.95} strokeWidth='1' d="M98 233C98.8088 231.787 99.5289 230.496 100.5 229.5C101.537 228.436 102.836 228.34 104 227.5C105.288 226.57 106.135 225.187 107.5 224.5C108.736 223.878 110.764 223.949 112 223.5C115.791 222.122 115.856 220.876 120 221C121.619 221.048 123.057 220.5 124 220.5" stroke={`${colorPrimary}`} strokeLinecap="round" />

      <path className='opacity-0' id="alongPathR1" d="M85 251C85 235 94.5 219 108 212.5" stroke="black" />
      <path className='opacity-0' id="alongPathR2" d="M89 251.5C93 234.5 106.5 221.5 133.5 219.5" stroke="black" />
      <path className='opacity-0' id="alongPathL2" d="M55.5 249.5C55.5 233 28.5 210.5 9.5 210.5" stroke="black" />
      <path className='opacity-0' id="alongPathL1" d="M62 251C68.2292 222.847 53.4638 199.917 36 197" stroke="black" />


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