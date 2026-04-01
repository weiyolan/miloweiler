import React from 'react'

export default function CarouselIndicator({ activeIndex, totalCategories }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-between items-end px-6 md:px-10 pb-5 md:pb-7 pointer-events-none">
      <span className="font-mono text-xs md:text-sm text-white/60">
        {String(activeIndex + 1).padStart(2, '0')} / {String(totalCategories).padStart(2, '0')}
      </span>
      <span className="font-mono text-xs md:text-sm text-white/60">
        Brussels, Belgium
      </span>
    </div>
  )
}
