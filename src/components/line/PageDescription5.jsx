import React from 'react'
import ArrowLink from '../ArrowLink'
import Logo from '../Logo'
import LogoAnimated from '../LogoAnimated'

export default function PageDescription5({ info, link, className, animateName, transitionTl }) {

  return (
    <div className={`${animateName + 'Container'} fixed flex justify-center items-center  left-1/2 h-screen w-[50%]  text-primary visible opacity-100 ${className ? className : ''}`}>
      <div className={`${animateName + 'Inner'} flex flex-col justify-center items-center gap-8 pb-[10%]`}>

        {/* <h2 className={`${animateName}  text-center font-lora font-bold text-5xl border-2 border-yellow-300  invisible opacity-0 `} >{"Helloo"}</h2> */}
        <LogoAnimated transitionTl={transitionTl} darkMode className={`${animateName} invisible opacity-0 w-1/2 min-[1800px]:w-[40%]`} />

        <p className={`${animateName} text-center w-2/3 min-[1800px]:w-1/3 font-pop font-normal my-3 invisible opacity-0`}>{info.text}</p>
        <div className='flex flex-col justify-start items-center gap-2 '>
          <ArrowLink arrowClassName={`text-primary`} containerClass='w-fit ml-4' className={`${animateName} invisible opacity-0`} inText text={'Visit gallery'} to={'/gallery'} tabIndex='0' />
          <ArrowLink arrowClassName={`text-primary`} containerClass='w-fit ml-4' className={`${animateName} invisible opacity-0`} inText text={'Work together'} to={'/contact'} tabIndex='0' />
          <ArrowLink arrowClassName={`text-primary`} containerClass='w-fit ml-4' className={`${animateName} invisible opacity-0`} inText text={'Decorate your wall'} to={'/contact#printing'} tabIndex='0' />
        </div>
      </div>
    </div>




  )
}
