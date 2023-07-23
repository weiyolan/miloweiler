import React, { useEffect, useState, useRef, useCallback } from 'react'
import Head from 'next/head'
import { Lenis as ReactLenis } from '@studio-freight/react-lenis'

// import Image from 'next/image'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

import BackgroundMoving from '@/components/line/BackgroundMoving'
import { PageWrapper } from '@utils/pageContext'
import { useAppContext } from '@utils/appContext'
// import { useDimensions } from '@/utils/useDimensions'

// import Title from '@/components/atoms/Title'
// import Layout from '@/components/sections/Layout'
// import Footer from '@/components/sections/Footer'

// import ButtonBig from '@components/atoms/ButtonBig'

// import ScrollVisual from '@/components/scroll/ScrollVisual'
import ScrollingDiv from '@/components/line/ScrollingDiv'
import FadeDiv from '@/components/FadeDiv'

// import SpireeStory from '../public/images/spireeStory.svg'

// import Navbar from '@/components/navbar/Navbar'
// import ShoppingCart from '@/components/cart/ShoppingCart'
import Button from '@/components/Button'
import Background from '@/components/Background'
import Parallax from '@/components/Parallax'
import StoryText from '@/components/line/StoryText'
import StoryTitle from '@/components/line/StoryTitle'
import Image from 'next/image'
import PageDescription from '@/components/line/PageDescription'
import Page1Photos from '@/components/line/Page1Photos'
import ScrollVisual from '@/components/line/ScrollVisual'
import Footer2 from '@/components/Footer2'
import ScrollVelocity from '@/components/ScrollVelocity'
import { flushSync } from 'react-dom'
import BackgroundSplit from '@/components/BackgroundSplit'
import Page2Photos from '@/components/line/Page2Photos'
import Page3Photos from '@/components/line/Page3Photos'

import Story0Logo from '@/components/line/Story0Logo'
import Story1Moon from '@/components/line/Story1Moon'
import Story2Waves from '@/components/line/Story2Waves'
import Story3Animals from '@/components/line/Story3Animals'
import PageDescription4 from '@/components/line/PageDescription4'
import Navigation from '@/components/Navigation'
import Story4Kakje from '@/components/line/Story5Milo'
import Page3KakScrub from '@/components/line/Page3KakScrub'
import Story5Milo from '@/components/line/Story5Milo'
import Page4Kakje from '@/components/line/Page4Kakje'

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

  let velocity = useRef(0)
  // let [scrollingDivHeight, setScrollingDivHeight] = useState(undefined)

  let [footerHeight, setFooterHeight] = useState(undefined)
  // let [animationLocation, setAnimationLocation] = useState({ top: undefined, bottom: undefined })
  // let [textLocation, setTextLocation] = useState({ top: undefined, bottom: undefined })

  // let [moveTracker, setMoveTracker] = useState(0) //Tracker to move background when animation moves
  // let [maxMoveTracker, setMaxMoveTracker] = useState(0) //Tracker to move background when animation moves

  let [finished, setFinished] = useState(false)
  let [introAnimated, setIntroAnimated] = useState(false)
  // let [textAppear, setTextAppear] = useState({ textAppear: false })
  // let [textDisappear, setTextDisappear] = useState({ textDisappear: false })

  let mobile = screenWidth < 768

  // let finishingScroll = mobile ? 0.95 : 0.995 // Same as ending of animation
  let finishingScroll = 2 // impossible, so will never activate

  useEffect(() => {
    if (scrolled >= finishingScroll && !finished) { setFinished(true) }
  }, [scrolled])

  useEffect(() => {
    gsap.to(window, { scrollTo: 0 })

    let keepScroll = () => {
      gsap.to(window, { scrollTo: window.scrollY })
    }
    // window.addEventListener('resize', keepScroll)
    // return ()=> window.removeEventListener('resize', keepScroll)
  }, [])



  // -------WITH TITLE AND FOOTER -------------
  // let heightToScroll = (mobile || finished) ? scrollingDivHeight + titleHeight + footerHeight : 6000

  // -------WITHOUT TITLE AND FOOTER -------------
  // let heightToScroll = (mobile || finished) ? scrollingDivHeight : 6000

  // let heightToScroll = svgHeight + footerHeight
  let viewBoxWidth = 1782;
  // let viewBoxHeight = 5390
  let viewBoxHeight = 5142;
  let svgScrubAmount = 100; //in px
  let svgWidthFactor = viewBoxWidth / svgWidth || 1;

  useEffect(() => {
    // console.log(svgWidth, svgHeight, svgWidth/screenWidth)
    // console.log(svgTop)
    // let height = document.getElementById('dropHeight').getBoundingClientRect().height
    // console.log(height, svgHeight, height/svgHeight, svgWidthFactor) 
  }, [svgWidth, svgHeight, footerHeight, svgTop])

  useEffect(() => {
    let newSvgTop = document.getElementById('referenceSvg').getBoundingClientRect().top;
    if (newSvgTop?.toFixed(0) !== svgTop?.toFixed(0)) {
      setSvgTop(newSvgTop)
    }
  }, [svgWidth, svgHeight, footerHeight])

  useEffect(() => {
    function handleSize() {
      let bbox = document.getElementById('referenceSvg').getBoundingClientRect()
      let height = bbox.bottom - bbox.top;
      let width = bbox.width;
      // let top = bbox.top;
      if (height >= 0 && height.toFixed(0) !== svgHeight?.toFixed(0) && setSvgHeight !== undefined) {
        setSvgHeight(height)
        setSvgWidth(width)
      }
      // if (top?.toFixed(0) !== svgTop?.toFixed(0)) {
      //   setSvgTop(top)
      // }
    }

    window.addEventListener('resize', handleSize)
    handleSize()
    return () => { window.removeEventListener('resize', handleSize) }
  }, [])

  function scrubIntro() {
    let tl = gsap.timeline({ ease: 'power1.out' })
      .to('.pageIntro',
        {
          y: '-10vh',
          duration: 1,
        }, 0)
      .to('.svgPage2Inner',
        {
          duration: 1,
          y: `-${svgScrubAmount}px`,
          // y: `-${(0.09) * svgHeight + svgTop - (screenHeight / 2)}px`,
          // onStart: () => {console.log('start')},
          // onComplete:()=>{console.log('complete')}
        }, 0)
    return tl
  }
  function introText() {
    let tl = gsap.timeline()
      .to(['.depth3Title', '.depth1Title', '.depth2Title'], {
        opacity: 1,
        // y: '-=5',
        stagger: {
          amount: 0.15
        },
        duration: 0.15,
        ease: 'power3.out'
      }, 0)
      .to('.depth3Title', {
        y: '-=20',
        duration: 1,
      }, 0)
      .to('.depth2Title', {
        y: '-=25',
        duration: 1,
      }, 0)
      .to('.depth1Title', {
        y: '-=30',
        duration: 1,
      }, 0)
      .to(['.depth3Title', '.depth1Title', '.depth2Title'], {
        opacity: 0,
        // y: '-=5',
        // stagger: {
        //   amount: 0.1
        // },
        duration: 0.1,
        ease: 'power3.out'
      }, 0.90)
    return tl
  }
  // ============================= page1 =============================
  function showPage1() { // SCALE = 2s
    let tl = gsap.timeline()
      .to(['.svgPage2'],
        {
          duration: 1,
          y: `-${(0.27810) * svgHeight + svgTop - svgScrubAmount - (screenHeight / 2)}px`, //ABS -svgScrubAmount from moveStar animation (about 100 px)
          // y: `-${(0.27810-0.09) * svgHeight + svgTop - (screenHeight / 2)}px`, //ABS -0.09%
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
    let tl = gsap.timeline()
      .to(['.pageIntroInner'],
        // { y: '-10vh' },
        {
          y: '-30vh',
          // y: '-40vh',
          duration: 2,
          ease: 'power.out'
          // ease: 'power2.inout',
        }, 0)
      .to('.pageIntroInner', {
        opacity: 0,
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
    "M919.505 1619C918.963 1620.36 893.922 1622.61 894.5 1619.5C894.5 1615 904.232 1620.93 903.5 1618C901 1608 914.5 1611 911 1616.5C907.5 1622 921.213 1614.72 919.505 1619Z",
    "M910.5 1619.25C910.5 1620.17 908.462 1621 906.58 1621C904.697 1621 903 1620.17 903 1619.25C903 1618.33 905.038 1618 906.92 1618C908.803 1618 910.5 1618.33 910.5 1619.25Z",
  ]
  let dropletEnd = [
    "M909.985 2343.12C909.985 2344.04 907.947 2344.87 906.064 2344.87C904.182 2344.87 902.485 2344.04 902.485 2343.12C902.485 2342.2 904.523 2341.87 906.405 2341.87C908.288 2341.87 909.985 2342.2 909.985 2343.12Z",
  ]
  function showPage2() {
    let tl = gsap.timeline()
      .to(['.svgPage2'],
        {
          duration: 1,
          y: () => { return `-${(0.4432) * svgHeight + svgTop - svgScrubAmount - (screenHeight / 2)}px` }, //ABS -svgScrubAmount from moveStar animation (about 100 px)
        }, 0)
      .to(['.page2'], {
        y: '-30vh',
        opacity: 1,
        duration: 2,
        ease: 'ease.out'
      }, 0)
      .to('#droplet', {
        duration: 1.5,
        // y: () => { return `${0.1365*svgHeight*1538/screenWidth}px` }, 
        y: () => { console.log(0.141 * svgHeight * svgWidthFactor); return `${0.141 * svgHeight * svgWidthFactor}px` },
      }, 0)
      .to('#droplet', {
        duration: 0.2,
        attr: { d: dropletStart[0] },
      }, 1.5)
      .to('#droplet', {
        duration: 0.2,
        opacity: 0,
        attr: { d: dropletStart[1] },
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
        attr: { d: dropletEnd[0] },
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
        opacity: 0,
        y: '-5vh',
        duration: 1,
        ease: 'ease.out'
      }, 0)
      .to('.page1feet', {
        y: '-=300px',
        ease: 'power2.out',
        duration: 1
      }, 0)
      .to(['.page1feetContainer'],
        {
          // y: '-73%',
          // y: '-=300px',
          autoAlpha: 0,
          ease: 'power2.out',
          duration: 1
        }
        , 0)
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

      // .to('#fish',{
      //   x:'-=45',
      //   y:'+=45',
      //   rotate:'-=55deg',
      //   duration:0.5,
      //   ease:'none',
      // },0.5) 
      // .to('#fish2', {
      //   attr: { d: "M475.518 2588.54C478.804 2593.13 481.217 2598.78 479.834 2605.44C476.525 2621.36 459.043 2608.71 464.693 2599.02C467.237 2594.65 471.581 2592.23 475.518 2588.54ZM475.518 2588.54C472.231 2583.95 468.068 2580.44 465.957 2578.05L485.422 2579.23L475.518 2588.54Z" },
      //   duration: 0.5,
      //   // ease:'none',
      // }, 0.5)
      .to(['.svgPage2'],
        {
          duration: 2,
          y: `-${(0.6056) * svgHeight + svgTop - svgScrubAmount - (screenHeight / 2)}px`, //ABS -svgScrubAmount from moveStar animation (about 100 px)
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
      .to('.page3Inner', {
        y: '-5vh',
        duration: 100,
      }, 0)
    // .to('#anus', { duration: 2 })

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
  // ============================= page4 =============================
  function showPage4() {
    let tl = gsap.timeline()
      .to(['.svgPage2'],
        {
          duration: 1,
          y: `-${(0.8056) * svgHeight + svgTop - svgScrubAmount - (screenHeight / 2)}px`, //ABS -svgScrubAmount from moveStar animation (about 100 px)
        }, 0)
      .to(['.page4'], {
        y: '-30vh',
        opacity: 1,
        duration: 2,
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
      // { y: '-10vh' },
      // .to('#fish',{opacity:0})
      .to('.page3Inner', {
        opacity: 0,
        duration: 0.7,
        ease: 'power.out'
        // ease: 'ease.in'
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
    return tl
  }
  function scrubPage4() {
    let tl = gsap.timeline({ ease: 'power1.out' })
      .to('.page4Inner', {
        y: '-5vh',
      }, 0)
      .to('.svgKakje',{
        y: '-5vh',
      },0)
    return tl
  }
  // ============================= page5 =============================
  function showPage5() {
    let tl = gsap.timeline()
      .to(['.svgPage2'],
        {
          duration: 1,
          y: `-${(1) * svgHeight + svgTop - svgScrubAmount - (screenHeight)}px`, //ABS 
        }, 0)
      .to(['.page5'], {
        y: '-30vh',
        opacity: 1,
        duration: 2,
        ease: 'ease.out'
      }, 0)
      
    return tl
  }
  function showInfo5() {
    let tl = gsap.timeline()
    // .to('.page5description', {
    //   autoAlpha: 1,
    //   y: '-=5px',
    //   stagger: 0.2,
    //   duration: 1,
    // }, 0)
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
      .to('.page5Inner', {
        y: '-5vh',
        duration:153,
      }, 0)
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
        // ease: 'power2.inout',
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
            duration: 4,
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
      // setTransitionTl5(transition5)
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
            duration: 3,
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
            start: `bottom+=${1.2 * screenHeight} bottom`,
            end: () => `+=${0.6 * screenHeight}px`,
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
            start: `bottom+=${2.2 * screenHeight} bottom`,
            end: () => `+=${0.6 * screenHeight}px`,
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
            start: `bottom+=${3.2 * screenHeight} bottom`,
            end: () => `+=${0.6 * screenHeight}px`,
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
            start: `bottom+=${4.2 * screenHeight} bottom`,
            end: () => `+=${0.6 * screenHeight}px`,
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
            start: `bottom+=${5.2 * screenHeight} bottom`,
            end: () => `+=${0.6 * screenHeight}px`,
            scrub: 1,
            markers: false,
            invalidateOnRefresh: false,
            // preventOverlaps: true,
          }
        });

      let introAnimationTl = gsap.timeline().paused(true);
      setIntroAnimationTl(introAnimationTl)

      // setScrubTl0(tl1());

    })
    return () => { ctx.revert() }
  }, [svgHeight, screenHeight, svgTop])

  useEffect(() => {
    introAnimationTl && introAnimationTl.paused(false)
  }, [pageLoaded])

  // useEffect(() => {
  // console.log(transitionTl1?.progress())
  // }, [transitionTl1?.progress()])

  return (
    <>
      <Head>
        <title>Meet Astrid | Spirée 2023</title>
        <meta name="description" content=" " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <ReactLenis root options={{ duration: 0.9, wheelMultiplier: 0.9 }}> */}
      {/* style={{ height: heightToScroll + 'px' }} light-scrollbar */}
      <main style={{ height: '700vh' }} className={`w-full mainBackground relative bg-black`} >

        <PageWrapper
          darkMode={true}
          viewBox={mobile ? "0 0 701 5157" : `0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          // svgWidth={""} 
          finished={false}
          mobile={mobile}
        >

          <BackgroundSplit type='both' amount={10} src1='/images/milo.jpg' height='h-[110vh]' animationName={'page5'} className={'opacity-0 top-[25vh]'} />
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
              alt='' src='/images/mainpageMoonFeet.png' width='265' height='366' className={`will-change-transform page1feet invisible opacity-0 select-none w-[17.27vw] fixed right-[6.7vw] top-1/2 -translate-y-[23%]`} sizes='(max-width: 648px) 60vw, 25vw' />
          </div>


          <section style={{ height: svgHeight ? svgHeight + 'px' : '150vh', transform: 'translate3d(-50%,0,0)', top: `calc(50% - ${0.043 * svgHeight}px)` }} className='svgPage2 flex w-[115.86vw] left-1/2  mx-auto fixed' >
            <div className='svgPage2Inner w-full h-full absolute top-0 '>
              {/* <Image alt='' src='/images/mainpageMoonFeet.png' width='265' height='366' className={`page1feet opacity-0 w-[17.27vw] fixed right-[6.7vw] top-[28.5vh]`} style={{}} sizes='(max-width: 648px) 60vw, 25vw' /> */}
              {/*  timeline={scrubTl0} */}
              <Story0Logo id={'referenceSvg'} introAnimationTl={introAnimationTl} speed={1} scrollMin={0} scrollMax={0.15} />
              <Story1Moon scrubTl0={scrubTl0} scrubTl1={scrubTl1} transitionTl={transitionTl1} />
              <Story2Waves scrubTl={scrubTl2} transitionTl={transitionTl2} />
              <Story3Animals scrubTl={scrubTl3} transitionTl={transitionTl3} />
              {/* <Story3Animals scrubTl={scrubTl3} transitionTl={transitionTl3} /> */}
              <Story5Milo scrubTl={scrubTl5} transitionTl={transitionTl3} />

            </div>
          </section>
          {/* style={{top:heightToScroll||svgHeight}} */}
          {/* <Footer2 className={`relative`} noMotion noMargin setFooterNormalHeight={setFooterHeight} /> */}

          {/* LEGS */}
          {/* 265px */}
          <StoryTitle />

          <Page4Kakje scrubTl={scrubTl3} transitionTl={transitionTl4} />
          <PageDescription4 animateName='page4description' className={`text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} info={{ title: 'Studio', text: 'With my Studio Photography, I aim for precision and beauty in every planned shot. I use my keen eye for detail and passion for perfection to create bold, striking, and unforgettable images that capture the essence of my subject.' }} />

          <Page3Photos />
          {/* //page3 photos behind svg */}
          <Page3KakScrub scrubTl={scrubTl3} />
          <PageDescription animateName='page3description' className={`text-left bottom-12 left-12`} info={{ title: 'Fine Art', text: 'In my Fine Art Photography, I combine planned studio shots and improvisational timing in the outdoors to create a world of artistry that evokes emotion and inspires imagination. From conceptual pieces to ethereal portraits, I showcase the beauty of Experience and the power of creativity.' }} />

          <Page2Photos />
          <PageDescription animateName='page2description' className={`text-right top-12 right-12`} info={{ title: 'Documentary', text: 'Through my Documentary photography, I invite you to step into the real world and witness the beauty and complexity of everyday life. My images capture the raw, unscripted moments that make up our human experience, bringing to life the emotions and stories of those who are often overlooked.' }} />

          <Page1Photos timeline={scrubTl1} />
          <PageDescription animateName='page1description' className={`text-left top-12 left-12`} info={{ title: 'Behind The Scenes', text: 'With my Behind The Scenes Photography, I capture the moments that make every production unique, from planning to final take. I reveal the dedication and creativity that goes into bringing a vision to life, leaving you in awe of the process.' }} />

          {/* <section className='svgPage2 flex w-[115.86vw] left-1/2 -translate-x-1/2 h-screen mx-auto fixed top-[calc(50%-200px)] ' > */}
          {/* <Story2Moon speed={1} scrollMin={0} scrollMax={0} /> */}
          {/* </section> */}
          <Navigation />
        </PageWrapper>
        <ScrollVisual velocity={velocity.current} />
        {/* <ScrollVelocity  /> */}
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

