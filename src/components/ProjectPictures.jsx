import React from 'react'
import PictureThumb from './PictureThumb'

export default function ProjectPictures({images}) {
  // console.log(images)
  return (
    <div className='absolute w-[45%] right-0 px-3 top-0 bg-white/10 h-full'>
      <div className='w-1/3 h-full relative grid gap-1 auto-cols-fr grid-rows-6'>
        {images.map((image,i)=>(<PictureThumb image={image} index={i} key={i} alt={`Preview of picture ${i} of this project`}/>))}
      </div>

    </div>
  )
}
