import React from 'react'
import client from 'lib/sanity';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';

export default function SanityImage({ image, alt, fill, thumb, absolute, blur, sizes, style, containerClass, className, name, move,intrinsic, ...props }) {
  let { src, width, height, loader } = useNextSanityImage(client, image._ref);
  // let result = useNextSanityImage(client, image._ref);
  // console.log(result)
  // console.log(image)

  let landscape = width / height > 1;
  // if (thumb) {
  //   width = width / 4;
  //   height = height / 4;
  // }

  function getBlurProps() {
    let additionalProps = {}
    // newProps.fill = true
    // newProps.style = { objectFit: 'cover', objectPosition: 'center', ...style }
    // newProps.sizes= sizes ? sizes : "(max-width: 700px) 100vw, 50vw"
    // newProps.src=src
    // newProps.loader=loader
    // newProps.alt=alt

    if (blur) {
      additionalProps.placeholder = "blur";
      additionalProps.blurDataURL = image.asset.metadata.lqip
    }

    // newProps = {newProps, ...props}

    return additionalProps
  }


  if (fill) {
    return (
      <div data-imagecontainer={move?'true':'false'} className={`select-none h-full w-full ${absolute ? 'absolute' : 'relative'} rounded-2xl overflow-hidden ${containerClass} `}>
        <Image fill
          style={{ objectFit: 'cover', objectPosition: 'center', ...style }}
          sizes={sizes ? sizes : "(max-width: 700px) 100vw, 50vw"}
          className={`imageFill${name?name:''}`}
          src={src}
          loader={loader}
          alt={alt}
          {...getBlurProps()}
          {...props} />
      </div>
    )
  }

  if (intrinsic) {
    return <Image style={style} {...{ src, width, height, loader }} alt={alt} className={className}
      {...getBlurProps()} {...props}
    />
  }

  return (
    // objectFit:'contain',  maxWidth: '100%',maxHeight: '100%',position:'relative',  position:'absolute'
    <Image style={{ width: landscape ? '100%' : 'auto', height: landscape ? 'auto' : '100%', ...style }} className={className} {...{ src, width, height, loader }} alt={alt} 
      {...getBlurProps()} {...props}
    />
  )
}
