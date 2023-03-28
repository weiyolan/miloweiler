import { usePageContext } from "@/utils/pageContext"

export default function AccentTitle ({text, small, noMargin, className, style}) {
  let {darkMode} =usePageContext();
  // console.log(darkMode)
  return (
    // select-none
    <h3 style={style} className={`font-pop inline-flex font-semibold ${darkMode?'text-primary':'text-black'}  ${small?'text-sm lg:text-base':'text-base lg:text-lg'} ${noMargin?'':'mb-4 mt-2'} ${className?className:''}`}>
      {text}
    </h3>)
}
