import { usePageContext } from '@/utils/pageContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap/dist/gsap'
import Line from './Line'
import { Observer } from 'gsap/dist/Observer'
import FadeDiv from './FadeDiv'

gsap.registerPlugin(Observer)

export default function NavigationMobile() {
  let { darkMode } = usePageContext()
  let [hiding, setHiding] = useState(true) //removed bar onLoad and then animate in.
  const ctx = useRef(gsap.context(() => { }));

  useEffect(() => {
    // setHiding(false)
    return () => { ctx.current.revert() };
  }, []);

  function hideBar() {
    if (!hiding) {
      setHiding(true)
    }
  }

  function showBar() {
    if (hiding) {
      setHiding(false)
    }
  }

  useEffect(() => {
    let observer = Observer.create({
      target: window,         // can be any element (selector text is fine)
      ignore: ".navButton, .navLine, .navBar, .navBackground",
      type: "touch",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      preventDefault: false,

      onClick: () => {
        hideBar()
      },

      lockAxis: true,
    })
    return () => { observer.disable() }
  }, [hiding])

  function handleMouseMove(e) {
    if (e.y <= 60) {
      // console.log(e.y)
      showBar()
    }
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    return () => { document.removeEventListener('mousemove', handleMouseMove) }
  }, [])
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
        autoAlpha: () => hiding ? 0 : 1,
        y: () => hiding ? -50 : 0,
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
        // autoAlpha: () => hiding ? 0 : 1,
        // :::::::::::===============================
        y: () => hiding ? +40 : 0,
        yPercent: ()=>hiding?-100:0,
        // :::::::::::===============================
        x: () => hiding ? -40 : 0,
        xPercent: ()=>hiding?100:0,
        duration: 1,
        ease: 'expo.out',
        // rotate: () => hiding ? '5deg' : 0,
        delay: () => hiding ? 0.15 : 0,
      })
    });
  }, [hiding]);

  return (
    // <FadeDiv className='w-full relative'>
    // <FadeDiv style={{ transform: "translate3d(0, 0, 0)" }} className={`fixed w-full top-0 justify-center flex navBar  `} type={'leftRight'} amount={30}>
    <div className={`fixed w-full h-0 top-0 navBar`}>
      <div className={`${darkMode ? 'bg-[#FFEAD6c]/1' : 'bg-[#FFEAD6]/20'} backdrop-blur-md w-screen h-screen top-0 absolute navBackground`} />
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
    <Link onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false) }} className={`relative navButton navButton${text} opacity-0 visible md:text-xl lg:text-2xl min-w-[7rem]  text-center font-lora font-medium ${darkMode ? 'text-primary' : 'text-darkPrimary font-semibold '} `}
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