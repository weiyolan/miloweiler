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



export default function Story5Milo({ scrollMin, scrollMax, scrubTl, transitionTl, speed, id }) {

  let { locale, scrolled } = useAppContext()
  let [refresh, setRefresh] = useState(0)
  let { mobile } = usePageContext()
  const ctx = useRef(gsap.context(() => { }));

  // useEffect(() => {

  // }, [transitionTl])


  let letterTween =
  {
    timeline: scrubTl,
    ratio: 1,
    attr: {
      duration: 100,
      // ease: 'ease.inout',
      // onStart:()=>{console.log('start One')} 
    },
    position: 0
  }


  useEffect(() => {
    setRefresh((n) => n + 1)
  }, [scrubTl])

  let colorPrimary = "#FFF5EA";
  let n = 0;

  let letters = [
    <path key='0' id="m" d="M702.428 4636.7C698.428 4636.7 697.929 4672.2 700.929 4672.2C703.929 4672.2 708.556 4639.2 705.428 4639.2C701.428 4639.2 700.946 4669.2 705.428 4669.2C709.911 4669.2 714.429 4643.7 709.429 4643.7C704.429 4643.7 705.929 4662.7 715.429 4659.2C725.75 4655.4 857.429 4606.7 934.929 4659.2C1021.06 4717.55 904.066 4852.46 996.429 4932.2C1052.93 4980.98 1126.25 4918.42 1217.93 4902.2C1304.96 4886.8 1448.39 4903.64 1408.93 4993.7C1360.93 5103.24 1008.43 5104.2 996.429 5029.2C988.45 4979.33 1069.93 4967.7 1033.93 5029.2C998.437 5089.83 1050.43 5143.2 1117.93 5126.2C1187.58 5108.66 1201.93 5145.7 1266.43 5134.2C1330.93 5122.7 1330.51 5098.68 1371.43 5102.7C1401.93 5105.7 1421.43 5130.7 1439.93 5110.2C1453.13 5097 1470.01 5104.99 1472.01 5110.49C1467.15 5099.01 1471.63 5080.33 1476.93 5080.33C1481.17 5080.33 1483.91 5092.57 1484.75 5098.69C1484.23 5093.73 1484.62 5083.65 1490.37 5083.05C1497.56 5082.29 1497.37 5104.37 1497.56 5106.58" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key='1' id="i" d="M1506.46 5098.99C1506.81 5103.28 1506.99 5105.07 1507.03 5105.43" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key='2' id="ib" d="M1504 5085.68C1504.06 5085.93 1504.38 5086.19 1504.32 5086.31" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key='3' id="l" d="M1510.25 5078.55C1511.63 5087.64 1512.83 5100.32 1513.46 5103.6" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key='4' id="o" d="M1528.34 5099.38C1527 5103.64 1517.13 5105.13 1519.31 5097.24C1520.51 5094.59 1522.59 5093.24 1525.12 5093.39C1528.67 5093.6 1529.32 5096.22 1528.34 5099.38Z" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key='5' id="w" d="M1548.65 5077.55C1537.1 5105.31 1545.75 5114.9 1550.73 5106.13C1554.72 5099.12 1554.54 5097.83 1553.95 5098.06C1553.66 5100.99 1557.2 5105.75 1563.35 5102.6C1570.89 5098.74 1572.18 5081.59 1563.35 5076.35" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key='6' id="ei" d="M1570.73 5096.61C1573.7 5098.69 1577.93 5093.64 1574.33 5093.01C1570.73 5092.38 1568.02 5100.33 1574.33 5101.84C1579.38 5103.05 1582.83 5098.18 1583.92 5095.6C1584.34 5097.09 1585.9 5099.87 1587.01 5100.58" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key='7' id="ei2" d="M1581.71 5085.75C1582.57 5086.61 1583.12 5086.66 1583.29 5086.57" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key='8' id="l2" d="M1585.05 5072C1586.62 5087.85 1590 5095.97 1591.49 5098.06" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key='9' id="er" d="M1595.28 5096.61C1602.02 5094.21 1599.81 5090 1597.5 5091C1592.78 5093.04 1594.81 5099.19 1599.5 5099C1605 5098.5 1606 5093 1605 5091C1604 5089 1607 5096 1607 5098.5C1607 5098.5 1606.39 5088.75 1615 5092.5" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key='10' id="punt" d="M1621.29 5098.31V5098.3" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  ]

  return (<>
    <AnimateSVG alt='miloweiler photography logo animation'
      scrollMin={scrollMin} scrollMax={scrollMax} speed={speed} id={id}>

      {mobile ?
        <g id='mobile'>
          {/* <Path scrolled={fakeScroll1} drawDuration='1' position={0} inverse={false} id="toAstridMob" d="M351 170C351 332.5 61.9999 266.5 20.5009 410C3.06634 470.287 61.5011 539 118 515" stroke="#FFFAEA" strokeWidth="2" strokeLinecap="round" /> */}
        </g> :
        <g id='desktopPage1'>
          {/* <PathGSAPStandalone tweens={tweens} id="miloTekeningPath" d="M702.428 4636.7C698.428 4636.7 697.929 4672.2 700.929 4672.2C703.929 4672.2 708.556 4639.2 705.428 4639.2C701.428 4639.2 700.946 4669.2 705.428 4669.2C709.911 4669.2 714.429 4643.7 709.429 4643.7C704.429 4643.7 705.929 4662.7 715.429 4659.2C725.75 4655.4 857.429 4606.7 934.929 4659.2C1021.06 4717.55 904.066 4852.46 996.429 4932.2C1052.93 4980.98 1126.25 4918.42 1217.93 4902.2C1304.96 4886.8 1448.39 4903.64 1408.93 4993.7C1360.93 5103.24 1008.43 5104.2 996.429 5029.2C988.45 4979.33 1069.93 4967.7 1033.93 5029.2C998.437 5089.83 1050.43 5143.2 1117.93 5126.2C1187.58 5108.66 1201.93 5145.7 1266.43 5134.2C1330.93 5122.7 1330.51 5098.68 1371.43 5102.7C1401.93 5105.7 1421.43 5130.7 1439.93 5110.2C1453.13 5097 1470.01 5104.99 1472.01 5110.49C1467.15 5099.01 1471.63 5080.33 1476.93 5080.33C1481.17 5080.33 1483.91 5092.57 1484.75 5098.69C1484.23 5093.73 1484.62 5083.65 1490.37 5083.05C1497.56 5082.29 1497.37 5104.37 1497.56 5106.58M1506.52 5098.69C1506.87 5102.98 1507.05 5104.77 1507.09 5105.13M1510.31 5078.25C1511.69 5087.34 1512.89 5100.02 1513.52 5103.3M1549.36 5078.25C1537.81 5106.01 1546.46 5115.6 1551.44 5106.83C1553.73 5102.8 1554.65 5100.66 1554.9 5099.61M1554.9 5099.61C1555.09 5098.84 1554.91 5098.66 1554.66 5098.76C1554.72 5099.03 1554.8 5099.31 1554.9 5099.61ZM1554.9 5099.61C1555.85 5102.43 1558.63 5106.13 1564.06 5103.3C1571.57 5099.39 1572.89 5082.29 1564.06 5077.05M1571.44 5097.31C1574.41 5099.39 1578.63 5094.34 1575.04 5093.71C1571.44 5093.08 1568.73 5101.03 1575.04 5102.54C1580.09 5103.75 1583.53 5098.88 1584.63 5096.3C1585.05 5097.79 1586.61 5100.57 1587.72 5101.28M1582.42 5086.45C1583.28 5087.31 1583.83 5087.36 1584 5087.27M1585.76 5072.7C1587.33 5088.55 1590.71 5096.68 1592.2 5098.76M1595.98 5097.31C1596 5097.3 1596.01 5097.3 1596.02 5097.3M1596.02 5097.3C1602.73 5094.9 1599.77 5090.56 1597.88 5091.88C1596.73 5092.69 1595.44 5095.28 1596.02 5097.3ZM1596.02 5097.3C1596.39 5098.6 1597.54 5099.66 1600.02 5099.83C1606.16 5100.26 1606.82 5092.33 1605.7 5091.31M1605.7 5091.31C1605.67 5091.28 1605.74 5091.33 1605.7 5091.31ZM1605.7 5091.31C1605.74 5091.33 1605.67 5091.28 1605.7 5091.31ZM1605.7 5091.31C1606.82 5092.33 1607.41 5096.57 1607.64 5098.87M1607.64 5098.87C1607.65 5098.92 1607.65 5098.97 1607.66 5099.01M1607.64 5098.87C1607.36 5095.78 1608.61 5090.51 1615.92 5093.14M1504.06 5085.38C1504.12 5085.63 1504.44 5085.89 1504.38 5086.01M1622 5099.01V5099M1520.02 5097.94C1517.84 5105.83 1527.71 5104.34 1529.04 5100.08C1530.03 5096.92 1529.38 5094.3 1525.83 5094.09C1523.3 5093.94 1521.22 5095.29 1520.02 5097.94Z" stroke="#FFF5EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> */}
          {letters.map((letter, i) => {
            // console.log(letter.props)
            return <PathGSAPStandalone {...letter.props} key={i} tweens={[{
              id: 'letterTween' + i,
              timeline: scrubTl,
              ratio: 1,
              attr: {
                duration: i === 0 ? 100 : 5,
                // ease: 'ease.inout',
                // onStart:()=>{console.log('start One')} 
              },
              position: i === 0 ? 0 : 100 + 6 * (i - 1),
            }]} />
          })}

          {/* <PathGSAPStandalone tweens={[{
            timeline: scrubTl,
            ratio: 1,
            attr: {
              duration: 100,
              // ease: 'ease.inout',
              // onStart:()=>{console.log('start One')} 
            },
            position: 0,
          }]} id="m" d="M702.428 4636.7C698.428 4636.7 697.929 4672.2 700.929 4672.2C703.929 4672.2 708.556 4639.2 705.428 4639.2C701.428 4639.2 700.946 4669.2 705.428 4669.2C709.911 4669.2 714.429 4643.7 709.429 4643.7C704.429 4643.7 705.929 4662.7 715.429 4659.2C725.75 4655.4 857.429 4606.7 934.929 4659.2C1021.06 4717.55 904.066 4852.46 996.429 4932.2C1052.93 4980.98 1126.25 4918.42 1217.93 4902.2C1304.96 4886.8 1448.39 4903.64 1408.93 4993.7C1360.93 5103.24 1008.43 5104.2 996.429 5029.2C988.45 4979.33 1069.93 4967.7 1033.93 5029.2C998.437 5089.83 1050.43 5143.2 1117.93 5126.2C1187.58 5108.66 1201.93 5145.7 1266.43 5134.2C1330.93 5122.7 1330.51 5098.68 1371.43 5102.7C1401.93 5105.7 1421.43 5130.7 1439.93 5110.2C1453.13 5097 1470.01 5104.99 1472.01 5110.49C1467.15 5099.01 1471.63 5080.33 1476.93 5080.33C1481.17 5080.33 1483.91 5092.57 1484.75 5098.69C1484.23 5093.73 1484.62 5083.65 1490.37 5083.05C1497.56 5082.29 1497.37 5104.37 1497.56 5106.58" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> */}


        </g>}



    </AnimateSVG>


  </>
  )
}