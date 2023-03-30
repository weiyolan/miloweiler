import { useAppContext } from '@/utils/appContext'
import { usePageContext } from '@/utils/pageContext'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function ProjectDescription({ project }) {
  const { locale } = useAppContext()
  const { darkMode } = usePageContext()
  let hoverTween = useRef()
  let ctx = useRef()
  // let []

  useEffect(() => {
    ctx.current = gsap.context(() => { }); // nothing initially (we'll add() to the context when endX changes)
    return () => ctx.current.revert();
  }, [ctx]);

  useEffect(() => {
    hoverTween.current = (
      gsap.to('.description', {
        translateY: -600,
        // translateY: 'calc(100% - 40px)',
        ease: 'expo.inout',
        duration: 0.5,
        paused: true,
      })
    )
  }, [])

  // console.log(project)
  // ctx.current.add(() => {
  // })

  return (
    <div className="description shadow-xl  absolute bg-black/40 rounded-[40px] backdrop-blur w-[55%] mx-3 top-full -translate-y-20 pt-8 px-10 pb-20"
      onMouseEnter={() => hoverTween.current.play()}
      onMouseLeave={() => hoverTween.current.reverse()} >
      <div className={`relative font-lora text-3xl mb-4 flex justify-between ${darkMode ? 'text-primary' : 'text-darkPrimary'}`}>
        <h1 className={``}>
          {project.title + ' '}
          <SpanBy text={`(${project.subTitle})`} />
        </h1>
        <h2>
          <SpanBy text='by' />
          {` ${project?.by?.[0]}`}
        </h2>
      </div>

      <div className="flex gap-4 relative font-lora ">
        <div className="w-1/3 text-2xl flex flex-col gap-4">
          <h3>Year: <SpanDetail text={project?.date.slice(0, 4)} /></h3>
          <h3>Album: <SpanDetail text={project?.album} /></h3>
          <h3>Directed By: <SpanDetail text={project?.directed?.join(', ')} /></h3>
          <h3>Produced By: <SpanDetail text={project?.produced} /></h3>
        </div>
        <div className="w-2/3 text-lg font-pop font-extralight text-justify  whitespace-pre-wrap">
          <h3 className="font-lora text-2xl">About: </h3>
          <p>{project?.description?.[locale] || ''}</p>
        </div>
      </div>
    </div>)
}

function SpanBy({ text }) {
  return <span className="font-pop font-extralight text-base">{text}</span>
}

function SpanDetail({ text }) {
  return <span className="font-pop font-extralight text-base">{text}</span>
}