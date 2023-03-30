import React from 'react'
import client from 'lib/sanity';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';

export default function SanityImage({ image, alt, fill, absolute, blur, sizes, style, containerClass, ...props }) {
  let { src, width, height, loader } = useNextSanityImage(client, image);


  function getAdditionalProps () {
    let additionalProps = {}
    // newProps.fill = true
    // newProps.style = { objectFit: 'cover', objectPosition: 'center', ...style }
    // newProps.sizes= sizes ? sizes : "(max-width: 700px) 100vw, 50vw"
    // newProps.src=src
    // newProps.loader=loader
    // newProps.alt=alt

    if (blur) {
      additionalProps.placeholder="blur";
      additionalProps.blurDataURL=image.asset.metadata.lqip
    }

    // newProps = {newProps, ...props}

    return additionalProps
  }


  if (fill) {
    return (
      <div className={`w-full h-full ${absolute?'absolute':'relative'} rounded-2xl overflow-hidden ${containerClass}`}>
        <Image fill
          style={{ objectFit: 'cover', objectPosition: 'center', ...style }}
          sizes={sizes ? sizes : "(max-width: 700px) 100vw, 50vw"} 
          src={src} 
          loader={loader}
          alt={alt}
          {...getAdditionalProps()}
          // placeholder="blur"
          // blurDataURL={image.asset.metadata.lqip}
          {...props} />
      </div>
    )
  }

  return (
    <Image style={{ width: '100%', height: 'auto', ...style}} {...props} {...{ src, width, height, loader }} alt={alt} 
    {...getAdditionalProps()}
    // placeholder="blur"
    // blurDataURL={image.asset.metadata.lqip}
    />
  )
}
