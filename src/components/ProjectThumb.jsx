import { useAppContext } from '@/utils/appContext'
import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import { gsap } from 'gsap'
import Link from 'next/link'

export default function ProjectThumb({ project, handleClick, index }) {
  const { locale } = useAppContext()
  let [hover, setHover] = useState(false)
  // let myRef = useRef(null)
  // const ctx = useRef();

  // useEffect(() => {
  //   ctx.current = gsap.context(() => { },); // nothing initially (we'll add() to the context when endX changes)
  //   return () => ctx.current.revert();
  // }, [ctx]);

  function handleMouseDown({ currentTarget }) {
    // ctx.current.add(() => {
    gsap.to(currentTarget, { scale: 0.95, duration: 0.5, ease: 'expo.out' })
    // })
  }
  function handleMouseUp({ currentTarget }) {
    // ctx.current.add(() => {
    gsap.to(currentTarget, { scale: 1.05, duration: 0.5, ease: 'expo.out' })
    // })
  }
  function handleMouseLeave({ currentTarget }) {
    // ctx.current.add(() => {
    gsap.to(currentTarget, { scale: 1.0, duration: 0.5, ease: 'expo.out' })
    // })
  }

  // function handleClick() {
  //   if (!click) { setClick(true); tween.play() } else { setClick(false); tween.reverse() }
  // }
  // console.log(project.mainImage)
  {/* <Link href={`/blog/${encodeURIComponent(post.slug)}`}> */ }

  return (
    <Link href={`./gallery/${project.slug.current}`}>
      <div
        onClick={handleClick}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseEnter={(target) => { setHover(true); handleMouseUp(target) }}
        onMouseLeave={(target) => { setHover(false); handleMouseLeave(target) }}
        className={`relative cursor-pointer before:block before:pt-[100%] card ${hover ? '' : 'inactiveCard'} index-${index} `}>

        <div className={`absolute top-0 left-0 w-full h-full ${hover ? 'inactiveCard' : ''}`}>
        </div>

        <div className='absolute w-full h-full top-0 left-0 flex items-end bg-black'>

          <SanityImage blur sizes='(max-width: 700px) 33vw, 17vw' containerClass={'rounded-none'} fill absolute image={project.mainImage.image} alt={project.mainImage.alt[locale]} />
          {/* {console.log(project.mainImage)} */}
          <div className={`absolute h-full w-full bg-black/30 backdrop-blur-sm duration-500 ${hover ? 'opacity-100' : 'opacity-0'}`}>
          </div>

          <h2 className={`font-lora text-xl  invert-0 p-4 duration-500 ${hover ? 'opacity-100 delay-100' : 'opacity-0 '}`}>
            {project.title}
          </h2>
        </div>

      </div>
    </Link>

  )
}
