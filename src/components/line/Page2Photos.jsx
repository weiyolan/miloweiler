import React, { useEffect } from 'react'
import ArrowLink from '../ArrowLink'
import Image from 'next/image'
import Parallax from '../Parallax'
import gsap from 'gsap/dist/gsap'
import FadeDiv from '../FadeDiv'
// import { Observer } from 'gsap/dist/Observer'

export default function Page2Photos({ className, animateName }) {

  useEffect(() => {
    gsap.utils.toArray(".page2photos").forEach(photo => {
      let hover = gsap.to(photo, { scale: 1.05, duration: 0.2, paused: true, ease: "power1.inOut", overwrite:true});
      let click = gsap.to(photo, { scale: 1.02, duration: 0.1, paused: true, ease: "power1.inOut", overwrite:true});
      photo.addEventListener("mouseenter", () => hover.play());
      photo.addEventListener("mouseleave", () => hover.reverse());
      photo.addEventListener("mousedown", () => click.play());
      photo.addEventListener("mouseup", () => click.reverse());
    });
  }, [])

  return (
    <FadeDiv amount={10} className={'w-[90%] md:w-[75vw] overflow-hidden page2photosContainer fixed h-[20vh] left-1/2 -translate-x-1/2 top-2/3 md:top-1/2 -translate-y-1/2'} type='leftRight' >
      <div className={`flex w-[140vw] h-full page2photosContainerInner`}>
        <PageImage alt='' src='/images/page1photo11.jpg' className={``} style={{}} />
        <PageImage alt='' src='/images/page1photo2.jpg' className={``} style={{}} />
        <PageImage alt='' src='/images/page1photo10.jpg' className={``} style={{}} />
        <PageImage alt='' src='/images/page1photo4.jpg' className={``} style={{}} />
        <PageImage alt='' src='/images/page1photo6.jpg' className={``} style={{}} />
        <PageImage alt='' src='/images/page1photo5.jpg' className={``} style={{}} />
        <PageImage alt='' src='/images/page1photo.jpg' className={``} style={{}} />
        <PageImage alt='' src='/images/page1photo7.jpg' className={``} style={{}} />
        <PageImage alt='' src='/images/page1photo9.jpg' className={``} style={{}} />
        <PageImage alt='' src='/images/page1photo12.jpg' className={``} style={{}} />
        <PageImage alt='' src='/images/page1photo3.jpg' className={``} style={{}} />
        <PageImage alt='' src='/images/page1photo8.jpg' className={``} style={{}} />
      </div>
    </FadeDiv>
  )
}

function PageImage({ className, ...props }) {
  return (
    <div className={`relative flex-1 `}>
      <Image fill className={`select-none page2photos opacity-0 invisible  hover:cursor-pointer ${className} object-cover object-center`} sizes='(max-width: 640px) 50vw, 15vw' {...props} />
    </div>
  )
}
