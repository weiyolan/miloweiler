import { useAppContext } from '@/utils/appContext'
import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import PictureIndicator from './PictureIndicator'
import useDimensions from '@/utils/useDimensions'
// import Link from 'next/link'


export default function ProjectPicture({ images, mainPictureHeight, visibleItem, handleVisibility, nextVisibility, prevVisibility, index }) {
  const { locale } = useAppContext()

  return (
    // <Link href={`./gallery/${project.slug.current}`}>
    <div style={{ height: mainPictureHeight || '50%' }} className={`project-picture-container relative lg:w-[70%] flex lg:px-14 select-none`}>

      {/* <div style={{ backgroundColor: `${images[visibleItem.indexOf(true) || 0].asset.metadata.palette.darkMuted.background}` }} className={`absolute block blur-3xl opacity-80 rounded-full ${ar > 1 ? 'w-4/5 h-1/2' : 'w-1/2 h-4/5'} transition-all duration-1000 delay-[0.15] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] `} /> */}

      {images.map((image, i) => <MainPicture mainPictureHeight={mainPictureHeight} index={i} key={i} visible={visibleItem[i]} image={image} alt={`Project image ${i}`} prevVisibility={prevVisibility} nextVisibility={nextVisibility} />)}

      <div className=' absolute left-0 bottom-0 flex items-center  cursor-pointer  w-1/2 h-[100%] pt-1 z-[1]'
        // onClick={() => { if (visible) { prevVisibility() } }}>
        onClick={prevVisibility}>
      </div>
      <div className='absolute right-0 bottom-0 flex items-center  cursor-pointer w-1/2 h-[100%] pt-1 z-[1]'
        // onClick={() => { if (visible) { nextVisibility() } }}>
        onClick={nextVisibility}>
      </div>


    </div>
    // </Link>
  )
}

function MainPicture({ visible, image, alt, prevVisibility, nextVisibility, index, mainPictureHeight }) {
  let mainPicRef = useRef(null)
  let {width, height, paddingLeft} = useDimensions(mainPicRef,{padding:true})

  let ar = image.asset.metadata.dimensions.aspectRatio

  index===6 && console.log(mainPictureHeight, (width-2*paddingLeft)/ar - 2)

  return (
    <div ref={mainPicRef} style={{ '--my-shadow-color': `${image.asset.metadata.palette.darkMuted.background}`, height: Math.min(mainPictureHeight, (width-2*paddingLeft)/ar - 2) || '0'}}
      className={`absolute flex justify-center items-center max-w-[1000px] w-full lg:w-[50vw] rounded-lg top-1/2 -translate-y-1/2  mt-4 md:px-32 xs:px-4 px-2 left-1/2 -translate-x-1/2  `}>
      <SanityImage
        className={` mainPicture-${index}  will-change-transform opacity-0 invisible shadow-2xl shadow-[var(--my-shadow-color)] `}
        sizes='(max-width: 700px) 95vw, (max-width: 1500px) 50vw, 33vw'
        style={{ objectFit: 'contain', transform: 'translate3d(0,0,0)' }}
        image={image}
        alt={alt} />

    </div>
  )
}