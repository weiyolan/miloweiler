import React from 'react'
import PictureThumb from './PictureThumb'

export default function ProjectPictures({ images, handleVisibility }) {
  // console.log(images)
  return (
    <div className='select-none w-full h-full flex items-center md:w-[30%] relative pl-1 pr-12'>
      <div className='w-full relative z-0 grid gap-1 grid-cols-2 h-fit pl-1'>
        {images.map((image, i) => (<PictureThumb handleClick={() => handleVisibility(i)} image={image} index={i} key={i} alt={`Preview of picture ${i} of this project`} />))}
      </div>
    </div>
  )
}
