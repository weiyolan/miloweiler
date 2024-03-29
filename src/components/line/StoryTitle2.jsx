import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Parallax from '@/components/Parallax'
import { usePageContext } from '@/utils/pageContext'
import { useAppContext } from '@/utils/appContext'
gsap.registerPlugin(ScrollTrigger)

export default function StoryTitle2({ scrubTl, shadow, ctx }) {
  let { locale } = useAppContext()
  // useEffect(() => {
  // ctx.current.add(() => {
  //  // WIGGELS && WOBBLES
  //   gsap.to(['.depth3Title'], {
  //     x: '+=5px',
  //     stagger: {
  //       each: 2 / 3,
  //       yoyo: true,
  //       repeat: -1,
  //     },
  //     ease: 'power2.inOut',
  //     duration: 3,
  //   }, 1)
  //   gsap.to(['.depth3TitleInner'], {
  //     y: '+=5px',
  //     stagger: {
  //       each: 2 / 3,
  //       yoyo: true,
  //       repeat: -1,
  //     },
  //     ease: 'power2.inOut',
  //     duration: 3,
  //   }, 0)
  //   gsap.to(['.depth2Title'], {
  //     x: '+=8px',
  //     stagger: {
  //       each: 0.75,
  //       yoyo: true,
  //       repeat: -1,
  //     },
  //     ease: 'power2.inOut',
  //     duration: 2,
  //   }, 1.2)
  //   gsap.to(['.depth2TitleInner'], {
  //     y: '+=8px',
  //     stagger: {
  //       each: 0.75,
  //       yoyo: true,
  //       repeat: -1,
  //     },
  //     ease: 'power2.inOut',
  //     duration: 2,
  //   }, 0.8)
  //   gsap.to(['.depth1Title'], {
  //     x: '+=10px',
  //     stagger: {
  //       each: 1.2,
  //       yoyo: true,
  //       repeat: -1,
  //     },
  //     ease: 'power2.inOut',
  //     duration: 3,
  //   }, 0)
  //   gsap.to(['.depth1TitleInner'], {
  //     y: '-=10px',
  //     stagger: {
  //       each: 1.2,
  //       yoyo: true,
  //       repeat: -1,
  //     },
  //     ease: 'power2.inOut',
  //     duration: 3,
  //   }, 0.5)
  // })
  // }, [])



  return (
    <div style={{ transform: 'translate3d(0,0,0)' }} className='w-full h-screen top-0 titleContainer fixed'>
      <Parallax xs scope={'Title'} timeline={scrubTl} duration={1} className={`titleContainerInner w-full h-full relative`}>
        <h1 className='font-lora text-6xl text-primary absolute left-16 bottom-24 scale-150 hidden'>
          I am a Photographer specialised in set photography and portraits.
        </h1>

        <p className='text-primary max-w-prose absolute text-center top-[80%] left-1/2 titleText titleText2 opacity-0 -translate-x-1/2 -translate-y-1/2 '>{locale === 'en' ? "Scroll down and I'll carry you through my photography journey, bringing you through four magical chapters." : "Défilez et je vous accompagnerai tout au long de mon voyage photographique, à travers quatre chapitres magiques."}</p>

        {/* <svg className={`rotate-[0.0001deg] absolute top-[12%] md:top-[10%] right-[-1%] md:right-[2%] w-[60%] md:w-[30vw]`} viewBox="0 0 505 535" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
        {/* <Text animationName='depth3Title' className={'cursor-default font-lora depth2  titleText opacity-0 titleText2 scale-90'} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontSize="52.5204" letterSpacing="0em">
            <tspan className={`${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="40.0711212" y="107.722">
              {locale === 'en' ? 'My style is' : 'Mon style est'}
            </tspan>
          </Text>
          <Text animationName='depth1Title' className={'cursor-default font-lora depth3  titleText opacity-0 titleText2 scale-90'} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontSize="75" letterSpacing="0em">
            <tspan className={`${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="161.107" y="174.07">
              {locale === 'en' ? 'emotive' : 'sensible'}
            </tspan>
          </Text>
          <Text animationName='depth3Title' className={'cursor-default font-lora depth3  titleText opacity-0 titleText2 scale-90'} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontSize="47.3029" letterSpacing="0em">
            <tspan className={`${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="353.311" y="237.609">
              unique
            </tspan>
          </Text>
          <Text animationName='depth2Title' className={'cursor-default font-lora depth1  titleText opacity-0 titleText2 scale-90'} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontSize="75" letterSpacing="0em">
            <tspan className={`${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="92.4258" y="257.07">
              &#38;
            </tspan>
          </Text>
          <Text animationName='depth2Title' className={'cursor-default font-lora depth2  titleText opacity-0 titleText2 scale-90'} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontSize="76" letterSpacing="0em">
            <tspan className={`${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="187.109" y="284.604">
              exp
            </tspan>
          </Text>
          <Text animationName='depth3Title' className={'cursor-default font-lora depth3  titleText opacity-0 titleText2 scale-90'} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontSize="50" letterSpacing="0em">
            <tspan className={`${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="118.287" y="326.278">
              erim
            </tspan>
          </Text>
          <Text animationName='depth1Title' className={'cursor-default font-lora depth1  titleText opacity-0 titleText2 scale-90'} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontSize="90.0862" letterSpacing="0em">
            <tspan className={`${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="238.206" y="362.472">
              ental
            </tspan>
          </Text> */}
        {/* </svg> */}

        {/* <svg className={`rotate-[0.0001deg] absolute left-[10%] bottom-[15%] md:left-[6%] md:bottom-[10%] w-[60%] md:w-[30vw] `} viewBox="0 0 551 300" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
        {/* <Text animationName="depth3Title" className={`cursor-default font-lora depth3 titleText opacity-0 titleText1 scale-90`} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontSize="42.2727" letterSpacing="0em">
            <tspan className={` ${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x={locale === 'fr' ? '10' : "0"} y="230.472">
              {locale === 'fr' ? 'J' : 'I'}
              &#x2019;
              {locale === 'fr' && 'suis'}
              {locale === 'en' && 'm a'}
            </tspan>
          </Text>
          <Text animationName="depth1Title" className={`cursor-default font-lora depth1 titleText  opacity-0 titleText1 scale-90`} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontSize="87.8834" letterSpacing="0em">
            <tspan className={` ${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="96" y="180.1653">
              photo
            </tspan>
          </Text>
          <Text animationName="depth2Title" className={`cursor-default font-lora depth2 titleText opacity-0 titleText1 scale-90`} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontSize="72.5438" letterSpacing="0em">
            <tspan className={` ${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="285" y="219.051">
              {locale === 'fr' ? 'graphe' : `grapher`}

            </tspan>
          </Text> */}
        {/* </svg> */}
      </Parallax>
    </div>
  )
}


function Text({ animationName, className, ...props }) {
  let myText = useRef(null)
  let ctx = useRef(gsap.context(() => { }))
  let { mobile } = usePageContext()
  let [hovering, setHovering] = useState(false)
  useEffect(() => { return () => ctx.current.revert() }, [])

  useEffect(() => {
    ctx.current.add(() => {
      gsap.to(myText.current, {
        scale: hovering ? mobile ? 1.1 : 1.05 : 1,
        duration: 0.2,
        ease: 'power2.out',
        transformOrigin: '50% 50%',
      })
    })
  }, [hovering])


  return (<g className={`${animationName}Inner`}>
    <text ref={myText} className={`${className} ${animationName}`} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} {...props} />
  </g>
    // </text>
  )

}