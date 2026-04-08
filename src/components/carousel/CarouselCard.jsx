import React, { forwardRef, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import SanityImage from '@/components/SanityImage'

const CarouselCard = forwardRef(function CarouselCard({
  label,
  image,
  alt,
  projectCount,
  year,
  index,
  href,
  isFront,
  titleVisible,
  onTransitionClick,
}, ref) {
  const router = useRouter()
  const localRef = useRef(null)
  const setRefs = useCallback((el) => {
    localRef.current = el
    if (typeof ref === 'function') ref(el)
    else if (ref) ref.current = el
  }, [ref])

  const showTitle = isFront && titleVisible

  function handleClick(e) {
    e.preventDefault()
    if (!isFront) return
    // Transition disabled — navigate directly
    router.push(href)
    // if (!onTransitionClick) return
    // const rect = localRef.current?.getBoundingClientRect()
    // if (!rect) return
    // onTransitionClick(
    //   { src: image.asset.url, lqip: image.asset?.metadata?.lqip, alt: alt || label },
    //   rect,
    //   href,
    // )
  }

  return (
    <div
      ref={setRefs}
      data-transition={isFront ? 'front-card' : 'non-front-card'}
      className="absolute inset-0 cursor-pointer"
      style={{ opacity: 0, visibility: 'hidden', backfaceVisibility: 'hidden', willChange: 'transform' }}
    >
      <a onClick={handleClick} className="block w-full h-full group">
        <div className="absolute inset-0 rounded-sm md:rounded-md overflow-hidden brightness-100 transition-[filter] duration-500 ease-out group-hover:brightness-110">
          <SanityImage
            image={image}
            fill
            blur
            sizes="(max-width: 768px) 90vw, 80vw"
            alt={alt || label}
            containerClass="rounded-none"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 rounded-sm md:rounded-md transition-opacity duration-500 group-hover:opacity-80" />

        {/* Metadata */}
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs md:text-sm text-foreground">
              {String(index).padStart(2, '0')}
            </span>
            <span className="font-mono text-xs md:text-sm text-foreground">
              {projectCount} {projectCount === 1 ? 'project' : 'projects'}
            </span>
          </div>
          <div className="flex justify-between items-end overflow-hidden">
            <span className="font-mono text-xs md:text-sm text-foreground">
              {year}
            </span>
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-foreground font-bold text-right leading-tight flex flex-wrap justify-end gap-x-[0.3em]">
              {label.split(' ').map((word, wi) => (
                <span key={wi} className="overflow-hidden py-4 inline-flex">
                  <span
                    style={{
                      display: 'inline-block',
                      opacity: showTitle ? 1 : 0,
                      transform: showTitle ? 'translateY(0)' : 'translateY(200%)',
                      transition: showTitle
                        ? `transform 0.5s ease-out ${0.1 + wi * 0.1}s`
                        : 'transform 0.15s ease',
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>
        </div>
      </a>
    </div>
  )
})

export default CarouselCard
