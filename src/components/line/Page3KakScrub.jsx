import React, { useEffect, } from "react"
// import { useDimensions } from "@/utils/useDimensions"
// import { useAppContext } from "@utils/appContext.js"
// import { Path, TextAnimate } from '@/components/line/pathUtils'
// import { SVGWrapper } from "./contextSVG"
import { usePageContext } from "@utils/pageContext"
// import { PageWrapper } from "@context/pageContext"
// import AnimateSVG from "./AnimateSVG"
// import AnimateSVGBanner from "./AnimateSVGBanner"
// import { gsap } from "gsap/dist/gsap"
import { PathGSAPStandalone } from "./pathUtilsGsap"
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
// import useStateRef from "@/utils/useStateRef"
// gsap.registerPlugin(ScrollTrigger)

let kakjes = [
  "M22.9437 24.5001C20.9437 21.5001 22.9454 22.5001 22.9437 19.0001C22.9421 15.8134 28.7198 11.7035 31.5 14.5C32.4971 15.5029 32.4435 16.5001 30.9435 19.0001C29.4435 21.5001 32.4435 23.0001 30.9435 24.5001C29.4435 26.0001 28.9437 27.0001 26.9435 27.5001C24.9432 28.0001 24.0001 26.0848 22.9437 24.5001Z",
  "M17.7605 58.9673C19.7555 49.0966 22.9473 47.1226 26.9372 48.3071C27.3363 49.4917 34.9171 49.4915 28.1342 53.8345C21.3514 58.1776 27.7352 57.7829 24.5433 64.1001C21.3514 70.4173 26.9372 68.8381 22.9473 74.3658C18.9573 79.8934 17.7604 75.5502 14.9675 71.9967C12.1745 68.4432 15.7655 68.8381 17.7605 58.9673Z",
  "M19.5002 62.0001C20.9998 58.0001 17.8152 57.3585 20.8091 52.1656C22.0061 49.3585 24.6249 47.4909 30.5 53.0001C32.8091 55.1654 25.8776 57.0594 26.5999 64.1002C26.9999 68 24.5001 68.9184 24.5001 73C24.5001 78.5 20.3171 77.5502 17.5242 73.9968C14.7313 70.4433 17.8885 66.2989 19.5002 62.0001Z",
];

export default function Page3KakScrub({ className, scrubTl }) {

  // let { locale, scrolled } = useAppContext()

  let { mobile } = usePageContext()


  let colorPrimary = "#FFF5EA";

  useEffect(() => {
    scrubTl && scrubTl
      .set('#anus', {
        scale: 0,
        opacity: 0,
        transformOrigin: '50% 50%',
      }, 0)
      .to('#anus', {
        scale: 1,
        opacity: 1,
        duration: 15,
      }, 0)
      .to('#kak1', {
        opacity: 1,
        duration: 20,
      }, 10)
      .to('#kak1', {
        attr: { d: kakjes[0] },
        duration: 20,
        ease: 'none',
      }, 30)
      // .to('#kak1', {
      //   attr: { d: kakjes[1] },
      //   duration: 20,
      //   ease: 'none',
      // }, 50)
      // .to()
      .to('#kak1', {
        y: 150,
        x: -15,
        attr: { d: kakjes[1] },
        duration: 45,
        ease: 'none',
      }, 50)
      .to('#anus', {
        scale: 1,
        opacity: 0,
        duration: 5,
      }, 90)

  }, [scrubTl])

  let tweenAppear = {
    timeline: scrubTl,
    ratio: 0.99,
    attr: { duration: 30, ease: 'none', x: -5, y: 60, },
    position: 65
  }

  // let tweenDisapp = {
  //   timeline: scrubTl,
  //   ratio: 0.99,
  //   attr: { duration: 5, ease: 'none' },
  //   position: 95,
  // }

  return (<>
    <svg className={`fixed left-[70%] md:left-[80%] top-[calc(50lvh+0.92*0.7*0.19*100vw)] md:top-[calc(50vh+0.92*0.3*0.19*100vw)] -translate-x-1/2 w-[10%] md:w-[2.8%] svgKakScrub`} viewBox="0 0 39 235" fill="none">
      <path className='opacity-0' id="anus" d="M32.4404 1.00143C29.3609 1.00143 29.7462 3.27722 30.3879 5.5718C30.9837 7.70227 32.6576 8.9993 34.4939 9C36.5466 9.00078 37.0599 7.85765 37.5729 6.71518C38.0859 5.5727 38.0475 4.87424 37.5729 3.28811C36.8475 0.863833 35.5198 1.00143 32.4404 1.00143Z" strokeWidth={2} stroke={`${colorPrimary}`} strokeLinecap="round" />
      <path className='opacity-0' id="kak1" d="M32.2673 10.0463C30.4921 8.81613 28.8616 8.32526 29.7593 7.02991C30.657 5.73456 31.9985 4.74677 31.8539 4.00743C31.7094 3.2681 34.0931 1.72428 35.2698 3.81805C36.4464 5.91182 35.2495 7.63899 36.137 8.25409C37.0246 8.86919 36.5706 10.4721 35.3839 10.2888C34.1971 10.1054 33.1744 10.6333 32.2673 10.0463Z" fill={`${colorPrimary}`} />
      {/* <path className='opacity-0' id="kak2" d="M22.9437 24.5001C20.9437 21.5001 22.9454 22.5001 22.9437 19.0001C22.9421 15.8134 28.7198 11.7035 31.5 14.5C32.4971 15.5029 32.4435 16.5001 30.9435 19.0001C29.4435 21.5001 32.4435 23.0001 30.9435 24.5001C29.4435 26.0001 28.9437 27.0001 26.9435 27.5001C24.9432 28.0001 24.0001 26.0848 22.9437 24.5001Z"  fill={`${colorPrimary}`} /> */}
      {/* <path className='opacity-0' id="kak3" d="M17.7605 58.9673C19.7555 49.0966 22.9473 47.1226 26.9372 48.3071C27.3363 49.4917 34.9171 49.4915 28.1342 53.8345C21.3514 58.1776 27.7352 57.7829 24.5433 64.1001C21.3514 70.4173 26.9372 68.8381 22.9473 74.3658C18.9573 79.8934 17.7604 75.5502 14.9675 71.9967C12.1745 68.4432 15.7655 68.8381 17.7605 58.9673Z" fill={`${colorPrimary}`} /> */}
      {/* <path className='opacity-100' id="speed1" d="M23.11 103.5C22.11 81 28.11 39.5 33.61 29"  strokeWidth={1.5} stroke={`${colorPrimary}`} strokeLinecap="round" /> */}
      {/* <path className='opacity-100' id="speed1" d="M13.5002 117.5C12.5002 95 18.5002 53.5 24.0002 43"   strokeWidth={1.5} stroke={`${colorPrimary}`} strokeLinecap="round" /> */}
      {/* <path className='opacity-100' id="speed1" d="M8.11005 90.5C7.11005 68 13.11 26.5 18.61 16" strokeWidth={1.5} stroke={`${colorPrimary}`} strokeLinecap="round" /> */}
      {/* <path id="kak4" d="M19.5002 62.0001C20.9998 58.0001 17.8152 57.3585 20.8091 52.1656C22.0061 49.3585 24.6249 47.4909 30.5 53.0001C32.8091 55.1654 25.8776 57.0594 26.5999 64.1002C26.9999 68 24.5001 68.9184 24.5001 73C24.5001 78.5 20.3171 77.5502 17.5242 73.9968C14.7313 70.4433 17.8885 66.2989 19.5002 62.0001Z" fill="#FF0000"/> */}

      <PathGSAPStandalone inverse tweens={[{ id: `speed1AnimationAppear`, ...tweenAppear },
        // { id: `speed1AnimationDisapp`, ...tweenDisapp }
      ]}
        transitStrokeAnimation transitPortion={0.95} key={'speedPath' + 1} id={'speed1'} d="M23.11 103.5C22.11 81 28.11 39.5 33.61 29" />

      <PathGSAPStandalone inverse tweens={[{ id: `speed2AnimationAppear`, ...tweenAppear },
        // { id: `speed2AnimationDisapp`, ...tweenDisapp }
      ]}
        transitStrokeAnimation transitPortion={0.95} key={'speedPath' + 2} id={'speed2'} d="M13.5002 117.5C12.5002 95 18.5002 53.5 24.0002 43" />

      <PathGSAPStandalone inverse tweens={[{ id: `speed3AnimationAppear`, ...tweenAppear },
        // { id: `speed3AnimationDisapp`, ...tweenDisapp }
      ]}
        transitStrokeAnimation transitPortion={0.95} key={'speedPath' + 3} id={'speed3'} d="M8.11005 90.5C7.11005 68 13.11 26.5 18.61 16" />

    </svg>

  </>
  )
}