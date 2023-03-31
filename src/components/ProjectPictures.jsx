import React from 'react'
import PictureThumb from './PictureThumb'

export default function ProjectPictures({ images }) {
  // console.log(images)
  return (
    <div className='pl-6 w-[45%] h-full relative grid gap-1 grid-cols-3 '>
      {images.map((image, i) => (<PictureThumb image={image} index={i} key={i} alt={`Preview of picture ${i} of this project`} />))}
    </div>
  )
}
