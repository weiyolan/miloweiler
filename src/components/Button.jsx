import React from 'react'
import Link from "next/link"
import { usePageContext } from '@utils/pageContext';
import { useAppContext } from '@utils/appContext';
// import SpireeLogo from './SpireeLogo';

export default function Button({ text, style, className, disable, small, med, handleClick, to }) {
  // let {locale} = useAppContext()
  // let { mobile } = usePageContext()

  function makeLink(children) {
    return <div className='w-fit h-fit'><Link className='' href={to}>{children}</Link></div>
    // return children
  }

  function getContent() {
    return (

      // px-4 py-2 text-sm md:text-sm
      <div
        className={`inline-flex w-fit h-fit relative rounded-full bg-black/30 backdrop-blur
    transition-all text-center
    font-sans font-semibold whitespace-nowrap select-none uppercase tracking-max outline-none
     ${small ? 'text-xs px-2 py-1' : med ? ' text-xs px-3 py-2' : ' px-4 py-2'} border border-solid border-transparent text-primary 
    ${!disable ? 'cursor-pointer  focus-visible:outline-white  hover:scale-105 active:scale-95 hover:bg-black/50 hover:shadow-md active:shadow-none active:bg-black/30' : ''}
    ${className}`}
        style={style}
        onClick={handleClick}
      >
        {/* <div className=''> */}
        {/* TO COMPENSATE FOR TRACKING */}
          <p className='ml-0.5'>
          {text}
        </p>
        {/* <span><SpireeLogo className='w-6 md:w-6 ml-2'/></span> */}

        {/* </div> */}
      </div>
    )
  }

  if (to) {
    return makeLink(getContent())
  }

  return (<>
    {getContent()}
  </>
  )

}
