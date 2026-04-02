import React, { forwardRef } from 'react'
import client from 'lib/sanity';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

const SanityImage = forwardRef(function SanityImage({ image, fill, absolute, blur, factor, sizes, quality=80, style, onLoad, containerClass, className, name, move, intrinsic, alt, print, thumb, ...props }, ref) {
  let { src, width, height, loader } = useNextSanityImage(client, image._ref);

  let landscape = width / height > 1;
  const hotspot = image?.hotspot;
  const hotspotPosition = hotspot
    ? `${hotspot.x * 100}% ${hotspot.y * 100}%`
    : 'center';

  if (fill) {
    return (
      <div ref={ref} data-imagecontainer={move ? 'true' : 'false'} className={twMerge(`select-none  ${absolute ? 'absolute' : 'relative'} rounded-2xl h-full w-full overflow-hidden`, `${containerClass && containerClass}`)}>
        <Image fill
          style={{ objectFit: 'cover', objectPosition: hotspotPosition, ...style }}
          sizes={sizes || "(max-width: 700px) 100vw, 50vw"}
          className={`imageFill${name ? name : ''} ${className ? className : ''}`}
          src={src}
          onLoad={onLoad}
          loader={loader}
          quality={quality}
          alt={alt || ''}
          placeholder={blur ? "blur" : undefined}
          blurDataURL={blur ? image.asset.metadata.lqip : undefined}
          {...props} />
      </div>
    )
  }

  if (intrinsic) {
    return <Image ref={ref} style={style} src={src} width={factor ? width * factor : width} height={factor ? height * factor : height} {...{ height, loader }} className={className}
      alt={alt || ''}
      quality={quality}
      placeholder={blur ? "blur" : undefined}
      blurDataURL={blur ? image.asset.metadata.lqip : undefined}
      {...props}
    />
  }

  return (
    <Image ref={ref} style={{ width: landscape ? '100%' : 'auto', height: landscape ? 'auto' : '100%', ...style }} sizes={sizes || "100vw"} className={className} src={src} {...{ width, height, loader }}
      alt={alt || ''}
      quality={quality}
      placeholder={blur ? "blur" : undefined}
      blurDataURL={blur ? image.asset.metadata.lqip : undefined}
      {...props}
    />
  )
})

export default SanityImage
