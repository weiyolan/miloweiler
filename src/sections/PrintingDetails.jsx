import React, { useRef } from 'react'
import AccentTitle from '@/components/AccentTitle';
import ContactB from '@/components/ContactB';
import LayoutSection from '@/components/LayoutSection';
import SanityImage from '@/components/SanityImage';
import SubTitle from '@/components/SubTitle';
import { useAppContext } from '@/utils/appContext';
// import Image from 'next/image';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { usePageContext } from '@/utils/pageContext';
import useLayoutEffect from '@utils/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger);

export default function PrintingDetails({ printingData }) {

  let ctx = useRef(null)
  let tl = useRef(null)
  let parent = useRef()
  const { width } = useAppContext()
  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: parent.current,
          // trigger: '.printing-parent',
          start: width<648?`top 90%`:'30% 80%',
          // start: `top ${width < 648 ? '85%' : '60%'}`, 
          // toggleActions:'restart none none reverse',
          end: width<648?'top 50%':'30% 40%',
          scrub: 1,
          markers: false
        }
      })
        .from('.printing-child', { opacity: 0, duration: 1, ease: 'ease.out', stagger: 0.1 })
        .from('.printing-child', { translateX: -20, duration: 1, ease: 'ease.out', stagger: 0.1 }, '<')
    }, '.printing-parent')
    return () => ctx.current.revert()
  }, [width])

  const { locale } = useAppContext();
  return (
    <LayoutSection left className="printing-parent">
      <div ref={parent} key='printing' id='printing' className='flex flex-col h-full justify-center'>
        <SubTitle child='printing' mainTitle={printingData.title[locale]}/>
        <p className="font-sans max-w-prose mx-auto mb-4 printing-child"> {printingData.text[locale]} </p>
        <AccentTitle className='printing-child' text={printingData.subTitle[locale]} />
        <ul className='list-disc pl-8 font-sans  -mt-2'>
          {printingData.list.map((item, i) => <li className='printing-child' key={i}>{item[locale]}</li>)}
        </ul>
        <ContactB className={'printing-child'} />
      </div>
      <div className='flex-col flex h-full gap-2 sm:gap-4 lg:gap-6 justify-center'>
        <SanityImage priority className='rounded-t-2xl printing-child' image={printingData.image1.image.asset} alt={printingData.image1.alt[locale]} />
        <SanityImage priority className='rounded-b-2xl printing-child' image={printingData.image2.image.asset} alt={printingData.image2.alt[locale]} />
      </div>
    </LayoutSection>)
}
