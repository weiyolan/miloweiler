import React, {useState, useEffect, useRef} from "react"
import { useAppContext } from "@utils/appContext.js"
import { Path} from '@/components/line/pathUtils'
// import { SVGWrapper } from "./contextSVG"
import { usePageContext } from "@utils/pageContext"
import AnimateSVG from './AnimateSVG'

export default function Story11Women({ scrollMin, scrollMax, speed }) {
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
    <AnimateSVG alt='Story Part 11, the sign of women' scrollMin={scrollMin} scrollMax={scrollMax} animationSpeed={speed}>

      {mobile ? <g id='mobile'>
      <Path position={0} id="tofemalePath" d="M66.4999 4167.5C-47.0002 4470 528 4095.5 528 4363.5" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round"/>
      <Path position={1} animateFill={true} animateStroke={true} id="femaleSign" fill-rule="evenodd" clip-rule="evenodd" d="M535.439 4494.52C567.87 4490.61 593 4462.99 593 4429.5C593 4393.33 563.675 4364 527.5 4364C491.325 4364 462 4393.33 462 4429.5C462 4462.99 487.13 4490.61 519.561 4494.52V4514.85H497.727V4530.73H519.561V4551.97H535.439V4530.73H555.367V4514.85H535.439V4494.52ZM527.5 4481.75C498.64 4481.75 475.245 4458.36 475.245 4429.5C475.245 4400.64 498.64 4377.25 527.5 4377.25C556.36 4377.25 579.755 4400.64 579.755 4429.5C579.755 4458.36 556.36 4481.75 527.5 4481.75Z" fill="#FFFAEA"/>

      </g> : <g id='desktop'>
        <Path position={0} id="tofemalePath" d="M541 1689C452 1826 118.5 1496.4 118.5 1730" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round" />
        <Path position={1} animateFill={true} animateStroke={true} id="femaleSign" fill-rule="evenodd" clip-rule="evenodd" d="M127.439 1860.52C159.87 1856.61 185 1828.99 185 1795.5C185 1759.33 155.675 1730 119.5 1730C83.3253 1730 54 1759.33 54 1795.5C54 1828.99 79.1302 1856.61 111.561 1860.52V1880.85H89.7273V1896.73H111.561V1917.97H127.439V1896.73H147.367V1880.85H127.439V1860.52ZM119.5 1847.75C90.6404 1847.75 67.2451 1824.36 67.2451 1795.5C67.2451 1766.64 90.6404 1743.25 119.5 1743.25C148.36 1743.25 171.755 1766.64 171.755 1795.5C171.755 1824.36 148.36 1847.75 119.5 1847.75Z" fill="#FFFAEA" />
      </g>}

    </AnimateSVG>
  )
}