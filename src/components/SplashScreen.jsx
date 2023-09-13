import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap/dist/gsap'
import Spinner from './Spinner'

export default function SplashScreen({ pageLoaded }) {

  let ctx = useRef(gsap.context(() => { }))

  useEffect(() => {
    ctx.current.add(() => {
      gsap.timeline()
        .to('.splashSpinner', {
          opacity: pageLoaded ? 0 : 1,
          duration: 0.3,
          scale: pageLoaded ? 0.5 : 1,
        })
        .to('.splashScreen', {
          autoAlpha: () => pageLoaded ? 0 : 1,
          duration: 0.5
        })
    })
  }, [pageLoaded])

  useEffect(() => {
    return ctx.current.revert()
  }, [])

  return (
    <div className='fixed top-0 z-[9999] w-full h-screen splashScreen bg-darkPrimary'>
      <Spinner darkMode={true} cube className={`w-4 h-4 left-1/2 top-1/2 absolute -translate-x-1/2 splashSpinner -translate-y-1/2`} />
    </div>
  )
}
