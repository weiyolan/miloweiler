import { useState, useEffect, useRef } from "react";
import Link from "next/link"
import Image from "next/image";

// import useWindowSize from "@utils/useWindowSize";

import AccentTitle from "./AccentTitle";
import { useAppContext } from "@/utils/appContext";
import { usePageContext } from "@/utils/pageContext";
import SubTitle from "./SubTitle";

const socialList = {
  en: [{ text: 'Instagram', ext: true, link: 'https://www.instagram.com/spiree_officiel/' }, { text: 'Facebook', ext: true, link: 'https://www.facebook.com/groups/runeverywhere.spiree/' }],
  fr: [{ text: 'Instagram', ext: true, link: 'https://www.instagram.com/spiree_officiel/' }, { text: 'Facebook', ext: true, link: '/services/#Website' }]
};
const navigateList = {
  en: [{ text: 'Our Collection', link: '/collection' }, { text: 'Pre-Order Sun & Moon', link: '/collection/#pre-order', disabled: false }, { text: 'About Spirée', link: '/about', disabled: false }],
  fr: [{ text: 'Notre Collection', link: '/collection', disabled: false }, { text: 'Pre-Commander', link: '/collection/#pre-order', disabled: false }, { text: 'A Propos Spirée', link: '/about', disabled: false }]
};
const legalList = {
  en: [{ text: 'Legal Notice', link: '/', disable: true }, { text: 'Terms of Use', link: '/services', disable: true }, { text: 'Cookie Notice', link: '/aboutme', disable: true }],
  fr: [{ text: 'Legal Notice', link: '/', disable: true }, { text: 'Terms of Use', link: '/services', disable: true }, { text: 'Cookie Notice', link: '/aboutme', disable: true }],
};
const contactList = {
  en: [
    // { text: 'Info', ext: false, link: '/contact/#informations' },
    { text: 'hello@spiree.run', ext: true, link: "mailto:contact@ywdesign.co?subject=Website%20Project&body=Hi%20Yolan%2C%0A%0AI%20have%20a%20website%20that%20needs%20an%20update.%0ACould%20we%20talk%20about%20this%20any%20time%20soon%3F%0A%0AThanks%20in%20advance%2C%0A%0A" },
    { text: 'Call', ext: false, link: 'tel:+33659775111' },
    // { text: 'Whatsapp', ext: true, link: 'https://wa.me/32471124525?text=Hi+Yolan%2C+%0D%0AI+got+your+WhatsApp+from+your+website+ywdesign.co.+Are+you+free+to+talk+any+time+soon+about+a+project+I+have+in+mind%3F+%0D%0AThanks%2C%0D%0A' },
  ], fr: [
    // { text: 'Infos', ext: false, link: '/contact/#informations' },
    { text: 'hello@spiree.run', ext: true, link: "mailto:contact@ywdesign.co?subject=Website%20Project&body=Hi%20Yolan%2C%0A%0AI%20have%20a%20website%20that%20needs%20an%20update.%0ACould%20we%20talk%20about%20this%20any%20time%20soon%3F%0A%0AThanks%20in%20advance%2C%0A%0A" },
    { text: 'Appeler', ext: false, link: 'tel:+33659775111' },
    // { text: 'Whatsapp', ext: true, link: 'https://wa.me/32471124525?text=Hi+Yolan%2C+%0D%0AI+got+your+WhatsApp+from+your+website+ywdesign.co.+Are+you+free+to+talk+any+time+soon+about+a+project+I+have+in+mind%3F+%0D%0AThanks%2C%0D%0A' },
  ]
};

const financialInfo = {
  en: [
    '2023 SPIRÉE, Inc. All rights reserved.',
    // 'VAT: BE0794.586.584',
    // 'legal address: Hof Savelkoul 40, 2640 Mortsel, Antwerp, Belgium',
    // 'tel: +33638565302', 
    // 'email: contact@ywdesign.co', 
  ],
  fr: [
    '2023 SPIRÉE, Inc. All rights reserved.',
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

  let footerRef = useRef(null)

  let [dimensions, setDimensions] = useState({ width: undefined, height: undefined })

  useEffect(() => {
    function handleSize() {
      const { width, y } = footerRef.current.getBoundingClientRect();
      const height = footerRef.current.offsetHeight;
      let styles = window.getComputedStyle(footerRef.current);
      let margin = parseFloat(styles['marginTop']) +
        parseFloat(styles['marginBottom']);
      if (height > 0) {
        // Math.ceil(height + margin);
        setDimensions({ width: width, height: Math.ceil(height + margin), normalHeight: height, top: y, bottom: y + height });
        // print && console.log('dimensions setted: ' + 'width: ' + width+' , height: '+ height+ ', top: '+y+', bottom: '+(y + height) )
      }
    }

    window.addEventListener("resize", handleSize);
    handleSize()
    return () => window.removeEventListener("resize", handleSize);
    // print && console.log(dimensions?.height === undefined || )

  }, [mobile])



  useEffect(() => {
      // console.log(dimensions.height)
      if (dimensions?.height > 0 && setFooterHeight) {
      setFooterHeight(dimensions.height)
    } else if (dimensions.normalHeight > 0 && setFooterNormalHeight !== undefined) {
      setFooterNormalHeight(dimensions.normalHeight)
    }
  }, [dimensions])

  function getContent() {
    return (
      <>
        <div className='flex flex-col sm:flex-row items-center sm:items-start justify-between max-w-6xl mx-auto'>


          <Links mobile={mobile} title='Navigate' list={navigateList[locale]} />
          <Links mobile={mobile} title='Socials' list={socialList[locale]} />

          <div className='flex flex-col items-center gap-2 sm:items-start'>
            <SubTitle noMargin small className='pt-2' center mainTitle='Stay In Touch' />
          </div>

          {(!mobile || (mobile && setFooterHeight === undefined)) && <Links mobile={mobile} title='Contact' list={contactList[locale]} />}
          {(!mobile || (mobile && setFooterHeight === undefined)) && <Links mobile={mobile} title='Legal' list={legalList[locale]} />}

        </div>

        <div role='presentation' className='w-full text-xs text-center mt-2 text-primary font-thin'>
          <ul role='presentation' className='inline-flex flex-wrap justify-center'>
            {financialInfo[locale].map((val, i) => { return (<li role='presentation' className={`${i === 0 ? '' : 'pl-1'}`} key={val}>{`${i === 0 ? '' : '∘ '}${val}`}</li>) })}
          </ul>
        </div>


      </>

    )
  }

  if (noMotion) {
    return (
      <section
        ref={footerRef}
        style={{ ...style }}
        className={`${style?.position === undefined ? 'relative' : ''} backdrop-blur bg-darkGrey ${noMargin ? '' : 'mt-4 md:mt-10'} pt-2 px-4 pb-2 lg:pt-4 w-full ${className}`}>

        {getContent()}

      </section>)
  }

  // ========================== MAIN FOOTER CONTENT HERE =======================
  return (
    <motion.section ref={footerRef}
      initial={{ y: `${width < breakPointSmall ? 100 : 200}` }}
      whileInView={{ y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }}
      viewport={{ once: true }}
      style={style}
      className={`${style?.position === undefined ? 'relative' : ''} backdrop-blur bg-darkGrey ${noMargin ? '' : 'mt-4 md:mt-10'} pt-2 px-4 pb-2 lg:pt-4   w-full ${className}`}>

      {getContent()}
 

    </motion.section>
  )
}

function Links({ title, list, mobile }) {
  return (
    // <div className={`${position === 'center' ? 'text-center ' : position === 'left' ? 'text-left ' : 'text-right '}  align-start px-0`}>
    <div className={`text-center sm:text-left `}>
      <SubTitle small noMargin className='pt-2' left mainTitle={title} />
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
              <Link href={item.link} target='_blank' className='focus:outline-none cursor-alias focus-within:scale-110 duration-200 border border-transparent focus-within:border-b-white hover:border-b-white ' rel="noopener noreferrer" >
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

