import { gsap } from 'gsap/dist/gsap'
import React, { useEffect, useRef } from 'react'



export default function Parallax({ children, className, ...props }) {
  const ctx = useRef(null)

  useEffect(() => {
    ctx.current = gsap.context(() => { },'.parallaxContainer')
    return () => ctx.current.revert();
  }, []);

  useEffect(() => {
    ctx.current.add(()=>{
      gsap.to('.depth1',{
        scale:3
      })
      gsap.to('.depth2',{
        scale:1.5
      })
      gsap.to('.depth3',{
        scale:0.5
      })
    })
  }, [])

  return (
    <div className={`parallaxContainer ${className ? className : ''}`} {...props}>
      {children}
    </div>
  )
}
