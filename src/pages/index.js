import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
// import { Lenis as ReactLenis } from '@studio-freight/react-lenis'
// import '../styles/globals.css'

import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

import { PageWrapper } from '@utils/pageContext'
import { useAppContext } from '@utils/appContext'
import Background from '@/components/Background'
import StoryTitle from '@/components/line/StoryTitle'
import Image from 'next/image'
import PageDescription from '@/components/line/PageDescription'
import Page1Photos from '@/components/line/Page1Photos'
// import ScrollVisual from '@/components/line/ScrollVisual'
import BackgroundSplit from '@/components/BackgroundSplit'
import Page2Photos from '@/components/line/Page2Photos'
import Page3Photos from '@/components/line/Page3Photos'

// import Story0Logo from '@/components/line/Story0Logo'
// import Story1Moon from '@/components/line/Story1Moon'
// import Story2Waves from '@/components/line/Story2Waves'
// import Story3Animals from '@/components/line/Story3Animals'
import PageDescription4 from '@/components/line/PageDescription4'
import Navigation from '@/components/Navigation'
import Page3KakScrub from '@/components/line/Page3KakScrub'
import Page4Kakje from '@/components/line/Page4Kakje'
import PageDescription5 from '@/components/line/PageDescription5'
import Page5Milo from '@/components/line/Page5Milo'
// import { ScrollDown } from '@/components/ScrollDown'
import NavigationMobile from '@/components/NavigationMobile'
import MobileScrollbar from '@/components/MobileScrollbar'
import Page0Logo from '@/components/line/Page0Logo'
import Page1Moon from '@/components/line/Page1Moon'
import Page2Waves from '@/components/line/Page2Waves'
import Page3Animals from '@/components/line/Page3Animals'


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);

export default function Home({ }) {
  const { scrolled, width: screenWidth, height: screenHeight, } = useAppContext();
  // let svgRef = useRef(null)
  // let ctx = useRef()
  // let tl = useRef()
  let [introAnimationTl, setIntroAnimationTl] = useState();

  let [scrubTl0, setScrubTl0] = useState();
  let [scrubTl1, setScrubTl1] = useState();
  let [scrubTl2, setScrubTl2] = useState();
  let [scrubTl3, setScrubTl3] = useState();
  let [scrubTl4, setScrubTl4] = useState();
  let [scrubTl5, setScrubTl5] = useState();

  let [transitionTl1, setTransitionTl1] = useState();
  let [transitionTl2, setTransitionTl2] = useState();
  let [transitionTl3, setTransitionTl3] = useState();
  let [transitionTl4, setTransitionTl4] = useState();
  let [transitionTl5, setTransitionTl5] = useState();

  let [pageLoaded, setPageLoaded] = useState(false)
  let [svgHeight, setSvgHeight] = useState(undefined)
  let [svgWidth, setSvgWidth] = useState(undefined)
  let [svgTop, setSvgTop] = useState(undefined) //For calculation of FadeDiv
  // let [titleHeight, setTitleHeight] = useState(undefined)
  // let [svgViewHeight, setSvgViewHeight] = useState(undefined) //For calculation of FadeDiv

  // let [mobile, setMobile] = useState(undefined)

  // let velocity = useRef(0)
  let titleCtx = useRef(gsap.context(() => { }))

  useEffect(() => {
    return () => titleCtx.current.revert()
  }, [])

  let [footerHeight, setFooterHeight] = useState(undefined)
  // let [animationLocation, setAnimationLocation] = useState({ top: undefined, bottom: undefined })
  // let [textLocation, setTextLocation] = useState({ top: undefined, bottom: undefined })

  // let [moveTracker, setMoveTracker] = useState(0) //Tracker to move background when animation moves
  // let [maxMoveTracker, setMaxMoveTracker] = useState(0) //Tracker to move background when animation moves

  let [finished, setFinished] = useState(false)
  // let [introAnimated, setIntroAnimated] = useState(false)
  // let [textAppear, setTextAppear] = useState({ textAppear: false })
  // let [textDisappear, setTextDisappear] = useState({ textDisappear: false })

  // useEffect(() => {
  //   setMobile(screenWidth < 768)
  // }, [screenWidth])
  let mobile = screenWidth < 768

  // let finishingScroll = mobile ? 0.95 : 0.995 // Same as ending of animation
  // let finishingScroll = 2 // impossible, so will never activate

  // // useEffect(() => {
  // //   if (scrolled >= finishingScroll && !finished) { setFinished(true) }
  // // }, [scrolled])
  // // useEffect(() => {
  // if (scrolled >= finishingScroll && !finished) { setFinished(true) }
  // // }, [scrolled])


  // useEffect(() => {
  //   gsap.to(window, { scrollTo: 0 })

  //   let keepScroll = () => {
  //     gsap.to(window, { scrollTo: window.scrollY })
  //   }
  //   // window.addEventListener('resize', keepScroll)
  //   // return ()=> window.removeEventListener('resize', keepScroll)
  // }, [])


  // -------WITH TITLE AND FOOTER -------------
  // let heightToScroll = (mobile || finished) ? scrollingDivHeight + titleHeight + footerHeight : 6000

  // -------WITHOUT TITLE AND FOOTER -------------
  // let heightToScroll = (mobile || finished) ? scrollingDivHeight : 6000

  // let heightToScroll = svgHeight + footerHeight
  let viewBoxWidth = mobile ? 569 : 1782;
  // real movile viewbox height = 3335
  let viewBoxHeight = mobile ? 5246 : 5142;
  let svgScrubAmount = 100; //in px
  let svgWidthFactor = viewBoxWidth / svgWidth || 1;

  // useEffect(() => {
  // console.log(svgWidth, svgHeight, svgWidth/screenWidth)
  // console.log(svgTop)
  // let height = document.getElementById('dropHeight').getBoundingClientRect().height
  // console.log(height, svgHeight, height/svgHeight, svgWidthFactor) 
  // }, [svgWidth, svgHeight, footerHeight, svgTop])

  // useEffect(() => {
  //   let newSvgTop = document.getElementById('referenceSvg').getBoundingClientRect().top;
  //   // console.log(newSvgTop, svgHeight)
  //   if (newSvgTop?.toFixed(0) !== svgTop?.toFixed(0)) {
  //     setSvgTop(newSvgTop)
  //   }
  // }, [svgWidth, svgHeight, footerHeight, mobile])

  // useEffect(() => {
  //   function handleSize() {
  //     let bbox = document.getElementById('referenceSvg').getBoundingClientRect()
  //     let height = bbox.bottom - bbox.top;
  //     let width = bbox.width;
  //     // let top = bbox.top;

  //     console.log('RESIZE')
  //     console.log(height)

  //     if (height >= 0 && height.toFixed(0) !== svgHeight?.toFixed(0) && setSvgHeight !== undefined) {
  //       setSvgHeight(height)
  //       setSvgWidth(width)
  //     }
  //     // if (top?.toFixed(0) !== svgTop?.toFixed(0)) {
  //     //   setSvgTop(top)
  //     // }
  //   }

  //   window.addEventListener('resize', handleSize)
  //   handleSize()
  //   return () => { window.removeEventListener('resize', handleSize) }
  // }, [mobile])

  // useEffect(() => {
  //   handleSize()
  // }, [])

  function scrubIntro() {
    let tl = gsap.timeline({ ease: 'power1.out' })
      .to('.pageIntro', {
        y: '-10vh',
        duration: 1,
      }, 0)
      .to(['.introSvgInner', '.page1MoonSvgInner'], {
        duration: 1,
        y: `-${svgScrubAmount}px`,
      }, 0)
      .to('.titleContainerInner', {
        y: mobile ? '-120px' : '-40px',
        duration: 1,
      }, 0)
    return tl
  }

  function introTextAnimation() {
    let tl = gsap.timeline()
    // .to(['.titleText1'], {
    //   autoAlpha: 1,
    //   // y: '-=5',
    //   stagger: {
    //     amount: 0.1
    //   },
    //   duration: 0.5,
    //   ease: 'none'
    // }, 0)
    // .to(['.titleText2'], {
    //   autoAlpha: 1,
    //   // y: '-=5',
    //   stagger: {
    //     amount: 0.1
    //   },
    //   duration: 0.5,
    //   ease: 'none'
    // }, 1)
    return tl
  }
  // ============================= page1 =============================
  function showPage1() { // SCALE = 2s
    let tl = gsap.timeline()
      // .to(['.svgPage2'],
      .to(['.page1MoonSvg'],
        {
          duration: 1,
          y: `${svgScrubAmount}px`, //Cancelling out the scrub from before.
          yPercent: -61.3,
          // y: `-${(mobile ? 0.206633 : 0.27810) * svgHeight + svgTop - svgScrubAmount - (screenHeight / 2)}px`, //ABS -svgScrubAmount from moveStar animation (about 100 px)
          // y: `-30vh`, //ABS -svgScrubAmount from moveStar animation (about 100 px)
        }, 0)
      .to(['.page1'], {
        y: '-30vh',
        opacity: 1,
        duration: 2,
      }, 0.5)
      .to('.page1stars', {
        opacity: 1,
        duration: 1,
        ease: 'ease.out'
      }, 0)
      .to('.page1stars', {
        y: '5vh',
        duration: 2,
        ease: 'ease.out',
      }, 0)
      .to(['.page1feet'], {
        y: '-63%',
        ease: 'power2.out',
        autoAlpha: 1,
        duration: 1
      }
        , 0.3)

    return tl
  }
  function showInfo1() {
    let tl = gsap.timeline()
      // .set('.page1descriptionContainer', {
      //   // overwrite:true,
      //   autoAlpha: 1,
      // }, 0)
      .to('.page1description', {
        autoAlpha: 1,
        y: '-=5px',
        stagger: 0.2,
        duration: 1,
      }, 0)
      .to('.page1photos', {
        autoAlpha: 1,
        stagger: 0.05,
        duration: 1
      }, 0.7)
    return tl
  }
  function hideIntro() {
    let tl = gsap.timeline({
      onComplete: () => { titleCtx.current.data.forEach((anim, i) => { anim.pause() }) },
      onReverseComplete: () => titleCtx.current.data.forEach((anim, i) => { anim.play() }),
    })
      .to(['.pageIntroInner'],
        // { y: '-10vh' },
        {
          y: '-30vh',
          // y: '-40vh',
          duration: 2,
          ease: 'power.out'
          // ease: 'power2.inout',
        }, 0)
      .to(['.titleContainer'], {
        // autoAlpha: 0,
        y: '-30vh',
        duration: 1,
        ease: 'power.out'
      }, 0)
      .to(['.introSvg'], {
        y: mobile ? '-85vh' : '-160vh',
        autoAlpha: 0,
        // y:'-30vh',
        duration: 0.7
        // ease: 'ease.in'
      }, 0)
      .to(['.titleContainer'], {
        autoAlpha: 0,
        // y:'-30vh',
        duration: 0.3
        // ease: 'ease.in'
      }, 0.2)
      .to('.pageIntroInner', {
        autoAlpha: 0,
        duration: 0.7,
        // ease: 'ease.in'
      }, 0.4)
    return tl
  }
  function scrubPage1() {
    let tl = gsap.timeline({ ease: 'power1.out' })
      .to('.page1Inner', {
        y: '-5vh',
        duration: 3.3,
        // ease: 'power.out'
        // duration:1,
        // ease: 'ease.in'
      }, 0)
      .to('.page1starsInner', {
        y: '-5vh',
        duration: 3.3,
        // ease: 'power.out'
        // duration:1,
        // ease: 'ease.in'
      }, 0)
    // .to('.page1',
    //   {
    //     y: '-=30px',
    //     duration: 1,
    //   }, 0)
    // .to('.svgPage2Inner',
    //   {
    //     duration: 1,
    //     y: `-${svgScrubAmount}px`,
    //     // y: `-${(0.09) * svgHeight + svgTop - (screenHeight / 2)}px`,
    //     // onStart: () => {console.log('start')},
    //     // onComplete:()=>{console.log('complete')}
    //   }, 0)
    return tl
  }
  // ============================= page2 =============================
  let dropletStart = [
    "M923 1965.57C923 1974.08 916.125 1981 907.645 1981C899.166 1981 895 1974.08 895 1965.57C895 1957.05 910.355 1933.72 910.355 1941.6C910.355 1949.48 923 1958.24 923 1965.57Z",
    "M924.794 1977.1C924.04 1978.91 889.21 1981.91 890.014 1977.77C890.014 1971.77 903.55 1979.67 902.532 1975.77C899.055 1962.43 917.833 1966.43 912.964 1973.77C908.096 1981.1 927.17 1971.39 924.794 1977.1Z",
    "M912.143 1977.77C912.143 1978.87 909.232 1979.86 906.543 1979.86C903.853 1979.86 901.429 1978.87 901.429 1977.77C901.429 1976.68 904.34 1976.29 907.029 1976.29C909.719 1976.29 912.143 1976.68 912.143 1977.77Z",
  ]
  let dropletEnd = [
    "M912.143 1979.5C912.143 1980.81 909.232 1982 906.543 1982C903.853 1982 901.429 1980.81 901.429 1979.5C901.429 1978.19 904.34 1977.71 907.029 1977.71C909.719 1977.71 912.143 1978.19 912.143 1979.5Z",
  ]

  let dropletStartMobile = [
    "M297.021 1333.05C296.5 1334.36 272.454 1336.52 273.009 1333.53C273.009 1329.21 282.355 1334.91 281.652 1332.09C279.251 1322.49 292.215 1325.37 288.854 1330.65C285.493 1335.93 298.661 1328.94 297.021 1333.05Z",
    "M288.373 1333.29C288.373 1334.18 286.416 1334.97 284.609 1334.97C282.801 1334.97 281.171 1334.18 281.171 1333.29C281.171 1332.41 283.128 1332.09 284.936 1332.09C286.744 1332.09 288.373 1332.41 288.373 1333.29Z",
  ]
  let dropletEndMobile = [
    "M288.373 1953.4C288.373 1954.29 286.416 1955.08 284.609 1955.08C282.801 1955.08 281.171 1954.29 281.171 1953.4C281.171 1952.52 283.128 1952.2 284.936 1952.2C286.744 1952.2 288.373 1952.52 288.373 1953.4Z",
  ]

  function showPage2() {
    let tl = gsap.timeline()
      // .to(['.svgPage2'],
      //   {
      //     duration: 1,
      //     y: () => { return `-${(mobile ? 0.35798 : 0.4432) * svgHeight + svgTop - svgScrubAmount - (screenHeight / 2)}px` }, //ABS -svgScrubAmount from moveStar animation (about 100 px)
      //   }, 0)
      .to(['.page1MoonSvg'],
        {
          duration: 1,
          yPercent: (-100 - 0.23864 * 34.176 + 1),
        }, 0)
      .to(['.page2'], {
        y: '-30vh',
        opacity: 1,
        duration: 2,
        ease: 'ease.out'
      }, 0)
      .to('#droplet', {
        duration: 1.5,
        // y: () => { return `${(mobile ? 0.115 : 0.141) * svgHeight * svgWidthFactor}px` },
        y: 0,
        attr: { d: mobile ? dropletStartMobile[0] : dropletStart[0] },
        scale: 1,
        transformOrigin: '50% 50%',
      }, 0)
      .to('#droplet', {
        duration: 0.2,
        attr: { d: mobile ? dropletStartMobile[1] : dropletStart[1] },
      }, 1.5)
      .to('#droplet', {
        duration: 0.2,
        opacity: 0,
        attr: { d: mobile ? dropletStartMobile[2] : dropletStart[2] },
      }, 1.7)
      .to('#dropletEnd', {
        y: '-30px',
        opacity: 1,
        duration: 0.4,
        ease: 'expo.out',
      }, 1.5)
      .to('#dropletEnd', {
        y: '0',
        duration: 0.2,
        opacity: 0,
        ease: 'expo.in',
        attr: { d: mobile ? dropletEndMobile[0] : dropletEnd[0] },
      }, 1.9)

    return tl
  }
  function showInfo2() {
    let tl = gsap.timeline()
      // .set('.page2photosContainer', {
      //   autoAlpha: 1
      // }, 0)
      // .set('.page2descriptionContainer', {
      //   autoAlpha: 1,
      // }, 0)
      .to('.page2description', {
        autoAlpha: 1,
        y: '-=5px',
        stagger: 0.2,
        duration: 1,
      }, 0)
      .to('.page2photos', {
        autoAlpha: 1,
        stagger: 0.05,
        duration: 1
      }, 0.7)
    return tl
  }
  function hidePage1() {
    let tl = gsap.timeline()
      // { y: '-10vh' },
      .to('.page1Inner', {
        opacity: 0,
        duration: 0.7,
        ease: 'power.out'
        // ease: 'ease.in'
      }, 0)
      .to('.page1stars', {
        autoAlpha: 0,
        y: '-5vh',
        duration: 1,
        ease: 'ease.out'
      }, 0)
      .to('.page1feet', {
        y: '-=300px',
        ease: 'power2.out',
        duration: 1
      }, 0)
      // .to('.page1MoonSvgInner', {
      //   y: '-30vh',
      //   duration: 1,
      // }, 0)
      .to(['.page1feetContainer'],
        {
          // y: '-30vh',
          // y: '-73%',
          // y: '-=300px',
          autoAlpha: 0,
          ease: 'power2.out',
          duration: 1
        }, 0)
      .to('.legFlower', {
        opacity: 0,
        duration: 0.7,
      }, 0)
    return tl
  }
  function hideInfo1() {
    let tl = gsap.timeline()
      .to('.page1descriptionContainer', {
        autoAlpha: 0,
        duration: 0.5,
        // overwrite:true,
      }, 0)
      .to('.page1photosContainer', {
        autoAlpha: 0,
        duration: 0.5
      }, 0)
    return tl
  }
  function scrubPage2() {
    let tl = gsap.timeline({ ease: 'power1.out' })
      .to('#fish', { duration: 2 })
      .to('.page2Inner', {
        y: '-5vh',
        duration: 2,
      }, 0)
    // .to('.page1',
    //   {
    //     y: '-=30px',
    //     duration: 1,
    //   }, 0)
    // .to('.svgPage2Inner',
    //   {
    //     duration: 1,
    //     y: `-${svgScrubAmount}px`,
    //     // y: `-${(0.09) * svgHeight + svgTop - (screenHeight / 2)}px`,
    //     // onStart: () => {console.log('start')},
    //     // onComplete:()=>{console.log('complete')}
    //   }, 0)
    return tl
  }
  // ============================= page3 =============================
  function showPage3() {
    let tl = gsap.timeline()
      // .to(['.svgPage2'],
      //   {
      //     duration: 2,
      //     y: `-${(mobile ? 0.51 : 0.6056) * svgHeight + svgTop - svgScrubAmount - (screenHeight / 2)}px`, //ABS -svgScrubAmount from moveStar animation (about 100 px)
      //   }, 0)
      // .to('.page1MoonSvg',{
      //   y:
      // })
      .to('.page3AnimalsSvg', {
        duration: 2,
        y: '-40vh',
        yPercent: -50,
        ease: 'ease.out'
      }, 0)
      .to(['.page3'], {
        y: '-10vh',
        opacity: 1,
        duration: 4,
        ease: 'ease.out'
      }, 0)

    return tl
  }
  function showInfo3() {
    let tl = gsap.timeline()
      // .set('.page3photosContainer', {
      //   autoAlpha: 1
      // }, 0)
      .set('.page3descriptionContainer', {
        autoAlpha: 1,
      }, 0)
      .to('.page3description', {
        autoAlpha: 1,
        y: '-=5px',
        stagger: 0.2,
        // duration: 1,
      }, 0)
      .to('.page3photos', {
        autoAlpha: 1,
        stagger: 0.2,
        // duration: 0.5,
      }, 0.6)
    return tl
  }
  function hidePage2() {
    let tl = gsap.timeline()
      // { y: '-10vh' },
      .to('.page2Inner', {
        opacity: 0,
        duration: 0.7,
        ease: 'power.out'
        // ease: 'ease.in'
      }, 0)
      .to(['.page2WavesSvgInner', '.dropletGroup'],
        {
          opacity: 0,
          duration: 1,
          y: `-80vh`,
          ease: 'power.out',
        }, 0)

    return tl
  }
  function hideInfo2() {
    let tl = gsap.timeline()
      .to('.page2descriptionContainer', {
        autoAlpha: 0,
        duration: 0.5,
      }, 0)
      .to('.page2photosContainer', {
        autoAlpha: 0,
        duration: 0.5,
      }, 0)

    return tl
  }
  function scrubPage3() {
    let tl = gsap.timeline({ ease: 'power1.out' })
      .to(['.page3Inner', '.page3AnimalsSvgInner'], {
        y: '-5vh',
        duration: 100,
        // duration: 2.5,
      }, 0)

    return tl
  }
  // ============================= page4 =============================
  function showPage4() {
    let tl = gsap.timeline()
      // .to(['.svgPage2'],
      //   {
      //     duration: 1,
      //     y: `-${(0.8056) * svgHeight + svgTop - svgScrubAmount - (screenHeight / 2)}px`, //ABS -svgScrubAmount from moveStar animation (about 100 px)
      //   }, 0)
      .to(['.page4'], {
        y: '-30vh',
        opacity: 1,
        duration: 1,
        ease: 'ease.out'
      }, 0)

    return tl
  }
  function showInfo4() {
    let tl = gsap.timeline()
      .to('.page4description', {
        autoAlpha: 1,
        y: '-=5px',
        stagger: 0.2,
        duration: 1,
      }, 0)
    return tl
  }
  function hidePage3() {
    let tl = gsap.timeline()
      .to('.page3Inner', {
        opacity: 0,
        duration: 0.7,
        ease: 'power.out',
      }, 0)
      .to('.page3AnimalsSvgInner', {
        y: '-100vh',
        yPercent: -50,
        duration: 0.7,
        ease: 'power.out',
      }, 0)
      .to('.page3photosContainer', {
        autoAlpha: 0,
        duration: 0.5,
      }, 0)
    return tl
  }
  function hideInfo3() {
    let tl = gsap.timeline()
      .to('.page3descriptionContainer', {
        autoAlpha: 0,
        overwrite: true,
        // y: '-=5px',
        // stagger: 0.2,
        duration: 0.5,
      }, 0)
      .to('.page3photosContainer', {
        autoAlpha: 0,
        duration: 0.5,
      }, 0)
    // .to('.birds',{
    //   opacity:0,
    //   duration:0.5,
    // },0)
    return tl
  }
  function scrubPage4() {
    let tl = gsap.timeline({ ease: 'power1.out' })
      .to('.page4Inner', {
        y: '-5vh',
        duration: 1.6,
      }, 0)
      .to('.svgKakje', {
        y: '-5vh',
        duration: 1.6,
      }, 0)
    return tl
  }
  // ============================= page5 =============================
  function showPage5() {
    let tl = gsap.timeline()
      // .to(['.svgPage2'],
      //   {
      //     duration: 1,
      //     y: `-${(1) * svgHeight + svgTop - svgScrubAmount - (screenHeight)}px`, //ABS 
      //   }, 0)
      .to(['.page5'], {
        y: '-30vh',
        opacity: 1,
        duration: 2,
        ease: 'ease.out'
      }, 0)
      .to('.svgMilo', {
        y: '-30vh',
        duration: 2,
        ease: 'ease.out'
      }, 0)
    return tl
  }
  function showInfo5() {
    let tl = gsap.timeline()
      .to('.page5description', {
        autoAlpha: 1,
        y: '-=5px',
        stagger: 0.2,
        duration: 1,
      }, 0)
    return tl
  }
  function hidePage4() {
    let tl = gsap.timeline()
      // { y: '-10vh' },
      .to('.page4Inner', {
        opacity: 0,
        duration: 0.7,
        ease: 'power.out'
        // ease: 'ease.in'
      }, 0)
      .to('.svgKakje', {
        opacity: 0,
        duration: 0.7,
        ease: 'power.out'
        // ease: 'ease.in'
      }, 0)

    return tl
  }
  function hideInfo4() {
    let tl = gsap.timeline()
      .to('.page4descriptionContainer', {
        autoAlpha: 0,
        // y: '-=5px',
        // stagger: 0.2,
        duration: 0.5,
      }, 0)
    // .to('.page4photosContainer', {
    //   autoAlpha: 0,
    //   duration: 0.5,
    // }, 0)
    return tl
  }
  function scrubPage5() {
    let tl = gsap.timeline({ ease: 'power1.out' })
    // .to('.page5Inner', {
    //   y: '-5vh',
    //   duration:153,
    // }, 0)
    // .to('.svgKakje',{
    //   y: '-5vh',
    // },0)
    return tl
  }

  useEffect(() => {
    let ctx = gsap.context(() => {
      // .add(introText(), 0)
      let transition1 = showPage1().paused(true).add(hideIntro(), 0).add(showInfo1(), 1).progress(0)
      setTransitionTl1(transition1);
      ScrollTrigger.create({
        start: `bottom bottom-=${0.81 * screenHeight}`,
        end: `bottom bottom-=${0.81 * screenHeight}`,
        invalidateOnRefresh: false,
        toggleActions: 'play none reverse none',
        preventOverlaps: true,
        markers: false,
        onEnter: () =>
          gsap.to(transition1, {
            overwrite: true,
            progress: 1,
            duration: 5,
            ease: "power1.out",
          }),
        onLeave: () => {
          // ScrollTrigger.getById('starScrub').disable(false)
        },
        onLeaveBack: () =>
          gsap.to(transition1, {
            overwrite: true,
            progress: 0,
            duration: 1,
            ease: "power1.out"
          })
      })

      let transition2 = showPage2().paused(true).add(hidePage1(), 0).add(hideInfo1(), 0).add(showInfo2(), 1.9).progress(0)
      setTransitionTl2(transition2)
      ScrollTrigger.create({
        start: `bottom+=${1 * screenHeight} bottom-=${0.81 * screenHeight}`,
        end: `bottom+=${1 * screenHeight} bottom-=${0.81 * screenHeight}`,
        invalidateOnRefresh: false,
        toggleActions: 'play none reverse none',
        preventOverlaps: true,
        markers: false,
        onEnter: () =>
          gsap.to(transition2, {
            overwrite: true,
            progress: 1,
            duration: 6,
            ease: "power1.out",
          }),
        onLeaveBack: () =>
          gsap.to(transition2, {
            overwrite: true,
            progress: 0,
            duration: 1,
            ease: "power1.out"
          })
      })

      let transition3 = showPage3().paused(true).add(hidePage2(), 0).add(hideInfo2(), 0).add(showInfo3(), 4).progress(0)
      setTransitionTl3(transition3)
      ScrollTrigger.create({
        start: `bottom+=${2 * screenHeight} bottom-=${0.81 * screenHeight}`,
        end: `bottom+=${2 * screenHeight} bottom-=${0.81 * screenHeight}`,
        invalidateOnRefresh: false,
        toggleActions: 'play none reverse none',
        preventOverlaps: true,
        markers: false,
        onEnter: () =>
          gsap.to(transition3, {
            overwrite: true,
            progress: 1,
            duration: mobile ? 6 : 4,
            ease: "power1.out",
          }),
        onLeaveBack: () =>
          gsap.to(transition3, {
            overwrite: true,
            progress: 0,
            duration: 1,
            ease: "power1.out"
          })
      })

      let transition4 = showPage4().paused(true).add(hidePage3(), 0).add(hideInfo3(), 0).add(showInfo4(), 1).progress(0)
      setTransitionTl4(transition4)
      ScrollTrigger.create({
        start: `bottom+=${3 * screenHeight} bottom-=${0.81 * screenHeight}`,
        end: `bottom+=${3 * screenHeight} bottom-=${0.81 * screenHeight}`,
        invalidateOnRefresh: false,
        toggleActions: 'play none reverse none',
        preventOverlaps: true,
        markers: false,
        onEnter: () =>
          gsap.to(transition4, {
            overwrite: true,
            progress: 1,
            duration: 4,
            ease: "power1.out",
          }),
        onLeaveBack: () =>
          gsap.to(transition4, {
            overwrite: true,
            progress: 0,
            duration: 1,
            ease: "power1.out"
          })
      })

      let transition5 = showPage5().paused(true).add(hidePage4(), 0).add(hideInfo4(), 0).add(showInfo5(), 1).progress(0)
      setTransitionTl5(transition5)
      ScrollTrigger.create({
        start: `bottom+=${4 * screenHeight} bottom-=${0.81 * screenHeight}`,
        end: `bottom+=${4 * screenHeight} bottom-=${0.81 * screenHeight}`,
        invalidateOnRefresh: false,
        toggleActions: 'play none reverse none',
        preventOverlaps: true,
        markers: false,
        id: 'page5',
        onEnter: () =>
          gsap.to(transition5, {
            overwrite: true,
            progress: 1,
            duration: 4,
            ease: "power1.out",
          }),
        onLeaveBack: () =>
          gsap.to(transition5, {
            overwrite: true,
            progress: 0,
            duration: 1,
            ease: "power1.out"
          })
      })

      let animation0 = scrubIntro().paused(true).progress(0);
      setScrubTl0(animation0);
      gsap.to(animation0,
        // {progress:0}, 
        {
          progress: 1,
          // ease:'ease.out',
          ease: 'none',
          scrollTrigger: {
            id: 'starScrub',
            start: 'bottom bottom',
            end: () => `+=${0.8 * screenHeight}px`,
            scrub: 1,
            markers: false,
            invalidateOnRefresh: false,
            // preventOverlaps: true,
          }
        });

      let animation1 = scrubPage1().paused(true).progress(0);
      setScrubTl1(animation1);
      gsap.to(animation1,
        {
          progress: 1,
          ease: 'none',
          scrollTrigger: {
            id: 'moonScrub',
            start: `bottom+=${0.90 * screenHeight} bottom`,
            end: () => `+=${0.85 * screenHeight}px`,
            scrub: 1,
            markers: false,
            invalidateOnRefresh: false,
            // preventOverlaps: true,
          }
        });

      let animation2 = scrubPage2().paused(true).progress(0);
      setScrubTl2(animation2);
      gsap.to(animation2,
        {
          progress: 1,
          ease: 'none',
          scrollTrigger: {
            id: 'animalScrub',
            start: `bottom+=${1.90 * screenHeight} bottom`,
            end: () => `+=${0.85 * screenHeight}px`,
            scrub: 1,
            markers: false,
            invalidateOnRefresh: false,
            // preventOverlaps: true,
          }
        });

      let animation3 = scrubPage3().paused(true).progress(0);
      setScrubTl3(animation3);
      gsap.to(animation3,
        {
          progress: 1,
          ease: 'none',
          scrollTrigger: {
            id: 'kakScrub',
            start: `bottom+=${2.90 * screenHeight} bottom`,
            end: () => `+=${0.85 * screenHeight}px`,
            scrub: 1,
            markers: false,
            invalidateOnRefresh: false,
            // preventOverlaps: true,
          }
        });

      let animation4 = scrubPage4().paused(true).progress(0);
      setScrubTl4(animation4);
      gsap.to(animation4,
        {
          progress: 1,
          ease: 'none',
          scrollTrigger: {
            id: 'studioScrub',
            start: `bottom+=${3.90 * screenHeight} bottom`,
            end: () => `+=${0.85 * screenHeight}px`,
            scrub: 1,
            markers: false,
            invalidateOnRefresh: false,
            // preventOverlaps: true,
          }
        });

      let animation5 = scrubPage5().paused(true).progress(0);
      setScrubTl5(animation5);
      gsap.to(animation5,
        {
          progress: 1,
          ease: 'none',
          scrollTrigger: {
            id: 'finalScrub',
            start: `bottom+=${4.90 * screenHeight} bottom`,
            end: () => `+=${0.85 * screenHeight}px`,
            scrub: 1,
            markers: false,
            invalidateOnRefresh: false,
            // preventOverlaps: true,
          }
        });
      // .add(introText(), 0)
      let newAnimationTl = introTextAnimation().paused(true);
      setIntroAnimationTl(newAnimationTl)

      // setScrubTl0(tl1());

    })
    return () => { ctx.revert() }
  }, [screenWidth])
  // screenHeight, ,svgTop , 

  useEffect(() => {
    introAnimationTl && introAnimationTl.paused(!pageLoaded)
  }, [pageLoaded])

  // useEffect(() => {
  // console.log(transitionTl1?.progress())
  // }, [transitionTl1?.progress()])

  return (
    <>
      <Head>
        <title>Milo Weiler Photography | My Fantastic Four</title>
        <meta name="description" content=" " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <ReactLenis root options={{ duration: 0.9, wheelMultiplier: 0.9 }}> */}
      {/* style={{ height: heightToScroll + 'px' }} */}
      <main style={{ height: mobile ? '700vh' : '700vh' }} className={`w-full mainBackground dark-scrollbar relative bg-black`} >

        <PageWrapper
          darkMode={true}
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          // svgWidth={""} 
          finished={false}
          mobile={mobile}
        >
          {/* <div className={'fixedColor fixed top-0 opacity-100 bg-red-500 w-full h-full'}/> */}
          <BackgroundSplit type='top' amount={10} src1='/images/milo.jpg' height='h-[110vh]' animationName={'page5'} className={'opacity-0 top-[25vh]'} />
          <BackgroundSplit type='both' amount={10} src1='/images/mainpageStudio1Cut.png' src2='/images/mainpageStudio2Cut.png' height='h-[115vh]' animationName={'page4'} className={'opacity-0 top-[25vh]'} />
          <Background type='both' amount={10} src='/images/mainpageArt.jpg' height='h-[115vh]' animationName={'page3'} className={'opacity-0 top-[5vh]'} />
          {/*h-100vh no specification needed   */}
          <Background type='both' amount={0} src='/images/mainpageArt1.jpg' animationName={'artPhoto0'} className={'opacity-0'} />
          <Background type='both' amount={0} src='/images/mainpageArt2.jpg' animationName={'artPhoto1'} className={'opacity-0'} />
          <Background type='both' amount={0} src='/images/mainpageArt3.jpg' animationName={'artPhoto2'} className={'opacity-0'} />

          <Background type='both' amount={10} src='/images/mainpageDocu.jpg' height='h-[115vh]' animationName={'page2'} className={'opacity-0 top-[25vh]'} />
          <Background type='both' amount={10} src='/images/mainpageMoon.jpg' height='h-[110vh]' animationName={'page1'} className={'opacity-0 top-[30vh]'} />
          <Background type='bottom' amount={50} src='/images/mainpageStarsCut.jpg' height='h-[50vh]' animationName={'page1stars'} className={'opacity-50 top-[-10vh]'} />
          {/* <Background type='bottom' priority amount={40} src='/images/mainpageIntro.jpeg' height='h-[110vh]' animationName={'pageIntro'} className={'pageIntro top-0'} /> */}
          <Background setPageLoaded={setPageLoaded} type='bottom' priority amount={40} src='/images/mainpageStars.jpg' height='h-[110vh]' animationName={'pageIntro'} className={'top-0'} />
          {/* <Background type='bottom' priority amount={70} src='/images/mainpageStars.jpg' height='h-[100vh]' className={'page1stars bottom-[40vh] opacity-0'} /> */}

          <div className='page1feetContainer visible opacity-100'>
            <Image
              // style={{ 'maskImage': `linear-gradient(to bottom, transparent, black ${50}%, black ${100}%)`, 'maskSize': '100% 100%', 'WebkitMaskImage': `linear-gradient(to bottom, transparent, black ${50}%, black ${100}%)`, 'maskPosition': '0 0', 'maskRepeat': 'no-repeat', }}
              alt='' src='/images/mainpageMoonFeet.png' width='265' height='366' className={`will-change-transform page1feet invisible opacity-0 select-none w-[17.27vw] fixed right-[6.48vw] top-1/2 -translate-y-[23%]`} sizes='(max-width: 648px) 60vw, 25vw' />
          </div>

          {/* <section style={{ height: svgHeight ? svgHeight + 'px' : '150vh', transform: 'translate3d(-50%,0,0)', top: `calc(50% - ${(mobile ? 0.0596 : 0.043) * svgHeight}px)` }} className='svgPage2 flex w-[115.86vw] left-1/2 mx-auto fixed' >
            <div className='svgPage2Inner w-full h-full relative top-0 '>
              <Story0Logo id={'referenceSvg'} introAnimationTl={introAnimationTl} speed={1} scrollMin={0} scrollMax={0.15} />
              <Story1Moon  scrubTl0={scrubTl0} scrubTl1={scrubTl1} transitionTl={transitionTl1} />
              <Story2Waves  scrubTl={scrubTl2} transitionTl={transitionTl2} />
              <Story3Animals id={'referenceSvg'} scrubTl={scrubTl3} transitionTl={transitionTl3} />
              </div>
            </section> */}
          <Page2Waves scrubTl={scrubTl2} transitionTl={transitionTl2} style={{}} animationName={'page2WavesSvg'} className={`w-[115.86vw] fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`} />
          <Page1Moon style={{ transform: 'translate3d(-50%,0,0)' }} animationName='page1MoonSvg' className={'flex w-[115.86vw] mx-auto fixed'} scrubTl0={scrubTl0} scrubTl1={scrubTl1} transitionTl={transitionTl1} />
          <Page0Logo style={{ transform: 'translate3d(-50%,-46.5%,0)' }} className={'introSvg flex w-[115.86vw] left-1/2 top-1/2 mx-auto fixed'} introAnimationTl={introAnimationTl} />
          <Page3Animals style={{ top: `calc(90%)`, transform: 'translate3d(-50%,-50%,0)' }} animationName={'page3AnimalsSvg'} className={`w-[115.86vw] fixed  left-1/2 `} scrubTl={scrubTl3} transitionTl={transitionTl3} />

          {/* LEGS */}
          {/* 265px */}

          <Page5Milo scrubTl={scrubTl5} transitionTl={transitionTl5} />
          <PageDescription5 shadow transitionTl={transitionTl5} animateName='page5description' className={``} info={{ title: '', text: "I invite you to visit my gallery and experience the magic of my photography. From behind-the-scenes captures to fine art masterpieces, my images will leave you in awe. If you're interested in purchasing prints or working with me on a project, I'd be thrilled to hear from you. Let's capture the beauty of life together." }} />

          <Page4Kakje scrubTl={scrubTl4} transitionTl={transitionTl4} />
          <PageDescription4 shadow animateName='page4description' className={`text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} info={{ title: 'Studio', text: 'With my Studio Photography, I aim for precision and beauty in every planned shot. I use my keen eye for detail and passion for perfection to create bold, striking, and unforgettable images that capture the essence of my subject.' }} />

          <Page3Photos />
          <Page3KakScrub scrubTl={scrubTl3} />
          <PageDescription shadow animateName='page3description' className={`text-left bottom-4 md:bottom-12 lg:bottom-16 left-4 md:left-12 lg:left-16`} info={{ title: 'Fine Art', text: 'In my Fine Art Photography, I combine planned studio shots and improvisational timing in the outdoors to create a world of artistry that evokes emotion and inspires imagination. From conceptual pieces to ethereal portraits, I showcase the beauty of Experience and the power of creativity.' }} />

          <Page2Photos />
          <PageDescription shadow animateName='page2description' className={`text-right top-10 md:top-16 lg:top-12 right-4 md:right-16 lg:right-12`} info={{ title: 'Documentary', text: 'Through my Documentary photography, I invite you to step into the real world and witness the beauty and complexity of everyday life. My images capture the raw, unscripted moments that make up our human experience, bringing to life the emotions and stories of those who are often overlooked.' }} />

          {/* -73.7% */}
          <Page1Photos timeline={scrubTl1} />
          <PageDescription shadow animateName='page1description' className={`text-left top-4 md:top-16 lg:top-12 left-4 md:left-16 lg:left-12`} info={{ title: 'Behind The Scenes', text: 'With my Behind The Scenes Photography, I capture the moments that make every production unique, from planning to final take. I reveal the dedication and creativity that goes into bringing a vision to life, leaving you in awe of the process.' }} />

          <StoryTitle shadow={!mobile} scrubTl={scrubTl0} ctx={titleCtx} />

          {/* <ScrollDown /> */}
          {/* <section className='svgPage2 flex w-[115.86vw] left-1/2 -translate-x-1/2 h-screen mx-auto fixed top-[calc(50%-200px)] ' > */}
          {/* <Story2Moon speed={1} scrollMin={0} scrollMax={0} /> */}
          {/* </section> */}
          {mobile ? <NavigationMobile /> : <Navigation />}
        </PageWrapper>
        {/* <ScrollVisual velocity={velocity.current} /> */}
        {mobile ? <MobileScrollbar className={'bg-primary '} /> : <></>}
      </main >
      {/* </ReactLenis> */}
    </>
  )
}


export async function getStaticProps() {

  return {
    props: {
    }
  };
}

