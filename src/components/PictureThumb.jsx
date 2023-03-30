import { useAppContext } from '@/utils/appContext'
import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import { gsap } from 'gsap'
import Link from 'next/link'

export default function PictureThumb({ image, alt, handleClick, handleMouseEnter, handleMouseLeave, index }) {
  const { locale } = useAppContext()
  let [hover, setHover] = useState(false)
  const ctx = useRef();

  useEffect(() => {
    ctx.current = gsap.context(() => { }); // nothing initially (we'll add() to the context when endX changes)
    return () => ctx.current.revert();
  }, [ctx]);

  function handleMouseDown() {
    ctx.current.add(() => {
      gsap.to(`.index-${index}`, { scale: 0.95, duration: 0.5, ease: 'expo.out' })
    })
  }
  function handleMouseUp() {
    ctx.current.add(() => {
      gsap.to(`.index-${index}`, { scale: 1.05, duration: 0.5, ease: 'expo.out' })
    })
  }

  return (
    // <Link href={`./gallery/${project.slug.current}`}>
      <div  onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} onClick={handleClick}
        // onMouseEnter={() => { setHover(true); handleMouseEnter(index) }}
        // onMouseLeave={() => { setHover(false); handleMouseLeave(index) }}
        className={`relative w-48 cursor-pointer before:block before:pt-[100%] hover:scale-110 duration-300
        card ${hover ? '' : 'inactiveCard'} index-${index} `}>
        {/* <div className={`absolute top-0 left-0 w-full h-full ${hover ? 'inactiveCard' : ''}`}>
        </div> */}

        <div className='absolute w-full h-full top-0 left-0 flex items-end bg-black' >
            <SanityImage sizes='(max-width: 700px) 33vw, 17vw' containerClass={'rounded-none'} fill image={image} alt={alt} />
        </div>

      </div>
    // </Link>

  )
}
