import React, { useEffect, useRef } from 'react'
import PictureThumb from './PictureThumb'
import { gsap } from "gsap/dist/gsap";
// import Draggable from 'gsap/dist/Draggable';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useState } from 'react';
import { useAppContext } from '@/utils/appContext';
// import { ReactLenis } from '@studio-freight/react-lenis';

gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(Draggable);
// gsap.registerPlugin();

export default function ProjectPictures({ images, handleVisibility, visibleItem }) {
  // console.log(images)
  let container = useRef(null)
  const { width } = useAppContext()
  // let [ctx, setCts] = useState(gsap.context(() => { }, container.current))
  const ctx = useRef(null);
  const grid = useRef(null);
  const tl = useRef(null);
  // let scrollTween = useRef()

  useEffect(() => {
    // tl.current = gsap.timeline({
    //   scrollTrigger: {
    //     scroller: container.current,
    //     trigger: grid.current,
    //     // end: '+=100%', 
    //     end: width < 768 ? 'right right' : 'bottom bottom',
    //     // pin:true,width < 768
    //     scrub: true,
    //     horizontal: width < 768,
    //     markers: false,
    //     invalidateOnRefresh: true
    //   }, onUpdate: () => console.log('start')
    // })
  }, [])

  useEffect(() => {
    // console.log('context')
    ctx.current = gsap.context(() => {
      // gsap.to(grid.current,{opacity:1, duration: 2, delay:2});
      //!!!!!!!!!!!! IMPLEMENTED IN THE THUMBNAIL ITSELF!!!!!!!!!!
      // gsap.utils.toArray(".picture-thumb").forEach((thumbnail, i) => {
      //   console.log(thumbnail.getAttribute('data-loaded'))
      //   // if (thumbnail.getAttribute('data-loaded') === 'true') {
      //   gsap.from(thumbnail, {
      //     scale: 0.5,
      //     opacity: 0,
      //     // duration: 0.5,
      //     // stagger: 0.5,
      //     ease: 'expo.out',
      //     scrollTrigger: {
      //       scroller: container.current,
      //       trigger: thumbnail,
      //       start: '-=49% bottom',
      //       // end:'bo'
      //       // endTrigger:window,
      //       // end: '+=100%', 
      //       end: width < 768 ? '+=49% right' : '+=49% bottom',
      //       end: '+=49% bottom',
      //       // pin:true,width < 768
      //       // scrub: 1,
      //       toggleActions: 'play reverse play reverse',
      //       horizontal: width < 768,
      //       markers: false,
      //       invalidateOnRefresh: true
      //     },
      //     // onStart: () => console.log('start')
      //   })
      //   // }
      // })
      // scrollTrigger:{ scrub: 2, horizontal:true, markers:false}
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
    }, container.current);
    return () => ctx.current.revert();
  }, []);

  // useEffect(() => {
  //   Draggable.create(grid.current, {
  //     type:'x',
  //   })
  // }, [])

  return (
    // <ReactLenis root options={{}}> overscroll-x-contain md:overscroll-y-contain
    <div ref={container} className='relative flex project-pictures select-none w-full min-h-fit md:h-full  md:w-[30%]  p-0 md:p-1 md:items-start overflow-x-scroll overflow-y-hidden md:overflow-x-hidden md:overflow-y-scroll'>
      <div ref={grid} className=' project-grid relative w-fit h-fit md:w-full z-0 grid opacity-1 grid-rows-1 grid-flow-col md:grid-flow-row md:grid-cols-2 '>
        {images.map((image, i) => (<PictureThumb containerRef={container} row={width < 768} handleClick={() => handleVisibility(i)} visible={visibleItem[i]} image={image} index={i} key={i} alt={`Preview of picture ${i} of this project`} />))}
      </div>
    </div>
    //  </ReactLenis>
  )
}
