import React, { useState, useEffect, useCallback } from "react";
import { gsap } from "gsap/dist/gsap";

export default function useWindowResize({ options }) {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    // mobileHeight: undefined,
  });
  useEffect(() => {

    function updateWindowSize() {
      // console.log('update window size')
      // setWindowSize((prevSize) =>
      //   prevSize.height > window.innerHeight
      //     ? {
      //       width: window.innerWidth,
      //       height: window.innerHeight,
      //       mobileHeight: prevSize.height,
      //     }
      //     : {
      //       width: window.innerWidth,
      //       height: window.innerHeight,
      //       mobileHeight: window.innerHeight,
      //     });
      // console.log(window.innerHeight)
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    //   console.log(windowSize.height)
    //   console.log(mobileSize.mobileHeight)
    //   console.log(window.clientHeight)

    // let handleResize = useCallback(() => {
    function handleResize() {
      // console.log(Math.abs(windowSize.width))
      // console.log(Math.abs(windowSize.height - window.innerHeight) >= 100 || Math.abs(windowSize.width - window.innerWidth) >= 100)
      // IF REAL RESIZE 
      console.log(windowSize)
      if (Math.abs(windowSize.height - window.innerHeight) >= 100 || Math.abs(windowSize.width - window.innerWidth) >= 100) {
        options?.resize && gsap.to(window, { scrollTo: 0 })
        // options?.resize && location.reload()
        options?.resize && console.log('resize')
        // options?.resize && console.log('options: true')
        updateWindowSize()
      }
      else {
        updateWindowSize()
      }
    }
    // }, [windowSize.height])


    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return;
}