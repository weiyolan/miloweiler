import { useAppContext } from "@/utils/appContext";
import { PageWrapper } from "@/utils/pageContext";
// import Image from "next/image";
import React, { useState, useEffect, useRef } from "react"
// import { IoClose} from 'react-icons/io5'
import ProjectPictures from "@/components/ProjectPictures";
import ProjectPicture from "@/components/ProjectPicture";
import Layout from "@/components/Layout";
// import ProjectDescriptionTop from "@/components/ProjectDescriptionTop";
import { gsap } from 'gsap/dist/gsap'
import useLocalStorage from "@/utils/useLocalStorage";
import { Observer } from 'gsap/dist/Observer'
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import PictureIndicator from "@/components/PictureIndicator";

gsap.registerPlugin(Observer, ScrollToPlugin, ScrollTrigger)

export default function ProjectCarousel({ project, open, visibleItem, setVisibleItem, nextVisibility, prevVisibility, handleVisibility, closeModal }) {
  // let [animating, setAnimating] = useState(false)
  let darkMode = true
  // const { width, height, locale } = useAppContext()
  // let [visibleItem, setVisibleItem] = useState(initiateVisibility())
  // let [visibleItem, setVisibleItem] = useLocalStorage(`${slug}-visibleItem`, initiateVisibility())
  let [indicatorPosition, setIndicatorPosition] = useState(null)
  let [mainPictureHeight, setMainPictureHeight] = useState(null)
  let [mainPictureWidth, setMainPictureWidth] = useState(null)


  useEffect(() => {
    // console.log(descriptionPosition)
    // console.log(indicatorPosition)
    setMainPictureHeight(indicatorPosition?.top - 50)
    // console.log('height: ' + (descriptionPosition - indicatorPosition))

  }, [indicatorPosition, open])


  let palette = project.mainImage.image.asset.metadata.palette
  // let palette = Object.keys(project.mainImage.image.asset.metadata.palette).map((color,i)=>color.background);
  // {console.log(palette)}
  // let tl = useRef(null)

  // function initiateVisibility() {
  //   let visibility = new Array(project.otherImages.length + 1).fill(false)
  //   visibility[firstIndex] = true
  //   return visibility
  // }


  // useEffect(() => {
  //   // setDescriptionOpen(false)
  //   // firstLoad()

  //   // handleVisibility(visibleItem.indexOf(true), 'left')

  //   console.log(open)
  // }, [open])


  //  ========================================================================================
  // function firstLoad() {
  //   if (visibleItem !== null) {
  //     let activeIndex = visibleItem?.indexOf(true)
  //     gsap.to(`.mainPicture-${activeIndex}`, {
  //       autoAlpha: 1,
  //     })
  //   }
  // }

  // useEffect(() => {
  //   let observer = Observer.create({
  //     target: window,         // can be any element (selector text is fine)
  //     ignore: ".project-pictures, .project-grid, .imageFill",
  //     type: "touch, scroll, pointer",    // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
  //     preventDefault: false,
  //     onRight: () => {
  //       // console.log('right/prev');
  //       // setAnimating(true)
  //       prevVisibility()
  //     },
  //     onLeft: () => {
  //       // console.log('left/next');
  //       // setAnimating(true)
  //       nextVisibility()
  //     },
  //     lockAxis: true,
  //   })
  //   return () => { observer.disable() }
  // }, [visibleItem, animating])

  // // console.log(animating)



  // function vanish(index1, index2, direction) {
  //   let xAmount = 30;
  //   let scaleAmount = 0.95;
  //   gsap.killTweensOf(`.mainPicture-${index1}`)
  //   gsap.killTweensOf(`.mainPicture-${index2}`)
  //   // tl.current
  //   // , ' appeared: ', index2, ' to: ', direction
  //   // { onComplete: () => { console.log('vanished: ', index1, ' appeared: ', index2, ' to: ', direction) } }
  //   let tl = gsap.timeline({ autoRemoveChildren: true, onComplete: () => setAnimating(false) })
  //     .set(`.mainPicture-${index2}`, {
  //       x: () => direction === 'left' ? `${xAmount}` : `-${xAmount}`,
  //       scale: scaleAmount,
  //       borderRadius: 0,
  //       // autoAlpha: 0,
  //     })
  //     .to(`.mainPicture-${index1}`,
  //       {
  //         x: () => direction === 'left' ? `-=${xAmount}` : `+=${xAmount}`,
  //         scale: scaleAmount,
  //         autoAlpha: 0,
  //         borderRadius: 0,
  //         ease: 'expo.out',
  //         // ease:'power4.out',
  //         duration: 0.7,
  //       })
  //     .to(`.mainPicture-${index2}`, {
  //       x: 0,
  //       scale: 1,
  //       autoAlpha: 1,
  //       borderRadius: 5,
  //       ease: 'expo.out',
  //       // ease:'power4.out',
  //       duration: 0.7,
  //     }, '<+=0.1')
  //   // .set(`.mainPicture-${index1}`,
  //   //   {
  //   //     x: 0,
  //   //   scale:0.8,
  //   //   // autoAlpha: 0,
  //   //   })
  // }

  // useEffect(() => {
  //   return () => ctx.current.revert();
  // }, []);

  // useEffect(() => {
  //   ctx.current.add(() => {
  //     gsap.to('.project-pictures', {
  //       // x: selected === id ? 200 : 0,
  //       scrollTo:
  //         width < 1024
  //           ? { x: `#pictureThumb${visibleItem?.indexOf(true)}`, offsetX: width < 350 ? ((width - 80) / 2) : ((width - 112) / 2) }
  //           : { y: `#pictureThumb${visibleItem?.indexOf(true)}`, offsetY: (height - 167) / 2 },
  //       ease: 'power1.inout',
  //       duration: 0.7
  //       // duration: width < 1024 ? 0.7 : 1,
  //       // ease: 'expo.inout',
  //     });
  //   });
  // }, [visibleItem]);


  // function handleVisibility(nextItem, direction) {
  //   // console.log(visibleItem)
  //   let currentItem = visibleItem.indexOf(true);
  //   let newVisibility = new Array(visibleItem.length).fill(false);
  //   newVisibility[nextItem] = true;
  //   setVisibleItem(newVisibility)
  //   if (nextItem !== currentItem) {
  //     vanish(currentItem, nextItem, direction || (currentItem > nextItem ? 'right' : 'left'))
  //   }
  // }

  // function nextVisibility() {
  //   // console.log(visibleItem)

  //   if ((animating) && width < 1024) return;

  //   let currentItem = visibleItem.indexOf(true);
  //   if (currentItem === -1) {
  //     // handleVisibility(true, 0) // Cannot hurt to provide safety against no visibility although should not happen apriori.
  //     // handleVisibility(0) // Cannot hurt to provide safety against no visibility although should not happen apriori.
  //     // console.log('currentItem is -1!')
  //   } else {
  //     let nextItem = currentItem === visibleItem.length - 1 ? 0 : currentItem + 1;
  //     // handleVisibility(true, nextItem)
  //     handleVisibility(nextItem, 'left')
  //     // vanish(currentItem, nextItem, 'left')
  //     // console.log(currentItem, nextItem)
  //   }
  // }

  // function prevVisibility() {
  //   if ((animating) && width < 1024) return;
  //   // console.log('prev')
  //   let currentItem = visibleItem.indexOf(true);
  //   if (currentItem === -1) {
  //     // handleVisibility(0)
  //     // console.log('currentItem is -1!')
  //     // handleVisibility(true, 0)
  //   } else {
  //     let nextItem = currentItem === 0 ? visibleItem.length - 1 : currentItem - 1;
  //     handleVisibility(nextItem, 'right')
  //     // vanish(nextItem, 'right')
  //     // vanishToLeft(currentItem, nextItem)

  //     // handleVisibility(true, nextItem)
  //   }
  // }

  return (
    <div
      tabIndex={0} 
      // style={{ backgroundColor: palette.dominant.background }}
      className={`carouselContainer focus:outline-none w-screen h-[100dvh] bg-opacity-80 backdrop-blur bg-darkPrimary ${open ? 'block' : 'hidden'} fixed top-0 left-0  duration-700   ${darkMode ? "text-primary" : "text-darkPrimary"}`}
      onClick={(e) => { if (e.target === document.getElementById("carouselContainer")) { closeModal() } }}
      // onClick={(e) => console.log(e.target, Array.from(document.querySelectorAll(".carouselContainer")))}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          prevVisibility();
        } else if (e.key === "ArrowRight") {
          nextVisibility();
        }
      }}>
      <PageWrapper palette={palette} >
        <Layout cardSection className={"carouselContainer relative h-full flex items-center justify-center"}>
          <div style={{}} className={`carouselContainer relative w-[100%] h-full xl:w-[100%] max-w-[1700px] border-0 `}>

            {/* {visibleItem && ( */}
            <div id="carouselContainer" className="relative flex flex-col justify-end  w-full h-full  pb-0 pt-10 mobm:pt-14  lg:py-8  ">
              <ProjectPicture
                setMainPictureWidth={setMainPictureWidth}
                mainPictureHeight={mainPictureHeight}
                images={[project.mainImage.image, ...project.otherImages.map((oImage) => oImage.image)]}
                visibleItem={visibleItem}
                handleVisibility={handleVisibility}
                nextVisibility={nextVisibility}
                prevVisibility={prevVisibility}
              />
              <PictureIndicator mainPictureWidth={mainPictureWidth} setPosition={setIndicatorPosition} handleVisibility={handleVisibility} visibleItem={visibleItem} />
              <ProjectPictures images={[project.mainImage.image, ...project.otherImages.map((oImage) => oImage.image)]} handleVisibility={handleVisibility} visibleItem={visibleItem} />
            </div>
            {/* )} */}

            <button title={`Close carousel`} onClick={closeModal} className={'flex justify-center items-center w-[50px] h-[50px] fixed top-0 right-0 '}>
              <svg className='w-[17px] sm:w-[20px]' viewBox="0 0 23 23">
                <path
                  d="M 3 16.5 L 17 2.5"
                  fill="transparent"
                  strokeWidth="2.5"
                  stroke={`${darkMode ? '#FFF5EA' : '#000'}`}
                  strokeLinecap="round"
                />
                <path
                  d="M 3 2.5 L 17 16.346"
                  fill="transparent"
                  strokeWidth="2.5"
                  stroke={`${darkMode ? '#FFF5EA' : '#000'}`}
                  strokeLinecap="round"
                />
              </svg>
            </button>

          </div>
        </Layout>

      </PageWrapper>
    </div>
  );
}
