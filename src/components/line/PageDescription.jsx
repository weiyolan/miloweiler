import React from 'react'
import ArrowLink from '../ArrowLink'

export default function PageDescription({ info, link, className, animateName, shadow }) {

  return (
    <div className={`${animateName+'Container'} fixed w-[90%] sm:w-2/3 md:w-1/2  lg:w-1/3 text-primary visible opacity-100 ${className ? className : ''}`}>
      <div className={`${animateName + 'Inner'}  `}>
        <h2 className={`${animateName} ${shadow?'drop-shadow-[0_0px_20px_#FFF5EAFF] ':''} font-lora font-bold text-2xl md:text-3xl lg:text-5xl invisible opacity-0`} >{info.title}</h2>
        <p className={`${animateName}  font-pop font-light my-3 invisible opacity-0 text-sm md:text-base`}>{info.text}</p>
        <ArrowLink className={`${animateName} invisible opacity-0`} text={'Ask Offer'} to={''} inText tabIndex='0' />
      </div>
    </div>
  )
}
