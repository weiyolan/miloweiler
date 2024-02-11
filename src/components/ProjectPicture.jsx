import { useAppContext } from '@/utils/appContext'
import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import PictureIndicator from './PictureIndicator'
import useDimensions from '@/utils/useDimensions'
// import Link from 'next/link'


export default function ProjectPicture({ images, mainPictureHeight, setMainPictureWidth, visibleItem, handleVisibility, nextVisibility, prevVisibility, index }) {
  const { width } = useAppContext()
  // const [clicked,setClicked] = useState(false)
  let projectPictureContainerRef = useRef(null)
  let { width: projectPictureContainerWidth } = useDimensions(projectPictureContainerRef)
  // console.log(projectPictureContainerWidth)
  const [loaded, setLoaded] = useState(1)
  useEffect(() => {
    setMainPictureWidth(projectPictureContainerWidth)
  }, [loaded])

  useEffect(() => {
    setLoaded(2)
  }, [])

  return (
    // <Link href={`./gallery/${project.slug.current}`}>
    <div ref={projectPictureContainerRef} style={{}} className={`project-picture-container relative flex justify-center w-full h-full md:w-4/5 lg:w-1/2 min-[2000px]:w-3/5 flex-1 mx-auto select-none  `}>
      {/* <div style={{ backgroundColor: `${images[visibleItem.indexOf(true) || 0].asset.metadata.palette.darkMuted.background}` }} className={`absolute block blur-3xl opacity-80 rounded-full ${ar > 1 ? 'w-4/5 h-1/2' : 'w-1/2 h-4/5'} transition-all duration-1000 delay-[0.15] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] `} /> */}

      {images.map((image, i) => <MainPicture index={i} key={i} image={image} alt={`Project image ${i}`} />)}

      <div className=' group absolute left-0 bottom-0 flex items-center cursor-pointer w-1/2 lg:relative lg:w-[37%] xl:w-[50%] h-[100%] lg:pt-1 z-[1]'
        // onClick={() => { if (visible) { prevVisibility() } }}>
        onClick={prevVisibility}>
        {width > 1024 && <AiFillCaretLeft className={`opacity-0 group-hover:opacity-30 transition duration-300 w-10 h-10 `}/>}
             </div>
      <div className='group absolute right-0 bottom-0 flex items-center justify-end cursor-pointer w-1/2 lg:relative lg:w-[37%] xl:w-[50%] h-[100%] lg:pt-1 z-[1]'
        // onClick={() => { if (visible) { nextVisibility() } }}>
        onClick={nextVisibility}>
        {width > 1024 && <AiFillCaretRight className={`opacity-0 group-hover:opacity-30 transition duration-300 w-10 h-10 `}/>}
      </div>

      {/* <PictureIndicator setPosition={setIndicatorPosition} handleVisibility={handleVisibility} visibleItem={visibleItem} /> */}


    </div>
    // </Link>
  )
}

function MainPicture({ image, alt, index }) {
  let mainPicRef = useRef(null)
  // let { width: pictureWidth, height, paddingLeft } = useDimensions(mainPicRef, { padding: true })
  // let { width } = useAppContext()
  // let ar = image.asset.metadata.dimensions.aspectRatio

  // index===6 && console.log(mainPictureHeight, (width-2*paddingLeft)/ar - 2)

  return (
    <div ref={mainPicRef}
      className={`absolute flex justify-center items-center max-w-[1500px] max-h-[80vh] w-full h-full px-2 xs:px-4 `}>
      <SanityImage
        className={`mainPicture-${index} will-change-transform opacity-0 invisible shadow-2xl shadow-black/50 `} // shadow-[var(--my-shadow-color)]
        sizes='(max-width: 700px) 95vw, 60vw'
        style={{ objectFit: 'contain', transform: 'translate3d(0,0,0)' }}
        image={image}
        alt={alt} />

    </div>
  )
}