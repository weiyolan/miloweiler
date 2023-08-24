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
    <Parallax xs duration={6.3} scope='btsPhotos' timeline={timeline} start='100% 100%' className={`page1photosContainer fixed w-full h-screen top-0 text-primary `}>
      <div className='page1photosContainerInner w-full h-full'>
        <Page1Image alt='' src='/images/page1photo6.jpg' width='265' height='366' className={`depth3btsPhotos  w-[calc(7.50vw+12vw)] xs:w-[calc(7.50vw+5vw)] md:w-[7.5vw] absolute left-[calc(40%+37%)] md:left-[40%] top-[calc(22lvh+5lvh)] md:top-[calc(22%+0%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo12.jpg' width='265' height='366' className={`depth3btsPhotos w-[calc(5.00vw+12vw)] xs:w-[calc(5.00vw+5vw)]   md:w-[5vw] absolute left-[calc(62%-8%)] md:left-[62%]  top-[calc(28lvh-3lvh)] md:top-[calc(28%+0%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo4.jpg' width='265' height='366' className={`depth2btsPhotos  w-[calc(7.50vw+12vw)] xs:w-[calc(7.50vw+5vw)] md:w-[7.5vw] absolute left-[calc(37%-5%)] md:left-[37%]  top-[calc(40lvh-7lvh)] md:top-[calc(40%+0%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo11.jpg' width='265' height='366' className={`depth1btsPhotos w-[calc(6.00vw+12vw)] xs:w-[calc(6.00vw+5vw)]   md:w-[6vw] absolute left-[calc(27%-10%)] md:left-[27%] top-[calc(37lvh+2lvh)] md:top-[calc(37%+0%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo8.jpg' width='265' height='366' className={`depth2btsPhotos  w-[calc(7.50vw+12vw)] xs:w-[calc(7.50vw+5vw)] md:w-[7.5vw] absolute left-[calc(67%+5%)] md:left-[67%]  top-[calc(37lvh+3lvh)] md:top-[calc(37%+0%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo5.jpg' width='265' height='366' className={`depth2btsPhotos  w-[calc(12.0vw+12vw)] xs:w-[calc(12.0vw+5vw)]  md:w-[12vw] absolute left-[calc(45%+20%)] md:left-[45%] top-[calc(55lvh-5lvh)] md:top-[calc(55%+0%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo2.jpg' width='265' height='366' className={`depth3btsPhotos  w-[calc(7.50vw+12vw)] xs:w-[calc(7.50vw+5vw)] md:w-[7.5vw] absolute left-[calc(33%-19%)] md:left-[33%] top-[calc(57lvh+0lvh)] md:top-[calc(57%+0%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo10.jpg' width='265' height='366' className={`depth2btsPhotos w-[calc(5.00vw+12vw)] xs:w-[calc(5.00vw+5vw)]   md:w-[5vw] absolute left-[calc(37%-30%)] md:left-[37%] top-[calc(78lvh+0lvh)] md:top-[calc(78%+0%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo.jpg' width='265' height='366' className={`depth1btsPhotos   w-[calc(10.0vw+12vw)] xs:w-[calc(10.0vw+5vw)]  md:w-[10vw] absolute left-[calc(50%+25%)] md:left-[50%] top-[calc(20lvh+40lvh)] md:top-[calc(20%+0%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo3.jpg' width='265' height='366' className={`depth3btsPhotos  w-[calc(6.00vw+12vw)] xs:w-[calc(6.00vw+5vw)]   md:w-[6vw] absolute left-[calc(66%-12%)] md:left-[66%] top-[calc(57lvh+12lvh)] md:top-[calc(57%+0%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo7.jpg' width='265' height='366' className={`depth3btsPhotos  w-[calc(5.00vw+12vw)] xs:w-[calc(5.00vw+5vw)]   md:w-[5vw] absolute left-[calc(30%-8%)] md:left-[30%]  top-[calc(70lvh+0lvh)] md:top-[calc(70%+0%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
        <Page1Image alt='' src='/images/page1photo9.jpg' width='265' height='366' className={`depth2btsPhotos  w-[calc(5.00vw+15vw)] xs:w-[calc(5.00vw+5vw)]   md:w-[5vw] absolute left-[calc(58%-0%)] md:left-[62%]  top-[calc(73lvh+6lvh)] md:top-[calc(73%+0%)]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
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