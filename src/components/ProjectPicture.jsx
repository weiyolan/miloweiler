import { useAppContext } from '@/utils/appContext'
import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import PictureIndicator from './PictureIndicator'
import useDimensions from '@/utils/useDimensions'
// import Link from 'next/link'


export default function ProjectPicture({ images, mainPictureHeight, setMainPictureWidth, visibleItem, handleVisibility, nextVisibility, prevVisibility, index }) {
  const { locale, width } = useAppContext()
  // const [clicked,setClicked] = useState(false)
  let projectPictureContainerRef = useRef(null)
  let { width: projectPictureContainerWidth } = useDimensions(projectPictureContainerRef)
  // console.log(projectPictureContainerWidth)

  useEffect(() => {
    setMainPictureWidth(projectPictureContainerWidth)
  })

  return (
    // <Link href={`./gallery/${project.slug.current}`}>
    <div ref={projectPictureContainerRef} style={{ height: width < 1024 ? mainPictureHeight || '50%' : '80vh' }} className={`project-picture-container relative flex justify-center w-full flex-1 select-none lg:mt-6  2xl:mt-8 min-[1900px]:mt-14 min-[2300px]:mt-28 min-[2500px]:mt-36`}>
      {/* <div style={{ backgroundColor: `${images[visibleItem.indexOf(true) || 0].asset.metadata.palette.darkMuted.background}` }} className={`absolute block blur-3xl opacity-80 rounded-full ${ar > 1 ? 'w-4/5 h-1/2' : 'w-1/2 h-4/5'} transition-all duration-1000 delay-[0.15] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] `} /> */}

      {images.map((image, i) => <MainPicture mainPictureHeight={mainPictureHeight} index={i} key={i} visible={visibleItem[i]} image={image} alt={`Project image ${i}`} prevVisibility={prevVisibility} nextVisibility={nextVisibility} />)}

      <div className=' group absolute left-0 bottom-0 flex items-center cursor-pointer w-1/2 lg:relative lg:w-[37%] h-[100%] lg:pt-1 z-[1]'
        // onClick={() => { if (visible) { prevVisibility() } }}>
        onClick={prevVisibility}>
        {width > 1024 && <AiFillCaretLeft className={`opacity-0 group-hover:opacity-30 transition duration-300 w-10 h-10 `}/>}
             </div>
      <div className='group absolute right-0 bottom-0 flex items-center justify-end cursor-pointer w-1/2 lg:relative lg:w-[37%] h-[100%] lg:pt-1 z-[1]'
        // onClick={() => { if (visible) { nextVisibility() } }}>
        onClick={nextVisibility}>
        {width > 1024 && <AiFillCaretRight className={`opacity-0 group-hover:opacity-30 transition duration-300 w-10 h-10 `}/>}
      </div>

      {/* <PictureIndicator setPosition={setIndicatorPosition} handleVisibility={handleVisibility} visibleItem={visibleItem} /> */}


    </div>
    // </Link>
  )
}

function MainPicture({ visible, image, alt, prevVisibility, nextVisibility, index, mainPictureHeight }) {
  let mainPicRef = useRef(null)
  let { width: pictureWidth, height, paddingLeft } = useDimensions(mainPicRef, { padding: true })
  let { width } = useAppContext()
  let ar = image.asset.metadata.dimensions.aspectRatio

  // index===6 && console.log(mainPictureHeight, (width-2*paddingLeft)/ar - 2)

  return (
    <div ref={mainPicRef} style={{ '--my-shadow-color': `${image.asset.metadata.palette.darkMuted.background}`, height: width < 1024 ? Math.min(mainPictureHeight, (pictureWidth - 2 * paddingLeft) / ar - 2) || '0' : '80vh' }}
      className={`absolute flex justify-center items-center max-w-[1500px] max-h-[80vh] w-full rounded-lg left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-2 pt-4 xs:px-4 md:px-32 lg:px-56 lg:m-0 `}>
      <SanityImage
        className={`mainPicture-${index} will-change-transform opacity-0 invisible shadow-2xl shadow-[var(--my-shadow-color)] `}
        sizes='(max-width: 700px) 95vw, 60vw'
        style={{ objectFit: 'contain', transform: 'translate3d(0,0,0)' }}
        image={image}
        alt={alt} />

    </div>
  )
}