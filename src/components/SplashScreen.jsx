import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap/dist/gsap'
import Logo from './Logo'

export default function SplashScreen({ pageLoaded }) {

  let ctx = useRef(gsap.context(() => { }))
  let pulseTl = useRef(null)

  // Pulse animation while loading
  useEffect(() => {
    ctx.current.add(() => {
      pulseTl.current = gsap.timeline({ repeat: -1, yoyo: true })
        .fromTo('.splashSpinner', {
          opacity: 0.3,
        }, {
          opacity: 1,
          duration: 1,
          ease: 'sine.inOut',
        })
    })

    return () => ctx.current.revert()
  }, [])

  // Exit animation when page loads
  useEffect(() => {
    if (!pageLoaded) return

    ctx.current.add(() => {
      if (pulseTl.current) pulseTl.current.kill()

      gsap.timeline()
        .to('.splashSpinner', {
          opacity: 0,
          duration: 0.3,
          scale: 0,
          transformOrigin: '50% 50%',
          ease: 'back.in(3)',
        })
        .to('.splashLoadingBar', {
          opacity: 0,
          duration: 0.2,
        }, '<')
        .to('.splashScreen', {
          autoAlpha: 0,
          duration: 0.5,
        })
    })
  }, [pageLoaded])

  return (
    <div className='fixed top-0 z-[9999] w-screen h-screen splashScreen bg-background'>
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4'>
        <Logo className='w-12 h-12 splashSpinner text-foreground' />
        <div className='splashLoadingBar w-16 h-[2px] rounded-full bg-foreground/20 overflow-hidden'>
          <div className='splashLoadingBarFill h-full w-full bg-foreground/60 rounded-full origin-left animate-loading-bar' />
        </div>
      </div>
    </div>
  )
}
