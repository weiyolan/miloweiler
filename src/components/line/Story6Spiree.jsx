import React, {useState, useEffect, useRef} from "react"
import { useAppContext } from "@utils/appContext.js"
import { Path} from '@/components/line/pathUtils'
// import { SVGWrapper } from "./contextSVG"
import { usePageContext } from "@utils/pageContext"
import AnimateSVG from './AnimateSVG'

export default function Story6Spiree({ scrollMin, scrollMax, speed }) {

  let { locale } = useAppContext()
  let { mobile } = usePageContext()
  // console.log(mobile)
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
    <AnimateSVG alt='Story Part 6, the logo of Spirée' scrollMin={scrollMin} scrollMax={scrollMax} animationSpeed={speed}>

      {mobile ?
        <g id='mobile'>
          <Path drawDuration='1' position={0} lengthFactor={0.8} id="toSpireePathMob" d="M514.501 2025C514.501 2123.44 233.443 2130.47 182.5 2004C154.29 1933.97 211.914 1921.78 229.5 1966C264.878 2054.96 113.075 2128.22 149.5 2200.5" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round"/>
          <Path animateFill={true} animateStroke={true} lengthFactor={1} drawDuration='1' position={1} id="SpireeMob" fill-rule="evenodd" clip-rule="evenodd" d="M209.936 2301.46L149.469 2198L93.0273 2294.58L92.5434 2293.74C81.8031 2275.27 71.0282 2256.74 59.8658 2241.5C45.6011 2222.02 29.3963 2205.3 8.32564 2205.3H5V2226.11H8.32564C12.7148 2226.11 17.9484 2228.28 23.9386 2233.01C29.8871 2237.71 36.2683 2244.7 42.8838 2253.73C53.12 2267.71 63.4564 2285.46 74.2021 2303.91L74.203 2303.91C77.4222 2309.44 80.6782 2315.03 83.9791 2320.6L93.0889 2335.98L149.469 2239.51L191.757 2311.87L203.882 2332.75H228.102L209.936 2301.46Z" fill="#FFFAEA" />
        </g> :
        <g id='desktop'>
          <Path print={false} drawDuration='1' position={0} id="toSpireePath" d="M343.5 843C287.99 938.5 80.5098 924 34.01 896.5C-30.9772 858.066 11.51 800.961 64.5 843C139.5 902.5 -49.5003 1038.22 53.9998 1090" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round" />
          <Path print={false} animateFill={true} animateStroke={true} drawDuration='1' position={1} id="Spiree" fill-rule="evenodd" clip-rule="evenodd" d="M258.61 1184.87L198.144 1081.41L141.702 1177.99L141.218 1177.15C130.478 1158.68 119.703 1140.15 108.54 1124.91C94.2755 1105.43 78.0707 1088.7 57 1088.7H53.6744V1109.52H57C61.3892 1109.52 66.6227 1111.69 72.613 1116.42C78.5615 1121.12 84.9427 1128.11 91.5582 1137.14C101.794 1151.12 112.131 1168.87 122.876 1187.32L122.877 1187.32C126.097 1192.85 129.353 1198.44 132.653 1204.01L141.763 1219.39L198.144 1122.92L240.432 1195.28L252.556 1216.16H276.777L258.61 1184.87Z" fill="#FFFAEA" />
        </g>}

    </AnimateSVG>
  )
}