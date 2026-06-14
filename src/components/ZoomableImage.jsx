import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { useAppContext } from '@/utils/appContext'
import { MIN_SCALE, MAX_SCALE, DOUBLE_TAP_SCALE, containedRect, clampTranslate, anchoredZoom } from '@/utils/zoomMath'

// Focus / zoom layer wrapped around the carousel's active photo.
//
// Capabilities (all anchored on the pointer / gesture centroid):
//   - Trackpad pinch + mouse scroll-wheel zoom (ctrl+wheel = native trackpad pinch)
//   - Two-finger pinch-zoom on touch
//   - Double-click / double-tap to toggle between fit (1x) and a detail zoom
//   - Drag to pan while zoomed (one finger / mouse)
//   - On-screen +/- and reset buttons
//
// While zoomed it reports `onZoomChange(true)` so the carousel can suspend its
// swipe-to-navigate and drag-to-dismiss gestures; at 1x it reports false and the
// carousel behaves exactly as before. Only the `active` photo is interactive.

const TAP_SLOP = 8 // px of movement still counted as a tap (not a drag/swipe)
const TAP_MAX_MS = 350
const DOUBLE_TAP_MS = 280

export default function ZoomableImage({ children, ar, active, onZoomChange, onNavigate, frameClassName = '' }) {
  const { locale } = useAppContext()
  const frameRef = useRef(null)
  const contentRef = useRef(null)
  const layerRef = useRef(null)

  // Live transform — kept in a ref (written imperatively for 60fps), mirrored into
  // React state only when the zoomed/not-zoomed boundary is crossed (drives UI).
  const tf = useRef({ s: 1, x: 0, y: 0 })
  const zoomedRef = useRef(false)
  const [zoomed, setZoomed] = useState(false)

  const pointers = useRef(new Map())
  const gesture = useRef(null) // 'pan' | 'pinch' | null
  const panStart = useRef(null)
  const pinchStart = useRef(null)
  const tap = useRef({ count: 0, timer: null, down: null, moved: false })
  const tween = useRef(null)

  const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const t = (en, fr, nl) => (locale === 'fr' ? fr : locale === 'nl' ? nl : en)

  function applyTransform() {
    const el = contentRef.current
    if (!el) return
    const { s, x, y } = tf.current
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`
  }

  // Clamp translation against the frame's untransformed size (offsetWidth/Height
  // ignore CSS transforms) so the scaled image always covers the frame.
  function clamp(s, x, y) {
    const f = frameRef.current
    return clampTranslate(f ? f.offsetWidth : 0, f ? f.offsetHeight : 0, ar, s, x, y)
  }

  function commit(zoomedNow) {
    if (zoomedNow === zoomedRef.current) return
    zoomedRef.current = zoomedNow
    setZoomed(zoomedNow)
    onZoomChange && onZoomChange(zoomedNow)
  }

  // Set transform (clamped), optionally animated. `s>1.01` toggles the zoomed flag.
  function setTransform(s, x, y, animate = false) {
    s = Math.min(MAX_SCALE, Math.max(MIN_SCALE, s))
    const c = clamp(s, x, y)
    if (tween.current) { tween.current.kill(); tween.current = null }
    if (animate && !reduced()) {
      tween.current = gsap.to(tf.current, { s, x: c.x, y: c.y, duration: 0.32, ease: 'power3.out', onUpdate: applyTransform })
    } else {
      tf.current = { s, x: c.x, y: c.y }
      applyTransform()
    }
    commit(s > 1.01)
  }

  // Zoom toward a client-space point, keeping the image pixel under it fixed.
  function zoomToPoint(clientX, clientY, nextScale, animate = false) {
    const f = frameRef.current
    if (!f) return
    const r = f.getBoundingClientRect()
    const { s, x, y } = tf.current
    const next = anchoredZoom(s, x, y, clientX - r.left, clientY - r.top, nextScale)
    setTransform(next.s, next.x, next.y, animate)
  }

  function reset(animate = true) { setTransform(1, 0, 0, animate) }

  // Reset instantly whenever this photo stops being the active one.
  useEffect(() => {
    if (!active) {
      if (tween.current) { tween.current.kill(); tween.current = null }
      pointers.current.clear()
      gesture.current = null
      tf.current = { s: 1, x: 0, y: 0 }
      applyTransform()
      commit(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  // Keep the pan clamped if the viewport / frame resizes while zoomed.
  useEffect(() => {
    function onResize() { const { s, x, y } = tf.current; setTransform(s, x, y, false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Gesture listeners are attached natively so wheel / pinch can preventDefault
  // (React's synthetic wheel handler is passive and cannot).
  useEffect(() => {
    const layer = layerRef.current
    if (!layer || !active) return

    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)
    const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 })

    function clearTapTimer() { if (tap.current.timer) { clearTimeout(tap.current.timer); tap.current.timer = null } }

    function onPointerDown(e) {
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
      const n = pointers.current.size
      if (n === 1) {
        tap.current.down = { x: e.clientX, y: e.clientY, t: Date.now() }
        tap.current.moved = false
        if (zoomedRef.current) {
          gesture.current = 'pan'
          try { layer.setPointerCapture(e.pointerId) } catch (_) {}
          const { x, y } = tf.current
          panStart.current = { px: e.clientX, py: e.clientY, x, y }
          e.preventDefault()
        }
        // not zoomed: stay passive so the carousel's swipe / drag-dismiss still see it
      } else if (n === 2) {
        gesture.current = 'pinch'
        clearTapTimer(); tap.current.count = 0
        const pts = [...pointers.current.values()]
        const m = mid(pts[0], pts[1])
        const f = frameRef.current.getBoundingClientRect()
        pointers.current.forEach((_, id) => { try { layer.setPointerCapture(id) } catch (_) {} })
        pinchStart.current = { dist: dist(pts[0], pts[1]), mx: m.x - f.left, my: m.y - f.top, ...tf.current }
        e.preventDefault(); e.stopPropagation()
      }
    }

    function onPointerMove(e) {
      const p = pointers.current.get(e.pointerId)
      if (!p) return
      p.x = e.clientX; p.y = e.clientY

      if (gesture.current === 'pinch' && pointers.current.size >= 2) {
        const pts = [...pointers.current.values()]
        const ps = pinchStart.current
        const ns = Math.min(MAX_SCALE, Math.max(MIN_SCALE, ps.s * (dist(pts[0], pts[1]) / ps.dist)))
        const m = mid(pts[0], pts[1])
        const f = frameRef.current.getBoundingClientRect()
        // local (unscaled) point that was under the start centroid stays under the live centroid
        const lx = (ps.mx - ps.x) / ps.s
        const ly = (ps.my - ps.y) / ps.s
        setTransform(ns, (m.x - f.left) - ns * lx, (m.y - f.top) - ns * ly, false)
        e.preventDefault(); e.stopPropagation()
        return
      }

      if (gesture.current === 'pan') {
        const ps = panStart.current
        setTransform(tf.current.s, ps.x + (e.clientX - ps.px), ps.y + (e.clientY - ps.py), false)
        e.preventDefault(); e.stopPropagation()
        return
      }

      // not zoomed: track movement only to disqualify a tap (lets swipes through)
      const d = tap.current.down
      if (d && Math.hypot(e.clientX - d.x, e.clientY - d.y) > TAP_SLOP) tap.current.moved = true
    }

    function endPointer(e) {
      const had = pointers.current.has(e.pointerId)
      pointers.current.delete(e.pointerId)
      try { layer.releasePointerCapture(e.pointerId) } catch (_) {}

      if (gesture.current === 'pinch') {
        e.preventDefault()
        if (pointers.current.size === 1) {
          // one finger remains -> continue as a pan
          const [id, pt] = [...pointers.current.entries()][0]
          gesture.current = zoomedRef.current ? 'pan' : null
          if (gesture.current === 'pan') { const { x, y } = tf.current; panStart.current = { px: pt.x, py: pt.y, x, y } }
        } else if (pointers.current.size === 0) {
          gesture.current = null
        }
        return
      }
      if (gesture.current === 'pan') {
        e.preventDefault()
        if (pointers.current.size === 0) gesture.current = null
        return
      }

      // not zoomed, single pointer -> candidate tap
      if (!had) return
      const d = tap.current.down
      const quick = d && (Date.now() - d.t) <= TAP_MAX_MS
      if (tap.current.moved || !quick) { tap.current.count = 0; return }
      registerTap(e.clientX, e.clientY)
    }

    function registerTap(clientX, clientY) {
      tap.current.count += 1
      if (tap.current.count >= 2) {
        clearTapTimer()
        tap.current.count = 0
        if (zoomedRef.current) reset(true)
        else zoomToPoint(clientX, clientY, DOUBLE_TAP_SCALE, true)
        return
      }
      clearTapTimer()
      tap.current.timer = setTimeout(() => {
        tap.current.timer = null
        tap.current.count = 0
        if (zoomedRef.current) return // ignore stray single tap while zoomed
        const f = frameRef.current.getBoundingClientRect()
        onNavigate && onNavigate(clientX < f.left + f.width / 2 ? 'prev' : 'next')
      }, DOUBLE_TAP_MS)
    }

    function onWheel(e) {
      e.preventDefault()
      // ctrlKey set => pinch gesture on a trackpad (finer step); plain wheel => coarser
      const factor = Math.exp(-e.deltaY * (e.ctrlKey ? 0.012 : 0.0022))
      zoomToPoint(e.clientX, e.clientY, tf.current.s * factor, false)
      e.stopPropagation()
    }

    layer.addEventListener('pointerdown', onPointerDown, { passive: false })
    layer.addEventListener('pointermove', onPointerMove, { passive: false })
    layer.addEventListener('pointerup', endPointer, { passive: false })
    layer.addEventListener('pointercancel', endPointer, { passive: false })
    layer.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      layer.removeEventListener('pointerdown', onPointerDown)
      layer.removeEventListener('pointermove', onPointerMove)
      layer.removeEventListener('pointerup', endPointer)
      layer.removeEventListener('pointercancel', endPointer)
      layer.removeEventListener('wheel', onWheel)
      clearTapTimer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, locale])

  return (
    <div
      ref={frameRef}
      style={{ zIndex: active ? 2 : 0 }}
      className={`absolute inset-0 flex justify-center items-center max-w-[1500px] max-h-[80vh] w-full h-full mx-auto px-2 xs:px-4 pointer-events-none ${frameClassName}`}
    >
      <div ref={contentRef} style={{ transformOrigin: '0 0', willChange: 'transform' }} className="relative w-full h-full flex justify-center items-center">
        {children}
      </div>

      {active && (
        <>
          {/* Interaction surface: passive at 1x (lets swipe/drag-dismiss through),
              captures pan + pinch once zoomed. */}
          <div
            ref={layerRef}
            aria-hidden
            style={{ touchAction: zoomed ? 'none' : 'auto', cursor: zoomed ? (gesture.current === 'pan' ? 'grabbing' : 'grab') : 'zoom-in' }}
            className="absolute inset-0 z-[1] pointer-events-auto"
          />

          {/* On-screen zoom controls */}
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-[3] flex flex-col items-center gap-1.5 pointer-events-auto">
            <ZoomButton
              label={t('Zoom in', 'Agrandir', 'Inzoomen')}
              onClick={() => zoomToPoint(centerX(frameRef), centerY(frameRef), tf.current.s * 1.6, true)}
            >
              <line x1="11" y1="6" x2="11" y2="16" /><line x1="6" y1="11" x2="16" y2="11" />
            </ZoomButton>
            <ZoomButton
              label={t('Zoom out', 'Réduire', 'Uitzoomen')}
              onClick={() => zoomToPoint(centerX(frameRef), centerY(frameRef), tf.current.s / 1.6, true)}
            >
              <line x1="6" y1="11" x2="16" y2="11" />
            </ZoomButton>
            <ZoomButton
              label={t('Reset zoom', 'Réinitialiser', 'Herstellen')}
              onClick={() => reset(true)}
              disabled={!zoomed}
            >
              <path d="M7 4 H4 V7" /><path d="M15 4 H18 V7" /><path d="M7 18 H4 V15" /><path d="M15 18 H18 V15" />
            </ZoomButton>
          </div>
        </>
      )}
    </div>
  )
}

function centerX(ref) { const r = ref.current?.getBoundingClientRect(); return r ? r.left + r.width / 2 : 0 }
function centerY(ref) { const r = ref.current?.getBoundingClientRect(); return r ? r.top + r.height / 2 : 0 }

function ZoomButton({ children, label, onClick, disabled }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center w-9 h-9 rounded-full bg-background/70 text-foreground backdrop-blur-sm border border-foreground/15 transition
        ${disabled ? 'opacity-30 cursor-default' : 'opacity-80 hover:opacity-100 hover:bg-background/90 active:scale-95'}`}
    >
      <svg viewBox="0 0 22 22" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </button>
  )
}
