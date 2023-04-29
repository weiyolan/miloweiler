import React from 'react'
import ArrowLink from '../ArrowLink'

export default function PageDescription({info, link, className, animateName}) {

  return (
    <div className={`${animateName} fixed w-1/3 text-primary opacity-0 ${className ? className : ''}`}>
      <h2 className={`${animateName} font-lora font-bold text-5xl opacity-0`} >{info.title}</h2>
      <p className={`${animateName} font-pop font-light my-3 opacity-0`}>{info.text}</p>
      <ArrowLink className={`${animateName}  opacity-0`} text={'Ask Offer'} to={''} inText tabIndex='0'/>
    </div>
  )
}
