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

export default function Contact({ trustedBy }) {
  // let imageProps = trustedBy.map((logo)=>useNextSanityImage(client, logo.image))
  let mailLink = "mailto:contact@miloweiler.com?subject=Photography%20Project&body=Hi%20Milo%2C%0A%0AI%20have%20a%20photography%20project%20for%20you.%0ACould%20we%20talk%20about%20this%20any%20time%20soon%3F%0A%0AThanks%20in%20advance%2C%0A%0A"
  // console.log(trustedBy)
  let textRef = useRef(null)
  let { height: textHeight } = useDimensions(textRef)
  // console.log(textHeight)
  return (
    <>
      <Head>
        <title>Contact Photography</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={'bg-primary'}>
        <PageWrapper darkMode={false}>
          <Layout className={''}>
            <h1 className='invisible h-0'>Contact Page</h1>

            {/* =======CONTACT DETAILS======== */}
            <LayoutSection right>
              {/* <div></div> */}
              <div className='w-full h-full bg-black/30 rounded-2xl'> YAY </div>
              <div className='flex flex-col'>
                <SubTitle mainTitle='Get In Touch' SubTitle='' left />
                <AccentTitle text='Hi! Nice to meet you.' />
                <p className='font-pop font-normal text-justify'>
                  {"Yes that’s me on the picture. Feel free to reach our for an offer or if you simply need advice for your project. And more and more text until it has a beautiful length to resonate with the reader’s soul."}
                </p>
                <div className='flex font-pop gap-6'>
                  <div className='flex-col flex-1'>
                    <AccentTitle text='Address' />
                    <p className='whitespace-pre'>{'miloweiler.com\nHof Savelkoul 40\n2640 Mortsel\nBelgium'}</p>
                  </div>
                  <div className='flex-col flex-1 '>
                    <AccentTitle text='Details' />
                    <p className='w-fit font-pop'>{'TVA: BE 0791 549 197'}</p>
                    <ArrowLink inText text='contact@miloweiler.com' to={mailLink} ext tabIndex='0' />
                    <ArrowLink inText text='+32 476 50 62 09' to='tel:+32476506209' tabIndex='0' />
                    <ContactB />
                  </div>
                </div>
              </div>
            </LayoutSection>

            {/* =======TRUSTED BY======== */}
            <TrustedBy trustedBy={trustedBy}/>

            {/* =======OFFER FORM======== */}
            <LayoutSection right >
              <div className='flex flex-col'>
                <SubTitle mainTitle='Ask an offer' SubTitle='' left />
                <Form />
              </div>
              <div className='w-full h-full bg-black/30 rounded-2xl'> YAY </div>
            </LayoutSection>

            {/* =======PRINTING SERVICE======== */}
            <LayoutSection left>
              <div className='flex flex-col'>
                <SubTitle mainTitle='High Quality Prints' subTitle={"Discover the power of visual storytelling through my lens. Download my portfolio now."} left />
                <AccentTitle text='Nice to know' />
                <ul className='list-disc pl-8'>
                  <li>Hier een paar dingen te zeggen</li>
                  <li>Download my portfolio now</li>
                  <li>Big wall photography</li>
                  <li>Frames</li>
                </ul>
                <ContactB />
              </div>
              <div className='flex-col flex gap-6 h-full justify-center'>
                <div className='w-full  bg-black/30 rounded-2xl h-2/3'> YAY </div>
                <div className='w-full bg-black/30 rounded-2xl h-1/3'> YAY </div>
              </div>
            </LayoutSection>

            {/* ======PRORTFOLIO======== */}
            <LayoutSection center >
              <div className='w-full text-center'>
                <SubTitle className='max-w-[750px] mx-auto' mainTitle='Portfolio' subTitle={'Discover the power of visual storytelling through my lens. Download my portfolio now and immerse yourself in a world of emotion, creativity, and imagination. '} />
                <ArrowLink className='ml-8 ' inText text='download' to='/' />
                <div className='flex gap-12 px-12 mt-4'>
                  <div className='flex-1 bg-black/30 w-full h-80 rounded-2xl' />
                  <div className='flex-1 bg-black/30 w-full h-80 rounded-2xl' />
                </div>

              </div>
            </LayoutSection>

            {/* ======INSPIRATION======== */}
            <LayoutSection center>
              <div className='w-full text-center'>
                <SubTitle className='max-w-[70%] mx-auto' mainTitle='Get Inspired' subTitle={''} />
                <div className='flex gap-24 px-24'>
                  <div className='flex-1 flex flex-col text-center justify-start'>
                    <h3 className='font-pop font-semibold text-xl mt-2 mb-4'>Inspiring Life's Beauty</h3>
                    <p ref={textRef} className=''>
                      {"We envision a world where photography is not just a means of capturing a moment, but a way of experiencing life's beauty. Through our lens, we want to inspire people to see the world in a new light, appreciate the little things in life, and cherish the moments that matter most. We believe that photography has the power to connect people, tell stories, and leave a lasting impact on the world. As we continue on our journey, we aim to capture life's beauty in all its forms and share it with the world."}
                    </p>
                    <ArrowLink className='ml-8 w-fit self-center ' text='Go to homepage' to='/' />
                  </div>
                  <div className='flex-1 flex flex-col  justify-start'>
                    <h3 className='font-pop font-semibold text-xl mt-2 mb-4'>A Journey of Discovery</h3>
                    <p style={{ height: textHeight ? textHeight + 'px' : 'auto' }} className=''>
                      {"Our mission is to capture life's precious moments in a unique and personalized way. We believe that everyone has a story to tell, and through the art of photography, we aim to tell those stories with creativity and authenticity. Whether it's your wedding day, your craft, or your product, we strive to create high-quality images that capture the essence of your vision. Our goal is to enrich your life through our pictures and provide you with memories that will last a lifetime."}
                    </p>
                    <ArrowLink className='ml-8 w-fit self-center ' text='Visit my gallery' to='/' />
                  </div>
                </div>
              </div>
            </LayoutSection>

          </Layout>
        </PageWrapper>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const trustedBy = await client.fetch(`*[_type == "trustedBy"]`);
  // const products = await client.fetch(`*[_type == "product"]`);
  // console.log(responsibilities)
  return {
    props: {
      trustedBy
    }
  };
}
