import { gsap } from 'gsap/dist/gsap'
import React, { useEffect, useRef } from 'react'

import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export default function Parallax({ children, className, ...props }) {
  const ctx = useRef(null)

  useEffect(() => {
    ctx.current = gsap.context(() => { }, '.parallaxContainer')
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
      gsap.timeline({
        scrollTrigger: {
          trigger: '#beam',
          // start: width < 648 ? '30% 20%' : 'center 20%',
          // start: '40% bottom',
          // end: "max",
          invalidateOnRefresh: true,
          scrub: 1,
          markers: false,
        }
      })
        .to('.depth1', {
          y: '-=400',
        })
        .to('.depth2', {
          y: '-=200',
        }, '<')
        .to('.depth3', {
          y: '-=50',
        }, '<')
    })
  }, [])

  return (
    <div className={`parallaxContainer ${className ? className : ''}`} {...props}>
      {children}
    </div>
  )
}
