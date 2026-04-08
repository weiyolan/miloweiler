import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { Observer } from 'gsap/dist/Observer'
import { useAppContext } from '@/utils/appContext'
import { useTransition } from '@/utils/transitionContext'
import CarouselCard from './CarouselCard'
import CarouselIndicator from './CarouselIndicator'
import ScrollHint from './ScrollHint'
import CategoryList from './CategoryList'
import AsciiMarkers from './AsciiMarkers'

gsap.registerPlugin(Observer)

const TOTAL_REAL = 6
const Z_DISTANCE = 150
const yStep_DESKTOP = 60
const yStep_MOBILE = 30
const LERP_FACTOR = 0.07
const PERSPECTIVE = 1200

function easeOutQuint(t) {
  return 1-Math.pow(1-t,5)
}

function darkenColor(hex, lightness = 12, satBoost = 10) {
  let r = parseInt(hex.slice(1, 3), 16) / 255
  let g = parseInt(hex.slice(3, 5), 16) / 255
  let b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s
  const d = max - min
  if (d === 0) { h = 0; s = 0 }
  else {
    s = d / (1 - Math.abs(max + min - 1))
    switch (max) {
      case r: h = ((g - b) / d + 6) % 6 * 60; break
      case g: h = ((b - r) / d + 2) * 60; break
      case b: h = ((r - g) / d + 4) * 60; break
    }
  }
  s = Math.min(s * satBoost, 1)
  const l = lightness / 100
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2
  let r1, g1, b1
  if (h < 60) { r1 = c; g1 = x; b1 = 0 }
  else if (h < 120) { r1 = x; g1 = c; b1 = 0 }
  else if (h < 180) { r1 = 0; g1 = c; b1 = x }
  else if (h < 240) { r1 = 0; g1 = x; b1 = c }
  else if (h < 300) { r1 = x; g1 = 0; b1 = c }
  else { r1 = c; g1 = 0; b1 = x }
  return `rgb(${Math.round((r1 + m) * 255)}, ${Math.round((g1 + m) * 255)}, ${Math.round((b1 + m) * 255)})`
}

function wrap(value, total) {
  return ((value % total) + total) % total
}

export default function CardCarousel({ categories }) {
  const { width, height } = useAppContext()
  const { startForward, carouselScrollIndex, signalCarouselReady, signalDepthReveal, depthRevealReady, phase, activeRef, completeReverse } = useTransition()
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollHintVisible, setScrollHintVisible] = useState(true)
  const [titleVisible, setTitleVisible] = useState(true)
  const [scrollCount, setScrollCount] = useState(0)
  const prevIndex = useRef(0)
  const restoredRef = useRef(false)

  const bgColor = useMemo(() => {
    const cat = categories[activeIndex]
    const color = cat?.bgColor || '#1a1a1a'
    if (cat?.customBgColor) return color
    return darkenColor(color)
  }, [activeIndex, categories])

  const wrapperRef = useRef(null)
  const cardRefs = useRef([])
  const scrollValue = useRef(0)
  const currentValue = useRef(0)
  const hasScrolled = useRef(false)
  const ctxRef = useRef(null)
  const cardIndex = useRef(0)
  const isAnimating = useRef(false)

  const yStep = width && width < 768 ? yStep_MOBILE : yStep_DESKTOP

  // Duplicate categories for infinite loop
  const duplicated = useMemo(() => [...categories, ...categories], [categories])
  const totalCards = duplicated.length
  const totalZDistance = totalCards * Z_DISTANCE

  // Responsive card dimensions (16:9, centered)
  const cardWidth = useMemo(() => {
    if (!width || !height) return 800
    const maxW = width < 768 ? width * 0.9 : width * 0.88
    const maxH = height * 0.7
    return Math.min(maxW, maxH * (16 / 9))
  }, [width, height])
  const cardHeight = cardWidth * (9 / 16)

  // Shared scroll-by-delta logic
  const scrollBy = useCallback((delta) => {
    if (delta === 0) return
    if (isAnimating.current) return
    if (activeRef.current) return
    isAnimating.current = true

    cardIndex.current += delta
    scrollValue.current = cardIndex.current * Z_DISTANCE
    setScrollCount(cardIndex.current)
    setTitleVisible(false)

    if (!hasScrolled.current) {
      hasScrolled.current = true
      setScrollHintVisible(false)
    }

    setTimeout(() => {
      isAnimating.current = false
      setTitleVisible(true)
    }, 800)
  }, [])

  // Jump to a specific category index (shortest path)
  const goToIndex = useCallback((targetIndex) => {
    const current = ((cardIndex.current % TOTAL_REAL) + TOTAL_REAL) % TOTAL_REAL
    let delta = targetIndex - current
    if (delta > TOTAL_REAL / 2) delta -= TOTAL_REAL
    else if (delta < -TOTAL_REAL / 2) delta += TOTAL_REAL
    scrollBy(delta)
  }, [scrollBy])

  // Transition click handler
  const handleTransitionClick = useCallback((imageData, cardRectData, href) => {
    startForward(imageData, cardRectData, href, cardIndex.current)
  }, [startForward])

  // Reset restore flag when transition data is cleared
  useEffect(() => {
    if (carouselScrollIndex == null) restoredRef.current = false
  }, [carouselScrollIndex])

  // Restore carousel state after reverse transition
  useEffect(() => {
    if (carouselScrollIndex == null || restoredRef.current) return
    restoredRef.current = true

    // Restore scroll position immediately (skip lerp)
    cardIndex.current = carouselScrollIndex
    scrollValue.current = carouselScrollIndex * Z_DISTANCE
    currentValue.current = carouselScrollIndex * Z_DISTANCE
    setScrollCount(carouselScrollIndex)
    setScrollHintVisible(false)
    hasScrolled.current = true

    // Hide ALL card elements for the reverse reveal animation
    cardRefs.current.forEach((el) => {
      if (el) gsap.set(el, { autoAlpha: 0 })
    })
    gsap.set('[data-transition="nav"]', { autoAlpha: 0, y: -20 })
    gsap.set('[data-transition="category-list"]', { autoAlpha: 0, x: -30 })
    gsap.set('[data-transition="bottom-bar"]', { autoAlpha: 0, y: 20 })

    // Calculate front card rect mathematically (no DOM query timing issues)
    // Wrapper stays invisible — TransitionOverlay will show it during reverse-enter
    const freshRect = {
      left: (window.innerWidth - cardWidth) / 2,
      top: (window.innerHeight - cardHeight) / 2,
      width: cardWidth,
      height: cardHeight,
    }
    signalCarouselReady(freshRect)
  }, [carouselScrollIndex, signalCarouselReady])

  // Wheel/touch input via Observer — one card per gesture
  useEffect(() => {
    const observer = Observer.create({
      target: window,
      type: 'wheel,touch',
      preventDefault: true,
      onUp: () => scrollBy(-1),
      onDown: () => scrollBy(1),
      tolerance: 50,
    })
    return () => observer.disable()
  }, [scrollBy])

  // GSAP ticker render loop
  useEffect(() => {
    function onTick() {
      // Lerp toward target
      const delta = scrollValue.current - currentValue.current
      currentValue.current += delta * LERP_FACTOR

      const halfTotal = totalZDistance / 2

      cardRefs.current.forEach((el, i) => {
        if (!el) return

        // Wrapped z-position
        const rawZ = i * Z_DISTANCE - currentValue.current
        const wrappedZ = wrap(rawZ + halfTotal, totalZDistance) - halfTotal

        // Perspective scale — cards further back appear smaller
        const perspectiveScale = PERSPECTIVE / (PERSPECTIVE - wrappedZ)

        // Y offset — derived from perspective scale so gaps diminish with depth
        const cardDepth = wrappedZ / Z_DISTANCE
        const yOffset = cardDepth * yStep * perspectiveScale

        // Opacity — asymmetric: cards in front fade fast, cards behind fade gently
        let opacity
        if (wrappedZ > 0) {
          const frontDepth = Math.min(wrappedZ / Z_DISTANCE, 1)
          opacity = Math.max(0, 1 - easeOutQuint(frontDepth))
        } else {
          const backDepth = Math.abs(wrappedZ) / halfTotal
          opacity = Math.max(0, 1 - backDepth * 0.8)
        }

        // z-index — front cards on top
        const zIndex = totalCards - Math.abs(Math.round(wrappedZ / Z_DISTANCE))
        el.style.transform = `translateY(${yOffset}px) scale(${perspectiveScale})`
        el.style.zIndex = zIndex

        // Skip opacity/visibility during transitions (overlay controls these)
        if (!activeRef.current) {
          el.style.opacity = opacity
          el.style.visibility = opacity < 0.01 ? 'hidden' : 'visible'
          el.style.pointerEvents = wrappedZ < Z_DISTANCE * 0.1 && wrappedZ > -Z_DISTANCE * 0.5 ? 'auto' : 'none'
        }
      })

      // Determine active (front) card index
      const rawIndex = Math.round(currentValue.current / Z_DISTANCE)
      const normalized = ((rawIndex % TOTAL_REAL) + TOTAL_REAL) % TOTAL_REAL
      setActiveIndex(normalized)
    }

    gsap.ticker.add(onTick)
    return () => gsap.ticker.remove(onTick)
  }, [totalCards, totalZDistance])

  // On initial load (no reverse transition): show wrapper, hide chrome, signal depth reveal
  useEffect(() => {
    if (!wrapperRef.current) return
    if (carouselScrollIndex != null) return // reverse transition handles this differently
    gsap.set(wrapperRef.current, { autoAlpha: 1 })
    gsap.set('[data-transition="nav"]', { autoAlpha: 0, y: -20 })
    gsap.set('[data-transition="category-list"]', { autoAlpha: 0, x: -30 })
    gsap.set('[data-transition="bottom-bar"]', { autoAlpha: 0, y: 20 })
    signalDepthReveal()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Unified depth-aware stagger reveal (initial load + reverse transition)
  useEffect(() => {
    if (!depthRevealReady) return

    const cv = cardIndex.current * Z_DISTANCE
    const halfTotal = totalZDistance / 2

    // Build sorted list of visible cards with their target opacities
    const visibleCards = []
    cardRefs.current.forEach((el, i) => {
      if (!el) return
      const rawZ = i * Z_DISTANCE - cv
      const wrappedZ = wrap(rawZ + halfTotal, totalZDistance) - halfTotal

      let opacity
      if (wrappedZ > 0) {
        const frontDepth = Math.min(wrappedZ / Z_DISTANCE, 1)
        opacity = Math.max(0, 1 - easeOutQuint(frontDepth))
      } else {
        const backDepth = Math.abs(wrappedZ) / halfTotal
        opacity = Math.max(0, 1 - backDepth * 0.8)
      }

      if (opacity >= 0.01) {
        visibleCards.push({ el, wrappedZ, opacity })
      }
    })

    // Sort: front card first (wrappedZ closest to 0), then by depth behind
    visibleCards.sort((a, b) => a.wrappedZ - b.wrappedZ)
    visibleCards.reverse()

    const tl = gsap.timeline({
      onComplete: () => {
        activeRef.current = false
        if (phase === 'reverse-animating') completeReverse()
      },
    })

    // Stagger cards in by depth
    visibleCards.forEach((card, idx) => {
      tl.to(card.el, {
        autoAlpha: card.opacity,
        duration: 0.3,
        ease: 'power2.out',
      }, idx * 0.08)
    })

    // UI chrome comes alive alongside the stagger
    tl.to('[data-transition="nav"]', { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0)
    tl.to('[data-transition="category-list"]', { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power2.out' }, 0)
    tl.to('[data-transition="bottom-bar"]', { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0)

    return () => tl.kill()
  }, [depthRevealReady, phase, totalZDistance, completeReverse])

  return (
    <div
      ref={wrapperRef}
      data-transition="carousel-wrapper"
      className="fixed inset-0 flex items-center justify-center invisible"
      style={{ backgroundColor: bgColor, transition: 'background-color 0.8s ease' }}
    >
      {/* Card container */}
      <div
        className="relative"
        style={{
          width: cardWidth,
          height: cardHeight,
        }}
      >
        {/* Card stack */}
        <div className="relative w-full h-full">
          {duplicated.map((cat, i) => (
            <CarouselCard
              key={`${cat.slug}-${i}`}
              ref={(el) => { cardRefs.current[i] = el }}
              label={cat.label}
              image={cat.image}
              alt={cat.alt}
              projectCount={cat.projectCount}
              year={cat.year}
              index={(i % TOTAL_REAL) + 1}
              href={cat.href}
              isFront={(i % TOTAL_REAL) === activeIndex}
              titleVisible={titleVisible}
              onTransitionClick={handleTransitionClick}
            />
          ))}
        </div>
      </div>

      <CategoryList
        categories={categories.map(c => c.label)}
        activeIndex={activeIndex}
        scrollCount={scrollCount}
        onCategoryClick={goToIndex}
      />
    <div data-transition="bottom-bar" className="fixed bottom-0 left-0 right-0 z-40 flex justify-between items-center px-6 md:px-10 pb-5 md:pb-7 pointer-events-none">
        <CarouselIndicator activeIndex={activeIndex} totalCategories={TOTAL_REAL} />
        <AsciiMarkers activeIndex={activeIndex} total={TOTAL_REAL} />
      <span className="font-mono text-xs md:text-sm text-white/60 whitespace-nowrap">
        Brussels, Belgium
        </span>
    </div>
      <ScrollHint visible={scrollHintVisible} />
    </div>
  )
}
