import '@/styles/globals.css'
import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import { Poppins,Lora } from '@next/font/google'
import { AppWrapper } from '@utils/appContext';
// import { Toaster } from 'react-hot-toast';

// const workSans = Work_Sans({
//   subsets: ['latin'],
//   variable: '--font-worksans',
//   display: 'swap',
// })
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight:['100','200','300','400','500','600','700','800','900']

})
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export default function App({ Component, pageProps }) {
  let [scrolled, setScrolled] = useState(0)

  function handleScroll () {
    let ratio = (document.documentElement.scrollTop + document.body.scrollTop)/(document.documentElement.scrollHeight - document.documentElement.clientHeight)
    setScrolled(ratio)
  }

  useEffect(()=>{
    let ratio = (document.documentElement.scrollTop + document.body.scrollTop)/(document.documentElement.scrollHeight - document.documentElement.clientHeight)
    setScrolled(ratio)
    window.addEventListener('scroll', handleScroll, {passive:true})
    return () => {window.removeEventListener('scroll', handleScroll)}
  },[])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
      </Head>
      <AppWrapper scrolled={scrolled} className={`${poppins.variable} ${lora.variable} font-sans relative scroll-smooth w-full h-[100dh]`}>
        <Component {...pageProps} />
        {/* <Toaster/> */}
      </AppWrapper>

    </>)
}
