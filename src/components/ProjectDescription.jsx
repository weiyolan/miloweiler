import { useAppContext } from '@/utils/appContext'
import { usePageContext } from '@/utils/pageContext'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import ProjectDescriptionTop from './ProjectDescriptionTop'
import ProjectDescriptionBottom from './ProjectDescriptionBottom'
import { Observer } from 'gsap/dist/Observer'
import useDimensions from '@/utils/useDimensions'
gsap.registerPlugin(Observer)

export default function ProjectDescription({ project, setPosition }) {
  let [animateDescription, setAnimateDescription] = useState(false)
  const { width } = useAppContext()
  const { setDescriptionOpen, descriptionOpen } = usePageContext()
  let [descriptionPosition, setDescriptionPosition] = useState(undefined)


  useEffect(() => {
    // console.log(descriptionPosition?.bottom)
    setPosition(descriptionPosition)
  }, [descriptionPosition])

  useEffect(() => {
    let observer = Observer.create({
      target: window,
      ignore: ['.ignore-swipe'],       // can be any element (selector text is fine)
      type: "touch, pointer",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      onDown: () => {
        if (animateDescription) return;
        //  console.log('down'); 
        setAnimateDescription(true);
        toggleDescription(width < 1024 ? true : false)
      },
      onUp: () => {
        //  console.log(animateDescription); 

        if (animateDescription) return;
        //  console.log('up'); 
        setAnimateDescription(true);
        toggleDescription(width < 1024 ? false : true)
      },
      // onDownParams:[animateDescription],
      // onUpParams:[animateDescription],
      lockAxis: true,
    })
    return () => observer.disable()
  }, [project,setPosition])

  function toggleDescription(toOpen) {
    if (toOpen) {
      setDescriptionOpen(true)
    } else {
      setDescriptionOpen(false)
    }
  }

  return (
    <div className="description-container absolute w-full lg:w-[70%] bottom-full left-0 px-0  lg:px-12 z-[2]">
      {width > 1024
        ? <ProjectDescriptionBottom setPosition={setDescriptionPosition} setAnimateDescription={setAnimateDescription} key='desktop' project={project} />
        : <ProjectDescriptionTop setPosition={setDescriptionPosition} setAnimateDescription={setAnimateDescription} key='mobile' project={project} />}
    </div>)

}
