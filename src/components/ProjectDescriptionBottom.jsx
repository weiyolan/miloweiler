import { useAppContext } from '@/utils/appContext'
import { usePageContext } from '@/utils/pageContext'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import useDimensions from '@/utils/useDimensions'

export default function ProjectDescriptionBottom({ project, setPosition, setAnimateDescription }) {
  const { locale, width, height } = useAppContext()
  const { darkMode, descriptionOpen, setDescriptionOpen } = usePageContext()
  let [hovering,setHovering] = useState(false)
  let [loaded, setLoaded] = useState(false)
  let textRef = useRef(null)
  const descriptionRef = useRef(null)
  let { width: textWidth, height: textHeight, top: textTop } = useDimensions(textRef)
  const { width: descriptionWidth, height: descriptionHeight, top: descriptionTop, bottom: descriptionBottom } = useDimensions(descriptionRef)

  let [maxTextHeight, setMaxTextHeight] = useState(undefined)

  const ctx = useRef(gsap.context(() => { }));

  useEffect(() => {
    setLoaded(true)
    return () => {ctx.current.revert();setLoaded(false)};
  }, []);

  useEffect(() => {
    ctx.current.add(() => {
      gsap.to(descriptionRef.current, {
        // x: selected === id ? 200 : 0,
        yPercent: descriptionOpen ? -100 : 0,
        // height:'auto',
        autoAlpha:loaded?1:0,
        // borderRadius: descriptionOpen ? 0 : '0px 0px 30px 30px',
        y: descriptionOpen ? (hovering?8:0) : (-height+descriptionTop + (hovering?-8:0)),
        // translateY: () => width < 350 ? 40 : 56,
        backgroundColor: hovering? 'rgba(0,0,0,0.5)' : descriptionOpen ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)',
        scale: 1,
        ease: 'expo.out',
        duration: 0.7,
        onComplete: () => setAnimateDescription(false)
      });
    });
  }, [descriptionBottom, descriptionOpen, hovering, loaded]);

  useEffect(() => {
    setPosition({ width: descriptionWidth, height: descriptionHeight, top:descriptionTop, bottom:descriptionBottom })
    // console.log(descriptionTop)
    // console.log(height)
  }, [descriptionBottom])

  useEffect(() => {
    setMaxTextHeight(height + (descriptionTop - textTop))
    // console.log(height + (descriptionTop - textTop))
  }, [textTop])


  // function handleEnter({ currentTarget }) {
  //   if (!descriptionOpen) {
  //     gsap.to(currentTarget, { yPercent: 0, translateY: '-=8', backgroundColor: 'rgba(0,0,0,0.5)', scale: 1, ease: 'expo.out', duration: 0.7 })
  //   } else if (descriptionOpen) {
  //     gsap.to(currentTarget, { yPercent: -100, translateY: '+=4', backgroundColor: 'rgba(0,0,0,0.5)', scale: 1, ease: 'expo.out', duration: 0.7 })
  //   }
  // }
  // function handleLeave({ currentTarget }) {
  //   if (!descriptionOpen) {
  //     gsap.to(currentTarget, { yPercent: 0, translateY: -64, backgroundColor: 'rgba(0,0,0,0.4)', scale: 1, ease: 'expo.out', duration: 0.7 })
  //   } else if (descriptionOpen) {
  //     gsap.to(currentTarget, { yPercent: -100, translateY: 0, backgroundColor: 'rgba(0,0,0,0.6)', scale: 1, ease: 'expo.out', duration: 0.7 })
  //   }
  // }
  function handleClick({ currentTarget }) {
    if (!descriptionOpen) {
      setDescriptionOpen(true)
      // openDescription()
    } else if (descriptionOpen) {
      setDescriptionOpen(false)
      // closeDescription()
      // gsap.to(currentTarget, { yPercent: -0, translateY: -64, backgroundColor: 'rgba(0,0,0,0.4)', scale: 1, ease: 'expo.out', duration: 0.5 })
    }
  }

  return (

    <div ref={descriptionRef} className='description-box opacity-0 invisible relative w-full -translate-y-16 bg-black/40 shadow-top-2xl backdrop-blur cursor-pointer rounded-t-[40px] pt-4 px-10 pb-10'
      // onMouseEnter={({ currentTarget }) => gsap.to(currentTarget, { yPercent: -100, translateY: 0, ease: 'expo.inout', duration: 0.7 })}
      onMouseEnter={()=>setHovering(true)}
      onMouseLeave={()=>setHovering(false)}
      onClick={handleClick}
    >

      {/* ============== ABSOLUTE TITLE =============== */}
      {/* <div className={`absolute bottom-2 mobm:bottom-3 flex mx-auto text-lg mobm:text-2xl md:text-3xl mt-2 w-[85vw] left-1/2 -translate-x-1/2 justify-between transition-all  
      ${descriptionOpen ? 'opacity-0 invisible duration-300 delay-[0]' : 'opacity-100 visible duration-700 delay-300'} ${darkMode ? 'text-primary' : 'text-darkPrimary'}`}>
      </div> */}
      <div className={`relative font-lora text-lg md:text-3xl mb-4 flex justify-between ${darkMode ? 'text-primary' : 'text-darkPrimary'}`}>
        <h1 className={``}>
          {project.title}
          {project?.subTitle ? <Span text={` (${project.subTitle})`} /> : null}
        </h1>
        <h2>
          <Span text='by' />
          {` ${project?.by?.[0]?project?.by?.[0]:'me'}`}
        </h2>
      </div>
      {/* <Line className={`border-spacing-2 `}/> */}

      <div className="flex flex-row gap-4 relative font-lora ">
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          {project?.date ? <Detail title='Year' text={[project.date.slice(0, 4)]} /> : null}
          {project?.album ? <Detail title='Album' text={[project.album]} /> : null}
          {project?.directed ? <Detail title='Directed By' text={project.directed} /> : null}
          {project?.produced ? <Detail title='Produced By' text={project.produced} /> : null}
          {project?.designed ? <Detail title='Designed By' text={project.designed} /> : null}
          {project?.created ? <Detail title='Created By' text={project.created} /> : null}
          {project?.developed ? <Detail title='Developed By' text={project.developed} /> : null}
          {project?.commissioned ? <Detail title='Commissioned By' text={project.commissioned} /> : null}
          {project?.artist ? <Detail title={`Artist${project.artist.length > 1 ? 's' : ''}`} text={project.artist} /> : null}
        </div>

        <div className="w-full md:w-2/3 text-lg font-pop ignore-swipe font-extralight text-justify  whitespace-pre-wrap">
          {/* <h3 className="font-lora text-xl">About: </h3> */}
          <p  ref={textRef} className='text-xs md:text-sm ignore-swipe first-letter:float-left first-letter:text-4xl first-letter:pr-2 first-letter:font-normal first-letter:uppercase first-letter:font-lora'>{project?.description?.[locale] || ''}</p>
        </div>
      </div>
    </div>
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
    console.log(text)
    let firsts = text.slice(0, -1)
    string = firsts.join(', ') + ' and ' + text.slice(-1)
  }

  return (
    <h3 className='text-base md:text-xl leading-4'>{title + ': '}<Span detail text={string} /></h3>
  )
}


function Span({ text, detail }) {
  return <span className={`font-pop font-extralight ${detail ? 'text-sm mobm:text-base' : 'text-xs mobm:text-sm'}`}>{text}</span>
}


