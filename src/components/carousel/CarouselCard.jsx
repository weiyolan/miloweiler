import React, { forwardRef, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import SanityImage from '@/components/SanityImage'

const CarouselCard = forwardRef(function CarouselCard({
  label,
  description,
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

        {/* Description legibility scrim (desktop only) */}
        {description && (
          <div
            className="hidden md:block absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-black/70 to-transparent rounded-l-sm md:rounded-l-md pointer-events-none"
            style={{
              opacity: showTitle ? 1 : 0,
              transition: showTitle ? 'opacity 0.5s ease-out 0.2s' : 'opacity 0.15s ease',
            }}
          />
        )}

        {/* Description */}
        {description && (
          <div
            className="absolute left-0 right-0 top-[120%] mt-4 px-5 md:px-0 md:left-10 md:right-auto md:top-auto md:bottom-[20%] md:max-w-[35%] md:mt-0"
            style={{
              opacity: showTitle ? 1 : 0,
              transform: showTitle ? 'translateY(0)' : 'translateY(12px)',
              transition: showTitle
                ? 'opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s'
                : 'opacity 0.15s ease, transform 0.15s ease',
            }}
          >
            <p className="border-l-2 border-foreground/40 pl-3 font-sans text-foreground/75 text-[11px] leading-snug md:text-sm md:leading-relaxed">
              {description}
            </p>
          </div>
        )}

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
          <div className="flex justify-between items-end ">
            <span className="font-mono text-xs md:text-sm text-foreground">
              {year}
            </span>
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-foreground font-bold text-right flex flex-wrap justify-end gap-x-[0.3em] translate-y-4">
              {label.split(' ').map((word, wi) => (
                <span key={wi} className="overflow-hidden pb-2 md:pb-6 inline-flex">
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
