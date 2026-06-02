import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { Observer } from 'gsap/dist/Observer'
import NavToggle from './NavToggle'
import LangSwitch from './LangSwitch'
import { useAppContext } from '@/utils/appContext'
import { CATEGORY_LABELS, getVisibleCategorySlugs } from '@/utils/categories'

gsap.registerPlugin(Observer)

export default function NavigationMobile() {
  const { locale, categoryLabels, highlightedEnabled } = useAppContext()
  const visibleSlugs = getVisibleCategorySlugs(highlightedEnabled)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toggleVisible, setToggleVisible] = useState(true)
  const menuRef = useRef(null)
  const itemsRef = useRef([])
  const toggleRef = useRef(null)
  const wordmarkRef = useRef(null)
  const scrollTimerRef = useRef(null)
  const router = useRouter()

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => setMenuOpen(false)
    router.events.on('routeChangeStart', handleRouteChange)
    return () => router.events.off('routeChangeStart', handleRouteChange)
  }, [router])

  // Scroll lock when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Hide hamburger while scrolling, show when stopped
  useEffect(() => {
    if (menuOpen) return
    const observer = Observer.create({
      target: window,
      type: 'scroll',
      preventDefault: false,
      onChangeY: () => {
        setToggleVisible(false)
        clearTimeout(scrollTimerRef.current)
        scrollTimerRef.current = setTimeout(() => setToggleVisible(true), 300)
      },
    })
    return () => {
      observer.disable()
      clearTimeout(scrollTimerRef.current)
    }
  }, [menuOpen])

  // Animate hamburger visibility
  useEffect(() => {
    if (menuOpen || !toggleRef.current) return
    gsap.to(toggleRef.current, {
      autoAlpha: toggleVisible ? 1 : 0,
      duration: 0.2,
      ease: 'power2.out',
    })
  }, [toggleVisible, menuOpen])

  // Animate wordmark visibility — in sync with hamburger; hidden while menu open
  useEffect(() => {
    if (!wordmarkRef.current) return
    gsap.to(wordmarkRef.current, {
      autoAlpha: (!menuOpen && toggleVisible) ? 1 : 0,
      duration: 0.2,
      ease: 'power2.out',
    })
  }, [toggleVisible, menuOpen])

  // Menu open/close animation
  useEffect(() => {
    if (!menuRef.current) return

    if (menuOpen) {
      gsap.to(menuRef.current, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
      // Staggered fade-in for items
      itemsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.3, delay: 0.05 * i, ease: 'power2.out' }
        )
      })
    } else {
      gsap.to(menuRef.current, { autoAlpha: 0, duration: 0.2, ease: 'power2.in' })
    }
  }, [menuOpen])

  const setItemRef = (i) => (el) => { itemsRef.current[i] = el }
  const { pathname } = router
  const forceDark = pathname === '/' ||  pathname === '/about'
  let itemIndex = 0

  return (
    <div data-transition="nav" className={`fixed font-sans w-full top-0 z-[2000] ${forceDark ? 'force-dark' : ''}`}>
      {/* Wordmark — top-left (hidden on the About page, which has its own Milo branding) */}
      {pathname !== '/about' && (
        <Link
          ref={wordmarkRef}
          href="/"
          className="absolute top-0 left-0 z-50 h-[50px] flex items-center px-5 font-serif font-black text-foreground text-xl leading-none tracking-tight pointer-events-auto"
        >
          Milo Weiler
        </Link>
      )}

      {/* Hamburger toggle */}
      <div ref={toggleRef} className={`absolute top-0 right-0 z-50 ${menuOpen ? 'force-dark' : ''}`}>
        <NavToggle open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
      </div>

      {/* Fullscreen menu overlay */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 w-full h-[100dvh] force-dark bg-background/90 backdrop-blur-md invisible opacity-0"
      >
        <div className="flex flex-col items-end gap-4 mt-[80px] px-8 py-4">
          {/* Portfolio — main link */}
          <Link
            ref={setItemRef(itemIndex++)}
            href="/"
            className={`text-xl font-normal opacity-0 invisible text-foreground ${pathname === '/' ? 'underline underline-offset-4' : ''}`}
          >
           { locale === 'fr' ? 'Accueil' : 'Home'}
          </Link>

          {/* Subcategories — always visible, indented */}
          {visibleSlugs.map(slug => (
            <Link
              key={slug}
              ref={setItemRef(itemIndex++)}
              href={`/${slug}`}
              className={`text-base pr-2 opacity-0 invisible text-foreground/80 ${router.query.category === slug ? 'font-bold' : 'font-normal'}`}
            >
              {categoryLabels?.[slug]?.[locale] || CATEGORY_LABELS[slug]?.[locale] || slug}
            </Link>
          ))}

          {/* About */}
          <Link
            ref={setItemRef(itemIndex++)}
            href="/about"
            className={`text-xl font-normal opacity-0 invisible text-foreground ${pathname === '/about' ? 'underline underline-offset-4' : ''}`}
          >
            {locale === 'fr' ? 'À Propos' : locale === 'nl' ? 'Over Mij' : 'About Me'}
          </Link>

          {/* Contact */}
          <Link
            ref={setItemRef(itemIndex++)}
            href="/contact"
            className={`text-xl font-normal opacity-0 invisible text-foreground ${pathname === '/contact' ? 'underline underline-offset-4' : ''}`}
          >
            Contact
          </Link>

          {/* Language switcher */}
          <div ref={setItemRef(itemIndex++)} className="opacity-0 invisible mt-2">
            <LangSwitch className="text-base text-foreground gap-3" />
          </div>
        </div>
      </div>
    </div>
  )
}
