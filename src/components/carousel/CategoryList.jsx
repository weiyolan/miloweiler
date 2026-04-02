import React, { useRef, useEffect, useState } from 'react'

const ROW_HEIGHT = 28

export default function CategoryList({ categories, activeIndex, scrollCount, onCategoryClick }) {
  const total = categories.length
  const listRef = useRef(null)
  const internalOffset = useRef(0)
  const [translateY, setTranslateY] = useState(0)
  const [animate, setAnimate] = useState(true)

  // Render 5 copies for ample headroom in both directions
  const copies = 5
  const duplicated = Array.from({ length: copies }, () => categories).flat()
  const centerSetStart = Math.floor(copies / 2) * total // index where middle set starts

  useEffect(() => {
    // Position: center the active item from the middle set
    const targetRow = centerSetStart + ((scrollCount % total + total) % total)
    // Track accumulated delta for smooth continuous scrolling
    const newOffset = -(scrollCount) * ROW_HEIGHT
    internalOffset.current = newOffset

    setAnimate(true)
    // Center the active row in the visible window (offset by 2 rows for centering)
    setTranslateY(-(centerSetStart * ROW_HEIGHT) + newOffset + ROW_HEIGHT * 2)
  }, [scrollCount, total, centerSetStart])

  // After transition ends, silently reset if we've drifted far from center
  function handleTransitionEnd() {
    const setsFromCenter = Math.abs(scrollCount) % total
    // Only reset if we've scrolled a full cycle
    if (Math.abs(internalOffset.current) >= total * ROW_HEIGHT) {
      const normalized = ((scrollCount % total) + total) % total
      const resetOffset = -normalized * ROW_HEIGHT
      internalOffset.current = resetOffset

      setAnimate(false)
      setTranslateY(-(centerSetStart * ROW_HEIGHT) + resetOffset + ROW_HEIGHT * 2)
      // Re-enable transition on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true)
        })
      })
    }
  }

  return (
    <div data-transition="category-list" className="fixed left-0 top-0 translate-y-1/2 pl-6 md:pl-10 z-40">
      <div
        className="overflow-hidden"
        style={{
          height: ROW_HEIGHT * 5,
          maskImage: 'linear-gradient(to bottom, transparent 0%, white 25%, white 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 25%, white 75%, transparent 100%)',
        }}
      >
        <div
          ref={listRef}
          className="flex flex-col"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateY(${translateY}px)`,
            transition: animate ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          }}
        >
          {duplicated.map((name, i) => {
            const realIndex = i % total
            const isActive = realIndex === activeIndex
            return (
              <span
                key={i}
                onClick={() => onCategoryClick?.(realIndex)}
                className={`font-mono text-xs md:text-sm whitespace-nowrap transition-colors duration-300 cursor-pointer select-none ${
                  isActive
                    ? 'text-white'
                    : 'text-white/25 hover:text-white/50'
                }`}
                style={{ height: ROW_HEIGHT, lineHeight: `${ROW_HEIGHT}px` }}
              >
                {name}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
