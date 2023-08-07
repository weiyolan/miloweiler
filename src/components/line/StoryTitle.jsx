import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Parallax from '@/components/Parallax'
import { usePageContext } from '@/utils/pageContext'
gsap.registerPlugin(ScrollTrigger)

export default function StoryTitle({ scrubTl, shadow, ctx }) {

  useEffect(() => {
    ctx.current.add(() => {
      // WIGGELS && WOBBLES
      gsap.to(['.depth3Title'], {
        x: '+=5px',
        stagger: {
          each: 2 / 3,
          yoyo: true,
          repeat: -1,
        },
        ease: 'power2.inOut',
        duration: 3,
      }, 1)
      gsap.to(['.depth3TitleInner'], {
        y: '+=5px',
        stagger: {
          each: 2 / 3,
          yoyo: true,
          repeat: -1,
        },
        ease: 'power2.inOut',
        duration: 3,
      }, 0)
      gsap.to(['.depth2Title'], {
        x: '+=8px',
        stagger: {
          each: 0.75,
          yoyo: true,
          repeat: -1,
        },
        ease: 'power2.inOut',
        duration: 2,
      }, 1.2)
      gsap.to(['.depth2TitleInner'], {
        y: '-=8px',
        stagger: {
          each: 0.75,
          yoyo: true,
          repeat: -1,
        },
        ease: 'power2.inOut',
        duration: 2,
      }, 0.8)
      gsap.to(['.depth1Title'], {
        x: '+=10px',
        stagger: {
          each: 1.2,
          yoyo: true,
          repeat: -1,
        },
        ease: 'power2.inOut',
        duration: 3,
      }, 0)
      gsap.to(['.depth1TitleInner'], {
        y: '+=10px',
        stagger: {
          each: 1.2,
          yoyo: true,
          repeat: -1,
        },
        ease: 'power2.inOut',
        duration: 3,
      }, 0.5)
    })
  }, [])



  return (
    <div style={{ transform: 'translate3d(0,0,0)' }} className='w-full h-screen  titleContainer fixed'>
      <Parallax xs scope={'Title'} timeline={scrubTl} duration={1} className={`titleContainerInner w-full h-full relative`}>
        <h1 className='font-lora text-6xl text-primary absolute left-16 bottom-24 scale-150 hidden'>
          I am a Photographer specialised in behind the scenes, documentary, fine art and studio photography.
        </h1>

        <svg className={`rotate-[0.0001deg] absolute top-[12%] md:top-[10%] right-[-1%] w-[60%] md:w-[30vw]`} viewBox="0 0 505 535" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Text className={'cursor-default depth2 depth3Title titleText opacity-0 titleText2 scale-90'} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="52.5204" letterSpacing="0em">
            <tspan className={`depth3TitleInner ${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="40.0711212" y="107.722">
              My style is
            </tspan>
          </Text>
          <Text className={'cursor-default depth3 depth1Title titleText opacity-0 titleText2 scale-90'} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="75" letterSpacing="0em">
            <tspan className={`depth1TitleInner ${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="161.107" y="174.07">
              emotive
            </tspan>
          </Text>
          <Text className={'cursor-default depth3 depth3Title titleText opacity-0 titleText2 scale-90'} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="47.3029" letterSpacing="0em">
            <tspan className={`depth3TitleInner ${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="353.311" y="237.609">
              unique
            </tspan>
          </Text>
          <Text className={'cursor-default depth1 depth2Title titleText opacity-0 titleText2 scale-90'} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="75" letterSpacing="0em">
            <tspan className={`depth2TitleInner ${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="92.4258" y="257.07">
              &#38;
            </tspan>
          </Text>
          <Text className={'cursor-default depth2 depth2Title titleText opacity-0 titleText2 scale-90'} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="76" letterSpacing="0em">
            <tspan className={`depth2TitleInner ${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="187.109" y="284.604">
              exp
            </tspan>
          </Text>
          <Text className={'cursor-default depth3 depth3Title titleText opacity-0 titleText2 scale-90'} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="50" letterSpacing="0em">
            <tspan className={`depth3TitleInner ${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="118.287" y="326.278">
              erim
            </tspan>
          </Text>
          <Text className={'cursor-default depth1 depth1Title titleText opacity-0 titleText2 scale-90'} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="90.0862" letterSpacing="0em">
            <tspan className={`depth1TitleInner ${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="238.206" y="362.472">
              ental
            </tspan>
          </Text>
        </svg>

        <svg className={`rotate-[0.0001deg] absolute left-[10%] bottom-[15%] md:bottom-[10%] w-[60%] md:w-[30vw] `} viewBox="0 0 551 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Text className={`cursor-default depth3 depth3Title titleText opacity-0 titleText1 scale-90`} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="42.2727" letterSpacing="0em">
            <tspan className={`depth3TitleInner ${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="0" y="230.472">
              I&#x2019;m a
            </tspan>
          </Text>
          <Text className={`cursor-default depth1 depth1Title titleText  opacity-0 titleText1 scale-90`} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="87.8834" letterSpacing="0em">
            <tspan className={`depth1TitleInner ${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="96" y="180.1653">
              photo
            </tspan>
          </Text>
          <Text className={`cursor-default depth2 depth2Title titleText opacity-0 titleText1 scale-90`} fill="#FFF5EA" style={{ whiteSpace: "pre" }} fontFamily="Lora" fontSize="72.5438" letterSpacing="0em">
            <tspan className={`depth2TitleInner ${shadow ? 'drop-shadow-[0_0px_20px_#FFF5EAFF] ' : ''}`} x="285" y="219.051">
              grapher
            </tspan>
          </Text>
        </svg>
      </Parallax>
    </div>
  )
}


function Text(props) {
  let myText = useRef(null)
  let ctx = useRef(gsap.context(() => { }))
  let {mobile} = usePageContext()
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


  return (
    <text ref={myText} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} {...props} />
    // </text>
  )

}