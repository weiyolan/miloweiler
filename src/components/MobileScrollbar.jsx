import { useAppContext } from '@/utils/appContext'
import React from 'react'


const MobileScrollbar = ({ velocity, className }) => {
  const { scrolled } = useAppContext()

  return (
    <>
      <div style={{ transform: `translate(0,calc(${89 * scrolled.current}vh)` }} className={`fixed z-50 top-1 right-0 rounded-full ${className && className} bg-white/50 w-0.5 h-[10vh] mr-1`}>
          {velocity !== undefined && <div style={{ scale: `${1 + Math.abs(velocity / 500)}` }} className='w-2 h-2 bg-red-300 transition-all right-24 absolute top-2 duration-150 rounded-full' />}
      </div>
    </>
  )
}

export default MobileScrollbar