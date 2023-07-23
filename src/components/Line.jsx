import { usePageContext } from '@/utils/pageContext'
import React from 'react'

export default function Line({className}) {
  let {darkMode} = usePageContext();
  return (
    <div className={`h-0 border rounded-xl ${className?className: darkMode?'border-primary':'border-darkPrimary' + 'w-full'} `}/>
  )
}
