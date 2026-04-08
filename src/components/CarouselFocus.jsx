import { useEffect, useCallback } from "react";
import SanityImage from "@/components/SanityImage";

export default function CarouselFocus({ image, alt, open, onClose }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[100] bg-black/90 flex items-center justify-center
        transition-[opacity,visibility] duration-500
        ${open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
    >
      {image && (
        <div className="relative w-[90vw] h-[85vh] max-w-[1400px]" onClick={(e) => e.stopPropagation()}>
          <SanityImage
            image={image}
            fill
            blur
            sizes="90vw"
            quality={90}
            alt={alt || ''}
            containerClass="rounded-none"
            className="object-contain"
          />
        </div>
      )}
      <button title="Close" onClick={onClose} className="flex justify-center items-center w-[50px] h-[50px] fixed top-0 right-0 text-foreground">
        <svg className="w-[17px] sm:w-[20px]" viewBox="0 0 23 23">
          <path d="M 3 16.5 L 17 2.5" fill="transparent" strokeWidth="2.5" stroke="currentColor" strokeLinecap="round" />
          <path d="M 3 2.5 L 17 16.346" fill="transparent" strokeWidth="2.5" stroke="currentColor" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
