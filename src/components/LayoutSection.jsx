import React from 'react'

export default function LayoutSection({ children, right, center }) {
  // console.log(children)
  return (
    <section className='flex w-full gap-20 mt-24'>
      {/* <section className='grid grid-cols-3 w-full '> */}
      <div className={` ${right ? 'w-3/5' : center ? 'w-full' : 'w-2/5'}`}>
      {/* <div className={`col-start-1  ${right ? 'col-span-3' : center ? 'col-span-5' : 'col-span-2'}`}> */}
        {center?children:children[0]}
      </div>

      {!center ?
        <div className={`${right ? 'w-2/5' : 'w-3/5'}`}>
        {/* <div className={`${right ? 'col-start-4 col-span-2' : 'col-start-3 col-span-3'}`}> */}
          {children[1]}
        </div> : null}
    </section>
  )
}
