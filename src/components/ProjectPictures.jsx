import React, { useEffect, useRef } from 'react'
import PictureThumb from './PictureThumb'
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPictures({ images, handleVisibility }) {
  // console.log(images)
  let container = useRef()

  // let [ctx, setCts] = useState(gsap.context(() => { }, container.current))
  const ctx = useRef();
  const grid = useRef();
  // let scrollTween = useRef()

  useEffect(() => {
    // console.log('context')
    ctx.current = gsap.context(() => {
      gsap.to(grid.current,{opacity:1, duration: 2, delay:2});

      // gsap.to(grid.current, {
      //   yPercent: -100,
      //   ease: 'none',
      //   scrollTrigger: {
      //     trigger: grid.current,
      //     pin: true,
      //     scrub: 1,
      //     end: '+=3000'
      //   },
      //   onStart: () => console.log('started'),
      // })
    }); 
    return () => ctx.current.revert();
  }, []);

  // useEffect(() => {
  //   ctx.current.add(() => {
  //   })
  // }, [])

  return (
    <div ref={container} className='project-pictures select-none w-full h-full flex  md:w-[30%] relative pl-1 pr-12'>
      <div ref={grid} className='project-grid w-full relative z-0 grid gap-1 opacity-0 grid-cols-2 h-fit '>
        {images.map((image, i) => (<PictureThumb className={''} handleClick={() => handleVisibility(i)} image={image} index={i} key={i} alt={`Preview of picture ${i} of this project`} />))}
      </div>
    </div>
  )
}
