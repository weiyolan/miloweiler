import React, { forwardRef, useRef, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { gsap } from 'gsap/dist/gsap'
import { SplitText } from 'gsap/dist/SplitText'
import SanityImage from '@/components/SanityImage'

const CarouselCard = forwardRef(function CarouselCard({
  label,
  description,
  image,
  alt,
  projectCount,
  year,
  index,
  href,
  isFront,
  titleVisible,
  mobileDescriptionTop,
  onTransitionClick,
}, ref) {
  const router = useRouter()
  const localRef = useRef(null)
  const setRefs = useCallback((el) => {
    localRef.current = el
    if (typeof ref === 'function') ref(el)
    else if (ref) ref.current = el
  }, [ref])

  const showTitle = isFront && titleVisible

  // ---- Line-by-line description reveal (front card) ----
  const pRef = useRef(null)
  const barRef = useRef(null)
  const descWrapRef = useRef(null)
  const tlRef = useRef(null)
  const showTitleRef = useRef(showTitle)
  const [reduced] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  // Hold the description back until the title's word-reveal is nearly done: start ~0.15s before it finishes.
  // Mirrors the title's per-word CSS timing (delay 0.1 + wi*0.1, duration 0.5s) across label.split(' ').
  const titleWords = label ? label.split(' ').length : 1
  const descStart = Math.max(0, 0.6 + 0.1 * Math.max(0, titleWords - 1) - 0.3)

  // Hide the description until SplitText has built the lines (the line + bar tweens drive visibility after).
  useLayoutEffect(() => {
    if (reduced || !description) return
    if (pRef.current) gsap.set(pRef.current, { autoAlpha: 0 })
    if (barRef.current) gsap.set(barRef.current, { scaleY: 0, transformOrigin: 'top' })
  }, [reduced, description])

  // Split the description into lines and build a paused, staggered rise + accent-bar draw.
  useEffect(() => {
    if (reduced || !description) return
    const p = pRef.current
    if (!p) return
    let ctx
    let cancelled = false
    const applyReveal = () => {
      const tl = tlRef.current
      if (!tl) return
      showTitleRef.current ? tl.play(0) : tl.pause(0)
    }
    document.fonts.ready.then(() => {
      if (cancelled || !pRef.current) return
      ctx = gsap.context(() => {
        SplitText.create(p, {
          type: 'lines',
          autoSplit: true,
          linesClass: 'cc-desc-line',
          onSplit(self) {
            // Subtle reveal: lines softly fade up a touch; the left accent bar draws top→bottom alongside.
            if (tlRef.current) tlRef.current.kill() // drop the prior tl on autoSplit rebuild
            const lines = self.lines
            const LINES_START = 0.2
            const LINE_DUR = 0.7
            const STAGGER = 0.09
            // Match the bar draw to when the last line settles, so they finish together.
            const barDur = LINES_START - 0.3 + LINE_DUR + STAGGER * Math.max(0, lines.length - 1)
            const tl = gsap.timeline({ paused: true })
            tl.to(barRef.current, { scaleY: 1, duration: barDur, ease: 'ease.out' }, descStart)
              .from(lines, {
                yPercent: 30,
                autoAlpha: 0,
                stagger: STAGGER,
                duration: LINE_DUR,
                ease: 'ease.out',
              }, descStart + LINES_START)
            tlRef.current = tl
            gsap.set(p, { autoAlpha: 1 }) // container visible; lines + bar animate from hidden
            applyReveal()
            return tl // autoSplit reverts this tl + rebuilds on resize / font-swap
          },
        })
      }, descWrapRef)
    })
    return () => {
      cancelled = true
      if (tlRef.current) tlRef.current.kill()
      tlRef.current = null
      ctx && ctx.revert()
    }
  }, [reduced, description, descStart])

  // Play / reset the reveal as this card enters or leaves the front position.
  useEffect(() => {
    showTitleRef.current = showTitle
    if (reduced) return
    const tl = tlRef.current
    if (!tl) return
    showTitle ? tl.play(0) : tl.pause(0)
  }, [showTitle, reduced])

  function handleClick(e) {
    e.preventDefault()
    if (!isFront) return
    // Transition disabled — navigate directly
    router.push(href)
    // if (!onTransitionClick) return
    // const rect = localRef.current?.getBoundingClientRect()
    // if (!rect) return
    // onTransitionClick(
    //   { src: image.asset.url, lqip: image.asset?.metadata?.lqip, alt: alt || label },
    //   rect,
    //   href,
    // )
  }

  return (
    <div
      ref={setRefs}
      data-transition={isFront ? 'front-card' : 'non-front-card'}
      className="absolute inset-0 cursor-pointer"
      style={{ opacity: 0, visibility: 'hidden', backfaceVisibility: 'hidden', willChange: 'transform' }}
    >
      <a onClick={handleClick} className="block w-full h-full group">
        <div className="absolute inset-0 rounded-sm md:rounded-md overflow-hidden brightness-100 transition-[filter] duration-500 ease-out group-hover:brightness-110">
          <SanityImage
            image={image}
            fill
            blur
            sizes="(max-width: 768px) 90vw, 80vw"
            alt={alt || label}
            containerClass="rounded-none"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 rounded-sm md:rounded-md transition-opacity duration-500 group-hover:opacity-80" />

        {/* Description legibility scrim (desktop only) */}
        {description && (
          <div
            className="hidden md:block absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-black/70 to-transparent rounded-l-sm md:rounded-l-md pointer-events-none"
            style={{
              opacity: showTitle ? 1 : 0,
              transition: showTitle ? `opacity 0.5s ease-out ${descStart}s` : 'opacity 0.15s ease',
            }}
          />
        )}

        {/* Description — front card reveals it line by line */}
        {description && (
          <div
            ref={descWrapRef}
            className="absolute left-0 right-0 px-0 min-[400px]:px-5 lg:px-0 lg:left-10 lg:right-auto lg:top-auto lg:bottom-[20%] lg:max-w-[45%] 2xl:max-w-[35%] lg:mt-0 lg:mb-0"
            style={{ top: mobileDescriptionTop != null ? `${mobileDescriptionTop}px` : undefined }}
          >
            <div className="relative pl-3">
              {/* Left accent bar — draws top→bottom in sync with the line reveal */}
              <span
                ref={barRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 bottom-0 w-[2px] bg-foreground/40 origin-top"
              />
              <p
                ref={pRef}
                className="font-sans text-foreground/75 text-[13px] leading-snug lg:text-sm lg:leading-relaxed"
                style={
                  reduced
                    ? {
                        opacity: showTitle ? 1 : 0,
                        transition: showTitle ? `opacity 0.5s ease-out ${descStart}s` : 'opacity 0.15s ease',
                      }
                    : undefined
                }
              >
                {description}
              </p>
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs md:text-sm text-foreground">
              {String(index).padStart(2, '0')}
            </span>
            <span className="font-mono text-xs md:text-sm text-foreground">
              {projectCount} {projectCount === 1 ? 'project' : 'projects'}
            </span>
          </div>
          <div className="flex justify-between items-end ">
            <span className="font-mono text-xs md:text-sm text-foreground">
              {year}
            </span>
            <h2 className="font-serif text-[22px] md:text-4xl lg:text-5xl text-foreground font-bold text-right flex flex-wrap justify-end gap-x-[0.3em] translate-y-4">
              {label.split(' ').map((word, wi) => (
                <span key={wi} className="overflow-hidden pb-2 md:pb-6 inline-flex">
                  <span
                    style={{
                      display: 'inline-block',
                      opacity: showTitle ? 1 : 0,
                      transform: showTitle ? 'translateY(0)' : 'translateY(200%)',
                      transition: showTitle
                        ? `transform 0.5s ease-out ${0.1 + wi * 0.1}s`
                        : 'transform 0.15s ease',
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>
        </div>
      </a>
    </div>
  )
})

export default CarouselCard
