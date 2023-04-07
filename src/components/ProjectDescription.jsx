import { useAppContext } from '@/utils/appContext'
import { usePageContext } from '@/utils/pageContext'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import ProjectDescriptionTop from './ProjectDescriptionTop'
import ProjectDescriptionBottom from './ProjectDescriptionBottom'
import { Observer } from 'gsap/dist/Observer'
gsap.registerPlugin(Observer)

export default function ProjectDescription({ project }) {
  let [animateDescription, setAnimateDescription] = useState(false)
  const { width } = useAppContext()
  const { setDescriptionOpen, descriptionOpen } = usePageContext()

  useEffect(() => {
    let observer = Observer.create({
      target: window,
      ignore: '.ignore-swipe',       // can be any element (selector text is fine)
      type: "touch, pointer",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      onDown: () => { if (animateDescription) return; console.log('down'); setAnimateDescription(true); toggleDescription(width < 768 ? true : false) },
      onUp: () => { if (animateDescription) return; console.log('up'); setAnimateDescription(true); toggleDescription(width < 768 ? false : true) },
      lockAxis: true,
    })
    return () => { observer.disable() }
  }, [project])

  function toggleDescription(toOpen) {
    if (toOpen) {
      setDescriptionOpen(true)
      openDescription()
    } else {
      setDescriptionOpen(false)
      closeDescription()
    }
  }

  let openCloseDuration = 0.7

  function openDescription() {
    if (width < 768) {
      gsap.to('.description-box', {
        yPercent: 100,
        // height:'100dvh',
        borderRadius: 0,
        translateY: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        scale: 1,
        ease: 'expo.out',
        duration: openCloseDuration,
        onComplete: () => setAnimateDescription(false)
      })
    } else {
      gsap.to('.description-box', {
        yPercent: 100,
        translateY: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        scale: 1,
        ease: 'expo.out',
        duration: openCloseDuration,
        onComplete: () => setAnimateDescription(false)
      })
    }
  }

  function closeDescription() {
    if (width < 768) {
      gsap.to('.description-box', {
        yPercent: 0,
        // height:'auto',
        borderRadius: '0px 0px 30px 30px',
        translateY: () => width < 350 ? 40 : 56,
        backgroundColor: 'rgba(0,0,0,0.4)',
        scale: 1,
        ease: 'expo.out',
        duration: openCloseDuration,
        onComplete: () => setAnimateDescription(false)
      })
    } else {
      gsap.to('.description-box', {
        yPercent: 0,
        translateY: 48,
        backgroundColor: 'rgba(0,0,0,0.4)',
        scale: 1,
        ease: 'expo.out',
        duration: openCloseDuration,
        onComplete: () => setAnimateDescription(false)
      })
    }
  }

  return (
    <div className="description-container absolute w-full md:w-[70%] bottom-full left-0 px-0  md:px-12 z-[2]">
      {width > 768
        ? <ProjectDescriptionBottom openDescription={openDescription} closeDescription={closeDescription} key='desktop' project={project} />
        : <ProjectDescriptionTop openDescription={openDescription} closeDescription={closeDescription} key='mobile' project={project} />}
    </div>)

}
