import React, { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { gsap } from 'gsap/dist/gsap'
import { useTransition } from '@/utils/transitionContext'

export default function TransitionOverlay() {
  const router = useRouter()
  const {
    phase, transitionImage, cardRect, targetHref,
    categoryPageReady, carouselReady,
    startReverse,
    completeForward,
    signalDepthReveal,
    lockRef,
  } = useTransition()

  const overlayRef = useRef(null)
  const imgRef = useRef(null)
  const tlRef = useRef(null)

  // ── Back button interception — only when going back to home page ──
  useEffect(() => {
    router.beforePopState(({ url, as }) => {
      const isGoingHome = as === '/' || /^\/[a-z]{2}\/?$/.test(as)
      if (isGoingHome && transitionImage && !lockRef.current) {
        window.history.pushState(null, '', router.asPath)
        startReverse()
        return false
      }
      return true
    })
    return () => router.beforePopState(() => true)
  }, [router, transitionImage, startReverse, lockRef])

  // ── Forward exit: elements out → image expand → navigate ──
  useEffect(() => {
    if (phase !== 'forward-animating' || !transitionImage || !cardRect) return

    const overlay = overlayRef.current
    const img = imgRef.current
    if (!overlay || !img) return

    // Show overlay
    gsap.set(overlay, { visibility: 'visible', pointerEvents: 'all' })

    // Position image at card rect
    gsap.set(img, {
      top: cardRect.top,
      left: cardRect.left,
      width: cardRect.width,
      height: cardRect.height,
      opacity: 1,
      borderRadius: window.innerWidth >= 768 ? 6 : 2,
    })

    // Set image source with LQIP fallback
    img.style.backgroundImage = transitionImage.lqip
      ? `url(${transitionImage.lqip})`
      : 'none'
    img.style.backgroundSize = 'cover'
    img.src = `${transitionImage.src}?w=1920&auto=format`

    const vw = window.innerWidth
    const vh = window.innerHeight

    const tl = gsap.timeline()

    // Hide non-front cards instantly
    gsap.set('[data-transition="non-front-card"]', { autoAlpha: 0 })

    // Fade front card (overlay image covers the photo, so only text/gradient fade is visible)
    tl.to('[data-transition="front-card"]', { autoAlpha: 0, duration: 0.35, ease: 'power2.out' }, 0)

    // Animate out UI elements
    tl.to('[data-transition="nav"]', { autoAlpha: 0, y: -20, duration: 0.35, ease: 'power2.out' }, 0)
    tl.to('[data-transition="category-list"]', { autoAlpha: 0, x: -30, duration: 0.35, ease: 'power2.out' }, 0)
    tl.to('[data-transition="bottom-bar"]', { autoAlpha: 0, y: 20, duration: 0.35, ease: 'power2.out' }, 0)
    tl.to('[data-transition="scroll-hint"]', { autoAlpha: 0, duration: 0.2, ease: 'power2.out' }, 0)

    // Expand image to fullscreen
    tl.to(img, {
      top: 0,
      left: 0,
      width: vw,
      height: vh,
      borderRadius: 0,
      duration: 0.65,
      ease: 'power3.inOut',
    }, 0.15)

    // Navigate once image is fullscreen
    tl.call(() => {
      router.push(targetHref)
    }, null, 0.80)

    tlRef.current = tl
    return () => tl.kill()
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Forward enter: dissolve fullscreen image to reveal category page ──
  useEffect(() => {
    if (phase !== 'forward-animating' || !categoryPageReady) return

    const overlay = overlayRef.current
    const img = imgRef.current
    if (!overlay || !img) return

    // Kill exit timeline if still running
    if (tlRef.current) {
      tlRef.current.kill()
      tlRef.current = null
    }

    // Ensure image is fullscreen and opaque
    gsap.set(img, { opacity: 1 })

    const tl = gsap.timeline({
      onComplete: () => {
        completeForward()
        gsap.delayedCall(0.3, () => {
          gsap.set(overlay, { visibility: 'hidden', pointerEvents: 'none' })
          gsap.set(img, { opacity: 0 })
          img.src = ''
          img.style.backgroundImage = 'none'
        })
      },
    })

    // Dissolve the image to reveal the category page beneath
    tl.to(img, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    })

    tlRef.current = tl
    return () => tl.kill()
  }, [phase, categoryPageReady, completeForward])

  // ── Reverse exit: fade image in over category page → navigate home ──
  useEffect(() => {
    if (phase !== 'reverse-animating' || !transitionImage) return

    const overlay = overlayRef.current
    const img = imgRef.current
    if (!overlay || !img) return

    // Show overlay
    gsap.set(overlay, { visibility: 'visible', pointerEvents: 'all' })

    // Position image fullscreen, start invisible
    gsap.set(img, {
      top: 0, left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      opacity: 0,
    })

    // Ensure image src is still set
    img.style.backgroundImage = transitionImage.lqip
      ? `url(${transitionImage.lqip})`
      : 'none'
    img.style.backgroundSize = 'cover'
    if (!img.src || !img.src.includes(transitionImage.src)) {
      img.src = `${transitionImage.src}?w=1920&auto=format`
    }

    const tl = gsap.timeline()

    // Fade image in over the category page
    tl.to(img, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.in',
    })

    // Navigate home once image covers the page
    tl.call(() => {
      router.push('/')
    }, null, 0.40)

    tlRef.current = tl
    return () => tl.kill()
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Reverse enter: shrink image → elements in ──
  useEffect(() => {
    if (phase !== 'reverse-animating' || !carouselReady || !cardRect) return

    const overlay = overlayRef.current
    const img = imgRef.current
    if (!overlay || !img) return

    // Kill reverse-exit timeline if still running
    if (tlRef.current) {
      tlRef.current.kill()
      tlRef.current = null
    }

    // Ensure image is fullscreen and visible
    gsap.set(img, { opacity: 1 })

    // Show carousel wrapper now (overlay image covers screen, so no flash)
    gsap.set('[data-transition="carousel-wrapper"]', { autoAlpha: 1 })

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { visibility: 'hidden', pointerEvents: 'none' })
        gsap.set(img, { opacity: 0 })
        img.src = ''
        img.style.backgroundImage = 'none'
      },
    })

    // Shrink image back to card position
    tl.to(img, {
      top: cardRect.top,
      left: cardRect.left,
      width: cardRect.width,
      height: cardRect.height,
      borderRadius: window.innerWidth >= 768 ? 6 : 2,
      duration: 0.65,
      ease: 'power3.inOut',
    }, 0)

    // Show front card just before shrink completes (overlay still covers it)
    tl.set('[data-transition="front-card"]', { autoAlpha: 1 }, 0.6)

    // Signal CardCarousel to run depth stagger (handles cards + UI chrome + completeReverse)
    tl.call(() => signalDepthReveal(), null, 0.65)

    tlRef.current = tl
    return () => tl.kill()
  }, [phase, carouselReady, cardRect, signalDepthReveal])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        visibility: 'hidden',
      }}
    >
      <img
        ref={imgRef}
        alt=""
        style={{
          position: 'absolute',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0,
        }}
      />
    </div>
  )
}
