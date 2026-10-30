import { useEffect } from 'react'

// Circle-and-dot cursor (ported from the Yoga, Zen & Tonic site): fine pointers only, respects reduced motion.
// The dot follows the pointer; the ring trails behind and settles around it when the pointer rests.
// Ring and dot both invert what's under them (difference blend) so they stay high-contrast on light,
// dark and photos.
// Hidden until the first move, when the pointer leaves the window, over text fields and over
// [data-native-cursor] (e.g. the zoom layer in the photo overlay: its zoom-in / grab cursor is the feedback).
// The ring only grows over small clickables, not over the overlay's half-photo prev / next zones.
// Click: the ring squeezes while pressed and bounces back on release.

const BIG = 'a, button, [role=button], label, .cursor-pointer, .picture-thumb'
const TEXT = 'input:not([type=checkbox]):not([type=radio]), textarea, [contenteditable]'
const NATIVE = '[data-native-cursor]'
const EASE = 0.16 // share of the remaining distance the ring covers per frame
const BIG_MAX = 320 // px: clickables wider or taller than this keep the small ring

export default function Cursor() {
  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ring = document.createElement('div')
    const dot = document.createElement('div')
    ring.className = 'cursor'
    dot.className = 'cursor-dot'
    for (const el of [ring, dot]) el.setAttribute('aria-hidden', 'true')
    document.body.append(ring, dot)
    document.body.classList.add('has-cursor')

    let x = 0, y = 0, rx = 0, ry = 0, frame = 0, seen = false

    const tick = () => {
      rx += (x - rx) * EASE
      ry += (y - ry) * EASE
      if (Math.abs(x - rx) < 0.1 && Math.abs(y - ry) < 0.1) {
        rx = x
        ry = y
        frame = 0
      } else frame = requestAnimationFrame(tick)
      // `translate`, not `transform`: it applies after `scale`, so the click scale stays centred on the ring
      ring.style.translate = `${rx}px ${ry}px`
    }

    const show = (on) => {
      ring.classList.toggle('on', on)
      dot.classList.toggle('on', on)
    }
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      // First move (or back from outside the window): start the ring on the pointer, not at 0,0.
      if (!seen) {
        rx = x
        ry = y
        seen = true
      }
      dot.style.translate = `${x}px ${y}px`
      if (!frame) frame = requestAnimationFrame(tick)
      const el = e.target
      const hit = el.closest?.(BIG)
      const r = hit?.getBoundingClientRect()
      ring.classList.toggle('big', !!r && r.width <= BIG_MAX && r.height <= BIG_MAX)
      const native = !!el.closest?.(NATIVE)
      document.body.classList.toggle('native-cursor', native)
      show(!native && !el.closest?.(TEXT))
    }
    const out = (e) => {
      if (e.relatedTarget) return
      show(false)
      seen = false
    }
    const hide = () => show(false)
    const press = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      ring.classList.remove('bounce')
      ring.classList.add('press')
    }
    const release = () => {
      if (!ring.classList.contains('press')) return
      ring.classList.remove('press')
      void ring.offsetWidth // restart the animation on quick double clicks
      ring.classList.add('bounce')
    }
    const settled = () => ring.classList.remove('bounce')

    addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseout', out)
    addEventListener('blur', hide)
    addEventListener('pointerdown', press, { passive: true })
    addEventListener('pointerup', release, { passive: true })
    ring.addEventListener('animationend', settled)
    return () => {
      cancelAnimationFrame(frame)
      removeEventListener('mousemove', move)
      document.removeEventListener('mouseout', out)
      removeEventListener('blur', hide)
      removeEventListener('pointerdown', press)
      removeEventListener('pointerup', release)
      document.body.classList.remove('has-cursor', 'native-cursor')
      ring.remove()
      dot.remove()
    }
  }, [])
  return null
}
