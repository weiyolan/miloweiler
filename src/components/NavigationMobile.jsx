import { usePageContext } from '@/utils/pageContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap/dist/gsap'
import Line from './Line'
import { Observer } from 'gsap/dist/Observer'
import FadeDiv from './FadeDiv'
import NavToggle from './NavToggle'

gsap.registerPlugin(Observer)

export default function NavigationMobile() {
  let { darkMode } = usePageContext()
  let [hiding, setHiding] = useState(true) //removed bar onLoad and then animate in.
  const ctx = useRef(gsap.context(() => { }));

  useEffect(() => {
    // setHiding(false)
    return () => { ctx.current.revert() };
  }, []);

  // =================================OPEN/CLOSE=================================
  useEffect(() => {
    let observer1 = Observer.create({
      target: ".navToggle",        // can be any element (selector text is fine)
      ignore:[window] ,
      type: "touch",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      preventDefault: false,
      onClick: (e) => {
        setHiding(!hiding)
      },
    })
    let observer2 = Observer.create({
      target: ".navButtons",        // can be any element (selector text is fine)
      ignore:[window] ,
      type: "touch",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      preventDefault: false,
      onClick: (e) => {
        setHiding(!hiding)
      },
    })
    let observer3 = Observer.create({
      target: ".navBackground",        // can be any element (selector text is fine)
      ignore:[window] ,
      type: "touch",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      preventDefault: false,
      onClick: (e) => {
        setHiding(!hiding)
      },
    })
    return () => { observer1.disable();observer2.disable();observer3.disable() }
  }, [hiding])

  useEffect(() => {
    // console.log(visible)
    ctx.current.add(() => {
      gsap.to(['.navButton'], {
        autoAlpha: () => hiding ? 0 : 1,
        y: () => hiding ? -20 : 0,
        x: () => hiding ? 10 : 0,
        stagger: 0.1,
        duration: 1,
        ease: 'expo.out',
      });
      gsap.to(['.navButtons'], {
        autoAlpha: () => hiding ? 0 : 1,
        duration: 0.5,
        ease: 'power2.out',
        delay: () => hiding ? 0.2 : 0,
      });
      gsap.to('.navBackground', {
        y: () => hiding ? +50 : 0,
        yPercent: ()=>hiding?-100:0,
        x: () => hiding ? -50 : 0,
        xPercent: ()=>hiding?100:0,
        duration: 1,
        ease: 'expo.out',
        delay: () => hiding ? 0.15 : 0,
      })
    });
  }, [hiding]);

  return (
    <div className={`navBar fixed w-full h-0 top-0 `}>
      <div className={`navBackground ${darkMode ? 'bg-[#FFEAD6c]/1' : 'bg-[#FFEAD6]/20'} backdrop-blur-sm rounded-bl-3xl w-screen h-screen top-0 translate-x-full -translate-y-full absolute `} />
      <div className={`navButtons flex  flex-col w-[screen] h-[calc(100vh-50px)] relative items-end gap-5 mt-[50px] px-4 py-2  `}>
        <Button text='Home' to='/' />
        <Button text='Gallery' to='/gallery' />
        <Button text='Contact' to='/contact' />
      </div>
      <NavToggle className={`navToggle `} open={!hiding} />
    </div>
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
    <Link onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false) }} className={`navButton navButton${text}  relative opacity-0 visible text-2xl md:text-xl lg:text-2xl  text-center font-lora font-medium ${darkMode ? 'text-primary' : 'text-darkPrimary font-semibold '} `}
      href={`${to}`}
    // onClick={() => handleClick(to)}
    // title={`Go to the ${text} page`}
    >
      <div className={`w-fit ml-auto`}>
        {text}
        <Line className={`mx-auto navLine${text} ${darkMode ? 'border-primary' : 'border-darkPrimary'} w-0`} />
      </div>
    </Link>
  )
}