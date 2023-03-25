import React, { useRef, useState, useEffect, useCallback } from "react"
import { useAppContext } from "@components/context/appContext.js"
import { useSVGContext } from "@components/story/contextSVG"
import { usePageContext } from "@/components/context/pageContext"

// function getOffset(lengthArray, i) {
//   let included = lengthArray.map((l, index) => index < i ? l : 0)
//   let offset = included.reduce((prev, curr) => prev + curr)
//   return offset
// }

// const getPathProps = (props,stroke,fill) => {
//   let pathProps = { ...props }
//   delete pathProps.handleLength
//   delete pathProps.print
//   delete pathProps.lineSpeed
//   delete pathProps.inverse
//   delete pathProps.initialDash
//   delete pathProps.animateFill
//   delete pathProps.animateStroke
//   delete pathProps.fillColor
//   delete pathProps.strokeColor
//   delete pathProps.home
//   delete pathProps.drawDuration
//   delete pathProps.scrolled
//   delete pathProps.useId
//   delete pathProps.lengthFactor
//   delete pathProps.fastErase
//   delete pathProps.myGradient
//   delete pathProps['stroke-width']
//   delete pathProps.initialDash
//   // pathProps.strokeWidth = '2'
//   pathProps.strokeLinejoin="round"
//   delete pathProps['stroke-linejoin']
//   pathProps.strokeLinecap="round"
//   delete pathProps['stroke-linecap']
//   pathProps.fillRule=pathProps['fill-rule']
//   delete pathProps['fill-rule']
//   pathProps.clipRule=pathProps['clip-rule']
//   delete pathProps['clip-rule']
  
//   pathProps.stroke= stroke
//   pathProps.fill= fill
  
//   return pathProps
// }

export function Path(props) {
  let {myRatio, prevRatio, scrollMin, scrollMax, animationSpeed} = useSVGContext();
  let {finished} = usePageContext();

  let pathRef = useRef(null)
  let [pathLength, setPathLength] = useState(0)
  let [mySpeed, setMySpeed] = useState(1)
  let [dashArray, setDashArray] = useState('')
  let [dashLineLength, setDashLineLength] = useState(0)
  // let [newProps, setNewProps] = useState(getPathProps(props))
  let [style, setStyle] = useState({transition: 'none'})
  
  let [visible, setVisible] = useState(false)
  let [animationEnd, setAnimationEnd] = useState(false)

  let fakeScrolled = finished?1:props.scrolled;
  let realScrolled = useAppContext().scrolled;
  let scrolled=fakeScrolled===undefined?realScrolled:fakeScrolled
  let biasedScrolled = scrollMin>=0&&scrollMax>scrollMin&&scrollMax>0?(Math.min(Math.max(scrolled-scrollMin,0)/(scrollMax-scrollMin),1)):scrolled;

  const getPathProps = useCallback((props) => {
    let pathProps = { ...props }
    delete pathProps.handleLength
    delete pathProps.print
    delete pathProps.lineSpeed
    delete pathProps.inverse
    delete pathProps.initialDash
    delete pathProps.animateFill
    delete pathProps.animateStroke
    delete pathProps.fillColor
    delete pathProps.strokeColor
    delete pathProps.home
    delete pathProps.drawDuration
    delete pathProps.scrolled
    delete pathProps.useId
    delete pathProps.lengthFactor
    delete pathProps.fastErase
    delete pathProps.myGradient
    delete pathProps.shadowSmall
    delete pathProps['stroke-width']
    delete pathProps.initialDash
    pathProps.strokeWidth = props?.strokeWidth || '2'
    pathProps.strokeLinejoin="round"
    delete pathProps['stroke-linejoin']
    pathProps.strokeLinecap="round"
    delete pathProps['stroke-linecap']
    pathProps.fillRule=pathProps['fill-rule']
    delete pathProps['fill-rule']
    pathProps.clipRule=pathProps['clip-rule']
    delete pathProps['clip-rule']
    pathProps.strokeDasharray = dashArray.length>0?dashArray:(pathLength) + ' ' + (pathLength);

    if (visible) {
      let myStroke = props.myGradient?props.myGradient:props?.strokeColor||'#FFFAEA'
      pathProps.stroke = props.animateStroke?animationEnd?'transparent':myStroke:myStroke
      pathProps.fill = props.animateFill?animationEnd?props?.fillColor||'#FFFAEA':'transparent':'transparent';
    } else {
      pathProps.stroke = 'transparent'
      pathProps.fill = 'transparent'
    }
    return pathProps
  },[visible, animationEnd, dashArray, pathLength])

  let childProps=getPathProps(props);

  let newOffset = Math.min( Math.max(biasedScrolled*mySpeed - prevRatio[props.position], 0)  / myRatio[props.position] , 1) * (props.inverse?1:-1) || 0 
  childProps.strokeDashoffset = (pathLength + (dashLineLength>0?0:0)) + (pathLength + (dashLineLength>0?0:0))*newOffset

// CALCULATE PATHLENGTH 
  useEffect(() => {
      let usePath = pathRef.current;
      let originalPath = props.useId!==undefined?document.querySelector(usePath.getAttribute('href')):usePath
      let length = originalPath.getTotalLength()
      let scale = 1
      if (originalPath !== usePath) {
        const bbox = usePath.getBoundingClientRect();
        const scaleX = bbox.width / originalPath.getBBox().width;
        const scaleY = bbox.height / originalPath.getBBox().height;
        // if (props.print) {console.log('PATHS UNEQUAL')}   
        scale = Math.min(scaleX, scaleY);
        // const scaledPathLength = originalPath.getTotalLength() * scale;
      }
      if (props.print) {
        // console.log('length is:' + length); console.log('double is: ' + props.double); console.log('so pathlength is : ' + length/props.double)
        // console.log(usePath)
        // console.log(originalPath)
        // console.log(usePath===originalPath)
        // console.log('My (' + props.print + ') path has length of: ' + scale * length / (props?.double||1))
        // console.log(scale * length / (props?.double||1))
      }
      setPathLength(scale * length / (props?.double||1));
      props.print && console.log(props.print + ' pathlength setted')

    },[props.double, props.print, props.useId])

  useEffect(()=>{
    if (pathLength>0) {
      props.handleLength(pathLength, props.position)
      props.print && console.log('handleLength ')
      
    }
  },[pathLength, props.position,])

  // useEffect(() => {
    // if (props.print) {
    // console.log('strokedashoffset')
    // console.log(scrolled - prevRatio[props.position], 0)
    // console.log(Math.max(scrolled - prevRatio[props.position], 0))
    // console.log(pathLength>0?pathLength:'calculating pathlength')
    // }
  // }, [pathLength, props.lengths, props.position, scrolled, prevRatio, myRatio])

  useEffect(()=>{
    if (props.initialDash) {
      let stringDash = props.initialDash.split(' ');
      let lineString = stringDash[0];
      // let gapString = stringDash[1];
      let numDash = stringDash.map(i=>+i);
      let dashLength = numDash.reduce((acc,x)=>acc + x, 0);

      let repeat = Math.floor(pathLength/dashLength);
      // console.log(repeat)
      let newStringDash = Array(repeat).fill(props.initialDash)
      newStringDash.push(lineString)
      newStringDash.push(`${pathLength}`)
      newStringDash = newStringDash.join(' ')
      // console.log(newStringDash)
      setDashArray(newStringDash)
      setDashLineLength(+lineString)
      props.print && console.log('dashlength setted ')

    }

  },[props.initialDash, pathLength])

  // USE lineSpeed to draw stroke faster
  // USE drawDuration to set speed of animation

  useEffect(()=>{
    let speed = 1;
    if (animationSpeed) {speed = speed*animationSpeed}
    if (props.lineSpeed) {speed = speed*props.lineSpeed}
    setMySpeed(speed)
    props.print && console.log('speed setted ')


  },[animationSpeed, props.lineSpeed])

  // useEffect(()=>{
    
  //   // childProps = getPathProps(props);
  //   // childProps.strokeDasharray = dashArray.length>0?dashArray:(pathLength) + ' ' + (pathLength);
  //   // newOffset = Math.min( Math.max(biasedScrolled*mySpeed - prevRatio[props.position], 0)  / myRatio[props.position] , 1) * (props.inverse?1:-1) || 0 
  //   // childProps.strokeDashoffset = (pathLength + (dashLineLength>0?0:0)) + (pathLength + (dashLineLength>0?0:0))*newOffset
  //   // childProps.strokeWidth = props?.strokeWidth || '2'
    
  //   // if (newOffset!=0 ) {

  //   //   let myStroke = props.myGradient?props.myGradient:props?.strokeColor||'#FFFAEA'
  //   //   childProps.stroke = props.animateStroke?Math.abs(newOffset)===1?'transparent':myStroke:myStroke
  //   //   childProps.fill = props.animateFill?Math.abs(newOffset)===1?props?.fillColor||'#FFFAEA':'transparent':'transparent';
  //   //   console.log('print!')
  //   // }

  //   if (Math.abs(newOffset) === 0 && visible) {
  //     setVisible(false)
  //     // props.print && console.log(newOffset)
  //     // props.print && console.log(false)
  //     // Fast transition

  //     if (props.fastErase) {
  //       // childProps.stroke = 'transparent'
  //       childProps.fill = 'transparent'
  //   }} else if (Math.abs(newOffset) != 0 && !visible) {
  //     // console.log('print!')
  //     // props.print && console.log(newOffset)
  //     // props.print && console.log(true)
  //     setVisible(true)
  //     // Default transition
  //   } 

  //   if (props.print) {
  //     // console.log(newOffset)
  //     // console.log(visible)
  //     // console.log(childProps.stroke)
  //     // console.log(style)
  //     // console.log(pathLength)
  //     // console.log('dashLineLength', dashLineLength)
  //     // console.log(newOffset)
  //   };

  //   setNewProps(childProps)

  // },[pathLength, visible, dashArray, props.fastErase, pathRef,props.animateStroke, props.inverse, props.print, props.myGradient, props.strokeWidth, props.position, scrollMin, scrollMax, mySpeed, dashLineLength , props.strokeColor, props.animateFill, prevRatio, myRatio, visible, scrolled, props.initialDash])
  
  useEffect(()=>{
    if (newOffset!=0 && !visible) {
      setVisible(true)

      props.print && console.log('Animation visible')
      // props.print && console.log(props.print + ' ' + 'Visible set to true with props = ' + childProps.stroke)


    } else if (newOffset == 0 && visible) {
      props.print && console.log('Animation NOT visible')
      // props.print && console.log(props.print + ' ' + 'Visible set to false')
  
      setVisible(false)

      if (props.fastErase) {
        // childProps.stroke = 'transparent'
        childProps.fill = 'transparent'
        props.print && console.log('fast erase!')

      }
    }
  },[scrolled, props.myGradient, props.strokeColor, props.animateStroke, props.animateFill, props.fillColor])

  useEffect(()=>{
    if (Math.abs(newOffset) === 1 && !animationEnd) {
      props.print && console.log('animation end ')
      // setNewProps(childProps)
      setAnimationEnd(true)
    }
    if (Math.abs(newOffset) < 1 && animationEnd) {
      props.print && console.log('animation start ')
      setAnimationEnd(false)
    }
  },[scrolled])

  // useEffect(()=>{

    // props.print&& console.log('loaded with props: ' + childProps.stroke)

    // props.print &&  console.log('')
    // props.print &&  console.log('Initial mount, stroke and fill: transparent')
   
  // },[])

  useEffect(()=>{
    
    setStyle({transition: fakeScrolled!==undefined?`all ${props?.drawDuration||1}s ease`:visible?props.home?'all 0.5s ease':`all ${props?.drawDuration||1}s ease`:props.fastErase?'strokeDashoffset 0.7s ease, stroke 0.2s ease, fill 0.2s ease ':'all 0.7s   ease'})
    props.print && console.log('setStyle ')
    
    if (props.print) {
      // console.log({transition: visible?props.home?'all 0.5s ease':`all ${props?.drawDuration||1}s ease`:'all 0.1s ease'})
      // console.log('style changed')
    }
  },[visible])

// },[visible, props.home, props.drawDuration, props.fastErase,props.print])
  // useEffect(()=>{console.log(style)})

  // let style={transition: visible?props.home?'all 0.5s ease':`all ${props.drawDuration?props.drawDuration:1}s ease`:'all 0.1s ease'};

  // useEffect(()=>{
    // props.print && console.log('Fill: ' + childProps.fill + ', animationEnd: ' + animationEnd + ', visible: ' + visible )
    // props.print && console.log('animationEnd: ' + animationEnd)
    // props.print && console.log('visible: ' + visible)
  // })

  switch (props.type) {
    case 'rect' :
      return <rect ref={pathRef} className={`${props.animateFill||props?.shadowSmall?'drop-shadow-[0_10px_8px_rgba(0,0,0,0.2)]':'drop-shadow-[0_10px_8px_rgba(0,0,0,1)]'}`} style={style} {...childProps} />
    case 'circle' :
      return <circle ref={pathRef} className={`${props.animateFill||props?.shadowSmall?'drop-shadow-[0_10px_8px_rgba(0,0,0,0.2)]':'drop-shadow-[0_10px_8px_rgba(0,0,0,1)]'}`} style={style} {...childProps} />
    case 'use' :
      return <use href={props.useId} ref={pathRef} className={`${props.animateFill||props?.shadowSmall?'drop-shadow-[0_10px_8px_rgba(0,0,0,0.2)]':'drop-shadow-[0_10px_8px_rgba(0,0,0,1)]'}`} style={style} {...childProps} />
    default :
      return <path ref={pathRef} className={`${props.animateFill||props?.shadowSmall?'drop-shadow-[0_10px_8px_rgba(0,0,0,0.2)]':'drop-shadow-[0_10px_8px_rgba(0,0,0,1)]'}`} style={style} {...childProps} />
    }
}

export function AnimateIn({children, scrolled, at}) {
  // let {scrolled} = useAppContext();
  let {finished} = usePageContext()

  let fakeScrolled = finished?1:scrolled;
  let realScrolled = useAppContext().scrolled;
  scrolled=fakeScrolled===undefined?realScrolled:fakeScrolled

  return (
    // <div className='z-20 px-4 my-4 w-full text-sm font-extralight text-center outline-none -outline-offset-2 relative flex text-primary font-sans ' 
    <g className=''
    style={{opacity:(scrolled>at?1:0),transform:scrolled>at?'translateY(0)':'translateY(0)', transition:'all 0.4s ease'}}>
      {children}
    </g>
  )
}

export function TextAnimate(props) {
// let {scrolled} = useAppContext();
  let {scrollMin, scrollMax, handleNewPosition} = useSVGContext();
  const {finished} = usePageContext();

  const animationRef = useRef();
let [located, setLocated] = useState(false);

let fakeScrolled = finished?1:props.scrolled;
let realScrolled = useAppContext().scrolled;
let scrolled=fakeScrolled===undefined?realScrolled:fakeScrolled

let scrollMaxCompensation = 0.005

useEffect(()=>{
  if (scrolled>props.at && scrolled < (props.at+scrollMaxCompensation) && !located) {
    const {top, bottom} = animationRef.current.getBoundingClientRect();
    // const {top: svgStart} = svgRef.current.getBoundingClientRect();
    setLocated(true)
    handleNewPosition({top: top, bottom: bottom}) 
    // SVG offset is added in parent component
  } else if ((scrolled<props.at || scrolled > props.at+scrollMaxCompensation) && located) {
    setLocated(false)
  }
},[realScrolled, setLocated])

function handleTextProps (props) {
  let newProps = {...props}
  newProps.fontFamily = newProps['font-family']
  newProps.fontSize = newProps['font-size']
  newProps.letterSpacing = newProps['letter-spacing']
  newProps.fontWeight = newProps['font-weight']
  // delete newProps['xml:space']
  delete newProps['font-family']
  delete newProps['font-size']
  delete newProps['letter-spacing']
  delete newProps['font-weight']
  delete newProps.children
  delete newProps.at
  delete newProps.print
  delete newProps.fromTop
  delete newProps.transform
  // newProps.fill = '#171B4D'
  newProps.fill='#FFFAEA'
  // console.log(newProps)
  return newProps
}

  // translate(185 181)

  function handleTransform (Y) {
  let [x,y] = [undefined, undefined];

    if (props.transform) {      
      let first = props.transform.split(' ');
      if (first.length===1) {
        x = +first[0].split('(')[1].split(')')[0];
        y = 0;
      } else { 
        x = +first[0].split('(')[1];
        y = +first[1].split(')')[0];
      }
    } else {x,y=[0,0]}
    if (props.print) {
      console.log(props.transform.split(' '))
      console.log(Y)
      console.log(x)
      console.log(`translate(${x?x:0}px,${(y?y:0) + Y}px)`)
    }
    return `translate(${x}px, ${y + Y}px)`
  }

  return (
    <text ref={animationRef} {...handleTextProps(props)} 
    style={{
      opacity:(scrolled>props.at?1:0),
      transform: scrolled>props.at?handleTransform(0):handleTransform(props.fromTop?-25:0), 
      transition:'all 0.4s ease', 
      whiteSpace:'pre'
    }}>
      {props.children}
    </text>
  )

}

// export function AnimateSVGText({children,at, fromTop}) {
  //   let {scrolled} = useAppContext();
  
  //   return (
  //     <g className='' 
  //     style={{opacity:(scrolled>at?1:0),transform:scrolled>at?'translateY(0)':`translateY(${fromTop?'-20px':'0'})`, transition:'all 0.4s ease'}}>
  //       {children}
  //     </g>
  //   )
  
  // }