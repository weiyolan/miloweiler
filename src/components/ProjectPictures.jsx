import React, { useEffect, useRef } from 'react'
import PictureThumb from './PictureThumb'
import { gsap } from "gsap";
import Draggable from 'gsap/dist/Draggable';
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useState } from 'react';
import { useAppContext } from '@/utils/appContext';
import { ReactLenis } from '@studio-freight/react-lenis';
gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(Draggable);
// gsap.registerPlugin();

export default function ProjectPictures({ images, handleVisibility, visibleItem }) {
  // console.log(images)
  let container = useRef()
  const { width } = useAppContext()
  // let [ctx, setCts] = useState(gsap.context(() => { }, container.current))
  const ctx = useRef(null);
  const grid = useRef(null);
  const tl = useRef(null);
  // let scrollTween = useRef()

  useEffect(() => {
    // console.log('context')
    ctx.current = gsap.context(() => {
      // gsap.to(grid.current,{opacity:1, duration: 2, delay:2});
      tl.current = gsap.timeline({scrollTrigger:{trigger:'.picture-thumb', scrub:1, horizontal:true}})
      .to('.picture-thumb', {stagger:0.2, scrub:1, scale:0.5})
      gsap.to(grid.current, {
        yPercent: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: grid.current,
          pin: true,
          scrub: 1,
          end: '+=3000'
        },
        onStart: () => console.log('started'),
      })
    });
    return () => ctx.current.revert();
  }, []);

  // useEffect(() => {
  //   Draggable.create(grid.current, {
  //     type:'x',
  //   })
  // }, [])

  return (
    // <ReactLenis root options={{}}>
      <div ref={container} className='project-pictures select-none w-full h-fit md:h-full flex md:w-[30%] relative p-1 md:items-start overflow-x-scroll md:overflow-y-scroll'>
        <div ref={grid} className='project-grid relative w-fit min-h-fit md:w-full z-0 grid opacity-1 grid-rows-1 grid-flow-col md:grid-flow-row md:grid-cols-2 '>
          {images.map((image, i) => (<PictureThumb row={width < 768} handleClick={() => handleVisibility(i)} visible={visibleItem[i]} image={image} index={i} key={i} alt={`Preview of picture ${i} of this project`} />))}
        </div>
      </div>
  //  </ReactLenis>
  )
}
