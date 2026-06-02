import React from 'react'

export default function AsciiMarkers({ activeIndex, total, visible }) {
  return (
    <div className="w-full pl-4 pr-10 md:px-0 md:pr-[10vw]">
      <div className="relative flex items-center justify-between">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`font-mono text-xs leading-none text-foreground/25 ${activeIndex==i ? "opacity-0": ""}`}
          >
          *
          </span>
        ))}
        <span
          className="absolute top-1/2 font-mono text-xs md:text-sm text-foreground/60 whitespace-nowrap pointer-events-none"
          style={{
            left: `${total > 1 ? (activeIndex / (total - 1)) * 100 : 0}%`,
            transform: `translate(${activeIndex === 0 ? '0' : activeIndex === total - 1 ? '-100%' : '-50%'}, -50%)`,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.2s ease-out'
          }}
        >
          {String(activeIndex + 1).padStart(2, '0')}|{String(total).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}
