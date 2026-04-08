import { useState, useEffect } from "react";
import Link from "next/link"
import { useRouter } from "next/router";

import { useAppContext } from "@/utils/appContext";
import { usePageContext } from "@/utils/pageContext";
import SubTitle from "./SubTitle";
import Layout from "./Layout";

const socialList = {
  en: [{ text: 'Instagram', ext: true, link: 'https://www.instagram.com/miloweiler/' }, { text: 'Unsplash', ext: true, link: 'https://unsplash.com/@miloweiler' }, { text: 'LinkedIn', ext: true, link: 'https://www.linkedin.com/in/mwphotography' }],
  fr: [{ text: 'Instagram', ext: true, link: 'https://www.instagram.com/miloweiler/' }, { text: 'Unsplash', ext: true, link: 'https://unsplash.com/@miloweiler' }, { text: 'LinkedIn', ext: true, link: 'https://www.linkedin.com/in/mwphotography' }],
};
const navigateList = {
  en: [{ text: 'Home', link: '/' }, { text: 'Commissioned', link: '/commissioned', disabled: false }, { text: 'Personal', link: '/personal', disabled: false }, { text: 'Contact', link: '/contact', disabled: false }, { text: 'Printing', link: '/contact/#printing', disabled: false }],
  fr: [{ text: 'Acceuil', link: '/', disabled: false }, { text: 'Commande', link: '/commissioned', disabled: false }, { text: 'Personel', link: '/personal', disabled: false }, { text: 'Contact', link: '/contact', disabled: false }, { text: 'Impression', link: '/contact/#printing', disabled: false }],
};
const legalList = {
  en: [{ text: 'Legal Notice', link: '/', disable: true }, { text: 'Terms of Use', link: '/services', disable: true }, { text: 'Cookie Notice', link: '/aboutme', disable: true }],
  fr: [{ text: 'Legal Notice', link: '/', disable: true }, { text: 'Terms of Use', link: '/services', disable: true }, { text: 'Cookie Notice', link: '/aboutme', disable: true }],
};
const contactList = {
  en: [
    { text: 'Call', ext: false, link: 'tel:+32476506209' },
    { text: 'WhatsApp', ext: true, link: 'https://wa.me/32476506209?text=Hi+Milo%2C+%0D%0AI+got+your+WhatsApp+from+your+website+miloweiler.com.+Are+you+free+to+talk+any+time+soon+about+a+project+I+have+in+mind%3F+%0D%0AThanks%2C%0D%0A' },
    { text: 'milo.weiler@gmail.com', ext: true, link: "mailto:milo.weiler@gmail.com?subject=Photography%20Project&body=Hi%20Milo%2C%0A%0AI%20have%20a%20project%20for%20you.%0ACould%20we%20talk%20about%20this%20any%20time%20soon%3F%0A%0AThanks%20in%20advance%2C%0A%0A" },
  ], fr: [
    { text: 'Appeler', ext: false, link: 'tel:+32476506209' },
    { text: 'WhatsApp', ext: true, link: 'https://wa.me/32476506209?text=Hi+Milo%2C+%0D%0AI+got+your+WhatsApp+from+your+website+miloweiler.com.+Are+you+free+to+talk+any+time+soon+about+a+project+I+have+in+mind%3F+%0D%0AThanks%2C%0D%0A' },
    { text: 'milo.weiler@gmail.com', ext: true, link: "mailto:milo.weiler@gmail.com?subject=Photography%20Project&body=Hi%20Milo%2C%0A%0AI%20have%20a%20project%20for%20you.%0ACould%20we%20talk%20about%20this%20any%20time%20soon%3F%0A%0AThanks%20in%20advance%2C%0A%0A" },
  ]
};

const financialInfo = {
  en: [
    '2026 MiloWeiler, Inc. All rights reserved.',
  ],
  fr: [
    '2026 MiloWeiler, Inc. Tous droits reserves.',
  ]
};


export default function Footer2({ style, className, noMotion, noMargin, setFooterHeight, setFooterNormalHeight }) {
  let { locale } = useAppContext();
  let { mobile } = usePageContext();

  return (
    <Layout style={{ ...style }} className={`relative bg-gradient-to-b from-surface text-background pt-24 md:pt-32 to-surface  ${noMargin ? '' : ''}`}>
      <section
        className={`relative lg:px-16 xl:px-24  max-w-7xl  px-4 pb-2  w-full mx-auto ${className}`}>
        <div className='flex flex-col sm:flex-row  items-center sm:items-start justify-between max-w-6xl mx-auto'>

          <Links mobile={mobile} title='Navigate' list={navigateList[locale]} />
          <Links mobile={mobile} title='Socials' list={socialList[locale]} />
          <Links mobile={mobile} title='Contact' list={contactList[locale]} />
          <Links mobile={mobile} title='Legal' list={legalList[locale]} />

        </div>

          <div className="flex justify-center items-center mt-4 gap-3 mb-1">
            <LanguageSwitch />
            <span className="text-background/40">|</span>
            <ThemeToggle />
          </div>

        <div role='presentation' className='w-full text-xs text-center mt-4 text-background font-thin font-mono'>
          <ul role='presentation' className='inline-flex flex-wrap justify-center'>
            {financialInfo[locale].map((val, i) => { return (<li role='' className={`${i === 0 ? '' : 'pl-1'}`} key={val}>{`${i === 0 ? '' : '| '}${val}`}</li>) })}
            <li className="pl-1 ">
              | Powered By <Link className="underline" href={'https://www.ywdesign.co'} rel="noopener noreferrer">ywdesign.co</Link>
            </li>
          </ul>
        </div>
      </section>

    </Layout>
  )

}

function Links({ title, list, mobile }) {
  return (
    <div className={`text-center sm:text-left `}>
      <SubTitle small noMargin className='pt-4 font-sans md:text-left text-center text-background' left={mobile?false:true} mainTitle={title} />
      <List mobile={mobile} list={list} />
    </div>
  )
}

function List({ list, mobile }) {

  return (
    <ul className='font-sans flex flex-wrap sm:flex-col sm:flex-nowrap justify-center gap-x-2 '>
      {list.map((item, i) => {
        if (item.ext) {
          return (
            <li key={i}
              className={`text-background font-mono font-extralight whitespace-nowrap text-sm sm:text-sm  `} >
              <Link href={item.link} target='_blank' className='focus:outline-none cursor-pointer focus-within:scale-110 duration-200 border border-transparent focus-within:border-b-background hover:border-b-background ' rel="noopener noreferrer" >
                {item.text} {mobile && i < list.length - 1 ? ' |' : ''}
              </Link>
            </li>
          )
        }
        else {
          return (
            <li key={i}
              className={`${item.disabled ? 'text-background/50' : 'text-background'} font-mono font-extralight whitespace-nowrap text-sm sm:text-sm `} >
              {item.disabled ? item.text :
                <Link className='focus:outline-none focus-within:scale-110 duration-200 border border-transparent focus-within:border-b-background hover:border-b-background  ' href={item.link}>
                  {item.text} {mobile && i < list.length - 1 ? ' |' : ''}
                </Link>}
            </li>)
        }
      })}
    </ul>

  )
}

function LanguageSwitch() {
  const router = useRouter()
  const { locales, locale: activeLocale, pathname, query, asPath } = router

  return (
    <div className="flex items-center gap-2 font-mono text-sm text-background">
      {(locales || []).map((loc, i) => (
        <span key={loc} className="flex items-center gap-2">
          {i > 0 && <span className="text-background/40">|</span>}
          <Link
            href={{ pathname, query }}
            as={asPath}
            locale={loc}
            className={`transition-opacity duration-200 hover:opacity-100 ${loc === activeLocale ? 'font-semibold opacity-100' : 'font-extralight opacity-60'}`}
          >
            {loc.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  )
}

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const toggle = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  if (!mounted) return null;

  return (
    <button onClick={toggle} aria-label="Toggle dark mode"
      className="text-background font-mono text-sm transition-opacity hover:opacity-70">
      <svg className="hidden dark:block w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <svg className="block dark:hidden w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
