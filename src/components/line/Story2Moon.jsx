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
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
// import useStateRef from "@/utils/useStateRef"
gsap.registerPlugin(ScrollTrigger)

export default function Story2Moon({ scrollMin, scrollMax, speed, setSvgHeight, setSvgWidth, banner }) {

  let { locale, scrolled } = useAppContext()

  let { mobile } = usePageContext()
  const ctx = useRef(gsap.context(() => { }));
  let tl = useRef()
  // let [tl] = useRef()
  let [started, setStarted] = useState(false)

  let [fakeScroll1, setFakeScroll1] = useState({ scroll: 0 })
  let [fakeScroll2, setFakeScroll2] = useState({ scroll: 0 })
  let [fakeScroll3, setFakeScroll3] = useState({ scroll: 0 })
  let [fakeScroll4, setFakeScroll4] = useState({ scroll: 0 })
  let [fakeScroll5, setFakeScroll5] = useState({ scroll: 0 })


  let [animateStroke1, setAnimateStroke1] = useState({ animate: false })
  let [animateStroke2, setAnimateStroke2] = useState({ animate: false })
  let [animateSun, setAnimateSun] = useState({ animate: false })

  useEffect(() => {
    return () => ctx.current.revert();
  }, []);

  useEffect(() => {
    // let tl;
    let timer = setTimeout(() => {
      ctx.current.add(() => {
        tl.current = gsap.timeline()
          .to(fakeScroll1, {
            scroll: 1000,
            ease: 'power2.inout',
            duration: 5,
            onUpdate: () => { setFakeScroll1({ ...fakeScroll1 }) }
          })
          .set(animateSun, {
            animate: true,
            // ease: 'power2.inout',
            // duration: 3,
            onUpdate: () => { setAnimateSun({ ...animateSun }) }
          }, '-=3')
          .set(animateStroke1, {
            animate: true,
            // ease: 'power2.inout',
            // duration: 3,
            onUpdate: () => { setAnimateStroke1({ ...animateStroke1 }) }
          }, '-=1')
          .to(
            [
              fakeScroll2,


            ],
            {
              scroll: 1000,
              ease: 'power2.out',
              duration: 2,
              stagger: 0.05,
              onUpdate: () => { setFakeScroll2({ ...fakeScroll2 }); setFakeScroll3({ ...fakeScroll3 }) }
            }, '<-=1')
          .to('#circle', {
            opacity: 1,
            // scale: 2,
            ease: 'power2.inout',
            duration: 2,
            // yoyo:true,
            // onUpdate: () => { setFakeScroll1({ ...fakeScroll1 }) }
          }, '<+=2')
          .to('#circle', {
            scale: 3,
            ease: 'power2.inout',
            duration: 4,
            transformOrigin: '50% 50%',
            yoyo: 'repeat',
            // onUpdate: () => { setFakeScroll1({ ...fakeScroll1 }) }
          }, '<')

        // .to(fakeScroll45, {
        //   scroll: 200,
        //   ease: 'power2.inout',
        //   // ease: 'back',
        //   duration: 3,
        //   yoyo: 'repeat',
        //   onUpdate: () => { setFakeScroll45({ ...fakeScroll45 }) }
        // }, '<+=3')
        // .to(fakeScroll45, {
        //   scroll: 180,
        //   ease: 'power2.inout',
        //   // ease: 'back',
        //   duration: 2,
        //   yoyo: true,
        //   repeat: started ? 0 : -1,
        //   onUpdate: () => { setFakeScroll45({ ...fakeScroll45 }) }
        // },'<+=0.5')
      }
      )
    }, 200)

    return () => {
      // console.log('timer cleared')
      clearTimeout(timer);
    }
  }, [])
  // console.log(scrolled)

  useEffect(() => {

  }, [])



  let colorPrimary = "#FFF5EA";
  let n = 0;




  return (<>
    <AnimateSVG alt='miloweiler photography logo animation'
      scrollMin={scrollMin} scrollMax={scrollMax} speed={speed} setSvgHeight={setSvgHeight} setSvgWidth={setSvgWidth}>

      {mobile ?
        <g id='mobile'>
          <Path scrolled={fakeScroll1} drawDuration='1' position={0} inverse={false} id="toAstridMob" d="M351 170C351 332.5 61.9999 266.5 20.5009 410C3.06634 470.287 61.5011 539 118 515" stroke="#FFFAEA" strokeWidth="2" strokeLinecap="round" />
        </g> :
        <g id='desktop'>
          {/* left */}
          <Path mask="url(#mask0_322_1018)" transitStrokeAnimation transitPortion={0.65} drawDuration='2' animateStroke={true} strokeColor={animateStroke1.animate ? 'transparent' : colorPrimary} fillColor={colorPrimary} lineSpeed={1} scrolled={fakeScroll1.scroll / 1000} inverse={false} double={1} lengthFactor={1} id="lineLeft" d="M24.5 1C235.277 145.095 335.5 -38.5 422 24.5C459.603 51.8869 436.304 151.775 509 173C577.5 193 616 152.13 661.5 164C700 174.043 711.04 196.18 746.5 208C768 215.167 796.5 218.5 816 188.5C842.385 154.12 888.5 141.526 928 160.5C967.5 179.474 994.808 240.5 968.5 282.5C942.192 324.5 889 346.268 841.5 317.5C803.571 294.529 783 239.5 816 189.5C828 172.5 854.5 152 883.5 153" stroke="black" stroke-width="2" />
          {/* 

        <circle opacity={0} id="circle" cx="942" cy="365" r="2" fill={colorPrimary} />
        <Path id="beam" fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll45.scroll / 1000} animateStroke={false} inverse={true} double={1} lengthFactor={1} d="M1332 1205C1322 1183 1323 1165.5 1343.5 1129.5C1364 1093.5 1296.7 1094.72 1277.5 1061C1257 1025 1333.2 989.941 1306 938.5C1283 895 1204.5 921.5 1163 833.5L942 365" stroke="black" stroke-width="2" stroke-linecap="round" />

        <circle opacity={0} id="circleScroll" cx="942" cy="365" r="2" fill={colorPrimary} />
        <Path id="beamScroll" fillColor={animateStroke2.animate ? colorPrimary : 'transparent'} drawDuration='0.7' scrolled={fakeScroll46.scroll / 1000} animateStroke={false} inverse={true} double={1} lengthFactor={1} d="M1332 1205C1322 1183 1323 1165.5 1343.5 1129.5C1364 1093.5 1296.7 1094.72 1277.5 1061C1257 1025 1333.2 989.941 1306 938.5C1283 895 1204.5 921.5 1163 833.5L942 365" stroke="black" stroke-width="2" stroke-linecap="round" /> */}



          <mask id="mask0_322_1018" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-178" y="-41" width="1247" height="431">
            <path id="SunMask" fillRule="evenodd" clipRule="evenodd" d="M1079 -46H-168V385H1079V-46ZM883.697 366.983C888.904 370.381 894.113 372.649 901.001 374.517C902.464 374.913 903.309 375.225 902.878 375.21C898.591 375.056 891.861 374.021 887.069 372.778C866.271 367.382 849.162 353.049 841.155 334.312C831.973 312.826 834.54 288.787 848.167 268.655C861.179 249.432 882.365 237 906.223 234.588C910.929 234.113 920.487 234.358 925.09 235.072C945.243 238.199 962.925 249.262 973.373 265.279C978.608 273.305 981.897 281.887 983.487 291.662C984.25 296.355 984.245 306.229 983.476 311.046C982.292 318.457 979.821 326.249 976.642 332.588C975.366 335.133 972.089 340.591 971.837 340.591C971.759 340.591 971.929 340.063 972.214 339.418C973.415 336.704 975.15 331.141 975.748 328.085C980.263 305.032 970.378 282.725 950.286 270.627C943.456 266.515 935.201 263.701 927.408 262.828C924.703 262.525 915.962 262.512 913.046 262.807C902.696 263.853 891.459 268.384 882.544 275.105C865.66 287.832 856.734 308.132 859.219 328.153C861.216 344.238 869.862 357.954 883.697 366.983Z" fill="#D9D9D9" />
          </mask>
        </g>
      }

    </AnimateSVG>


  </>
  )
}