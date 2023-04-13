import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import useDimensions from '@/utils/useDimensions'
import { useAppContext } from '@/utils/appContext'

export default function PictureIndicator({ handleVisibility, visibleItem ,setPosition, mainPictureWidth}) {
  let indicatorRef = useRef(null)
  // let [indicatorPosition,setIndicatorPosition] = useState(undefined)
  let {width:indicatorWidth,height,top,bottom} = useDimensions(indicatorRef, {margin:true})
  const {width} = useAppContext()
  useEffect(()=>{
    setPosition({indicatorWidth,height,top,bottom})
  },[bottom])
  

  return (
    // <div className='picture-indicator absolute left-1/2 -translate-x-1/2 flex justify-center items-center gap-2 h-6 top-full -translate-y-[150%] md:-translate-y-2/4 '>
    <div ref={indicatorRef} style={{width: width<1024?'fit': mainPictureWidth+'px'}} className='picture-indicator relative lg:absolute inline-flex lg:left-0 lg:bottom-16 mx-auto justify-center items-center gap-2 my-4 mobl:my-8 lg:my-6'>
      {visibleItem.map((item, i) => {
        return <Bol handleClick={() => { handleVisibility(i) }} visible={item} key={i} />
      })}
    </div>
  )
}

function Bol({ visible, handleClick }) {
  let bol = useRef()
  useEffect(() => {
    if (visible) {
      gsap.to(bol.current, {width:8,height:8,duration:0.2})
    }
    else if (!visible) {
      gsap.to(bol.current, {width:6,height:6,duration:0.2})
    }
  }, [visible])

  return (
    <svg style={{ width: 6, height: 6 }} ref={bol} onClick={handleClick} className={`${visible ? 'opacity-100' : 'opacity-30 hover:opacity-40 cursor-pointer'} transition-all`} viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2.5" cy="2.5" r="2.5" fill="#D9D9D9" />
    </svg>
  )
}