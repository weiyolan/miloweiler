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
import Image from "next/image"
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
          {/* <path id="Leg" d="M942 365L1163 833.5C1204.5 921.5 1283 895 1306 938.5C1333.2 989.941 1257 1025 1277.5 1061C1296.7 1094.72 1364 1093.5 1343.5 1129.5C1323 1165.5 1322 1183 1332 1205C1356.12 1261.47 1415.35 1271.24 1399.31 1298.87M1297.21 1293.98C1288.68 1324.73 1396.11 1355.33 1399.31 1339.2M1297.21 1342.38C1291.54 1365.11 1390.5 1403.73 1394.14 1383.93M1297.21 1394.69C1294.74 1415.96 1385.49 1424.58 1390.19 1406.91M1301.4 1454.09C1292.03 1476.58 1351.96 1480 1345.06 1503.47M1295.73 1511.78C1294.5 1500.04 1347.52 1502.24 1345.06 1524.24M1294.5 1546.49C1288.08 1527.42 1346.29 1536.47 1328.28 1561.89C1322.63 1569.88 1325.08 1577.7 1325.08 1590" stroke="#FF0000" stroke-width="2" stroke-linecap="round" /> */}
          {/* <path id="beforeDrop" d="M1325 1591C1325 1683.5 1146 1722.5 1102 1722.5C1058 1722.5 901.494 1712.5 889.5 1656C878.892 1606.03 940.947 1605 933 1656C928.059 1687.71 911.25 1686.5 911.25 1757.5" stroke="#FF0000" stroke-width="2" stroke-linecap="round" /> */}

        </g>
      }

    </AnimateSVG>

  </>
  )
}