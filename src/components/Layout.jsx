import { twMerge } from "tailwind-merge"
export default function Layout({ children, className, cardSection, ...props }) {
  
  if (cardSection) {
    return (
      <div className={twMerge(` mx-auto w-full px-2 lg:px-10 visible overflow-visible`, className)} {...props}>
        {children}
      </div>
    )
  }
  
  return (
    <div className={twMerge(` mx-auto w-full px-4 mobm:px-6 sm:px-12 lg:px-0 visible`, className)} {...props}>
      {children}
    </div>
  )
}
