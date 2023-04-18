import useDimensions from '@/utils/useDimensions'
import React, { useState, useEffect, useRef } from 'react'
import { useAppContext } from '@utils/appContext.js'
import { usePageContext } from '@utils/pageContext'

export default function ScrollingDiv ({children, setMoveTracker,setMaxMoveTracker,setScrollingDivHeight, finishingScroll, className, style, animationLocation, screenHeight, footerHeight, titleHeight, svgHeight}) {
  const {scrolled} = useAppContext()
  let [moves , setMoves] = useState(0)
  let {mobile, finished} = usePageContext();
  let [maxMoves, setMaxMoves] = useState(undefined)
  // let [offset,setOffset] = useState(0)

  // let [moved, setMoved] = useState(false)
  let [visibleHeight, setVisibleHeight] = useState(undefined) //only the svg that is not faded => from top of scrollingdiv (no margin) to bottom screen
  
  let scrollDivRef = useRef(null)
  let [dimensions, setDimensions] = useState({width: undefined, height: undefined , top: undefined, bottom: undefined})
  let print = false;

  const factor=mobile?0.35:0.3
  const moveHeight = visibleHeight*factor
  // let breakTime = mobile?500:500

  useEffect(()=>{
    if (print) {
    // console.log('maxMoves: '+ maxMoves)(moves>=1?(titleHeight*0.7):0)
    console.log(moves>=1)
    console.log(titleHeight*0.7)
    // console.log(titleHeight + ' < ' + animationLocation.top + ' && ' + animationLocation.bottom + ' < ' + visibleHeight + ' ==> ' + ((titleHeight<animationLocation.top && animationLocation.bottom<visibleHeight)?'OK':'Not allowed!'))
    console.log('top: '+ animationLocation.top + ' > ' + (moves*moveHeight - (moves>=1?(titleHeight*0.1):0))  + ' ==> ' + ((animationLocation.top > (moves*moveHeight - (moves>=1?(titleHeight*0.1):0) )  )?'OK':'Not allowed!'))
    console.log('bottom: ' + animationLocation.bottom + ' < ' + (visibleHeight + moves*moveHeight )  + ' ==> ' + ((animationLocation.bottom < (visibleHeight + moves*moveHeight )  )?'OK':'Not allowed!'))
    // console.log('moves: '+ moves + ', maxMoves: ' + maxMoves + ' of height ' + (moveHeight))
    // console.log('moved: '+ moved)
    // console.log('translation: ' + `-${moves>=maxMoves?(svgHeight-visibleHeight)+footerHeight:moves*visibleHeight*factor}px`)
    // console.log(animationLocation)
    // console.log({transform: `translate(-50%,-${moves*visibleHeight*factor }px)`})
    }
  },[moves, maxMoves, animationLocation, titleHeight, svgHeight, visibleHeight])


  function handleSize() {
    if (svgHeight > 0) {
      const { width, y} = scrollDivRef.current.getBoundingClientRect();
      setDimensions({ width: width, height: svgHeight , top: y, bottom: y + svgHeight});
      print && console.log('dimensions setted: ' + 'width: ' + width+', height: '+ svgHeight+ ', top: '+y+', bottom: '+(y + svgHeight) )
      // console.log('fired')
    }
  }

  useEffect(()=>{
    // print && console.log(dimensions?.height === undefined || )


    window.addEventListener('resize', handleSize)

    handleSize()

    return window.removeEventListener('resize',handleSize)


  },[titleHeight, svgHeight])

  useEffect(()=>{
    
    let myVisibleHeight = screenHeight-dimensions.top


    // let myVisibleHeight = screenHeight-dimensions.top


    if (myVisibleHeight>0) {
      setVisibleHeight(myVisibleHeight)
      // print && console.log('visibleHeight setted: ' + myVisibleHeight)
    }


    if (setScrollingDivHeight !== undefined) {
      setScrollingDivHeight(dimensions.height + dimensions.top)
      // setScrollingDivHeight(dimensions.height + dimensions.top - titleHeight)
    }

  },[dimensions, screenHeight, titleHeight])

  useEffect(()=>{
      // console.log('svgHeight to scroll ' + (svgHeight-visibleHeight)+ '\nmove Height ' + (visibleHeight*factor))
      // console.log('maxMoves: ' + maxMoves)
      
      // console.log((svgHeight-visibleHeight)/(visibleHeight*factor))
      // console.log(Math.floor((svgHeight-visibleHeight)/(visibleHeight*factor)))
      let max = Math.ceil((svgHeight-visibleHeight)/moveHeight);
      setMaxMoves(max)
      setMaxMoveTracker(max)
      // print && console.log('maxMoves setted')

  },[visibleHeight, svgHeight])

  useEffect(()=>{
    
      if (animationLocation?.bottom) {

        //  WITHOUT FADE THE TITLE GOES UP SO VISIBLE HEIGTH ON TOP IS LARGER AFTER FIRST MOVE,
      let visibleTop = moves*moveHeight - (moves>=1?(titleHeight*0.04):0)
      let visibleBottom = moves*moveHeight + visibleHeight - 80
      // print && console.log('visibleTop: ' + visibleTop + ', visibleBottom: ' + visibleBottom)

      // // let newVisibleB = newMoves*moveHeight
      // // let newVisibleT = newVisibleB + visibleHeight
      // // let newOffset = animationLocation.top > newVisibleT?0:(newVisibleT-animationLocation.top) // in case top of animation is out of screen.

      if (animationLocation.bottom > visibleBottom || animationLocation.top < visibleTop) {
      // // let newMovesT = Math.max(Math.ceil((animationLocation.top - visibleHeight)/moveHeight),0)
        // print && console.log()
        let newMoves = Math.max(Math.ceil((animationLocation.bottom - visibleHeight)/moveHeight),0) 
        print && console.log('newMoves: ' + newMoves + ', oldMoves: ' + moves + (newMoves !== moves?' => updated':' => NOT updated') )
        print && console.log('maxMoves: ' + maxMoves )

        if ((newMoves) !== moves) {
          setMoves(newMoves||0)
          setMoveTracker(newMoves||0)
          }
    }

    //  if (animationLocation.top < visibleTop) {
    //   let newMoves = Math.max(Math.ceil((visibleTop-animationLocation.top)/moveHeight),0) 
    //   print && console.log('newMoves: ' + newMoves + ', oldMoves: ' + moves + (newMoves !== moves?' => updated':' => NOT updated') )
    //   print && console.log('maxMoves: ' + maxMoves )

    //   if ((newMoves) !== moves) {
    //     setMoves(newMoves||0)
    //     setMoveTracker(newMoves||0)
    //     }
    //  }
    }


  },[animationLocation, visibleHeight])

  // useEffect(()=>{
  //   let timer;

  //   if (1) {
  //    timer = setTimeout(()=>{
  //     // setMoved(false);
  //     // console.log('timer removed')
  //   }, breakTime)
  //   //  console.log('Timer set!')
  //   }
  //   // console.log(moves, moved)
  //   return () => {clearTimeout(timer)}

  // },[])

  // let Y = 


  // if (width === undefined || height === undefined) {
  //   return <div>Loading...</div>;
  // }
  // transition: `${(scrolled>step1.from && scrolled <step1.to) || (scrolled > step2.from && scrolled < step2.to)?'all 1s ease':'none'
  
  // let Y =  finished?0:moves>=maxMoves?((svgHeight-visibleHeight)+(footerHeight/2)):(moves*moveHeight)
  let Y =  (mobile || finished)?0:moves>=maxMoves?(titleHeight + (dimensions.height + dimensions.top - titleHeight)  + footerHeight - screenHeight):(moves*moveHeight)

  // let Y =  0  
  return (
    
    // transition:scrolled===step1.at || scrolled===step2.at || scrolled===step3.at?'all ease 0.8s':'none'
    // style={{ transform: `translate(-50%, ${-Y}px)`, transition: 'all 1s ease'}}>
    // transform:`translate(-50%,-${moves<totalMoves?moves*visibleHeight*factor:svgHeight-visibleHeight}px)`
      <div id={`scrolling-div-${svgHeight}`} ref={scrollDivRef} style={{...style, height: `${svgHeight}px`, transition: `${finished?'none':'all 1s ease'}` , transform: `translate(-50%,-${Y}px)`}} className={className} >
          
          {/* {console.log('Y: ' + (Y))}
          {console.log('MaxMove: ' + (titleHeight + (dimensions.height + dimensions.top - titleHeight)  + footerHeight-screenHeight))}
          {console.log('scrollingDivHeight: ' + (dimensions.height + dimensions.top - titleHeight))}
          {console.log('titleHeight: ' + (titleHeight))}
          {console.log('footerHeight: ' + (footerHeight))}
          {console.log('svgHeight: ' + (svgHeight))}
          {console.log('screenHeight: ' + (screenHeight))} */}

          {/* {console.log({ transform: `translate(-50%, ${-Y}px)`, transition: `${(scrolled>step1.from && scrolled <step1.to) || (scrolled > step2.from && scrolled < step2.to)?'all 1s ease':'none'}`}.transition)} */}
          {children}

      </div>

    )
}
