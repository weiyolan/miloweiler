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
      gsap.to(['.firstPage', '.svgPage'], {
        y: '-90vh',
        duration: 1,
        ease: 'power3.inout',
        scrollTrigger: {
          trigger: '#beam',
          // start: width < 648 ? '30% 20%' : 'center 20%',
          start: '30% 50%',
          end: "30% 50%",
          toggleActions: 'play none reverse none',
          invalidateOnRefresh: true,
          // scrub: 2,
          markers: true,
        }
      })
    })
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
          viewBox={mobile ? "0 0 701 5157" : "0 0 1760 5420"}
          // svgWidth={""} 
          finished={finished}
          mobile={mobile}
          setAnimationLocation={setAnimationLocation}
          setTextLocation={setTextLocation}
        >
          <Background type='bottom' amount={10} src='/images/mainpageMoon.jpg' className={'firstPage top-[90vh]'} />
          <Background type='bottom' amount={40} src='/images/mainpageStars.jpg' height='h-[160vh]' className={'firstPage'} />
          {/* <Background src='' /> */}
          {/* <Backgroun */}

          <section className='svgPage flex w-full h-screen mx-auto fixed top-[calc(50%-200px)] ' >

            {/* <FadeDiv style={{ height: (mobile || finished) ? scrollingDivHeight + 'px' : svgViewHeight + 'px', width: screenWidth + 'px', top: titleHeight + 'px' }} className={`${(mobile || finished) ? 'absolute' : 'fixed'} flex left-1/2 -translate-x-1/2 `} amount={false ? (finished ? 0 : mobile ? 2 : 10) : 0} type={false ? (finished ? `top` : 'both') : 'none'}> */}
            {/* <ScrollingDiv setMoveTracker={setMoveTracker} setMaxMoveTracker={setMaxMoveTracker} setScrollingDivHeight={setScrollingDivHeight} finishingScroll={finishingScroll} animationLocation={animationLocation} textLocation={textLocation} footerHeight={footerHeight} screenHeight={screenHeight} svgHeight={svgHeight} titleHeight={titleHeight}
                className={`absolute w-full left-1/2 -translate-x-1/2 ${screenHeight > 1000 ? 'top-[60px]' : 'top-6 md:top-[20px]'}`} > */}
            <Story1Logo setSvgHeight={setSvgHeight} setSvgWidth={setSvgWidth} speed={1} scrollMin={0} scrollMax={0}/>
            <Story2Moon speed={1} scrollMin={0} scrollMax={0} />

            {/* <Story2Pharma speed={1} scrollMin={mobile ? 0 : 0} scrollMax={mobile ? 0.05 : 0.10} />
                <Story3Mountain speed={1} scrollMin={mobile ? 0.055 : 0.11} scrollMax={mobile ? 0.11 : 0.2} />
                <Story4Flowers speed={1} scrollMin={mobile ? 0.115 : 0.215} scrollMax={mobile ? 0.2 : 0.35} />
                <Story5Meaning speed={1} scrollMin={mobile ? 0.22 : 0.39} scrollMax={mobile ? 0.28 : 0.42} />
                <Story6Spiree speed={1} scrollMin={mobile ? 0.29 : 0.45} scrollMax={mobile ? 0.35 : 0.53} />
                <Story7SunMoon speed={1} scrollMin={mobile ? 0.36 : 0.55} scrollMax={mobile ? 0.42 : 0.62} />
                <Story8Merino speed={1} scrollMin={mobile ? 0.48 : 0.64} scrollMax={mobile ? 0.53 : 0.70} />
                <Story9Passion speed={1} scrollMin={mobile ? 0.55 : 0.73} scrollMax={mobile ? 0.63 : 0.76} />
                <Story10RE speed={1} scrollMin={mobile ? 0.64 : 0.78} scrollMax={mobile ? 0.7 : 0.82} />
                <Story11Women speed={1} scrollMin={mobile ? 0.71 : 0.83} scrollMax={mobile ? 0.8 : 0.86} />
                <Story12Support speed={1} scrollMin={mobile ? 0.81 : 0.88} scrollMax={mobile ? 0.9 : 0.995} />
                <StoryText /> */}

            {/* </ScrollingDiv> */}
            {/* </FadeDiv> */}


          </section>

          {/* <Parallax className={`fixed left-16 bottom-24`}> */}
          <h1 className='font-lora text-6xl text-primary fixed left-16 bottom-24'>
            <span className='depth1 scale-0.5'>I am a</span>
            <span className='depth2 scale-125'>Photo</span>
            <span className='depth3 scale-150'>grapher</span>
          </h1>
          {/* </Parallax> */}
        </PageWrapper>
      </main>
    </>
  )
}


export async function getStaticProps() {

  return {
    props: {
    }
  };
}

