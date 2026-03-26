import React from 'react'
import { usePageContext } from '@utils/pageContext'
// import { } from 'framer-
export default function SubTitle({ mainTitle, subTitle, left, right, style, small, className , child,  darkMode:darkModeProp}) {

  const { darkMode: darkModeContext } = usePageContext()

  let darkMode = darkModeProp===undefined?darkModeContext:darkModeProp
  // let darkMode=false

  function textStyle() {
    return left ? 'text-left' : right ? 'text-right' : 'text-center'
  }

  return (
    // whitespace-pre-wrap min-[445px]:whitespace-nowrap sm:whitespace-pre-wrap md:whitespace-nowrap 

    <div style={style} className={`${style === undefined ? 'relative' : ''} w-full ${darkMode ? 'text-primary' : 'text-black'} ${className}`}>
      <h2 className={` font-extrabold  
      whitespace-pre-wrap md:whitespace-nowrap
      ${small?'text-lg font-sans':'font-serif text-2xl mobm:text-2xl sm:text-3xl mb-2 sm:mb-2 lg:mb-6 lg:text-3xl'}  ${child?child+'-child':''}`}>
            {mainTitle}
      </h2>
{/* whitespace-pre-wrap sm:whitespace-nowrap md:whitespace-nowrap */}
      <div className={`font-sans whitespace-pre-wrap ${left||right?'text-justify':''} ${child?child+'-child':''}`}>
        {subTitle}
      </div>

    </div>


  )
}
