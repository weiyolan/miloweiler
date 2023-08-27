
import React, { useState, useEffect } from 'react'
import { Observer } from 'gsap/dist/Observer'
import { gsap } from 'gsap/dist/gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { useRef } from 'react';
import { useAppContext } from './appContext';

gsap.registerPlugin(Observer, ScrollToPlugin);

export default function useMinimizeScroll() {
  // const [value, setValue] = useState(null);
  // if (key==='content') {console.log(value)}
  let { height: screenHeight } = useAppContext()
  let myObserver = useRef()
  let myObserver2 = useRef()
  let ctx = useRef(gsap.context(() => { }))

  useEffect(() => {
    myObserver2.current = Observer.create({
      preventDefault: true,
      target: window, //projectExpositionPage
      type: "touch",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
    }).disable()

    myObserver.current = Observer.create({
      // preventDefault: true,
      target: window, //projectExpositionPage
      // target: '.projectExpositionPage', //projectExpositionPage
      // ignore: '.ignore-swipe',       // can be any element (selector text is fine)
      type: "touch",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
      // tolerance: 20,
      onRelease: () => {
        // window.onscroll = function () {
        //   window.scrollTo(0, window.scrollY);
        // };
        // if (!myObserver.current.isDragging) {
        if (Math.abs(myObserver.current.velocityY) > 100) {
          // console.log('scrollStop', window.scrollY)
          // ctx.current.add(() => {
          gsap.to(window, {
            // overflow:'hidden',
            // preventDefault:true,
            scrollTo: () => {
              if (window.scrollY < 0.81 * screenHeight) {
                console.log(myObserver.current.velocityY < 0 ? (0.82 * screenHeight) : (0))
                return myObserver.current.velocityY < 0 ? (0.82 * screenHeight) : (0)
              }
              else if (window.scrollY < 1.81 * screenHeight) {
                console.log(myObserver.current.velocityY < 0 ? ((1 + 0.82 + 0.41) * screenHeight) : (0.41) * screenHeight)
                return myObserver.current.velocityY < 0 ? ((1 + 0.82 + 0.41) * screenHeight) : (0.41) * screenHeight
              }
              else if (window.scrollY < 2.81 * screenHeight) {
                console.log(myObserver.current.velocityY < 0 ? ((2 + 0.82 + 0.41) * screenHeight) : (1 + 0.41) * screenHeight)
                return myObserver.current.velocityY < 0 ? ((2 + 0.82 + 0.41) * screenHeight) : (1 + 0.41) * screenHeight
              }
              else if (window.scrollY < 3.81 * screenHeight) {
                console.log(myObserver.current.velocityY < 0 ? ((3 + 0.82 + 0.41) * screenHeight) : (2 + 0.41) * screenHeight)
                return myObserver.current.velocityY < 0 ? ((3 + 0.82 + 0.41) * screenHeight) : (2 + 0.41) * screenHeight
              }
              else if (window.scrollY < 4.81 * screenHeight) {
                console.log(myObserver.current.velocityY < 0 ? ((4 + 0.82 + 0.41) * screenHeight) : (3 + 0.41) * screenHeight)
                return myObserver.current.velocityY < 0 ? ((4 + 0.82 + 0.41) * screenHeight) : (3 + 0.41) * screenHeight
              }
              else if (window.scrollY > 4.81 * screenHeight) {
                console.log(myObserver.current.velocityY < 0 ? ((6) * screenHeight) : (4 + 0.41) * screenHeight)
                return myObserver.current.velocityY < 0 ? ((6) * screenHeight) : (4 + 0.41) * screenHeight
              }
            },
            duration: 1,
            // overwrite: true,
          })
        }
      },
      lockAxis: true,
    })


    return () => {
      myObserver.current.disable();
      ctx.current.revert()
      // observer2.disable();
    }
  }, [screenHeight])


  // useEffect(() => {
  //   console.log(myObserver.current?.isDragging)
  //   // console.log('velocity:' + myObserver.current?.velocityY)
  // }, [myObserver.current?.isDragging])

  // console.log('dragging:' + myObserver.current?.isDragging)
  // console.log('velocity:' + myObserver.current?.velocityY)

  return;
}