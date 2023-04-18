import React, {useState, useEffect, useRef} from "react"
import { useAppContext } from "@utils/appContext.js"
import { Path} from '@/components/line/pathUtils'
// import { SVGWrapper } from "./contextSVG"
import { usePageContext } from "@utils/pageContext"
import AnimateSVG from './AnimateSVG'

export default function Story5Meaning({ scrollMin, scrollMax, speed }) {

  let {locale } = useAppContext();
  let {mobile} = usePageContext()

  return (
    <AnimateSVG alt='Story Part 5, the meaning of Spirée' scrollMin={scrollMin} scrollMax={scrollMax} animationSpeed={speed}>

        {mobile? 
        <g id='mobile'>
          <Path position={0} lengthFactor={1} id="fromFlowerPathMob" d="M251.5 1737C294 1790.5 333.934 1784.77 393 1771.5C437.5 1761.5 514 1796 514 1865" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round"/>
          {/* <UseFlower at={scrollMin+0.02} pos={0} lengthFactor={1.5} transform='translate(-200, 620) rotate(-15) scale(0.65)'/> */}
        
        </g>: 
        
        <g id='desktop'>
        <Path print={false}  position={0} lengthFactor={1} id="fromFlowerPath" d="M716.51 691C639.848 562.562 449.69 615.034 419.01 717.5" stroke="#FFFAEA" strokeWidth="2" stroke-linecap="round" />
        {/* <UseFlower at={scrollMin+0.02} pos={0} transform= 'translate(-645, 310) rotate(50) scale(0.7)' /> */}
        {/* <UseFlower at={start + 12 * diff} pos={12} transform= 'translate(-420, 475) rotate(10) scale(0.7)'/> */}

        </g>

      }


    </AnimateSVG>
  )
}