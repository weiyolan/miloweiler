import { useAppContext } from '@/utils/appContext'
import { usePageContext } from '@/utils/pageContext'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
// import Line from './Line'
import FadeDiv from '@components/FadeDiv'
import useDimensions from '@/utils/useDimensions'

export default function ProjectDescriptionTop({ project, setPosition, setAnimateDescription }) {
  const { locale, width, height } = useAppContext()
  const { darkMode, descriptionOpen, setDescriptionOpen } = usePageContext()

  let textRef = useRef(null)
  const descriptionRef = useRef(null)
  let { width: textWidth, height: textHeight, top: textTop } = useDimensions(textRef)
  const { width: descriptionWidth, height: descriptionHeight, top: descriptionTop, bottom: descriptionBottom } = useDimensions(descriptionRef)

  let [maxTextHeight, setMaxTextHeight] = useState(undefined)

  const ctx = useRef(gsap.context(() => { }));

  useEffect(() => {
    return () => ctx.current.revert();
  }, []);

  useEffect(() => {
    ctx.current.add(() => {
      gsap.to(descriptionRef.current, {
        // x: selected === id ? 200 : 0,
        yPercent: descriptionOpen ? 100 : 0,
        // height:'auto',
        borderRadius: descriptionOpen ? 0 : '0px 0px 30px 30px',
        y: descriptionOpen ? 0 : descriptionBottom,
        // translateY: () => width < 350 ? 40 : 56,
        backgroundColor: descriptionOpen ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)',
        scale: 1,
        ease: 'expo.out',
        duration: 0.7,
        onComplete: () => setAnimateDescription(false)
      });

      gsap.to('.arrowOpen', {
        // scale: hovering ? 1.1 : 1,:
        // opacity: hovering ? 0.3 : 0.1,
        ease: 'expo.out',
        duration: 0.6,
      });
      gsap.to('.arrowOpen', {
        y: descriptionOpen ? '-8vh':0,
        ease: 'elastic.out(1.5, 0.5)',
        duration: 0.6,
        // onComplete: () => setAnimateDescription(false)
      });
      gsap.to('.arrowOpenPath', {
        attr: {d:!descriptionOpen?"M17.884 19.1903L32.3511 2.48187C33.1922 1.51037 32.5021 0 31.2171 0H2.28292C0.997868 0 0.307762 1.51037 1.14894 2.48187L15.616 19.1903C16.2142 19.8812 17.2858 19.8812 17.884 19.1903Z":"M17.884 1.30968L32.3511 18.0181C33.1922 18.9896 32.5021 20.5 31.2171 20.5H2.28292C0.997868 20.5 0.307762 18.9896 1.14894 18.0181L15.616 1.30968C16.2142 0.618837 17.2858 0.618839 17.884 1.30968Z"},
        ease: 'expo.out',
        duration: 0.6,
      });
    });
  }, [descriptionBottom, descriptionOpen]);

  useEffect(() => {
    setPosition({ width: descriptionWidth, height: descriptionHeight, top: descriptionTop, bottom: descriptionBottom })
  }, [descriptionBottom])

  useEffect(() => {
    setMaxTextHeight(height + (descriptionTop - textTop))
    // console.log(height + (descriptionTop - textTop))
  }, [textTop])
  // let hoverTween = useRef()
  // const [ctx, setCtx] = useState(gsap.context(() => {}, app));

  // useEffect(() => {
  //   hoverTween.current = (
  //     gsap.to('.description-container', {
  //       // translateY: 100,
  //       yPercent:-100,
  //       // translateY: 'calc(100% - 40px)',
  //       ease: 'expo.inout',
  //       duration: 0.5,
  //       paused: true,
  //     })
  //   )
  // }, [])

  // function handleEnter({ currentTarget }) {
  //   if (width > 1024) {
  //     if (!descriptionOpen) {
  //       gsap.to(currentTarget, { yPercent: 0, translateY: '+=8', backgroundColor: 'rgba(0,0,0,0.5)', scale: 1, ease: 'expo.out', duration: 0.7 })
  //     } else if (descriptionOpen) {
  //       gsap.to(currentTarget, { yPercent: 100, translateY: '-=4', backgroundColor: 'rgba(0,0,0,0.5)', scale: 1, ease: 'expo.out', duration: 0.7 })
  //     }
  //   }
  // }
  // function handleLeave({ currentTarget }) {
  //   if (width > 1024) {
  //     if (!descriptionOpen) {
  //       gsap.to(currentTarget, { yPercent: 0, translateY: 48, backgroundColor: 'rgba(0,0,0,0.4)', scale: 1, ease: 'expo.out', duration: 0.7 })
  //     } else if (descriptionOpen) {
  //       gsap.to(currentTarget, { yPercent: 100, translateY: 0, backgroundColor: 'rgba(0,0,0,0.6)', scale: 1, ease: 'expo.out', duration: 0.7 })
  //     }
  //   }
  // }
  function handleClick({ currentTarget }) {
    if (!descriptionOpen) {
      setDescriptionOpen(true)
      // openDescription()
    } else if (descriptionOpen) {
      setDescriptionOpen(false)
      // closeDescription()
    }
  }

  // console.log(maxTextHeight, textHeight, height, textTop, textHeight > height - textTop)

  return (

    <div ref={descriptionRef} className='description-box relative w-full min-h-screen font-lora flex flex-col justify-start bg-black/40 shadow-2xl backdrop-blur cursor-pointer rounded-b-[30px] gap-4 translate-y-10 mobm:translate-y-14 py-10 mobm:py-14 px-4 xs:px-8'
      // onMouseEnter={({ currentTarget }) => gsap.to(currentTarget, { yPercent: -100, translateY: 0, ease: 'expo.inout', duration: 0.7 })}
      // onMouseEnter={handleEnter}
      // onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <div className={`relative whitespace-nowrap text-lg mobm:text-2xl md:text-3xl mt-2 flex justify-between transition-all duration-700 delay-75 ${descriptionOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} ${darkMode ? 'text-primary' : 'text-darkPrimary'}`}>
        <h1 className={`whitespace-normal`}>
          {project.title}
          {project?.subTitle ? <Span text={` (${project.subTitle})`} /> : null}
        </h1>
        <h2 className='whitespace-normal'>
          <Span text='by' />
          {` ${project?.by?.[0]?project?.by?.[0]:'me'}`}
        </h2>
      </div>

      <svg className='arrowOpen absolute bottom-0 left-1/2 -translate-x-1/2 opacity-20 w-4 sm:w-8 h-4 sm:h-8' width="33" height="21" viewBox="0 0 33 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className='arrowOpenPath' d="M17.884 1.30968L32.3511 18.0181C33.1922 18.9896 32.5021 20.5 31.2171 20.5H2.28292C0.997868 20.5 0.307762 18.9896 1.14894 18.0181L15.616 1.30968C16.2142 0.618837 17.2858 0.618839 17.884 1.30968Z" fill="#D9D9D9" />
        {/* <path d="M17.884 19.1903L32.3511 2.48187C33.1922 1.51037 32.5021 0 31.2171 0H2.28292C0.997868 0 0.307762 1.51037 1.14894 2.48187L15.616 19.1903C16.2142 19.8812 17.2858 19.8812 17.884 19.1903Z" fill="#D9D9D9"/> */}
      </svg>

      <div className="w-full lg:w-1/3 flex flex-col gap-2 md:gap-4">
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

      {/* <div className="ignore-swipe flex-1 w-full md:w-2/3 text-lg font-pop font-extralight text-justify whitespace-pre-wrap"> */}
      <FadeDiv style={{ height: maxTextHeight || '50%' }} type='bottom' amount={15} className={`${textHeight > maxTextHeight ? 'ignore-swipe scroll-bar-small scroll-bar-primary overflow-y-scroll' : ''} overflow-hidden lg:w-2/3 w-full h-full text-lg font-pop font-extralight text-justify whitespace-pre-wrap`}>
        {/* <h3 className="font-lora text-xl">About: </h3> */}
        <p ref={textRef} className={`pb-10 ${textHeight > maxTextHeight ? 'pr-2 ignore-swipe' : ''} whitespace-pre-wrap text-sm mobm:text-base lg:text-sm first-letter:float-left first-letter:text-4xl first-letter:pr-2 first-letter:font-normal first-letter:uppercase first-letter:font-lora`}>{project?.description?.[locale] || ''}</p>
      </FadeDiv>

      {/* </div> */}

      {/* ============== ABSOLUTE TITLE =============== */}
      {/* <Line className={`border-spacing-2 `}/> */}
      <div className={`absolute bottom-2 mobm:bottom-3 cursor-pointer flex mx-auto text-lg mobm:text-2xl md:text-3xl whitespace-nowrap mt-2 w-full px-3 left-1/2 -translate-x-1/2 justify-between transition-all  
      ${descriptionOpen ? 'opacity-0 invisible duration-300 delay-[0]' : 'opacity-100 visible duration-700 delay-300'} ${darkMode ? 'text-primary' : 'text-darkPrimary'}`}
        onClick={handleClick}>
        <div className={`cursor-pointer truncate`}>
          {project.title}
          {project?.subTitle ? <Span text={` (${project.subTitle})`} /> : null}
        </div>
        <div className='cursor-pointer'>
          <Span text='by' />
          {` ${project?.by?.[0]?project?.by?.[0]:'me'}`}
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

