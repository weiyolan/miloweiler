import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from "react"
import { useAppContext } from "@utils/appContext"
import FadeDiv from './FadeDiv'

export default function BackgroundSplit({ src1, src2, type, flexCol, moves, priority, amount, height, maxMoves, className, animationName, setPageLoaded }) {

  return (
    <div style={{ transform: "translate3d(0, 0, 0)" }} className={`fixed w-full ${height ? height : 'h-screen'} ${animationName ? animationName : ''}  ${className ? className : ''}`} >
      <FadeDiv style={{ transform: "translate3d(0, 0, 0)" }} className={`w-full relative ${height ? height : 'h-full'} ${animationName ? animationName + 'Inner' : ''} `} type={type} amount={amount}>
        <div className={`w-full flex ${flexCol&&'flex-col'} md:flex-row relative ${height ? height : 'h-full'}  bg-gradient-to-br from-darkGrey to-darkGrey z-0 overflow-hidden`} >
          {/* <div className='flex w-full absolute top-0 h-[100vh] ' > */}
          {/* {console.log(height*(1+overflow)+'px')} */}
          {/* {console.log(`translate(-${Y}px,0)`)} */}
          <div className='inline-flex flex-1 h-full relative'>
            {src1 && <Image alt='' fill priority={priority ? priority : false} src={src1} style={{ transform: "translate3d(0, 0, 0)" }} className={`will-change-transform object-cover object-center `} sizes="50vw" quality={90} onLoad={(priority && setPageLoaded !== undefined) ? () => setPageLoaded(true) : false} />}
          </div>
          <div className='inline-flex flex-1 h-full relative'>
            {src2 && <Image alt='' fill priority={priority ? priority : false} src={src2} style={{ transform: "translate3d(0, 0, 0)" }} className={`will-change-transform object-cover object-center `} sizes="50vw" quality={90} onLoad={(priority && setPageLoaded !== undefined) ? () => setPageLoaded(true) : false} />}
          </div>{/* Empty ALT for purely decorative images */}
          {/* </div> */}
        </div>
      </FadeDiv>
    </div>
  )
}
