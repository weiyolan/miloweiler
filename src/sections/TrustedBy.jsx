import AccentTitle from '@/components/AccentTitle';
import LayoutSection from '@/components/LayoutSection';
import Line from '@/components/Line';
import SubTitle from '@/components/SubTitle';
import client from 'lib/sanity';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
import React from 'react'

export default function TrustedBy({ trustedBy }) {

  return (
    <LayoutSection center>
      <div className='w-full text-center'>
        <SubTitle className='max-w-[70%] mx-auto' mainTitle='Trusted By' subTitle={''} />
        <AccentTitle noMargin className={''} text='Artists' />
        <Line className={'w-56 mx-auto mb-2'} />
        <div className='flex justify-center flex-wrap gap-12'>
          {trustedBy.artists.map((logo, i) => {return <Logo type='artist' logo={logo} key={i} />})}
        </div>
        <AccentTitle noMargin className={'mt-4'} text='Companies' />
        <Line className={'w-56 mx-auto mb-2'} />
        <div className='flex justify-center flex-wrap gap-12'>
        {trustedBy.companies.map((logo, i) => {return <Logo type='company' logo={logo} key={i} />})}
        </div>
      </div>
    </LayoutSection>
  )
}

function Logo ({type, logo}) {
  let { src, width, height, loader } = useNextSanityImage(client, logo.image.asset);
  let ar = (width / height)
  // console.log(ar)
  return(
  <Image
      src={src}
      width={width}
      height={height}
      loader={loader}
      style={{ width: ar > 2.5 ? '120px' : ar > 1 ? '100px' : '80px', height: 'auto' }} // layout="responsive" prior to Next 13.0.0
      className='my-auto scale-75 xs:scale-100'
      alt={`Logo of the ${type} ${logo.name}`}
    // sizes="100px"
    // placeholder="blur"
    // blurDataURL={trustedBy[1].image.asset.metadata.lqip} 
    />)
}