export default function Layout({ children, className, cardSection, ...props }) {
  
  if (cardSection) {
    return (
      <div className={` mx-auto w-full px-2 lg:px-10 visible overflow-visible ${className ? className : ''}`} {...props}>
        {children}
      </div>
    )
  }
  
  return (
    <div className={` mx-auto w-full px-4 mobm:px-6 sm:px-12 lg:px-0 visible ${className ? className : ''}`} {...props}>
      {children}
    </div>
  )
}
