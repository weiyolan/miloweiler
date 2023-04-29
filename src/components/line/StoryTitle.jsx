import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Parallax from '@/components/Parallax'
gsap.registerPlugin(ScrollTrigger)

export default function StoryTitle({ introAnimated }) {

  let ctx = useRef()
  useEffect(() => {
    ctx.current = gsap.context(() => { },)
    return () => ctx.current.revert()
  }, [])

  let duration = 2;
  let stagger = 0.3;
  useEffect(() => {
    ctx.current.add(() => {
      gsap.timeline()
        .to('.depth3', {
          opacity: introAnimated ? 1 : 0,
          y: introAnimated ? '-=5' : 'none',
          stagger:stagger,
          duration: duration,
          ease: 'power3.out'
        })
        .to('.depth2', {
          opacity: introAnimated ? 1 : 0,
          y: introAnimated ? '-=15' : 'none',
          stagger:stagger,
          duration: duration,
          ease: 'power3.out'
        }, '<+=0.1')
        .to('.depth1', {
          opacity: introAnimated ? 1 : 0,
          y: introAnimated ? '-=30' : 'none',
          stagger:stagger,
          duration: duration,
          ease: 'power3.out'
        }, '<+=0.1')
    })

  }, [introAnimated])
  return (
    <Parallax className={`svgPage w-screen h-screen fixed top-0`}>

      <h1 className='font-lora text-6xl text-primary fixed left-16 bottom-24 scale-150 hidden'>
        I am a Photo grapher
      </h1>

      <svg className="fixed left-10 bottom-0 w-[30vw] " viewBox="0 0 551 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text className='scale0 depth3 opacity-0 ' fill="#FFF5EA" style={{ "white-space": "pre" }} fontFamily="Lora" fontSize="42.2727" letterSpacing="0em"><tspan x="0" y="230.472">I&#x2019;m a</tspan></text>
        <text className='scale0 depth1 opacity-0 ' fill="#FFF5EA" style={{ "white-space": "pre" }} fontFamily="Lora" fontSize="87.8834" letterSpacing="0em"><tspan x="96" y="200.1653">photo</tspan></text>
        <text className='scale0 depth2 opacity-0 ' fill="#FFF5EA" style={{ "white-space": "pre" }} fontFamily="Lora" fontSize="72.5438" letterSpacing="0em"><tspan x="285" y="219.051">grapher </tspan></text>
      </svg>

      <svg className='fixed top-24 right-0 w-[30vw] -translate-y-1/4' viewBox="0 0 505 535" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text className='scale0 depth3 opacity-0' fill="#FFF5EA" style={{ "white-space": "pre" }} fontFamily="Lora" fontSize="52.5204" letterSpacing="0em"><tspan x="0.0711212" y="107.722">My style is </tspan></text>
        <text className='scale0 depth1 opacity-0' fill="#FFF5EA" style={{ "white-space": "pre" }} fontFamily="Lora" fontSize="75" letterSpacing="0em"><tspan x="161.107" y="174.07">emotive </tspan></text>
        <text className='scale0 depth3 opacity-0' fill="#FFF5EA" style={{ "white-space": "pre" }} fontFamily="Lora" fontSize="47.3029" letterSpacing="0em"><tspan x="353.311" y="237.609">unique</tspan></text>
        <text className='scale0 depth2 opacity-0' fill="#FFF5EA" style={{ "white-space": "pre" }} fontFamily="Lora" fontSize="75" letterSpacing="0em"><tspan x="92.4258" y="257.07">&#38;</tspan></text>
        <text className='scale0 depth2 opacity-0' fill="#FFF5EA" style={{ "white-space": "pre" }} fontFamily="Lora" fontSize="84" letterSpacing="0em"><tspan x="187.109" y="284.604">exp</tspan></text>
        <text className='scale0 depth3 opacity-0' fill="#FFF5EA" style={{ "white-space": "pre" }} fontFamily="Lora" fontSize="54.1667" letterSpacing="0em"><tspan x="118.287" y="326.278">erim</tspan></text>
        <text className='scale0 depth1 opacity-0' fill="#FFF5EA" style={{ "white-space": "pre" }} fontFamily="Lora" fontSize="90.0862" letterSpacing="0em"><tspan x="238.206" y="362.472">ental</tspan></text>
      </svg>

    </Parallax>
  )
}
