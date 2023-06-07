import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Parallax from '@/components/Parallax'
gsap.registerPlugin(ScrollTrigger)

export default function StoryTitle({ textAppear, textDisappear }) {

  let ctx = useRef()
  useEffect(() => {
    ctx.current = gsap.context(() => { },)
    return () => ctx.current.revert()
  }, [])

  let durationAppear = 2;
  let durationDisappear = 1;
  let stagger = 0.3;
  
  useEffect(() => {
    ctx.current.add(() => {
      // gsap.timeline(
      //   {
      //     scrollTrigger: {
      //       trigger: '#beam',
      //       start: '30% 95%',
      //       // end: '30% 95%',
      //       toggleActions: 'play none none none',
      //       invalidateOnRefresh: true,
      //       // scrub: 1,
      //       markers: false,
      //     }
      //   })
      //   .to('.depth3Title', {
      //     opacity: 1,
      //     // y: '-=5',
      //     stagger: stagger,
      //     duration: durationAppear,
      //     ease: 'power3.out'
      //   })
      //   .to('.depth2Title', {
      //     opacity: 1,
      //     // y: '-=15',
      //     stagger: stagger,
      //     duration: durationAppear,
      //     ease: 'power3.out'
      //   }, '<+=0.1')
      //   .to('.depth1Title', {
      //     opacity: 1,
      //     // y: '-=30',
      //     stagger: stagger,
      //     duration: durationAppear,
      //     ease: 'power3.out'
      //   }, '<+=0.1')

      // gsap.timeline(
      //   {
      //     scrollTrigger: {
      //       trigger: '#beam',
      //       start: '30% 45%',
      //       // end: '30% 45%',
      //       end: '30% 25%',
      //       // toggleActions: 'play none reverse none',
      //       invalidateOnRefresh: true,
      //       scrub: 1,
      //       markers: false,
      //     }
      //   })
      //   .to('.depth3Title', {
      //     // opacity: 0,
      //     y: '+=220',
      //     //  stagger:stagger,
      //     duration: durationDisappear,
      //     ease: 'power3.out'
      //   })
      //   .to('.depth2Title', {
      //     // opacity: 0,
      //     y: '+=250',
      //     //  stagger:stagger,
      //     duration: durationDisappear,
      //     ease: 'power3.out'
      //   }, '<')
      //   .to('.depth1Title', {
      //     // opacity: 0,
      //     y: '+=270',
      //     //  stagger:stagger,
      //     duration: durationDisappear,
      //     ease: 'power3.out'
      //   }, '<')
    })

  }, [textAppear])

  return (
    // <Parallax small scope='title' end='+=1000'  className={`svgPage1 w-screen h-screen fixed top-0`}>
    <>
      <h1 className='font-lora text-6xl text-primary fixed left-16 bottom-24 scale-150 hidden'>
        I am a Photographer specialised in behind the scenes photography, documentary, fine art and studio photography.
      </h1>

      <svg className=" scale0 depth3 depth3Title titleText opacity-0 fixed left-10 bottom-0 w-[30vw] " viewBox="0 0 551 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text className=' ' fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="42.2727" letterSpacing="0em"><tspan x="0" y="230.472">I&#x2019;m a</tspan></text>
      </svg>
      <svg className=" scale0 depth1 depth1Title titleText opacity-0 fixed left-10 bottom-0 w-[30vw] " viewBox="0 0 551 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text className=' ' fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="87.8834" letterSpacing="0em"><tspan x="96" y="200.1653">photo</tspan></text>
      </svg>
      <svg className=" scale0 depth2 depth2Title titleText opacity-0 fixed left-10 bottom-0 w-[30vw] " viewBox="0 0 551 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text className=' ' fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="72.5438" letterSpacing="0em"><tspan x="285" y="219.051">grapher </tspan></text>
      </svg>

      <svg className=' scale0 depth2 depth3Title titleText opacity-0 fixed top-32 right-0 w-[30vw] -translate-y-1/4' viewBox="0 0 505 535" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text className='' fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="52.5204" letterSpacing="0em"><tspan x="0.0711212" y="107.722">My style is </tspan></text>
      </svg>
      <svg className=' scale0 depth3 depth1Title titleText opacity-0 fixed top-32 right-0 w-[30vw] -translate-y-1/4' viewBox="0 0 505 535" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text className='' fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="75" letterSpacing="0em"><tspan x="161.107" y="174.07">emotive </tspan></text>
      </svg>
      <svg className=' scale0 depth3 depth3Title titleText opacity-0 fixed top-32 right-0 w-[30vw] -translate-y-1/4' viewBox="0 0 505 535" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text className='' fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="47.3029" letterSpacing="0em"><tspan x="353.311" y="237.609">unique</tspan></text>
      </svg>
      <svg className=' scale0 depth1 depth2Title titleText opacity-0 fixed top-32 right-0 w-[30vw] -translate-y-1/4' viewBox="0 0 505 535" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text className='' fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="75" letterSpacing="0em"><tspan x="92.4258" y="257.07">&#38;</tspan></text>
      </svg>
      <svg className=' scale0 depth2 depth2Title titleText opacity-0 fixed top-32 right-0 w-[30vw] -translate-y-1/4' viewBox="0 0 505 535" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text className='' fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="84" letterSpacing="0em"><tspan x="187.109" y="284.604">exp</tspan></text>
      </svg>
      <svg className=' scale0 depth3 depth3Title titleText opacity-0 fixed top-32 right-0 w-[30vw] -translate-y-1/4' viewBox="0 0 505 535" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text className='' fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="54.1667" letterSpacing="0em"><tspan x="118.287" y="326.278">erim</tspan></text>
      </svg>
      <svg className=' scale0 depth1 depth1Title titleText opacity-0 fixed top-32 right-0 w-[30vw] -translate-y-1/4' viewBox="0 0 505 535" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text className='' fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="90.0862" letterSpacing="0em"><tspan x="238.206" y="362.472">ental</tspan></text>
      </svg>

      {/* </Parallax> */}
    </>
  )
}
