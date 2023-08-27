import React, { useState, useEffect } from "react"
// import { useDimensions } from "@/utils/useDimensions"
import { useAppContext } from "@utils/appContext.js"
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



export default function Page5Milo({ scrubTl }) {

  let { locale, scrolled, width, height } = useAppContext()
  let [refresh, setRefresh] = useState(0)
  let { mobile } = usePageContext()
  // const ctx = useRef(gsap.context(() => { }));
  let [myPosition, setMyPosition] = useState({ x: 0.73, y: 0.34 })


  // let letterTween =
  // {
  //   timeline: scrubTl,
  //   ratio: 1,
  //   attr: {
  //     duration: 100,
  //     // ease: 'ease.inout',
  //     // onStart:()=>{console.log('start One')} 
  //   },
  //   position: 0
  // }


  // useEffect(() => {
  //   transitionTl && transitionTl
  //     .to('.svgMilo',{

  //     })
  // }, [transitionTl])

  useEffect(() => {
    setRefresh((n) => n + 1)
  }, [scrubTl])

  let colorPrimary = "#FFF5EA";
  // let n = 0;

  // let letters = [
  //   <path key={0}  id="m2" d="M1499 123.257C1498.81 121.047 1499 98.9671 1491.81 99.7271C1486.06 100.327 1485.67 110.407 1486.19 115.367C1485.35 109.247 1482.61 97.0073 1478.37 97.0073C1473.07 97.0073 1468.59 115.688 1473.45 127.168C1471.45 121.668 1458.7 113.968 1445.5 127.168C1431.85 142.29 1425 131.078 1408 127.168C1381 120.957 1381.5 135.636 1350 143C1325.37 148.759 1293 136 1231.5 140.5C1170 145 1110.71 165.74 1048.5 115.367C1000.5 76.5 965.859 104.216 930 124C904.802 137.902 854.99 146.675 814 138.5C778.463 131.413 750.923 109.628 735 91.5005C711.394 64.6264 671.5 62.4998 653.5 81.4996C645.921 89.5 649.816 101.565 657 103C664.017 104.401 676.111 91.7227 668.5 76.5C658 55.5 620.5 74.7348 602 59.4999C588.5 48.3825 590.5 27.9997 604.5 29.9998C617.074 31.7961 620.235 56.9997 598.5 67.8673C582.378 75.9281 569.736 71.1382 564 81.4996C554.747 98.2144 564 113 549 121C535.617 128.137 515.424 114.088 482.5 113C449.862 111.921 429.392 127.961 435 134.727C446 148 473.5 110.727 435 99.7272C396.5 88.7272 388.725 115.925 338.5 115.367C288.275 114.809 293.5 56.0148 230.5 81.4996C171.5 105.366 92.5 61.0003 -36.5 62.0001" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>,
  //   <path key={1}  id="i" d="M1504.46 115.667C1504.81 119.957 1504.99 121.747 1505.03 122.107" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>,
  //   <path key={2}  id="ib" d="M1502 102.357C1502.06 102.607 1502.38 102.867 1502.32 102.987" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>,
  //   <path key={3}  id="l" d="M1508.25 95.2266C1509.63 104.317 1510.83 116.997 1511.46 120.277" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>,
  //   <path key={4}  id="o" d="M1526.34 116.057C1525 120.317 1515.13 121.807 1517.31 113.917C1518.51 111.267 1520.59 109.917 1523.12 110.067C1526.67 110.277 1527.32 112.897 1526.34 116.057Z" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>,
  //   <path key={5}  id="w" d="M1546.65 94.2266C1535.1 121.987 1543.75 131.577 1548.73 122.807C1552.72 115.797 1552.54 114.507 1551.95 114.737C1551.66 117.667 1555.2 122.427 1561.35 119.277C1568.89 115.417 1570.18 98.2669 1561.35 93.0269" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>,
  //   <path key={6}  id="ei" d="M1568.73 113.286C1571.7 115.366 1575.93 110.316 1572.33 109.686C1568.73 109.056 1566.02 117.006 1572.33 118.516C1577.38 119.726 1580.83 114.857 1581.92 112.277C1582.34 113.767 1583.9 116.547 1585.01 117.257" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>,
  //   <path key={7}  id="ei2" d="M1579.71 102.427C1580.57 103.287 1581.12 103.337 1581.29 103.247" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>,
  //   <path key={8}  id="l2" d="M1583.05 88.6768C1584.62 104.527 1588 112.647 1589.49 114.737" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>,
  //   <path key={9}  id="er" d="M1593.28 113.287C1600.02 110.887 1597.81 106.677 1595.5 107.677C1590.78 109.717 1592.81 115.867 1597.5 115.677C1603 115.177 1604 109.677 1603 107.677C1602 105.677 1605 112.677 1605 115.177C1605 115.177 1604.39 105.427 1613 109.177" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>,
  //   <path key={10} id="punt" d="M1619.29 114.987V114.977" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>,
  // ]

  let letters = [
    <path key={0} id="m2" d="M1499 96.2573C1498.81 94.0473 1499 71.9671 1491.81 72.7271C1486.06 73.3271 1485.67 83.4072 1486.19 88.3672C1485.35 82.2472 1482.61 70.0073 1478.37 70.0073C1473.07 70.0073 1468.59 88.6875 1473.45 100.168C1471.45 94.6675 1458.7 86.9675 1445.5 100.168C1431.85 115.29 1425 104.078 1408 100.168C1381 93.9571 1381.5 108.636 1350 116C1325.37 121.759 1263.5 97.1675 1222.5 100.168C1181.5 103.168 1140.21 120.373 1078 70.0004C1030 31.1332 1000.36 22.5828 964.5 42.3669C905 75.1945 879.288 -11.0427 840.5 4.50014C785.034 26.726 816 164.5 655 184.5" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={1} id="i" d="M1504.46 88.9902C1504.81 93.2802 1504.99 95.0702 1505.03 95.4302" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={2} id="ib" d="M1502 75.6802C1502.06 75.9302 1502.38 76.1901 1502.32 76.3101" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={3} id="l" d="M1508.25 68.5498C1509.63 77.6398 1510.83 90.3201 1511.46 93.6001" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={4} id="o" d="M1526.34 89.3799C1525 93.6399 1515.13 95.1303 1517.31 87.2403C1518.51 84.5903 1520.59 83.2402 1523.12 83.3902C1526.67 83.6002 1527.32 86.2199 1526.34 89.3799Z" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={5} id="w" d="M1546.65 67.5498C1535.1 95.3098 1543.75 104.9 1548.73 96.1299C1552.72 89.1199 1552.54 87.8301 1551.95 88.0601C1551.66 90.9901 1555.2 95.7501 1561.35 92.6001C1568.89 88.7401 1570.18 71.5901 1561.35 66.3501" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={6} id="ei" d="M1568.73 86.6097C1571.7 88.6897 1575.93 83.6396 1572.33 83.0096C1568.73 82.3796 1566.02 90.3297 1572.33 91.8397C1577.38 93.0497 1580.83 88.1799 1581.92 85.5999C1582.34 87.0899 1583.9 89.8699 1585.01 90.5799" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={7} id="ei2" d="M1579.71 75.75C1580.57 76.61 1581.12 76.6598 1581.29 76.5698" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={8} id="l2" d="M1583.05 62C1584.62 77.85 1588 85.9701 1589.49 88.0601" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={9} id="er" d="M1593.28 86.61C1600.02 84.21 1597.81 80.0002 1595.5 81.0002C1590.78 83.0402 1592.81 89.1902 1597.5 89.0002C1603 88.5002 1604 83.0002 1603 81.0002C1602 79.0002 1605 86.0002 1605 88.5002C1605 88.5002 1604.39 78.7502 1613 82.5002" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={10} id="punt" d="M1619.29 88.3101V88.2998" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
  ]

  let lettersMobile = [
    <path key={0} id="m2" d="M1.5 131.779C68 131.779 17.2761 5.22355 63 1.79285C93.5 -0.49559 108.89 72.5 102 97.0053C98.9072 108.006 89.4544 110.008 85 104.505C78 95.8583 95 71.5053 130 73.5053C177 76.1911 160 163.053 209.5 140.781C223.96 134.275 233.817 126.056 247.5 131.779C262.867 138.206 281.207 166.963 304.463 166.963C299.603 155.483 304.083 136.803 309.383 136.803C313.623 136.803 316.363 149.043 317.203 155.163C316.683 150.203 317.073 140.123 322.823 139.523C330.013 138.763 329.823 160.843 330.013 163.053" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={1} id="i" d="M335.973 155.26C336.323 159.55 336.503 161.34 336.543 161.7" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={2} id="ib" d="M333.513 141.95C333.573 142.2 333.893 142.46 333.833 142.58" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={3} id="l" d="M339.763 134.82C341.143 143.91 342.343 156.59 342.973 159.87" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={4} id="o" d="M357.853 155.65C356.513 159.91 346.643 161.4 348.823 153.51C350.023 150.86 352.103 149.51 354.633 149.66C358.183 149.87 358.833 152.49 357.853 155.65Z" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={5} id="w" d="M378.162 133.819C366.612 161.579 375.262 171.169 380.242 162.399C384.232 155.389 384.052 154.1 383.462 154.33C383.172 157.26 386.712 162.02 392.862 158.87C400.402 155.01 401.692 137.86 392.862 132.62" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={6} id="ei" d="M400.243 152.879C403.213 154.959 407.443 149.909 403.843 149.279C400.243 148.649 397.533 156.599 403.843 158.109C408.893 159.319 412.343 154.449 413.433 151.869C413.853 153.359 415.413 156.139 416.523 156.849" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={7} id="ei2" d="M411.223 142.02C412.083 142.88 412.633 142.93 412.803 142.84" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={8} id="l2" d="M414.562 128.27C416.133 144.12 419.512 152.24 421.002 154.33" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={9} id="er" d="M424.792 152.88C431.532 150.48 429.322 146.27 427.012 147.27C422.292 149.31 424.322 155.46 429.012 155.27C434.512 154.77 435.512 149.27 434.512 147.27C433.512 145.27 436.512 152.27 436.512 154.77C436.512 154.77 435.902 145.02 444.512 148.77" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
    <path key={10} id="punt" d="M450.802 154.58V154.57" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />,
  ]

  //==============X FROM CENTER, Y INVERSED FROM TOP============
  // let originalY = 0.630861
  // let originalY = mobile ? 1 - 0.38970 : 1 - 0.41
  let originalY = mobile ? 1 - 0.1 : 1 - 0.38
  // let originalY = mobile ? 1 - 0.1 : 0.745
  let originalX = mobile ? 0.65 : 0.74
  // let originalX = mobile ? 0.65 : 0.7362
  let r2 = mobile ? (434 / 816) : (618 / 816)
  let r1 = mobile ? (width / (height)) : (width / (height * 2))

  function getY() {
    if (r2 / r1 < 1) {
      return 1 - (originalY - (1 - r2 / r1) / 2) * r1 / r2
    } else return 1 - originalY
  }

  function getX() {
    if (r2 / r1 < 1) {
      return originalX
    } else {
      // console.log(r1)
      return (originalX - (1 - r1 / r2) / 2) * r2 / r1
    }
  }

  useEffect(() => {
    let newX = getX()
    let newY = getY()

    // console.log('oldPosition:', myPosition)
    // console.log(newX, newY)
    // console.log(Math.abs(newX - myPosition.x) / myPosition.x)
    if (mobile) {
      // console.log('oldPosition:',myPosition)
      // console.log(newX)
      if (Math.abs(newX - myPosition.x) / myPosition.x > 0.05 || Math.abs(newY - myPosition.y) / myPosition.y > 0.05) {
        setMyPosition({ x: newX, y: newY })
      }
      // else if (Math.abs(newY - myPosition.y) / myPosition.y > 0.05) {
      // setMyPosition(({ x, y }) => { return { x: x, y: newY } })
      // } 
      else { return }
    } else {
      setMyPosition({ x: newX, y: newY })
      // console.log(myPosition)
      // console.log({ x: getX(), y: getY() })
    }
  }, [width, height, scrubTl])
  //==============FROM CENTER============

  return (
    <div className={`page5MiloSvg fixed top-0 w-full h-full`}>
      {mobile
        ?
        <div className="svgMilo invisible opacity-0 fixed left-0 w-full h-full top-[30vh]">
          {/* w-[69.5vw] */}
          <svg style={{ left: `calc(100vw*${myPosition.x})`, top: `calc(30lvh + ${myPosition.y * 100}lvh)` }} className={`absolute  w-[40vw] h-auto  ${scrolled > 0.79 ? 'willChange-transform' : ''}`} width="171" height="199" viewBox="0 0 171 199" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="miloTekeningMobile1">
              <PathGSAPStandalone id="m1" d="M4.42798 1.34537C0.42798 1.34537 -0.0710441 36.8453 2.92895 36.8453C5.92895 36.8453 10.5561 3.84531 7.42809 3.84531C3.42809 3.84531 2.94609 33.8453 7.42809 33.8453C11.9111 33.8453 16.4292 8.34532 11.4292 8.34532C6.42925 8.34532 9.7002 23.8452 17.4296 23.8452C46.7002 26.8455 96.2237 25.3458 86.7002 5.84584C83.0374 -1.65401 67.9957 -2.49706 65.7002 18.3459C60.4138 66.346 110.493 68.5543 118.7 108.346C123.33 130.795 106.238 152.002 81.7002 137.845C63.7002 127.461 77.1058 108.845 90.2002 120.845C107.51 136.708 69.5845 187.909 102.7 196.845C135.816 205.781 132 147.5 169.5 147.5" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                tweens={[{
                  id: 'letterTweenMobile1',
                  timeline: scrubTl,
                  ratio: 1,
                  attr: {
                    duration: 40,
                    ease: 'none',
                    // onStart:()=>{console.log('start One')} 
                  },
                  position: 0,
                }]}
              />
            </g>
          </svg>
          <svg className={`absolute top-[106lvh] -translate-y-full right-[2vw] w-[105vw] h-auto ${scrolled > 0.79 ? 'willChange-transform' : ''}`} width="452" height="168" viewBox="0 0 452 168" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="miloTekeningMobile2">
              {lettersMobile.map((letter, i) => {
                // console.log(letter.props)
                return <PathGSAPStandalone {...letter.props} key={i} tweens={[{
                  id: 'letterTween' + i,
                  timeline: scrubTl,
                  ratio: 1,
                  attr: {
                    duration: i === 0 ? 70 : 4,
                    ease: 'none',
                  },
                  position: i === 0 ? 45 : (115 + 4 * (i - 1)),
                }]} />
              })}
            </g>
          </svg>
        </div>
        : <div className="svgMilo fixed left-0 w-full h-full top-[30vh]">
          <svg style={{ left: `calc(50vw*${myPosition.x})`, top: `calc(0vh + ${myPosition.y * 100}vh)` }} className={`absolute -translate-y-[89.5%] w-[69.5vw] h-auto  ${scrolled > 0.79 ? 'willChange-transform' : ''}`} width="1084" height="869" viewBox="0 0 1084 869" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g mask="url(#mask0_971_562)">
              <g id="miloTekening1">
                <PathGSAPStandalone id="m1" d="M4.42791 809.701C0.427905 809.701 -0.070996 845.202 2.929 845.202C5.929 845.202 10.5559 812.201 7.42791 812.201C3.42791 812.201 2.94591 842.202 7.42791 842.202C11.9109 842.202 16.429 816.701 11.429 816.701C6.429 816.701 9.00002 832.201 17.429 832.201C111.5 832.201 289.022 763.942 279 824.383C268.368 888.502 318.206 869.548 351.5 824.383C387.721 775.248 404.5 689.5 376 696.5C357.5 701.044 371.048 733.694 393.5 728C462.5 710.5 412.5 588 519.5 538.5C603.9 502.1 597.333 386 583.5 332.5C519.5 183.5 755 88.5 726.5 0" stroke="#FFF5EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  tweens={[{
                    id: 'letterTweenM1',
                    timeline: scrubTl,
                    ratio: 1,
                    attr: {
                      duration: 50,
                      ease: 'none',
                    },
                    position: 0,
                  }]}
                />
              </g>
            </g>
            <mask id="mask0_971_562" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="1084" height="869">
              <rect id="Rectangle 75" width="1084" height="869" fill="url(#paint0_linear_971_562)" />
            </mask>
            <defs>
              <linearGradient id="paint0_linear_971_562" x1="542" y1="0" x2="542" y2="869" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D9D9D9" stopOpacity="0" />
                <stop offset="0.234375" stopColor="#D9D9D9" />
              </linearGradient>
            </defs>
          </svg>




          {/* w-[115.86vw] top-[calc(100vh+0vh)]*/}
          <svg style={{}} className={`absolute w-[110vw] h-fit top-[105vh] -translate-y-[100%] left-1/2 -translate-x-1/2  ${scrolled > 0.79 ? 'willChange-transform' : ''}`} width="1782" height="150" viewBox="0 0 1782 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="miloTekening2">
              {letters.map((letter, i) => {
                // console.log(letter.props)
                return <PathGSAPStandalone {...letter.props} inverse={i === 0} key={i} tweens={[{
                  id: 'letterTween' + i,
                  timeline: scrubTl,
                  ratio: 1,
                  attr: {
                    duration: i === 0 ? 50 : 5,
                    ease: 'none',
                    // onStart:()=>{console.log('start One')} 
                  },
                  position: i === 0 ? 50 : (100 + 6 * (i - 1)),
                }]} />
              })}
            </g>
          </svg>
        </div>
      }
    </div>
  )
}