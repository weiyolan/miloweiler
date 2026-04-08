import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import useLayoutEffect from '@utils/useIsomorphicLayoutEffect';
import { useAppContext } from '@/utils/appContext';
import { CATEGORY_SLUGS } from '@/utils/categories';
gsap.registerPlugin(ScrollTrigger);

export default function CategoryDescriptions({ descriptions, labels }) {
  const { locale } = useAppContext();
  const sectionRef = useRef(null);
  const ctxRef = useRef(null);

  // useLayoutEffect(() => {
  //   ctxRef.current = gsap.context(() => {
  //     gsap.from('.cat-desc-heading', {
  //       opacity: 0,
  //       y: 20,
  //       duration: 0.8,
  //       scrollTrigger: {
  //         trigger: sectionRef.current,
  //         start: 'top 80%',
  //         invalidateOnRefresh: true,
  //       },
  //     });
  //     gsap.from('.cat-desc-item', {
  //       opacity: 0,
  //       y: 24,
  //       duration: 0.7,
  //       stagger: 0.1,
  //       scrollTrigger: {
  //         trigger: '.cat-desc-grid',
  //         start: 'top 85%',
  //         invalidateOnRefresh: true,
  //       },
  //     });
  //   }, sectionRef);
  //   return () => ctxRef.current.revert();
  // }, []);

  const slugs = CATEGORY_SLUGS;

  return (
    <section
      ref={sectionRef}
      className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-20 sm:py-28 bg-background text-foreground force-dark invisible"
    >
      <h2 className="cat-desc-heading font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl mb-12 sm:mb-16">
        Our Work
      </h2>

      <div className="cat-desc-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border border-foreground/10">
        {slugs.map((slug) => {
          const label = labels?.[slug]?.[locale] || labels?.[slug]?.en || slug;
          const description =
            descriptions?.[slug]?.[locale] ||
            descriptions?.[slug]?.en ||
            '';

          return (
            <Link
              key={slug}
              href={`/${slug}`}
              className="cat-desc-item group relative flex flex-col gap-3 p-6 sm:p-8 border border-foreground/10 transition-colors duration-300 hover:bg-foreground/5"
            >
              <span className="font-serif font-bold text-lg sm:text-xl leading-tight group-hover:opacity-80 transition-opacity duration-300">
                {label}
              </span>
              {description && (
                <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                  {description}
                </p>
              )}
              <span className="mt-auto pt-4 font-sans text-xs tracking-widest uppercase text-foreground/40 group-hover:text-foreground/70 transition-colors duration-300">
                View work →
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
