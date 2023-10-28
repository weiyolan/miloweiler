import React, { useRef, useState, useEffect, useCallback } from "react"
import { useAppContext } from "@utils/appContext.js"
import { useSVGContext } from "@/components/line/contextSVG"
import { usePageContext } from "@utils/pageContext"

export function PathGSAPStandalone(props) {
  // let {myRatio, prevRatio, scrollMin, scrollMax, animationSpeed} = useSVGContext();
  // let {finished} = usePageContext();

  let pathRef = useRef(null)
  let [pathLength, setPathLength] = useState(0)
  // let [mySpeed, setMySpeed] = useState(1)
  let [dashArray, setDashArray] = useState('')
  let [dashLineLength, setDashLineLength] = useState(0)
  const getPathProps = useCallback((props) => {
    let pathProps = { ...props }
    // GSAP
    delete pathProps.timeline1
    delete pathProps.tweens
    //OLD
    delete pathProps.handleLength
    delete pathProps.print
    delete pathProps.lineSpeed
    delete pathProps.inverse
    delete pathProps.initialDash
    delete pathProps.transitStrokeAnimation
    delete pathProps.transitPortion
    delete pathProps.animateFill
    delete pathProps.animateStroke
    delete pathProps.fillColor
    delete pathProps.strokeColor
    delete pathProps.home
    delete pathProps.drawDuration
    delete pathProps.ignoreVisibility //to disable a transparent stroke when not visible
    delete pathProps.scrolled
    delete pathProps.useId
    delete pathProps.lengthFactor
    delete pathProps.fastErase
    delete pathProps.myGradient
    pathProps.key = pathProps.myKey
    delete pathProps.myKey

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

    if (props?.ignoreVisibility) {
      let myStroke = props.myGradient?props.myGradient:props?.strokeColor||'#FFF5EA'
      pathProps.stroke = props.animateStroke ? 'transparent' : myStroke
      pathProps.fill = props.animateFill ? props?.fillColor || '#FFF5EA' : 'transparent';
    } else {
      pathProps.stroke = 'transparent'
      pathProps.fill = 'transparent'
    }
    return pathProps
  }, [dashArray, pathLength])
  let [childProps, setChildProps] = useState(
    getPathProps(props)
  )
  // let [newProps, setNewProps] = useState(getPathProps(props))
  // let [style, setStyle] = useState({transition: 'none'})
  // let [visible, setVisible] = useState(false)
  // let [animationEnd, setAnimationEnd] = useState(false)

  // let fakeScrolled = 0;
  // let {scrolled:realScrolled} = useAppContext();

  // let biasedScrolled = scrollMin>=0&&scrollMax>scrollMin&&scrollMax>0
  //       ?(Math.min(Math.max(realScrolled-scrollMin,0)/(scrollMax-scrollMin),1))
  //       :realScrolled




  // let newOffset = 0
  // let newOffset = (Math.min( Math.max(fakeScrolled*mySpeed, 0) , 1) * (props.inverse?1:-1) || 0)

  // childProps.strokeDashoffset = (pathLength)
  // childProps.strokeDashoffset = (pathLength + (dashLineLength>0?0:0)) + (pathLength + (dashLineLength>0?0:0))*newOffset*(props?.transitStrokeAnimation?2:1)

// ================== CALCULATE PATHLENGTH ==================
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
        // console.log(realScrolled, fakeScrolled)
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


  //!!!!!!!!!! ====================GSAP====================!!!!!!!!!!
  useEffect(()=>{
    props.print && console.log(props.tweens)
    if (props.tweens !== undefined && props.tweens[0].timeline !== undefined) {

      props.tweens.forEach((tween)=>{
        let ratio = tween.ratio;
        let myNewOffset = (Math.min(Math.max(ratio, 0), 1) * (props.inverse ? 1 : -1) || 0);
        // let myNewOffset = (Math.min( Math.max(ratio*mySpeed, 0) , 1) * (props.inverse?1:-1) || 0);
        let myStroke = props.myGradient?props.myGradient:props?.strokeColor||'#FFF5EA';

        // console.log((pathLength + (dashLineLength>0?0:0)) + (pathLength + (dashLineLength>0?0:0))*myNewOffset*(props?.transitStrokeAnimation?2:1))
        // console.log(tween.timeline)
        if (tween.timeline?.getById(tween.id) === undefined) {
          
          if (tween.ratio) {
            tween.timeline
              .set(`#${props.id}`,{
                stroke:myStroke
                }, tween.position)
              .to(`#${props.id}`,{
                id: tween.id,
                strokeDashoffset: (pathLength) + (pathLength) * myNewOffset * (props?.transitStrokeAnimation ? 2 : 1),
                ...tween.attr
                }, tween.position)
          } else {
            tween.timeline.to(`#${props.id}`,
              {id: tween.id,
                ...tween.attr
              }, tween.position)
          }
          // console.log("added")
          // // console.log(tween.timeline.getChildren())
        }
      })
    }
  }, [props.tweens, pathLength, props.print, props?.transitStrokeAnimation])

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
      props.print && console.log('dashlength setted')
    }
  },[props.initialDash, pathLength])

  useEffect(()=>{
    if (props.transitStrokeAnimation) {
      let newStringDash = []
      // 'line hole'
      // newStringDash.push(`0`)
      // newStringDash.push(`${pathLength}`)
      newStringDash.push(`${pathLength*(props?.transitPortion?(props.transitPortion):0.95)}`)
      newStringDash.push(`${pathLength*(props?.transitPortion?(2-props.transitPortion):1.05)}`)
      // newStringDash.push(`0`)
      // newStringDash.push(`${pathLength}`)
      // newStringDash.push(`200`)
      // newStringDash.push(`500`)
      // newStringDash.push(`${pathLength*1.2}`)
      newStringDash = newStringDash.join(' ')
      setDashArray(newStringDash)
      setDashLineLength(+pathLength)
      props.print && console.log('special dashlength setted')
      props.print && console.log(newStringDash)
    }   
  },[props.transitStrokeAnimation, pathLength])

  // USE lineSpeed to draw stroke faster
  // USE drawDuration to set speed of animation

  // useEffect(()=>{
  //   let speed = 1;
  //   if (animationSpeed) {speed = speed*animationSpeed}
  //   if (props.lineSpeed) {speed = speed*props.lineSpeed}
  //   setMySpeed(speed) //SPEED CANNOT GO BELOW 1 OR LINE WILL NOT BE DRAWN COMPLETELY, see code line 117 for newOffset
  //   props.print && console.log('speed setted ')

  // },[animationSpeed, props.lineSpeed])

  useEffect(()=>{
    
    setChildProps(getPathProps(props))
    // childProps.strokeDasharray = dashArray.length>0?dashArray:(pathLength) + ' ' + (pathLength);
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

  }, [pathLength, dashArray, props.fastErase, pathRef, props.animateStroke, props.inverse, props.print, props.myGradient, props.strokeWidth, props.position, dashLineLength, props.strokeColor, props.animateFill, props.initialDash])
  

  switch (props.type) {
    case 'rect' :
      return <rect ref={pathRef} className={`${props?.shadowSmall ? 'drop-shadow-[0_10px_8px_rgba(0,0,0,0.2)]' : props?.shadowBig ? 'drop-shadow-[0_10px_8px_rgba(0,0,0,1)]' : ''}`} {...childProps} strokeDashoffset={pathLength} />
    case 'circle' :
      return <circle ref={pathRef} className={`${props?.shadowSmall ? 'drop-shadow-[0_10px_8px_rgba(0,0,0,0.2)]' : props?.shadowBig ? 'drop-shadow-[0_10px_8px_rgba(0,0,0,1)]' : ''}`} {...childProps} strokeDashoffset={pathLength} />
    case 'use' :
      return <use href={props.useId} ref={pathRef} className={`${props?.shadowSmall ? 'drop-shadow-[0_10px_8px_rgba(0,0,0,0.2)]' : props?.shadowBig ? 'drop-shadow-[0_10px_8px_rgba(0,0,0,1)]' : ''}`} {...childProps} strokeDashoffset={pathLength} />
    default :
      return <path ref={pathRef} className={`${props?.shadowSmall ? 'drop-shadow-[0_10px_8px_rgba(0,0,0,0.2)]' : props?.shadowBig ? 'drop-shadow-[0_10px_8px_rgba(0,0,0,1)]' : ''}`} {...childProps} strokeDashoffset={pathLength} />
    }
}

// export function AnimateIn({children, scrolled, at}) {
//   // let {scrolled} = useAppContext();
//   let {finished} = usePageContext()

//   let fakeScrolled = finished?1:scrolled;
//   let realScrolled = useAppContext().scrolled;
//   scrolled=fakeScrolled===undefined?realScrolled:fakeScrolled

//   return (
//     // <div className='z-20 px-4 my-4 w-full text-sm font-extralight text-center outline-none -outline-offset-2 relative flex text-primary font-sans ' 
//     <g className=''
//     style={{opacity:(scrolled>at?1:0),transform:scrolled>at?'translateY(0)':'translateY(0)', transition:'all 0.4s ease'}}>
//       {children}
//     </g>
//   )
// }

// export function TextAnimate(props) {
// // let {scrolled} = useAppContext();
//   let {scrollMin, scrollMax, handleNewPosition} = useSVGContext();
//   const {finished} = usePageContext();

//   const animationRef = useRef();
// let [located, setLocated] = useState(false);

// let fakeScrolled = finished?1:props.scrolled;
// let realScrolled = useAppContext().scrolled;
// let scrolled=fakeScrolled===undefined?realScrolled:fakeScrolled

// let scrollMaxCompensation = 0.005

// useEffect(()=>{
//   if (scrolled>props.at && scrolled < (props.at+scrollMaxCompensation) && !located) {
//     const {top, bottom} = animationRef.current.getBoundingClientRect();
//     // const {top: svgStart} = svgRef.current.getBoundingClientRect();
//     setLocated(true)
//     handleNewPosition({top: top, bottom: bottom}) 
//     // SVG offset is added in parent component
//   } else if ((scrolled<props.at || scrolled > props.at+scrollMaxCompensation) && located) {
//     setLocated(false)
//   }
// },[realScrolled, setLocated])

// function handleTextProps (props) {
//   let newProps = {...props}
//   newProps.fontFamily = newProps['font-family']
//   newProps.fontSize = newProps['font-size']
//   newProps.letterSpacing = newProps['letter-spacing']
//   newProps.fontWeight = newProps['font-weight']
//   // delete newProps['xml:space']
//   delete newProps['font-family']
//   delete newProps['font-size']
//   delete newProps['letter-spacing']
//   delete newProps['font-weight']
//   delete newProps.children
//   delete newProps.at
//   delete newProps.print
//   delete newProps.fromTop
//   delete newProps.transform
//   // newProps.fill = '#171B4D'
//   newProps.fill='#FFFAEA'
//   // console.log(newProps)
//   return newProps
// }

//   // translate(185 181)

//   function handleTransform (Y) {
//   let [x,y] = [undefined, undefined];

//     if (props.transform) {      
//       let first = props.transform.split(' ');
//       if (first.length===1) {
//         x = +first[0].split('(')[1].split(')')[0];
//         y = 0;
//       } else { 
//         x = +first[0].split('(')[1];
//         y = +first[1].split(')')[0];
//       }
//     } else {x,y=[0,0]}
//     if (props.print) {
//       console.log(props.transform.split(' '))
//       console.log(Y)
//       console.log(x)
//       console.log(`translate(${x?x:0}px,${(y?y:0) + Y}px)`)
//     }
//     return `translate(${x}px, ${y + Y}px)`
//   }

//   return (
//     <text ref={animationRef} {...handleTextProps(props)} 
//     style={{
//       opacity:(scrolled>props.at?1:0),
//       transform: scrolled>props.at?handleTransform(0):handleTransform(props.fromTop?-25:0), 
//       transition:'all 0.4s ease', 
//       whiteSpace:'pre'
//     }}>
//       {props.children}
//     </text>
//   )

// }

// // export function AnimateSVGText({children,at, fromTop}) {
//   //   let {scrolled} = useAppContext();
  
//   //   return (
//   //     <g className='' 
//   //     style={{opacity:(scrolled>at?1:0),transform:scrolled>at?'translateY(0)':`translateY(${fromTop?'-20px':'0'})`, transition:'all 0.4s ease'}}>
//   //       {children}
//   //     </g>
//   //   )
  
//   // }