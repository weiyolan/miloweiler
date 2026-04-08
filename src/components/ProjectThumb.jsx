import { useAppContext } from '@/utils/appContext'
import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import Link from 'next/link'
import Spinner from './Spinner'
import Line from './Line'

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { usePageContext } from '@/utils/pageContext'
gsap.registerPlugin(ScrollTrigger);

export default function ProjectThumb({ project, gridStaggerAnimation, activeIndex, setActiveIndex, categorySlug, index }) {
  const { width, locale } = useAppContext()
  let [hover, setHover] = useState(false)
  let [lineHover, setLineHover] = useState(false)
  let [loaded, setLoaded] = useState(false)
  let projectThumb = useRef(null)
  // const { darkMode } = usePageContext()
  // const { width } = useAppContext()
  // let [selected, setSelected] = useState(false)
  // let myRef = useRef(null)
  const ctx = useRef(gsap.context(() => { }));

  useEffect(() => {
    return () => ctx.current.revert();
  }, []);

  function handleMouseDown({ currentTarget }) {
    ctx.current.add(() => {
      gsap.to(currentTarget, { scale: 0.95, duration: 0.5, ease: 'expo.out' })
    })
  }
  function handleMouseUp({ currentTarget }) {
    ctx.current.add(() => {
      gsap.to(currentTarget, { scale: 1, duration: 0.5, ease: 'expo.out' })
    })
  }
  function handleMouseLeave() {
    ctx.current.add(() => {
      gsap.to(`.projectThumb${index}`, { scale: 1.0, duration: 0.5, ease: 'expo.out' })
    })
  }

  // useEffect(() => {
  //   ctx.current.add(() => {

  //     gsap.to(`.galleryThumbLine${index}`, {
  //       width: (lineHover) || hover ? '100%' : 0,
  //       borderColor: (lineHover) || hover ? darkMode ? '#FFD5EA' : '#000000' : 'transparent',
  //       duration: 0.2,
  //     })
  //   })
  // }, [lineHover, hover])

  useEffect(() => {
    // function onLoad() {
      if (loaded) {
        gsap.to(projectThumb.current, {
          // scale: 1,
          opacity: 1,
          duration: 0.5,
          // delay: 0.2,
          stagger: 0.5,
          ease: 'expo.out',
          scrollTrigger: {
            scroller: window,
            trigger: projectThumb.current,
            // start: '-=50% bottom',
            start: '+=10% bottom',
            // end: '150% top',
            end: '90% top',
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
    <div className='select-none overflow-hidden h-full group' >
      <div
        onClick={() => setActiveIndex?.(index)}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => { setHover(true); }}
        onMouseLeave={() => { setHover(false); handleMouseLeave() }}
        className={`relative cursor-pointer rounded-none text-primary before:block before:pt-[66%] card   transition-transform duration-300 ${hover || lineHover ? '' : 'inactiveCard'} index-${index} `}>


        {/* <div className={`absolute top-0 left-0 w-full h-full ${hover || lineHover ? 'inactiveCard' : ''}`}>
          {!loaded && <Spinner darkMode={false} cube className={`w-4 h-4 left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2`} />}
        </div> */}

        <div ref={projectThumb} className={`rounded-none opacity-0 absolute w-full h-full top-0 left-0 `}>

          <SanityImage className={` projectThumb${index}`} onLoad={() => setLoaded(true)} print={false} blur sizes='(max-width: 460px) 50vw, (max-width: 780px) 33vw, 25vw' containerClass={'rounded-none '} fill absolute image={project.mainImage.image} alt={project.mainImage?.alt?.[locale]}
          />

          <h3 className='font-mono text-sm absolute top-2 left-4'>{project?.title}</h3>
          <div className={`absolute rounded-none h-full w-full top-0 left-0 bg-black/10 duration-300 group-hover:backdrop-blur-sm  ${hover || lineHover ? 'opacity-100' : 'opacity-0'} flex  flex-col justify-between p-2 sm:p-4`}>
            <h4 className={`text-left font-serif text-base sm:text-lg md:text-xl invert-0 duration-500 `}>{/* ${hover || lineHover ? 'opacity-100 delay-100' : 'opacity-0 '} */}

              {/* {console.log(project)} */}
              {false && project?.title}
              {false && project?.subTitle ? <Span text={` (${project.subTitle})`} /> : null}
              {/* {width > 648 && project?.date} */}
            </h4>
            <div className='text-right font-serif'>
              <Span text='by' />
              {` ${project?.by?.[0] ? project?.by?.[0] : 'me'}`}
            </div>

            {project.commissionedBool && (
              <span className="absolute top-2 right-2 bg-darkPrimary/60 text-primary text-xs font-mono px-2 py-0.5 rounded">
                Commissioned
              </span>
            )}

            <Link href={`/${categorySlug}/${project.slug.current}`}
              className={` absolute w-full h-full left-0 top-0 text-3xl md:text-7xl font-sans text-primary font-extralight md:font-thin flex items-center justify-center transition-all duration-500 ${hover || lineHover ? 'opacity-100 delay-[100]' : 'opacity-0 pointer-events-none '}`} ref={projectThumb}>
              {width < 648 && '+'}
            </Link>
          </div>
        </div>
      </div>

      {/* <div className='mt-2 mb-2 text-left text-primary cursor-pointer'
        onMouseEnter={() => { setLineHover(true); }}
        onMouseLeave={() => { setLineHover(false); handleMouseLeave() }}>
        <Link href={`./gallery/${project.slug.current}`}>
          <h2 className={` font-serif text-base max-w-fit sm:text-lg truncate font-semibold md:text-xl invert-0 duration-500 mb-1`}>
            {project?.title}
            <Line className={`galleryThumbLine${index} border-transparent w-0`} />
          </h2>
          <p className='font-sans font-extralight text-sm line-clamp-3 '>
            {project?.description?.[locale] && project.description[locale].slice(0, 120) || ''}
          </p>
        </Link>
      </div> */}

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
  return <span className={`font-mono font-extralight ${detail ? 'text-sm mobm:text-base' : 'text-xs mobm:text-sm'}`}>{text}</span>
}

