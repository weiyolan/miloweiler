import React from 'react'
import AccentTitle from '@/components/AccentTitle';
import ArrowLink from '@/components/ArrowLink';
import ContactB from '@/components/ContactB';
import LayoutSection from '@/components/LayoutSection';
import SanityImage from '@/components/SanityImage';
import SubTitle from '@/components/SubTitle';
import { useAppContext } from '@/utils/appContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { usePageContext } from '@/utils/pageContext';
import useLayoutEffect from '@utils/useIsomorphicLayoutEffect'
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);


let mailLink = "mailto:contact@miloweiler.com?subject=Photography%20Project&body=Hi%20Milo%2C%0A%0AI%20have%20a%20photography%20project%20for%20you.%0ACould%20we%20talk%20about%20this%20any%20time%20soon%3F%0A%0AThanks%20in%20advance%2C%0A%0A"

export default function ContactDetails({ contactDetails }) {
  let ctx = useRef(null)
  let tl = useRef(null)
  const { width } = useAppContext();

  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {
      tl.current = gsap.timeline()
        .from('.contact-child', { opacity: 0, duration: 1, ease: 'bounce', stagger: 0.1 })
    }, '.contact-parent')
    return () => ctx.current.revert()
  }, [])

  const { locale } = useAppContext();
  // console.log(contactDetails.image)
  return (
    <LayoutSection right className={` flex-col sm:flex-row relative`}>
      <SanityImage move style={{objectPosition:'top'}} containerClass='w-[46vw] xs:w-2/5 h-48 xs:h-56 bottom-0 xs:top-14 right-0 xs:right-4 sm:top-0 sm:right-0 sm:relative sm:h-full sm:w-full contact-image0 opacity-0' 
      priority absolute={width < 648} fill image={contactDetails.image.image.asset} alt={contactDetails.image.alt[locale]} />
      <div id='contactSection' className='relative contact-parent flex flex-col w-full md:py-6 lg:py-12'>
        <SubTitle child='contact' mainTitle={contactDetails.title[locale]} SubTitle='' left />
        <AccentTitle noMargin text={contactDetails.subTitle[locale]} className={`contact-child`} />
        <p className='font-pop font-normal text-justify contact-child text-sm mobm:text-base xs:w-1/2 sm:w-auto'>
          {contactDetails.text[locale]}
        </p>
        <div className='flex flex-col xs:flex-row font-pop gap-6 mt-4'>

          <div className='flex-col flex-1 '>
            <AccentTitle text='Details' noMargin className={'contact-child'} />
            <p className='w-fit font-pop contact-child'>{'TVA: BE 0791 549 197'}</p>
            <ArrowLink className={'contact-child'} inText text='contact@miloweiler.com' to={mailLink} ext tabIndex='0' />
            <ArrowLink className={'contact-child'} inText text='+32 476 50 62 09' to='tel:+32476506209' tabIndex='0' />
            <ContactB className={'mt-4 sm:mt-2 contact-child'} />
          </div>
          <div className='flex-col flex-1'>
            <AccentTitle text='Address' noMargin className={'contact-child'} />
            <p className='whitespace-pre contact-child'>{'miloweiler.com\nHof Savelkoul 40\n2640 Mortsel\nBelgium'}</p>
          </div>
        </div>
      </div>
    </LayoutSection>)
}
