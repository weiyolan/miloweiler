import React, { useState, useEffect } from "react";

export default function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    mobileHeight: undefined,
  });


  function handleResize() {
    // Set window width/height to state

    //   console.log(windowSize.height)
    //   console.log(mobileSize.mobileHeight)
    //   console.log(window.clientHeight)

    setWindowSize((prevSize) =>
      prevSize.height > window.innerHeight
        ? {
          width: window.innerWidth,
          height: window.innerHeight,
          mobileHeight: prevSize.height,
        }
        : {
          width: window.innerWidth,
          height: window.innerHeight,
          mobileHeight: window.innerHeight,
        });
  }

  // useEffect(()=>{
  //   console.log(windowSize)
  // },[windowSize])

  // function handleResize() {
  //   // Set window width/height to state
  //   setWindowSize({
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //   });
  // }

  useEffect(() => {
    let timeoutId;
    function debouncedResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 200);
    }

    window.addEventListener("resize", debouncedResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}