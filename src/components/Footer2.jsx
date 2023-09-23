import { useState, useEffect, useRef } from "react";
import Link from "next/link"
import Image from "next/image";

// import useWindowSize from "@utils/useWindowSize";

import AccentTitle from "./AccentTitle";
import { useAppContext } from "@/utils/appContext";
import { usePageContext } from "@/utils/pageContext";
import SubTitle from "./SubTitle";
import Layout from "./Layout";

const socialList = {
  en: [{ text: 'Instagram', ext: true, link: 'https://www.instagram.com/miloweiler/' }, { text: 'Unsplash', ext: true, link: 'https://unsplash.com/@miloweiler' }, { text: 'LinkedIn', ext: true, link: 'https://www.linkedin.com/in/mwphotography' }],
  fr: [{ text: 'Instagram', ext: true, link: 'https://www.instagram.com/miloweiler/' }, { text: 'Unsplash', ext: true, link: 'https://unsplash.com/@miloweiler' }, { text: 'LinkedIn', ext: true, link: 'https://www.linkedin.com/in/mwphotography' }],
};
const navigateList = {
  en: [{ text: 'Home', link: '/' }, { text: 'Gallery', link: '/gallery', disabled: false }, { text: 'Contact', link: '/contact', disabled: false }, { text: 'Printing', link: '/contact/#printing', disabled: false }],
  fr: [{ text: 'Acceuil', link: '/', disabled: false }, { text: 'Gallerie', link: '/gallery', disabled: false }, { text: 'Contact', link: '/contact', disabled: false }, { text: 'Impression', link: '/contact/#printing', disabled: false }],
};
const legalList = {
  en: [{ text: 'Legal Notice', link: '/', disable: true }, { text: 'Terms of Use', link: '/services', disable: true }, { text: 'Cookie Notice', link: '/aboutme', disable: true }],
  fr: [{ text: 'Legal Notice', link: '/', disable: true }, { text: 'Terms of Use', link: '/services', disable: true }, { text: 'Cookie Notice', link: '/aboutme', disable: true }],
};
const contactList = {
  en: [
    // { text: 'Info', ext: false, link: '/contact/#informations' },
    { text: 'Call', ext: false, link: 'tel:+32476506209' },
    { text: 'WhatsApp', ext: true, link: 'https://wa.me/32476506209?text=Hi+Milo%2C+%0D%0AI+got+your+WhatsApp+from+your+website+miloweiler.com.+Are+you+free+to+talk+any+time+soon+about+a+project+I+have+in+mind%3F+%0D%0AThanks%2C%0D%0A' },
    { text: 'contact@miloweiler.com', ext: true, link: "mailto:contact@miloweiler.com?subject=Photography%20Project&body=Hi%20Milo%2C%0A%0AI%20have%20a%20project%20for%20you.%0ACould%20we%20talk%20about%20this%20any%20time%20soon%3F%0A%0AThanks%20in%20advance%2C%0A%0A" },
    // { text: 'Whatsapp', ext: true, link: 'https://wa.me/32471124525?text=Hi+Yolan%2C+%0D%0AI+got+your+WhatsApp+from+your+website+ywdesign.co.+Are+you+free+to+talk+any+time+soon+about+a+project+I+have+in+mind%3F+%0D%0AThanks%2C%0D%0A' },
  ], fr: [
    // { text: 'Infos', ext: false, link: '/contact/#informations' },
    { text: 'Appeler', ext: false, link: 'tel:+32476506209' },
    { text: 'WhatsApp', ext: true, link: 'https://wa.me/32476506209?text=Hi+Milo%2C+%0D%0AI+got+your+WhatsApp+from+your+website+miloweiler.com.+Are+you+free+to+talk+any+time+soon+about+a+project+I+have+in+mind%3F+%0D%0AThanks%2C%0D%0A' },
    { text: 'contact@miloweiler.com', ext: true, link: "mailto:contact@miloweiler.com?subject=Photography%20Project&body=Hi%20Milo%2C%0A%0AI%20have%20a%20project%20for%20you.%0ACould%20we%20talk%20about%20this%20any%20time%20soon%3F%0A%0AThanks%20in%20advance%2C%0A%0A" },
    // { text: 'Whatsapp', ext: true, link: 'https://wa.me/32471124525?text=Hi+Yolan%2C+%0D%0AI+got+your+WhatsApp+from+your+website+ywdesign.co.+Are+you+free+to+talk+any+time+soon+about+a+project+I+have+in+mind%3F+%0D%0AThanks%2C%0D%0A' },
  ]
};

const financialInfo = {
  en: [
    '2023 MiloWeiler, Inc. All rights reserved.',
    // 'VAT: BE0794.586.584',
    // 'legal address: Hof Savelkoul 40, 2640 Mortsel, Antwerp, Belgium',
    // 'tel: +33638565302', 
    // 'email: contact@ywdesign.co', 
  ],
  fr: [
    '2023 MiloWeiler, Inc. Tous droits réservés.',
    // 'TVA: BE0794.586.584',
    // 'adresse juridique: Hof Savelkoul 40, 2640 Mortsel, Antwerp, Belgique',
    // 'tel: +33638565302', 
    // 'email: contact@ywdesign.co', 
  ]
};


export default function Footer2({ style, className, noMotion, noMargin, setFooterHeight, setFooterNormalHeight }) {
  let { width, scrolled, locale } = useAppContext();
  let { mobile } = usePageContext();
  let breakPointSmall = 640;

  // let footerRef = useRef(null)

  let [dimensions, setDimensions] = useState({ width: undefined, height: undefined })

  // useEffect(() => {
  //   function handleSize() {
  //     const { width, y } = footerRef.current.getBoundingClientRect();
  //     const height = footerRef.current.offsetHeight;
  //     let styles = window.getComputedStyle(footerRef.current);
  //     let margin = parseFloat(styles['marginTop']) +
  //       parseFloat(styles['marginBottom']);
  //     if (height > 0) {
  //       // Math.ceil(height + margin);
  //       setDimensions({ width: width, height: Math.ceil(height + margin), normalHeight: height, top: y, bottom: y + height });
  //       // print && console.log('dimensions setted: ' + 'width: ' + width+' , height: '+ height+ ', top: '+y+', bottom: '+(y + height) )
  //     }
  //   }

  //   window.addEventListener("resize", handleSize);
  //   handleSize()
  //   return () => window.removeEventListener("resize", handleSize);
  //   // print && console.log(dimensions?.height === undefined || )

  // }, [mobile])



  // useEffect(() => {
  //   // console.log(dimensions.height)
  //   if (dimensions?.height > 0 && setFooterHeight) {
  //     setFooterHeight(dimensions.height)
  //   } else if (dimensions.normalHeight > 0 && setFooterNormalHeight !== undefined) {
  //     setFooterNormalHeight(dimensions.normalHeight)
  //   }
  // }, [dimensions])


  return (
    <Layout style={{ ...style }} className={`relative bg-darkGrey   ${noMargin ? '' : 'mt-4 md:mt-10'}`}>
      <section
        className={`relative lg:px-16 xl:px-24  max-w-7xl pt-2 px-4 pb-2 lg:pt-4 w-full mx-auto ${className}`}>
        <div className='flex flex-col sm:flex-row items-center sm:items-start justify-between max-w-6xl mx-auto'>

          <Links mobile={mobile} title='Navigate' list={navigateList[locale]} />
          <Links mobile={mobile} title='Socials' list={socialList[locale]} />

          {/* <div className='flex flex-col items-center gap-2 sm:items-start'>
          <SubTitle darkMode={true} noMargin small className='pt-2' center mainTitle='Stay In Touch' />
        </div> */}

          <Links mobile={mobile} title='Contact' list={contactList[locale]} />
          <Links mobile={mobile} title='Legal' list={legalList[locale]} />

        </div>

        <div role='presentation' className='w-full text-xs text-center mt-2 text-primary font-thin'>
          <ul role='presentation' className='inline-flex flex-wrap justify-center'>
            {financialInfo[locale].map((val, i) => { return (<li role='' className={`${i === 0 ? '' : 'pl-1'}`} key={val}>{`${i === 0 ? '' : '∘ '}${val}`}</li>) })}
            <li className="pl-1 ">
              ∘ Powered By <Link className="underline" href={'https://www.ywdesign.co'} rel="noopener noreferrer">ywdesign.co</Link>
            </li>
          </ul>
        </div>
      </section>

    </Layout>
  )

}

function Links({ title, list, mobile }) {
  return (
    // <div className={`${position === 'center' ? 'text-center ' : position === 'left' ? 'text-left ' : 'text-right '}  align-start px-0`}>
    <div className={`text-center sm:text-left `}>
      <SubTitle small noMargin className='pt-2 md:text-left text-center' left={mobile?false:true} mainTitle={title} darkMode={true} />
      <List mobile={mobile} list={list} />
    </div>
  )
}

function List({ list, mobile }) {

  return (
    <ul className='font-pop flex flex-wrap sm:flex-col sm:flex-nowrap justify-center gap-x-2 '>
      {list.map((item, i) => {
        if (item.ext) {
          return (
            <li key={i}
              className={`text-primary font-extralight whitespace-nowrap text-sm sm:text-sm  `} >
              <Link href={item.link} target='_blank' className='focus:outline-none cursor-pointer focus-within:scale-110 duration-200 border border-transparent focus-within:border-b-white hover:border-b-white ' rel="noopener noreferrer" >
                {item.text} {mobile && i < list.length - 1 ? ' |' : ''}
              </Link>
            </li>
          )
        }
        else {
          return (
            <li key={i}
              className={`${item.disabled ? 'text-primary/50' : 'text-primary'} font-extralight whitespace-nowrap text-sm sm:text-sm `} >
              {item.disabled ? item.text :
                <Link className='focus:outline-none focus-within:scale-110 duration-200 border border-transparent focus-within:border-b-white hover:border-b-white  ' href={item.link}>
                  {item.text} {mobile && i < list.length - 1 ? ' |' : ''}
                </Link>}
            </li>)
        }
      })}
    </ul>

  )
}

