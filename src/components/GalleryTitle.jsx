import { twMerge } from "tailwind-merge";

export default function GalleryTitle({ children, className, h1 }) {
  if (h1) {
    return (
      <h1 className={twMerge(" hidden text-center md:text-left  text-3xl mb-2 pt-12 ", className)}>
        {children}
      </h1>
    )
  }


  return <h2 className={twMerge(" font-normal  uppercase text-left text-inherit text-lg mb-12 pt-20 ", className)}>
    {children}
  </h2>

}