import Link from 'next/link'
import React, { useState } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'

const ArrowLink = ({ text, to, ext, inherit, inText, tabIndex, className, arrowClassName, containerClass }) => {
  let [hovering, setHovering] = useState(false)
  // Nothing to click on (empty Studio field): render no empty, unnamed link.
  if (!text || !to) return null
  // The text is often visibility:hidden until its scroll animation runs; aria-label keeps the link named meanwhile.
  const label = typeof text === 'string' ? text : undefined

  if (ext) {
    return (
      <Link aria-label={label} tabIndex={tabIndex} className={`${inherit ? 'text-inherit' : 'text-foreground fill-foreground font-semibold'} font-semibold min-[460px]:whitespace-pre-wrap sm:whitespace-nowrap  cursor-pointer ${containerClass ? containerClass : ''}`}
        href={to} onFocus={() => { setHovering(true) }} onBlur={() => { setHovering(false) }} rel="noopener noreferrer" target='_blank'>

        <span className={`inline-flex items-center md:text-base ${inText ? 'mt-0' : 'mt-4'} relative ${className ? className : ''}`}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}>
          {text}
          <Arrow inherit={inherit} hovering={hovering} arrowClassName={arrowClassName} />
        </span>
      </Link>
    )
  }

  return (
    <Link aria-label={label} tabIndex={tabIndex} className={` ${inherit ? 'text-inherit font-medium' : 'text-foreground fill-foreground font-semibold'} min-[460px]:whitespace-pre-wrap sm:whitespace-nowrap ${containerClass ? containerClass : ''}  `}
      href={to} onFocus={() => { setHovering(true) }} onBlur={() => { setHovering(false) }}>
      <span className={`inline-flex items-center  md:text-base ${inText ? 'mt-0' : 'mt-4'} relative  ${className ? className : ''}`}
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