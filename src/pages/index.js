import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
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

gsap.registerPlugin(ScrollTrigger)

export default function Home({ }) {

  const { scrolled, width: screenWidth, height: screenHeight, } = useAppContext();
  // let svgRef = useRef(null)
  let ctx = useRef()
  let tl = useRef()
  let [svgHeight, setSvgHeight] = useState(undefined)
  let [svgWidth, setSvgWidth] = useState(undefined)
  let [titleHeight, setTitleHeight] = useState(undefined)
  let [svgViewHeight, setSvgViewHeight] = useState(undefined) //For calculation of FadeDiv
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

  let finishingScroll = mobile ? 0.95 : 0.995 // Same as ending of animation

  useEffect(() => {
    if (scrolled >= finishingScroll && !finished) { setFinished(true) }
  }, [scrolled])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (screenHeight > 0 && titleHeight > 0) {
      if ((screenHeight - titleHeight) !== svgViewHeight) {
        setSvgViewHeight(screenHeight - titleHeight)
      }
    }
  }, [screenHeight, titleHeight])
  // -------WITH TITLE AND FOOTER -------------
  // let heightToScroll = (mobile || finished) ? scrollingDivHeight + titleHeight + footerHeight : 6000
  // -------WITHOUT TITLE AND FOOTER -------------
  let heightToScroll = (mobile || finished) ? scrollingDivHeight : 6000

  useEffect(() => {
    ctx.current = gsap.context(() => { },)
    return () => ctx.current.revert()
  }, [])

  // useEffect(() => {
  //   ctx.current.add(() => {
  //     gsap.to(firstPageVisible,{

  //       scrollTrigger: {
  //       trigger: '#beam',
  //       // start: width < 648 ? '30% 20%' : 'center 20%',
  //       start: '30% bottom',
  //       // end: "max",
  //       invalidateOnRefresh: true,
  //       scrub: 2,
  //       markers: true,
  //     }}
  // }, [])

  // useEffect(() => {
  //   let observer = ScrollTrigger.observe({
  //     target: '#beam',         // can be any element (selector text is fine)
  //     // ignore: ".project-pictures, .project-grid, .imageFill",
  //     type: "scroll",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
  //     preventDefault: false,
  //     onRight: () => {
  //       // console.log('right/prev');
  //       // setAnimating(true)
  //       prevVisibility()
  //     },
  //     onLeft: () => {
  //       // console.log('left/next');
  //       // setAnimating(true)
  //       nextVisibility()
  //     },
  //     lockAxis: true,
  //   })
  //   return () => { observer.disable() }
  // }, [visibleItem, animating, descriptionOpen])

  useEffect(() => {
    ctx.current.add(() => {
      // gsap.to(['.svgPage1'], {
      //   y: '-=165vh',
      //   duration: 1.5,
      //   scrollTrigger: {
      //     trigger: '#beam',
      //     start: '30% 50%',
      //     end: "30% 50%",
      //     toggleActions: 'play none reverse none',
      //     invalidateOnRefresh: true,
      //     markers: false,
      //   }
      // })

      gsap.to(['.pageIntro'], {
        y: '-=120',
        // duration: 1,
        // ease: 'power2.inout',
        scrollTrigger: {
          // trigger: '#beam',
          // start: width < 648 ? '30% 20%' : 'center 20%',
          // start: '30% 50%',
          // end: "30% 50%",
          // toggleActions: 'play none reverse none',
          invalidateOnRefresh: true,
          scrub: 1,
          markers: false,
        }
      })

      //====================== PageTransition1 ======================
      gsap.timeline({
        scrollTrigger: {
          trigger: '#beam',
          start: '30% 60%',
          end: "30% 30%",
          // ease:'ease.out',
          // toggleActions: 'play none reverse none',
          invalidateOnRefresh: true,
          scrub: 2,
          markers: true,
        }
      })
        .to(['.pageIntro'], {
          y: '-=10vh',
          // opacity: 1,
          // duration: 1,
          ease: 'power2.inout',
        }, '<')
        .to(['.page1'], {
          y: '-=10vh',
          opacity: 1,
          // duration: 1,
          ease: 'power2.inout',
        }, '<')

        .to(['.page1stars'], {
          y: '-=40px',
          opacity: 1,
          // duration: 1,
          ease: 'power.inout',
        }, '<')

        .to(['.svgPage1'], {
          y: '-=165vh',
          duration: 2,
        }, '<')
        .to(['.page1feet'], {
          y: '-=5vh',
          opacity: 1,
          // duration: 1,
          ease: 'power.out',
        }, '<+=1')
        .to(['.pageIntro'], {
          opacity: 0,
        })
    })

    gsap.to(['.page1description'], {
      y: '-=5px',
      opacity: 1,
      stagger: 0.2,
      duration: 1,
      scrollTrigger: {
        trigger: '#beam',
        // start: width < 648 ? '30% 20%' : 'center 20%',
        start: '30% 25%',
        end: "30% 25%",
        toggleActions: 'play none reverse none',
        invalidateOnRefresh: true,
        // scrub: 2,
        markers: false,
      }
      // ease: 'expo.out',
    })

    gsap.to(['.page1photos'], {
      // y: '-=5px',
      opacity: 1,
      stagger: 0.05,
      duration: 1,
      scrollTrigger: {
        trigger: '#beam',
        // start: width < 648 ? '30% 20%' : 'center 20%',
        start: '30% 10%',
        end: "30% 10%",
        toggleActions: 'play none reverse none',
        invalidateOnRefresh: true,
        // scrub: 2,
        markers: false,
      }
      // ease: 'expo.out',
    })

    gsap.to(['.page1stars'], {
      y: '-=40px',
      // duration: 1,
      // ease: 'power2.inout',
      scrollTrigger: {
        trigger: '#beam',
        // start: width < 648 ? '30% 20%' : 'center 20%',
        start: '30% 45%',
        // end: '30% 45%',
        // toggleActions: 'play none reverse none',
        invalidateOnRefresh: true,
        scrub: 1,
        markers: false,
      }
    })

    //====================== PageTransition2 ======================
    gsap.timeline({
      scrollTrigger: {
        trigger: '#droplet1',
        start: '30% 57%',
        // end: "30% 55%",
        end: "30% 30%",
        // toggleActions: 'play none reverse none',
        invalidateOnRefresh: true,
        scrub: 2,
        markers: false,
      }
    }
    )
      .to(['.page1description'],
        {
          y: '-=10px',
          opacity: 0,
          stagger: 0.2,
          // stagger: 0.05,
        })
      .killTweensOf([`.page1photos`])
      .to(['.page1photos'],
        {
          opacity: 0,
          // y: '-=30',
          stagger: 0.05,
        }, '<')
        .to(['.svgPage1', '.page1feet'], {
          y: '-=100vh',
          // duration: 2,
        }, '<')
        .to('.page2', {
          opacity: 1,
          y: '-=10vh',
        },)
        .to(['.page1', '.page1stars'], {
        opacity: 0,
        y: '-=10vh',
      },'<+=0.5')
      

  }, [])

  return (
    <>
      <Head>
        <title>Meet Astrid | Spirée 2023</title>
        <meta name="description" content=" " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* style={{ height: heightToScroll + 'px' }}  */}
      <main style={{ height: heightToScroll + 'px' }} className={`w-full light-scrollbar`} >

        <PageWrapper
          darkMode={true}
          viewBox={mobile ? "0 0 701 5157" : "0 0 1782 5420"}
          // svgWidth={""} 
          finished={finished}
          mobile={mobile}
          setAnimationLocation={setAnimationLocation}
          setTextLocation={setTextLocation}
        >
          <Background type='bottom' priority amount={20} src='/images/mainpageStars.jpg' height='h-[160vh]' className={'pageIntro'} />
          <Background type='both' amount={10} src='/images/mainpageDocu.jpg' height='h-[100vh]' className={'page2 top-[90vh]'} />
          <Background type='bottom' amount={10} src='/images/mainpageMoon.jpg' height='h-[100vh]' className={'page1 opacity-0 top-[10vh]'} />
          <Background type='bottom' priority amount={70} src='/images/mainpageStars.jpg' height='h-[100vh]' className={'page1stars bottom-[40vh] opacity-0'} />

          <Image alt='' src='/images/mainpageMoonFeet.png' width='265' height='366' className={`page1feet opacity-0 w-[17.27vw] fixed right-[6.7vw] top-[28.5vh]`} style={{}} sizes='(max-width: 648px) 60vw, 25vw' />

          <section className='svgPage1 flex w-[115.86vw] left-1/2 -translate-x-1/2 h-screen mx-auto fixed top-[calc(50%-200px)] ' >
            <Story1Logo setIntroAnimated={setIntroAnimated} setSvgHeight={setSvgHeight} setSvgWidth={setSvgWidth} speed={1} scrollMin={0} scrollMax={0} />
          </section>
          {/* LEGS */}
          {/* 265px */}
          <StoryTitle textAppear={textAppear} textDisappear={textDisappear} />
          <PageDescription animateName='page1description' className={`text-left top-8 left-8`} info={{ title: 'Behind The Scenes', text: 'With my Behind The Scenes Photography, I capture the moments that make every production unique, from planning to final take. I reveal the dedication and creativity that goes into bringing a vision to life, leaving you in awe of the process.' }} />
          <Page1Photos />

          {/* <section className='svgPage2 flex w-[115.86vw] left-1/2 -translate-x-1/2 h-screen mx-auto fixed top-[calc(50%-200px)] ' > */}
          {/* <Story2Moon speed={1} scrollMin={0} scrollMax={0} /> */}
          {/* </section> */}

        </PageWrapper>
      </main >
    </>
  )
}


export async function getStaticProps() {

  return {
    props: {
    }
  };
}

