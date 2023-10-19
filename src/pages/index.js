import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
// import { Lenis as ReactLenis } from '@studio-freight/react-lenis'
// import '../styles/globals.css'

import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

import { PageWrapper } from '@utils/pageContext'
import { useAppContext } from '@utils/appContext'
import Background from '@/components/Background'
import StoryTitle from '@/components/line/StoryTitle'
import Image from 'next/image'
import PageDescription from '@/components/line/PageDescription'
import Page1Photos from '@/components/line/Page1Photos'
// import ScrollVisual from '@/components/line/ScrollVisual'
import BackgroundSplit from '@/components/BackgroundSplit'
import Page2Photos from '@/components/line/Page2Photos'
import Page3Photos from '@/components/line/Page3Photos'

// import Story0Logo from '@/components/line/Story0Logo'
// import Story1Moon from '@/components/line/Story1Moon'
// import Story2Waves from '@/components/line/Story2Waves'
// import Story3Animals from '@/components/line/Story3Animals'
import PageDescription4 from '@/components/line/PageDescription4'
import Navigation from '@/components/Navigation'
import Page3KakScrub from '@/components/line/Page3KakScrub'
import Page4Kakje from '@/components/line/Page4Kakje'
import PageDescription5 from '@/components/line/PageDescription5'
import Page5Milo from '@/components/line/Page5Milo'
// import { ScrollDown } from '@/components/ScrollDown'
import NavigationMobile from '@/components/NavigationMobile'
// import MobileScrollbar from '@/components/MobileScrollbar'
import Page0Logo from '@/components/line/Page0Logo'
import Page1Moon from '@/components/line/Page1Moon'
import Page2Waves from '@/components/line/Page2Waves'
import Page3Animals from '@/components/line/Page3Animals'
// import ScrollVisual from '@/components/line/ScrollVisual'
import FadeDiv from '@/components/FadeDiv'
// import Line from '@/components/Line'
import ScrollDown from '@/components/ScrollDown'
import client from '../../lib/sanity'
import PageIndicator from '@/components/PageIndicator'
import useMinimizeScroll from '@/utils/useMinimizeScroll'
// import ScrollVisual from '@/components/line/ScrollVisual'
// import LanguageToggle from '@/components/LanguageToggle'
import BackgroundMain from '@/components/BackgroundMain'
import SplashScreen from '@/components/SplashScreen'
// import useWindowResize from '@/utils/useWindowResize'


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);

export default function Home({ projects, sectionInfo }) {
  const {
    scrolled,
    width: screenWidth,
    height: screenHeight,
    // mobileHeight: mobilelvh,
  } = useAppContext();

  // useWindowResize({options:{resize:true}});

  useMinimizeScroll();
  let [artImages, setArtImages] = useState(() => {
    let photos = [];
    let project = projects.filter((project) => project.cat === "art")[0];
    project.otherImages.forEach((img) => {
      photos = [...photos, { image: img, slug: project.slug.current }];
    });
    return photos;
  });
  // let [artImages, setArtImages] = useState(() => { let photos = []; projects.filter((project) => project.cat === 'art').forEach(project => project.otherImages.forEach(img => { photos = [...photos, { image: img, slug: project.slug.current }] })); return photos })
  let [artProjects, setArtProjects] = useState(() => {
    return projects.filter((project) => project.cat === "art");
  });

  useEffect(() => {
    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;
      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
    }
    // console.log(artProjects)
    let artProject = artProjects[Math.floor(Math.random() * artProjects?.length)];
    let newPhotos = [];
    artProject.otherImages.forEach((img) => {
      newPhotos = [...newPhotos, { image: img, slug: artProject.slug.current }];
    });
    let shuffledPhotos = shuffle([...newPhotos]);
    // let newPhotos = shuffle([...artImages])

    shuffledPhotos && setArtImages(shuffledPhotos.slice(0, 3));

    // let newMainImage = shuffle([...mainImages])
    // newMainImage && setMainImages(newMainImage.slice(0, 1))
  }, []);

  // let svgRef = useRef(null)
  // let ctx = useRef()
  // let tl = useRef()
  let [introAnimationTl, setIntroAnimationTl] = useState();

  const introAnimationTlRef = useRef();

  // let [scrubTl0, setScrubTl0] = useState();
  // let [scrubTl1, setScrubTl1] = useState();
  // let [scrubTl2, setScrubTl2] = useState();
  // let [scrubTl3, setScrubTl3] = useState();
  // let [scrubTl4, setScrubTl4] = useState();
  // let [scrubTl5, setScrubTl5] = useState();

  const scrubTl0Ref = useRef();
  const scrubTl1Ref = useRef();
  const scrubTl2Ref = useRef();
  const scrubTl3Ref = useRef();
  const scrubTl4Ref = useRef();
  const scrubTl5Ref = useRef();

  const transitionTl1Ref = useRef();
  const transitionTl2Ref = useRef();
  const transitionTl3Ref = useRef();
  const transitionTl4Ref = useRef();
  const transitionTl5Ref = useRef();

  // let [transitionTl1, setTransitionTl1] = useState();
  // let [transitionTl2, setTransitionTl2] = useState();
  // let [transitionTl3, setTransitionTl3] = useState();
  // let [transitionTl4, setTransitionTl4] = useState();
  // let [transitionTl5, setTransitionTl5] = useState();

  let [pageLoaded, setPageLoaded] = useState(false);
  // let [svgHeight, setSvgHeight] = useState(undefined)
  // let [svgWidth, setSvgWidth] = useState(undefined)
  // let [svgTop, setSvgTop] = useState(undefined) //For calculation of FadeDiv
  // let [titleHeight, setTitleHeight] = useState(undefined)
  // let [svgViewHeight, setSvgViewHeight] = useState(undefined) //For calculation of FadeDiv

  // let [mobile, setMobile] = useState(undefined)
  let mobile = screenWidth < 768;

  // let velocity = useRef(0)
  let titleCtx = useRef(gsap.context(() => {}));
  let viewBoxWidth = mobile ? 569 : 1782;
  // real movile viewbox height = 3335
  let viewBoxHeight = mobile ? 1572 : 1982;
  let svgScrubAmount = 100; //in px
  let [firstScreenWidth, setFirstScreenWidth] = useState(undefined);

  useEffect(() => {
    setFirstScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    // window.innerWidth < 768 && ScrollTrigger.normalizeScroll(true)
    ScrollTrigger.config({
      // limitCallbacks: true,
      ignoreMobileResize: true,
      // autoRefreshEvents: "DOMContentLoaded,load,resize",
      // onresize:
    });
    return () => {
      // window.innerWidth < 768 && ScrollTrigger.normalizeScroll(false)
      titleCtx.current.revert();
    };
  }, []);

  useEffect(() => {
    function keepScroll() {
      if (window.innerWidth >= 768) {
        // console.log(window.innerWidth, firstScreenWidth)
        if (Math.abs(window.innerWidth - firstScreenWidth) >= 100) {
          location.reload();
          gsap.to(window, { scrollTo: window.scrollY || 0, delay: 0.2 });
        }
      }
    }
    window.addEventListener("resize", keepScroll);

    keepScroll();
    return () => window.removeEventListener("resize", keepScroll);
  }, [firstScreenWidth]);

  // useEffect(()=>{
  //   // location.reload()
  // },[mobilelvh])

  // let [footerHeight, setFooterHeight] = useState(undefined)
  // let [animationLocation, setAnimationLocation] = useState({ top: undefined, bottom: undefined })
  // let [textLocation, setTextLocation] = useState({ top: undefined, bottom: undefined })

  // let [moveTracker, setMoveTracker] = useState(0) //Tracker to move background when animation moves
  // let [maxMoveTracker, setMaxMoveTracker] = useState(0) //Tracker to move background when animation moves

  // let [finished, setFinished] = useState(false)
  // let [introAnimated, setIntroAnimated] = useState(false)
  // let [textAppear, setTextAppear] = useState({ textAppear: false })
  // let [textDisappear, setTextDisappear] = useState({ textDisappear: false })

  // useEffect(() => {
  //   setMobile(screenWidth < 768)
  // }, [screenWidth])

  // let finishingScroll = mobile ? 0.95 : 0.995 // Same as ending of animation
  // let finishingScroll = 2 // impossible, so will never activate

  // // useEffect(() => {
  // //   if (scrolled >= finishingScroll && !finished) { setFinished(true) }
  // // }, [scrolled])
  // // useEffect(() => {
  // if (scrolled >= finishingScroll && !finished) { setFinished(true) }
  // // }, [scrolled])

  // useEffect(() => {
  //   gsap.to(window, { scrollTo: 0 })

  //   let keepScroll = () => {
  //     gsap.to(window, { scrollTo: window.scrollY })
  //   }
  //   // window.addEventListener('resize', keepScroll)
  //   // return ()=> window.removeEventListener('resize', keepScroll)
  // }, [])

  // -------WITH TITLE AND FOOTER -------------
  // let heightToScroll = (mobile || finished) ? scrollingDivHeight + titleHeight + footerHeight : 6000

  // -------WITHOUT TITLE AND FOOTER -------------
  // let heightToScroll = (mobile || finished) ? scrollingDivHeight : 6000

  // let heightToScroll = svgHeight + footerHeight

  // let svgWidthFactor = viewBoxWidth / (1.157*screenWidth) || 1;

  // useEffect(() => {
  //   function handleSize() {
  //     let bbox = document.getElementById('referenceSvg').getBoundingClientRect()
  //     let height = bbox.bottom - bbox.top;
  //     let width = bbox.width;
  //     // let top = bbox.top;
  //     console.log('RESIZE')
  //     console.log(height)
  //     if (height >= 0 && height.toFixed(0) !== svgHeight?.toFixed(0) && setSvgHeight !== undefined) {
  //       setSvgHeight(height)
  //       setSvgWidth(width)
  //     }
  //     // if (top?.toFixed(0) !== svgTop?.toFixed(0)) {
  //     //   setSvgTop(top)
  //     // }
  //   }
  //   window.addEventListener('resize', handleSize)
  //   handleSize()
  //   return () => { window.removeEventListener('resize', handleSize) }
  // }, [mobile])

  // useEffect(() => {
  //   console.log(screenHeight)
  // }, [screenHeight])

  useEffect(() => {
    let ctx = gsap.context(() => {
      function scrubIntro() {
        let tl = gsap
          .timeline({
            ease: "power1.out",
            //  onStart:()=>{gsap.getById('scrollDown').pause().progress(0)}
          })
          .to(
            ".pageIntro",
            {
              y: "-10vh",
              duration: 1,
              ease: "none",
            },
            0
          )
          .to(
            [".introSvgInner", ".page1MoonSvgInner"],
            {
              duration: 1,
              y: `-${svgScrubAmount}px`,
              ease: "none",
            },
            0
          )
          .to(
            ".titleContainerInner",
            {
              y: mobile ? "-120px" : "-40px",
              duration: 1,
              ease: "none",
            },
            0
          );
        return tl;
      }

      function introTextAnimation() {
        let tl = gsap.timeline();
        // .to(['.titleText1'], {
        //   autoAlpha: 1,
        //   // y: '-=5',
        //   stagger: {
        //     amount: 0.1
        //   },
        //   duration: 0.5,
        //   ease: 'none'
        // }, 0)
        // .to(['.titleText2'], {
        //   autoAlpha: 1,
        //   // y: '-=5',
        //   stagger: {
        //     amount: 0.1
        //   },
        //   duration: 0.5,
        //   ease: 'none'
        // }, 1)
        return tl;
      }
      // ============================= page1 =============================
      function showPage1() {
        // SCALE = 2s
        let tl = gsap
          .timeline({ id: "showPage1Tl" })
          // .to(['.svgPage2'],
          .to(
            [".page1MoonSvg"],
            {
              duration: 1,
              y: `${svgScrubAmount}px`, //Cancelling out the scrub from before.
              yPercent: mobile ? -47 : -61.3,
              // y: `-${(mobile ? 0.206633 : 0.27810) * svgHeight + svgTop - svgScrubAmount - (screenHeight / 2)}px`, //ABS -svgScrubAmount from moveStar animation (about 100 px)
              // y: `-30vh`, //ABS -svgScrubAmount from moveStar animation (about 100 px)
            },
            0
          )
          .to(
            [".page1"],
            {
              y: "-30vh",
              opacity: 1,
              duration: 2,
            },
            0.5
          )
          .to(
            ".page1stars",
            {
              opacity: 1,
              duration: 1,
              ease: "ease.out",
            },
            0
          )
          .to(
            ".page1stars",
            {
              y: "5vh",
              duration: 2,
              ease: "ease.out",
            },
            0
          )
          .to(
            [".page1feet"],
            {
              y: mobile ? "-54%" : "-63%",
              ease: "power2.out",
              autoAlpha: 1,
              duration: 1,
            },
            0.3
          );

        return tl;
      }
      function showInfo1() {
        let tl = gsap
          .timeline()
          // .set('.page1descriptionContainer', {
          //   // overwrite:true,
          //   autoAlpha: 1,
          // }, 0)
          .to(
            ".page1description",
            {
              autoAlpha: 1,
              y: "-=5px",
              stagger: 0.2,
              duration: 1,
            },
            0
          )
          .to(
            ".page1photos",
            {
              autoAlpha: 1,
              stagger: 0.05,
              duration: 1,
            },
            0.7
          );
        return tl;
      }
      function hideIntro() {
        let tl = gsap
          .timeline({
            onComplete: () => {
              titleCtx.current.data.forEach((anim, i) => {
                anim.pause();
              });
            },
            onReverseComplete: () =>
              titleCtx.current.data.forEach((anim, i) => {
                anim.play();
              }),
          })
          .to(
            [".pageIntroInner"],
            // { y: '-10vh' },
            {
              y: "-30vh",
              // y: '-40vh',
              duration: 2,
              ease: "power.out",
              // ease: 'power2.inout',
            },
            0
          )
          .to(
            [".titleContainer"],
            {
              // autoAlpha: 0,
              y: "-30vh",
              duration: 1,
              ease: "power.out",
            },
            0
          )
          .to(
            [".introSvg"],
            {
              y: mobile ? "-20lvh" : "-160vh",
              yPercent: mobile ? -100 : 0,
              // y:'-30vh',
              duration: 0.7,
              // ease: 'ease.in'
            },
            0
          )
          // .to(['.scrollDownSvg'], {
          //   autoAlpha: 0,
          //   yPercent:-50,
          //   duration: 0.3
          //   // ease: 'ease.in'
          // }, 0)
          .to(
            [".titleContainer"],
            {
              autoAlpha: 0,
              // y:'-30vh',
              duration: 0.3,
              // ease: 'ease.in'
            },
            0.2
          )
          .to(
            ".pageIntroInner",
            {
              autoAlpha: 0,
              duration: 0.7,
              // ease: 'ease.in'
            },
            0.4
          )
          .to(
            [".introSvg"],
            {
              autoAlpha: 0,
              // y:'-30vh',
              duration: 0.2,
              // ease: 'ease.in'
            },
            0.9
          );
        return tl;
      }
      function scrubPage1() {
        let tl = gsap
          .timeline({ id: "moonScrubTl", ease: "power1.out" })
          .to(
            ".page1Inner",
            {
              y: mobile ? "-10lvh" : "-5vh",
              duration: 6.3,
              ease: "none",
              // ease: 'power.out'
              // duration:1,
              // ease: 'ease.in'
            },
            0
          )
          .to(
            ".page1starsInner",
            {
              y: mobile ? "-10lvh" : "-5vh",
              duration: 6.3,
              ease: "none",
              // ease: 'power.out'
              // duration:1,
              // ease: 'ease.in'
            },
            0
          )
          .addLabel("start", 0);
        // .to('.page1',
        //   {
        //     y: '-=30px',
        //     duration: 1,
        //   }, 0)
        // .to('.svgPage2Inner',
        //   {
        //     duration: 1,
        //     y: `-${svgScrubAmount}px`,
        //     // y: `-${(0.09) * svgHeight + svgTop - (screenHeight / 2)}px`,
        //     // onStart: () => {console.log('start')},
        //     // onComplete:()=>{console.log('complete')}
        //   }, 0)
        return tl;
      }
      // ============================= page2 =============================

      // "M923 1965.57C923 1974.08 916.125 1981 907.645 1981C899.166 1981 895 1974.08 895 1965.57C895 1957.05 910.355 1933.72 910.355 1941.6C910.355 1949.48 923 1958.24 923 1965.57Z",
      let dropletStartUp = [
        "M924.794 1258.1C924.04 1259.91 889.21 1262.91 890.014 1258.77C890.014 1252.77 903.55 1260.67 902.532 1256.77C899.055 1243.43 917.833 1247.43 912.964 1254.77C908.096 1262.1 927.17 1252.39 924.794 1258.1Z",
        "M912.143 1258.77C912.143 1259.87 909.232 1260.86 906.543 1260.86C903.853 1260.86 901.429 1259.87 901.429 1258.77C901.429 1257.68 904.34 1257.29 907.029 1257.29C909.719 1257.29 912.143 1257.68 912.143 1258.77Z",
      ];
      let dropletEnd = [
        "M912.143 1979.5C912.143 1980.81 909.232 1982 906.543 1982C903.853 1982 901.429 1980.81 901.429 1979.5C901.429 1978.19 904.34 1977.71 907.029 1977.71C909.719 1977.71 912.143 1978.19 912.143 1979.5Z",
      ];

      // "M294.499 1561.52C294.499 1567.02 290.194 1571.48 284.884 1571.48C279.575 1571.48 276.967 1567.02 276.967 1561.52C276.967 1556.01 286.581 1540.94 286.581 1546.03C286.581 1551.12 294.499 1556.78 294.499 1561.52Z",
      let dropletStartMobileUp = [
        "M297.021 951.275C296.5 952.581 272.454 954.741 273.009 951.755C273.009 947.434 282.355 953.128 281.652 950.315C279.251 940.712 292.215 943.593 288.854 948.874C285.493 954.156 298.661 947.165 297.021 951.275Z",
        "M288.374 951.2C288.374 952.084 286.417 952.881 284.61 952.881C282.801 952.881 281.172 952.084 281.172 951.2C281.172 950.317 283.129 950 284.936 950C286.744 950 288.374 950.317 288.374 951.2Z",
      ];
      let dropletEndMobile = [
        "M288.374 1570.4C288.374 1571.29 286.417 1572.08 284.61 1572.08C282.801 1572.08 281.172 1571.29 281.172 1570.4C281.172 1569.52 283.129 1569.2 284.936 1569.2C286.744 1569.2 288.374 1569.52 288.374 1570.4Z",
      ];

      function showPage2() {
        let tl = gsap
          .timeline()
          // .to(['.svgPage2'],
          //   {
          //     duration: 1,
          //     y: () => { return `-${(mobile ? 0.35798 : 0.4432) * svgHeight + svgTop - svgScrubAmount - (screenHeight / 2)}px` }, //ABS -svgScrubAmount from moveStar animation (about 100 px)
          //   }, 0)

          // .to(['.page1MoonSvg'],
          //   {
          //     duration: 1,
          //     y: `${svgScrubAmount}px`, //still cancelling out .
          //     yPercent: (-100 - 0.23864 * 34.176 + 1),
          //   }, 0)

          .to(
            [".page1MoonSvgInner2"],
            {
              duration: 1,
              y: `${svgScrubAmount}px`, //Cancelling out the scrub .
              yPercent: mobile ? -100 - 0.23864 * 34.176 + 1 + 47 : -100 - 0.23864 * 34.176 + 1 + 61.3, //cancelling out ypercent
              // yPercent: (-100 - 0.23864 * 34.176 + 1), //normal
            },
            0
          )

          .to(
            [".page2"],
            {
              y: "-30vh",
              opacity: 1,
              duration: 2,
              ease: "ease.out",
            },
            0
          )
          .to(
            "#droplet",
            {
              // y: () => { return `${(mobile ? 0.39 : 0.141) * svgHeight * svgWidthFactor}px` },
              // y: () => { return `${(mobile ? 0.39 : 0.141) * (mobile?2.76:1.11) * svgWidth * svgWidthFactor}px` },
              //                   dropDownDistance * heightWidthRatio * sceenWidthRatio * screenWidth
              // y: () => { return `${mobile ? (0.59 * 2.76 * 1.157 * screenWidth * svgWidthFactor) : (0.38 * 1.11  * screenWidth * 1.157 * svgWidthFactor)}px` },
              // y: () => { return `${mobile ? (0.59 * 2.76 * viewBoxWidth) : (0.38 * 1.11  * viewBoxWidth)}px` },
              y: () => {
                return `${mobile ? 0.38 * viewBoxHeight : 0.355 * viewBoxHeight}px`;
              },
              // y: 0,
              // attr: { d: mobile ? dropletStartMobile[0] : dropletStart[0] },
              ease: "power.out",
              // scale: 1,
              // transformOrigin: '50% 50%',
              duration: 1.5,
            },
            0
          )
          .to(
            "#droplet",
            {
              duration: 0.2,
              attr: { d: mobile ? dropletStartMobileUp[1 - 1] : dropletStartUp[1 - 1] },
              ease: "none",
            },
            1.5
          )
          .to(
            "#droplet",
            {
              duration: 0.2,
              opacity: 0,
              attr: { d: mobile ? dropletStartMobileUp[2 - 1] : dropletStartUp[2 - 1] },
              ease: "none",
            },
            1.7
          )
          .to(
            "#dropletEnd",
            {
              y: "-30px",
              opacity: 1,
              duration: 0.4,
              ease: "expo.out",
            },
            1.5
          )
          .to(
            "#dropletEnd",
            {
              y: 0,
              duration: 0.2,
              opacity: 0,
              ease: "expo.in",
              attr: { d: mobile ? dropletEndMobile[0] : dropletEnd[0] },
            },
            1.8
          );

        return tl;
      }
      function showInfo2() {
        let tl = gsap
          .timeline()
          // .set('.page2photosContainer', {
          //   autoAlpha: 1
          // }, 0)
          // .set('.page2descriptionContainer', {
          //   autoAlpha: 1,
          // }, 0)
          .to(
            ".page2photosContainerInner",
            {
              autoAlpha: 1,
              duration: 0.3,
            },
            0.2
          )

          .to(
            ".page2description",
            {
              autoAlpha: 1,
              y: "-=5px",
              stagger: 0.2,
              duration: 1,
            },
            0
          )
          .to(
            ".page2photos",
            {
              autoAlpha: 1,
              stagger: 0.05,
              duration: 1,
            },
            0.7
          )
          .to(
            ".page2photosContainerInner",
            {
              duration: 0.1,
              background: "black",
            },
            1.8
          );
        return tl;
      }
      function hidePage1() {
        let tl = gsap
          .timeline()
          // { y: '-10vh' },
          .to(
            ".page1Inner",
            {
              opacity: 0,
              duration: 0.7,
              ease: "power.out",
              // ease: 'ease.in'
            },
            0
          )
          .to(
            ".page1stars",
            {
              autoAlpha: 0,
              y: "-5vh",
              duration: 1,
              ease: "ease.out",
            },
            0
          )
          .to(
            ".page1feet",
            {
              y: "-=300px",
              ease: "power2.out",
              duration: 1,
            },
            0
          )

          .to(
            [".page1feetContainer"],
            {
              // y: '-30vh',
              // y: '-73%',
              // y: '-=300px',
              autoAlpha: 0,
              ease: "power2.out",
              duration: 1,
            },
            0
          )
          .to(
            ".legFlower",
            {
              opacity: 0,
              duration: 0.7,
            },
            0
          );
        return tl;
      }
      function hideInfo1() {
        let tl = gsap
          .timeline()
          .to(
            ".page1descriptionContainer",
            {
              autoAlpha: 0,
              duration: 0.5,
              // overwrite:true,
            },
            0
          )
          .to(
            ".page1photosContainer",
            {
              autoAlpha: 0,
              duration: 0.5,
            },
            0
          );
        return tl;
      }
      function scrubPage2() {
        let tl = gsap
          .timeline({ ease: "power1.out" })
          .to("#fish", { duration: 2 })
          .to(
            ".page2Inner",
            {
              y: mobile ? "-10lvh" : "-5vh",
              duration: 2,
              ease: "none",
            },
            0
          )
          .to(
            ".page2photosContainerInner",
            {
              xPercent: -45,
              duration: 2,
              ease: "expo.inout",
            },
            0
          );
        // .to('.page1',
        //   {
        //     y: '-=30px',
        //     duration: 1,
        //   }, 0)
        // .to('.svgPage2Inner',
        //   {
        //     duration: 1,
        //     y: `-${svgScrubAmount}px`,
        //     // y: `-${(0.09) * svgHeight + svgTop - (screenHeight / 2)}px`,
        //     // onStart: () => {console.log('start')},
        //     // onComplete:()=>{console.log('complete')}
        //   }, 0)
        return tl;
      }
      // ============================= page3 =============================
      function showPage3() {
        let tl = gsap
          .timeline()
          // .to(['.svgPage2'],
          //   {
          //     duration: 2,
          //     y: `-${(mobile ? 0.51 : 0.6056) * svgHeight + svgTop - svgScrubAmount - (screenHeight / 2)}px`, //ABS -svgScrubAmount from moveStar animation (about 100 px)
          //   }, 0)

          .to(
            ".page3AnimalsSvg",
            {
              duration: 2,
              y: "-40vh",
              yPercent: -50,
              ease: "ease.out",
            },
            0
          )
          .to(
            [".page3"],
            {
              y: "-10vh",
              opacity: 1,
              duration: 4,
              ease: "ease.out",
            },
            0
          );

        return tl;
      }
      function showInfo3() {
        let tl = gsap
          .timeline()
          // .set('.page3photosContainer', {
          //   autoAlpha: 1
          // }, 0)
          .set(
            ".page3descriptionContainer",
            {
              autoAlpha: 1,
            },
            0
          )
          .to(
            ".page3description",
            {
              autoAlpha: 1,
              y: "-=5px",
              stagger: 0.2,
              // duration: 1,
            },
            0
          )
          .to(
            [".page3photos0", ".page3photos1", ".page3photos2"],
            {
              autoAlpha: 1,
              stagger: 0.2,
              // duration: 0.5,
            },
            0.6
          );
        return tl;
      }
      function hidePage2() {
        let tl = gsap
          .timeline()
          // { y: '-10vh' },
          .to(
            ".page2Inner",
            {
              opacity: 0,
              duration: 0.7,
              ease: "power.out",
              // ease: 'ease.in'
            },
            0
          )
          .to(
            [".page2WavesSvgInner", ".dropletGroup"],
            {
              opacity: 0,
              duration: 1,
              y: `-80vh`,
              ease: "power.out",
            },
            0
          );

        return tl;
      }
      function hideInfo2() {
        let tl = gsap
          .timeline()
          .to(
            ".page2descriptionContainer",
            {
              autoAlpha: 0,
              duration: 0.5,
            },
            0
          )
          .to(
            ".page2photosContainer",
            {
              autoAlpha: 0,
              duration: 0.5,
            },
            0
          );

        return tl;
      }
      function scrubPage3() {
        let tl = gsap.timeline({ ease: "power1.out" }).to(
          [".page3Inner", ".page3AnimalsSvgInner"],
          {
            y: mobile ? "-10lvh" : "-5vh",
            duration: 100,
            ease: "none",
            // duration: 2.5,
          },
          0
        );

        return tl;
      }
      // ============================= page4 =============================
      function showPage4() {
        let tl = gsap
          .timeline()
          // .to(['.svgPage2'],
          //   {
          //     duration: 1,
          //     y: `-${(0.8056) * svgHeight + svgTop - svgScrubAmount - (screenHeight / 2)}px`, //ABS -svgScrubAmount from moveStar animation (about 100 px)
          //   }, 0)
          .to(
            [".page4"],
            {
              y: "-30vh",
              opacity: 1,
              duration: 1,
              ease: "ease.out",
            },
            0
          );

        return tl;
      }
      function showInfo4() {
        let tl = gsap.timeline().to(
          ".page4description",
          {
            autoAlpha: 1,
            y: "-=5px",
            stagger: 0.2,
            duration: 1,
          },
          0
        );
        return tl;
      }
      function hidePage3() {
        let tl = gsap
          .timeline()
          .to(
            ".page3Inner",
            {
              opacity: 0,
              duration: 0.7,
              ease: "power.out",
            },
            0
          )
          .to(
            ".page3AnimalsSvgInner",
            {
              // y: '-140vh',
              yPercent: -150,
              duration: 0.7,
              ease: "power.out",
            },
            0
          )
          .to(
            ".page3photosContainer",
            {
              autoAlpha: 0,
              duration: 0.5,
            },
            0
          );
        return tl;
      }
      function hideInfo3() {
        let tl = gsap
          .timeline()
          .to(
            ".page3descriptionContainer",
            {
              autoAlpha: 0,
              overwrite: true,
              // y: '-=5px',
              // stagger: 0.2,
              duration: 0.5,
            },
            0
          )
          .to(
            ".page3photosContainer",
            {
              autoAlpha: 0,
              duration: 0.5,
            },
            0
          );
        // .to('.birds',{
        //   opacity:0,
        //   duration:0.5,
        // },0)
        return tl;
      }
      function scrubPage4() {
        let tl = gsap
          .timeline({ ease: "power1.out" })
          .to(
            ".page4Inner",
            {
              y: mobile ? "-10lvh" : "-5vh",
              duration: 1.6,
              ease: "none",
            },
            0
          )
          .to(
            ".svgKakje",
            {
              y: mobile ? "-10lvh" : "-5vh",
              yPercent: -100, //
              duration: 1.6,
              ease: "none",
            },
            0
          );
        return tl;
      }
      // ============================= page5 =============================
      function showPage5() {
        let tl = gsap
          .timeline()
          // .to(['.svgPage2'],
          //   {
          //     duration: 1,
          //     y: `-${(1) * svgHeight + svgTop - svgScrubAmount - (screenHeight)}px`, //ABS
          //   }, 0)
          .to(
            [".page5"],
            {
              y: "-30vh",
              opacity: 1,
              duration: 2,
              ease: "ease.out",
            },
            0
          )
          .to(
            ".svgMilo",
            {
              y: "-30vh",
              autoAlpha: 1,
              duration: 2,
              ease: "ease.out",
            },
            0
          );

        return tl;
      }
      function showInfo5() {
        let tl = gsap.timeline().to(
          ".page5description",
          {
            autoAlpha: 1,
            y: "-=5px",
            stagger: 0.2,
            duration: 1,
          },
          0
        );
        return tl;
      }
      function hidePage4() {
        let tl = gsap
          .timeline()
          // { y: '-10vh' },
          .to(
            ".page4Inner",
            {
              opacity: 0,
              duration: 0.7,
              ease: "power.out",
              // ease: 'ease.in'
            },
            0
          )
          .to(
            ".svgKakje",
            {
              opacity: 0,
              duration: 0.7,
              ease: "power.out",
              // ease: 'ease.in'
            },
            0
          );

        return tl;
      }
      function hideInfo4() {
        let tl = gsap.timeline().to(
          ".page4descriptionContainer",
          {
            autoAlpha: 0,
            // y: '-=5px',
            // stagger: 0.2,
            duration: 0.5,
          },
          0
        );
        // .to('.page4photosContainer', {
        //   autoAlpha: 0,
        //   duration: 0.5,
        // }, 0)
        return tl;
      }
      function scrubPage5() {
        let tl = gsap
          .timeline({ ease: "power1.out" })
          .to(
            ".page5Inner",
            {
              y: mobile ? "-10lvh" : "-5vh",
              duration: mobile ? 145 : 159,
              ease: "none",
            },
            0
          )
          .to(
            ".page5MiloSvg",
            {
              y: mobile ? "-10lvh" : "-5vh",
              duration: mobile ? 145 : 159,
              ease: "none",
            },
            0
          )
          .to(
            ".svgMilo",
            {
              opacity: 1,
              duration: 5,
              ease: "none",
            },
            0
          );
        return tl;
      }
      // screenAnimation
      function scrubScreen1() {
        if (mobile) {
          return gsap.timeline();
        }
        let tl = gsap.timeline().to(
          "#movingScreensInner",
          {
            yPercent: -3,
            duration: 1,
            ease: "expo.inout",
            // overwrite: false,
          },
          0
        );
        return tl;
      }
      //screenAnimation
      function moveScreen1() {
        if (mobile) {
          return gsap.timeline();
        }
        let tl = gsap.timeline().to(
          "#movingScreens",
          {
            yPercent: -17.2 + 3 * 1 + 3 * 1,
            duration: 0.3,
            overwrite: false,
            // ease:'elastic.out(1, 0.5)'
          },
          0
        );

        return tl;
      }
      //screenAnimation
      function scrubScreen2() {
        if (mobile) {
          return gsap.timeline();
        }
        let tl = gsap.timeline().to(
          "#movingScreensInner",
          {
            yPercent: -3 * 2 - 3,
            duration: 6.3,
            ease: "expo.inout",
            // overwrite: false,
          },
          0
        );
        return tl;
      }
      //screenAnimation
      function moveScreen2() {
        if (mobile) {
          return gsap.timeline();
        }
        let tl = gsap.timeline().to(
          "#movingScreens",
          {
            yPercent: -17.2 - 17.2 + 3 * 2 + 3 * 2,
            duration: 0.3,
            overwrite: false,
            // ease:'elastic.out(1, 0.5)'
          },
          0
        );
        return tl;
      }
      //screenAnimation
      function scrubScreen3() {
        if (mobile) {
          return gsap.timeline();
        }
        let tl = gsap.timeline().to(
          "#movingScreensInner",
          {
            yPercent: -3 * 3 - 3 * 2,
            duration: 2,
            ease: "expo.inout",
            // overwrite: false,
          },
          0
        );
        return tl;
      }
      //screenAnimation
      function moveScreen3() {
        if (mobile) {
          return gsap.timeline();
        }
        let tl = gsap.timeline().to(
          "#movingScreens",
          {
            yPercent: -17.2 * 3 + 3 * 3 + 3 * 3,
            duration: 0.3,
            overwrite: false,
            // ease:'elastic.out(1, 0.5)'
          },
          0
        );
        return tl;
      }
      //screenAnimation
      function scrubScreen4() {
        if (mobile) {
          return gsap.timeline();
        }
        let tl = gsap.timeline().to(
          "#movingScreensInner",
          {
            yPercent: -3 * 4 - 3 * 3,
            duration: 100,
            ease: "expo.inout",
            // overwrite: false,
          },
          0
        );
        return tl;
      }
      //screenAnimation
      function moveScreen4() {
        if (mobile) {
          return gsap.timeline();
        }
        let tl = gsap.timeline().to(
          "#movingScreens",
          {
            yPercent: -17.2 * 4 + 3 * 4 + 3 * 4,
            duration: 0.3,
            overwrite: false,
            // ease:'elastic.out(1, 0.5)'
          },
          0
        );
        return tl;
      }
      //screenAnimation
      function scrubScreen5() {
        if (mobile) {
          return gsap.timeline();
        }
        let tl = gsap.timeline().to(
          "#movingScreensInner",
          {
            yPercent: -3 * 5 - 3 * 4,
            duration: 1.6,
            ease: "expo.inout",
            // overwrite: false,
          },
          0
        );
        return tl;
      }
      //screenAnimation
      function moveScreen5() {
        if (mobile) {
          return gsap.timeline();
        }
        let tl = gsap.timeline().to(
          "#movingScreens",
          {
            yPercent: -17.2 * 5 + 3 * 5 + 3 * 4,
            duration: 0.3,
            overwrite: false,
            // ease:'elastic.out(1, 0.5)'
          },
          0
        );
        return tl;
      }
      //screenAnimation
      function scrubScreen6() {
        if (mobile) {
          return gsap.timeline();
        }
        let tl = gsap.timeline().to(
          "#movingScreensInner",
          {
            yPercent: -3 * 6 - 3 * 4,
            duration: mobile ? 145 : 159,
            ease: "expo.inout",
            // overwrite: false,
          },
          0
        );
        return tl;
      }

      // .add(introText(), 0)
      let transition1 = showPage1().paused(true).add(hideIntro(), 0).add(showInfo1(), 1).add(moveScreen1(), 0).progress(0);
      // setTransitionTl1(transition1);
      transitionTl1Ref.current = transition1;
      ScrollTrigger.create({
        start: `bottom bottom-=${0.81 * screenHeight}`,
        end: `bottom bottom-=${0.81 * screenHeight}`,
        invalidateOnRefresh: false,
        toggleActions: "play none reverse none",
        preventOverlaps: true,
        markers: false,
        onEnter: () =>
          gsap.to(transition1, {
            id: "transition1In",
            overwrite: true,
            progress: 1,
            duration: 5,
            ease: "power1.out",
          }),
        onLeaveBack: () =>
          gsap.to(transition1, {
            id: "transition1Out",
            overwrite: true,
            progress: 0,
            duration: 1,
            ease: "ease.out",
            onStart: () => gsap.getById("transition3Out")?.progress(1),
          }),
      });

      let transition2 = showPage2().paused(true).add(hidePage1(), 0).add(hideInfo1(), 0).add(showInfo2(), 1.9).add(moveScreen2(), 0).progress(0);
      // setTransitionTl2(transition2);
      transitionTl2Ref.current = transition2;

      ScrollTrigger.create({
        start: () => `bottom+=${1 * screenHeight} bottom-=${0.81 * screenHeight}`,
        // end: (self)=>self.start,
        end: () => `bottom+=${1 * screenHeight} bottom-=${0.81 * screenHeight}`,
        invalidateOnRefresh: false,
        toggleActions: "play none reverse none",
        preventOverlaps: true,
        markers: false,
        onEnter: () =>
          gsap.to(transition2, {
            id: "transition2In",
            overwrite: true,
            progress: 1,
            duration: 5,
            ease: "power1.out",
          }),
        onLeaveBack: () =>
          gsap.to(transition2, {
            id: "transition2Out",
            overwrite: true,
            progress: 0,
            duration: 1,
            ease: "ease.out",
            onStart: () => gsap.getById("transition4Out")?.progress(1),
          }),
      });

      let transition3 = showPage3().paused(true).add(hidePage2(), 0).add(hideInfo2(), 0).add(showInfo3(), 4).add(moveScreen3(), 0).progress(0);
      // setTransitionTl3(transition3);
      transitionTl3Ref.current = transition3;

      ScrollTrigger.create({
        start: `bottom+=${2 * screenHeight} bottom-=${0.81 * screenHeight}`,
        end: `bottom+=${2 * screenHeight} bottom-=${0.81 * screenHeight}`,
        invalidateOnRefresh: false,
        toggleActions: "play none reverse none",
        preventOverlaps: true,
        markers: false,
        onEnter: () => {
          gsap.to(transition3, {
            id: "transition3In",
            overwrite: true,
            progress: 1,
            duration: mobile ? 6 : 4,
            ease: "power1.out",
            onStart: () => gsap.getById("transition1In")?.progress(1),
          });

          // gsap.getById('transition1In')?.progress(1)
          // console.log(gsap.getById('transition1In')?.progress())
        },
        onLeaveBack: () =>
          gsap.to(transition3, {
            id: "transition3Out",
            overwrite: true,
            progress: 0,
            duration: 1,
            ease: "ease.out",
            onStart: () => gsap.getById("transition5Out")?.progress(1),
          }),
      });

      let transition4 = showPage4().paused(true).add(hidePage3(), 0).add(hideInfo3(), 0).add(showInfo4(), 1).add(moveScreen4(), 0).progress(0);
      // setTransitionTl4(transition4);
      transitionTl4Ref.current = transition4;

      ScrollTrigger.create({
        start: `bottom+=${3 * screenHeight} bottom-=${0.81 * screenHeight}`,
        end: `bottom+=${3 * screenHeight} bottom-=${0.81 * screenHeight}`,
        invalidateOnRefresh: false,
        toggleActions: "play none reverse none",
        preventOverlaps: true,
        markers: false,
        onEnter: () => {
          gsap.to(transition4, {
            id: "transition4In",
            overwrite: true,
            progress: 1,
            duration: 4,
            ease: "power1.out",
            onStart: () => gsap.getById("transition2In")?.progress(1),
          });
        },
        onLeaveBack: () =>
          gsap.to(transition4, {
            id: "transition4Out",
            overwrite: true,
            progress: 0,
            duration: 1,
            ease: "ease.out",
          }),
      });

      let transition5 = showPage5().paused(true).add(hidePage4(), 0).add(hideInfo4(), 0).add(showInfo5(), 1).add(moveScreen5(), 0).progress(0);
      // setTransitionTl5(transition5);
      transitionTl5Ref.current = transition5;

      ScrollTrigger.create({
        start: () => `bottom+=${4 * screenHeight} bottom-=${0.81 * screenHeight}`,
        end: () => `bottom+=${4 * screenHeight} bottom-=${0.81 * screenHeight}`,
        invalidateOnRefresh: false,
        toggleActions: "play none reverse none",
        preventOverlaps: true,
        markers: false,
        id: "page5",
        onEnter: () =>
          gsap.to(transition5, {
            id: "transition5In",
            overwrite: true,
            progress: 1,
            duration: 4,
            ease: "power1.out",
            onStart: () => gsap.getById("transition3In")?.progress(1),
          }),
        onLeaveBack: () =>
          gsap.to(transition5, {
            id: "transition5Out",
            overwrite: true,
            progress: 0,
            duration: 1,
            ease: "ease.out",
          }),
      });

      let animation0 = scrubIntro().add(scrubScreen1(), 0).paused(true).progress(0);
      // setScrubTl0(animation0);
      scrubTl0Ref.current = animation0;
      gsap.to(
        animation0,
        // {progress:0},
        {
          progress: 1,
          // ease:'ease.out',
          ease: "none",
          scrollTrigger: {
            id: "starScrub",
            start: () => "bottom bottom",
            end: () => `+=${0.79 * screenHeight}px`,
            scrub: 1,
            markers: false,
            invalidateOnRefresh: false,
            overwrite: true,
            // preventOverlaps: true,
          },
          onStart: () => {
            gsap.getById("scrollDown")?.pause();
          },
        }
      );

      let animation1 = scrubPage1().add(scrubScreen2(), 0).paused(true).progress(0);
      // setScrubTl1(animation1);
      scrubTl1Ref.current = animation1;
      gsap.to(animation1, {
        progress: 1,
        ease: "none",
        id: "moonScrubTlId",
        scrollTrigger: {
          id: "moonScrub",
          start: () => `bottom+=${0.9 * screenHeight} bottom`,
          end: () => `+=${0.85 * screenHeight}px`,
          scrub: 1,
          markers: false,
          invalidateOnRefresh: false,
          overwrite: true,
          // preventOverlaps: true,
        },
      });

      let animation2 = scrubPage2().add(scrubScreen3(), 0).paused(true).progress(0);
      // setScrubTl2(animation2);
      scrubTl2Ref.current = animation2;
      gsap.to(animation2, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          id: "animalScrub",
          start: () => `bottom+=${1.9 * screenHeight} bottom`,
          end: () => `+=${0.85 * screenHeight}px`,
          scrub: 1,
          markers: false,
          invalidateOnRefresh: false,
          overwrite: true,
          // preventOverlaps: true,
        },
      });

      let animation3 = scrubPage3().add(scrubScreen4(), 0).paused(true).progress(0);
      // setScrubTl3(animation3);
      scrubTl3Ref.current = animation3;
      gsap.to(animation3, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          id: "kakScrub",
          start: () => `bottom+=${2.9 * screenHeight} bottom`,
          end: () => `+=${0.85 * screenHeight}px`,
          scrub: 1,
          markers: false,
          invalidateOnRefresh: false,
          overwrite: true,
          // preventOverlaps: true,
        },
      });

      let animation4 = scrubPage4().add(scrubScreen5(), 0).paused(true).progress(0);
      // setScrubTl4(animation4);
      scrubTl4Ref.current = animation4;
      gsap.to(animation4, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          id: "studioScrub",
          start: () => `bottom+=${3.9 * screenHeight} bottom`,
          end: () => `+=${0.85 * screenHeight}px`,
          scrub: 1,
          markers: false,
          invalidateOnRefresh: false,
          overwrite: true,
          // preventOverlaps: true,
        },
      });

      let animation5 = scrubPage5().add(scrubScreen6(), 0).paused(true).progress(0);
      // setScrubTl5(animation5);
      scrubTl5Ref.current = animation5;
      gsap.to(animation5, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          id: "finalScrub",
          start: () => `bottom+=${4.9 * screenHeight} bottom`,
          // end: () => `+=${0.85 * screenHeight}px`,
          end: () => `+=${1.1 * screenHeight}px`,
          // end: () => `+=${1 * screenHeight}px`,
          scrub: 1,
          markers: false,
          invalidateOnRefresh: false,
          overwrite: true,
          // preventOverlaps: true,
        },
      });
      // .add(introText(), 0)
      let newAnimationTl = introTextAnimation().paused(true);
      // setIntroAnimationTl(newAnimationTl);
      introAnimationTlRef.current = newAnimationTl;

      // setScrubTl0(tl1());
    });
    return () => {
      ctx.revert();
    };
  }, [screenWidth]);
  // screenHeight, ,svgTop ,
  // useEffect(() => {

  // }
  // }, [scrolled])

  useEffect(() => {
    // introAnimationTl && introAnimationTl.paused(!pageLoaded)
    introAnimationTlRef?.current && introAnimationTlRef.current.paused(!pageLoaded);
  }, [pageLoaded]);

  // useEffect(() => {
  // console.log(transitionTl1?.progress())
  // }, [transitionTl1?.progress()])

  return (
    <>
      <Head>
        <title>Milo Weiler Photography | My Fantastic Four</title>
        <meta name="description" content=" " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <ReactLenis root options={{ duration: 0.9, wheelMultiplier: 0.9 }}> */}
      {/* style={{ height: heightToScroll + 'px' }} */}
      {/* 
  id='viewport'

      body, html {
  height: 100vh;
  width: 100vw;
  overscroll-behavior: none;
  overflow: hidden !important;
  } 
  #viewport {
position: fixed;
overflow-x: hidden;
overflow-y: scroll;
height: 100vh;
width: 100vw;
-webkit-overscroll-behavior: none;
overscroll-behavior: none;
-webkit-overflow-scrolling: touch;
}
  */}
      {/* onTouchEnd={(e)=>e.preventDefault()} */}
      <main style={{ height: !pageLoaded ? "100vh" : mobile ? "700vh" : "700vh" }} className={`w-full mainBackground dark-scrollbar relative bg-black `}>
        <PageWrapper
          darkMode={true}
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          // svgWidth={""}
          // finished={false}
          mobile={mobile}>
          <SplashScreen pageLoaded={pageLoaded} />

          {/* <div className={'fixedColor fixed top-0 opacity-100 bg-red-500 w-full h-full'}/> */}
          {mobile ? (
            <Background
              type="top"
              amount={10}
              src="/images/miloMobile.png"
              height="h-[115vh]"
              objectPosition={"object-center"}
              animationName={"page5"}
              className={"opacity-0 top-[25vh] "}
            />
          ) : (
            <BackgroundSplit type="top" amount={10} src1="/images/milo.jpg" height="h-[115vh]" animationName={"page5"} className={"opacity-0 top-[25vh]"} />
          )}
          <BackgroundSplit
            type="both"
            amount={10}
            src1="/images/mainpageStudio1Cut.png"
            src2="/images/mainpageStudio2Cut.png"
            height="h-[115vh]"
            animationName={"page4"}
            className={"opacity-0 top-[25vh]"}
          />
          <Background type="both" amount={10} src="/images/mainpageArt.jpg" height="h-[115vh]" animationName={"page3"} className={"opacity-0 top-[5vh]"} />
          {/*h-100vh no specification needed   */}
          <Background type="both" amount={0} src={artImages[0].image?.asset.url} animationName={"artPhoto0"} className={"opacity-0"} />
          {/* <Background type='both' amount={0} src='/images/mainpageArt1.jpg' animationName={'artPhoto0'} className={'opacity-0'} /> */}
          <Background type="both" amount={0} src={artImages[1].image?.asset.url} animationName={"artPhoto1"} className={"opacity-0"} />
          <Background type="both" amount={0} src={artImages[2].image?.asset.url} animationName={"artPhoto2"} className={"opacity-0"} />

          <Background type="both" amount={10} src="/images/mainpageDocu.jpg" height="h-[115vh]" animationName={"page2"} className={"opacity-0 top-[25vh]"} />
          <Background type="both" amount={10} src="/images/mainpageMoon.jpg" height="h-[110vh]" animationName={"page1"} className={"opacity-0 top-[30vh]"} />
          <Background type="bottom" amount={50} src="/images/mainpageStarsCut.jpg" height="h-[50vh]" animationName={"page1stars"} className={"opacity-50 top-[-10vh]"} />
          {/* {console.log(mainImages[0].image)} */}
          <BackgroundMain setPageLoaded={setPageLoaded} type="bottom" priority amount={40} projects={projects} height="h-[110vh]" animationName={"pageIntro"} className={"top-0"} />
          {/* <Background setPageLoaded={setPageLoaded} type='bottom' priority amount={40} src='/images/mainpageStars.jpg' height='h-[110vh]' animationName={'pageIntro'} className={'top-0'} /> */}

          {/* LEGS */}
          {/* 265px */}

          <div className="page1feetContainer visible opacity-100">
            <Image
              // style={{ 'maskImage': `linear-gradient(to bottom, transparent, black ${50}%, black ${100}%)`, 'maskSize': '100% 100%', 'WebkitMaskImage': `linear-gradient(to bottom, transparent, black ${50}%, black ${100}%)`, 'maskPosition': '0 0', 'maskRepeat': 'no-repeat', }}
              alt=""
              src="/images/mainpageMoonFeet.png"
              width="265"
              height="366"
              className={`${
                scrolled < 0.35 ? "will-change-transform" : ""
              } page1feet invisible opacity-0 select-none h-auto w-[44vw] md:w-[17.27vw] right-[11vw] md:right-[6.48vw] -translate-y-[23%] top-[50lvh] fixed`}
              sizes="(max-width: 648px) 60vw, 25vw"
            />
          </div>

          {/* <section style={{ height: svgHeight ? svgHeight + 'px' : '150vh', transform: 'translate3d(-50%,0,0)', top: `calc(50% - ${(mobile ? 0.0596 : 0.043) * svgHeight}px)` }} className='svgPage2 flex w-[115.86vw] left-1/2 mx-auto fixed' >
            <div className='svgPage2Inner w-full h-full relative top-0 '>
              <Story0Logo id={'referenceSvg'} introAnimationTl={introAnimationTl} speed={1} scrollMin={0} scrollMax={0.15} />
              <Story1Moon  scrubTl0={scrubTl0} scrubTl1={scrubTl1} transitionTl={transitionTl1} />
              <Story2Waves  scrubTl={scrubTl2} transitionTl={transitionTl2} />
              <Story3Animals id={'referenceSvg'} scrubTl={scrubTl3} transitionTl={transitionTl3} />
              </div>
            </section> */}

          <Page3Animals
            style={{ top: `calc(90lvh)`, transform: "translate3d(-50%,0,0)" }}
            animationName={"page3AnimalsSvg"}
            className={`w-[115.86vw] fixed left-1/2 ${scrolled > 0.44 && scrolled < 0.7 ? "will-change-transform" : ""}`}
            scrubTl={scrubTl3Ref.current}
            transitionTl={transitionTl3Ref.current}
          />
          <Page2Waves
            scrubTl={scrubTl2Ref.current}
            transitionTl={transitionTl2Ref.current}
            style={{}}
            animationName={"page2WavesSvg"}
            className={`w-[115.86vw] fixed top-[50lvh] md:top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}
          />
          <Page1Moon
            style={{ transform: "translate3d(-50%,0,0)" }}
            animationName="page1MoonSvg"
            className={"flex w-[115.86vw] left-1/2  fixed"}
            scrubTl0={scrubTl0Ref.current}
            scrubTl1={scrubTl1Ref.current}
            transitionTl={transitionTl1Ref.current}
          />
          <Page0Logo
            style={{ transform: "translate3d(-50%,-46.5%,0)" }}
            className={"introSvg flex w-[115.86vw] left-1/2 top-[50lvh] md:top-1/2  fixed"}
            introAnimationTl={introAnimationTlRef.current}
          />

          {mobile && <FadeDiv type={"top"} amount={80} className={`fixed page5description bottom-[-5px] w-full h-[80lvh] invisible opacity-0 bg-darkPrimary/80 `} />}
          <Page5Milo className={`w-[115.86vw]`} scrubTl={scrubTl5Ref.current} />
          {/* info={{ title: '', text: "I invite you to visit my gallery and experience the magic of my photography. From behind-the-scenes captures to fine art masterpieces, my images will leave you in awe. If you're interested in purchasing prints or working with me on a project, I'd be thrilled to hear from you. Let's capture the beauty of life together." }} */}
          <PageDescription5
            info={sectionInfo.filter((section) => section._id === "mainPageOUT")[0]}
            transitionTl={transitionTl5Ref.current}
            animateName="page5description"
            className={``}
          />

          <Page4Kakje scrubTl={scrubTl4Ref.current} transitionTl={transitionTl4Ref.current} />
          {/* info={{ title: 'Studio', text: 'With my Studio Photography, I aim for precision and beauty in every planned shot. I use my keen eye for detail and passion for perfection to create bold, striking, and unforgettable images that capture the essence of my subject.' }}  */}
          <PageDescription4
            info={sectionInfo.filter((section) => section._id === "mainPageSTU")[0]}
            shadow={!mobile}
            animateName="page4description"
            className={`text-center bottom-[5%] md:bottom-auto md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-0 md:-translate-y-1/2`}
          />

          <Page3Photos images={artImages} />
          <Page3KakScrub scrubTl={scrubTl3Ref.current} />
          {/* info={{ title: 'Fine Art', text: 'In my Fine Art Photography, I combine planned studio shots and improvisational timing in the outdoors to create a world of artistry that evokes emotion and inspires imagination. From conceptual pieces to ethereal portraits, I showcase the beauty of Experience and the power of creativity.' }}  */}
          <PageDescription
            info={sectionInfo.filter((section) => section._id === "mainPageFIN")[0]}
            shadow={!mobile}
            animateName="page3description"
            className={`text-left bottom-4 md:bottom-12 lg:bottom-16 left-4 md:left-12 lg:left-16`}
          />

          <Page2Photos projects={projects.filter((project) => project.cat === "docu")} />
          {/* info={{ title: 'Documentary', text: 'Through my Documentary photography, I invite you to step into the real world and witness the beauty and complexity of everyday life. My images capture the raw, unscripted moments that make up our human experience, bringing to life the emotions and stories of those who are often overlooked.' }}  */}
          <PageDescription
            info={sectionInfo.filter((section) => section._id === "mainPageDOC")[0]}
            shadow={!mobile}
            animateName="page2description"
            className={`text-right top-14 md:top-16 lg:top-14 right-4 md:right-16 lg:right-12`}
          />

          {/* -73.7% */}
          <Page1Photos timeline={scrubTl1Ref.current} projects={projects.filter((project) => project.cat === "bts")} />
          {/* info={{ title: 'Behind The Scenes', text: 'With my Behind The Scenes Photography, I capture the moments that make every production unique, from planning to final take. I reveal the dedication and creativity that goes into bringing a vision to life, leaving you in awe of the process.' }}  */}
          <PageDescription
            info={sectionInfo.filter((section) => section._id === "mainPageBTS")[0]}
            shadow={!mobile}
            animateName="page1description"
            className={`text-left top-4 md:top-16 lg:top-14 left-4 md:left-16 lg:left-12`}
          />

          <StoryTitle shadow={!mobile} scrubTl={scrubTl0Ref.current} ctx={titleCtx} />
          <ScrollDown
            style={{ transform: "translate3d(-50%,0,0)" }}
            className={"scrollDownSvg flex flex-col items-center left-2/3 md:left-1/2 bottom-[20lvh] mobm:bottom-[30lvh] sm:bottom-[10lvh] fixed cursor-pointer"}
            ctx={titleCtx}
          />

          {mobile ? (
            <></>
          ) : (
            <PageIndicator className={`fixed top-1/2 right-full md:right-2 translate-x-full md:translate-x-0 -translate-y-1/2 md:top-full md:-translate-y-[80%]`} />
          )}

          {/* <ScrollDown /> */}
          {/* <section className='svgPage2 flex w-[115.86vw] left-1/2 -translate-x-1/2 h-screen mx-auto fixed top-[calc(50%-200px)] ' > */}
          {/* <Story2Moon speed={1} scrollMin={0} scrollMax={0} /> */}
          {/* </section> */}
          {mobile ? <NavigationMobile /> : <Navigation />}
        </PageWrapper>
        {/* <ScrollVisual /> */}
        {/* {mobile ? <MobileScrollbar className={'bg-primary '} /> : <></>} */}
      </main>
      {/* </ReactLenis> */}
    </>
  );
}

export async function getStaticProps() {
  const projects = await client.fetch(
    `*[_type == "project"]|order(date desc){title, cat, otherImages[]{_key,_type, asset->{url,metadata{dimensions}}, ...asset{_ref}}, mainImage{alt,image{asset->{url}, ...asset{_ref}}}, slug}`
  );
  // const projects = await client.fetch(`*[_type == "project"][cat == "bts" || cat == "docu" || cat == "art" ]|order(date desc){title, cat, otherImages[]{_key,_type, asset->{url,metadata{dimensions}}, ...asset{_ref}}, mainImage{alt,image{asset->{url}, ...asset{_ref}}}, slug}`);
  const sectionInfo = await client.fetch(`*[_type == "mainPageXXX" || _type == "mainPageYYY"]`);
  // const sectionInfoMilo = await client.fetch(`*[]`)
  return {
    props: { projects: projects, sectionInfo: sectionInfo },
  };
}

