import React, {useState, useEffect, useRef} from "react"
import { useAppContext } from "@utils/appContext.js"
import { Path} from '@/components/line/pathUtils'
// import { SVGWrapper } from "./contextSVG"
import { usePageContext } from "@utils/pageContext"
import AnimateSVG from './AnimateSVG'

export default function Story7SunMoon({ scrollMin, scrollMax, speed }) {

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
    // <AnimateSVG print={false} alt='Story Part 7, a minimalistic and elegant representation of the sun and moon.' scrollMin={scrollMin} scrollMax={scrollMax} animationSpeed={speed}>
    <>
      {
        mobile ?
          <AnimateSVG print={false} alt='Story Part 7, a minimalistic and elegant representation of the sun and moon.' scrollMin={scrollMin} scrollMax={scrollMax} animationSpeed={speed}>
            <g id='mobile7'>
<Path  position={0} lengthFactor={1.5} id="spireeSunConnect" d="M93.4991 2334.5C140.499 2409 28 2508.5 68.5 2554.5C97.5703 2587.52 136.499 2541 233.999 2541" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round"/>
              <Path shadowSmall position={1} drawDuration={3} strokeWidth={6} inverse={false} id="SunMob" d="M233 2541.11C314.738 2541.11 381 2607.35 381 2689.06C381 2770.76 314.738 2837 233 2837C151.262 2837 85 2770.76 85 2689.06C85 2610.31 140.57 2542.69 231.499 2541" stroke="#FFFAEA" stroke-width="6" stroke-linecap="round" />
              <Path shadowSmall position={2} drawDuration={3} strokeWidth={6} inverse={true} id="MoonMob" d="M529.358 2988.08C505.933 2996.02 480.202 2998.16 454.204 2993.11C374.186 2977.57 321.927 2899.82 337.48 2819.44C347.897 2765.6 386.097 2724.24 434.233 2707.47" stroke="#FFFAEA" stroke-width="6" stroke-linecap="round" />

            </g>
          </AnimateSVG >
          :
          <AnimateSVG id='desktop7' print={false} alt='Story Part 7, a minimalistic and elegant representation of the sun and moon.' scrollMin={scrollMin} scrollMax={scrollMax} animationSpeed={speed}>
            <g id='desktop7'>
              <Path print={false} position={0} lengthFactor={1.5} id="spireeSunConnect" d="M275.5 1214.5C322.5 1289 362 1194 402 1194C442 1194 469.096 1239 516.5 1259.5C563.904 1280 625.049 1286.01 672 1280" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round" />
              <Path shadowSmall position={1} drawDuration={3} strokeWidth={6} inverse={true} id='Sun' d="M669.351 1279.99C592.871 1279.99 530.872 1217.76 530.872 1141C530.872 1064.23 592.871 1002 669.351 1002C745.831 1002 807.83 1064.23 807.83 1141C807.83 1214.97 755.835 1278.51 670.755 1280.1" stroke="#FFFAEA" stroke-width="6" stroke-linecap="round" />
              <Path shadowSmall position={2} drawDuration={3} strokeWidth={6} inverse={true} id="Moon" d="M947.452 1421.47C925.474 1428.93 901.332 1430.94 876.939 1426.2C801.862 1411.62 752.829 1338.66 767.422 1263.24C777.196 1212.73 813.037 1173.92 858.201 1158.19" stroke="#FFFAEA" stroke-width="6" stroke-linecap="round" />
            </g>

          </AnimateSVG>
      }
      </>
  )
}