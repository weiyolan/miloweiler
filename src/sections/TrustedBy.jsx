import AccentTitle from '@/components/AccentTitle';
import LayoutSection from '@/components/LayoutSection';
import Line from '@/components/Line';
import SubTitle from '@/components/SubTitle';
import client from 'lib/sanity';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
import React, { useRef } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { usePageContext } from '@/utils/pageContext';
import useLayoutEffect from '@utils/useIsomorphicLayoutEffect'
import { useAppContext } from '@/utils/appContext';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function TrustedBy({ trustedBy }) {

  // const { ctx, tl } = usePageContext()
  let ctx = useRef(null)
  let tl = useRef(null)
  let trusted = useRef(null)
  let { width } = useAppContext()

  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {
      tl.current = gsap.timeline({ scrollTrigger: { trigger: trusted.current, start: `top ${width < 668 ? '85%' : '50%'}`, invalidateOnRefresh: true, markers: false } })
        // .from('.title', { opacity: 0, duration: 1 })
        .to('.artist-title', { opacity: 1, duration: 1 })
        .to('.artist-line', { width: 224, duration: 0.8, }, '<')
        .to('.logo-artist', {
          opacity: 1, duration: 0.7, ease: 'back', stagger: 0.2,
        }, '-=1')
        .to('.company-title', { opacity: 1, duration: 1 }, '-=1.5')
        .to('.company-line', { width: 224, duration: 0.8, }, '<')
        .to('.logo-company', {
          opacity: 1, duration: 0.7, ease: 'back', stagger: 0.2,
        }, '-=1')
      // gsap.to('.logo-artist', {opacity:1, duration: 0.5, stagger: 0.2});
      // gsap.to('.logo-company', {opacity:1, duration: 0.5, stagger: 0.2});
    }, '.trusted-by')
    return () => ctx.current.revert()
  }, [width])

  let totalLogoAmount = trustedBy.artists.length + trustedBy.companies.length

  function getSpeed(i, company) {
    if (width < 648) {
      return (1 - 0.05 * (totalLogoAmount - i - (company ? trustedBy.artists.length : 0)) / totalLogoAmount)
    } else if (width > 648) {
      let length = company ? trustedBy.companies.length - 1 : trustedBy.artists.length - 1;
      let ratio = (i - length / 2) / (length / 2);
      return (1 - 0.1 * ratio)
    }
  }

  function getDirection(i, company) {
    if (width < 648) {
      return (i % 2 === 0 ? -1 : 1)
    } else if (width > 648) {
      return 1

      // if (company) {
      //   if (i + 1 <= trustedBy.companies.length / 2) {
      //     return -1
      //   } else if (i + 1 > trustedBy.companies.length / 2) {
      //     return 1
      //   } else return 0
      // } else {
      //   if (i + 1 <= trustedBy.artists.length / 2) {
      //     return -1
      //   } else if (i + 1 > trustedBy.artists.length / 2) {
      //     return 1
      //   } else return 0
      // }
    }
  }

  return (
    <LayoutSection center>
      <div ref={trusted} className='trusted-by relative w-full text-center'>
        <SubTitle className='max-w-[70%] mx-auto opacity-1 title' mainTitle='Trusted By' subTitle={''} />
        <AccentTitle noMargin className={'artist-title opacity-0'} text='Artists' />
        <Line style={{}} className={'opacity-100 w-0 mx-auto mb-2 artist-line border-darkPrimary'} />
        <div className='artist-container flex justify-center flex-wrap sm:flex-nowrap gap-12 sm:gap-6 lg:gap-12'>
          {trustedBy.artists.map((logo, i) => { return <Logo dataDirection={getDirection(i)} dataSpeed={`${getSpeed(i)}`} type='artist' logo={logo} key={i} to={logo.link} /> })}
        </div>
        <AccentTitle noMargin className={'mt-4 company-title opacity-0'} text='Companies' />
        <Line style={{}} className={'opacity-100 w-0 mx-auto mb-2 company-line border-darkPrimary'} />
        <div className='company-container flex justify-center flex-wrap sm:flex-nowrap gap-12 sm:gap-6 lg:gap-12'>
          {trustedBy.companies.map((logo, i) => { return <Logo dataDirection={getDirection(i, true)} dataSpeed={`${getSpeed(i, true)}`} type='company' logo={logo} key={i} to={logo.link} /> })}
        </div>
      </div>
    </LayoutSection>
  )
}

function Logo({ dataSpeed, dataDirection, type, logo, link }) {
  let { src, width, height, loader } = useNextSanityImage(client, logo.image.asset);
  let ar = (width / height)
  // console.log(ar)

  function getImage() {
    return (<Image
      src={src}
      data-speed={dataSpeed}
      data-direction={dataDirection}
      width={width}
      height={height}
      loader={loader}
      style={{ width: ar > 2.5 ? '120px' : ar > 1 ? '100px' : '80px', height: 'auto' }} // layout="responsive" prior to Next 13.0.0
      className={`logo logo-${type} my-auto scale-75 translate-x-0 xs:scale-100 opacity-0`}
      alt={`Logo of the ${type} ${logo.name}`}
    // sizes="100px"
    // placeholder="blur"
    // blurDataURL={trustedBy[1].image.asset.metadata.lqip} 
    />)
  }

  if (link===undefined) {
    return getImage()
  } 
  
  return (
    <Link className='cursor-pointer w-fit h-fit' href={link} target='_blank'
      rel="noopener noreferrer">
        {getImage()}
    </Link>)
}