import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from "react"
import { useAppContext } from "@utils/appContext"
import FadeDiv from './FadeDiv'

export default function Background({ src, type, moves, priority, amount, height, maxMoves, className }) {
  
  return (
    <FadeDiv className={`fixed w-full ${height?height:'h-screen'} ${className?className:''}`} type={type} amount={amount}>
      <div className={`w-full relative ${height?height:'h-screen'} bg-gradient-to-br from-[#16002c] to-[#000000] z-0 overflow-hidden`} >
        {/* <div className='flex w-full absolute top-0 h-[100vh] ' > */}
        {/* {console.log(height*(1+overflow)+'px')} */}
        {/* {console.log(`translate(-${Y}px,0)`)} */}
        {src && <Image alt='' fill priority={priority?priority:false} src={src} className={`object-cover object-center `} sizes="100vw" quality={100} />}
        {/* Empty ALT for purely decorative images */}
        {/* </div> */}
      </div>
    </FadeDiv>
  )
}
