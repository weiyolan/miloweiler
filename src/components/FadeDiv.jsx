import React, { useEffect } from 'react'

let fadeStyleDefault = amount => ({
  'maskImage': `linear-gradient(to bottom, transparent, black ${amount}%, black ${100 - amount}%, transparent)`,
  'maskSize': '100% 100%',
  'WebkitMaskImage': `linear-gradient(to bottom, transparent, black ${amount}%, black ${100 - amount}%, transparent)`,
  'maskPosition': '0 0',
  'maskRepeat': 'no-repeat',
})

let fadeStyleTop = amount => ({
  'maskImage': `linear-gradient(to bottom, transparent, black ${amount}%, black ${100}%)`,
  'maskSize': '100% 100%',
  'WebkitMaskImage': `linear-gradient(to bottom, transparent, black ${amount}%, black ${100}%)`,
  'maskPosition': '0 0',
  'maskRepeat': 'no-repeat',
})

let fadeStyleLeftRight = amount => ({
  'maskImage': `linear-gradient(to right, transparent, black ${amount}%, black ${100-amount}%, transparent)`,
  'maskSize': '100% 100%',
  'WebkitMaskImage': `linear-gradient(to right, transparent, black ${amount}%, black ${100-amount}%, transparent)`,
  'maskPosition': '0 0',
  'maskRepeat': 'no-repeat',
})

let fadeStyleBottom = amount => ({
  'maskImage': `linear-gradient(to bottom,black ${0}%, black ${100 - amount}%, transparent)`,
  'maskSize': '100% 100%',
  'WebkitMaskImage': `linear-gradient(to bottom, black ${0}%, black ${100 - amount}%, transparent)`,
  'maskPosition': '0 0',
  'maskRepeat': 'no-repeat',
})

const FadeDiv = ({ children, className, type, amount, style }) => {
  useEffect(() => {
    // console.log(className)
  }, [className])

  function getFadeStyle(type) {
    switch (type) {
      case 'top':
        return fadeStyleTop(amount)
      case 'bottom':
        return fadeStyleBottom(amount)
      case 'none':
        return {}
      case 'leftRight':
        return fadeStyleLeftRight(amount)
      default:
        return fadeStyleDefault(amount)
    }
  }

  return (
    <div style={{ ...getFadeStyle(type), ...style }} className={className}>
      {children}
    </div>
  )
}

export default FadeDiv