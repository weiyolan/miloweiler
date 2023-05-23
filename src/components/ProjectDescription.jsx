import { useAppContext } from '@/utils/appContext'
import { usePageContext } from '@/utils/pageContext'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import ProjectDescriptionTop from './ProjectDescriptionTop'
import ProjectDescriptionBottom from './ProjectDescriptionBottom'
import { Observer } from 'gsap/dist/Observer'
// import useDimensions from '@/utils/useDimensions'
gsap.registerPlugin(Observer)

export default function ProjectDescription({ project, setPosition , mainPictureWidth}) {
  let [animateDescription, setAnimateDescription] = useState(false)
  const { width } = useAppContext()
  const { setDescriptionOpen, descriptionOpen } = usePageContext()
  let [descriptionPosition, setDescriptionPosition] = useState(undefined)


  useEffect(() => {
    // console.log(descriptionPosition?.bottom)
    setPosition(descriptionPosition)
  }, [descriptionPosition])

  useEffect(() => {
    let observer1 = Observer.create({
      preventDefault: false,
      target: window,
      ignore: ['.ignore-swipe'],       // can be any element (selector text is fine)
      type: "touch",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      // tolerance:10,
      onDown: (e) => {
        // e.preventDefault();
        // console.log(e)
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
      lockAxis: true,
    })

    // let observer2 = Observer.create({
    //   preventDefault: false,
    //   target: window,
    //   ignore: ['.ignore-swipe'],       // can be any element (selector text is fine)
    //   type: "touch, pointer",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      // tolerance:10,
      // onUp: () => {
      //   //  console.log(animateDescription); 
      //   if (animateDescription) return;
      //   //  console.log('up'); 
      //   setAnimateDescription(true);
      //   toggleDescription(width < 1024 ? false : true)
      // },
      // onDownParams:[animateDescription],
      // onUpParams:[animateDescription],
      // lockAxis: true,
    // })
    return () => {
      observer1.disable();
      // observer2.disable();
    }
  }, [project,setPosition])

  function toggleDescription(toOpen) {
    if (toOpen) {
      setDescriptionOpen(true)
    } else {
      setDescriptionOpen(false)
    }
  }

  return (
    <div style={{width: width<1024?'100%':mainPictureWidth}} className="description-container absolute bottom-full lg:top-full lg:px-20 left-0  z-[2]">
      {width > 1024
        ? <ProjectDescriptionBottom setPosition={setDescriptionPosition} setAnimateDescription={setAnimateDescription} key='desktop' project={project} />
        // ? <ProjectDescriptionBottom setPosition={setDescriptionPosition} setAnimateDescription={setAnimateDescription} key='desktop' project={project} />
        : <ProjectDescriptionTop setPosition={setDescriptionPosition} setAnimateDescription={setAnimateDescription} key='mobile' project={project} />}
    </div>)

}
