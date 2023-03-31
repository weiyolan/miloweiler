import React from 'react'
import PictureThumb from './PictureThumb'

export default function ProjectPictures({ images, handleVisibility }) {
  // console.log(images)
  return (
    <div className=' w-[45%] relative z-0 grid gap-1 grid-cols-3 h-fit pl-1'> 
      {images.map((image, i) => (<PictureThumb handleClick={()=>handleVisibility(i)} image={image} index={i} key={i} alt={`Preview of picture ${i} of this project`} />))}
    </div>
  )
}
