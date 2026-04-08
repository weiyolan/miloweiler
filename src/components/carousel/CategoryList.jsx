import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap/dist/gsap'

const ROW_HEIGHT = 35

function buildMaskGradient(centerPct) {
  const c = Math.max(0, Math.min(100, centerPct))
  const STEPS = 20
  const MIN_ALPHA = 0.05
  const SPREAD = 55

  const stops = []
  for (let i = 0; i <= STEPS; i++) {
    const pos = (i / STEPS) * 100
    const dist = Math.abs(pos - c) / SPREAD
    const alpha = Math.max(MIN_ALPHA, Math.exp(-4 * dist * dist))
    stops.push(`rgba(255,255,255,${alpha.toFixed(3)}) ${pos.toFixed(1)}%`)
  }
  return `linear-gradient(to bottom, ${stops.join(', ')})`
}

export default function CategoryList({ categories, activeIndex, onCategoryClick }) {
  const total = categories.length
  const containerRef = useRef(null)
  const maskCenter = useRef({ value: ROW_HEIGHT / 2 })
  const itemRefs = useRef([])
  const prevActiveRef = useRef(activeIndex)
  const ctx = useRef(gsap.context(() => {}))

  useEffect(() => {
    return () => ctx.current.revert()
  }, [])

  useEffect(() => {
    const targetPx = activeIndex * ROW_HEIGHT + ROW_HEIGHT / 2
    ctx.current.add(() => {
      gsap.to(maskCenter.current, {
        value: targetPx,
        duration: 0.3,
        ease: 'ease.out',
        onUpdate: () => {
          if (!containerRef.current) return
          const center = maskCenter.current.value
          const pct = (center / (total * ROW_HEIGHT)) * 100
          const gradient = buildMaskGradient(pct)
          containerRef.current.style.maskImage = gradient
          containerRef.current.style.webkitMaskImage = gradient
        },
      })
    })
  }, [activeIndex, total])

  useEffect(() => {
    const prev = prevActiveRef.current
    prevActiveRef.current = activeIndex
    if (prev === activeIndex) return

    ctx.current.add(() => {
      if (itemRefs.current[prev]) {
        gsap.to(itemRefs.current[prev], {
          fontWeight: 300, duration: 0.5, ease: 'ease.out',
        })
      }
      if (itemRefs.current[activeIndex]) {
        gsap.to(itemRefs.current[activeIndex], {
          fontWeight: 600, duration: 0.5, ease: 'ease.out',
        })
      }
    })
  }, [activeIndex])

  const initialGradient = buildMaskGradient((ROW_HEIGHT / 2) / (total * ROW_HEIGHT) * 100)

  return (
    <div data-transition="category-list" className="fixed left-0 top-1/4 pl-6 md:pl-10 z-40">
      <div
        ref={containerRef}
        style={{
          height: ROW_HEIGHT * total,
          maskImage: initialGradient,
          WebkitMaskImage: initialGradient,
        }}
      >
        <div className="flex flex-col">
          {categories.map((name, i) => (
            <span
              key={i}
              ref={(el) => { itemRefs.current[i] = el }}
              onClick={() => onCategoryClick?.(i)}
              className="font-sans text-xs md:text-sm whitespace-nowrap cursor-pointer select-none text-foreground"
              style={{
                height: ROW_HEIGHT,
                lineHeight: `${ROW_HEIGHT}px`,
                fontWeight: i === activeIndex ? 600 : 300,
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
