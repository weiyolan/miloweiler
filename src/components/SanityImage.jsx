import React from 'react'
import client from 'lib/sanity';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
// import { imageUrlBuilder} from '@sanity/image-url';

export default function SanityImage({ image, alt, fill, thumb, absolute, blur, sizes, style, print, onLoad, containerClass, className, name, move, intrinsic, ...props }) {
  let { src, width, height, loader } = useNextSanityImage(client, image._ref);

  // UseNextSanityImageOptions({width:500})

  // const myURLBuilder = (imageUrlBuilder, options) => {
  //   return imageUrlBuilder
  //     .width(options.width || Math.min(options.originalImageDimensions.width, 1920))
  //     .quality(options.quality || 75)
  //     .fit('clip');
  // };

  // let options={width:1000,quality:100}

  // let result = useNextSanityImage(client, image._ref, options);
  // if (print) {
  // console.log(result.loader)
  // console.log(image)
  // console.log(result.src)
  // console.log(loader({width:500,quality:10}))
  // }
  let landscape = width / height > 1;

  // if (thumb) {
  //   width = width / 4;
  //   height = height / 4;
  // }


  if (fill) {
    return (
      <div data-imagecontainer={move ? 'true' : 'false'} className={`select-none  ${absolute ? 'absolute' : 'relative'} rounded-2xl h-full w-full overflow-hidden ${containerClass && containerClass}`}>
        <Image fill
          style={{ objectFit: 'cover', objectPosition: 'center', ...style }}
          sizes={sizes ? sizes : "(max-width: 700px) 100vw, 50vw"}
          className={`imageFill${name ? name : ''} ${className ? className : ''}`}
          src={src}
          onLoad={onLoad}
          loader={loader}
          alt={alt}
          placeholder={blur ? "blur" : undefined}
          blurDataURL={blur ? image.asset.metadata.lqip : undefined}
          {...props} />
      </div>
    )
  }

  if (intrinsic) {
    return <Image style={style} {...{ src, width, height, loader }} alt={alt} className={className}
      placeholder={blur ? "blur" : undefined}
      blurDataURL={blur ? image.asset.metadata.lqip : undefined}
      {...props}
    />
  }

  return (
    // objectFit:'contain',  maxWidth: '100%',maxHeight: '100%',position:'relative',  position:'absolute'
    <Image style={{ width: landscape ? '100%' : 'auto', height: landscape ? 'auto' : '100%', ...style }} sizes={sizes} className={className} {...{ src, width, height, loader }} alt={alt}
      placeholder={blur ? "blur" : undefined}
      blurDataURL={blur ? image.asset.metadata.lqip : undefined}
      {...props}
    />
  )
}
