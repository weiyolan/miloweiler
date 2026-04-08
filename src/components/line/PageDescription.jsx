import React from 'react'
import ArrowLink from '../ArrowLink'
import { useAppContext } from '@/utils/appContext'

export default function PageDescription({ info, link, className, animateName, shadow }) {
  const{locale}=useAppContext()

  return (
    <div className={`${animateName+'Container'} fixed w-[90%] sm:w-2/3 md:w-1/2  xl:w-1/3 text-foreground visible opacity-100 ${className ? className : ''}`}>
      <div className={`${animateName + 'Inner'}  `}>
        <h2 className={`${animateName} ${shadow ? 'drop-shadow-[0_0px_10px_var(--color-foreground)] md:drop-shadow-[0_0px_20px_var(--color-foreground)]' : ''} font-serif font-extrabold text-6xl lg:text-5xl invisible opacity-0 `} >{info?.title?.[locale] || ''}</h2>
        <p className={`${animateName}  font-sans font-normal my-3 invisible opacity-0 text-base`}>{info?.text?.[locale]||''}</p>
        <ArrowLink className={`${animateName} invisible opacity-0`} arrowClassName={''} text={info?.linkText?.[locale]||''} to={info?.linkUrl||''} inText tabIndex='0' />
      </div>
    </div>
  )
}
