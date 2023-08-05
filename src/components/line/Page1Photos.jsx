import React, { useEffect } from 'react'
// import ArrowLink from '../ArrowLink'
import Image from 'next/image'
import Parallax from '../Parallax'
import gsap from 'gsap/dist/gsap'
// import { Observer } from 'gsap/dist/Observer'

export default function Page1Photos({ animateName, timeline }) {

  useEffect(() => {
    gsap.utils.toArray(".page1photos").forEach(photo => {
      let hover = gsap.to(photo, { scale: 1.15, duration: 0.2, paused: true, ease: "power1.inOut", overwrite: true });
      let click = gsap.to(photo, { scale: 1.05, duration: 0.1, paused: true, ease: "power1.inOut", overwrite: true });
      photo.addEventListener("mouseenter", () => hover.play());
      photo.addEventListener("mouseleave", () => hover.reverse());
      photo.addEventListener("mousedown", () => click.play());
      photo.addEventListener("mouseup", () => click.reverse());
    });
  }, [])

  return (
    // <>
    <Parallax xs duration={3.3} scope='btsPhotos' timeline={timeline} start='100% 100%' className={`page1photosContainer fixed w-full h-screen top-0 text-primary `}>
      <div className='page1photosContainerInner w-full h-full'>
        <Page1Image alt='' src='/images/page1photo11.jpg' width='265' height='366' className={`depth1btsPhotos w-[6vw] absolute left-[27%] top-[calc(37%+3%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo2.jpg' width='265' height='366' className={`depth3btsPhotos  w-[7.5vw] absolute left-[33%] top-[calc(57%+3%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo10.jpg' width='265' height='366' className={`depth2btsPhotos w-[5vw] absolute left-[37%] top-[calc(78%+3%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo4.jpg' width='265' height='366' className={`depth2btsPhotos  w-[7.5vw] absolute left-[37%] top-[calc(40%+3%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo6.jpg' width='265' height='366' className={`depth3btsPhotos  w-[7.5vw] absolute left-[40%] top-[calc(22%+3%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo5.jpg' width='265' height='366' className={`depth2btsPhotos  w-[12vw] absolute left-[45%] top-[calc(55%+3%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo.jpg' width='265' height='366' className={`depth1btsPhotos   w-[10vw] absolute left-[50%] top-[calc(20%+3%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo7.jpg' width='265' height='366' className={`depth3btsPhotos  w-[5vw] absolute left-[30%] top-[calc(70%+3%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo9.jpg' width='265' height='366' className={`depth2btsPhotos  w-[5vw] absolute left-[62%] top-[calc(73%+3%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo12.jpg' width='265' height='366' className={`depth3btsPhotos w-[5vw] absolute left-[62%] top-[calc(28%+3%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo3.jpg' width='265' height='366' className={`depth3btsPhotos  w-[6vw] absolute left-[66%] top-[calc(57%+3%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo8.jpg' width='265' height='366' className={`depth2btsPhotos  w-[7.5vw] absolute left-[67%] top-[calc(37%+3%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
      </div>
      {/* </> */}
    </Parallax >
  )
}

function Page1Image({ className, ...props }) {
//drop-shadow-2xl
  return (
    <div className={`select-none page1photos invisible opacity-0  ${className}`}> 
      <Image className={` hover:cursor-pointer page1photosInner w-full h-full`} {...props} />
    </div>
  )
}