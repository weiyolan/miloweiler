import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { Observer } from 'gsap/dist/Observer'
import { useAppContext } from '@/utils/appContext'
import CarouselCard from './CarouselCard'
import CarouselIndicator from './CarouselIndicator'
import ScrollHint from './ScrollHint'

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
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollHintVisible, setScrollHintVisible] = useState(true)
  const [titleVisible, setTitleVisible] = useState(true)
  const prevIndex = useRef(0)

  const bgColor = useMemo(() => {
    const color = categories[activeIndex]?.bgColor || '#1a1a1a'
    return darkenColor(color)
  }, [activeIndex, categories])

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

  // Wheel/touch input via Observer — one card per gesture
  useEffect(() => {
    function goTo(direction) {
      if (isAnimating.current) return
      isAnimating.current = true

      cardIndex.current += direction
      scrollValue.current = cardIndex.current * Z_DISTANCE
      setTitleVisible(false)

      if (!hasScrolled.current) {
        hasScrolled.current = true
        setScrollHintVisible(false)
      }

      // Unlock after the lerp has mostly settled, show title
      setTimeout(() => {
        isAnimating.current = false
        setTitleVisible(true)
      }, 800)
    }

    const observer = Observer.create({
      target: window,
      type: 'wheel,touch',
      preventDefault: true,
      onUp: () => goTo(-1),
      onDown: () => goTo(1),
      tolerance: 50,
    })
    return () => observer.disable()
  }, [])

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
        el.style.opacity = opacity
        el.style.zIndex = zIndex
        el.style.visibility = opacity < 0.01 ? 'hidden' : 'visible'
        el.style.pointerEvents = wrappedZ < Z_DISTANCE * 0.1 && wrappedZ > -Z_DISTANCE * 0.5 ? 'auto' : 'none'
      })

      // Determine active (front) card index
      const rawIndex = Math.round(currentValue.current / Z_DISTANCE)
      const normalized = ((rawIndex % TOTAL_REAL) + TOTAL_REAL) % TOTAL_REAL
      setActiveIndex(normalized)
    }

    gsap.ticker.add(onTick)
    return () => gsap.ticker.remove(onTick)
  }, [totalCards, totalZDistance])

  // Intro animation
  useEffect(() => {
    ctxRef.current = gsap.context(() => {
      // Set initial state — all invisible and scaled down
      cardRefs.current.forEach((el) => {
        if (el) gsap.set(el, { autoAlpha: 0, scale: 0.85 })
      })

      // Stagger the first few visible cards in
      const visibleCards = cardRefs.current.slice(0, Math.min(5, totalCards)).filter(Boolean)
      gsap.to(visibleCards, {
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.4,
      })
    })

    return () => {
      if (ctxRef.current) ctxRef.current.revert()
    }
  }, [totalCards])

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
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
            />
          ))}
        </div>
      </div>

      <ScrollHint visible={scrollHintVisible} />
      <CarouselIndicator activeIndex={activeIndex} totalCategories={TOTAL_REAL} />
    </div>
  )
}
