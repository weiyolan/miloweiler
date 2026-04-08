import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap/dist/gsap'

export default function ScrollHint({ visible }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.to(ref.current, {
      autoAlpha: visible ? 1 : 0,
      duration: 0.6,
      ease: 'power2.out',
    })
  }, [visible])

  return (
    <div
      ref={ref}
      data-transition="scroll-hint"
      className="fixed top-0 right-0 z-40 pr-6 md:pr-10 pt-4 md:pt-5 pointer-events-none"
    >
      <div className="flex items-center gap-2 font-mono text-xs text-foreground/40">
        <span>Scroll</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="animate-bounce">
          <path d="M6 2L6 10M6 10L2 6M6 10L10 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
