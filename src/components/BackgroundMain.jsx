import React from 'react'
// import Image from 'next/image'
import { useState, useEffect } from "react"
// import { useAppContext } from "@utils/appContext"
import FadeDiv from './FadeDiv'
import SanityImage from './SanityImage'
import useLayoutEffect from '@/utils/useIsomorphicLayoutEffect'
import { gsap } from 'gsap/dist/gsap'

export default function BackgroundMain({ projects, images, type, priority, amount, height, className, animationName, setPageLoaded, objectPosition }) {
  // let [mainImage, setMainImage] = useState(() => {
  //   let photos = [];
  //   projects.forEach((project) => {
  //     if (project.mainImage.image.asset.titleColor === '#FFF') { photos = [...photos, { image: project.mainImage.image, alt: project.mainImage.alt }] };
  //     project.otherImages.filter((image) => image.asset.titleColor === '#FFF').forEach((image) => {
  //       photos = [...photos, { image: image }]
  //     })
  //   });
  //   return photos
  // })
  let [mainImage, setMainImage] = useState(0)

  let [switched, setSwitched] = useState(false)

  // useLayoutEffect(() => {
  //   function shuffle(array) {
  //     let currentIndex = array.length, randomIndex;
  //     // While there remain elements to shuffle.
  //     while (currentIndex != 0) {
  //       // Pick a remaining element.
  //       randomIndex = Math.floor(Math.random() * currentIndex);
  //       currentIndex--;
  //       // And swap it with the current element.
  //       [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  //     }
  //     return array;
  //   }
  //   // console.log(artProjects)
  //   let initialImages = [];
  //   // console.log('projects', projects)
  //   projects.forEach((project) => {
  //     initialImages = project.mainImage.image.asset.titleColor === '#fff' ? [...initialImages, { image: project.mainImage.image, alt: project.mainImage.alt }] : [...initialImages];
  //     project.otherImages.forEach((image) => {
  //       initialImages = image.asset.titleColor === '#fff' ? [...initialImages, { image: project.mainImage.image, alt: project.mainImage.alt }] : [...initialImages];
  //     })
  //   });

  //   let newMainImage = shuffle([...initialImages])

  //   newMainImage && setMainImage(newMainImage.slice(0, 1))
  //   // newMainImage && console.log(newMainImage.slice(0, 1))
  //   setSwitched(true)
  // }, [projects])
  useLayoutEffect(() => {
    setMainImage(Math.floor(Math.random() * images.length))
  // console.log(images.length)
    setSwitched(true)
    // console.log('images[mainImage]', images[mainImage])
  }, [images])


  return (
    <div style={{ transform: "translate3d(0, 0, 0)" }} className={`fixed w-full ${height ? height : 'h-screen'} ${animationName ? animationName : ''}  ${className ? className : ''}`} >
      <FadeDiv style={{ transform: "translate3d(0, 0, 0)" }} className={`w-full relative ${height ? height : 'h-full'} ${animationName ? animationName + 'Inner' : ''} `} type={type} amount={amount}>
        <div className={`w-full relative ${height ? height : 'h-full'}  bg-gradient-to-br from-[#16002c] to-[#000000] z-0 overflow-hidden`} >
          {switched && <SanityImage alt={mainImage[0]?.alt || 'Beautiful picture shot by Milo Weiler.'}
            containerClass='rounded-none'
            className={`will-change-transform object-cover object-center  mainBackground opacity-0 ${objectPosition && objectPosition}`}
            sizes="100vw"
            quality={100}
            image={images[mainImage]}
          // image={mainImage[0].image}
            onLoadingComplete={() => { gsap.to('.mainBackground', { opacity: 1 }); setPageLoaded(true) }}
            priority={priority ? priority : false} style={{ transform: "translate3d(0, 0, 0)" }}
            fill />}
        </div>
      </FadeDiv>
    </div>
  )
}
