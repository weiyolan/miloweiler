import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Parallax from '@/components/Parallax'
gsap.registerPlugin(ScrollTrigger)

export default function StoryTitle({ scrubTl, shadow, ctx }) {
  // let ctx = useRef(gsap.context(() => { }))

  // useEffect(() => {
  //   return () => ctx.current.revert()
  // }, [])s

  // let durationAppear = 2;
  // let stagger = 0.3;

  // useEffect(() => {
  //   ctx.current.add(() => {
  //     // WIGGELS && WOBBLES
  //     gsap.to(['.depth3Title'], {
  //       id: 'titleTextTween',
  //       x: '3px',
  //       stagger: {
  //         each: 2 / 3,
  //         yoyo: true,
  //         repeat: -1,
  //       },
  //       ease: 'power2.inOut',
  //       duration: 3,
  //     }, 1)
  //     gsap.to(['.depth3TitleInner'], {
  //       id: 'titleTextTween',
  //       y: '3px',
  //       stagger: {
  //         each: 2 / 3,
  //         yoyo: true,
  //         repeat: -1,
  //       },
  //       ease: 'power2.inOut',
  //       duration: 3,
  //     }, 0)
  //     gsap.to(['.depth2Title'], {
  //       id: 'titleTextTween',
  //       x: '5px',
  //       stagger: {
  //         each: 0.75,
  //         yoyo: true,
  //         repeat: -1,
  //       },
  //       ease: 'power2.inOut',
  //       duration: 2,
  //     }, 1.2)
  //     gsap.to(['.depth2TitleInner'], {
  //       id: 'titleTextTween',
  //       y: '-3px',
  //       stagger: {
  //         each: 0.75,
  //         yoyo: true,
  //         repeat: -1,
  //       },
  //       ease: 'power2.inOut',
  //       duration: 2,
  //     }, 0.8)
  //     gsap.to(['.depth1Title'], {
  //       id: 'titleTextTween',
  //       x: '8px',
  //       stagger: {
  //         each: 1.2,
  //         yoyo: true,
  //         repeat: -1,
  //       },
  //       ease: 'power2.inOut',
  //       duration: 3,
  //     }, 0)
  //     gsap.to(['.depth1TitleInner'], {
  //       id: 'titleTextTween',
  //       y: '4px',
  //       stagger: {
  //         each: 1.2,
  //         yoyo: true,
  //         repeat: -1,
  //       },
  //       ease: 'power2.inOut',
  //       duration: 3,
  //     }, 0.5)

  //   })
  // }, [])

  return (
    <div style={{transform:'translate3d(0,0,0)'}} className='w-full h-screen  titleContainer fixed'>
      <Parallax xs scope={'Title'} timeline={scrubTl} duration={1} className={`titleContainerInner w-full h-full relative`}>
        <h1 className='font-lora text-6xl text-primary absolute left-16 bottom-24 scale-150 hidden'>
          I am a Photographer specialised in behind the scenes, documentary, fine art and studio photography.
        </h1>
        <svg className={`select-none scale0 depth3 depth3Title titleText opacity-0 titleText1  absolute left-[5%] bottom-[10%] w-[30vw] `} viewBox="0 0 551 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g className='depth3TitleInner rotate-[0.0001deg]'>
            <text className={`${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="42.2727" letterSpacing="0em"><tspan x="0" y="230.472">I&#x2019;m a</tspan></text>
          </g>
        </svg>
        <svg className={`select-none shadow-primary scale0 depth1 depth1Title titleText opacity-0 titleText1  absolute left-[5%] bottom-[10%] w-[30vw] `} viewBox="0 0 551 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g className=' depth1TitleInner rotate-[0.0001deg]'>
            <text className={`${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="87.8834" letterSpacing="0em"><tspan x="96" y="180.1653">photo</tspan></text>
          </g>
        </svg>
        <svg className={`select-none scale0 depth2 depth2Title titleText opacity-0 titleText1  absolute left-[5%] bottom-[10%] w-[30vw] `} viewBox="0 0 551 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g className='depth2TitleInner rotate-[0.0001deg]'>
            <text className={`${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="72.5438" letterSpacing="0em"><tspan x="285" y="219.051">grapher </tspan></text>
          </g>
        </svg>
        <svg className={`select-none scale0 depth2 depth3Title titleText opacity-0 titleText2  absolute top-[10%] right-[5%] w-[30vw]`} viewBox="0 0 505 535" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g className='depth3TitleInner rotate-[0.0001deg]'>
            <text className={`${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="52.5204" letterSpacing="0em"><tspan x="20.0711212" y="107.722">My style is </tspan></text>
          </g>
        </svg>
        <svg className={`select-none scale0 depth3 depth1Title titleText opacity-0 titleText2  absolute top-[10%] right-[5%] w-[30vw]`} viewBox="0 0 505 535" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g className='depth1TitleInner rotate-[0.0001deg]'>
            <text className={`${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="75" letterSpacing="0em"><tspan x="161.107" y="174.07">emotive </tspan></text>
          </g>
        </svg>
        <svg className={`select-none scale0 depth3 depth3Title titleText opacity-0 titleText2  absolute top-[10%] right-[5%] w-[30vw]`} viewBox="0 0 505 535" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g className='depth3TitleInner rotate-[0.0001deg]'>
            <text className={`${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="47.3029" letterSpacing="0em"><tspan x="353.311" y="237.609">unique</tspan></text>
          </g>
        </svg>
        <svg className={`select-none scale0 depth1 depth2Title titleText opacity-0 titleText2  absolute top-[10%] right-[5%] w-[30vw]`} viewBox="0 0 505 535" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g className='depth2TitleInner rotate-[0.0001deg]'>
            <text className={`${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="75" letterSpacing="0em"><tspan x="92.4258" y="257.07">&#38;</tspan></text>
          </g>
        </svg>
        <svg className={`select-none scale0 depth2 depth2Title titleText opacity-0 titleText2  absolute top-[10%] right-[5%] w-[30vw]`} viewBox="0 0 505 535" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g className='depth2TitleInner rotate-[0.0001deg]'>
            <text className={`${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="76" letterSpacing="0em"><tspan x="187.109" y="284.604">exp</tspan></text>
          </g>
        </svg>
        <svg className={`select-none scale0 depth3 depth3Title titleText opacity-0 titleText2 absolute top-[10%] right-[5%] w-[30vw]`} viewBox="0 0 505 535" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g className='depth3TitleInner rotate-[0.0001deg]'>
            <text className={`${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="50" letterSpacing="0em"><tspan x="118.287" y="326.278">erim</tspan></text>
          </g>
        </svg>
        <svg className={`select-none scale0 depth1 depth1Title titleText opacity-0 titleText2 absolute top-[10%] right-[5%] w-[30vw]`} viewBox="0 0 505 535" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g className='depth1TitleInner rotate-[0.0001deg]'>
            <text className={`${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="90.0862" letterSpacing="0em"><tspan x="238.206" y="362.472">ental</tspan></text>
          </g>
        </svg>
      </Parallax>
    </div>
  )
}
