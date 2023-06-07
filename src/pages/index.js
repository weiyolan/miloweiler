import React, { useEffect, useState, useRef, useCallback } from 'react'
import Head from 'next/head'
import { Lenis as ReactLenis } from '@studio-freight/react-lenis'

// import Image from 'next/image'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
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
import Story1Logo from '@/components/line/Story1Logo'
import Story2Moon from '@/components/line/Story2Moon'


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
import Story2Waves from '@/components/line/Story2Waves'
import ScrollVisual from '@/components/line/ScrollVisual'
import Footer2 from '@/components/Footer2'
import ScrollVelocity from '@/components/ScrollVelocity'
import { flushSync } from 'react-dom'

gsap.registerPlugin(ScrollTrigger)

export default function Home({ }) {
  const { scrolled, width: screenWidth, height: screenHeight, } = useAppContext();
  // let svgRef = useRef(null)
  // let ctx = useRef()
  // let tl = useRef()
  let [masterTl, setMasterTl] = useState();
  let [showPage1Tl, setToTheMoonTl] = useState();
  // let [masterTl, setMasterTl] = useState();
  // let [masterTl, setMasterTl] = useState();
  // let [masterTl, setMasterTl] = useState();

  let [svgHeight, setSvgHeight] = useState(undefined)
  let [svgWidth, setSvgWidth] = useState(undefined)
  let [svgTop, setSvgTop] = useState(undefined) //For calculation of FadeDiv
  // let [titleHeight, setTitleHeight] = useState(undefined)
  // let [svgViewHeight, setSvgViewHeight] = useState(undefined) //For calculation of FadeDiv

  let velocity = useRef(0)
  let [scrollingDivHeight, setScrollingDivHeight] = useState(undefined)

  let [footerHeight, setFooterHeight] = useState(undefined)
  let [animationLocation, setAnimationLocation] = useState({ top: undefined, bottom: undefined })
  let [textLocation, setTextLocation] = useState({ top: undefined, bottom: undefined })

  let [moveTracker, setMoveTracker] = useState(0) //Tracker to move background when animation moves
  let [maxMoveTracker, setMaxMoveTracker] = useState(0) //Tracker to move background when animation moves

  let [finished, setFinished] = useState(false)
  let [introAnimated, setIntroAnimated] = useState(false)
  let [textAppear, setTextAppear] = useState({ textAppear: false })
  let [textDisappear, setTextDisappear] = useState({ textDisappear: false })

  let mobile = screenWidth < 768

  // let finishingScroll = mobile ? 0.95 : 0.995 // Same as ending of animation
  let finishingScroll = 2 // impossible, so will never activate

  useEffect(() => {
    if (scrolled >= finishingScroll && !finished) { setFinished(true) }
  }, [scrolled])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // useEffect(() => {
  //   if (screenHeight > 0 && titleHeight > 0) {
  //     if ((screenHeight - titleHeight) !== svgViewHeight) {
  //       setSvgViewHeight(screenHeight - titleHeight)
  //     }
  //   }
  // }, [screenHeight, titleHeight])

  // -------WITH TITLE AND FOOTER -------------
  // let heightToScroll = (mobile || finished) ? scrollingDivHeight + titleHeight + footerHeight : 6000

  // -------WITHOUT TITLE AND FOOTER -------------
  // let heightToScroll = (mobile || finished) ? scrollingDivHeight : 6000

  let heightToScroll = svgHeight + footerHeight
  let viewBoxWidth = 1782
  // let viewBoxHeight = 5390
  let viewBoxHeight = 5142
  let svgScrubAmount = 100; //in px
  // useEffect(() => {
  //   // console.log(svgWidth, svgHeight, footerHeight)
  // }, [svgWidth, svgHeight, footerHeight])

  // const addAnimation = useCallback((animation, index) => {
  //   tl && tl.add(animation, index);
  // }, [tl]);

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
  function showPage1() {
    // SCALE 2 SEC
    let tl = gsap.timeline()
      // .set('.pageIntro', {
      //   y: '-15vh',
      // }, 0)
      // .to('.mainBackground', { duration: 100 })
      .to(['.svgPage2'],
        {
          // y: `-=${0.28335 * svgHeight + svgTop - screenHeight / 2}px`, //REL
          // y: `-${0.27810 * svgHeight + svgTop - screenHeight / 2}px`, //ABS
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
      .to(['.page1feet'],
        // {y: '-70%'},
        {
          y: '-63%',
          ease: 'power2.out',
          duration: 1
        }
        , 0.5)
      .to(['.page1feet'], {
        opacity: 1,
        duration: 1,
      }, "<")
    return tl
  }
  function showInfo1() {
    let tl = gsap.timeline()
      .to('.page1description', {
        autoAlpha: 1,
        y: '-=5px',
        stagger: 0.2,
        duration: 1,
      }, 0)
      .to('.page1photos', {
        // y: '-=5px',
        // onStart: () => console.log('started'),
        // onComplete: () => console.log('completed'),
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
  // ============================= page2 =============================
  function showPage2() {
    let tl = gsap.timeline()
      .to(['.svgPage2'],
        {
          // y: `-=${0.28335 * svgHeight + svgTop - screenHeight / 2}px`, //REL
          // y: `-${0.27810 * svgHeight + svgTop - screenHeight / 2}px`, //ABS
          duration: 1,
          y: `-${(0.4432) * svgHeight + svgTop - svgScrubAmount - (screenHeight / 2)}px`, //ABS -svgScrubAmount from moveStar animation (about 100 px)
          // y: `-${(0.27810-0.09) * svgHeight + svgTop - (screenHeight / 2)}px`, //ABS -0.09%
        }, 0)
      .to(['.page2'], {
        y: '-30vh',
        opacity: 1,
        duration: 2,
        ease: 'ease.out'
      }, 0)
    return tl
  }
  function showInfo2() {
    let tl = gsap.timeline()
      .to('.page2description', {
        autoAlpha: 1,
        y: '-=5px',
        stagger: 0.2,
        duration: 1,
      }, 0)
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
      .to(['.page1feet'],
        {
          // y: '-73%',
          y: '-=300px',
          opacity: 0,
          ease: 'power2.out',
          duration: 1
        }
        , 0)
    return tl
  }
  function hideInfo1() {
    let tl = gsap.timeline()
      .to('.page1descriptionInner', {
        autoAlpha: 0,
        // y: '-=5px',
        // stagger: 0.2,
        duration: 0.5,
      }, 0)
      .to('.page1photosInner', {
        // y: '-=5px',
        // onStart: () => console.log('started'),
        // onComplete: () => console.log('completed'),
        autoAlpha: 0,
        // stagger: 0.05,
        duration: 0.5
      }, 0)
    return tl
  }
  // ============================= page3 =============================
  function showPage3() {
    let tl = gsap.timeline()
      .to(['.svgPage2'],
        {
          // y: `-=${0.28335 * svgHeight + svgTop - screenHeight / 2}px`, //REL
          // y: `-${0.27810 * svgHeight + svgTop - screenHeight / 2}px`, //ABS
          duration: 1,
          y: `-${(0.6056) * svgHeight + svgTop - svgScrubAmount - (screenHeight / 2)}px`, //ABS -svgScrubAmount from moveStar animation (about 100 px)
          // y: `-${(0.27810-0.09) * svgHeight + svgTop - (screenHeight / 2)}px`, //ABS -0.09%
        }, 0)
      .to(['.page3'], {
        y: '-30vh',
        opacity: 1,
        duration: 2,
        ease: 'ease.out'
      }, 0)
    return tl
  }
  function showInfo3() {
    let tl = gsap.timeline()
      .to('.page3description', {
        autoAlpha: 1,
        y: '-=5px',
        stagger: 0.2,
        duration: 1,
      }, 0)
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
      .to('.page2descriptionInner', {
        autoAlpha: 0,
        // y: '-=5px',
        // stagger: 0.2,
        duration: 0.5,
      }, 0)

    return tl
  }

  function tl1() {
    const tl1 = gsap.timeline({
      scrollTrigger: {
        // trigger: '.mainBackground',
        start: 'bottom bottom',
        ease: 'power2.inout',
        invalidateOnRefresh: true,
        scrub: 2,
        markers: { startColor: 'white', indent: 100 },
        onUpdate: self => {
          // console.log(self.getVelocity())
          velocity.current = self.getVelocity()
        },
        // pin:'.svgPage2'
      }
    })
      .addLabel('page0Start', 0)
      .addLabel('showPage1', 10)
      // .add(showPage1, 'showPage1')
      // .duration(100)
      .to('.mainBackground', {
        // opacity: 1,
        duration: 100,
      }, 0)

    // .to('.svgPage2',{
    //   y:`+${0.05*svgHeight}px`,
    //   duration:10 ,
    // },26)

    // // .to(['.titleText'], {
    // //   opacity: 1,
    // //   stagger: 0.1,
    // //   duration: 5,
    // // }, 2)

    // // .to(['.mainBackground'], {
    // //   backgroundColor: `#990000`,
    // // },3)




    // // .to('.depth3Title', {
    // //   opacity: 0,
    // //   // y: '+=220',
    // //   //  stagger:stagger,
    // //   duration: 1,
    // //   ease: 'power3.out'
    // // }, '<10%')
    // // .to('.depth2Title', {
    // //   opacity: 0,
    // //   // y: '+=250',
    // //   //  stagger:stagger,
    // //   duration: 1,
    // //   ease: 'power3.out'
    // // }, '<')
    // // .to('.depth1Title', {
    // //   opacity: 0,
    // //   // y: '+=270',
    // //   //  stagger:stagger,
    // //   duration: 1,
    // //   ease: 'power3.out'
    // // }, '<')
    // .to(['.pageIntro'], {
    //   y: '-=50vh',
    //   duration: 20,
    //   ease: 'power2.out'
    //   // ease: 'power2.inout',
    // }, 0)

    // .to(['.page1'], {
    //   y: '-=40vh',
    //   opacity: 1,
    //   duration: 20,
    //   // ease: 'power2.inout',
    // }, 0)
    // , 'page1Start-=20')
    // // .to(['.page1stars'], {
    // //   y: '-=40px',
    // //   opacity: 1,
    // //   // ease: 'power.inout',
    // // }, '<')
    // // .to(['.page1feet'], {
    // //   y: '-=5vh',
    // //   opacity: 1,
    // //   // ease: 'power.out',
    // // }, '<')
    // // // .to(['.pageIntro'], {
    // // //   opacity: 0,
    // // //   // end: '+=50'
    // // // })


    // // .to(['.page1stars'], {
    // //   y: '-=40px',
    // // })
    // //====================== PageTransition2 ======================

    // .to(['.svgPage1', '.page1feet'], {
    //   // y: `-=${0.15986 * svgHeight}px`, //REL
    //   y: `-${(0.15986 + 0.28335) * svgHeight + svgTop - screenHeight / 2}px`, //ABS
    //   duration: 10,
    //   ease: 'power4.inout',
    // }, 20)

    // //====================== PageTransition3 ======================

    // .to(['.svgPage1'], {
    //   // y: `-=${0.15986 * svgHeight}px`, //REL
    //   y: `-${(0.15986 * 2 + 0.28335) * svgHeight + svgTop - screenHeight / 2}px`, //ABS

    //   duration: 10,
    //   ease: 'power4.inout',
    // }, 40)

    // //====================== PageTransition4 ======================
    // .to(['.svgPage1'], {
    //   // y: `-=${0.15986 * svgHeight}px`, //REL
    //   y: `-${(0.15986 * 3 + 0.28335) * svgHeight + svgTop - screenHeight / 2}px`, //ABS
    //   duration: 10,
    //   ease: 'power4.inout',
    //   onStart: () => console.log('transition 4 started'),
    //   onComplete: () => console.log('transition 4 complete')
    // }, 60)

    // //====================== PageTransition5 ======================
    // .to(['.svgPage1'], {
    //   // y: `-=${0.2328 * svgHeight }px`, //REL
    //   y: `-${(0.2328 + 0.15986 * 3 + 0.28335) * svgHeight + svgTop - screenHeight / 2}px`, //ABS
    //   duration: 10,
    //   ease: 'power4.inout',
    //   onStart: () => console.log('transition 5 started'),
    //   onComplete: () => console.log('transition 5 completed'),
    // }, 80)
    return tl1
  }

  useEffect(() => {
    let ctx = gsap.context(() => {
      let transition1 = showPage1().paused(true).add(hideIntro(), 0).add(showInfo1(), 1).progress(0)
      setToTheMoonTl(transition1);
      ScrollTrigger.create({
        start: `bottom bottom-=${0.81 * screenHeight}`,
        end: `bottom bottom-=${0.81 * screenHeight}`,
        // ease: 'power2.inout',
        invalidateOnRefresh: true,
        toggleActions: 'play none reverse none',
        preventOverlaps: true,
        markers: false,
        onEnter: () =>
          gsap.to(transition1, {
            overwrite: true,
            progress: 1,
            duration: 3,
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

      let animation1 = scrubIntro(false).paused(true).add(introText(), 0).progress(0);
      setMasterTl(animation1);
      gsap.to(animation1,
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
            invalidateOnRefresh: true,
            preventOverlaps: true,
          }
        });

      let transition2 = showPage2().paused(true).add(hidePage1(), 0).add(hideInfo1(), 0).add(showInfo2(), 1).progress(0)
      ScrollTrigger.create({
        start: `bottom+=${1 * screenHeight} bottom-=${0.81 * screenHeight}`,
        end: `bottom+=${1 * screenHeight} bottom-=${0.81 * screenHeight}`,
        invalidateOnRefresh: true,
        toggleActions: 'play none reverse none',
        preventOverlaps: true,
        markers: false,
        onEnter: () =>
          gsap.to(transition2, {
            overwrite: true,
            progress: 1,
            duration: 3,
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

      let transition3 = showPage3().paused(true).add(hidePage2(), 0).add(hideInfo2(), 0).add(showInfo3(), 1).progress(0)
      ScrollTrigger.create({
        start: `bottom+=${2 * screenHeight} bottom-=${0.81 * screenHeight}`,
        end: `bottom+=${2 * screenHeight} bottom-=${0.81 * screenHeight}`,
        invalidateOnRefresh: true,
        toggleActions: 'play none reverse none',
        preventOverlaps: true,
        markers: false,
        onEnter: () =>
          gsap.to(transition3, {
            overwrite: true,
            progress: 1,
            duration: 3,
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

      // setMasterTl(masterTl);
      // setMasterTl(tl1());

    })
    return () => { console.log('ctx reverted'); ctx.revert() }
  }, [svgHeight, screenHeight])

  // useEffect(() => {
  // console.log(showPage1Tl?.progress())
  // }, [showPage1Tl?.progress()])

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
      <main style={{ height: '600vh' }} className={`w-full mainBackground relative bg-black`} >

        <PageWrapper
          darkMode={true}
          viewBox={mobile ? "0 0 701 5157" : `0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          // svgWidth={""} 
          finished={false}
          // finished={finished}
          mobile={mobile}
          setAnimationLocation={setAnimationLocation}
          setTextLocation={setTextLocation}
        >

          <Background type='both' amount={10} src='/images/mainpageArt.jpg' height='h-[110vh]' animationName={'page3'} className={'opacity-0 top-[20vh]'} />
          <Background type='both' amount={10} src='/images/mainpageDocu.jpg' height='h-[110vh]' animationName={'page2'} className={'opacity-0 top-[20vh]'} />
          <Background type='both' amount={10} src='/images/mainpageMoon.jpg' height='h-[110vh]' animationName={'page1'} className={'opacity-0 top-[30vh]'} />
          <Background type='bottom' priority amount={50} src='/images/mainpageStarsCut.jpg' height='h-[50vh]' animationName={'page1stars'} className={' opacity-50 top-[-10vh]'} />
          {/* <Background type='bottom' priority amount={40} src='/images/mainpageIntro.jpeg' height='h-[110vh]' animationName={'pageIntro'} className={'pageIntro top-0'} /> */}
          <Background type='bottom' priority amount={40} src='/images/mainpageStars.jpg' height='h-[110vh]' animationName={'pageIntro'} className={' top-0'} />
          {/* <Background type='bottom' priority amount={70} src='/images/mainpageStars.jpg' height='h-[100vh]' className={'page1stars bottom-[40vh] opacity-0'} /> */}

          <Image
            // style={{ 'maskImage': `linear-gradient(to bottom, transparent, black ${50}%, black ${100}%)`, 'maskSize': '100% 100%', 'WebkitMaskImage': `linear-gradient(to bottom, transparent, black ${50}%, black ${100}%)`, 'maskPosition': '0 0', 'maskRepeat': 'no-repeat', }}
            alt='' src='/images/mainpageMoonFeet.png' width='265' height='366' className={`will-change-transform page1feet opacity-0 w-[17.27vw] fixed right-[6.7vw] top-1/2 -translate-y-[63%]`} sizes='(max-width: 648px) 60vw, 25vw' />

          <section style={{ height: svgHeight ? svgHeight + 'px' : '150vh', transform: 'translate3d(-50%,0,0)' }} className='svgPage2 flex w-[115.86vw] left-1/2  mx-auto fixed top-[calc(200px)] ' >
            <div className='svgPage2Inner w-full h-full absolute top-0 '>
              {/* <Image alt='' src='/images/mainpageMoonFeet.png' width='265' height='366' className={`page1feet opacity-0 w-[17.27vw] fixed right-[6.7vw] top-[28.5vh]`} style={{}} sizes='(max-width: 648px) 60vw, 25vw' /> */}
              {/*  timeline={masterTl} */}
              <Story1Logo masterTl={masterTl} timeline={showPage1Tl} setSvgTop={setSvgTop} setSvgHeight={setSvgHeight} setSvgWidth={setSvgWidth} speed={1} scrollMin={0} scrollMax={0.15} />
              <Story2Waves timeline={masterTl} speed={1} scrollMin={0.14} scrollMax={0.16} />
            </div>
          </section>
          {/* style={{top:heightToScroll||svgHeight}} */}
          {/* <Footer2 className={`relative`} noMotion noMargin setFooterNormalHeight={setFooterHeight} /> */}

          {/* LEGS */}
          {/* 265px */}
          <StoryTitle />
          <Page1Photos />
          <PageDescription animateName='page1description' className={`text-left top-8 left-8`} info={{ title: 'Behind The Scenes', text: 'With my Behind The Scenes Photography, I capture the moments that make every production unique, from planning to final take. I reveal the dedication and creativity that goes into bringing a vision to life, leaving you in awe of the process.' }} />
          <PageDescription animateName='page2description' className={`text-right top-8 right-8`} info={{ title: 'Documentary', text: 'Through my Documentary photography, I invite you to step into the real world and witness the beauty and complexity of everyday life. My images capture the raw, unscripted moments that make up our human experience, bringing to life the emotions and stories of those who are often overlooked.' }} />
          <PageDescription animateName='page3description' className={`text-left bottom-8 left-8`} info={{ title: 'Fine Art', text: 'In my Fine Art Photography, I combine planned studio shots and improvisational timing in the outdoors to create a world of artistry that evokes emotion and inspires imagination. From conceptual pieces to ethereal portraits, I showcase the beauty of Experience and the power of creativity.' }} />

          {/* <section className='svgPage2 flex w-[115.86vw] left-1/2 -translate-x-1/2 h-screen mx-auto fixed top-[calc(50%-200px)] ' > */}
          {/* <Story2Moon speed={1} scrollMin={0} scrollMax={0} /> */}
          {/* </section> */}
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

