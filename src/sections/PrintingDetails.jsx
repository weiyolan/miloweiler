import React from 'react'
import AccentTitle from '@/components/AccentTitle';
import ContactB from '@/components/ContactB';
import LayoutSection from '@/components/LayoutSection';
import SanityImage from '@/components/SanityImage';
import SubTitle from '@/components/SubTitle';
import { useAppContext } from '@/utils/appContext';
import Image from 'next/image';


export default function PrintingDetails({ printingData }) {
  const { locale } = useAppContext();
  return (
    <LayoutSection left>
      <div className='flex flex-col h-full justify-center'>
        <SubTitle mainTitle={printingData.title[locale]} subTitle={printingData.text[locale]} left />
        <AccentTitle text={printingData.subTitle[locale]} />
        <ul className='list-disc pl-8'>
          {printingData.list.map((item,i)=><li key={i}>{item[locale]}</li>)}
        </ul>
        <ContactB className={''} />
      </div>
      <div className='flex-col flex h-full gap-2 sm:gap-6 justify-center'>
        <SanityImage className='rounded-t-2xl' image={printingData.image1.image} alt={printingData.image1.alt[locale]}/>
        <SanityImage className='rounded-b-2xl' image={printingData.image2.image} alt={printingData.image2.alt[locale]}/>
      </div>
    </LayoutSection>)
}
