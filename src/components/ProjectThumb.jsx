import { useAppContext } from '@/utils/appContext'
import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import { gsap } from 'gsap'
import Link from 'next/link'

export default function ProjectThumb({ project, handleClick, handleMouseEnter, handleMouseLeave, index }) {
  const { locale } = useAppContext()
  let [hover, setHover] = useState(false)
  // let myRef = useRef(null)
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

  // function handleClick() {
  //   if (!click) { setClick(true); tween.play() } else { setClick(false); tween.reverse() }
  // }
  // console.log(project.mainImage)
  {/* <Link href={`/blog/${encodeURIComponent(post.slug)}`}> */ }

  return (
    <Link href={`./gallery/${project.slug.current}`}>
      <div  onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} onClick={handleClick}
        onMouseEnter={() => { setHover(true); handleMouseEnter(index) }}
        onMouseLeave={() => { setHover(false); handleMouseLeave(index) }}
        className={`relative cursor-pointer before:block before:pt-[100%] 
        card ${hover ? '' : 'inactiveCard'} index-${index} `}>
        <div className={`absolute top-0 left-0 w-full h-full ${hover ? 'inactiveCard' : ''}`}>
        </div>

        <div className='absolute w-full h-full top-0 left-0 flex items-end bg-black'>
          {/* to make an absolute  */}
          {/* <div className='absolute w-full h-full '>  */}
            <SanityImage sizes='(max-width: 700px) 33vw, 17vw' containerClass={'rounded-none'} fill absolute image={project.mainImage.image} alt={project.mainImage.alt[locale]} />
          {/* </div> */}
          <h2 className={`font-lora text-xl text-white invert-0  duration-500 ${hover ? 'opacity-100 delay-100' : 'opacity-0 '}`}>
            {project.title}
          </h2>
        </div>

      </div>
    </Link>

  )
}
