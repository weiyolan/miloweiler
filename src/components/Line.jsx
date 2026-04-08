import React from 'react'

export default function Line({className}) {
  return (
    <div className={`h-0 border rounded-xl ${className ? className : 'border-foreground w-full'} `} />
  )
}
