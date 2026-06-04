import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import { gsap } from 'gsap/dist/gsap'
import Spinner from './Spinner'

export default function PictureThumb({ image, alt, visible, handleClick, index, className }) {
  let [loaded, setLoaded] = useState(false)
  const thumbRef = useRef(null)
  const ctx = useRef(gsap.context(() => { }))

  useEffect(() => () => ctx.current.revert(), [])

  // Active thumb lifts up. Driven by GSAP (not CSS) so it composes with the
  // hover scale below — both are transforms on the same element.
  useEffect(() => {
    ctx.current.add(() => {
      gsap.to(thumbRef.current, { y: visible ? -6 : 0, duration: 0.5, ease: 'power1.inOut' })
    })
  }, [visible])

  // Poppy scale on hover/press for a bigger preview.
  const pop = (scale, ease = 'back.out(2)') => ({ currentTarget }) =>
    gsap.to(currentTarget, { scale, duration: 0.35, ease, overwrite: 'auto' })

  return (
    <div
      ref={thumbRef}
      id={`pictureThumb${index}`}
      className={`picture-thumb relative flex select-none cursor-pointer w-fit h-fit outline-none will-change-transform
      before:block before:w-14 mobm:before:w-20 lg:before:w-24 before:pt-[100%] ${className ? className : ''}`}
      onClick={handleClick}
      onMouseEnter={pop(1.18)}
      onMouseLeave={pop(1, 'power3.out')}
      onMouseDown={pop(0.95, 'power2.out')}
      onMouseUp={pop(1.18)}>
      <div className='absolute w-full h-full top-0 left-0'>
        <SanityImage onLoad={() => setLoaded(true)} print={!index} blur quality={30} sizes='(max-width: 700px) 20vw, 13vw' fill containerClass={'rounded-none'} image={image} alt={alt} />
      </div>
      {!loaded && <Spinner cube className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />}
    </div>
  )
}
