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
}, ref) {
  return (
    <div
      ref={ref}
      className="absolute inset-0 cursor-pointer"
      style={{ backfaceVisibility: 'hidden', willChange: 'transform' }}
    >
      <Link href={href} className="block w-full h-full">
        <SanityImage
          image={image}
          fill
          blur
          sizes="(max-width: 768px) 90vw, 65vw"
          alt={alt || label}
          containerClass="rounded-lg"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 rounded-lg" />

        {/* Metadata */}
        <div className="absolute inset-0 p-5 md:p-7 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs md:text-sm text-white/70">
              {String(index).padStart(2, '0')}
            </span>
            <span className="font-mono text-xs md:text-sm text-white/70">
              {projectCount} {projectCount === 1 ? 'project' : 'projects'}
            </span>
          </div>
          <div className="flex justify-between items-end">
            <span className="font-mono text-xs md:text-sm text-white/70">
              {year}
            </span>
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white font-bold text-right leading-tight">
              {label}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  )
})

export default CarouselCard
