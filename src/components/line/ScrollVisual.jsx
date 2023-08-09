import { useAppContext } from '@/utils/appContext'
import React from 'react'


const ScrollVisual = ({ velocity }) => {
  const { scrolled } = useAppContext()

  return (
    <>

      <div style={{ transform: `translate(0, calc(${98 * scrolled}vh)` }} className={`fixed z-50 top-0 right-0 rounded-full bg-white/50 w-1 h-4 mr-1`}>
          {velocity !== undefined && <div style={{ scale: `${1 + Math.abs(velocity / 500)}` }} className='w-2 h-2 bg-red-300 transition-all right-24 absolute top-2 duration-150 rounded-full' />}
          <p style={{ fontWeight: '600' }} className='text-white block font-sans text-md -translate-x-16 relative'>{`${scrolled.toPrecision(4)}`}</p>
      </div>
    </>
  )
}

export default ScrollVisual