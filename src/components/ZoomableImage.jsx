import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { MIN_SCALE, MAX_SCALE, DOUBLE_TAP_SCALE, clampTranslate, anchoredZoom } from '@/utils/zoomMath'

// Zoom/pan surface for the carousel's active photo. It is INERT until `focus` is
// turned on (via the magnifier button in ProjectPicture) so standard carousel
// navigation is never touched. While focusing it captures:
//   - mouse scroll-wheel / trackpad-pinch zoom (ctrl+wheel = native pinch)
//   - two-finger pinch-zoom on touch
//   - double-click / double-tap to toggle fit (1x) <-> detail zoom
//   - drag to pan while zoomed, clamped to the image edges
// Zoom in/out/reset are driven imperatively from the on-screen buttons (ref).

const TAP_SLOP = 8 // px of movement that still counts as a tap (not a drag)
const TAP_MAX_MS = 350
const DOUBLE_TAP_MS = 280

const ZoomableImage = forwardRef(function ZoomableImage({ children, ar, active, focus, onZoomChange, frameClassName = '' }, ref) {
  const frameRef = useRef(null)
  const contentRef = useRef(null)
  const layerRef = useRef(null)

  // Live transform — written imperatively for 60fps; React state only mirrors the
  // zoomed/not-zoomed boundary (drives the cursor + reset-button enabled state).
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

  function applyTransform() {
    const el = contentRef.current
    if (!el) return
    const { s, x, y } = tf.current
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`
  }

  // Clamp against the frame's untransformed size (offsetWidth/Height ignore CSS
  // transforms) so the scaled image always covers the frame.
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

  const center = () => {
    const r = frameRef.current?.getBoundingClientRect()
    return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: 0, y: 0 }
  }
  function reset(animate = true) { setTransform(1, 0, 0, animate) }

  // Imperative API for the on-screen +/- and reset buttons (rendered by the parent).
  useImperativeHandle(ref, () => ({
    zoomIn: () => { const c = center(); zoomToPoint(c.x, c.y, tf.current.s * 1.6, true) },
    zoomOut: () => { const c = center(); zoomToPoint(c.x, c.y, tf.current.s / 1.6, true) },
    reset: () => reset(true),
    isZoomed: () => zoomedRef.current,
  }), [])

  // Snap back to fit whenever this photo leaves focus mode or stops being active.
  useEffect(() => {
    if (!active || !focus) {
      if (tween.current) { tween.current.kill(); tween.current = null }
      pointers.current.clear()
      gesture.current = null
      tf.current = { s: 1, x: 0, y: 0 }
      applyTransform()
      commit(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, focus])

  // Keep the pan clamped if the viewport / frame resizes while zoomed.
  useEffect(() => {
    function onResize() { const { s, x, y } = tf.current; setTransform(s, x, y, false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Gesture listeners are attached natively (so wheel / pinch can preventDefault)
  // and ONLY while this photo is the active one in focus mode.
  useEffect(() => {
    const layer = layerRef.current
    if (!layer || !active || !focus) return

    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)
    const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 })
    const clearTapTimer = () => { if (tap.current.timer) { clearTimeout(tap.current.timer); tap.current.timer = null } }

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

      const d = tap.current.down
      if (d && pointers.current.size < 2 && Math.hypot(e.clientX - d.x, e.clientY - d.y) > TAP_SLOP) tap.current.moved = true

      if (gesture.current === 'pinch' && pointers.current.size >= 2) {
        const pts = [...pointers.current.values()]
        const ps = pinchStart.current
        const ns = Math.min(MAX_SCALE, Math.max(MIN_SCALE, ps.s * (dist(pts[0], pts[1]) / ps.dist)))
        const m = mid(pts[0], pts[1])
        const f = frameRef.current.getBoundingClientRect()
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
      }
    }

    function endPointer(e) {
      const had = pointers.current.has(e.pointerId)
      pointers.current.delete(e.pointerId)
      try { layer.releasePointerCapture(e.pointerId) } catch (_) {}
      const d = tap.current.down
      const quick = d && (Date.now() - d.t) <= TAP_MAX_MS
      const wasTap = had && !tap.current.moved && quick

      if (gesture.current === 'pinch') {
        e.preventDefault()
        if (pointers.current.size === 1) {
          const pt = [...pointers.current.values()][0]
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
        if (wasTap) registerTap(e.clientX, e.clientY) // a still tap on a zoomed image -> double-tap reset
        return
      }

      if (wasTap) registerTap(e.clientX, e.clientY)
      else tap.current.count = 0
    }

    // Double-tap toggles zoom; a lone single tap does nothing (no nav in focus mode).
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
      tap.current.timer = setTimeout(() => { tap.current.timer = null; tap.current.count = 0 }, DOUBLE_TAP_MS)
    }

    function onWheel(e) {
      e.preventDefault()
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
  }, [active, focus])

  return (
    <div
      ref={frameRef}
      style={{ zIndex: active && focus ? 2 : 0 }}
      className={`absolute inset-0 flex justify-center items-center max-w-[1500px] max-h-[80vh] w-full h-full mx-auto px-2 xs:px-4 pointer-events-none ${frameClassName}`}
    >
      <div ref={contentRef} style={{ transformOrigin: '0 0', willChange: 'transform' }} className="relative w-full h-full flex justify-center items-center">
        {children}
      </div>

      {active && focus && (
        <div
          ref={layerRef}
          aria-hidden
          style={{ touchAction: 'none', cursor: zoomed ? 'grab' : 'zoom-in' }}
          className="absolute inset-0 z-[1] pointer-events-auto"
        />
      )}
    </div>
  )
})

export default ZoomableImage
