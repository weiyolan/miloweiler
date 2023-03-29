import React from 'react'
import client from 'lib/sanity';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';

export default function SanityImage({ image, alt, fill, sizes, style, containerClass, ...props }) {
  let { src, width, height, loader } = useNextSanityImage(client, image);

  if (fill) {
    return (
      <div className={`w-full h-full relative rounded-2xl overflow-hidden ${containerClass}`}> 
        <Image style={{ objectFit: 'cover', objectPosition: 'center', ...style }} fill sizes={sizes ? sizes : "(max-width: 700px) 100vw, 50vw"} src={src} loader={loader} alt={alt}  {...props}  />
      </div>
    )
  }

  return (
    <Image style={style} {...props} {...{ src, width, height, loader }} alt={alt} />
  )
}
