import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap/dist/gsap'
import Line from './Line'
import { Observer } from 'gsap/dist/Observer'
import { useAppContext } from '@/utils/appContext'
import { ALL_CATEGORY_SLUGS, CATEGORY_LABELS } from '@/utils/categories'

gsap.registerPlugin(Observer)

export default function Navigation() {
  const { locale, navTheme } = useAppContext()
  const [hiding, setHiding] = useState(false)
  const hasPlayedIntro = useRef(false)
  const navRef = useRef(null)

  // Intro animation — runs once
  useEffect(() => {
    if (hasPlayedIntro.current || !navRef.current) return
    hasPlayedIntro.current = true
    gsap.fromTo(navRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' })
  }, [])

  // Scroll observer — hide on down, show on up
  useEffect(() => {
    const observer = Observer.create({
      target: window,
      type: 'scroll',
      preventDefault: false,
      tolerance: 70,
      onDown: () => setHiding(true),
      onUp: () => setHiding(false),
      lockAxis: true,
    })
    return () => observer.disable()
  }, [])

  // Hide/show animation
  useEffect(() => {
    if (!navRef.current) return
    gsap.to(navRef.current, {
      autoAlpha: hiding ? 0 : 1,
      y: hiding ? -20 : 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [hiding])

  const isDark = navTheme === 'dark'

  return (
    <nav ref={navRef} data-transition="nav" className="fixed w-full top-0 z-50 flex justify-center">
      <div className="inline-flex relative items-center gap-10 mx-8 mt-2 px-4 py-2">
        <div className="relative group">
          <NavButton text={locale === 'fr' ? 'Accueil' : 'Home'} to="/" isPortfolio isDark={isDark} locale={locale} />
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="bg-darkGrey/90 backdrop-blur-sm rounded-lg py-3 px-5 flex flex-col gap-1 min-w-[200px] shadow-xl">
              {ALL_CATEGORY_SLUGS.map(slug => (
                <DropdownItem key={slug} text={CATEGORY_LABELS[slug][locale]} to={`/${slug}`} isDark={isDark} />
              ))}
            </div>
          </div>
        </div>
        <NavButton text={locale === 'fr' ? 'À Propos' : 'About Me'} to="/about" isDark={isDark} locale={locale} />
        <NavButton text="Contact" to="/contact" isDark={isDark} locale={locale} />
      </div>
    </nav>
  )
}

function DropdownItem({ text, to, isDark }) {
  const { query } = useRouter()
  const selected = to === `/${query.category}`

  return (
    <Link href={to} className={`block py-1.5 px-2 rounded text-sm font-mono transition-colors duration-150 ${selected ? 'font-semibold' : 'font-normal'} ${isDark ? 'text-primary hover:bg-primary/10' : 'text-darkPrimary hover:bg-darkPrimary/10'}`}>
      {text}
    </Link>
  )
}

function NavButton({ text, to, isPortfolio, isDark, locale }) {
  const { pathname } = useRouter()
  const [hover, setHover] = useState(false)
  const lineRef = useRef(null)

  const selected = isPortfolio
    ? (pathname === to || pathname === '/[category]' || pathname === '/[category]/[slug]')
    : pathname === to

  useEffect(() => {
    if (!lineRef.current) return
    gsap.to(lineRef.current, {
      scaleX: (hover || selected) ? 1 : 0,
      borderColor: (hover || selected) ? (isDark ? '#FFF5EA' : '#000000') : 'transparent',
      duration: 0.2,
    })
  }, [hover, selected, isDark])

  return (
    <Link
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative min-w-[7rem] text-center font-mono font-normal ${isDark ? 'text-primary' : 'text-darkPrimary'}`}
      href={to}
    >
      <div className="w-fit mx-auto">
        {text}
        <div ref={lineRef} className={`border-b mx-auto ${isDark ? 'border-primary' : 'border-darkPrimary'} w-full origin-left scale-x-0`} />
      </div>
    </Link>
  )
}
