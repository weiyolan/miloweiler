import { usePageContext } from '@/utils/pageContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap/dist/gsap'
import Line from './Line'
import { Observer } from 'gsap/dist/Observer'
import NavToggle from './NavToggle'
import LanguageToggle from './LanguageToggle'
import { ALL_CATEGORY_SLUGS, CATEGORY_LABELS } from '@/utils/categories'

gsap.registerPlugin(Observer)

export default function NavigationMobile() {
  let { darkMode, locale } = usePageContext()
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
      ignore: [window],
      type: "touch",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      preventDefault: false,
      onClick: (e) => {
        setHiding(!hiding)
      },
    })
    let observer2 = Observer.create({
      target: ".navButtons",        // can be any element (selector text is fine)
      ignore: [window],
      type: "touch",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      preventDefault: false,
      onClick: (e) => {
        setHiding(!hiding)
      },
    })
    let observer3 = Observer.create({
      target: ".navBackground",        // can be any element (selector text is fine)
      ignore: [window],
      type: "touch",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      preventDefault: false,
      onClick: (e) => {
        setHiding(!hiding)
      },
    })
    return () => { observer1.disable(); observer2.disable(); observer3.disable() }
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
        yPercent: () => hiding ? -100 : 0,
        x: () => hiding ? -50 : 0,
        xPercent: () => hiding ? 100 : 0,
        duration: 1,
        ease: 'expo.out',
        delay: () => hiding ? 0.15 : 0,
      })
    });
  }, [hiding]);

  return (
    <div className={`navBar fixed w-full h-0 top-0 `}>
      <div className={`navBackground ${darkMode ? 'bg-[#FFEAD6c]/1' : 'bg-[#FFEAD6]/20'} backdrop-blur-sm rounded-bl-3xl w-screen h-screen top-0 translate-x-full -translate-y-full absolute `} />
      <div className={`navButtons flex flex-col w-[screen] h-[calc(100vh-50px)] relative items-end gap-5 mt-[50px] px-6 sm:px-4 py-2  `}>
        <PortfolioExpandable locale={locale} />
        <Button text={locale === 'fr' ? 'À Propos' : 'About Me'} to='/about' />
        <Button text='Contact' to='/contact' />
        <div className={`relative w-fit h-fit  text-3xl md:text-xl lg:text-2xl  text-center font-lora  ${darkMode ? 'text-primary' : 'text-darkPrimary '} `}>
          <LanguageToggle />
        </div>

      </div>
      <NavToggle className={`navToggle `} open={!hiding} />
    </div>
  )
}

function PortfolioExpandable({ locale }) {
  let { darkMode } = usePageContext()
  const { pathname } = useRouter()
  let [expanded, setExpanded] = useState(false)
  let selected = pathname === '/' || pathname.startsWith('/projects')

  return (
    <div className="flex flex-col items-end gap-2">
      <div className={`navButton relative opacity-0 visible text-3xl md:text-xl lg:text-2xl text-center font-lora cursor-pointer ${darkMode ? 'text-primary' : 'text-darkPrimary'}`}>
        <div className="w-fit ml-auto flex items-center gap-2">
          <Link href="/">Portfolio</Link>
          <span onClick={() => setExpanded(!expanded)}>{expanded ? '−' : '+'}</span>
          {selected && <Line className={`mx-auto ${darkMode ? 'border-primary' : 'border-darkPrimary'} w-full absolute bottom-0 left-0`} />}
        </div>
      </div>
      {expanded && (
        <div className="flex flex-col items-end gap-2 pr-4">
          {ALL_CATEGORY_SLUGS.map(slug => (
            <Link key={slug} href={`/projects/${slug}`} className={`navButton opacity-0 visible text-xl font-lora ${darkMode ? 'text-primary' : 'text-darkPrimary'} ${pathname === `/projects/${slug}` ? 'font-bold' : ''}`}>
              {CATEGORY_LABELS[slug][locale]}
            </Link>
          ))}
        </div>
      )}
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
        scaleX: (hover || selected) ? 1 : 0,
        borderColor: (hover || selected) ? (darkMode ? '#FFF5EA' : '#000000') : 'transparent',
        duration: 0.2,
      })
    })
  }, [hover, selected])

  return (
    <Link onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false) }} className={`navButton navButton${text}  relative opacity-0 visible text-3xl md:text-xl lg:text-2xl  text-center font-lora  ${darkMode ? 'text-primary' : 'text-darkPrimary '} `}
      href={`${to}`}
    // onClick={() => handleClick(to)}
    // title={`Go to the ${text} page`}
    >
      <div className={`w-fit ml-auto`}>
        {text}
        <Line className={`mx-auto navLine${text} ${darkMode ? 'border-primary' : 'border-darkPrimary'} w-full origin-left scale-x-0`} />
      </div>
    </Link>
  )
}