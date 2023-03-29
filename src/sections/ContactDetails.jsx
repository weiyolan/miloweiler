import React from 'react'
import AccentTitle from '@/components/AccentTitle';
import ArrowLink from '@/components/ArrowLink';
import ContactB from '@/components/ContactB';
import LayoutSection from '@/components/LayoutSection';
import SanityImage from '@/components/SanityImage';
import SubTitle from '@/components/SubTitle';
import { useAppContext } from '@/utils/appContext';



let mailLink = "mailto:contact@miloweiler.com?subject=Photography%20Project&body=Hi%20Milo%2C%0A%0AI%20have%20a%20photography%20project%20for%20you.%0ACould%20we%20talk%20about%20this%20any%20time%20soon%3F%0A%0AThanks%20in%20advance%2C%0A%0A"

export default function ContactDetails({ contactDetails }) {

  const { locale } = useAppContext();
  // console.log(contactDetails.image)
  return (
    <LayoutSection right className={`flex-col-reverse`}>
      <SanityImage priority fill image={contactDetails.image.image} alt={contactDetails.image.alt[locale]} />
      <div id='contactSection' className='flex flex-col '>
        <SubTitle mainTitle={contactDetails.title[locale]} SubTitle='' left />
        <AccentTitle noMargin text={contactDetails.subTitle[locale]} className={`mt-2`} />
        <p className='font-pop font-normal text-justify'>
          {contactDetails.text[locale]}
        </p>
        <div className='flex flex-col-reverse xs:flex-row font-pop gap-6 mt-4'>
          <div className='flex-col flex-1'>
            <AccentTitle text='Address' noMargin />
            <p className='whitespace-pre'>{'miloweiler.com\nHof Savelkoul 40\n2640 Mortsel\nBelgium'}</p>
          </div>
          <div className='flex-col flex-1 '>
            <AccentTitle text='Details' noMargin />
            <p className='w-fit font-pop'>{'TVA: BE 0791 549 197'}</p>
            <ArrowLink inText text='contact@miloweiler.com' to={mailLink} ext tabIndex='0' />
            <ArrowLink inText text='+32 476 50 62 09' to='tel:+32476506209' tabIndex='0' />
            <ContactB />
          </div>
        </div>
      </div>
    </LayoutSection>)
}
