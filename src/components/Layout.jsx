export default function Layout({children, className, cardSection}) {
  
  if (cardSection) {
    return (
      <div className={`max-w-7xl mx-auto w-full px-0 mobm:px-6 xl:px-24 2xl:px-0 visible ${className?className:''}`}>
        {children}
      </div>
    )
  }
  
  return (
    <div className={`max-w-7xl mx-auto w-full px-4 mobm:px-6 sm:px-12 lg:px-24 visible ${className?className:''}`}>
      {children}
    </div>
  )
}
