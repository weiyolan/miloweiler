// import { usePageContext } from '@/utils/pageContext'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { usePageContext } from '@/utils/pageContext';

export default function Spinner({ className, darkMode, cube }) {
  let { darkMode: pageDarkMode } = usePageContext();

  let newDarkMode = darkMode !== undefined ? darkMode : pageDarkMode


  return (
    <>
      <div className={` ${className ? className : ''}`}>
        {cube ?
          <div className='cubeSpinner w-4 h-4'>
            <div style={{ backgroundColor: (newDarkMode ? '#FFF5EA' : '#000000') + '33', borderColor: newDarkMode ? '#FFF5EA' : '#000000', borderWidth: 1.5, borderStyle: 'solid' }} />
            <div style={{ backgroundColor: (newDarkMode ? '#FFF5EA' : '#000000') + '33', borderColor: newDarkMode ? '#FFF5EA' : '#000000', borderWidth: 1.5, borderStyle: 'solid' }} />
            <div style={{ backgroundColor: (newDarkMode ? '#FFF5EA' : '#000000') + '33', borderColor: newDarkMode ? '#FFF5EA' : '#000000', borderWidth: 1.5, borderStyle: 'solid' }} />
            <div style={{ backgroundColor: (newDarkMode ? '#FFF5EA' : '#000000') + '33', borderColor: newDarkMode ? '#FFF5EA' : '#000000', borderWidth: 1.5, borderStyle: 'solid' }} />
            <div style={{ backgroundColor: (newDarkMode ? '#FFF5EA' : '#000000') + '33', borderColor: newDarkMode ? '#FFF5EA' : '#000000', borderWidth: 1.5, borderStyle: 'solid' }} />
            <div style={{ backgroundColor: (newDarkMode ? '#FFF5EA' : '#000000') + '33', borderColor: newDarkMode ? '#FFF5EA' : '#000000', borderWidth: 1.5, borderStyle: 'solid' }} />
          </div>
          :
          <div className={'spinner w-8 h-8 relative'}>
            <div style={{ backgroundColor: newDarkMode ? '#FFF5EA' : '#000000' }} className="double-bounce1"></div>
            <div style={{ backgroundColor: newDarkMode ? '#FFF5EA' : '#000000' }} className="double-bounce2"></div>
          </div>}
      </div>
    </>
  )
}
