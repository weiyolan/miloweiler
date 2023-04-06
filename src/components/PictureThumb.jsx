import { useAppContext } from '@/utils/appContext'
import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import { gsap } from 'gsap'
import { usePageContext } from '@/utils/pageContext'
// import Link from 'next/link'

export default function PictureThumb({ image, alt, row, visible, handleClick, handleMouseEnter, handleMouseLeave, index, className }) {
  const { locale } = useAppContext()
  const { palette } = usePageContext()
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
    <div style={{ borderColor: visible ? palette.darkMuted.background : 'transparent' }}
      className={`picture-thumb relative select-none cursor-pointer  border-[3px] ${visible ? '' : ''} border-spacing-2 border-transparent before:block before:w-20 before:md:w-full ${row ? '' : ''} before:pt-[100%] ${className ? className : ''}`}
      onClick={handleClick}
      onMouseUp={mouseUp}
      onMouseDown={mouseDown}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}>
      <div className='absolute w-full h-full top-0 left-0  '  >
        <SanityImage print={!index ? true : false} blur sizes='(max-width: 700px) 20vw, 13vw' fill containerClass={'rounded-none '} image={image} alt={alt} />
      </div>
    </div>
    // </Link>

  )
}
