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
import { PathGSAP } from "./pathUtilsGsap"
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
// import useStateRef from "@/utils/useStateRef"
// gsap.registerPlugin(ScrollTrigger)


let waves = [
  "M501.314 2117.44C479.577 2102.28 497.704 2077.99 489.074 2069.63C480.443 2061.26 461.778 2076.44 450.102 2065.12C438.426 2053.8 458.185 2040.15 446.131 2033.22C434.077 2026.3 426.881 2039 413 2026.34",
  "M393.066 2514.57C368.846 2525.34 382.037 2552.62 371.975 2559.2C361.914 2565.77 343.612 2550.3 330 2559.2C316.388 2568.1 322.093 2580.1 317.5 2587.1C312.907 2594.1 301.5 2587.1 295 2599.24C291.5 2607.74 290.5 2607.24 285 2612.24",
  "M304.922 2236.79C283.913 2232.21 297.228 2204.99 285.429 2202.69C273.629 2200.39 271.032 2224.04 251.315 2218.02C237.62 2211.72 246.004 2194.71 232.176 2191",
  "M1462 2287.68C1488.04 2292.64 1492.75 2262.7 1504.76 2263.03C1516.78 2263.36 1523 2286.51 1539.25 2286.96C1555.51 2287.4 1551.48 2276.78 1565.43 2271.15C1579.38 2265.52 1573.53 2272.48 1589.96 2279.65",
  "M1313 2529.5C1319 2537 1338.5 2527.5 1344.5 2536C1350.5 2544.5 1337.5 2555 1344.5 2562.5C1351.5 2570 1362.5 2566.5 1366.5 2571C1369.5 2575.5 1365 2583.5 1372.5 2590.5",
  "M643.5 2139.5C631 2116.5 675.5 2101.5 659.5 2082.5C643.5 2063.5 627.5 2100 605.5 2082.5C583.5 2065 605.5 2047 605.5 2029.5C605.5 2012 570 2026 566 2004",
  "M1321.18 2401.38C1354.52 2437.01 1397.97 2371.46 1422.75 2396.24C1447.54 2421.01 1403.26 2456.3 1426.87 2477.63C1450.48 2498.97 1485.98 2472.41 1505.14 2484.96C1524.3 2497.5 1496.93 2530.43 1519.35 2554.05"
]

export default function Story2Waves({ scrollMin, scrollMax, scrubTl, transitionTl, speed, setSvgHeight, setSvgWidth, setSvgTop, banner }) {

  let { locale, scrolled } = useAppContext()

  let { mobile } = usePageContext()

  let fishTweens = [
    {
      timeline: scrubTl,
      id: `fishScrub`,
      ratio: 0.5,
      attr: {
        duration: 1,
        ease: 'power3.out',
        // onStart:()=>{console.log('start One')} 
      },
      position: 0
    },
  ]

  useEffect(() => {
    scrubTl && scrubTl
      .to('#fish', {
        opacity: 1,
        duration: 0.1
      }, 1)
      .to('#toFish', {
        opacity: 0,
        duration: 0.1
      }, 1)
      .to('#fish', {
        motionPath: {
          path: '#alongPath',
          align: '#alongPath',
          immediateRender: true,
          alignOrigin: [0.5, 0.5],
          autoRotate: 130,
        },
        // opacity:0,
        ease: 'ease.inout',
        duration: 1,
        transformOrigin: "50% 50%",
      }, 1.05)
      .to('#fish', {
        attr: { d: "M565.227 2597.19C563.57 2597.02 562.174 2594.36 560.974 2592.75C558.103 2588.9 562.437 2590.43 563.474 2593.58C563.941 2594.99 565.183 2595.6 565.227 2597.19ZM565.227 2597.19C566.885 2597.36 562.534 2595.08 563.474 2595.08L561.974 2593.58L565.227 2597.19Z" },
        // opacity:0,
        duration: 0.5,
      }, 1.55)
  }, [scrubTl])

  return (<>
    <AnimateSVG alt='miloweiler photography logo animation'
      scrollMin={scrollMin} scrollMax={scrollMax} speed={speed} setSvgHeight={setSvgHeight} setSvgTop={setSvgTop} setSvgWidth={setSvgWidth}>

      {mobile ?
        <g id='mobile'>
          {/* <Path scrolled={fakeScroll1} drawDuration='1' position={0} inverse={false} id="toAstridMob" d="M351 170C351 332.5 61.9999 266.5 20.5009 410C3.06634 470.287 61.5011 539 118 515" stroke="#FFFAEA" strokeWidth="2" strokeLinecap="round" /> */}
        </g> :
        <g id='desktopPage1'>

          {/* ====== WAVES ========  */}
          {waves.map((wavePath, i) => <PathGSAP tweens={[{ timeline: transitionTl, id: `wave${i}Transition`, ratio: 1, attr: { duration: 1, ease: 'none' }, position: 1.4 + (i % 2) * 0.4 }]}
            className='' transitStrokeAnimation transitPortion={0.6} scrolled={0} key={'wavePath' + i} id={'wavePath' + i} d={wavePath} />)}

          {/* ====== FISH ========  */}
          <PathGSAP tweens={fishTweens} inverse={true} transitStrokeAnimation transitPortion={0.52} id="toFish" d="M577.5 2621.46L589.875 2608.07C587.033 2608.33 582.478 2609.36 577.5 2609.52C571.5 2609.52 565.161 2607.93 559.599 2602.98C549.5 2594 565.5 2582 573.756 2594.61C576.269 2598.45 576.011 2602.01 575.614 2608.07C573.877 2634.56 595.042 2628.96 602 2624.5C619.18 2613.49 605.271 2594.88 612.308 2588.84C619.345 2582.79 632.644 2602.01 644.287 2592.6" stroke="#FF0000" stroke-width="2" stroke-linecap="round" />
          <path opacity={0} id="fish" d="M574.984 2609.21C569.373 2608.63 563.541 2606.68 559.477 2601.23C549.754 2588.19 570.815 2583.5 574.326 2594.16C575.907 2598.96 574.836 2603.82 574.984 2609.21ZM574.984 2609.21C580.599 2609.79 585.992 2609.01 589.175 2609.01L575.387 2622.8L574.984 2609.21Z" stroke="#FFF5EA" strokeWidth="2" strokeLinecap="round" />
          <path opacity={0} id="alongPath" d="M572 2603.5C548.5 2583 550 2557 520.5 2557C503.5 2557 470 2566 470 2592.5" stroke="black" />
          {/* <path id="fishFinal" d="M565.227 2597.19C563.57 2597.02 562.174 2594.36 560.974 2592.75C558.103 2588.9 562.437 2590.43 563.474 2593.58C563.941 2594.99 565.183 2595.6 565.227 2597.19ZM565.227 2597.19C566.885 2597.36 562.534 2595.08 563.474 2595.08L561.974 2593.58L565.227 2597.19Z" stroke="#FF0000" stroke-width="2" stroke-linecap="round"/> */}

        </g>}

    </AnimateSVG>


  </>
  )
}