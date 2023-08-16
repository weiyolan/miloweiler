import { usePageContext } from '@/utils/pageContext'
import Link from 'next/link'
import React, { useState } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'

const ArrowLink = ({ text, to, ext, inherit, inText, tabIndex, className, arrowClassName, containerClass }) => {
  let [hovering, setHovering] = useState(false)
  let { darkMode } = usePageContext();

  if (ext) {
    return (
      <Link tabIndex={tabIndex} className={`${inherit ? 'text-inherit' : darkMode ? 'text-primary' : 'text-black'} font-semibold min-[460px]:whitespace-pre-wrap sm:whitespace-nowrap  cursor-pointer ${containerClass ? containerClass : ''}`}
        href={to} onFocus={() => { setHovering(true) }} onBlur={() => { setHovering(false) }} rel="noopener noreferrer" target='_blank'>

        <span className={`inline-flex items-center text-xl md:text-base ${inText ? 'mt-0' : 'mt-4'} relative ${className ? className : ''}`}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}>
          {text}
          <Arrow inherit={inherit} hovering={hovering} arrowClassName={arrowClassName} />
        </span>
      </Link>
    )
  }

  return (
    <Link tabIndex={tabIndex} className={` ${inherit ? 'text-inherit font-medium' : darkMode ? 'text-primary fill-primary font-semibold' : 'text-darkPrimary fill-darkPrimary font-semibold'} min-[460px]:whitespace-pre-wrap sm:whitespace-nowrap ${containerClass ? containerClass : ''}  `}
      href={to} onFocus={() => { setHovering(true) }} onBlur={() => { setHovering(false) }}>
      <span className={`inline-flex items-center text-xl md:text-base ${inText ? 'mt-0' : 'mt-4'} relative  ${className ? className : ''}`}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}>
        {text}
        <Arrow hovering={hovering} arrowClassName={arrowClassName} />
      </span>
    </Link>
  )
}

export default ArrowLink

function Arrow({ hovering, arrowClassName }) {
  return (
    <span className='block duration-300 relative w-10 h-5 overflow-hidden '>
      <span className={`absolute duration-300 top-1/2 left-0 -translate-y-1/2 ${hovering ? 'translate-x-1/4 scale-125 ' : '-translate-x-[100%] opacity-0'}`}>
        <BsArrowRightShort className={`text-inherit fill-inherit text-3xl md:text-xl ${arrowClassName ? arrowClassName : ''}`} />
      </span>
      <span className={`absolute duration-300 top-1/2 left-0 -translate-y-1/2 ${hovering ? 'translate-x-full scale-105 opacity-0' : ''}`}>
        <BsArrowRightShort className={`text-inherit fill-inherit text-3xl md:text-xl ${arrowClassName ? arrowClassName : ''}`} />
      </span>
    </span>
  )
}