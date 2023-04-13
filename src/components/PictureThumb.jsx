import { useAppContext } from '@/utils/appContext'
import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import { gsap } from 'gsap'
import { usePageContext } from '@/utils/pageContext'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
// import Link from 'next/link'
gsap.registerPlugin(ScrollTrigger)

export default function PictureThumb({ image, alt, row, containerRef, visible, handleClick, handleMouseEnter, handleMouseLeave, index, className }) {
  const { locale, width } = useAppContext()
  const { palette } = usePageContext()
  let [loaded, setLoaded] = useState(false)
  const myThumb = useRef(null)

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

  function setActive() {
    gsap.to(myThumb.current, {
      borderColor: palette.darkMuted.background,
      ease: 'expo.out',
      duration: 0.7,
    })
  }

  function setInActive() {
    gsap.to(myThumb.current, {
      borderColor: `${palette.darkMuted.background}00`,
      ease: 'expo.out',
      duration: 0.7,
    })
  }

  useEffect(() => {
    if (visible) {
      setActive()
    } else if (!visible) {
      setInActive()
    }
  }, [visible])

  useEffect(() => {
    function onLoad() {
      if (loaded) {
        let tween = gsap.to(myThumb.current, {
          scale: 1,
          opacity: 1,
          // duration: 0.5,
          // stagger: 0.5,
          ease: 'expo.out',
          scrollTrigger: {
            scroller: containerRef.current,
            trigger: myThumb.current,
            start: '-=50% bottom',
            // end:'bo'
            // end: '+=100%', 
            end: width < 1024 ? 'bottom top' : '80% top',
            // pin:true,width < 1024
            // scrub: 1,
            toggleActions: 'play reverse play reverse',
            horizontal: width < 1024,
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
  // gsap.utils.toArray(".picture-thumb").forEach((thumbnail, i) => {
  // console.log(thumbnail.getAttribute('data-loaded'))
  // if (loaded) {

  // }
  // })

  return (
    // <Link href={`./gallery/${project.slug.current}`}>
    <div ref={myThumb}
      style={{ borderColor: `${palette.darkMuted.background}00` }}
      id={`pictureThumb${index}`}
      // style={{ borderColor: visible ? palette.darkMuted.background : 'transparent' }}
      className={`picture-thumb scale-50 opacity-0 relative flex select-none cursor-pointer w-fit h-fit border-none off ${visible ? '' : ''}  border-transparent 
      before:border-none before:block before:w-20 mobm:before:w-28 lg:before:w-44 ${row ? '' : ''} before:pt-[100%] ${className ? className : ''}`}
      onClick={handleClick}
      // data-loaded={loaded}
      onMouseUp={mouseUp}
      onMouseDown={mouseDown}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}>
      <div className='absolute w-full h-full top-0 left-0 '  >
        <SanityImage onLoad={() => { setLoaded(true) }} print={!index ? true : false} blur sizes='(max-width: 700px) 20vw, 13vw' fill containerClass={'rounded-none '} image={image} alt={alt} />
      </div>
    </div>
    // </Link>

  )
}
