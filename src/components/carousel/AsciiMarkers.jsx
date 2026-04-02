import React from 'react'

export default function AsciiMarkers({ activeIndex, total }) {
  return (
    // <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center items-center px-6 md:px-10 pb-5 md:pb-7 pointer-events-none">
    // <div className='flex'>
      <div className="flex items-center justify-between px-[10%] w-full">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`font-mono text-xs leading-none transition-all duration-300 ${
              i === activeIndex ? 'text-white/60' : 'text-white/25'
            }`}
          >
            {i === activeIndex ? '*' : '·'}
          </span>
        ))}
      </div>
    // </div>
  )
}
