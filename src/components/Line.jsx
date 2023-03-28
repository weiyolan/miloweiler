import { usePageContext } from '@/utils/pageContext'
import React from 'react'

export default function Line({className}) {
  let {darkMode} = usePageContext();
  return (
    <div className={`h-0 border border-b ${darkMode?'border-b-primary':'border-b-darkPrimary'}  ${className?className:'w-full'}`}/>
  )
}
