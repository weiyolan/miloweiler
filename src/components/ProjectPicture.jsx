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
    <div className={`relative w-full md:w-[70%] h-4/5 md:h-[calc(100%-80px)] flex overflow-visible justify-between items-center px-4 md:px-14 select-none`}
    // onMouseUp={mouseUp}
    // onMouseDown={mouseDown}
    // onMouseEnter={mouseEnter}
    // onMouseLeave={mouseLeave}
    >
      {images.map((image, i) => <MainPicture key={i} visible={visibleItem[i]} image={image} alt={`Project image ${i}`} prevVisibility={prevVisibility} nextVisibility={nextVisibility} />)}
      <PictureIndicator handleVisibility={handleVisibility} visibleItem={visibleItem} />
      
      {/* LEFT WITH ARROW */}
      {/* <div className='border border-red-600 h-2/5 flex items-center cursor-pointer w-1/2 h-full md:px-2.5 z-[1]'
        onClick={prevVisibility}>
        <AiFillCaretLeft className='relative drop-shadow-xl  w-full  ' />
      </div> */}
      {/* ========================= */}
      {/* LEFT */}
      {/* <div className=' flex items-center cursor-pointer w-1/2 h-4/5  z-[1]'
        onClick={prevVisibility}>
      </div>
      RIGHT
      <div className=' flex items-center cursor-pointer w-1/2 h-4/5  z-[1]'
        onClick={nextVisibility}>
      </div> */}
      {/* ========================= */}
      {/* RIGHT WITH ARROW */}
      {/* <div className=' relative border border-red-600 h-2/5 flex items-center cursor-pointer w-1/2 h-full md:px-2.5 z-[1]'
        onClick={nextVisibility}>
        <AiFillCaretRight className='relative drop-shadow-xl  w-full ' />
      </div> */}

    </div>
    // </Link>
  )
}

function MainPicture({ visible, image, alt, prevVisibility, nextVisibility }) {
  return (
    // border border-red-700
    <div className={`absolute flex items-center justify-center max-w-[700px] w-[80vw] md:w-[55vw] h-[350px] md:h-[550px]  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${visible ? '' : 'hidden'}`}>
      {/* // <div className={`absolute inline-flex    max-w-[700px] w-[45vw] h-[550px] border border-red-700 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${visible ? '' : 'invisible'}`}> */}
      {/* <SanityImage style={{  }} className={' mx-auto rounded-2xl align-middle'} image={image} alt={alt} /> */}
      <SanityImage sizes='(max-width: 700px) 100vw, (max-width: 1500px) 50vw, 33vw' style={{ objectFit: 'contain' }} className={' shadow-2xl '} image={image} alt={alt} />
      <div className=' absolute left-0 flex items-center cursor-pointer w-1/2 h-[90%] mb-[0%]  z-[1]'
        onClick={prevVisibility}>
      </div>
      <div className='absolute right-0 flex items-center cursor-pointer w-1/2 h-[90%] mb-[0%]  z-[1]'
        onClick={nextVisibility}>
      </div>
    </div>
  )
}