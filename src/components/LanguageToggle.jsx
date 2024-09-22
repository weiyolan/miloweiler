import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { TfiWorld } from 'react-icons/tfi'
import { gsap } from 'gsap/dist/gsap'
import Line from './Line'
import { useAppContext } from '@/utils/appContext'
import { usePageContext } from '@/utils/pageContext'

export default function LanguageToggle({ toggleNav }) {
  const router = useRouter()
  const { locales, locale: activeLocal } = router
  const { mobile } = useAppContext()
  let [hovering, setHovering] = useState(false)
  let { darkMode } = usePageContext()

  let ctx = useRef(gsap.context(() => { }))
  const otherLocales = (locales || []).filter(
    (locale) => locale !== activeLocal
  )



  useEffect(() => {
    return () => ctx.current.revert()
  }, [])
  useEffect(() => {
    // if (mobile) { return }
    ctx.current.add(() => {
      gsap.to('.languageLine', {
        width: hovering ? '100%' : 0,
        borderColor: hovering ? 'black' : 'transparent',
        duration: 0.3,
        ease: 'expo.out'
      })
      gsap.to('.languageText', {
        opacity: mobile ? 1 : (hovering ? 1 : 0),
        duration: 0.5,
        delay: hovering ? 0.2 : 0,
        ease: 'expo.out'
      })
      gsap.to('.languageIcon', {
        opacity: hovering ? 0 : 1,
        duration: 0.5,
        delay: hovering ? 0 : 0.2,
        ease: 'expo.out'
      })
    })
  }, [hovering, mobile])


  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      // onClick={()=>toggleNav()}
      className={`absolute md:fixed navButton top-0 right-0 ${darkMode ? 'text-primary' : 'text-darkPrimary'} text-2xl xs:text-xl sm:text-base text-center flex justify-center items-center font-lora  
    font-black  border border-transparent 
    focus-within:outline-darkGrey cursor-pointer select-none m-2 md:m-4 lg:m-5 `}>
      {/* self-center inline-flex */}


      <TfiWorld className={`relative inline-flex md:absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-5 h-5 languageIcon ${darkMode?'text-primary':'text-darkPrimary'}`} />
      <div className='inline-flex align-middle font-lora items-center languageText'>
        {otherLocales.map((locale) => {
          const { pathname, query, asPath } = router
          return (
            <Link
              href={{ pathname, query }}
              as={asPath}
              locale={locale}
              key={locale}
              className='focus:outline-none '
              onClick={() => { ctx.current.add(() => gsap.to(['languageIcon', 'languageText'], { rotate: 360, ease: 'expo.out', duration: 0.3 })) }}
            >
              {locale.toUpperCase()}
              <Line className={'w-0 border-transparent languageLine'} />
            </Link>
          )
        })}

      </div>

    </div>
  )
}
