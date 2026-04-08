import React, { useEffect, useRef, useState } from 'react'
import SanityImage from './SanityImage'
import Link from 'next/link'
import { useAppContext } from '@/utils/appContext'
import { formatCredits } from '@/utils/formatCredits'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectRow({ project, index, categorySlug, onMouseEnter, onMouseLeave }) {
  const { locale } = useAppContext()
  const [loaded, setLoaded] = useState(false)
  const rowRef = useRef(null)
  const ctx = useRef(gsap.context(() => {}))

  useEffect(() => {
    return () => ctx.current.revert()
  }, [])

  useEffect(() => {
    if (loaded && rowRef.current) {
      ctx.current.add(() => {
        gsap.to(rowRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: 'expo.out',
          scrollTrigger: {
            scroller: window,
            trigger: rowRef.current,
            start: '+=10% bottom',
            end: '90% top',
            toggleActions: 'play reverse play reverse',
            invalidateOnRefresh: true,
          },
        })
      })
    }
  }, [loaded])

  const isEven = index % 2 === 0
  const year = project.date?.slice(0, 4)
  const credits = formatCredits(project.by)
  const prefix = locale === 'fr' ? 'par' : 'by'

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link href={`/${categorySlug}/${project.slug.current}`}>
        <div
          ref={rowRef}
          className={`opacity-0 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} cursor-pointer`}
        >
          {/* Image side */}
          <div className="relative w-full md:w-1/2 h-[280px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[480px] overflow-hidden">
            <SanityImage
              fill
              absolute
              blur
              sizes="(max-width: 768px) 100vw, 50vw"
              containerClass="rounded-none"
              image={project.mainImage.image}
              alt={project.mainImage?.alt?.[locale]}
              onLoad={() => setLoaded(true)}
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none z-[1]" />

            {/* Year overlay */}
            {year && (
              <span className="absolute top-3 left-3 font-mono text-xs text-primary z-[2]">
                {year}
              </span>
            )}

            {/* Credits overlay */}
            {credits && (
              <span className="absolute bottom-3 left-3 right-3 font-mono text-xs text-primary z-[2]">
                {prefix} {credits}
              </span>
            )}
          </div>

          {/* Text side */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-6 md:px-10 lg:px-14">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl">
              {project.title}
            </h2>
            {project.subTitle && (
              <span className="font-mono text-sm opacity-70 mt-1">
                ({project.subTitle})
              </span>
            )}
            {project.description?.[locale] && (
              <p className="font-sans text-sm md:text-base line-clamp-4 opacity-80 mt-4">
                {project.description[locale]}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
