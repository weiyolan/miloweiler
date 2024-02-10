import React, { forwardRef } from 'react'
import client from 'lib/sanity';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
// import { imageUrlBuilder} from '@sanity/image-url';
const SanityImage = forwardRef(function SanityImage({ image, fill, thumb, absolute, blur, factor, sizes, style, print, onLoad, containerClass, className, name, move, intrinsic, ...props }, ref) {
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
      <div ref={ref} data-imagecontainer={move ? 'true' : 'false'} className={twMerge(`select-none  ${absolute ? 'absolute' : 'relative'} rounded-2xl h-full w-full overflow-hidden`, `${containerClass && containerClass}`)}>
        <Image fill
          style={{ objectFit: 'cover', objectPosition: 'center', ...style }}
          sizes={sizes ? sizes : "(max-width: 700px) 100vw, 50vw"}
          className={`imageFill${name ? name : ''} ${className ? className : ''}`}
          src={src}
          onLoad={onLoad}
          loader={loader}
        // alt={alt}
          placeholder={blur ? "blur" : undefined}
          blurDataURL={blur ? image.asset.metadata.lqip : undefined}
          {...props} />
      </div>
    )
  }

  if (intrinsic) {
    return <Image ref={ref} style={style} src={src} width={factor ? width * factor : width} height={factor ? height * factor : height} {...{ height, loader }} className={className}
      placeholder={blur ? "blur" : undefined}
      blurDataURL={blur ? image.asset.metadata.lqip : undefined}
      {...props}
    />
  }

  return (
    // objectFit:'contain',  maxWidth: '100%',maxHeight: '100%',position:'relative',  position:'absolute'
    <Image ref={ref} style={{ width: landscape ? '100%' : 'auto', height: landscape ? 'auto' : '100%', ...style }} sizes={sizes} className={className} src={src} {...{ width, height, loader }} 
      placeholder={blur ? "blur" : undefined}
      blurDataURL={blur ? image.asset.metadata.lqip : undefined}
      {...props}
    />
  )
})

export default SanityImage
