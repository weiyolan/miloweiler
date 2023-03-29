import { useAppContext } from '@/utils/appContext'
import React, { useState } from 'react'
import SanityImage from './SanityImage'

export default function ProjectThumb({ project }) {
  const { locale } = useAppContext()
  let [hover, setHover] = useState(false)
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => console.log(project)} className='flex relative items-end justify-start w-40 h-40 bg-primary/20 cursor-pointer 
    duration-300 hover:scale-105 hover:bg-primary/30 target:scale-95'>
      <div className='absolute w-full h-full'>
        <SanityImage containerClass={'rounded-none'} fill image={project.mainImage.image} alt={project.mainImage.alt[locale]} />
      </div>
      <h2 className={`font-lora text-xl text-white invert-0  duration-500 ${hover ? 'opacity-100 delay-100' : 'opacity-0 '}`}>
        {project.title}
      </h2>
    </div>
  )
}
