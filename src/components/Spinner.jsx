import React from 'react'

export default function Spinner({ className, cube }) {
  const fgVar = 'var(--color-foreground)'

  return (
    <>
      <div className={` ${className ? className : ''}`}>
        {cube ?
          <div className='cubeSpinner w-4 h-4'>
            <div style={{ backgroundColor: `color-mix(in srgb, ${fgVar} 20%, transparent)`, borderColor: fgVar, borderWidth: 1.5, borderStyle: 'solid' }} />
            <div style={{ backgroundColor: `color-mix(in srgb, ${fgVar} 20%, transparent)`, borderColor: fgVar, borderWidth: 1.5, borderStyle: 'solid' }} />
            <div style={{ backgroundColor: `color-mix(in srgb, ${fgVar} 20%, transparent)`, borderColor: fgVar, borderWidth: 1.5, borderStyle: 'solid' }} />
            <div style={{ backgroundColor: `color-mix(in srgb, ${fgVar} 20%, transparent)`, borderColor: fgVar, borderWidth: 1.5, borderStyle: 'solid' }} />
            <div style={{ backgroundColor: `color-mix(in srgb, ${fgVar} 20%, transparent)`, borderColor: fgVar, borderWidth: 1.5, borderStyle: 'solid' }} />
            <div style={{ backgroundColor: `color-mix(in srgb, ${fgVar} 20%, transparent)`, borderColor: fgVar, borderWidth: 1.5, borderStyle: 'solid' }} />
          </div>
          :
          <div className={'spinner w-8 h-8 relative'}>
            <div style={{ backgroundColor: fgVar }} className="double-bounce1"></div>
            <div style={{ backgroundColor: fgVar }} className="double-bounce2"></div>
          </div>}
      </div>
    </>
  )
}
