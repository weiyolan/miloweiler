import { useAppContext } from '@/utils/appContext'
import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import useDimensions from '@/utils/useDimensions'
import ZoomableImage from './ZoomableImage'


export default function ProjectPicture({ images, setMainPictureWidth, visibleItem, nextVisibility, prevVisibility, onZoomActiveChange, open }) {
  const { width, locale } = useAppContext()
  let projectPictureContainerRef = useRef(null)
  let { width: projectPictureContainerWidth } = useDimensions(projectPictureContainerRef)
  const [loaded, setLoaded] = useState(1)
  const [focus, setFocus] = useState(false) // zoom/focus mode is opt-in
  const [zoomed, setZoomed] = useState(false)
  const zoomApi = useRef(null)
  const activeIndex = visibleItem ? visibleItem.indexOf(true) : 0

  useEffect(() => {
    setMainPictureWidth(projectPictureContainerWidth)
  }, [loaded])

  useEffect(() => {
    setLoaded(2)
  }, [])

  // Exit focus mode when moving to another photo OR when the carousel closes, so
  // it never reopens still zoomed (and the suspended swipe-nav is released).
  useEffect(() => { setFocus(false) }, [activeIndex])
  useEffect(() => { if (!open) setFocus(false) }, [open])

  // Tell the carousel/page to suspend swipe-to-navigate + drag-to-dismiss while
  // focusing, so the whole screen is dedicated to zoom/pan.
  useEffect(() => { onZoomActiveChange && onZoomActiveChange(focus) }, [focus]) // eslint-disable-line react-hooks/exhaustive-deps

  const t = (en, fr, nl) => (locale === 'fr' ? fr : locale === 'nl' ? nl : en)

  return (
    <div ref={projectPictureContainerRef} className={`project-picture-container relative flex justify-center w-full h-full md:w-4/5  min-[2000px]:w-3/5 flex-1 mx-auto select-none  `}>

      {images.map((image, i) => (
        <ZoomableImage
          key={i}
          ref={i === activeIndex ? zoomApi : null}
          active={i === activeIndex}
          focus={focus}
          ar={image?.asset?.metadata?.dimensions?.aspectRatio}
          onZoomChange={setZoomed}
        >
          <MainPicture index={i} image={image} alt={`Project image ${i}`} />
        </ZoomableImage>
      ))}

      {/* Standard navigation — only when NOT focusing, so it is never interfered
          with: tap/click either half to move, hover arrows on desktop. */}
      {!focus && (
        <>
          <div role="button" tabIndex={0}
            aria-label={t('Previous image', 'Image précédente', 'Vorige afbeelding')}
            className=' group absolute left-0 bottom-0 flex items-center cursor-pointer w-1/2 lg:relative lg:w-[37%] xl:w-[50%] h-[100%] lg:pt-1 z-[1] focus:outline-none'
            onClick={prevVisibility}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); prevVisibility() } }}>
            {width > 1024 && <AiFillCaretLeft className={`opacity-0 group-hover:opacity-30 transition duration-300 w-10 h-10 `} />}
          </div>
          <div role="button" tabIndex={0}
            aria-label={t('Next image', 'Image suivante', 'Volgende afbeelding')}
            className='group absolute right-0 bottom-0 flex items-center justify-end cursor-pointer w-1/2 lg:relative lg:w-[37%] xl:w-[50%] h-[100%] lg:pt-1 z-[1] focus:outline-none'
            onClick={nextVisibility}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nextVisibility() } }}>
            {width > 1024 && <AiFillCaretRight className={`opacity-0 group-hover:opacity-30 transition duration-300 w-10 h-10 `} />}
          </div>
        </>
      )}

      {/* Focus / zoom controls for the active photo. Sit above everything so they
          stay clickable over the navigation halves. */}
      <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-[5] flex flex-col items-center gap-1.5 pointer-events-auto">
        {!focus ? (
          <Ctl label={t('Zoom this photo', 'Agrandir la photo', 'Foto vergroten')} onClick={() => setFocus(true)}>
            <circle cx="9" cy="9" r="6" /><line x1="9" y1="6.5" x2="9" y2="11.5" /><line x1="6.5" y1="9" x2="11.5" y2="9" /><line x1="13.5" y1="13.5" x2="18.5" y2="18.5" />
          </Ctl>
        ) : (
          <>
            <Ctl label={t('Zoom in', 'Agrandir', 'Inzoomen')} onClick={() => zoomApi.current?.zoomIn()}>
              <line x1="11" y1="6" x2="11" y2="16" /><line x1="6" y1="11" x2="16" y2="11" />
            </Ctl>
            <Ctl label={t('Zoom out', 'Réduire', 'Uitzoomen')} onClick={() => zoomApi.current?.zoomOut()}>
              <line x1="6" y1="11" x2="16" y2="11" />
            </Ctl>
            <Ctl label={t('Reset zoom', 'Réinitialiser', 'Zoom herstellen')} onClick={() => zoomApi.current?.reset()} disabled={!zoomed}>
              <path d="M7 4 H4 V7" /><path d="M15 4 H18 V7" /><path d="M7 18 H4 V15" /><path d="M15 18 H18 V15" />
            </Ctl>
            <Ctl label={t('Exit zoom', 'Quitter le zoom', 'Zoom sluiten')} onClick={() => setFocus(false)} active>
              <line x1="5.5" y1="5.5" x2="16.5" y2="16.5" /><line x1="16.5" y1="5.5" x2="5.5" y2="16.5" />
            </Ctl>
          </>
        )}
      </div>
    </div>
  )
}

function Ctl({ children, label, onClick, disabled, active }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center w-9 h-9 rounded-full backdrop-blur-sm border transition
        ${active ? 'bg-foreground text-background border-foreground' : 'bg-background/70 text-foreground border-foreground/15'}
        ${disabled ? 'opacity-30 cursor-default' : 'opacity-80 hover:opacity-100 active:scale-95'}`}
    >
      <svg viewBox="0 0 22 22" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </button>
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
