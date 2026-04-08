import React from 'react'
import AccentTitle from '@/components/AccentTitle';
import ArrowLink from '@/components/ArrowLink';
import ContactB from '@/components/ContactB';
import LayoutSection from '@/components/LayoutSection';
import SanityImage from '@/components/SanityImage';
import SubTitle from '@/components/SubTitle';
import { useAppContext } from '@/utils/appContext';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { usePageContext } from '@/utils/pageContext';
import useLayoutEffect from '@utils/useIsomorphicLayoutEffect'
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactDetails({ contactDetails, portfolioLink }) {
  let ctx = useRef(null)
  let tl = useRef(null)
  let parent = useRef(null)
  const { width, locale, businessInfo } = useAppContext();

  const mailSubject = encodeURIComponent(businessInfo?.mailtoSubject?.[locale] || 'Photography Project');
  const mailBody = encodeURIComponent(businessInfo?.mailtoBody?.[locale] || '');
  const mailLink = `mailto:${businessInfo?.email || ''}?subject=${mailSubject}&body=${mailBody}`;
  const phoneRaw = (businessInfo?.phone || '').replace(/\s/g, '');
  const detailsLabel = locale === 'fr' ? 'Coordonn\u00e9es' : locale === 'nl' ? 'Gegevens' : 'Details';
  const addressLabel = locale === 'fr' ? 'Adresse' : locale === 'nl' ? 'Adres' : 'Address';

  useLayoutEffect(() => {
    if (!parent.current) return
    ctx.current = gsap.context(() => {
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: parent.current,
          start: `top ${width < 648 ? '90%' : '80%'}`,
          end: `top ${width < 648 ? '50%' : '40%'}`,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      })
        .to('.contact-child', { autoAlpha: 1, duration: 1, ease: 'bounce', stagger: 0.1 })
        .fromTo('.contact-child', { translateX: -20 }, { translateX: 0, duration: 1, ease: 'ease.out', stagger: 0.1 }, '<')
        .to('.contact-image0', { autoAlpha: 1, duration: 1 }, 0)
    }, parent.current)
    return () => ctx.current?.revert()
  }, [width])

  // console.log(contactDetails.image)
  return (
    <div ref={parent} className="contact-parent">
    <LayoutSection right className={`flex-col sm:flex-row relative`}>

      <SanityImage move style={{ objectPosition: 'top' }} containerClass='w-[46vw] -mt-6 xs:mt-0 xs:w-2/5 min-h-[40vh] xs:min-h-0 xs:h-56 bottom-0 xs:top-14 right-0 xs:right-4 sm:top-0 sm:right-0 sm:relative sm:h-full sm:w-full contact-image0 invisible'
        priority absolute={false} fill image={contactDetails.image.image.asset} alt={contactDetails.image.alt[locale]} />

      <div id='contactSection' className=' relative flex flex-col w-full md:py-6 lg:py-12'>
        <SubTitle child='contact' mainTitle={contactDetails.title[locale]} SubTitle='' left />
        <AccentTitle noMargin text={contactDetails.subTitle[locale]} className={`contact-child invisible`} />
        <p className='font-sans font-light  text-justify contact-child invisible text-sm mobm:text-base xs:w-1/2 sm:w-auto'>
          {contactDetails.text[locale]}
        </p>
        <div className='flex flex-col xs:flex-row font-sans gap-6 mt-4'>
          <div className='flex-col flex-1'>
            <AccentTitle text={detailsLabel} noMargin className={'contact-child invisible'} />
            {businessInfo?.vat && <p className='w-fit font-mono  contact-child invisible'>{`VAT: ${businessInfo.vat}`}</p>}
            <ArrowLink className={'contact-child invisible font-mono font-normal'} inText text={businessInfo?.email || ''} to={mailLink} ext tabIndex='0' />
            <ArrowLink className={'contact-child invisible font-mono font-normal'} inText text={businessInfo?.phone || ''} to={`tel:${phoneRaw}`} tabIndex='0' />
            <ContactB className={'mt-4 sm:mt-2 contact-child invisible'} portfolioLink={portfolioLink} />
          </div>
          <div className='flex-col flex-1'>
            <AccentTitle text={addressLabel} noMargin className={'contact-child invisible'} />
            <p className='whitespace-pre contact-child invisible font-mono  '>{`miloweiler.com\n${businessInfo?.address?.street || ''}\n${businessInfo?.address?.postalCode || ''} ${businessInfo?.address?.city || ''}\n${businessInfo?.address?.country || ''}`}</p>
          </div>
        </div>
      </div>
    </LayoutSection>
    </div>)
}
