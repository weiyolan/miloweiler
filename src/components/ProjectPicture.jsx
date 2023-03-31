import { useAppContext } from '@/utils/appContext'
import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import { gsap } from 'gsap'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import PictureIndicator from './PictureIndicator'
// import Link from 'next/link'

export default function ProjectPicture({ images, visibleItem, handleVisibility, nextVisibility, prevVisibility, index }) {
  const { locale } = useAppContext()
  // function mouseUp({ currentTarget }) {
  //   gsap.to(currentTarget, {
  //     scale: 1.05, duration: 0.2,
  //     ease: 'power4.out'
  //   });
  // }
  // function mouseDown({ currentTarget }) {
  //   gsap.to(currentTarget, { scale: 0.95, duration: 0.5, ease: 'expo.out' })
  // }
  // function mouseEnter({ currentTarget }) {
  //   gsap.to(currentTarget, { scale: 1.05, duration: 0.5, ease: 'expo.out' });
  // }
  // function mouseLeave({ currentTarget }) {
  //   gsap.to(currentTarget, { scale: 1, duration: 0.5, ease: 'expo.out' });
  // }

  return (
    // <Link href={`./gallery/${project.slug.current}`}>
    <div className={`relative w-[55%] h-[calc(100%-80px)] flex overflow-visible justify-between items-center px-16 select-none`}
    // onMouseUp={mouseUp}
    // onMouseDown={mouseDown}
    // onMouseEnter={mouseEnter}
    // onMouseLeave={mouseLeave}
    >
      <AiFillCaretLeft key={'left'} onClick={prevVisibility} className='relative w-10 h-3/5 drop-shadow-xl cursor-pointer px-2.5 z-[1] ' />
      <PictureIndicator handleVisibility={handleVisibility} visibleItem={visibleItem}/>
      {images.map((image, i) => <MainPicture key={i} visible={visibleItem[i]} image={image} alt={`Project image ${i}`} prevVisibility={prevVisibility} nextVisibility={nextVisibility} />)}
      <AiFillCaretRight key={'right'} onClick={nextVisibility} className='relative w-10 h-3/5 drop-shadow-xl cursor-pointer px-2.5 z-[1]' />
    </div>
    // </Link>
  )
}

function MainPicture({ visible, image, alt, prevVisibility, nextVisibility }) {
  return (
    // border border-red-700
    <div className={`absolute flex items-center justify-center max-w-[700px] w-[45vw] h-[550px]  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${visible ? '' : 'invisible'}`}>
      {/* // <div className={`absolute inline-flex    max-w-[700px] w-[45vw] h-[550px] border border-red-700 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${visible ? '' : 'invisible'}`}> */}
      {/* <SanityImage style={{  }} className={' mx-auto rounded-2xl align-middle'} image={image} alt={alt} /> */}
      <SanityImage style={{ objectFit: 'contain' }} className={' shadow-2xl '} image={image} alt={alt} />
    </div>
  )
}