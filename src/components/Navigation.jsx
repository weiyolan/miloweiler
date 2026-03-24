import { usePageContext } from '@/utils/pageContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap/dist/gsap'
import Line from './Line'
import { Observer } from 'gsap/dist/Observer'
import FadeDiv from './FadeDiv'
import { useAppContext } from '@/utils/appContext'
import { ALL_CATEGORY_SLUGS, CATEGORY_LABELS } from '@/utils/categories'

gsap.registerPlugin(Observer)

export default function Navigation() {
  let {locale} = useAppContext()
  let { darkMode } = usePageContext()
  let [hiding, setHiding] = useState(true) //removed bar onLoad and then animate in.
  const ctx = useRef(gsap.context(() => { }));

  useEffect(() => {
    setHiding(false)
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
      // ignore: ".project-pictures, .project-grid, .imageFill",
      type: "scroll",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      preventDefault: false,
      onStopDelay: 1.5,
      tolerance:70,
      // onStop: () => {
      //   showBar()
      // },
      onDown: () => {
        hideBar()
      },
      // onDownEnd: () => {
      //   hideBar()
      // },
      onUp: () => {
        hideBar()
      },
      // onUpEnd: () => {
      //   hideBar()
      // },
      lockAxis: true,
    })
    return () => { observer.disable() }
  }, [hiding])



  useEffect(() => {
    function handleMouseMove(e) {
      if (e.y <= 60) {
        // console.log(e.y)
        showBar()
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => { document.removeEventListener('mousemove',handleMouseMove) }
  }, [])

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
        autoAlpha: () => hiding ? 0 : 1,
        y: () => hiding ? -80 : 0,
        duration: 1,
        ease: 'expo.out',
        rotate: () => hiding ? '5deg' : 0,
        delay: () => hiding ? 0.15 : 0,
      })
    });
  }, [hiding]);

  return (
    // <FadeDiv className='w-full relative'>
    // <FadeDiv style={{ transform: "translate3d(0, 0, 0)" }} className={`fixed w-full top-0 justify-center flex navBar  `} type={'leftRight'} amount={30}>
    <div className={`fixed w-full top-0 justify-center flex navBar`}>
      <div className={`${darkMode ? 'bg-primary/1' : 'bg-primary/10'} backdrop-blur-sm w-full h-[160%] bottom-0  absolute -translate-x-4 invisble opacity-0 navBackground`} />
      <div className={`inline-flex relative items-center gap-10 mx-8 mt-2 px-4 py-2  `}>
        <div className="relative group">
          <Button text='Portfolio' to='/' isPortfolio />
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className={`${darkMode ? 'bg-darkGrey/90' : 'bg-primary/90'} backdrop-blur-sm rounded-lg py-3 px-5 flex flex-col gap-1 min-w-[200px] shadow-xl`}>
              {ALL_CATEGORY_SLUGS.map(slug => (
                <DropdownItem key={slug} text={CATEGORY_LABELS[slug][locale]} to={`/projects/${slug}`} />
              ))}
            </div>
          </div>
        </div>
        <Button text={locale === 'fr' ? 'À Propos' : 'About Me'} to='/about' />
        <Button text='Contact' to='/contact' />
        {/* <Button text={`${observer.current.velocityY}`} to=''/> */}
      </div>
    </div>
    // {/* // </FadeDiv> */ }
  )
}

function DropdownItem({ text, to }) {
  let { darkMode } = usePageContext()
  const { pathname } = useRouter()
  let selected = pathname === to

  return (
    <Link href={to} className={`block py-1.5 px-2 rounded text-sm font-pop transition-colors duration-150 ${selected ? 'font-semibold' : 'font-normal'} ${darkMode ? 'text-primary hover:bg-primary/10' : 'text-darkPrimary hover:bg-darkPrimary/10'}`}>
      {text}
    </Link>
  )
}

function Button({ text, to, isPortfolio }) {
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
    setSelected(isPortfolio ? (pathname === to || pathname.startsWith('/projects')) : pathname === to)
  }, [pathname])

  useEffect(() => {
    ctx.current.add(() => {
      // gsap.to(`.navButton${text}`, {
      // scale: (hover) ? 1.1 : 1,
      // duration: 0.2,
      // })
      gsap.to(`.navLine${text}`, {
        scaleX: (hover || selected) ? 1 : 0,
        borderColor: (hover || selected) ? (darkMode ? '#FFF5EA' : '#000000') : 'transparent',
        duration: 0.2,
      })
    })
  }, [hover, selected])

  return (
    <Link onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false) }} className={`relative navButton navButton${text} opacity-0 visible   min-w-[7rem]  text-center font-pop font-extrabold uppercase   ${darkMode ? 'text-primary' : 'text-darkPrimary  '} `}
      href={`${to}`}
    // onClick={() => handleClick(to)}
    // title={`Go to the ${text} page`}
    >
      <div className={`w-fit mx-auto `}>
        {text}
        <Line className={`mx-auto navLine${text} ${darkMode ? 'border-primary' : 'border-darkPrimary'} w-full origin-left scale-x-0`} />
      </div>
    </Link>
  )
}