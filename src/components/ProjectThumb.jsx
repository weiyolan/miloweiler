import { useAppContext } from '@/utils/appContext'
import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import { gsap } from 'gsap'
import Link from 'next/link'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
export default function ProjectThumb({ project, gridStaggerAnimation, activeIndex, setActiveIndex, index }) {
  const { locale } = useAppContext()
  let [hover, setHover] = useState(false)
  let [loaded, setLoaded] = useState(false)
  let projectThumb = useRef(null)
  const { width } = useAppContext()
  let [selected, setSelected] = useState(false)
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
    }
    onLoad()
  }, [loaded])

  useEffect(() => {
    if (activeIndex === index) {
      setHover(true)
    } else { setHover(false) }
  }, [activeIndex])


  return (
    <Link onClick={(e) => {width<1024 && e.preventDefault()}} href={width < 1024 ? {} : `./gallery/${project.slug.current}`} className='scale-50 opacity-0 select-none rounded-sm overflow-hidden' ref={projectThumb}>
      <div
        onClick={() => setActiveIndex(index)}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => { setHover(true); handleMouseEnter() }}
        onMouseLeave={() => { setHover(false); handleMouseLeave() }}
        className={`relative cursor-pointer  text-primary before:block before:pt-[100%] card ${hover ? '' : 'inactiveCard'} index-${index} `}>

        <div className={`absolute top-0 left-0 w-full h-full ${hover ? 'inactiveCard' : ''}`}>
        </div>

        <div className='absolute w-full h-full top-0 left-0 '>

          <SanityImage className={`projectThumb${index}`} onLoad={() => setLoaded(true)} print={false} blur sizes='(max-width: 460px) 50vw, (max-width: 780px) 33vw, 30vw' containerClass={'rounded-none'} fill absolute image={project.mainImage.image} alt={project.mainImage.alt[locale]} 
                  />
          {/* {console.log(project.mainImage)} */}
          <div className={`absolute h-full w-full top-0 left-0 bg-black/50 duration-300 ${hover ? 'opacity-100' : 'opacity-0'} flex flex-col justify-between p-2 sm:p-4`}>
            <h2 className={`text-left font-lora text-xl invert-0 duration-500  ${hover ? 'opacity-100 delay-100' : 'opacity-0 '}`}>
              {/* {console.log(project)} */}
              {project.title}
              {project?.subTitle ? <Span text={` (${project.subTitle})`} /> : null}
            </h2>
            <div className='text-right font-lora'>
              <Span text='by' />
              {` ${project?.by?.[0] ? project?.by?.[0] : 'me'}`}
            </div>
            {width < 1024 &&
              <Link  href={`./gallery/${project.slug.current}`}
                className={` absolute w-full h-full left-0 top-0 text-7xl font-pop text-primary font-thin flex items-center justify-center transition-all duration-500 ${hover ? 'opacity-100 delay-[100]' : 'opacity-0 pointer-events-none '}`} ref={projectThumb}>
                +
              </Link>
            }
          </div>
        </div>

      </div>
    </Link>

  )
}
function Detail({ title, text }) {

  let string;

  if (text.length === 1) {
    string = text[0]
  } else if (text.length === 2) {
    string = text[0] + ' and ' + text[1]
  }
  else {
    // console.log(text)
    let firsts = text.slice(0, -1)
    string = firsts.join(', ') + ' and ' + text.slice(-1)
  }

  return (
    <h3 className='text-base mobm:text-xl leading-4'>{title + ': '}<Span detail text={string} /></h3>
  )
}

function Span({ text, detail }) {
  return <span className={`font-pop font-extralight ${detail ? 'text-sm mobm:text-base' : 'text-xs mobm:text-sm'}`}>{text}</span>
}

