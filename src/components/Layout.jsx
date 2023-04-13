export default function Layout({children, className, cardSection}) {
  
  if (cardSection) {
    return (
      <div className={` mx-auto w-full px-0 lg:px-10  visible overflow-visible ${className?className:''}`}>
        {children}
      </div>
    )
  }
  
  return (
    <div className={` mx-auto w-full px-4 mobm:px-6 sm:px-12 lg:px-0 visible ${className?className:''}`}>
      {children}
    </div>
  )
}
