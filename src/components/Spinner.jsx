// import { usePageContext } from '@/utils/pageContext'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { usePageContext } from '@/utils/pageContext';

export default function Spinner({ className, darkMode, cube }) {
  let { darkMode: pageDarkMode } = usePageContext();

  darkMode = darkMode !== undefined ? darkMode : pageDarkMode

  let fill = darkMode ? '#FFF5EA' : '#000'

  return (
    <>
      <div className={` ${className ? className : ''}`}>
        {cube ?
          <div className='cubeSpinner w-4 h-4'>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
          :
          <div className={'spinner w-8 h-8 relative'}>
            <div style={{ backgroundColor: fill }} className="double-bounce1"></div>
            <div style={{ backgroundColor: fill }} className="double-bounce2"></div>
          </div>}
      </div>
    </>
  )
}
