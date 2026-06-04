import React, { useEffect, useRef } from 'react'
import PictureThumb from './PictureThumb'
import { gsap } from 'gsap/dist/gsap'
import { useAppContext } from '@/utils/appContext'
import { horizontalLoop } from '@/utils/horizontalLoopCenter'

export default function ProjectPictures({ images, handleVisibility, visibleItem }) {
  const container = useRef(null)
  const loopRef = useRef(null)
  const { width } = useAppContext()
  const activeIndex = visibleItem ? visibleItem.indexOf(true) : 0

  // Seamless infinite loop, but only when the thumbnails actually overflow the
  // container — otherwise a static centered row reads better. Rebuilt on breakpoint
  // changes (thumb sizes change) and when the image count changes.
  useEffect(() => {
    const cont = container.current
    if (!cont) return
    const raf = requestAnimationFrame(() => {
      const items = gsap.utils.toArray(cont.querySelectorAll('.picture-thumb'))
      if (items.length < 2) return
      const totalW = items.reduce((s, el) => s + el.offsetWidth, 0) + (items.length - 1) * 4
      if (totalW <= cont.offsetWidth + 4) return // not enough to loop -> static centered
      // The loop needs normal left-aligned offsets; justify-center (used for the static
      // case) gives overflowing flex items odd offsetLeft values that break its math.
      cont.classList.remove('justify-center')
      // No horizontal Draggable: it fights the sheet's vertical drag-to-dismiss. The
      // loop is driven by click-to-center + arrow keys, wrapping seamlessly both ways.
      const loop = horizontalLoop(items, { paused: true, center: cont })
      loopRef.current = loop
      loop.toIndex(activeIndex, { duration: 0 })
    })
    return () => {
      cancelAnimationFrame(raf)
      const l = loopRef.current
      if (l) {
        l.draggable && l.draggable.kill()
        l.kill()
      }
      loopRef.current = null
      cont.classList.add('justify-center')
      const items = cont.querySelectorAll('.picture-thumb')
      gsap.set(items, { clearProps: 'x,xPercent' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, images.length])

  // Center the active thumbnail whenever the selection changes. Resync the loop's
  // internal index to the real playhead first so repeated/wrap-around moves don't drift.
  useEffect(() => {
    const loop = loopRef.current
    if (!loop) return
    loop.closestIndex(true)
    loop.toIndex(activeIndex, { duration: 0.55, ease: 'power3.out' })
  }, [activeIndex])

  return (
    <div
      ref={container}
      data-lenis-prevent
      data-clickable="true"
      className="project-pictures relative flex justify-center w-full h-fit overflow-hidden select-none py-1 gap-1">
      {images.map((image, i) => (
        <PictureThumb
          handleClick={() => handleVisibility(i)}
          visible={visibleItem[i]}
          image={image}
          index={i}
          key={i}
          alt={`Preview of picture ${i} of this project`}
        />
      ))}
    </div>
  )
}
