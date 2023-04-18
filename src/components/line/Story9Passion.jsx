import React, {useState, useEffect, useRef} from "react"
import { useAppContext } from "@utils/appContext.js"
import { Path} from '@/components/line/pathUtils'
// import { SVGWrapper } from "./contextSVG"
import { usePageContext } from "@utils/pageContext"
import AnimateSVG from './AnimateSVG'
export default function Story9Passion({ scrollMin, scrollMax, speed }) {

  let { locale } = useAppContext();
  let { mobile } = usePageContext()
  // let [fakeScroll1,setFakeScroll1] = useState(0)
  // // let [fillStyle1,setFillStyle1] = useState(false)
  // // let [strokeColor1, setStrokeColor1] = useState('#FFFAEA')

  // let [fakeScroll2,setFakeScroll2] = useState(0)
  // let [fillStyle2,setFillStyle2] = useState(false)
  // let [strokeColor2, setStrokeColor2] = useState('#FFFAEA')

  // useEffect(()=>{
  //   let timer = setTimeout(()=>{setFakeScroll1(1)},500)
  //     // let timer2 = setTimeout(()=>{setFillStyle(true)},2000)
  //   let timer2 = setTimeout(()=>{setFakeScroll2(1)},1200)
  //   let timer3 = setTimeout(()=>{setFillStyle2(true);setStrokeColor2('transparent')},3200)
  //   return ()=>{
  //     clearTimeout(timer)
  //     clearTimeout(timer2)
  //     clearTimeout(timer3)
  //   }
  // },[])

  return (
    <AnimateSVG alt='Story Part 9, heart shaped line' scrollMin={scrollMin} scrollMax={scrollMax} animationSpeed={speed}>

      {mobile ? <g id='mobile'>
        <Path inverse={true} position={0}  id="heartPathMob" d="M121 3984.5C163.5 3843.5 44.5 3831.19 44.5 3767.5C44.5 3703.81 181.387 3615.77 200.5 3561C213.761 3523 165.243 3508.04 141.16 3543C143.853 3512.11 103.929 3499.57 87 3524C70.071 3548.43 79.3989 3571.5 98.4726 3596.95C121 3627 309.329 3782.17 292.798 3851.94L477.5 3740.44L483.987 3934.5C660.892 3812.5 692.812 3853.85 692.812 3853.85C624.925 3798.77 509.499 3536.5 545.999 3332" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

      </g> : <g id='desktop'>
        <Path inverse={true} position={0} id="heartPath" d="M643.001 1527C666.501 1496.5 721.001 1455.5 764.001 1492C799.932 1522.5 748.501 1594 764.001 1623C781.182 1655.14 826.001 1608.23 858.001 1623C890.001 1637.77 865.677 1707.8 899.177 1724.45C917.179 1733.39 1012.35 1709.5 1017.84 1680.5C1022.62 1655.26 989.854 1647.93 974 1670.5C976.692 1639.61 950.771 1623.02 933.842 1647.45C916.913 1671.88 925.445 1709.93 931.312 1724.45C956.961 1787.9 1082.9 1801.4 1066.37 1871.17L1251.07 1759.67L1257.56 1953.73C1434.47 1831.73 1466.39 1873.08 1466.39 1873.08C1398.5 1818 1259.5 1656.5 1296 1452" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </g>}

    </AnimateSVG>
  )
}