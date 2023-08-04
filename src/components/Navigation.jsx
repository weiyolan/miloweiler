import { usePageContext } from '@/utils/pageContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap/dist/gsap'
import Line from './Line'
import { Observer } from 'gsap/dist/Observer'
import FadeDiv from './FadeDiv'

gsap.registerPlugin(Observer)

export default function Navigation() {
  let { darkMode } = usePageContext()
  let [scrollingDown, setScrollingDown] = useState(true) //removed bar onLoad and then animate in.
  let [animationBuffered, setAnimationBuffered] = useState(true)
  let observer = useRef(undefined)
  const ctx = useRef(gsap.context(() => { }));

  useEffect(() => {
    setScrollingDown(false)
    return () => { ctx.current.revert() };
  }, []);

  useEffect(() => {
    let timer;
    if (!animationBuffered) {
      timer = setTimeout(() => { setAnimationBuffered(true)}, 300 )
    }
    return () => clearTimeout(timer)
  }, [animationBuffered])

  function handleDown() {
    if (!scrollingDown ) {
      setScrollingDown(true)
      setAnimationBuffered(false)
    } 
  }

  function handleUp() {
    if (scrollingDown ) {
      setScrollingDown(false)
      setAnimationBuffered(false)
    } 
  }

  useEffect(() => {
    observer.current = Observer.create({
      target: window,         // can be any element (selector text is fine)
      // ignore: ".project-pictures, .project-grid, .imageFill",
      type: "scroll",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      preventDefault: false,
      onStopDelay: 3,
      tolerance:70,
      onStop: () => {
        handleUp()
      },
      onDown: () => {
        handleDown()
      },
      onDownEnd: () => {
        handleDown()
      },
      onUp: () => {
        handleUp()
      },
      onUpEnd: () => {
        handleUp()
      },
      lockAxis: true,
    })
    return () => { observer.current.disable() }
  }, [scrollingDown, animationBuffered])

  // useEffect(()=>{
  //   if (observer.current.velocityY === 0 && !scrollPaused) {console.log('paused')}
  // },[observer?.current?.velocityY])

  // console.log(observer?.current?.velocityY)

  // function firstAppearTl() {
  //   let appearTl = gsap.timeline().to('.navButton', {
  //     opacity: () => loaded ? 1 : 0,
  //     // y: width < 1024 ? (visible ? -6 : 0) : 0,
  //     // x:width<1024?0:(visible ?+20:0),
  //     // scale:1,
  //     // ease: 'power1.inout',
  //     stagger:0.1,
  //     // stagger: {
  //     //   each: 0.1,
  //     // },
  //     duration: 1.5,
  //     ease: 'expo.out',
  //     // duration: 0.5,
  //   });
  // }

  useEffect(() => {
    // console.log(visible)
    ctx.current.add(() => {
      gsap.to('.navButton', {
        autoAlpha: () => scrollingDown ? 0 : 1,
        y: () => scrollingDown ? -50 : 0,
        // y: width < 1024 ? (visible ? -6 : 0) : 0,
        // x:width<1024?0:(visible ?+20:0),
        // scale:1,
        // ease: 'power1.inout',
        stagger: 0.1,
        // stagger: {
        //   each: 0.1,
        // },
        duration: 1,
        ease: 'expo.out',
        // duration: 0.5,
      });
      gsap.to('.navBackground', {
        autoAlpha: () => scrollingDown ? 0 : 1,
        y: () => scrollingDown ? -80 : 0,
        duration: 1,
        ease: 'expo.out',
        rotate: () => scrollingDown ? '5deg' : 0,
        delay: () => scrollingDown ? 0.15 : 0,
      })
    });
  }, [scrollingDown]);

  return (
    // <FadeDiv className='w-full relative'>
    // <FadeDiv style={{ transform: "translate3d(0, 0, 0)" }} className={`fixed w-full top-0 justify-center flex navBar  `} type={'leftRight'} amount={30}>
    <div className={`fixed w-full top-0 justify-center flex navBar`}>
      <div className={`${darkMode ? 'bg-[#FFEAD6c]/1' : 'bg-[#FFEAD6]/20'} backdrop-blur-sm w-full h-[160%] bottom-0 rounded-b-[100%] absolute -translate-x-4 invisble opacity-0 navBackground`} />
      <div className={`inline-flex relative items-center gap-10 mx-8 mt-2 px-4 py-2  `}>
        <Button text='Home' to='/' />
        <Button text='Gallery' to='/gallery' />
        <Button text='Contact' to='/contact' />
        {/* <Button text={`${observer.current.velocityY}`} to=''/> */}
      </div>
    </div>
    // {/* // </FadeDiv> */ }
  )
}

function Button({ text, to }) {
  let { darkMode } = usePageContext()
  // darkMode=false;
  const { pathname } = useRouter()
  let [hover, setHover] = useState(false)
  let [selected, setSelected] = useState(false)
  const ctx = useRef(gsap.context(() => { }));

  useEffect(() => {
    // setLoaded(true)
    return () => { ctx.current.revert() };
  }, []);

  useEffect(() => {
    setSelected(pathname === to)
  }, [pathname])

  useEffect(() => {
    ctx.current.add(() => {
      gsap.to(`.navButton${text}`, {
        scale: (hover) ? 1.1 : 1,
        duration: 0.2,
      })
      gsap.to(`.navLine${text}`, {
        width: (hover || selected) ? '100%' : 0,
        borderColor: (hover || selected) ? (darkMode ? '#FFF5EA' : '#000000') : 'transparent',
        duration: 0.2,
      })
    })
  }, [hover, selected])

  return (
    <Link onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false) }} className={`relative navButton navButton${text} opacity-0 visible text-2xl min-w-[7rem]  text-center font-lora font-medium ${darkMode ? 'text-primary' : 'text-darkPrimary font-semibold '} `}
      href={`${to}`}
    // onClick={() => handleClick(to)}
    // title={`Go to the ${text} page`}
    >
      <div className={`w-fit mx-auto `}>
        {text}
        <Line className={`mx-auto navLine${text} ${darkMode ? 'border-primary' : 'border-darkPrimary'} w-0`} />
      </div>
    </Link>
  )
}