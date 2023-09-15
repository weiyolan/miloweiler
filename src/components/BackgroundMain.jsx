import React from 'react'
// import Image from 'next/image'
import { useState, useEffect } from "react"
// import { useAppContext } from "@utils/appContext"
import FadeDiv from './FadeDiv'
import SanityImage from './SanityImage'
import useLayoutEffect from '@/utils/useIsomorphicLayoutEffect'
import { gsap } from 'gsap/dist/gsap'

export default function BackgroundMain({ projects, type, priority, amount, height, className, animationName, setPageLoaded, objectPosition }) {
  let [mainImages, setMainImages] = useState(() => { let photos = []; projects.forEach((project) => {photos = [...photos, { image: project.mainImage.image, alt: project.mainImage.alt }]; project.otherImages.forEach((image)=>{photos=[...photos, {image:image}]})}); return photos })
  let [switched, setSwitched] = useState(false)

  useLayoutEffect(() => {
    function shuffle(array) {
      let currentIndex = array.length, randomIndex;
      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
    }
    // console.log(artProjects)

    let newMainImage = shuffle([...mainImages])
    newMainImage && setMainImages(newMainImage.slice(0, 1))
    setSwitched(true)
  }, [])




  return (
    <div style={{ transform: "translate3d(0, 0, 0)" }} className={`fixed w-full ${height ? height : 'h-screen'} ${animationName ? animationName : ''}  ${className ? className : ''}`} >
      <FadeDiv style={{ transform: "translate3d(0, 0, 0)" }} className={`w-full relative ${height ? height : 'h-full'} ${animationName ? animationName + 'Inner' : ''} `} type={type} amount={amount}>
        <div className={`w-full relative ${height ? height : 'h-full'}  bg-gradient-to-br from-[#16002c] to-[#000000] z-0 overflow-hidden`} >
          {/* <div className='flex w-full absolute top-0 h-[100vh] ' > */}
          {/* {console.log(height*(1+overflow)+'px')} */}
          {/* {console.log(`translate(-${Y}px,0)`)} */}
          {/* <Image alt={alt&&alt || 'beautiful background image'} fill priority={priority ? priority : false} src={src} style={{ transform: "translate3d(0, 0, 0)" }} /> */}
          {/* Empty ALT for purely decorative images */}

          {switched && <SanityImage alt={mainImages[0]?.alt || 'Beautiful picture shot by Milo Weiler.'}
            containerClass='rounded-none'
            className={`will-change-transform object-cover object-center  mainBackground opacity-0 ${objectPosition && objectPosition}`}
            sizes="100vw"
            // quality={90}
            image={mainImages[0].image}
            onLoadingComplete={()=>{gsap.to('.mainBackground',{opacity:1}); setPageLoaded(true) }}
            priority={priority ? priority : false} style={{ transform: "translate3d(0, 0, 0)" }} 
            fill />}
        </div>
      </FadeDiv>
    </div>
  )
}
