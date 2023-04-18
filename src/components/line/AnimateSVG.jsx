import React, {useState, useEffect, useRef, useCallback} from "react"
import { useAppContext } from "@utils/appContext"
// import { Path, TextAnimate} from '@utils/pathUtils'
import { Path} from "@/components/line/pathUtils"
// import UseFlower from "./UseFlower"
import { SVGWrapper } from "./contextSVG"
import { usePageContext } from "@utils/pageContext"
import { useDimensions } from "@/utils/useDimensions"
// import useGoodChildren from "./useGoodChildren"

export default function AnimateSVG({children, scrollMin, scrollMax, speed, alt, setSvgHeight, setSvgWidth, print}) { 

    let [allLengths, setAllLengths] = useState([])
    let [allOffsetLengths, setAllOffsetLengths] = useState([])
    let [allRatios, setAllRatios] = useState([])
    let [allPrevRatios, setAllPrevRatios] = useState([])
    let { scrolled } = useAppContext()
    let [located, setLocated] = useState(false)
    let [myHeight, setMyHeight] = useState(undefined)
    let {viewBox, setAnimationLocation, mobile} = usePageContext()
    // let [newChildren, setNewChildren] = useState(undefined)

    // let newChildren = useGoodChildren(children.props.children, handleLength)

    let animationRef = useRef(null)

    let svgRef = useRef(null)

   
    // const {width, height} = useDimensions(svgRef, true)
  
    const handleLength = useCallback((f, newLength, position) => {
      setAllLengths(prevLengths => {
        let copyLengths = [...prevLengths];
        copyLengths[position]=newLength;
        if (print) {console.log('function called')}

        return copyLengths
      })
      setAllOffsetLengths(prevOffsets => {
        let copyOffsetLengths = [...prevOffsets];
          copyOffsetLengths[position] = newLength * f;
          return copyOffsetLengths
      })
      // console.log('fired')

    },[setAllLengths,setAllOffsetLengths])



    function handleSize(){
      let bbox = svgRef.current.getBoundingClientRect()
      let height = bbox.bottom - bbox.top;
      let width = bbox.width;
      if (height>=0 && height!==myHeight && setSvgHeight!==undefined) {
        setSvgHeight(height)
        setMyHeight(height)
        setSvgWidth(width)
        // console.log('effect fired!')
      }

    }

    useEffect(()=>{

      window.addEventListener('resize',handleSize)

      handleSize()

      return window.removeEventListener('resize',handleSize)
    },[ viewBox, children, setSvgHeight])


    useEffect(()=>{
      if (scrolled>scrollMin && scrolled < scrollMax && !located) {
        const {top, bottom} = animationRef.current.getBoundingClientRect();
        const {top: svgStart} = svgRef.current.getBoundingClientRect();
        setLocated(true)
        setAnimationLocation({top: top-svgStart, bottom: bottom-svgStart})
      } else if ((scrolled<scrollMin || scrolled > scrollMax) && located) {
        setLocated(false)
      }
    },[scrolled, scrollMin, scrollMax, setLocated])


    useEffect(() => {
      if (allLengths.length > 0 && allRatios.length<allLengths.length ) {
        let totOffsetLength = allOffsetLengths.reduce((x, y) => x + y);
        let allRatios = allLengths.map(itemLength => itemLength / totOffsetLength);
        let newPrevRatios = allLengths.map((itemLength, index) => {
          let prevOffsetLength = allOffsetLengths.reduce((acc, y, i) => {
            return (i < index ? acc + y : acc)
          }, 0);
          return prevOffsetLength / totOffsetLength
        })
  
        setAllRatios(allRatios)
        // console.log('fired')
        setAllPrevRatios(newPrevRatios)
      }
    }, [allLengths, allOffsetLengths, children])

    // Generate children from props with the handleLength function defined here and remove lengthFactor.
    // Pass children to this component nested 1 layer deep in a <></>.
    // let newChildren = undefined;

    // useEffect(()=>{

    const makeNewChildren = ()=> {
      let newChildren = React.Children.map(children.props.children, child => {
        let newChild;
        if (React.isValidElement(child) && child.type === Path) {
          // console.log('fired')
      
          const {lengthFactor, ...rest} = child.props
          newChild = <Path {...rest} handleLength={(l,i) => handleLength(lengthFactor===undefined?1:lengthFactor,l,i)} key={alt[12,13] + `${mobile?'-mobile':'-desk'}`} />
        } else {
          newChild = child
        }
        return newChild
      })
      // console.log('animateSVG')
      return newChildren
      
    }    


    return (
      <SVGWrapper handleLength={handleLength} myRatio={allRatios} prevRatio={allPrevRatios} scrollMin={scrollMin} scrollMax={scrollMax} animationSpeed={speed}>
        <svg  ref={svgRef} alt={alt} style={{transform: `translate(-50%, 0px)`}} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg"
          className={`absolute w-full left-1/2`}>
          {/* className={`absolute w-5/6 xs:w-4/6 sm:w-3/6 md:w-5/6 xl:w-3/5 max-w-6xl left-1/2`}> */}
          
          <g ref={animationRef}>
        
        
            {/* {console.log(goodChildren.map(child=>child.type===Path))} */}
            {makeNewChildren()}

          </g>
        </svg>
      </SVGWrapper>

)


}