import { usePageContext } from '@/utils/pageContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Navigation() {
  // let {darkMode} = usePageContext()
  let [loaded, setLoaded] = useState(false)
  let [scrolling, setScrolling] = useState(false)
  let [scrolled, setScrolled] = useState(false)

  const ctx = useRef(gsap.context(() => { }));

  useEffect(() => {
    setLoaded(true)
    return () => ctx.current.revert();
  }, []);

  useEffect(() => {
    // console.log(visible)
    ctx.current.add(() => {
      gsap.to('.navButton', {
        opacity: ()=>loaded?100:0,
        // y: width < 1024 ? (visible ? -6 : 0) : 0,
        // x:width<1024?0:(visible ?+20:0),
        // scale:1,
        // ease: 'power1.inout',
        stagger:0.5,
        ease: 'expo.out',
        // duration: 0.5,
      });
    });
  }, [loaded, scrolling, scrolled]);


  return (
    <div className={`fixed w-full top-0  justify-center flex`}>
      <div className={`inline-flex relative items-center gap-10 mx-8 mt-2 px-4 py-2 rounded-full overflow-hidden`}>
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

  return (
    <Link className={`relative navButton opacity-0 text-2xl min-w-[100px]  text-center font-lora font-medium ${darkMode ? 'text-primary' : 'text-darkPrimary font-semibold '} ${pathname === to ? 'underline underline-offset-4 underlin' : ''}`}
      href={`${to}`}
    // onClick={() => handleClick(to)}
    // title={`Go to the ${text} page`}
    >
      {text}
    </Link>
  )
}