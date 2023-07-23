import { usePageContext } from '@/utils/pageContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Line from './Line'

export default function Navigation() {
  // let {darkMode} = usePageContext()
  let [loaded, setLoaded] = useState(false)
  let [scrolling, setScrolling] = useState(false)
  let [scrolled, setScrolled] = useState(false)

  const ctx = useRef(gsap.context(() => { }));

  useEffect(() => {
    setLoaded(true)
    return () => { ctx.current.revert() };
  }, []);

  useEffect(() => {
    // console.log(visible)
    ctx.current.add(() => {
      gsap.to('.navButton', {
        autoAlpha: () => loaded ? 1 : 0,
        // y: width < 1024 ? (visible ? -6 : 0) : 0,
        // x:width<1024?0:(visible ?+20:0),
        // scale:1,
        // ease: 'power1.inout',
        stagger: {
          each: 0.1,
        },
        duration: 0.7,
        ease: 'expo.out',
        // duration: 0.5,
      });
    });
  }, [loaded, scrolling, scrolled]);


  return (
    <div className={`fixed w-full top-0 justify-center flex`}>
      <div className={`inline-flex relative items-center gap-10 mx-8 mt-2 px-4 py-2  rounded-full overflow-hidden`}>
        {/* <div className={`bg-black/20 backdrop-blur-sm w-full h-full absolute -translate-x-4`}/> */}
        <Button text='Home' to='/' />
        <Button text='Gallery' to='/gallery' />
        <Button text='Contact' to='/contact' />
      </div>
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

  useEffect(()=>{
    setSelected(pathname===to)
  },[pathname])

  useEffect(() => {
    ctx.current.add(() => {
      gsap.to(`.navButton${text}`, {
        scale: (hover) ? 1.1 : 1,
        duration: 0.2,
      })
      gsap.to(`.navLine${text}`, {
        width:  (hover||selected) ?'100%':0,
        borderColor:  (hover||selected) ? (darkMode ? '#FFF5EA' : '#000000'):'transparent',
        duration: 0.2,
      })
    })
  }, [hover, selected])

  return (
    <Link onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false) }} className={`relative navButton navButton${text} opacity-0 invisible text-2xl min-w-[7rem]  text-center font-lora font-medium ${darkMode ? 'text-primary' : 'text-darkPrimary font-semibold '} `}
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