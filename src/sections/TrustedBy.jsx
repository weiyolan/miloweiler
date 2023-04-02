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
          opacity: 1, duration: 1, ease: 'power4.in', stagger: 0.3,
        }, '-=1')
        .to('.company-title', { opacity: 1, duration: 1 }, '-=1')
        .to('.company-line', { width: 224, duration: 0.8, }, '<')
        .to('.logo-company', {
          opacity: 1, duration: 1, ease: 'power4.in', stagger: 0.3,
        }, '-=1')
      // gsap.to('.logo-artist', {opacity:1, duration: 0.5, stagger: 0.2});
      // gsap.to('.logo-company', {opacity:1, duration: 0.5, stagger: 0.2});
    }, '.trusted-by')
    return () => ctx.current.revert()
  }, [width])

  let totalLogoAmount = trustedBy.artists.length + trustedBy.companies.length

  return (
    <LayoutSection center>
      <div ref={trusted} className='trusted-by relative w-full text-center'>
        <SubTitle className='max-w-[70%] mx-auto opacity-1 title' mainTitle='Trusted By' subTitle={''} />
        <AccentTitle noMargin className={'artist-title opacity-0'} text='Artists' />
        <Line style={{}} className={'opacity-100 w-0 mx-auto mb-2 artist-line'} />
        <div className='artist-container flex justify-center flex-wrap gap-12'>
          {trustedBy.artists.map((logo, i) => { return <Logo dataSpeed={`${0.99 - 0.05 * (totalLogoAmount - i) / totalLogoAmount}`} type='artist' logo={logo} key={i} /> })}
        </div>
        <AccentTitle noMargin className={'mt-4 company-title opacity-0'} text='Companies' />
        <Line style={{}} className={'opacity-100 w-0 mx-auto mb-2 company-line'} />
        <div className='company-container flex justify-center flex-wrap gap-12'>
          {trustedBy.companies.map((logo, i) => { return <Logo dataSpeed={`${0.99 - 0.05 * (totalLogoAmount - i - trustedBy.artists.length) / totalLogoAmount}`} type='company' logo={logo} key={i} /> })}
        </div>
      </div>
    </LayoutSection>
  )
}

function Logo({ dataSpeed, type, logo }) {
  let { src, width, height, loader } = useNextSanityImage(client, logo.image.asset);
  let ar = (width / height)
  // console.log(ar)
  return (
    <Image
      src={src}
      data-speed={dataSpeed}
      width={width}
      height={height}
      loader={loader}
      style={{ width: ar > 2.5 ? '120px' : ar > 1 ? '100px' : '80px', height: 'auto' }} // layout="responsive" prior to Next 13.0.0
      className={`logo logo-${type} my-auto scale-75 xs:scale-100 opacity-0`}
      alt={`Logo of the ${type} ${logo.name}`}
    // sizes="100px"
    // placeholder="blur"
    // blurDataURL={trustedBy[1].image.asset.metadata.lqip} 
    />)
}