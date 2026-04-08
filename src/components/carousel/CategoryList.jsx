import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap/dist/gsap'

const ROW_HEIGHT = 28

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
        ease: 'power2.out',
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

  const initialGradient = buildMaskGradient((ROW_HEIGHT / 2) / (total * ROW_HEIGHT) * 100)

  return (
    <div data-transition="category-list" className="fixed left-0 top-0 translate-y-1/2 pl-6 md:pl-10 z-40">
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
              onClick={() => onCategoryClick?.(i)}
              className={`font-sans text-xs md:text-sm whitespace-nowrap cursor-pointer select-none text-white transition-[font-weight] duration-300 ${
                i === activeIndex ? 'font-bold' : 'font-normal'
              }`}
              style={{ height: ROW_HEIGHT, lineHeight: `${ROW_HEIGHT}px` }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
