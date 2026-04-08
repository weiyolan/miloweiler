import React, { useRef, useEffect, useState } from 'react'

const ROW_HEIGHT = 28

export default function CategoryList({ categories, activeIndex, scrollCount, onCategoryClick }) {
  const total = categories.length
  const listRef = useRef(null)
  const [translateY, setTranslateY] = useState(0)
  const [animate, setAnimate] = useState(true)

  const copies = 5
  const duplicated = Array.from({ length: copies }, () => categories).flat()
  const centerStart = Math.floor(copies / 2) * total

  const prevCountRef = useRef(0)
  const targetRowRef = useRef(centerStart)

  function getY(row) {
    return -row * ROW_HEIGHT + ROW_HEIGHT * 2
  }

  // Initial position
  useEffect(() => {
    setTranslateY(getY(centerStart))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const delta = scrollCount - prevCountRef.current
    prevCountRef.current = scrollCount
    if (delta === 0) return

    let target = targetRowRef.current + delta

    // If we've drifted near the edge of available copies, silently snap back to center
    if (target < total || target >= (copies - 1) * total) {
      const snapRow = centerStart + ((targetRowRef.current % total) + total) % total
      setAnimate(false)
      setTranslateY(getY(snapRow))
      targetRowRef.current = snapRow
      target = snapRow + delta

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true)
          setTranslateY(getY(target))
          targetRowRef.current = target
        })
      })
      return
    }

    setAnimate(true)
    setTranslateY(getY(target))
    targetRowRef.current = target
  }, [scrollCount, total, centerStart, copies])

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
