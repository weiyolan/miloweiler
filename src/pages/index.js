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

gsap.registerPlugin(ScrollTrigger)

export default function Home({ }) {
  const { scrolled, width: screenWidth, height: screenHeight, } = useAppContext();
  // let svgRef = useRef(null)
  // let ctx = useRef()
  // let tl = useRef()
  let [masterTl, setMasterTl] = useState();
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
  let viewBoxHeight = 5390
  // let viewBoxHeight = 5142

  useEffect(() => {
    // console.log(svgWidth, svgHeight, footerHeight)
  }, [svgWidth, svgHeight, footerHeight])


  // const addAnimation = useCallback((animation, index) => {
  //   tl && tl.add(animation, index);
  // }, [tl]);

  useEffect(() => {
    let ctx = gsap.context(() => {

      // gsap.to('.svgPage2', {
      //   scrollTrigger:{
      //     trigger: ".svgPage2",
      //     markers: true,
      //     start: "28% 50%",
      //     end: "+=400",
      //     pin: ".svgPage2",
      //     // scrub:2,
      //   }
      // })
      const animation1 = gsap.timeline({
        // duration:10,
        scrollTrigger: {
          // trigger: 'window',
          start: 'bottom bottom',
          end: `+=${0.3 * screenHeight}px`,
          scrub: 2,
          markers: true,
          invalidateOnRefresh: true,
          preventOverlaps:true,
        }
      })
        .to('.pageIntro', {
          y: '-10vh'
        }, 0)
        // 
        const transition1 = gsap.timeline({
        // ease: 'power3.inout',
        scrollTrigger: {
          // trigger: '',
          start: `bottom center-=${0.40 * screenHeight}`,
          end: `bottom center-=${0.40 * screenHeight}`,
          // start: `bottom+=${0.3 * screenHeight} bottom`,
          // start:'bottom bottom',
          ease: 'power2.inout',
          invalidateOnRefresh: true,
          // scrub: 2,
          markers: {startColor: "pink",indent: 40},
          toggleActions:'play none reverse none',
          preventOverlaps:true,
          // onUpdate: self => {
          //   // console.log(self.getVelocity())
          //   velocity.current = self.getVelocity()
          // },
          // pin:'.svgPage2'
        }
      })
        // .to('.mainBackground', { duration: 100 })
        .to(['.svgPage2'], {
          // y: `-=${0.28335 * svgHeight + svgTop - screenHeight / 2}px`, //REL
          y: `-${0.28335 * svgHeight + svgTop - screenHeight / 2}px`, //ABS
          // duration: 3,
          // duration: 10,
        }, 0)
        .to(['.pageIntro'], {
          y: '-50vh',
          // duration: 3,
          ease: 'power2.out'
          // ease: 'power2.inout',
        }, 0)
        .to(['.page1'], {
          y: '-40vh',
          opacity: 1,
          // duration: 3,
          // ease: 'power2.inout',
        }, 0)
      // .to(['.mainBackground'], {
      //   backgroundColor: `#000099`,
      // },5)


      //====================== PageTransition1 ======================
      // gsap.to(['.depth3Title', '.depth1Title', '.depth2Title'], {
      //   opacity: 1,
      //   // y: '-=5',
      //   stagger: 0.07,
      //   // duration: 2,
      //   scrollTrigger: {
      //     start: '+=5%',
      //     // start: '+=10%',
      //     markers: false,
      //     invalidateOnRefresh: true,
      //   },
      //   ease: 'power3.out'
      // }, '<')

      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: '.mainBackground',
          // start:'bottom bottom',
          ease: 'power2.inout',
          invalidateOnRefresh: true,
          scrub: 2,
          markers: false,
          onUpdate: self => {
            // console.log(self.getVelocity())
            velocity.current = self.getVelocity()
          },
          // pin:'.svgPage2'
        }
      })
        .addLabel('page0Start', 0)
        .addLabel('transition1', 10)  
        // .add(transition1, 'transition1')
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
        // // .to(['.page1description'], {
        // //   y: '-=5px',
        // //   opacity: 1,
        // //   stagger: 0.2,
        // //   // end: '+=20'
        // // }, '<')
        // // .to(['.page1photos'], {
        // //   // y: '-=5px',
        // //   opacity: 1,
        // //   stagger: 0.05,
        // // }, '<50%')
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

      // const masterTl = gsap.timeline()
      //   .add(animation1)
      //   .add(transition1, 10)

      setMasterTl(tl1);

    })
    return () => ctx.revert()

  }, [svgHeight, screenHeight])


  return (
    <>
      <Head>
        <title>Meet Astrid | Spirée 2023</title>
        <meta name="description" content=" " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ReactLenis root options={{ duration: 0.9, wheelMultiplier: 0.9 }}>
        {/* style={{ height: heightToScroll + 'px' }} light-scrollbar */}
        <main style={{ height: '300vh' }} className={`w-full mainBackground relative bg-black`} >

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

            <Background type='bottom' amount={10} src='/images/mainpageMoon.jpg' height='h-[110vh]' className={'page1 opacity-0 top-[40vh]'} />
            <Background type='bottom' priority amount={40} src='/images/mainpageStars.jpg' height='h-[110vh]' className={'pageIntro top-0'} />
            {/* <Background type='both' amount={10} src='/images/mainpageDocu.jpg' height='h-[100vh]' className={'page2 top-[10vh]'} /> */}
            {/* <Background type='bottom' priority amount={70} src='/images/mainpageStars.jpg' height='h-[100vh]' className={'page1stars bottom-[40vh] opacity-0'} /> */}

            {/* <Image alt='' src='/images/mainpageMoonFeet.png' width='265' height='366' className={`page1feet opacity-0 w-[17.27vw] fixed right-[6.7vw] top-[28.5vh]`} style={{}} sizes='(max-width: 648px) 60vw, 25vw' /> */}


            {/* <section className='svgPage1 flex w-[115.86vw] left-1/2 -translate-x-1/2 h-screen mx-auto fixed top-[calc(50%-200px)] ' >
            <Story1Logo setIntroAnimated={setIntroAnimated} setSvgTop={setSvgTop} setSvgHeight={setSvgHeight} setSvgWidth={setSvgWidth} speed={1} scrollMin={0} scrollMax={0.15} />
            <Story2Waves speed={1} scrollMin={0.14} scrollMax={0.16} />
          </section> */}

            <section style={{ height: svgHeight ? svgHeight + 'px' : '150vh', transform:'translate3d(-50%,0,0)' }} className='svgPage2 flex w-[115.86vw] left-1/2  mx-auto fixed top-[calc(200px)] ' >
              <Image alt='' src='/images/mainpageMoonFeet.png' width='265' height='366' className={`page1feet opacity-0 w-[17.27vw] fixed right-[6.7vw] top-[28.5vh]`} style={{}} sizes='(max-width: 648px) 60vw, 25vw' />
              {/* timeline={masterTl} */}
              <Story1Logo setSvgTop={setSvgTop} setSvgHeight={setSvgHeight} setSvgWidth={setSvgWidth} speed={1} scrollMin={0} scrollMax={0.15} />
              <Story2Waves timeline={masterTl} speed={1} scrollMin={0.14} scrollMax={0.16} />
            </section>
            {/* style={{top:heightToScroll||svgHeight}} */}
            {/* <Footer2 className={`relative`} noMotion noMargin setFooterNormalHeight={setFooterHeight} /> */}

            {/* LEGS */}
            {/* 265px */}
            {/* <StoryTitle textAppear={textAppear} textDisappear={textDisappear} /> */}
            {/* <PageDescription animateName='page1description' className={`text-left top-8 left-8`} info={{ title: 'Behind The Scenes', text: 'With my Behind The Scenes Photography, I capture the moments that make every production unique, from planning to final take. I reveal the dedication and creativity that goes into bringing a vision to life, leaving you in awe of the process.' }} /> */}
            {/* <Page1Photos /> */}

            {/* <section className='svgPage2 flex w-[115.86vw] left-1/2 -translate-x-1/2 h-screen mx-auto fixed top-[calc(50%-200px)] ' > */}
            {/* <Story2Moon speed={1} scrollMin={0} scrollMax={0} /> */}
            {/* </section> */}
          </PageWrapper>
          <ScrollVisual velocity={velocity.current} />
          {/* <ScrollVelocity  /> */}
        </main >
      </ReactLenis>
    </>
  )
}


export async function getStaticProps() {

  return {
    props: {
    }
  };
}

