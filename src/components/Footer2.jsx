import Link from "next/link"
import { useRouter } from "next/router";

import { useAppContext } from "@/utils/appContext";
import { CATEGORY_SLUGS } from "@/utils/categories";
import SubTitle from "./SubTitle";
import Layout from "./Layout";
import ThemeToggle from "./ThemeToggle";

const financialInfo = {
  en: '2026 © MiloWeiler, Inc. All rights reserved.',
  fr: '2026 © MiloWeiler, Inc. Tous droits réservés.',
  nl: '2026 © MiloWeiler, Inc. Alle rechten voorbehouden.',
};

// Google "preferred sources" deeplink (https://developers.google.com/search/docs/appearance/preferred-sources).
// A plain link instead of Google's publisher.js button: no third-party script/cookies on the site.
// Only affects Top Stories / AI Mode / AI Overviews for the visitor who opts in, not normal web results.
const PREFERRED_SOURCE_URL = 'https://www.google.com/preferences/source?q=miloweiler.com';
const preferredSourceLabel = {
  en: 'Add as preferred source on Google',
  fr: 'Source préférée sur Google',
  nl: 'Voorkeursbron op Google',
};

// Google "G" mark (official 4-colour logo) so the link is recognisable at a glance.
function GoogleG({ className }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

const legalLinks = {
  en: [
    { text: 'Legal Notice', link: '/legal-notice' },
    { text: 'Terms of Use', link: '/terms-of-use' },
    { text: 'Cookie Notice', link: '/cookie-notice' },
  ],
  fr: [
    { text: 'Mentions légales', link: '/legal-notice' },
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
            <span aria-hidden="true" className="text-foreground/50">|</span>
            <ThemeToggle />
          </div>

          <div className="flex justify-center mt-3">
            <a
              href={PREFERRED_SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap font-mono font-extralight text-xs text-foreground border border-foreground/40 rounded-full px-3 py-1 duration-200 hover:border-foreground focus:outline-none focus-visible:border-foreground"
            >
              <GoogleG className="w-3.5 h-3.5 shrink-0" />
              {preferredSourceLabel[locale] || preferredSourceLabel.en}
            </a>
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
          {i > 0 && <span aria-hidden="true" className="text-foreground/50">|</span>}
          <Link
            href={{ pathname, query }}
            as={asPath}
            locale={loc}
            className={`transition-opacity duration-200 hover:opacity-100 ${loc === activeLocale ? 'font-semibold opacity-100' : 'font-extralight opacity-75'}`}
          >
            {loc.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  )
}
