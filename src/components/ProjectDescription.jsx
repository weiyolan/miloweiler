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
  const {setDescriptionOpen,descriptionOpen} = usePageContext()
  useEffect(() => {
    let observer2 = Observer.create({
      target: ".description-container",         // can be any element (selector text is fine)
      type: "touch, pointer",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      onDown: () => { if (animateDescription) return; console.log('down'); setAnimateDescription(true); toggleDescription(width < 768 ? true : false) },
      onUp: () => { if (animateDescription) return; console.log('up'); setAnimateDescription(true); toggleDescription(width < 768 ? false : true) },
    })
    return () => { observer2.disable() }
  }, [])

  function toggleDescription(toOpen) {
    if (toOpen) {
      setDescriptionOpen(true)
      gsap.to('.description-box', { yPercent: 100, translateY: 0, backgroundColor: 'rgba(0,0,0,0.6)', scale: 1, ease: 'expo.out', duration: 0.5, onComplete: () => setAnimateDescription(false) })
    } else {
      setDescriptionOpen(false)
      gsap.to('.description-box', { yPercent: 0, translateY: 48, backgroundColor: 'rgba(0,0,0,0.4)', scale: 1, ease: 'expo.out', duration: 0.5, onComplete: () => setAnimateDescription(false) })
    }
  }

  if (width > 768) { return <ProjectDescriptionBottom key='desktop' project={project} /> }

  return (
    <ProjectDescriptionTop key='mobile' project={project} />
  )
}
