import AccentTitle from '@/components/AccentTitle';
import LayoutSection from '@/components/LayoutSection';
import Line from '@/components/Line';
import SubTitle from '@/components/SubTitle';
import client from 'lib/sanity';
import { useNextSanityImage } from 'next-sanity-image';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { horizontalLoop } from '@utils/horizontalLoop';
// import { usePageContext } from '@/utils/pageContext';
import useLayoutEffect from '@utils/useIsomorphicLayoutEffect'
import { useAppContext } from '@/utils/appContext';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
gsap.registerPlugin(ScrollTrigger);

// How many times each set of logos is repeated to fill the marquee track so the
// seamless loop never shows a gap. Safe for any logo count >= 2.
const REPEAT_ARTISTS = 4
const REPEAT_COMPANIES = 3

export default function TrustedBy({ trustedBy }) {

  // const { ctx, tl } = usePageContext()
  let ctx = useRef(null)
  let tl = useRef(null)
  let trusted = useRef()
  let artistTrack = useRef()
  let artistStrip = useRef()
  let companyTrack = useRef()
  let companyStrip = useRef()
  let { width, locale } = useAppContext()
  let [reducedMotion, setReducedMotion] = useState(false)

  // Honor prefers-reduced-motion (mirrors src/components/carousel/CategoryList.jsx)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e) => setReducedMotion(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useLayoutEffect(() => {
    if (!width) return // useWindowSize seeds width=undefined; wait for first measure
    const cleanups = []

    ctx.current = gsap.context((self) => {
      // ---- Entrance reveal (fade the whole track, not per-logo, since clones share .logo-* classes)
      tl.current = gsap.timeline({ scrollTrigger: { trigger: trusted.current, start: `top ${width < 668 ? '85%' : '80%'}`, invalidateOnRefresh: true, markers: false } })
        .to('.artist-title', { opacity: 1, duration: 1 })
        .to('.artist-line', { width: 100, duration: 0.8, }, '<')
        .to('.artist-track', { opacity: 1, duration: 0.7, ease: 'back' }, '-=1')
        .to('.company-title', { opacity: 1, duration: 1 }, '-=1.5')
        .to('.company-line', { width: 150, duration: 0.8, }, '<')
        .to('.company-track', { opacity: 1, duration: 0.7, ease: 'back' }, '-=1')

      if (reducedMotion) return // native swipeable strips; no auto-loop

      // ---- Build one seamless loop per row. Per-row magnitude lives in `speed`;
      //      timeScale carries ONLY direction (sign) + the scroll-velocity boost.
      const gapPx = (ref, fallback) => parseFloat(getComputedStyle(ref.current).columnGap) || fallback
      // forward play = items move LEFT (artists). companies drift RIGHT, so build them
      // `reversed` — the helper primes onReverseComplete first, avoiding the parked-at-0
      // edge case you hit when setting a negative timeScale on a fresh loop.
      const artistLoop = horizontalLoop(self.selector('.logo-artist'), { speed: 0.4, repeat: -1, paddingRight: gapPx(artistStrip, 64) })
      const companyLoop = horizontalLoop(self.selector('.logo-company'), { speed: 0.7, repeat: -1, reversed: true, paddingRight: gapPx(companyStrip, 48) })

      // artists drift LEFT (+1), companies RIGHT (-1) on scroll-down.
      const rows = {
        artist: { loop: artistLoop, baseDir: 1, hovered: false },
        company: { loop: companyLoop, baseDir: -1, hovered: false },
      }
      let scrollDir = 1
      const settle = (k) => { if (!rows[k].hovered) gsap.to(rows[k].loop, { timeScale: scrollDir * rows[k].baseDir, duration: 0.6, overwrite: true }) }
      Object.keys(rows).forEach((k) => rows[k].loop.timeScale(rows[k].baseDir)) // start at slow base drift

      // ---- Scroll scrub: velocity ramps timeScale up, direction flips the loops, idle eases back to base.
      let idle
      ScrollTrigger.create({
        trigger: trusted.current,
        start: 'top bottom',
        end: 'bottom top',
        invalidateOnRefresh: true,
        onUpdate: (st) => {
          scrollDir = st.direction
          const add = Math.min(Math.abs(st.getVelocity()) * 0.0009, 6)
          Object.keys(rows).forEach((k) => { if (!rows[k].hovered) rows[k].loop.timeScale(scrollDir * rows[k].baseDir * (1 + add)) })
          idle?.kill()
          idle = gsap.delayedCall(0.15, () => Object.keys(rows).forEach(settle))
        },
      })

      // ---- Pause only the hovered/focused row (each row is its own timeline).
      ;[['artist', artistTrack], ['company', companyTrack]].forEach(([k, ref]) => {
        const el = ref.current
        if (!el) return
        const on = () => { rows[k].hovered = true; gsap.to(rows[k].loop, { timeScale: 0, duration: 0.4, overwrite: true }) }
        const off = () => { rows[k].hovered = false; settle(k) }
        el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off)
        el.addEventListener('focusin', on); el.addEventListener('focusout', off)
        cleanups.push(() => {
          el.removeEventListener('mouseenter', on); el.removeEventListener('mouseleave', off)
          el.removeEventListener('focusin', on); el.removeEventListener('focusout', off)
        })
      })
    }, '.trusted-by')

    return () => { cleanups.forEach((fn) => fn()); ctx.current.revert() }
  }, [width, reducedMotion])

  function renderRow(logos, type, repeat) {
    return Array.from({ length: repeat }).flatMap((_, r) =>
      logos.map((logo, i) => <Logo type={type} logo={logo} link={logo.link} ariaHidden={r > 0} key={`${type}-${r}-${i}`} />)
    )
  }

  // In reduced-motion mode we render a single set the user can swipe through.
  let artistRepeat = reducedMotion ? 1 : REPEAT_ARTISTS
  let companyRepeat = reducedMotion ? 1 : REPEAT_COMPANIES

  return (
    <LayoutSection center>
      <div ref={trusted} className='trusted-by trusted-by-div relative w-full text-center'>
        <SubTitle className='max-w-[70%] mx-auto opacity-1 title' mainTitle={trustedBy.title?.[locale] || 'Trusted By'} subTitle={''} />
        <AccentTitle noMargin className={'artist-title opacity-0'} text={trustedBy.artistsLabel?.[locale] || 'Artists'} />
        <Line style={{}} className={`opacity-100 w-0 mx-auto mb-2 artist-line border-foreground`} />
        <div ref={artistTrack} className={`artist-track w-full opacity-0 ${reducedMotion ? 'overflow-x-auto' : 'overflow-x-hidden'}`}>
          <div ref={artistStrip} className='flex flex-nowrap w-max mx-auto items-center gap-16 sm:gap-20 lg:gap-24'>
            {renderRow(trustedBy.artists, 'artist', artistRepeat)}
          </div>
        </div>
        <AccentTitle noMargin className={'mt-4 company-title opacity-0'} text={trustedBy.companiesLabel?.[locale] || 'Companies'} />
        <Line style={{}} className={`opacity-100 w-0 mx-auto mb-2 company-line border-foreground`} />
        <div ref={companyTrack} className={`company-track w-full opacity-0 ${reducedMotion ? 'overflow-x-auto' : 'overflow-x-hidden'}`}>
          <div ref={companyStrip} className='flex flex-nowrap w-max mx-auto items-center gap-10 sm:gap-12 lg:gap-16'>
            {renderRow(trustedBy.companies, 'company', companyRepeat)}
          </div>
        </div>
      </div>
    </LayoutSection>
  )
}

function Logo({ type, logo, link, ariaHidden }) {
  let { src, width, height, loader } = useNextSanityImage(client, logo.image.asset);
  let ar = (width / height)
  // console.log(ar)
  let [hovering, setHovering] = useState(false);
  let [clicking, setClicking] = useState(false);
  let [active, setActive] = useState(false);
  const myRef = useRef();
  let ctx = useRef(gsap.context(() => { }))
  useEffect(() => {

    return () => ctx.current.revert()

  })


  useEffect(() => {
    myRef?.current !== undefined &&
      ctx.current.add(() => {
        gsap.to(myRef.current, {
          duration: 0.5,
          scale: hovering ? (clicking ? 0.95 : 1.05) : 1,
          transformOrigin: '50% 50%',
          ease: 'elastic.out(1, 0.5)',
          // ease: 'expo.out',
        });
      });
  }, [hovering, clicking, active]);



  function getImage() {
    let displayWidth = ar > 2.5 ? 120 : ar > 1 ? 100 : 80;
    let displayHeight = displayWidth / ar;

    return (
      <div
        className="bg-foreground mask-image"
        style={{
          width: `${displayWidth}px`,
          height: `${displayHeight}px`,
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
        }}
        role="img"
        aria-label={`Logo of the ${type} ${logo.name}`}
      />
    );
  }

  // if (link === undefined) {
  //   return getImage()
  // }

  return (
    <Link className={`cursor-pointer logo logo-${type} my-auto shrink-0`} href={link !== undefined ? link : 'none'} target='_blank'
      rel="noopener noreferrer"
      ref={myRef}
      aria-hidden={ariaHidden}
      tabIndex={ariaHidden ? -1 : 0}
      onClick={(e) => link === undefined && e.preventDefault()}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setClicking(false);
      }}
      onMouseDown={() => setClicking(true)}
      onMouseUp={() => setClicking(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {getImage()}
    </Link>)
}
