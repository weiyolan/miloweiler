import { useAppContext } from '@/utils/appContext'
import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import { gsap } from 'gsap'
import Link from 'next/link'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Spinner from './Spinner'
import Line from './Line'
gsap.registerPlugin(ScrollTrigger)
export default function ProjectThumb({ project, gridStaggerAnimation, activeIndex, setActiveIndex, index }) {
  const { locale } = useAppContext()
  let [hover, setHover] = useState(false)
  let [lineHover, setLineHover] = useState(false)
  let [loaded, setLoaded] = useState(false)
  let projectThumb = useRef(null)
  const { width } = useAppContext()
  // let [selected, setSelected] = useState(false)
  // let myRef = useRef(null)
  const ctx = useRef(gsap.context(() => { }));

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
    gsap.to(currentTarget, { scale: 1, duration: 0.5, ease: 'expo.out' })
    // })
  }
  function handleMouseEnter() {
    // ctx.current.add(() => {
    gsap.to(`.projectThumb${index}`, { scale: 1.02, duration: 0.5, ease: 'expo.out' })
    // })
  }
  function handleMouseLeave() {
    // ctx.current.add(() => {
    gsap.to(`.projectThumb${index}`, { scale: 1.0, duration: 0.5, ease: 'expo.out' })
    // })
  }

  useEffect(() => {
    ctx.current.add(() => {

      gsap.to(`.galleryThumbLine${index}`, {
        width: (lineHover) ? '100%' : 0,
        borderColor: (lineHover) ? '#000000' : 'transparent',
        duration: 0.2,
      })
    })
  }, [lineHover])

  useEffect(() => {
    // function onLoad() {
      if (loaded) {
        gsap.to(projectThumb.current, {
          scale: 1,
          opacity: 1,
          // duration: 0.5,
          // stagger: 0.5,
          ease: 'expo.out',
          scrollTrigger: {
            // scroller: window,
            trigger: projectThumb.current,
            start: '-=50% bottom',
            // end:'bo'
            // end: '+=100%', 
            end: '150% top',
            // pin:true,width < 1024
            // scrub: 1,
            toggleActions: 'play reverse play reverse',
            // markers: true,
            invalidateOnRefresh: true
          },
          // onStart: () => console.log('start')
        })
      }
    // }
    // onLoad()
  }, [loaded])

  useEffect(() => {
    if (activeIndex === index) {
      setHover(true)
    } else { setHover(false) }
  }, [activeIndex])


  return (
    <div className='select-none overflow-hidden h-full' >
      <div
        onClick={() => setActiveIndex(index)}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => { setHover(true); handleMouseEnter() }}
        onMouseLeave={() => { setHover(false); handleMouseLeave() }}
        className={`relative cursor-pointer rounded-xl text-primary before:block before:pt-[100%] card ${hover ? '' : 'inactiveCard'} index-${index} `}>

        <div className={`absolute top-0  left-0 w-full h-full ${hover ? 'inactiveCard' : ''}`}>
          {!loaded && <Spinner darkMode={false} cube className={`w-4 h-4 left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2`} />}
        </div>

        <div ref={projectThumb} className={`scale-50 rounded-xl opacity-0 absolute w-full h-full top-0 left-0 `}>

          <SanityImage className={`projectThumb${index}`} onLoad={() => setLoaded(true)} print={false} blur sizes='(max-width: 460px) 50vw, (max-width: 780px) 33vw, 25vw' containerClass={'rounded-xl'} fill absolute image={project.mainImage.image} alt={project.mainImage.alt[locale]}
          />

          <div className={`absolute  rounded-xl h-full w-full top-0 left-0 bg-black/50 duration-300 ${hover ? 'opacity-100' : 'opacity-0'} flex  flex-col justify-between p-2 sm:p-4`}>
            <h2 className={`text-left font-lora text-base sm:text-lg md:text-xl invert-0 duration-500  ${hover ? 'opacity-100 delay-100' : 'opacity-0 '}`}>
              {/* {console.log(project)} */}
              {project?.title}
              {project?.subTitle ? <Span text={` (${project.subTitle})`} /> : null}
            </h2>
            <div className='text-right font-lora'>
              <Span text='by' />
              {` ${project?.by?.[0] ? project?.by?.[0] : 'me'}`}
            </div>

            <Link href={`./gallery/${project.slug.current}`}
              className={` absolute w-full h-full left-0 top-0 text-3xl md:text-7xl font-pop text-primary font-extralight md:font-thin flex items-center justify-center transition-all duration-500 ${hover ? 'opacity-100 delay-[100]' : 'opacity-0 pointer-events-none '}`} ref={projectThumb}>
              +
            </Link>
          </div>
        </div>
      </div>

      <div className='mt-2 mb-2 text-left text-darkPrimary cursor-pointer'
        onMouseEnter={() => { setLineHover(true); handleMouseEnter() }}
        onMouseLeave={() => { setLineHover(false); handleMouseLeave() }}>
        <Link href={`./gallery/${project.slug.current}`}>
          <h2 className={` font-lora text-base max-w-fit sm:text-lg truncate font-semibold md:text-xl invert-0 duration-500 mb-1`}>
            {/* {console.log(project)} */}
            {project?.title}
            <Line className={`galleryThumbLine${index} border-transparent w-0 `} />
          </h2>
          {/* <h3 className='font-lora text-base md:text-xl font-semibold'>
          {`By: ${project?.by?.[0] ? project?.by?.[0] : 'me'}`}
        </h3> */}
          <p className='font-pop font-normal text-sm line-clamp-3 '>
            {project?.description?.[locale] && project.description[locale].slice(0, 120) || ''}
            {/* {console.log(project?.description?.[locale].slice(0, 20))} */}
          </p>
        </Link>
      </div>

      {/* <Line/> */}

      {/* <Line className={'w-1/3 border-darkPrimary mx-auto '}/> */}
    </div>
  )
}
// function Detail({ title, text }) {

//   let string;

//   if (text.length === 1) {
//     string = text[0]
//   } else if (text.length === 2) {
//     string = text[0] + ' and ' + text[1]
//   }
//   else {
//     // console.log(text)
//     let firsts = text.slice(0, -1)
//     string = firsts.join(', ') + ' and ' + text.slice(-1)
//   }

//   return (
//     <h3 className='text-base mobm:text-xl leading-4'>{title + ': '}<Span detail text={string} /></h3>
//   )
// }

function Span({ text, detail }) {
  return <span className={`font-pop font-extralight ${detail ? 'text-sm mobm:text-base' : 'text-xs mobm:text-sm'}`}>{text}</span>
}

