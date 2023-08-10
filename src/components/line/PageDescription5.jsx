import React from 'react'
import ArrowLink from '../ArrowLink'
import Logo from '../Logo'
import LogoAnimated from '../LogoAnimated'
import { usePageContext } from "@utils/pageContext"
import FadeDiv from '../FadeDiv'

export default function PageDescription5({ info, link, className, animateName, transitionTl }) {
  // let { mobile } = usePageContext()
  return (
    <div className={`${animateName + 'Container'} fixed left-0 md:left-1/2 md:translate-x-0 h-screen w-full md:w-[50%] text-primary visible opacity-100 ${className ? className : ''}`}>
      <div className={`${animateName + 'Inner'} flex relative flex-col justify-end w-full h-full md:justify-center items-center gap-4 md:gap-8 pb-[10%] md:pb-[10%]`}>
        {/* <h2 className={`${animateName}  text-center font-lora font-bold text-5xl border-2 border-yellow-300  invisible opacity-0 `} >{"Helloo"}</h2> */}
        <LogoAnimated transitionTl={transitionTl} darkMode className={`${animateName} invisible opacity-0  h-full w-4/5 md:min-h-0 md:w-1/2 min-[1800px]:w-[40%]`} />
        {/* Dark Background */}

        <p className={`${animateName} text-center w-full px-[5%] sm:p-0 md:my-3 md:w-2/3 min-[1800px]:w-1/3 font-pop text-sm md:text-base font-light invisible opacity-0`}>{info.text}</p>
        <div className={`flex flex-col justify-start items-center gap-2  w-full   sm:pt-0`}>
          <ArrowLink arrowClassName={`text-primary`} containerClass='w-fit ml-4' className={`${animateName} invisible opacity-0`} inText text={'Visit gallery'} to={'/gallery'} tabIndex='0' />
          <ArrowLink arrowClassName={`text-primary`} containerClass='w-fit ml-4' className={`${animateName} invisible opacity-0`} inText text={'Work together'} to={'/contact'} tabIndex='0' />
          <ArrowLink arrowClassName={`text-primary`} containerClass='w-fit ml-4' className={`${animateName} invisible opacity-0`} inText text={'Decorate your wall'} to={'/contact#printing'} tabIndex='0' />
        </div>

      </div>
    </div >




  )
}
