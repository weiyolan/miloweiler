import React, { useEffect } from 'react'
import ArrowLink from '../ArrowLink'
import Image from 'next/image'
import Parallax from '../Parallax'
import FadeDiv from '../FadeDiv'
// import { Observer } from 'gsap/dist/Observer'
import gsap from 'gsap/dist/gsap'

let paths = [
  "M0.410265 0.173333C0.360632 0.143145 0.325718 0.139417 0.157575 0.14635C-0.0271344 0.153968 -0.0326131 0.153169 0.0547314 0.131373C0.105472 0.118709 0.218318 0.107551 0.305502 0.106577C0.392687 0.105592 0.504779 0.0922837 0.554597 0.076978C0.645188 0.049145 0.989248 -0.00934969 0.999872 0.00127427C1.00297 0.00437281 0.949338 0.0218263 0.880691 0.0400635C0.657666 0.0993075 0.557938 0.142098 0.580241 0.168975C0.615051 0.210929 0.477855 0.214447 0.410265 0.173333Z",
  "M0.00537513 0.434029C0.00537513 0.328061 0.043753 0.190425 0.0900908 0.129768C0.13185 0.0751017 0.241571 0.0464427 0.532782 0.0141364C0.74331 -0.00922053 0.756399 -0.0077556 0.855279 0.0502015C0.911966 0.0834262 0.974103 0.130191 0.993366 0.154128C1.01263 0.178062 0.988503 0.167606 0.939758 0.130888C0.887831 0.0917746 0.81952 0.0641331 0.774786 0.0641331C0.689576 0.0641331 0.646339 0.107427 0.698529 0.140492C0.738458 0.165785 0.721041 0.16887 0.572241 0.162871C0.511216 0.160399 0.447873 0.147302 0.431477 0.133742C0.378945 0.0902981 0.255195 0.138235 0.177959 0.23195C0.137155 0.28146 0.10377 0.330269 0.10377 0.340411C0.10377 0.350557 0.0816224 0.395192 0.0545488 0.439598C0.0545488 0.439598 0.017351 0.520339 0.00533111 0.520339C-0.00668954 0.520339 0.00537519 0.471501 0.00537513 0.434029Z",
  "M0.360917 0.456097C0.294239 0.423959 0.274127 0.404948 0.290007 0.389067C0.319358 0.359715 0.295331 0.345913 0.115112 0.288616C0.035371 0.263261 -0.01469 0.241767 0.00386574 0.240849C0.0538232 0.238381 0.304895 0.319163 0.319199 0.342309C0.325983 0.353288 0.357306 0.362269 0.388807 0.362269C0.431331 0.362269 0.470632 0.335615 0.541412 0.258773C0.612121 0.182009 0.682554 0.134211 0.814126 0.0737092C0.911687 0.0288466 0.995235 -0.00413374 0.999788 0.000420323C1.00434 0.00497125 0.935138 0.0598021 0.846004 0.122265C0.681304 0.237677 0.554759 0.37221 0.554759 0.431893C0.554759 0.450014 0.565528 0.464841 0.578691 0.464841C0.591854 0.464841 0.596659 0.470806 0.589369 0.478095C0.558836 0.508632 0.447712 0.497929 0.360917 0.456097Z",
];

let newPath = [
  "M0 0H0.25H0.5H1V0.25V0.375V0.5H0.5H0.25H0.125H0V0.375V0.25V0Z",
  "M0 0H0.25H0.5H1V0.25V0.375V0.5H0.5H0.25H0.125H0V0.375V0.25V0Z",
  "M0 0H0.25H0.5H1V0.25V0.375V0.5H0.5H0.25H0.125H0V0.375V0.25V0Z"
]



export default function Page3Photos({ className, animateName }) {

  useEffect(() => {
    gsap.utils.toArray(".svgClips").forEach((photo, i) => {
      let hover = gsap.to(photo, { attr: { d: newPath[2 - i] }, duration: 0.5, paused: true, ease: "power1.inOut", overwrite: true });
      let click = gsap.to(photo, { scale: 1.05, duration: 0.1, paused: true, ease: "power1.inOut", overwrite: true });
      photo.addEventListener("mouseenter", () => hover.play());
      photo.addEventListener("mouseleave", () => hover.reverse());
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
        <ArtImage n={2} alt='' src='/images/mainpageArt3.jpg' svgClipsPosition='translate-y-32' imagePosition={'left-[20%] top-[28%] -translate-x-1/2 -translate-y-1/2'} ratio={2250 / 1500} className={`w-[calc(0.899*30vw)] h-[calc(0.899*30vw*2250/1500)]`} />
        <ArtImage n={1} alt='' src='/images/mainpageArt2.jpg' svgClipsPosition='translate-y-32' imagePosition={'-translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2'} ratio={2 / 3} className={`w-[calc(0.752*30vw)] h-[calc(0.752*30vw*0.6666)]`} />
        <ArtImage n={0} alt='' src='/images/mainpageArt1.jpg' svgClipsPosition='translate-y-32' imagePosition={'left-[80%] top-[60%] -translate-x-1/2 -translate-y-1/2'} ratio={2 / 3} className={`w-[calc(1*30vw)] h-[calc(1*30vw*0.6666)]`} />
{/* translate-y-64
translate-y-28
translate-y-36 */}
      </div>
    </div>
  )
}

function ArtImage({ className, n, ratio, svgClipsPosition, imagePosition, ...props }) {
  return (
    <div
      // style={{ clipPath: `path(${paths[n]})` }}
      // style={{ clipPath: `url(#svgClip${n})` }}
      // style={{left:`calc(${n} * 1/3)`}}
      className={`absolute  opacity-0 invisible  page3photos ${imagePosition} select-none`}>

      <div className={`relative ${className}  `}>
        {/* w-[60vw] h-[calc(60vw*0.666)] */}
        <Image
          style={{ clipPath: `url(#svgClip${n})` }}
          // width={1500} height={n === 2 ? 1000 : 2250}
          fill
          className={`absolute object-cover object-center  cursor-pointer`} sizes='100vw' {...props} />
        <svg width={0} height="0" viewBox='0 0 1 1' className=''>
          <clipPath id={`svgClip${n}`} className={`svgClips ${svgClipsPosition} `} clipPathUnits="objectBoundingBox">
            <path id={`bird${n}`} d={paths[n]} fill="#0E0C0C" className='' />
          </clipPath>
        </svg>
      </div>

    </div>
  )
}

function PageImage({ className, n, ...props }) {
  return (
    <div className={`absolute  ${className}`}>
      <svg width={0} height="0">
        <clipPath id={`svgClip${n}`} className='cursor-pointer translate-y-32 hover:scale-105 ' clipPathUnits="objectBoundingBox">
          <path id={`bird${n}`} d={paths[n]} fill="#0E0C0C" />
        </clipPath>
      </svg>
      <Image style={{ clipPath: `url(#svgClip${n})` }}
        width={1500} height={n === 2 ? 1000 : 2250} className='w-[25vw] page3photos select-none  hover:cursor-pointer opacity-0 invisible  drop-shadow-2xl ' sizes='(max-width: 640px) 50vw, 25vw' {...props} />
    </div>
  )
}
