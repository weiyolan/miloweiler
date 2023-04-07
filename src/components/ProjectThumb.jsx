import { useAppContext } from '@/utils/appContext'
import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import { gsap } from 'gsap'
import Link from 'next/link'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
export default function ProjectThumb({ project, handleClick, index }) {
  const { locale } = useAppContext()
  let [hover, setHover] = useState(false)
  let [loaded,setLoaded] = useState(false)
  let projectThumb =useRef(null)
  const {width} = useAppContext()
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
    gsap.to(currentTarget, { scale: 1.02, duration: 0.5, ease: 'expo.out' })
    // })
  }
  function handleMouseLeave({ currentTarget }) {
    // ctx.current.add(() => {
    gsap.to(currentTarget, { scale: 1.0, duration: 0.5, ease: 'expo.out' })
    // })
  }


  useEffect(() => {
    function onLoad() {
      if (loaded) {
        let tween = gsap.to(projectThumb.current, {
          scale: 1,
          opacity: 1,
          // duration: 0.5,
          // stagger: 0.5,
          ease: 'expo.out',
          scrollTrigger: {
            scroller: window,
            trigger: projectThumb.current,
            start: '-=50% bottom',
            // end:'bo'
            // end: '+=100%', 
            end: 'center top',
            // pin:true,width < 1024
            // scrub: 1,
            toggleActions: 'play reverse play reverse',
            // markers: true,
            invalidateOnRefresh: true
          },
          // onStart: () => console.log('start')
        })

      }
    }
    // gsap.to(target, {
    //   opacity: 1,
    //   scale: 1,
    //   ease: 'expo.out'
    // })
    // console.log(loaded)
    // }

    onLoad()

    // return () => tween.kill()

  }, [loaded])

  // function handleClick() {
  //   if (!click) { setClick(true); tween.play() } else { setClick(false); tween.reverse() }
  // }
  // console.log(project.mainImage)
  {/* <Link href={`/blog/${encodeURIComponent(post.slug)}`}> */ }

  return (
    <Link href={`./gallery/${project.slug.current}` } className='scale-50 opacity-0' ref={projectThumb}>
      <div 
        onClick={handleClick}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseEnter={(target) => { setHover(true); handleMouseUp(target) }}
        onMouseLeave={(target) => { setHover(false); handleMouseLeave(target) }}
        className={`relative cursor-pointer before:block before:pt-[100%] card ${hover ? '' : 'inactiveCard'} index-${index} `}>

        <div className={`absolute top-0 left-0 w-full h-full ${hover ? 'inactiveCard' : ''}`}>
        </div>

        <div className='absolute w-full h-full top-0 left-0 flex items-end '>

          <SanityImage onLoad={()=>setLoaded(true)} print={false} blur sizes='(max-width: 460px) 50vw, (max-width: 780px) 33vw, 20vw' containerClass={'rounded-none'} fill absolute image={project.mainImage.image} alt={project.mainImage.alt[locale]} />
          {/* {console.log(project.mainImage)} */}
          <div className={`absolute h-full w-full bg-black/30  duration-500 ${hover ? 'opacity-100' : 'opacity-0'}`}>
          </div>

          <h2 className={`font-lora text-xl invert-0 p-4 duration-500 ${hover ? 'opacity-100 delay-100' : 'opacity-0 '}`}>
            {project.title}
          </h2>
        </div>

      </div>
    </Link>

  )
}
