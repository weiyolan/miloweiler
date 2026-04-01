import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { Observer } from 'gsap/dist/Observer'
import { useAppContext } from '@/utils/appContext'
import CarouselCard from './CarouselCard'
import CarouselIndicator from './CarouselIndicator'
import ScrollHint from './ScrollHint'

gsap.registerPlugin(Observer)

const TOTAL_REAL = 6
const Z_DISTANCE = 140
const Y_STEP = 10
const LERP_FACTOR = 0.07
const WHEEL_SENSITIVITY = 0.5
const TOUCH_SENSITIVITY = 1.5

function easeOutQuint(t) {
  return 1 - Math.pow(1 - t, 5)
}

function wrap(value, total) {
  return ((value % total) + total) % total
}

export default function CardCarousel({ categories }) {
  const { width, height } = useAppContext()
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollHintVisible, setScrollHintVisible] = useState(true)

  const cardRefs = useRef([])
  const scrollValue = useRef(0)
  const currentValue = useRef(0)
  const hasScrolled = useRef(false)
  const ctxRef = useRef(null)

  // Duplicate categories for infinite loop
  const duplicated = useMemo(() => [...categories, ...categories], [categories])
  const totalCards = duplicated.length
  const totalZDistance = totalCards * Z_DISTANCE

  // Responsive card dimensions (16:9, centered)
  const cardWidth = useMemo(() => {
    if (!width || !height) return 800
    const maxW = width < 768 ? width * 0.88 : width * 0.62
    const maxH = height * 0.55
    return Math.min(maxW, maxH * (16 / 9))
  }, [width, height])
  const cardHeight = cardWidth * (9 / 16)

  // Wheel/touch input via Observer
  useEffect(() => {
    const observer = Observer.create({
      target: window,
      type: 'wheel,touch',
      preventDefault: true,
      onChangeY: (self) => {
        const isTouchDevice = self.event?.type?.startsWith('touch')
        const sensitivity = isTouchDevice ? TOUCH_SENSITIVITY : WHEEL_SENSITIVITY
        scrollValue.current += self.deltaY * sensitivity

        if (!hasScrolled.current) {
          hasScrolled.current = true
          setScrollHintVisible(false)
        }
      },
      tolerance: 0,
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

        // Y offset — cards further back shift up slightly
        const yOffset = (wrappedZ / Z_DISTANCE) * Y_STEP

        // Opacity — easeOutQuint fade based on depth
        const normalizedDepth = Math.abs(wrappedZ) / halfTotal
        const opacity = Math.max(0, 1 - easeOutQuint(Math.min(normalizedDepth * 1.2, 1)))

        // z-index — front cards on top
        const zIndex = totalCards - Math.abs(Math.round(wrappedZ / Z_DISTANCE))

        el.style.transform = `translate3d(0, ${yOffset}px, ${wrappedZ}px)`
        el.style.opacity = opacity
        el.style.zIndex = zIndex
        el.style.visibility = opacity < 0.01 ? 'hidden' : 'visible'
        el.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none'
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
    <div className="fixed inset-0 flex items-center justify-center bg-darkGrey">
      {/* Perspective container */}
      <div
        className="relative"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          width: cardWidth,
          height: cardHeight,
        }}
      >
        {/* Card stack */}
        <div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
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
            />
          ))}
        </div>
      </div>

      <ScrollHint visible={scrollHintVisible} />
      <CarouselIndicator activeIndex={activeIndex} totalCategories={TOTAL_REAL} />
    </div>
  )
}
