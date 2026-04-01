import React, { forwardRef } from 'react'
import Link from 'next/link'
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
}, ref) {
  const showTitle = isFront && titleVisible
  return (
    <div
      ref={ref}
      className="absolute inset-0 cursor-pointer"
      style={{ backfaceVisibility: 'hidden', willChange: 'transform' }}
    >
      <Link href={href} className="block w-full h-full group">
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
        <div className="absolute inset-0 p-5 md:p-7 flex flex-col justify-between">
          <div
            className="flex justify-between items-start"
            style={{
              opacity: showTitle ? 1 : 0,
              transition: showTitle ? 'opacity 0.5s ease 0.1s' : 'opacity 0.15s ease',
            }}
          >
            <span className="font-mono text-xs md:text-sm text-white/70">
              {String(index).padStart(2, '0')}
            </span>
            <span className="font-mono text-xs md:text-sm text-white/70">
              {projectCount} {projectCount === 1 ? 'project' : 'projects'}
            </span>
          </div>
          <div className="flex justify-between items-end overflow-hidden">
            <span
              className="font-mono text-xs md:text-sm text-white/70"
              style={{
                opacity: showTitle ? 1 : 0,
                transition: showTitle ? 'opacity 0.5s ease 0.1s' : 'opacity 0.15s ease',
              }}
            >
              {year}
            </span>
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white font-bold text-right leading-tight flex flex-wrap justify-end gap-x-[0.3em]">
              {label.split(' ').map((word, wi) => (
                <span key={wi} className="overflow-hidden py-2 inline-flex">
                  <span
                    style={{
                      display: 'inline-block',
                      opacity: showTitle ? 1 : 0,
                      transform: showTitle ? 'translateY(0)' : 'translateY(120%)',
                      transition: showTitle
                        ? `transform 0.5s ease ${0.15 + wi * 0.3}s`
                        : 'transform 0.2s ease',
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  )
})

export default CarouselCard
