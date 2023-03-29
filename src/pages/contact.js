import React, { useRef } from 'react'
import Head from 'next/head'
import SubTitle from '@components/SubTitle'
import Layout from '@/components/Layout'
import LayoutSection from '@/components/LayoutSection'
import AccentTitle from '@/components/AccentTitle'
import { PageWrapper } from '@/utils/pageContext'
import ArrowLink from '@/components/ArrowLink'
import ContactB from '@/components/ContactB'
import useDimensions from '@/utils/useDimensions'
import Form from '@/components/Form'

import client from '../../lib/sanity'
import TrustedBy from '@/sections/TrustedBy'
import Image from 'next/image'
import { useAppContext } from '@/utils/appContext'
import Footer from '@/components/Footer'
import ContactDetails from '@/sections/ContactDetails'
import SanityImage from '@/components/SanityImage'
import PrintingDetails from '@/sections/PrintingDetails'
import Logo from '@/components/Logo'

export default function Contact({ contactDetailsData, trustedByData, contactFormData, printingData, portfolioData, inspirationData }) {
  let textRef = useRef(null)
  let { width, locale } = useAppContext()
  let { height: textHeight } = useDimensions(textRef)
  let pageMobile = width < 648;
  let darkMode=false
  // console.log(contactFormData)

  return (
    <>
      <Head>
        <title>Contact Photography</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={'bg-gradient-to-br from-primary to-[#FFEAD6] relative'}>
        <div className='fixed w-full '>
          <Logo darkMode={darkMode} className='w-full opacity-[0.02] relative -translate-x-14 -translate-y-40' />
        </div>
        <PageWrapper darkMode={darkMode}>
          <Layout className={'relative'}>
            <h1 className='invisible h-0'>Contact Page</h1>

            {/* =======CONTACT DETAILS======== */}
            <ContactDetails contactDetails={contactDetailsData} />
            {/* {console.log(contactDetailsData)} */}
            {/* =======TRUSTED BY======== */}
            <TrustedBy trustedBy={trustedByData} />

            {/* =======OFFER FORM======== */}
            <LayoutSection right className={`flex-col-reverse`} >
              <div className='flex flex-col'>
                {/* <SubTitle mainTitle={'test'} SubTitle='' left /> */}
                <SubTitle mainTitle={contactFormData.title[locale]} SubTitle='' left />
                <Form />
              </div>
              <SanityImage fill image={contactFormData.image.image} alt={contactFormData.image.alt[locale]} />
            </LayoutSection>

            {/* =======PRINTING SERVICE======== */}
            <PrintingDetails printingData={printingData} />

            {/* ======PRORTFOLIO======== */}
            <LayoutSection center >
              <div className='w-full text-center'>
                <SubTitle className='max-w-[750px] mx-auto' mainTitle={portfolioData.title[locale]} subTitle={portfolioData.text[locale]} />
                <ArrowLink className='ml-8 ' inText text='download' to='/' />
                <div className='flex flex-col h-80 sm:flex-row gap-6 sm:gap-12 px-0 sm:px-12 mt-4'>
                  {/* <div className=' bg-black/30 w-full h-56 rounded-2xl' /> */}
                  {/* <div className=' bg-black/30 w-full h-56 rounded-2xl' /> */}
                  <SanityImage containerClass='flex-1 rounded-sm' fill image={portfolioData.image1.image} alt={portfolioData.image1.alt[locale]} />
                  <SanityImage containerClass='flex-1 rounded-sm' fill image={portfolioData.image2.image} alt={portfolioData.image2.alt[locale]} />
                </div>
              </div>
            </LayoutSection>

            {/* ======INSPIRATION======== */}
            <LayoutSection center>
              <div className='w-full text-center'>
                <SubTitle className='max-w-[70%] mx-auto' mainTitle={inspirationData.title[locale]} subTitle={''} />
                <ArrowLink className='ml-8 w-fit self-center mb-4' text='Contact me' to='#contactSection' />
                <div className='flex flex-col sm:flex-row gap-4 sm:gap-24 sm:px-24'>
                  <div className='flex-1 flex flex-col  justify-start'>
                    <h3 className='font-pop font-semibold text-lg sm:text-xl mt-2 mb-2 sm:mb-4'>{inspirationData.subTitle1[locale]}</h3>
                    <p ref={textRef} className='text-justify sm:text-center  text-sm'>
                      {inspirationData.text1[locale]}
                    </p>
                    <ArrowLink className='ml-8 w-fit' text='Go to homepage' to='/' />
                  </div>
                  <div className='flex-1 flex flex-col justify-start'>
                    <h3 className='font-pop font-semibold text-lg sm:text-xl mt-2 mb-2 sm:mb-4'>{inspirationData.subTitle2[locale]}</h3>
                    <p style={{ height: pageMobile ? 'auto' : textHeight ? textHeight + 'px' : 'auto' }} className='text-justify sm:text-center text-sm'>
                      {inspirationData.text2[locale]}
                    </p>
                    <ArrowLink className='ml-8 w-fit self-center text-center' text='Visit my gallery' to='/' />
                  </div>
                </div>
              </div>
            </LayoutSection>

          </Layout>
          <Footer />
        </PageWrapper>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const contactDetailsData = await client.fetch(`*[_type == "contactPageCDS"][0]`);
  const trustedByData = await client.fetch(`*[_type == "contactPageTBS"][0]`);
  const contactFormData = await client.fetch(`*[_type == "contactPageAOS"][0]`);
  const printingData = await client.fetch(`*[_type == "contactPagePSS"][0]`);
  const portfolioData = await client.fetch(`*[_type == "contactPagePFS"][0]`);
  const inspirationData = await client.fetch(`*[_type == "contactPageGIS"][0]`);
  // const products = await client.fetch(`*[_type == "product"]`);
  // console.log(responsibilities)
  // console.log(contactDetail)
  return {
    props: {
      contactDetailsData: contactDetailsData,
      trustedByData: trustedByData,
      contactFormData: contactFormData,
      printingData: printingData,
      portfolioData: portfolioData,
      inspirationData: inspirationData
    }
  };
}
