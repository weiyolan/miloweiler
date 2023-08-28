import React from 'react'
import ArrowLink from '../ArrowLink'
// import Logo from '../Logo'
import LogoAnimated from '../LogoAnimated'
import { useAppContext } from '@/utils/appContext'
// import FadeDiv from '../FadeDiv'

export default function PageDescription5({ info, link, className, animateName, transitionTl }) {
  let { locale } = useAppContext()
  // console.log(info?.text?.[locale] || '')
  return (
    <div className={`${animateName + 'Container'} fixed left-0 bottom-0 md:left-1/2 md:translate-x-0 h-[100vh] w-full md:w-[50%] text-primary visible opacity-100 ${className ? className : ''}`}>
      <div className={`${animateName + 'Inner'} flex relative flex-col justify-end w-full h-full md:justify-center items-center gap-4 mobm:gap-14 md:gap-8 pb-[15%] mobm:pb-[20%] mobm:pt-[10%]`}>
        {/* <h2 className={`${animateName}  text-center font-lora font-bold text-5xl border-2 border-yellow-300  invisible opacity-0 `} >{"Helloo"}</h2> */}
        <LogoAnimated transitionTl={transitionTl} darkMode className={`${animateName} invisible opacity-0  h-full w-4/5 md:min-h-0 md:w-1/2 min-[1800px]:w-[40%]`} />
        {/* Dark Background */}

        <p className={`${animateName} text-center w-full px-[5%] sm:p-0 md:my-3 md:w-2/3 min-[1800px]:w-1/3 font-pop text-base font-light invisible opacity-0`}>{info?.text?.[locale]||''}</p>
        <div className={`flex flex-col justify-start items-center gap-2  w-full   sm:pt-0`}>
          <ArrowLink arrowClassName={`text-primary`} containerClass='w-fit ml-4' className={`${animateName} invisible opacity-0`} inText text={info?.linkText1?.[locale]||''} to={info?.linkUrl1||''} tabIndex='0' />
          <ArrowLink arrowClassName={`text-primary`} containerClass='w-fit ml-4' className={`${animateName} invisible opacity-0`} inText text={info?.linkText2?.[locale]||''} to={info?.linkUrl2||''} tabIndex='0' />
          <ArrowLink arrowClassName={`text-primary`} containerClass='w-fit ml-4' className={`${animateName} invisible opacity-0`} inText text={info?.linkText3?.[locale]||''} to={info?.linkUrl3||''} tabIndex='0' />
        </div>

      </div>
    </div >




  )
}
