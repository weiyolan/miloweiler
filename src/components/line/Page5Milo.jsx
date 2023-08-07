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



export default function Page5Milo({ scrollMin, scrollMax, scrubTl, transitionTl, speed, id }) {

  let { locale, scrolled, width, height } = useAppContext()
  let [refresh, setRefresh] = useState(0)
  let { mobile } = usePageContext()
  // const ctx = useRef(gsap.context(() => { }));
  let [myPosition, setMyPosition] = useState({ x: 0.73, y: 0.38 })


  // let letterTween =
  // {
  //   timeline: scrubTl,
  //   ratio: 1,
  //   attr: {
  //     duration: 100,
  //     // ease: 'ease.inout',
  //     // onStart:()=>{console.log('start One')} 
  //   },
  //   position: 0
  // }


  // useEffect(() => {
  //   transitionTl && transitionTl
  //     .to('.svgMilo',{

  //     })
  // }, [transitionTl])

  useEffect(() => {
    setRefresh((n) => n + 1)
  }, [scrubTl])

  let colorPrimary = "#FFF5EA";
  let n = 0;

  let letters = [
    <path key={0} id="m" d="M4.42839 2.70259C0.42839 2.70259 -0.071311 38.202 2.92869 38.202C5.92869 38.202 10.5561 5.20266 7.42828 5.20266C3.42828 5.20266 2.94565 35.202 7.42828 35.202C11.9109 35.202 16.4287 9.70267 11.4287 9.70267C6.42869 9.70267 7.92869 28.702 17.4287 25.202C27.7505 21.3993 159.429 -27.2987 236.929 25.2017C323.058 83.5479 206.066 218.461 298.429 298.201C354.929 346.98 428.245 284.421 519.929 268.201C606.956 252.804 750.391 269.641 710.929 359.701C662.929 469.244 310.429 470.201 298.429 395.201C290.45 345.335 371.929 333.701 335.929 395.201C300.437 455.833 352.429 509.201 419.929 492.201C489.579 474.659 503.929 511.701 568.429 500.201C632.929 488.701 632.514 464.676 673.429 468.701C703.929 471.701 723.429 496.701 741.929 476.201C755.129 463.001 772.01 470.993 774.01 476.493C769.152 465.01 773.631 446.335 778.931 446.335C783.171 446.335 785.913 458.575 786.754 464.694C786.229 459.731 786.616 449.653 792.37 449.048C799.562 448.291 799.373 470.373 799.562 472.581" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key={1} id="i" d="M808.46 464.994C808.814 469.284 808.986 471.071 809.028 471.429" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key={2} id="ib" d="M806 451.682C806.063 451.934 806.379 452.186 806.315 452.313" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key={3} id="l" d="M812.246 444.552C813.634 453.637 814.833 466.319 815.464 469.6" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key={4} id="o" d="M830.335 465.382C829.005 469.642 819.133 471.127 821.313 463.237C822.512 460.587 824.586 459.235 827.118 459.388C830.669 459.603 831.322 462.224 830.335 465.382Z" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key={5} id="w" d="M850.651 443.552C839.105 471.313 847.748 480.902 852.733 472.133C856.72 465.117 856.539 463.826 855.95 464.057C855.66 466.994 859.198 471.749 865.351 468.6C872.887 464.742 874.184 447.59 865.351 442.354" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key={6} id="ei" d="M872.733 462.606C875.698 464.688 879.925 459.641 876.329 459.01C872.733 458.379 870.02 466.328 876.329 467.843C881.376 469.054 884.825 464.183 885.919 461.596C886.34 463.09 887.9 465.874 889.011 466.581" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key={7} id="ei2" d="M883.711 451.754C884.569 452.612 885.12 452.658 885.288 452.574" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key={8} id="l2" d="M887.055 438C888.619 453.849 891.997 461.975 893.49 464.057" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key={9} id="er" d="M897.276 462.605C904.025 460.208 901.814 456 899.5 457C894.775 459.042 896.808 465.192 901.5 465C907 464.5 908 459 907 457C906 455 909 462 909 464.5C909 464.5 908.39 454.753 917 458.5" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    , <path key={10} id="punt" d="M923.291 464.309V464.299" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  ]

  //==============X FROM CENTER, Y INVERSED FROM TOP============
  // let originalY = 0.630861
  let originalY = 1 - 0.39112
  let originalX = 0.7362
  let r2 = 618 / 816
  let r1 = width / (height * 2)

  function getY() {
    if (r2 / r1 < 1) {
      return 1 - (originalY - (1 - r2 / r1) / 2) * r1 / r2
    } else return 1 - originalY
  }

  function getX() {
    if (r2 / r1 < 1) {
      return originalX
    } else {
      return (originalX - (1 - r1 / r2) / 2) * r2 / r1
    }
  }

  useEffect(() => {

    setMyPosition({ x: getX(), y: getY() })

  }, [width, height])
  //==============FROM CENTER============


  return (<>

    <svg style={{ left: `calc(50vw*${myPosition.x})`, top: `calc(30vh + ${myPosition.y * 100}%)` }} className={`fixed ${width / height > 2.025 ? 'w-[55%]' : 'w-[60%]'} h-auto svgMilo`} width="925" height="504" viewBox="0 0 925 504" fill="none" xmlns="http://www.w3.org/2000/svg">
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

        </g>}
    </svg>


  </>
  )
}