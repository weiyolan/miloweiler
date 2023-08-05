import { gsap } from 'gsap/dist/gsap'
import React, { useEffect, useRef } from 'react'

import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export default function Parallax({ children, scope, className, trigger, timeline, duration, start, small, xs, xs2, ...props }) {
  // const ctx = useRef(null)

  // useEffect(() => {
  //   ctx.current = gsap.context(() => { }, `.parallaxContainer${scope}`)
  //   return () => ctx.current.revert();
  // }, []);

  // useEffect(() => {
    // ctx.current.add(() => {
      // `sap.to(${scope}`, {
      //   scale: 3
      // })
      // gsap.to('.depth2', {
      //   scale: 1.5
      // })
      // gsap.to('.depth3', {
      //   scale: 0.5
      // })
      // gsap.to('.scale0', {
      //   scale: 1
      // })
      // TRANSFORMATION
      // gsap.timeline({
      //   scrollTrigger: {
      //     trigger: trigger,
      //     // start: width < 648 ? '30% 20%' : 'center 20%',
      //     start: start,
      //     invalidateOnRefresh: true,
      //     scrub: 2,
      //     markers: false,
      //   }
      // })
      //  `// .to(${scope}`, {
        //   y: small ? '-=150' : '-=300',
        // })
        // .to('.depth2', {
        //   y: small ? '-=100' : '-=200',
        // }, '<')
        // .to('.depth3', {
        //   y: small ? '-=50' : '-=100',
        // }, '<')
    // })
  // }, [])

  useEffect(() => {
    timeline && timeline
      .to(`.depth1${scope}`, {
        y: xs? '-=55px' : xs2? '-=' + (55 + 20) +'px' : small ? '-=150px' : '-=300px',
        duration:duration,
      }, 0)
      .to(`.depth2${scope}`, {
        y: xs? '-=45px' : xs2? '-=' + (45 + 20) +'px' : small ? '-=100px' : '-=200px',
        duration:duration,
      }, 0)
      .to(`.depth3${scope}`, {
        y: xs? '-=35px' : xs2? '-=' + (35 + 20) +'px' : small ? '-=50px' : '-=100px',
        duration:duration,
      }, 0)
  }, [timeline])

  return (
    <div className={` ${className ? className : ''}`} {...props}>
      {children}
    </div>
  )
}
