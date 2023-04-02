import React from 'react'

export default function LayoutSection({ children, right, center, className }) {
  // console.log(children)
  return (
    <section className={`flex flex-col md:flex-row w-full gap-12 sm:gap-4 md:gap-8 lg:gap-12 xl:gap-24 mt-12 sm:mt-24 ${className?className:''}`}>
      {/* <section className='grid grid-cols-3 w-full '> */}
      <div className={` ${right ? 'w-full lg:w-3/5' : center ? 'w-full' : 'w-full lg:w-2/5'}`}>
      {/* <div className={`col-start-1  ${right ? 'col-span-3' : center ? 'col-span-5' : 'col-span-2'}`}> */}
        {center?children:children[0]}
      </div>

      {!center ?
        <div className={`${right ? 'w-full lg:w-2/5' : 'w-full lg:w-3/5'}`}>
        {/* <div className={`${right ? 'col-start-4 col-span-2' : 'col-start-3 col-span-3'}`}> */}
          {children[1]}
        </div> : null}
    </section>
  )
}
