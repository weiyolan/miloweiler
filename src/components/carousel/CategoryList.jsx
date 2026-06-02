import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap/dist/gsap'

// Scroll-linked category picker: the active category is pinned to a fixed focal
// line while the strip of labels slides under a fixed mask, with opacity falloff
// only (no 3D, no scale — a clean straight slide). Driven by the carousel's
// continuous scroll position (read each frame from scrollRef) — no per-frame React
// state. Desktop = vertical slide (left rail); mobile = horizontal strip below the card.

const WINDOW = 2.5 // items with |distance-to-focal| beyond this are culled
const FADE_POW = 1.6 // opacity falloff sharpness

// Desktop rail placement
const D_FOCAL_VH = 35 // focal line as % of viewport height (was centered at 50)
const RAIL_GAP = 24 // px gap between the rail's right edge and the card's left edge (rail sits fully left of the card)

// Desktop (vertical) tunables
const D = { STEP: 35, VIEW_W: 'min(70vw, 440px)', VIEW_H: 260 }
// Mobile (horizontal) tunables
export const M = { STEP: 92, SLOT_W: 'min(25vw, 280px)', VIEW_H: 88, GAP_BELOW: 20 }
// Mobile-only: shift the card + strip up by this much (vh) to open room for the description below the strip
export const MOBILE_CARD_UP_SHIFT_VH = 7

const MASK_V = 'linear-gradient(to bottom, transparent 0%, #000 28%, #000 72%, transparent 100%)'
const MASK_H = 'linear-gradient(to right, transparent 0%, #000 22%, #000 78%, transparent 100%)'

export default function CategoryList({ categories, activeIndex, onCategoryClick, scrollRef, zDistance = 150, isMobile = false, cardLeft = 0, cardHeight = 0, cardUpShiftPx = 0 }) {
  const total = categories.length
  const itemRefs = useRef([])
  const prefersReduced = useRef(false)

  // Honor prefers-reduced-motion (snapped position instead of a continuous slide)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReduced.current = mq.matches
    const onChange = (e) => { prefersReduced.current = e.matches }
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  // Per-frame render loop — mirrors CardCarousel's ticker pattern (direct style writes)
  useEffect(() => {
    const N = total
    if (!N) return
    const cfg = isMobile ? M : D
    const wrapHalf = gsap.utils.wrap(-N / 2, N / 2)

    function onTick() {
      const frac = (scrollRef?.current || 0) / zDistance
      const reduced = prefersReduced.current
      const base = reduced ? Math.round(frac) : frac

      for (let i = 0; i < N; i++) {
        const el = itemRefs.current[i]
        if (!el) continue

        const d = wrapHalf(i - base) // signed shortest distance to focal; 0 = pinned
        const ad = Math.abs(d)

        if (ad > WINDOW) {
          el.style.visibility = 'hidden'
          el.style.opacity = '0'
          el.style.pointerEvents = 'none'
          continue
        }

        const t = ad / WINDOW
        const opacity = Math.max(0, 1 - Math.pow(t, FADE_POW))
        const main = d * cfg.STEP

        el.style.transform = isMobile
          ? `translate(-50%, -50%) translate3d(${main.toFixed(2)}px, 0, 0)`
          : `translateY(-50%) translate3d(0, ${main.toFixed(2)}px, 0)`
        el.style.opacity = opacity.toFixed(3)
        el.style.visibility = 'visible'
        el.style.zIndex = String(1000 - Math.round(ad * 10))
        el.style.pointerEvents = opacity > 0.15 ? 'auto' : 'none'
      }
    }

    gsap.ticker.add(onTick)
    return () => gsap.ticker.remove(onTick)
  }, [total, isMobile, scrollRef, zDistance])

  return (
    <div
      data-transition="category-list"
      className={
        isMobile
          ? 'fixed top-1/2 left-0 right-0 z-40 flex justify-center pointer-events-none'
          : 'fixed left-0 top-0 h-screen flex items-center z-40 pointer-events-none'
      }
      style={isMobile ? undefined : { width: `${Math.max(0, cardLeft - RAIL_GAP)}px` }}
    >
      <div
        style={
          isMobile
            ? { position: 'relative', width: '100vw', height: M.VIEW_H, overflow: 'hidden', maskImage: MASK_H, WebkitMaskImage: MASK_H, transform: `translateY(${cardHeight / 2 + M.GAP_BELOW - cardUpShiftPx}px)` }
            : { position: 'relative', width: '100%', height: D.VIEW_H, overflow: 'hidden', maskImage: MASK_V, WebkitMaskImage: MASK_V, transform: `translateY(${D_FOCAL_VH - 50}vh)` }
        }
      >
        {categories.map((label, i) => (
          <button
            key={i}
            type="button"
            ref={(el) => { itemRefs.current[i] = el }}
            onClick={() => onCategoryClick?.(i)}
            aria-current={i === activeIndex ? 'true' : undefined}
            className={
              isMobile
                ? 'absolute left-1/2 top-1/2 m-0 p-0 border-0 bg-transparent cursor-pointer select-none text-center pointer-events-auto'
                : 'absolute right-0 top-1/2 m-0 p-0 border-0 bg-transparent cursor-pointer select-none text-right pointer-events-auto'
            }
            style={{ opacity: 0, visibility: 'hidden', willChange: 'transform, opacity', transformOrigin: 'center center' }}
          >
            <span
              className={isMobile ? 'font-mono text-foreground' : 'font-mono text-foreground text-xs md:text-sm whitespace-nowrap'}
              style={
                isMobile
                  ? { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', width: M.SLOT_W, fontSize: 'clamp(9px, 2.8vw, 14px)', lineHeight: 1.15, letterSpacing: '-0.01em' }
                  : undefined
              }
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
