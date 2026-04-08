import { useState, useEffect } from "react";
import Link from "next/link"
import { useRouter } from "next/router";

import { useAppContext } from "@/utils/appContext";
import { CATEGORY_SLUGS } from "@/utils/categories";
import SubTitle from "./SubTitle";
import Layout from "./Layout";

const financialInfo = {
  en: '2026 MiloWeiler, Inc. All rights reserved.',
  fr: '2026 MiloWeiler, Inc. Tous droits r\u00e9serv\u00e9s.',
  nl: '2026 MiloWeiler, Inc. Alle rechten voorbehouden.',
};

const legalLinks = {
  en: [
    { text: 'Legal Notice', link: '/legal-notice' },
    { text: 'Terms of Use', link: '/terms-of-use' },
    { text: 'Cookie Notice', link: '/cookie-notice' },
  ],
  fr: [
    { text: 'Mentions l\u00e9gales', link: '/legal-notice' },
    { text: "Conditions d'utilisation", link: '/terms-of-use' },
    { text: 'Politique de cookies', link: '/cookie-notice' },
  ],
  nl: [
    { text: 'Juridische mededeling', link: '/legal-notice' },
    { text: 'Gebruiksvoorwaarden', link: '/terms-of-use' },
    { text: 'Cookieverklaring', link: '/cookie-notice' },
  ],
};


export default function Footer2({ style, className, noMotion, noMargin, setFooterHeight, setFooterNormalHeight }) {
  let { locale, isMobile: mobile, businessInfo, categoryShortLabels } = useAppContext();

  // Build dynamic lists from businessInfo context
  const phoneRaw = (businessInfo?.phone || '').replace(/\s/g, '');
  const whatsappMsg = encodeURIComponent(businessInfo?.whatsappMessage?.[locale] || '');
  const mailSubject = encodeURIComponent(businessInfo?.mailtoSubject?.[locale] || '');
  const mailBody = encodeURIComponent(businessInfo?.mailtoBody?.[locale] || '');

  const contactItems = [
    { text: locale === 'fr' ? 'Appeler' : locale === 'nl' ? 'Bellen' : 'Call', link: `tel:${phoneRaw}` },
    { text: 'WhatsApp', ext: true, link: `https://wa.me/${businessInfo?.whatsappNumber || ''}?text=${whatsappMsg}` },
    { text: businessInfo?.email || '', ext: true, link: `mailto:${businessInfo?.email || ''}?subject=${mailSubject}&body=${mailBody}` },
    { text: locale === 'fr' ? 'Page de contact' : locale === 'nl' ? 'Contactpagina' : 'Contact Page', link: '/contact' },
  ];

  const socialItems = [
    businessInfo?.socialInstagram && { text: 'Instagram', ext: true, link: businessInfo.socialInstagram },
    businessInfo?.socialUnsplash && { text: 'Unsplash', ext: true, link: businessInfo.socialUnsplash },
    businessInfo?.socialLinkedin && { text: 'LinkedIn', ext: true, link: businessInfo.socialLinkedin },
  ].filter(Boolean);

  const portfolioItems = CATEGORY_SLUGS.map(slug => ({
    text: categoryShortLabels?.[slug]?.[locale] || slug,
    link: `/${slug}`,
  }));

  return (
    <Layout style={{ ...style }} className={`relative bg-gradient-to-b from-surface text-foreground pt-12 mt-12 md:mt-24 to-surface force-dark  ${noMargin ? '' : ''}`}>
      <section
        className={`relative lg:px-16 xl:px-24  max-w-7xl  px-4 pb-2  w-full mx-auto ${className}`}>
        <div className='flex flex-col sm:flex-row  items-center sm:items-start justify-between max-w-6xl mx-auto'>

          <Links mobile={mobile} title='Portfolio' list={portfolioItems} />
          <Links mobile={mobile} title='Socials' list={socialItems} />
          <Links mobile={mobile} title='Contact' list={contactItems} />
          <Links mobile={mobile} title='Legal' list={legalLinks[locale] || legalLinks.en} />

        </div>

          <div className="flex justify-center items-center mt-4 gap-3 mb-1">
            <LanguageSwitch />
            <span className="text-foreground/40">|</span>
            <ThemeToggle />
          </div>

        <div role='presentation' className='w-full text-xs text-center mt-4 text-foreground font-thin font-mono'>
          <ul role='presentation' className='inline-flex flex-wrap justify-center'>
            <li>{financialInfo[locale] || financialInfo.en}</li>
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
      <SubTitle small noMargin className='pt-4 font-sans md:text-left text-center text-foreground' left={mobile?false:true} mainTitle={title} />
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
              className={`text-foreground font-mono font-extralight whitespace-nowrap text-sm sm:text-sm  `} >
              <Link href={item.link} target='_blank' className='focus:outline-none cursor-pointer focus-within:scale-110 duration-200 border border-transparent focus-within:border-b-foreground hover:border-b-foreground ' rel="noopener noreferrer" >
                {item.text} {mobile && i < list.length - 1 ? ' |' : ''}
              </Link>
            </li>
          )
        }
        else {
          return (
            <li key={i}
              className={`${item.disabled ? 'text-foreground/50' : 'text-foreground'} font-mono font-extralight whitespace-nowrap text-sm sm:text-sm `} >
              {item.disabled ? item.text :
                <Link className='focus:outline-none focus-within:scale-110 duration-200 border border-transparent focus-within:border-b-foreground hover:border-b-foreground  ' href={item.link}>
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
    <div className="flex items-center gap-2 font-mono text-sm text-foreground">
      {(locales || []).map((loc, i) => (
        <span key={loc} className="flex items-center gap-2">
          {i > 0 && <span className="text-foreground/40">|</span>}
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
      className="text-foreground font-mono text-sm transition-opacity hover:opacity-70">
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
