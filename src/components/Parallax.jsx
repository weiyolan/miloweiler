import { gsap } from 'gsap/dist/gsap'
import React, { useEffect, useRef } from 'react'

import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export default function Parallax({ children, scope, className, trigger, timeline, duration, start, end, small, xs, ...props }) {
  const ctx = useRef(null)

  useEffect(() => {
    ctx.current = gsap.context(() => { }, `.parallaxContainer${scope}`)
    return () => ctx.current.revert();
  }, []);

  useEffect(() => {
    ctx.current.add(() => {
      gsap.to('.depth1', {
        scale: 3
      })
      gsap.to('.depth2', {
        scale: 1.5
      })
      gsap.to('.depth3', {
        scale: 0.5
      })
      gsap.to('.scale0', {
        scale: 1
      })
      // TRANSFORMATION
      // gsap.timeline({
      //   scrollTrigger: {
      //     trigger: trigger,
      //     // start: width < 648 ? '30% 20%' : 'center 20%',
      //     start: start,
      //     end: end,
      //     invalidateOnRefresh: true,
      //     scrub: 2,
      //     markers: false,
      //   }
      // })
        // .to('.depth1', {
        //   y: small ? '-=150' : '-=300',
        // })
        // .to('.depth2', {
        //   y: small ? '-=100' : '-=200',
        // }, '<')
        // .to('.depth3', {
        //   y: small ? '-=50' : '-=100',
        // }, '<')
    })
  }, [])

  useEffect(() => {
    timeline && timeline
      .to('.depth1', {
        y: xs? '-=55' : small ? '-=150' : '-=300',
        duration:duration,
      }, 0)
      .to('.depth2', {
        y: xs? '-=45' : small ? '-=100' : '-=200',
        duration:duration,
      }, 0)
      .to('.depth3', {
        y: xs? '-=35' : small ? '-=50' : '-=100',
        duration:duration,
      }, 0)
  }, [timeline])

  return (
    <div className={`parallaxContainer${scope} ${className ? className : ''}`} {...props}>
      {children}
    </div>
  )
}
