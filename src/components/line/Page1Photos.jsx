import React from 'react'
import ArrowLink from '../ArrowLink'
import Image from 'next/image'
import Parallax from '../Parallax'

export default function Page1Photos({ className, animateName }) {

  return (
    // <>
    <Parallax scope='btsPhotos'  start='100% 10%' className={` fixed w-screen h-screen top-0 text-primary ${className ? className : ''}`}>
      <Image alt='' priority src='/images/page1photo11.jpg' width='265' height='366' className={`scale0 depth1 page1photos hover:cursor-pointer opacity-0 w-[6vw] absolute left-[27%] top-[37%]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
      <Image alt='' priority src='/images/page1photo2.jpg' width='265' height='366' className={`scale0 depth3 page1photos hover:cursor-pointer opacity-0 w-[7.5vw] absolute left-[33%] top-[57%]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
      <Image alt='' priority src='/images/page1photo10.jpg' width='265' height='366' className={`scale0 depth2 page1photos hover:cursor-pointer opacity-0 w-[5vw] absolute left-[37%] top-[78%]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
      <Image alt='' priority src='/images/page1photo4.jpg' width='265' height='366' className={`scale0 depth2 page1photos hover:cursor-pointer opacity-0 w-[7.5vw] absolute left-[37%] top-[40%]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
      <Image alt='' priority src='/images/page1photo6.jpg' width='265' height='366' className={`scale0 depth3 page1photos hover:cursor-pointer opacity-0 w-[7.5vw] absolute left-[40%] top-[22%]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
      <Image alt='' priority src='/images/page1photo5.jpg' width='265' height='366' className={`scale0 depth2 page1photos hover:cursor-pointer opacity-0 w-[12vw] absolute left-[45%] top-[60%]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
      <Image alt='' priority src='/images/page1photo.jpg' width='265' height='366' className={`scale0 depth1 page1photos hover:cursor-pointer opacity-0 w-[10vw] absolute left-[50%] top-[25%]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
      <Image alt='' priority src='/images/page1photo7.jpg' width='265' height='366' className={`scale0 depth3 page1photos hover:cursor-pointer opacity-0 w-[5vw] absolute left-[30%] top-[70%]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
      <Image alt='' priority src='/images/page1photo9.jpg' width='265' height='366' className={`scale0 depth2 page1photos hover:cursor-pointer opacity-0 w-[5vw] absolute left-[62%] top-[73%]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
      <Image alt='' priority src='/images/page1photo12.jpg' width='265' height='366' className={`scale0 depth3 page1photos hover:cursor-pointer opacity-0 w-[5vw] absolute left-[62%] top-[28%]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
      <Image alt='' priority src='/images/page1photo3.jpg' width='265' height='366' className={`scale0 depth3 page1photos hover:cursor-pointer opacity-0 w-[6vw] absolute left-[66%] top-[57%]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />
      <Image alt='' priority src='/images/page1photo8.jpg' width='265' height='366' className={`scale0 depth2 page1photos hover:cursor-pointer opacity-0 w-[7.5vw] absolute left-[67%] top-[37%]`} style={{}} sizes='(max-width: 648px) 20vw, 10vw' />

      {/* </> */}
    </Parallax >
  )
}
