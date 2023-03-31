import React from 'react'

export default function PictureIndicator({handleVisibility, visibleItem}) {
  return (
    <div className='absolute left-1/2 -translate-x-1/2 flex justify-center items-center gap-2 h-6 bottom-0 -translate-y-2/4 md:translate-y-2/4'>
      {visibleItem.map((item,i)=>{
        return <Bol handleClick={()=>{handleVisibility(i)}} visible={item} key={i}/>
      })}
    </div>
  )
}

function Bol({visible, handleClick}) {
  return (
    <svg onClick={handleClick} className={`${visible?'w-2 h-2':'w-1.5 h-1.5 opacity-30 hover:opacity-40 cursor-pointer'} transition-all duration-200  hover:scale-110`} viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2.5" cy="2.5" r="2.5" fill="#D9D9D9" />
    </svg>
  )
}