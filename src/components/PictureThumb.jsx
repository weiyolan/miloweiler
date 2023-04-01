import { useAppContext } from '@/utils/appContext'
import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import { gsap } from 'gsap'
// import Link from 'next/link'

export default function PictureThumb({ image, alt, handleClick, handleMouseEnter, handleMouseLeave, index }) {
  const { locale } = useAppContext()

  function mouseUp({ currentTarget }) {
    gsap.to(currentTarget, {
      scale: 1.02, duration: 0.5,
      ease: 'expo.out'
    });
  }
  function mouseDown({ currentTarget }) {
    gsap.to(currentTarget, { scale: 0.95, duration: 0.5, ease: 'expo.out' })
  }
  function mouseEnter({ currentTarget }) {
    gsap.to(currentTarget, { scale: 1.02, duration: 0.5, ease: 'expo.out' });
  }
  function mouseLeave({ currentTarget }) {
    gsap.to(currentTarget, { scale: 1, duration: 0.5, ease: 'expo.out' });
  }

  return (
    // <Link href={`./gallery/${project.slug.current}`}>
    <div className={`relative select-none cursor-pointer before:block before:pt-[100%]`}
      onClick={handleClick}
      onMouseUp={mouseUp}
      onMouseDown={mouseDown}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}>
      <div className='absolute w-full h-full top-0 left-0  '  >
        <SanityImage blur sizes='(max-width: 700px) 20vw, 15vw'  fill containerClass={'rounded-none '}  image={image} alt={alt} />
      </div>
    </div>
    // </Link>

  )
}
