import React, { useEffect, useRef, useState } from 'react'
// import ArrowLink from '../ArrowLink'
import Image from 'next/image'
// import Parallax from '../Parallax'
// import FadeDiv from '../FadeDiv'
// import { Observer } from 'gsap/dist/Observer'
import gsap from 'gsap/dist/gsap'
import { useAppContext } from '@/utils/appContext';

let paths = [
  "M0.410265 0.173333C0.360632 0.143145 0.325718 0.139417 0.157575 0.14635C-0.0271344 0.153968 -0.0326131 0.153169 0.0547314 0.131373C0.105472 0.118709 0.218318 0.107551 0.305502 0.106577C0.392687 0.105592 0.504779 0.0922837 0.554597 0.076978C0.645188 0.049145 0.989248 -0.00934969 0.999872 0.00127427C1.00297 0.00437281 0.949338 0.0218263 0.880691 0.0400635C0.657666 0.0993075 0.557938 0.142098 0.580241 0.168975C0.615051 0.210929 0.477855 0.214447 0.410265 0.173333Z",
  "M0.00537513 0.434029C0.00537513 0.328061 0.043753 0.190425 0.0900908 0.129768C0.13185 0.0751017 0.241571 0.0464427 0.532782 0.0141364C0.74331 -0.00922053 0.756399 -0.0077556 0.855279 0.0502015C0.911966 0.0834262 0.974103 0.130191 0.993366 0.154128C1.01263 0.178062 0.988503 0.167606 0.939758 0.130888C0.887831 0.0917746 0.81952 0.0641331 0.774786 0.0641331C0.689576 0.0641331 0.646339 0.107427 0.698529 0.140492C0.738458 0.165785 0.721041 0.16887 0.572241 0.162871C0.511216 0.160399 0.447873 0.147302 0.431477 0.133742C0.378945 0.0902981 0.255195 0.138235 0.177959 0.23195C0.137155 0.28146 0.10377 0.330269 0.10377 0.340411C0.10377 0.350557 0.0816224 0.395192 0.0545488 0.439598C0.0545488 0.439598 0.017351 0.520339 0.00533111 0.520339C-0.00668954 0.520339 0.00537519 0.471501 0.00537513 0.434029Z",
  "M0.360917 0.456097C0.294239 0.423959 0.274127 0.404948 0.290007 0.389067C0.319358 0.359715 0.295331 0.345913 0.115112 0.288616C0.035371 0.263261 -0.01469 0.241767 0.00386574 0.240849C0.0538232 0.238381 0.304895 0.319163 0.319199 0.342309C0.325983 0.353288 0.357306 0.362269 0.388807 0.362269C0.431331 0.362269 0.470632 0.335615 0.541412 0.258773C0.612121 0.182009 0.682554 0.134211 0.814126 0.0737092C0.911687 0.0288466 0.995235 -0.00413374 0.999788 0.000420323C1.00434 0.00497125 0.935138 0.0598021 0.846004 0.122265C0.681304 0.237677 0.554759 0.37221 0.554759 0.431893C0.554759 0.450014 0.565528 0.464841 0.578691 0.464841C0.591854 0.464841 0.596659 0.470806 0.589369 0.478095C0.558836 0.508632 0.447712 0.497929 0.360917 0.456097Z",
];

let newPath = [
  { viewBox: "0 0 5 2", d: "M2.05133 0.866664C1.80316 0.715726 1.62859 0.697084 0.787876 0.731749C-0.135672 0.769841 -0.163066 0.765846 0.273657 0.656864C0.527358 0.593544 1.09159 0.537756 1.52751 0.532885C1.96344 0.527959 2.52389 0.461418 2.77298 0.38489C3.22594 0.245725 4.94624 -0.0467484 4.99936 0.00637134C5.01484 0.021864 4.74669 0.109131 4.40346 0.200318C3.28833 0.496537 2.78969 0.710491 2.9012 0.844874C3.07526 1.05464 2.38928 1.07223 2.05133 0.866664Z" }
  , { viewBox: "0 0 4 3", d: "M0.0215005 1.73612C0.0215005 1.31225 0.175012 0.761698 0.360363 0.519074C0.527401 0.300407 0.966285 0.185771 2.13113 0.0565454C2.97324 -0.0368821 3.0256 -0.0310224 3.42112 0.200806C3.64787 0.333705 3.89641 0.520765 3.97346 0.616512C4.0505 0.712246 3.95401 0.670423 3.75903 0.52355C3.55132 0.367098 3.27808 0.256532 3.09914 0.256532C2.7583 0.256532 2.58536 0.429709 2.79411 0.561967C2.95383 0.663141 2.88417 0.675482 2.28896 0.651483C2.04486 0.641595 1.79149 0.589207 1.72591 0.534969C1.51578 0.361192 1.02078 0.55294 0.711838 0.9278C0.548621 1.12584 0.415079 1.32107 0.415079 1.36164C0.415079 1.40223 0.32649 1.58077 0.218195 1.75839C0.218195 1.75839 0.0694039 2.08135 0.0213244 2.08135C-0.0267582 2.08135 0.0215008 1.886 0.0215005 1.73612Z" }
  , { viewBox: "0 0 4 2", d: "M1.44367 1.84057C1.17696 1.71087 1.09651 1.63415 1.16003 1.57007C1.27743 1.45162 1.18132 1.39592 0.460447 1.1647C0.141484 1.06238 -0.0587602 0.975643 0.015463 0.97194C0.215293 0.96198 1.21958 1.28797 1.2768 1.38138C1.30393 1.42568 1.42923 1.46192 1.55523 1.46192C1.72532 1.46192 1.88253 1.35436 2.16565 1.04427C2.44848 0.734491 2.73022 0.541603 3.2565 0.297451C3.64675 0.11641 3.98094 -0.0166816 3.99915 0.0016962C4.01736 0.0200613 3.74055 0.241329 3.38402 0.493395C2.72522 0.959137 2.21904 1.50204 2.21904 1.74289C2.21904 1.81602 2.26211 1.87585 2.31476 1.87585C2.36742 1.87585 2.38664 1.89992 2.35748 1.92934C2.23535 2.05257 1.79085 2.00938 1.44367 1.84057Z" }
]

export default function Page3Photos({ className, animateName }) {

  useEffect(() => {
    gsap.utils.toArray(".svgClips").forEach((photo, i) => {
      let hovering = gsap.to(photo, { attr: { d: newPath[2 - i] }, duration: 0.5, paused: true, ease: "power1.inOut", overwrite: true });
      let click = gsap.to(photo, { scale: 1.05, duration: 0.1, paused: true, ease: "power1.inOut", overwrite: true });
      photo.addEventListener("mouseenter", () => hovering.play());
      photo.addEventListener("mouseleave", () => hovering.reverse());
      photo.addEventListener("mousedown", () => click.play());
      photo.addEventListener("mouseup", () => click.reverse());
    });
  }, [])

  return (
    <div className={'page3photosContainer fixed w-screen h-screen'} >
      <div className='w-full h-full page3photosContainerInner'>
        {/* <PageImage n={0} alt='' src='/images/mainpageArt1.jpg' className={` top-[55%] left-[75%] scale-[1.09] -translate-x-1/2 -translate-y-32`} />  */}
        {/* <PageImage n={1} alt='' src='/images/mainpageArt2.jpg' className={` top-[38%] left-[48%] scale-[0.82] -translate-x-1/2 -translate-y-32`} />  */}
        {/* <PageImage n={2} alt='' src='/images/mainpageArt3.jpg' className={` top-[20%] left-[23%] scale-[0.98] -translate-x-1/2 -translate-y-32`} />  */}
        {/* <ArtImage n={2} alt='' src='/images/mainpageArt3.jpg' svgClipsPosition='translate-y-32' imagePosition={'left-[20%] top-[28%] -translate-x-1/2 -translate-y-1/2'} ratio={2250 / 1500} className={`w-[calc(0.899*30vw)] h-[calc(0.899*30vw*2250/1500)]`} /> */}
        {/* <ArtImage n={1} alt='' src='/images/mainpageArt2.jpg' svgClipsPosition='translate-y-32' imagePosition={'-translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2'} ratio={2 / 3} className={`w-[calc(0.752*30vw)] h-[calc(0.752*30vw*0.6666)]`} /> */}
        {/* <ArtImage n={0} alt='' src='/images/mainpageArt1.jpg' svgClipsPosition='translate-y-32' imagePosition={'left-[80%] top-[60%] -translate-x-1/2 -translate-y-1/2'} ratio={2 / 3} className={`w-[calc(1*30vw)] h-[calc(1*30vw*0.6666)]`} /> */}
        <ArtImage n={2} alt='' src='/images/mainpageArt3.jpg' imagePosition={`object-[50%,-12lvh] lg:object-[50%,-35vh]`} className={'w-[calc(0.890*70vw)] md:w-[calc(0.890*30vw)] left-[30%] top-[10lvh] md:left-[20%] md:top-[23%] -translate-x-1/2'} />
        {/* <ArtImage n={0} alt='' src='/images/mainpageArt1.jpg' imagePosition={`object-[50%,-200px]`} className={'w-[calc(0.92*30vw)]  left-[80%] top-[50%] -translate-x-1/2'} /> */}
        <ArtImage n={1} alt='' src='/images/mainpageArt2.jpg' imagePosition={`object-[50%,-10lvh] lg:object-[50%,-30vh]`} className={'w-[calc(0.752*70vw)] md:w-[calc(0.752*30vw)]  left-1/2 top-[35lvh] md:left-1/2 md:top-[42%] -translate-x-1/2'} />
        <ArtImage n={0} alt='' src='/images/mainpageArt1.jpg' imagePosition={`object-[50%,-5lvh] lg:object-[50%,-20vh]`} className={'w-[calc(0.920*70vw)] md:w-[calc(0.920*30vw)] left-[70%] top-[50lvh]  md:left-[80%] md:top-[50%] -translate-x-1/2'} />
        {/* translate-y-64
translate-y-28
translate-y-36 */}
      </div>
    </div>
  )
}


function ArtImage({ className, n, imagePosition, ...props }) {
  let {width} = useAppContext()
  let [hovering, setHovering] = useState(false)
  const ctx = useRef(gsap.context(() => { }));

  useEffect(() => {
    return () => ctx.current.revert();
  }, []);

  useEffect(() => {
    // artPhoto1
    // artPhoto2
    // artPhoto3

    ctx.current.add(() => {
      gsap.to(`.artPhoto${n}`, {
        opacity: hovering ? 1 : 0,
        duration: 0.8,
      })
      // gsap.to(['.page3description'],{
      //   autoAlpha:hovering?0:1,
      //   duration:0.4
      // })

      // gsap.to([0,1,2].filter((item)=>item!==n).map((nr)=>{return `.page3photos${nr}`}),{
      //   autoAlpha:hovering?0:1,
      //   duration:0.3,
      // })
    })

  }, [hovering])


  let mobile = width<768

  return (
    <div
      // style={{ clipPath: `path(${paths[n]})` }}
      // style={{ clipPath: `url(#svgClip${n})` }}
      // style={{left:`calc(${n} * 1/3)`}}
      className={`absolute opacity-0 invisible drop-shadow-2xl page3photos page3photos${n} ${className} select-none`}>

      {/* <div className={`relative ${className}`}> */}
      {/* w-[60vw] h-[calc(60vw*0.666)] */}


      <Image
        style={{ clipPath: `url(#svgClip${n})` }}
        // width={1500} height={n === 2 ? 1000 : 2250}
        fill
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={`object-cover ${imagePosition} cursor-pointer`} sizes='30vw' {...props} />

      <svg  viewBox='0 0 1 1'
      
      // onMouseEnter={() => mobile && setHovering(true)}
      // onMouseLeave={() => mobile && setHovering(false)}

      >
        <clipPath id={`svgClip${n}`} className={`svgClips`} clipPathUnits="objectBoundingBox">
          <path id={`bird${n}`} d={paths[n]} fill="#0E0C0C" className='' />
        </clipPath>
      </svg>
      {/* <svg viewBox={`${viewBox}`}> */}

      {/* </div> */}

    </div>
  )
}

// function ArtImage2({ className, n, ...props }) {
//   return (
//     <div className={`absolute opacity-0 invisible  page3photos drop-shadow-2xl select-none ${className}`}>
//       {/* <div className={`relative border-red-500 border-2 ${className} w-fit`}> */}
//       <Image style={{ clipPath: `url(#svgClip${n})` }}
//         width={1500} height={n === 2 ? 1000 : 2250} className={`relative object-cover w-[20vw] select-none hovering:cursor-pointer `} sizes='(max-width: 640px) 50vw, 25vw' {...props} />
//       {/* </div> */}

//       <svg className='w-0 h-0' viewbox='0 0 1 1'>
//         <defs>
//           <clipPath id={`svgClip${n}`} className='' clipPathUnits="objectBoundingBox">
//             <path id={`bird${n}`} d={paths[n]} fill="#0E0C0C" />
//           </clipPath>
//         </defs>
//       </svg>
//     </div>
//   )
// }

// function PageImage({ className, n, ...props }) {
//   return (
//     <div className={`absolute drop-shadow-2xl border-red-500 border-2 ${className}`}>
//       <Image style={{ clipPath: `url(#svgClip${n})` }}
//         width={1500} height={n === 2 ? 1000 : 2250} className='relative w-[20vw] h-auto page3photos select-none object-cover hovering:cursor-pointer opacity-0 invisible ' sizes='(max-width: 640px) 50vw, 25vw' {...props} />

//       <svg className='' viewbox='0 0 1 1'>
//         <defs>
//           <clipPath id={`svgClip${n}`} className='' clipPathUnits="objectBoundingBox">
//             <path id={`bird${n}`} d={paths[n]} fill="#0E0C0C" />
//           </clipPath>
//         </defs>
//       </svg>
//     </div>
//   )
// }
