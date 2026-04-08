export default function AccentTitle ({text, small, noMargin, className, style}) {
  return (
    // select-none
    <h3 style={style} className={`font-sans inline-flex font-semibold text-foreground  ${small?'text-sm lg:text-base':'text-base '} ${noMargin?'':'mb-4 mt-2'} ${className?className:''}`}>
      {text}
    </h3>)
}
