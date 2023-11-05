import React from 'react'
import ArrowLink from '../ArrowLink'
import { useAppContext } from '@/utils/appContext'

export default function PageDescription4({ info, link, className, animateName,shadow }) {
  const{locale}=useAppContext()

  return (
    <div className={`${animateName + 'Container'} fixed w-full md:w-1/2 xl:w-[30%] text-primary visible opacity-100 ${className ? className : ''}`}>
      <div className={`${animateName + 'Inner'}  `}>
        <h2 className={`${animateName} font-lora font-bold text-3xl lg:text-5xl invisible  opacity-0 ${shadow ? 'drop-shadow-[0_0px_10px_#000000FF] whitespace-nowrap  md:drop-shadow-[0_0px_20px_#000000FF] ' : ''}`} ><span className={`bg-blackWhite text-transparent bg-clip-text`}>{info?.title?.[locale] || ''}</span></h2>
        <p className={`${animateName} font-pop font-normal my-3 px-4 md:px-0 invisible opacity-0 bg-blackWhite text-base text-transparent bg-clip-text`}>{info?.text?.[locale]||''}</p>
        <ArrowLink arrowClassName={`text-primary`} containerClass='' className={`${animateName} pl-[1.5rem] invisible opacity-0 bg-blackWhite text-transparent bg-clip-text `} text={info?.linkText?.[locale]||''} to={info?.linkUrl||''} inText tabIndex='0' />
      </div>
    </div>
  )
}
