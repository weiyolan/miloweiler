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
  // "M1321.18 2401.38C1354.52 2437.01 1397.97 2371.46 1422.75 2396.24C1447.54 2421.01 1403.26 2456.3 1426.87 2477.63C1450.48 2498.97 1485.98 2472.41 1505.14 2484.96C1524.3 2497.5 1496.93 2530.43 1519.35 2554.05",
  // "M1462 2287.68C1488.04 2292.64 1492.75 2262.7 1504.76 2263.03C1516.78 2263.36 1523 2286.51 1539.25 2286.96C1555.51 2287.4 1551.48 2276.78 1565.43 2271.15C1579.38 2265.52 1573.53 2272.48 1589.96 2279.65",
  // "M1313 2529.5C1319 2537 1338.5 2527.5 1344.5 2536C1350.5 2544.5 1337.5 2555 1344.5 2562.5C1351.5 2570 1362.5 2566.5 1366.5 2571C1369.5 2575.5 1365 2583.5 1372.5 2590.5",
  // "M643.5 2139.5C631 2116.5 675.5 2101.5 659.5 2082.5C643.5 2063.5 627.5 2100 605.5 2082.5C583.5 2065 605.5 2047 605.5 2029.5C605.5 2012 570 2026 566 2004",
  // "M501.314 2117.44C479.577 2102.28 497.704 2077.99 489.074 2069.63C480.443 2061.26 461.778 2076.44 450.102 2065.12C438.426 2053.8 458.185 2040.15 446.131 2033.22C434.077 2026.3 426.881 2039 413 2026.34",
  // "M304.922 2236.79C283.913 2232.21 297.228 2204.99 285.429 2202.69C273.629 2200.39 271.032 2224.04 251.315 2218.02C237.62 2211.72 246.004 2194.71 232.176 2191",
  // "M393.066 2514.57C368.846 2525.34 382.037 2552.62 371.975 2559.2C361.914 2565.77 343.612 2550.3 330 2559.2C316.388 2568.1 322.093 2580.1 317.5 2587.1C312.907 2594.1 301.5 2587.1 295 2599.24C291.5 2607.74 290.5 2607.24 285 2612.24",
"M1365.05 2392.64C1387.77 2403.33 1397.7 2374.8 1415.16 2383.81C1432.63 2392.82 1421.17 2418.96 1433.59 2425.3C1446.01 2431.65 1467.65 2410.35 1478.28 2417.83C1488.91 2425.32 1480.34 2440.83 1492.59 2445.6C1504.85 2450.38 1511.95 2443.77 1517.65 2448.11C1523.34 2452.45 1528.54 2465.9 1534.67 2468.29",
"M563.562 2186.71C543.502 2169.39 564.033 2147.1 556.31 2137.89C548.587 2128.67 528.458 2141.85 518.01 2129.39C507.561 2116.93 528.621 2105.38 517.344 2097.25C506.067 2089.12 497.601 2101.02 485.097 2087",
"M448.066 2488.57C423.846 2499.34 437.037 2526.62 426.975 2533.2C416.914 2539.77 398.612 2524.3 385 2533.2C371.388 2542.1 377.093 2554.1 372.5 2561.1C367.907 2568.1 356.5 2561.1 350 2573.24C346.5 2581.74 345.5 2581.24 340 2586.24",
"M348.731 2353.95C322.268 2352.47 321.554 2382.77 309.599 2384.03C297.644 2385.29 288.423 2363.16 272.25 2364.87C256.077 2366.58 255.675 2379.86 248.393 2383.99C241.111 2388.12 234.157 2376.69 222.831 2384.53C215.837 2390.49 215.176 2389.59 208 2391.53",
"M1432 2266.38C1458.5 2266.6 1457.78 2236.31 1469.66 2234.48C1481.54 2232.65 1491.8 2254.31 1507.88 2251.84C1523.95 2249.37 1521.1 2237.74 1530.8 2231.61C1540.5 2225.48 1544.5 2239 1556.46 2235.58",
"M364.123 2236.45C360.249 2232.68 357.87 2230.71 353.641 2229.92C348.726 2229 337.648 2236.61 330.149 2233.17C322.65 2229.74 325.463 2220.1 318.296 2212.15C311.129 2204.2 299.039 2214.51 290.769 2207.03C286.525 2203.18 288.518 2200 281.477 2194.11",
"M1316 2536C1322 2543.5 1341.5 2534 1347.5 2542.5C1353.5 2551 1340.5 2561.5 1347.5 2569C1354.5 2576.5 1365.5 2573 1369.5 2577.5C1372.5 2582 1368 2590 1375.5 2597",
"M662.85 2058.6C651.725 2045.16 662.241 2037.71 658.561 2031.44C654.882 2025.17 647.839 2025.78 644.314 2017.99C640.788 2010.21 647.604 2011 645.642 2004.12C643.68 1997.23 633.171 1992.74 630.825 1987.22C628.48 1981.7 628.226 1973.96 624.405 1969",
"M1536.22 2356.79C1552.78 2351.3 1557.64 2364.19 1564.82 2363.04C1572 2361.88 1574.82 2355.25 1583.36 2354.79C1591.89 2354.33 1594.38 2361.41 1601.5 2362.08C1608.63 2362.75 1610.76 2357.66 1618.34 2356.9C1624.29 2356.3 1630.46 2358.78 1635.35 2358.78",
"M243.473 2285.96C226.456 2289.81 222.868 2276.51 215.612 2276.96C208.357 2277.41 204.899 2283.74 196.363 2283.36C187.827 2282.99 186.037 2275.71 179.009 2274.34C171.981 2272.98 169.366 2277.85 161.751 2277.86C155.767 2277.88 149.87 2274.81 145 2274.33",
"M1476 2575.55C1487.71 2588.49 1494.54 2575.67 1500.22 2580.21C1505.9 2584.75 1506.33 2595.11 1513.53 2599.71C1520.73 2604.32 1520.92 2597.46 1527.46 2600.39C1533.99 2603.31 1537.11 2615.46 1542.24 2618.57C1547.53 2621.78 1555.67 2621.4 1559.33 2625.87",
"M313.068 2117.01C296.19 2112.59 299.125 2099.14 292.478 2096.2C285.831 2093.25 279.847 2097.28 272.442 2093.02C265.036 2088.76 266.8 2081.47 261.188 2077.02C255.576 2072.58 251.015 2075.69 244.246 2072.2C238.928 2069.46 235.105 2064.02 231 2061.36",
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
      .to('#fish', {
        // attr: { d: "M565.227 2597.19C563.57 2597.02 562.174 2594.36 560.974 2592.75C558.103 2588.9 562.437 2590.43 563.474 2593.58C563.941 2594.99 565.183 2595.6 565.227 2597.19ZM565.227 2597.19C566.885 2597.36 562.534 2595.08 563.474 2595.08L561.974 2593.58L565.227 2597.19Z" },
        opacity:0,
        duration: 0.05,
      }, 1.95)
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
          {waves.map((wavePath, i) => <PathGSAP tweens={[{ timeline: transitionTl, id: `wave${i}Transition`, ratio: 1, attr: { duration: 1, ease: 'none' }, position: 1.4 + (i) * 0.1 }]}
            className='' transitStrokeAnimation transitPortion={0.6} scrolled={0} key={'wavePath' + i} id={'wavePath' + i} d={wavePath} />)
            // position: 1.4 + (i % 2) * 0.4 
            }

          {/* ====== FISH ========  */}
          <PathGSAP tweens={fishTweens} inverse={true} transitStrokeAnimation transitPortion={0.52} id="toFish" d="M577.5 2621.46L589.875 2608.07C587.033 2608.33 582.478 2609.36 577.5 2609.52C571.5 2609.52 565.161 2607.93 559.599 2602.98C549.5 2594 565.5 2582 573.756 2594.61C576.269 2598.45 576.011 2602.01 575.614 2608.07C573.877 2634.56 595.042 2628.96 602 2624.5C619.18 2613.49 605.271 2594.88 612.308 2588.84C619.345 2582.79 632.644 2602.01 644.287 2592.6" stroke="#FF0000" stroke-width="2"  />
          <path opacity={0} id="fish" d="M574.984 2609.21C569.373 2608.63 563.541 2606.68 559.477 2601.23C549.754 2588.19 570.815 2583.5 574.326 2594.16C575.907 2598.96 574.836 2603.82 574.984 2609.21ZM574.984 2609.21C580.599 2609.79 585.992 2609.01 589.175 2609.01L575.387 2622.8L574.984 2609.21Z" stroke="#FFF5EA" strokeWidth="2" strokeLinecap="round" />
          <path opacity={0} id="alongPath" d="M572 2603.5C548.5 2583 550 2557 520.5 2557C503.5 2557 470 2566 470 2592.5" stroke="black" />
          {/* <path id="fishFinal" d="M565.227 2597.19C563.57 2597.02 562.174 2594.36 560.974 2592.75C558.103 2588.9 562.437 2590.43 563.474 2593.58C563.941 2594.99 565.183 2595.6 565.227 2597.19ZM565.227 2597.19C566.885 2597.36 562.534 2595.08 563.474 2595.08L561.974 2593.58L565.227 2597.19Z" stroke="#FF0000" stroke-width="2" /> */}

        </g>}

    </AnimateSVG>


  </>
  )
}