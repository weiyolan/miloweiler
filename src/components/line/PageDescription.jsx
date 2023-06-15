import React from 'react'
import ArrowLink from '../ArrowLink'

export default function PageDescription({ info, link, className, animateName }) {

  return (
    <div className={`${animateName+'Container'} fixed w-1/3 text-primary visible opacity-100 ${className ? className : ''}`}>
      <div className={`${animateName + 'Inner'}  `}>
        <h2 className={`${animateName} font-lora font-bold text-5xl invisible opacity-0`} >{info.title}</h2>
        <p className={`${animateName} font-pop font-light my-3 invisible opacity-0`}>{info.text}</p>
        <ArrowLink className={`${animateName} invisible opacity-0`} text={'Ask Offer'} to={''} inText tabIndex='0' />
      </div>
    </div>
  )
}
