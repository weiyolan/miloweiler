import { usePageContext } from '@/utils/pageContext'
import React from 'react'

export default function Line({className}) {
  let {darkMode} = usePageContext();
  return (
    <div className={`h-0 border border-b ${className?className: darkMode?'border-b-primary':'border-b-darkPrimary' + ' w-full'}`}/>
  )
}
