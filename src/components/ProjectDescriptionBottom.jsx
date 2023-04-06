import { useAppContext } from '@/utils/appContext'
import { usePageContext } from '@/utils/pageContext'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function ProjectDescriptionBottom({ project }) {
  const { locale } = useAppContext()
  const { darkMode , descriptionOpen, setDescriptionOpen} = usePageContext()
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

  function handleEnter({ currentTarget }) {
    if (!descriptionOpen) {
      gsap.to(currentTarget, { yPercent: 0, translateY: '-=8', backgroundColor: 'rgba(0,0,0,0.5)' , scale: 1, ease: 'expo.out', duration: 0.7 })
    } else if (descriptionOpen) {
      gsap.to(currentTarget, { yPercent: -100, translateY: '+=4', backgroundColor: 'rgba(0,0,0,0.5)' , scale: 1, ease: 'expo.out', duration: 0.7 })
    }
  }
  function handleLeave({ currentTarget }) {
    if (!descriptionOpen) {
      gsap.to(currentTarget, { yPercent: 0, translateY: -64, backgroundColor: 'rgba(0,0,0,0.4)' ,scale: 1, ease: 'expo.out', duration: 0.7 })
    } else if (descriptionOpen) {
      gsap.to(currentTarget, { yPercent: -100, translateY: 0, backgroundColor: 'rgba(0,0,0,0.6)' , scale: 1, ease: 'expo.out', duration: 0.7 })
    }
  }
  function handleClick({ currentTarget }) {
    if (!descriptionOpen) {
      setDescriptionOpen(true)
      gsap.to(currentTarget, { yPercent: -100, translateY: 0, backgroundColor: 'rgba(0,0,0,0.6)' ,  scale: 1, ease: 'expo.out', duration: 0.5 })
    } else if (descriptionOpen) {
      setDescriptionOpen(false)
      gsap.to(currentTarget, { yPercent: -0, translateY: -64, backgroundColor: 'rgba(0,0,0,0.4)' , scale: 1, ease: 'expo.out', duration: 0.5 })
    }
  }

  return (
    <div className="description-container absolute w-full md:w-[70%] top-full left-0 px-1 md:px-12 z-[2]"
    >
      <div className='description-box relative w-full bg-black/40 shadow-top-2xl backdrop-blur cursor-pointer -translate-y-16 rounded-t-[40px] pt-6 px-4 md:px-10 pb-10'
        // onMouseEnter={({ currentTarget }) => gsap.to(currentTarget, { yPercent: -100, translateY: 0, ease: 'expo.inout', duration: 0.7 })}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
      >
        <div className={`relative font-lora text-lg md:text-3xl mb-4 flex justify-between ${darkMode ? 'text-primary' : 'text-darkPrimary'}`}>
          <h1 className={``}>
            {project.title}
            {project?.subTitle ? <Span text={` (${project.subTitle})`} /> : null}
          </h1>
          <h2>
            <Span text='by' />
            {` ${project?.by?.[0]}`}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 relative font-lora ">
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
          <div className="w-full md:w-2/3 text-lg font-pop font-extralight text-justify  whitespace-pre-wrap">
            {/* <h3 className="font-lora text-xl">About: </h3> */}
            <p className='text-xs md:text-sm first-letter:float-left first-letter:text-4xl first-letter:pr-2 first-letter:font-normal first-letter:uppercase first-letter:font-lora'>{project?.description?.[locale] || ''}</p>
          </div>
        </div>
      </div>
    </div>)
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
    <h3 className='text-base md:text-xl leading-4'>{title + ': '}<Span text={string} /></h3>
  )
}

function Span({ text }) {
  return <span className="font-pop font-extralight text-sm">{text}</span>
}

