import React from 'react'

export default function AsciiMarkers({ activeIndex, total, visible }) {
  return (
    <div className="w-full px-2 md:px-0 md:pr-10">
      <div className="relative flex items-center">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className="flex-1 text-center font-mono text-xs leading-none text-foreground/25"
          >
          {activeIndex==i ? "": "*"}
          </span>
        ))}
        <span
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 font-mono text-xs md:text-sm text-foreground/60 whitespace-nowrap pointer-events-none"
          style={{
            left: `${((activeIndex + 0.5) / total) * 100}%`,
            opacity: visible ? 1 : 0,
            transition: visible ? 'opacity 0.2s ease-out' : 'opacity 0.2s ease-out',
          }}
        >
          {String(activeIndex + 1).padStart(2, '0')}|{String(total).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}
