import { useAppContext } from '@/utils/appContext'
import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import { gsap } from 'gsap/dist/gsap'
import { usePageContext } from '@/utils/pageContext'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Logo from './Logo'
import LogoAnimated from './LogoAnimated'
import LogoLoading from './Spinner'
import Spinner from './Spinner'
// import Link from 'next/link'
gsap.registerPlugin(ScrollTrigger)

export default function PictureThumb({ image, alt, row, containerRef, visible, handleClick, handleMouseEnter, handleMouseLeave, index, className }) {
  const { width } = useAppContext()
  // const { palette } = usePageContext()
  // console.log(palette)
  let [loaded, setLoaded] = useState(false)
  const myThumb = useRef(null)
  const ctx = useRef(gsap.context(() => { }));

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

  // function setActive() {
  //   gsap.to(myThumb.current, {
  //     borderColor: palette.darkMuted.background,
  //     ease: 'expo.out',
  //     duration: 0.7,
  //   })
  // }

  // function setInActive() {
  //   gsap.to(myThumb.current, {
  //     borderColor: `${palette.darkMuted.background}00`,
  //     ease: 'expo.out',
  //     duration: 0.7,
  //   })
  // }

  useEffect(() => {
    return () => ctx.current.revert();
  }, []);

  useEffect(() => {
    // console.log(visible)
    ctx.current.add(() => {
      gsap.to(`#pictureThumb${index}`, {
        // outlineColor: visible ? `${palette.vibrant.background}FF`:`${palette.vibrant.background}00` ,
        marginLeft: width < 1024 ? (visible ? 12 : 0) : 0,
        marginRight: width < 1024 ? (visible ? 12 : 0) : 0,
        marginTop: width < 1024 ? 0 : (visible ? 24 : 0),
        marginBottom: width < 1024 ? 0 : (visible ? 24 : 0),
        // scale:width<1024?1:visible?1.1:1,
        // margin: '5 0 5 0' , 
        y: width < 1024 ? (visible ? -6 : 0) : 0,
        // x:width<1024?0:(visible ?+20:0),
        // scale:1,
        ease: 'power1.inout',
        // ease: 'expo.out',
        duration: 0.5,
      });
    });
  }, [visible]);
  // useEffect(() => {
  //   if (visible) {
  //     setActive()
  //   } else if (!visible) {
  //     setInActive()
  //   }
  // }, [visible])

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
            end: '150% top',
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
    <div
      style={{}}
      id={`pictureThumb${index}`}
      // style={{ borderColor: visible ? palette.darkMuted.background : 'transparent' }}
      className={`picture-thumb  relative flex select-none cursor-pointer w-fit h-fit outline-none outline-2 ${visible ? '' : ''}  
      before:block before:w-20 mobm:before:w-28 lg:before:w-44 ${row ? '' : ''} before:pt-[100%] ${className ? className : ''}`}
      onClick={handleClick}
      // data-loaded={loaded}
      onMouseUp={mouseUp}
      onMouseDown={mouseDown}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}>

      <div ref={myThumb} className='absolute scale-50 opacity-0 w-full h-full top-0 left-0 '  >
        <SanityImage onLoad={() => {setLoaded(true) }} print={!index ? true : false} blur sizes='(max-width: 700px) 20vw, 13vw' fill containerClass={'rounded-none '} image={image} alt={alt} />
      </div>
      {!loaded &&
          <Spinner cube className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} />
        }
    </div>
    // </Link>

  )
}
