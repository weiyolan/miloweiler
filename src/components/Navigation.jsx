import { usePageContext } from '@/utils/pageContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Navigation() {

  return (
    <div className={`fixed w-full top-0 `}>
      <div className={`inline-flex relative items-center gap-6 mx-8 mt-1 px-4 py-2 rounded-full overflow-hidden`}>
        <div className={`bg-black/20 backdrop-blur-sm w-full h-full absolute -translate-x-4`}/>
        <Button text='Home' to='/' />
        <Button text='Gallery' to='/gallery' />
        <Button text='Contact' to='/contact' />
      </div>
    </div>
  )
}

function Button({ text, to }) {
  let {darkMode} = usePageContext()
  const {pathname} = useRouter()


  return (
    <Link className={`relative navButton text-2xl font-lora font-medium ${darkMode?'text-primary':'text-darkPrimary'} ${pathname===to?'underline underline-offset-4 underlin':''}`}
      href={`${to}`}
      // onClick={() => handleClick(to)}
    // title={`Go to the ${text} page`}
    >
      {text}
    </Link>
  )
}