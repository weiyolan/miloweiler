import React from 'react'
import ArrowLink from '../ArrowLink'

export default function PageDescription4({ info, link, className, animateName,shadow }) {

  return (
    <div className={`${animateName+'Container'} fixed w-full md:w-1/2 lg:w-[30%] text-primary visible opacity-100 ${className ? className : ''}`}>
      <div className={`${animateName + 'Inner'}  `}>
        <h2 className={`${animateName} font-lora font-bold text-3xl lg:text-5xl invisible opacity-0 ${shadow?'drop-shadow-[0_0px_10px_#FFF5EAFF]  md:drop-shadow-[0_0px_20px_#000000FF] ':''}`} ><span className={`bg-blackWhite text-transparent bg-clip-text`}>{info.title}</span></h2>
        <p className={`${animateName} font-pop font-normal my-3 invisible opacity-0 bg-blackWhite text-sm md:text-base text-transparent bg-clip-text`}>{info.text}</p>
        <ArrowLink arrowClassName={`text-primary`} className={`${animateName} invisible opacity-0 bg-blackWhite text-transparent bg-clip-text`} text={'Ask Offer'} to={''} inText tabIndex='0' />
      </div>
    </div>
  )
}
