import { useAppContext } from '@/utils/appContext'
import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import useDimensions from '@/utils/useDimensions'
import ZoomableImage from './ZoomableImage'


export default function ProjectPicture({ images, mainPictureHeight, setMainPictureWidth, visibleItem, handleVisibility, nextVisibility, prevVisibility, onZoomActiveChange }) {
  const { width, locale } = useAppContext()
  let projectPictureContainerRef = useRef(null)
  let { width: projectPictureContainerWidth } = useDimensions(projectPictureContainerRef)
  const [loaded, setLoaded] = useState(1)
  const activeIndex = visibleItem ? visibleItem.indexOf(true) : 0
  useEffect(() => {
    setMainPictureWidth(projectPictureContainerWidth)
  }, [loaded])

  useEffect(() => {
    setLoaded(2)
  }, [])

  return (
    <div ref={projectPictureContainerRef} className={`group project-picture-container relative flex justify-center w-full h-full md:w-4/5  min-[2000px]:w-3/5 flex-1 mx-auto select-none  `}>

      {images.map((image, i) => (
        <ZoomableImage
          key={i}
          active={i === activeIndex}
          ar={image?.asset?.metadata?.dimensions?.aspectRatio}
          onZoomChange={onZoomActiveChange}
          onNavigate={(dir) => (dir === 'prev' ? prevVisibility() : nextVisibility())}
        >
          <MainPicture index={i} image={image} alt={`Project image ${i}`} />
        </ZoomableImage>
      ))}

      {/* Desktop navigation arrows (tap-to-navigate on touch is handled inside the
          zoom layer). Sit above the zoom layer so edge clicks always navigate. */}
      {width > 1024 && (
        <>
          <button
            type="button"
            aria-label={locale === 'fr' ? 'Image précédente' : locale === 'nl' ? 'Vorige afbeelding' : 'Previous image'}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-[4] flex items-center pl-2 pr-6 py-10 cursor-pointer focus:outline-none"
            onClick={prevVisibility}
          >
            <AiFillCaretLeft className="opacity-0 group-hover:opacity-30 hover:!opacity-60 transition duration-300 w-10 h-10" />
          </button>
          <button
            type="button"
            aria-label={locale === 'fr' ? 'Image suivante' : locale === 'nl' ? 'Volgende afbeelding' : 'Next image'}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-[4] flex items-center pr-2 pl-6 py-10 cursor-pointer focus:outline-none"
            onClick={nextVisibility}
          >
            <AiFillCaretRight className="opacity-0 group-hover:opacity-30 hover:!opacity-60 transition duration-300 w-10 h-10" />
          </button>
        </>
      )}
    </div>
  )
}

function MainPicture({ image, alt, index }) {
  return (
    <SanityImage
      className={`mainPicture-${index} will-change-transform opacity-0 invisible drop-shadow-[0_20px_38px_rgba(0,0,0,0.45)] `} // box-shadow ignores object-fit letterboxing on portrait images; drop-shadow follows the rendered pixels
      sizes='(max-width: 700px) 95vw, 60vw'
      // width/height:auto + max 100% makes the image itself the contained element so it never exceeds the 80vh / 1500px box
      style={{ objectFit: 'contain', transform: 'translate3d(0,0,0)', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
      image={image}
      alt={alt} />
  )
}
