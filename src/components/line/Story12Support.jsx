import React, {useState, useEffect, useRef} from "react"
import { useAppContext } from "@utils/appContext.js"
import { Path} from '@/components/line/pathUtils'
// import { SVGWrapper } from "./contextSVG"
import { usePageContext } from "@utils/pageContext"
import AnimateSVG from './AnimateSVG'

export default function Story12Support({ scrollMin, scrollMax, speed }) {

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
    <AnimateSVG alt='Story Part 12, lines curling to direct attention to the Join Button' scrollMin={scrollMin} scrollMax={scrollMax} animationSpeed={speed}>
      {mobile ? <g id='mobile'>
        <Path position={0} id="femalePathOuter" d="M554.499 4523.5C606.5 4523.5 575.5 4585 559 4604.5C520.949 4649.47 414.477 4602.28 419.14 4661C422.296 4700.74 499.574 4716.32 490.999 4754.5C485.1 4780.76 407.046 4784.69 409.5 4811.5C411.468 4833.01 436.425 4820 449.425 4854.5M497.499 4523.5C453.999 4523.5 454.5 4555.5 491 4589.5C509.676 4606.9 570 4635 554.499 4661C530.948 4700.5 390.618 4684.23 419.14 4735.5C427.041 4749.7 470 4757.5 464 4785.5C458 4813.5 435.499 4817.5 448.499 4852C461.499 4886.5 458.157 4903.25 441 4930.5C424 4957.5 386.5 4954 372.5 4987.5" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round" />
        <Path position={0} id="femalePathMiddle" d="M528 4552C528 4624 547.414 4649 528 4680C497 4729.5 431.501 4668.5 459.5 4649.5C490.016 4628.79 509.226 4697.13 495.5 4727C481.774 4756.87 444.708 4772.23 442 4795C438.477 4824.62 499.863 4824.18 495.5 4849.5C490.974 4875.77 434.526 4861.5 437.5 4885.5C438.852 4896.41 461.816 4919.26 460 4930.11C455.611 4956.31 406.766 4955.04 384 4972C356.878 4992.21 383.899 5027.14 346 5027.14L233.5 5027.14C203.4 5027.14 178.999 5051.54 178.999 5081.64C178.999 5111.73 203.4 5136.14 233.499 5136.14L465.499 5136.14C495.599 5136.14 519.999 5111.73 519.999 5081.64C519.999 5051.54 495.599 5027.14 465.499 5027.14L346.5 5027.14" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round" />
      </g> : <g id='desktop'>
        <Path position={0} id="femalePath" d="M90 1889C-10.1117 1888.54 55 2024.5 121.5 2037.5C188 2050.5 265.312 1987.49 285 2047.88C304.688 2108.28 335.944 2120.5 387.5 2106C439.056 2091.5 440.972 2138.38 480 2146.1C515.529 2153.12 543.383 2138.11 576 2157.5C587.927 2164.59 594.186 2181 613 2180.5C632.991 2179.97 639 2158 662.5 2151C679.857 2145.83 694.5 2152 706 2171.5M147 1889C252.271 1895.39 183 1987.5 159.5 2020.5C121.843 2073.38 193.636 2105.04 237 2087.5C354.118 2040.14 329.784 2153.01 387.5 2125.5C434.753 2102.97 431.853 2153.59 464 2157.5C494.538 2161.21 523.5 2142.47 555 2149.09" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round" />
        <Path position={0} id="femalePathMiddle" d="M119.5 1917C119.5 1960.9 117.671 1999.29 148.5 2037.5C212.326 2116.61 293.357 2008.4 234 1997C175.139 1985.7 187.325 2081.92 259 2093C291.621 2098.04 312.755 2054.42 348.5 2065.5C401.849 2082.04 363.5 2160 436.5 2146C451.774 2143.07 469.627 2124.36 485 2129C501.22 2133.89 502 2161.5 524.5 2161.5C545.67 2161.5 566.077 2150.57 585.5 2154C602.5 2157 613.054 2176.01 635 2172.5C658.566 2168.73 671.154 2148.23 693.5 2159C714.491 2169.12 715 2212.13 737 2212.13H849.5C879.6 2212.13 904 2236.53 904 2266.63C904 2296.73 879.6 2321.13 849.5 2321.13H617.5C587.401 2321.13 563 2296.73 563 2266.63C563 2236.53 587.401 2212.13 617.5 2212.13H736.5" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round" />
      </g>}

    </AnimateSVG>
  )
}