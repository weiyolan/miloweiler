import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/utils/appContext";
import { usePageContext } from "@/utils/pageContext";
import { gsap } from "gsap/dist/gsap";
import SanityImage from "@/components/SanityImage";

function GridPhoto({ image, i, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const fotoThumb = useRef(null);
  const ctx = useRef(gsap.context(() => {}));
  const { width, locale } = useAppContext();
  const { darkMode } = usePageContext();
  useEffect(() => {
    if (loaded) {
      ctx.current.add(() => {
        gsap.to(fotoThumb.current, {
          opacity: 1,
          duration: 0.5,
          stagger: 0.5,
          ease: "expo.out",
          scrollTrigger: {
            scroller: window,
            trigger: fotoThumb.current,
            start: "+=10% bottom",
            end: "90% top",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
        });
      });
    }
    return () => ctx.current.revert();
  }, [loaded]);

  return (
    <div
      className={`relative opacity-0 cursor-pointer transition-transform duration-200  ${image?.border && `before:absolute ${darkMode ? "before:bg-darkGrey" : "before:bg-white"} before:-top-1 sm:before:-top-2 before:-left-1 sm:before:-left-2 before:-right-1 sm:before:-right-2 before:-bottom-1 sm:before:-bottom-2`}`}
      ref={fotoThumb}
      style={{
        width: "auto",
        height: "auto",
        gridRow: `${image.position[width < 648 ? "sm" : "lg"]?.y} / span ${image.position[width < 648 ? "sm" : "lg"]?.height}`,
        gridColumn: `${image.position[width < 648 ? "sm" : "lg"]?.x} / span ${image.position[width < 648 ? "sm" : "lg"]?.width}`,
      }}>
      <SanityImage
        blur
        key={i}
        fill
        className="relative object-cover"
        onLoad={() => setLoaded(true)}
        containerClass="rounded-none"
        factor={width < 850 ? 0.1 : 0.2}
        image={image.image}
        sizes="(max-width: 700px) 50vw, 25vw"
        alt={image?.alt?.[locale] || `Project picture ${i + 1}`}
        {...props}
      />
    </div>
  );
}

export default function ProjectGrid({ project, onImageClick }) {
  const { width } = useAppContext();

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${project?.gridCols?.[width < 648 ? "sm" : "lg"]},1fr)`,
        gridAutoRows: `calc(calc(calc(min(calc(100vw - ${2 * (width < 648 ? 8 : 40)}px), 12000px)) - calc(${width < 648 ? 4 : 8}px * calc(${
          project?.gridCols?.[width < 648 ? "sm" : "lg"]
        } - 1))) / ${project?.gridCols?.[width < 648 ? "sm" : "lg"]})`,
      }}
      className="grid gap-1 sm:gap-2 md:gap-3 w-full mb-6 -mx-2">
      {[...project.otherImages].map((image, i) => (
        <GridPhoto
          key={image._key || i}
          image={image}
          i={i}
          onClick={() => onImageClick?.(i)}
        />
      ))}
    </div>
  );
}
