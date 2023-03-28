import AccentTitle from '@/components/AccentTitle';
import LayoutSection from '@/components/LayoutSection';
import Line from '@/components/Line';
import SubTitle from '@/components/SubTitle';
import client from 'lib/sanity';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
import React from 'react'

export default function TrustedBy({ trustedBy }) {

function getImages(type) {

  let images = trustedBy.map((logo, i) => {

    let { src, width, height, loader } = useNextSanityImage(client, logo.image);
    let ar = (width / height)



    return logo.type === type ?
      <Image
        {...useNextSanityImage(client, logo.image)}
        src={src}
        width={width}
        height={height}
        loader={loader}
        style={{ width: ar>2.5?'120px':ar>1?'100px':'80px', height: 'auto' }} // layout="responsive" prior to Next 13.0.0
        key={i}
        className='my-auto'
        alt={`Logo of the ${type} ${logo.name}`}
      // sizes="100px"
      // placeholder="blur"
      // blurDataURL={trustedBy[1].image.asset.metadata.lqip} 
      /> : null
  })

  return images
}


  return (
    <LayoutSection center>
      <div className='w-full text-center'>
        <SubTitle className='max-w-[70%] mx-auto' mainTitle='Trusted By' subTitle={''} />
        <AccentTitle noMargin className={''} text='Artists' />
        <Line className={'w-56 mx-auto mb-2'} />
        <div className='flex justify-center gap-12'>
          {getImages('artist')}
        </div>
        <AccentTitle noMargin className={'mt-4'} text='Companies' />
        <Line className={'w-56 mx-auto mb-2'} />
        <div className='flex justify-center gap-12'>
        {getImages('company')}
        </div>
      </div>
    </LayoutSection>
  )
}
