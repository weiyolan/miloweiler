import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
// import Image from 'next/image'

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
import Story1Astrid from '@/components/line/Story1Astrid'
// import Story2Pharma from '@/components/story/Story2PharmaBackup'
import Story2Pharma from '@/components/line/Story2Pharma'
import Story3Mountain from '@/components/line/Story3Mountain'
import Story4Flowers from '@/components/line/Story4Flowers'
import Story5Meaning from '@/components/line/Story5Meaning'
import Story6Spiree from '@/components/line/Story6Spiree'
import Story7SunMoon from '@/components/line/Story7SunMoon'
import Story8Merino from '@/components/line/Story8Merino'
import Story9Passion from '@/components/line/Story9Passion'
import Story10RE from '@/components/line/Story10RE'
import Story11Women from '@/components/line/Story11Women'
import Story12Support from '@/components/line/Story12Support'
import StoryText from '@/components/line/StoryText'

// import Navbar from '@/components/navbar/Navbar'
// import ShoppingCart from '@/components/cart/ShoppingCart'
import Button from '@/components/Button'
import Background from '@/components/Background'

export default function Home({ }) {

  const { scrolled, width: screenWidth, height: screenHeight,  } = useAppContext();
  // let svgRef = useRef(null)
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
    
    if (scrolled >= finishingScroll && !finished) { setFinished(true)}
  }, [scrolled])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])



  function getButtonPositionX(x) {
    //SVG viewPortWidth and Height: 
    // mobile     701 5157
    // desktop    1760 5420
    // x length from left of SVG to middle of button. X from middle of html
    let width = (mobile ? 701 : 1760);
    let X = svgWidth * (x - (width / 2)) / (width)
    return X
  }

  function getButtonPositionY(y) {
    //SVG viewPortWidth and Height: 
    // mobile     701 5157
    // desktop    1760 5420
    // y from bottom of SVG. Y from top of html
    let Y = titleHeight + scrollingDivHeight - (svgHeight * y / (mobile ? 5157 : 5420))
    return Y
  }

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
  let heightToScroll = (mobile || finished) ? scrollingDivHeight  : 6000

  return (
    <>
      <Head>
        <title>Meet Astrid | Spirée 2023</title>
        <meta name="description" content=" " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main style={{ height: heightToScroll + 'px' }} className={`w-full scrollbar-small`} >

        <PageWrapper
          darkMode={true}
          viewBox={mobile ? "0 0 701 5157" : "0 0 1760 5420"}
          // svgWidth={""} 
          finished={finished}
          mobile={mobile}
          setAnimationLocation={setAnimationLocation}
          setTextLocation={setTextLocation}
        >
          <Background type='bottom' amount={10} src='/images/mainpageStars.jpg' />
          {/* <Background src='' /> */}
{/* <Backgroun */}

          <section className='flex w-full mx-auto ' >

            <FadeDiv style={{ height: (mobile || finished) ? scrollingDivHeight + 'px' : svgViewHeight + 'px', width: screenWidth + 'px', top: titleHeight + 'px' }} className={`${(mobile || finished) ? 'absolute' : 'fixed'} flex left-1/2 -translate-x-1/2 `} amount={false ? (finished ? 0 : mobile ? 2 : 10) : 0} type={false ? (finished ? `top` : 'both') : 'none'}>

              <ScrollingDiv setMoveTracker={setMoveTracker} setMaxMoveTracker={setMaxMoveTracker} setScrollingDivHeight={setScrollingDivHeight} finishingScroll={finishingScroll} animationLocation={animationLocation} textLocation={textLocation} footerHeight={footerHeight} screenHeight={screenHeight} svgHeight={svgHeight} titleHeight={titleHeight}
                className={`absolute w-full left-1/2 -translate-x-1/2 ${screenHeight > 1000 ? 'top-[60px]' : 'top-6 md:top-[20px]'}`} >

                <Story1Astrid setSvgHeight={setSvgHeight} setSvgWidth={setSvgWidth} speed={1} scrollMin={0} scrollMax={0} />


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

              </ScrollingDiv>
            </FadeDiv>

          </section>

{/* 
          <div style={{ transform: `translate(calc(-50% + ${getButtonPositionX(mobile ? 298 : 671)}px), calc(-100% + ${getButtonPositionY(mobile ? 2650 : 1360)}px)` }} className='absolute left-1/2 top-0'>
            <Button text='Pre-Order' to='/pre-order'
              small={screenWidth < 900} med={screenWidth > 900} tabIndex={finished ? 0 : mobile ? (scrolled > 0.92 ? 0 : -1) : -1}
              className={`transition-all ${finished ? 'visible ' : mobile ? (scrolled > 0.92 ? 'visible ' : 'invisble') : 'invisible'}`}
              style={{ transition: 'all 0.5s ease, opacity 1.5s ease', opacity: finished ? 1 : mobile ? (scrolled > 0.40 ? 1 : 0) : 0 }}
            />
          </div>

          <div style={{ transform: `translate(calc(-50% + ${getButtonPositionX(mobile ? 448 : 822)}px), calc(-100% + ${getButtonPositionY(mobile ? 2549 : 1294)}px)` }} className='absolute left-1/2 top-0'>
            <Button text='Sun' to='/collection/#sun'
              small={screenWidth < 900} med={screenWidth > 900} tabIndex={finished ? 0 : mobile ? (scrolled > 0.92 ? 0 : -1) : -1}
              className={`transition-all ${finished ? 'visible ' : mobile ? (scrolled > 0.92 ? 'visible ' : 'invisble') : 'invisible'}`}
              style={{ transition: 'all 0.5s ease, opacity 1.5s ease', opacity: finished ? 1 : mobile ? (scrolled > 0.42 ? 1 : 0) : 0 }}
            />
          </div>

          <div style={{ transform: `translate(calc(-50% + ${getButtonPositionX(mobile ? 556 : 883)}px), calc(-100% + ${getButtonPositionY(mobile ? 2462 : 1215)}px)` }} className='absolute left-1/2 top-0'>
            <Button text='Moon' to='/collection/#moon'
              small={screenWidth < 900} med={screenWidth > 900} tabIndex={finished ? 0 : mobile ? (scrolled > 0.92 ? 0 : -1) : -1}
              className={`transition-all ${finished ? 'visible ' : mobile ? (scrolled > 0.92 ? 'visible ' : 'invisble') : 'invisible'}`}
              style={{ transition: 'all 0.5s ease, opacity 1.5s ease', opacity: finished ? 1 : mobile ? (scrolled > 0.43 ? 1 : 0) : 0 }}
            />
          </div>

          <div style={{ transform: `translate(calc(-50% + ${getButtonPositionX(mobile ? 497 : 1183)}px), calc(-100% + ${getButtonPositionY(mobile ? 1744 : 819)}px)` }} className='absolute left-1/2 top-0'>
            <Button text='100% Merino' to='/merino'
              small={screenWidth < 900} med={screenWidth > 900} tabIndex={finished ? 0 : mobile ? (scrolled > 0.92 ? 0 : -1) : -1}
              className={`transition-all ${finished ? 'visible ' : mobile ? (scrolled > 0.92 ? 'visible ' : 'invisble') : 'invisible'}`}
              style={{ transition: 'all 0.5s ease, opacity 1.5s ease', opacity: finished ? 1 : mobile ? (scrolled > 0.53 ? 1 : 0) : 0 }}
            />
          </div>
          <div style={{ transform: `translate(calc(-50% + ${getButtonPositionX(mobile ? 442 : 591)}px), calc(-100% + ${getButtonPositionY(mobile ? 956 : 565)}px)` }} className='absolute left-1/2 top-0'>
            <Button text='Run Everywhere' to='https://www.facebook.com/groups/runeverywhere.spiree'
              small={screenWidth < 900} med={screenWidth > 900} tabIndex={finished ? 0 : mobile ? (scrolled > 0.92 ? 0 : -1) : -1}
              className={`transition-all ${finished ? 'visible ' : mobile ? (scrolled > 0.92 ? 'visible ' : 'invisble') : 'invisible'}`}
              style={{ transition: 'all 0.5s ease, opacity 1.5s ease', opacity: finished ? 1 : mobile ? (scrolled > 0.7 ? 1 : 0) : 0 }}
            />
          </div> */}
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

