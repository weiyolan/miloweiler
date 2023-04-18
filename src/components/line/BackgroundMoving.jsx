import Image from "next/image";
import { useState, useEffect } from "react"
import { useAppContext } from "@utils/appContext"


export default function BackgroundMoving ({src, moves, maxMoves,className}) {
//   const [myWidth, setMyWidth] = useState(0)
  let {height} = useAppContext();

//   let blurOn = true

//   useEffect(()=>{
//     setMyWidth(width)
//   },[width])

  // function handleScroll () {
  //   let ratio = (document.documentElement.scrollTop + document.body.scrollTop)/(document.documentElement.scrollHeight - document.documentElement.clientHeight)
  //   setScrolled(ratio)
  // }
  // let [scrolled, setScrolled] = useState(0)

  // useEffect(()=>{
  //   let ratio = (document.documentElement.scrollTop + document.body.scrollTop)/(document.documentElement.scrollHeight - document.documentElement.clientHeight)
  //   setScrolled(ratio)

  //   window.addEventListener('scroll', handleScroll, {passive:true})

  //   return () => {window.removeEventListener('scroll',handleScroll)}
  // },[])

  // bg-cover bg-[url('/images/backgroundpng.png')
  // filter
  
  let overflow = 0.2
  let moveHeight = height*overflow/maxMoves //*0.2 because taking 1.2 * height
  let Y = moves*moveHeight
  
  return (
    <div className={`w-full fixed top-[0] bg-gradient-to-b from-[#FF9DBD] to-[#FFB461] z-0 h-[100vh] overflow-hidden ${src?'':'bg-slate-600'} `} >
      <div className='flex w-full absolute top-0 transition-all duration-1000' style={{height: height*(1+overflow)+'px' , transform: `translate(0,-${Y}px)`}}>
        {/* {console.log(height*(1+overflow)+'px')} */}
        {/* {console.log(`translate(-${Y}px,0)`)} */}
        {src&&<Image alt='' fill priority src={src} className={`object-cover object-left sm:object-center ${className}`} sizes="100vw" quality={90}/>}
         {/* Empty ALT for purely decorative images */}
      </div>
      

      {/* {myWidth<breakPointSmall && <Image priority src='/images/backgroundpng.png' alt='' fill sizes='100vw' className='object-cover object-center'/>} */}

      {/* {myWidth>breakPointSmall && 
        <div role='presentation' className={`bg-green ${myWidth<640?'':'animate-blob'} animation-delay-2000   
          h-[200vh] w-[66vw] 
          -left-[40vw] -bottom-[100vh] 
          transition-all duration-400 rounded-full filter absolute ${blurOn?`blur-[200px]`:''} `}
          /> }
          {myWidth>breakPointSmall && <div role='presentation' className={`bg-blue ${myWidth<640?'':'animate-blob2'} animation-delay-4000   
          h-[200vh] w-[66vw] 
          right-[25vw] -top-[33vh] 
          transition-all duration-400 rounded-full filter absolute ${blurOn?`blur-[200px]`:''} `}
          />}
           {myWidth>breakPointSmall &&<div role='presentation' style={myWidth<640?{top:0,left:0}:{top:`${-60+25*scrolled}vh`, left:`${-33+30*scrolled}vw`}} 
        className={`bg-green ${myWidth<640?'':'animate-blob'} animation-delay-6000   
          h-[100vh] w-[66vw] 
          -left-[33vw] -top-[60vh] 
          transition-all ease-in-out duration-1000 rounded-full filter absolute ${blurOn?`blur-[180px] sm:blur-[200px]`:''} `}
          /> }
          {myWidth>breakPointSmall && <div role='presentation' className={`bg-green ${myWidth<640?'':'animate-blob2'} animation-delay-2000  
          h-[200vh] w-[66vw] 
          right-[0] -bottom-[60vh]
          transition-all duration-400 rounded-full filter absolute ${blurOn?`blur-[200px]`:''} `}
          /> }

          {myWidth>breakPointSmall &&<div role='presentation' style={myWidth<640?{}:{bottom:`${-100+20*scrolled}vh`, right:`${-25+50*scrolled}vw`}}
        className={`bg-blue ${myWidth<640?'':'animate-blob'} animation-delay-4000    
         -right-[25vw]  -bottom-[100vh]
         h-[150vh] w-[50vw]
          transition-all ease-in-out duration-1000 rounded-full filter absolute ${blurOn?`blur-[200px]`:''} `}
          />}
           {myWidth>breakPointSmall &&<div role='presentation' className={`bg-green ${myWidth<640?'top-0 right-0':'animate-blob'} animation-delay-0000   
          h-[200vh] w-[66vw] 
          -right-[33vw] -top-[150vh]
          transition-all duration-400 rounded-full filter absolute ${blurOn?`blur-[150px] sm:blur-[200px]`:''} `}
          /> } */}

    </div>
  )
}

