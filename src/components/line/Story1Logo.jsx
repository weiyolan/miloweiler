import React, { useState, useEffect, useRef } from "react"
// import { useDimensions } from "@/utils/useDimensions"
import { useAppContext } from "@utils/appContext.js"
import { Path, TextAnimate } from '@/components/line/pathUtils'
// import { SVGWrapper } from "./contextSVG"
import { usePageContext } from "@utils/pageContext"
// import { PageWrapper } from "@context/pageContext"
import AnimateSVG from "./AnimateSVG"
// import AnimateSVGBanner from "./AnimateSVGBanner"
import { gsap } from "gsap/dist/gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
// import useStateRef from "@/utils/useStateRef"
gsap.registerPlugin(ScrollTrigger)

export default function Story1Logo({ scrollMin, scrollMax, setIntroAnimated, speed, setSvgHeight, setSvgWidth, banner }) {

  let { locale, scrolled } = useAppContext()

  let { mobile } = usePageContext()
  const ctx = useRef(gsap.context(() => { }));
  let tl = useRef()
  // let [tl] = useRef()
  let [started, setStarted] = useState(false)

  let [fakeScroll1, setFakeScroll1] = useState({ scroll: 0 })
  let [fakeScroll2, setFakeScroll2] = useState({ scroll: 0 })
  let [fakeScroll3, setFakeScroll3] = useState({ scroll: 0 })
  let [fakeScroll4, setFakeScroll4] = useState({ scroll: 0 })
  let [fakeScroll5, setFakeScroll5] = useState({ scroll: 0 })
  let [fakeScroll6, setFakeScroll6] = useState({ scroll: 0 })
  let [fakeScroll7, setFakeScroll7] = useState({ scroll: 0 })
  let [fakeScroll8, setFakeScroll8] = useState({ scroll: 0 })
  let [fakeScroll9, setFakeScroll9] = useState({ scroll: 0 })
  let [fakeScroll10, setFakeScroll0] = useState({ scroll: 0 })
  let [fakeScroll11, setFakeScroll11] = useState({ scroll: 0 })
  let [fakeScroll12, setFakeScroll12] = useState({ scroll: 0 })
  let [fakeScroll13, setFakeScroll13] = useState({ scroll: 0 })
  let [fakeScroll14, setFakeScroll14] = useState({ scroll: 0 })
  let [fakeScroll15, setFakeScroll15] = useState({ scroll: 0 })
  let [fakeScroll16, setFakeScroll16] = useState({ scroll: 0 })
  let [fakeScroll17, setFakeScroll17] = useState({ scroll: 0 })
  let [fakeScroll18, setFakeScroll18] = useState({ scroll: 0 })
  let [fakeScroll19, setFakeScroll19] = useState({ scroll: 0 })
  let [fakeScroll20, setFakeScroll20] = useState({ scroll: 0 })
  let [fakeScroll21, setFakeScroll21] = useState({ scroll: 0 })
  let [fakeScroll22, setFakeScroll22] = useState({ scroll: 0 })
  let [fakeScroll23, setFakeScroll23] = useState({ scroll: 0 })
  let [fakeScroll24, setFakeScroll24] = useState({ scroll: 0 })
  let [fakeScroll25, setFakeScroll25] = useState({ scroll: 0 })
  let [fakeScroll26, setFakeScroll26] = useState({ scroll: 0 })
  let [fakeScroll27, setFakeScroll27] = useState({ scroll: 0 })
  let [fakeScroll28, setFakeScroll28] = useState({ scroll: 0 })
  let [fakeScroll29, setFakeScroll29] = useState({ scroll: 0 })
  let [fakeScroll30, setFakeScroll30] = useState({ scroll: 0 })
  let [fakeScroll31, setFakeScroll31] = useState({ scroll: 0 })
  let [fakeScroll32, setFakeScroll32] = useState({ scroll: 0 })
  let [fakeScroll33, setFakeScroll33] = useState({ scroll: 0 })
  let [fakeScroll34, setFakeScroll34] = useState({ scroll: 0 })
  let [fakeScroll35, setFakeScroll35] = useState({ scroll: 0 })
  let [fakeScroll36, setFakeScroll36] = useState({ scroll: 0 })
  let [fakeScroll37, setFakeScroll37] = useState({ scroll: 0 })
  let [fakeScroll38, setFakeScroll38] = useState({ scroll: 0 })
  let [fakeScroll39, setFakeScroll39] = useState({ scroll: 0 })
  let [fakeScroll40, setFakeScroll40] = useState({ scroll: 0 })
  let [fakeScroll41, setFakeScroll41] = useState({ scroll: 0 })
  let [fakeScroll42, setFakeScroll42] = useState({ scroll: 0 })
  let [fakeScroll43, setFakeScroll43] = useState({ scroll: 0 })
  let [fakeScroll44, setFakeScroll44] = useState({ scroll: 0 })
  let [fakeScroll45, setFakeScroll45] = useState({ scroll: 0 })
  let [fakeScroll46, setFakeScroll46] = useState({ scroll: 0 })
  let [fakeScroll47, setFakeScroll47] = useState({ scroll: 0 })
  let [fakeScroll48, setFakeScroll48] = useState({ scroll: 0 })
  let [animateStroke1, setAnimateStroke1] = useState({ animate: false })
  let [animateStroke2, setAnimateStroke2] = useState({ animate: false })
  let [animateSun, setAnimateSun] = useState({ animate: false })

  useEffect(() => {
    return () => ctx.current.revert();
  }, []);

  useEffect(() => {
    // let tl;
    let timer = setTimeout(() => {
      ctx.current.add(() => {
        tl.current = gsap.timeline()
          .to(fakeScroll1, {
            scroll: 1000,
            ease: 'power2.inout',
            duration: 5,
            onUpdate: () => { setFakeScroll1({ ...fakeScroll1 }) }
          })
          .set(animateSun, {
            animate: true,
            // ease: 'power2.inout',
            // duration: 3,
            onUpdate: () => { setAnimateSun({ ...animateSun }) }
          }, '-=3')
          .set(animateStroke1, {
            animate: true,
            // ease: 'power2.inout',
            // duration: 3,
            onUpdate: () => { setAnimateStroke1({ ...animateStroke1 }) }
          }, '<+=1')
          .to(
            [
              fakeScroll2,
              fakeScroll3,
              fakeScroll4,
              fakeScroll5,
              fakeScroll6,
              fakeScroll7,
              fakeScroll8,
              fakeScroll9,
              fakeScroll10,
              fakeScroll11,
              fakeScroll12,
              fakeScroll13,
              fakeScroll14,
              fakeScroll15,
              fakeScroll16,
              fakeScroll17,
              fakeScroll18,
              fakeScroll19,
              fakeScroll20,
              fakeScroll21,
              fakeScroll22,
              fakeScroll23,
              fakeScroll24,
              fakeScroll25,
              fakeScroll26,
              fakeScroll27,
              fakeScroll28,
              fakeScroll29,
              fakeScroll30,
              fakeScroll31,
              fakeScroll32,
              fakeScroll33,
              fakeScroll34,
              fakeScroll35,
              fakeScroll36,
              fakeScroll37,
              fakeScroll38,
              fakeScroll39,
              fakeScroll40,
              fakeScroll41,
              fakeScroll42,
              fakeScroll43,
              fakeScroll44,
            ],
            {
              scroll: 1000,
              ease: 'power2.out',
              duration: 2,
              stagger: 0.05,
              onUpdate: () => { setFakeScroll2({ ...fakeScroll2 }); setFakeScroll3({ ...fakeScroll3 }) }
            }, '<-=1')
          .to('#circle', {
            opacity: 1,
            // scale: 2,
            ease: 'power2.inout',
            duration: 2,
            // yoyo:true,
            // onUpdate: () => { setFakeScroll1({ ...fakeScroll1 }) }
          }, '<+=1')
          .to('#circle', {
            scale: 3,
            ease: 'power2.inout',
            duration: 2,
            transformOrigin: '50% 50%',
            yoyo: 'repeat',
            // onUpdate: () => { setFakeScroll1({ ...fakeScroll1 }) }
          }, '<')
          // BEAM
          .to(fakeScroll45, {
            scroll: 150,
            ease: 'power2.inout',
            // ease: 'back',
            duration: 3,
            yoyo: 'repeat',
            onStart: () => {setIntroAnimated(true)},
            onUpdate: () => { setFakeScroll45({ ...fakeScroll45 }) }
          }, '<+=1.5')
          .to(fakeScroll45, {
            scroll: 100,
            ease: 'power2.inout',
            // ease: 'back',
            duration: 2,
            yoyo: true,
            repeat: started ? 0 : -1,
            onUpdate: () => { setFakeScroll45({ ...fakeScroll45 }) }
          })
      }
      )
    }, 200)

    return () => {
      // console.log('timer cleared')
      clearTimeout(timer);
    }
  }, [])
  // console.log(scrolled)

  useEffect(() => {

    ctx.current.add(() => {
      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: '#beam',
          // start: width < 648 ? '30% 20%' : 'center 20%',
          // start: '40% bottom',
          start: '30% 55%',
          // end: "30% 50%",

          // end: "max",
          invalidateOnRefresh: true,
          scrub: 2,
          markers: false,
        }
      })
        // .to('#circleScroll', {
        //   opacity: 1,
        //   scale: 3,
        //   // ease: 'power2.inout',
        //   // duration: 0.05,
        //   transformOrigin: '50% 50%',
        //   yoyo: 'repeat',
        //   // onUpdate: () => { setFakeScroll1({ ...fakeScroll1 }) }
        // })
        .to(fakeScroll46, {
          scroll: 1000,
          // ease: "none",
          onUpdate: () => { setFakeScroll46({ ...fakeScroll46 }) },
          lazy: false,
        },'<')
      // .to(fakeScroll47, {
      //   scroll: 1000,
      //   // ease: "none",
      //   onUpdate: () => { setFakeScroll47({ ...fakeScroll47 }) },
      //   lazy: false,
      // })
      // .to(fakeScroll48, {
      //   scroll: 1000,
      //   // ease: "none",
      //   onUpdate: () => { setFakeScroll48({ ...fakeScroll48 }) },
      //   lazy: false,
      // })
    })
  }, [])



  let colorPrimary = "#FFF5EA";
  let n = 0;
  function getContent(mobile) {
    return mobile ?
      <g id='mobile'>
        <Path scrolled={fakeScroll1} drawDuration='1' position={0} inverse={false} id="toAstridMob" d="M351 170C351 332.5 61.9999 266.5 20.5009 410C3.06634 470.287 61.5011 539 118 515" stroke="#FFFAEA" strokeWidth="2" strokeLinecap="round" />
      </g> :
      <g id='desktop'>
        {/* left */}
        <Path mask="url(#mask0_322_1018)" transitStrokeAnimation transitPortion={0.65} drawDuration='2' animateStroke={false} strokeColor={animateStroke1.animate ? 'transparent' : colorPrimary} fillColor={'transparent'} lineSpeed={1} scrolled={fakeScroll1.scroll / 1000} inverse={false} double={1} lengthFactor={1} id="lineLeft" d="M24.5 1C235.277 145.095 335.5 -38.5 422 24.5C459.603 51.8869 436.304 151.775 509 173C577.5 193 616 152.13 661.5 164C700 174.043 711.04 196.18 746.5 208C768 215.167 796.5 218.5 816 188.5C842.385 154.12 888.5 141.526 928 160.5C967.5 179.474 994.808 240.5 968.5 282.5C942.192 324.5 889 346.268 841.5 317.5C803.571 294.529 783 239.5 816 189.5C828 172.5 854.5 152 883.5 153" stroke="black" stroke-width="2" />
        {/* right */}
        <Path transitStrokeAnimation transitPortion={0.67} drawDuration='2' animateStroke={false} strokeColor={animateStroke1.animate ? 'transparent' : colorPrimary} fillColor={'transparent'} lineSpeed={1} scrolled={fakeScroll1.scroll / 1000} inverse={false} double={1} lengthFactor={1} id="lineRight" d="M1735.5 336C1656 336 1618.5 487.5 1538 472.5C1457.5 457.5 1435.5 334 1366.5 336C1297.5 338 1274.5 396.5 1211.5 386C1148.5 375.5 1154.5 341.113 1115 322C1075.5 302.887 1038.5 327.5 1024 327.5C1008.77 327.5 986.5 329.5 985 299C982.5 241.5 926.5 231.5 907 234C867 240 834 268.497 834 310C834 356.5 888.5 387 918 374.5C906.5 375.5 871.051 370.834 862 335.5C854.095 304.644 874.047 281.145 891 271C909.329 260.032 953.951 260.857 969 292.5C982.662 321.228 970.511 341.652 963.5 350C971.333 345.333 986.8 329 986 301" stroke="black" stroke-width="2" />
        {/* moon */}
        <Path fillColor={animateSun.animate ? colorPrimary : 'transparent'} drawDuration='2' scrolled={1} animateStroke={true} animateFill={animateSun.animate} inverse={false} double={1} lengthFactor={1} id="moon" fillRule="evenodd" clipRule="evenodd" d="M833.446 301.604C835.188 284.333 843.211 268.085 856.309 255.304C862.803 248.967 869.237 244.451 877.695 240.292C903.535 227.587 933.651 229.221 956.714 244.58C962.157 248.206 968.352 253.799 971.828 258.227C972.671 259.301 973.46 260.179 973.582 260.179C975.752 262.928 976.586 264.445 977.426 265.975C977.577 266.25 977.729 266.527 977.889 266.811C977.896 266.828 977.904 266.842 977.913 266.854C978.541 267.632 981.774 274.337 982.793 276.975C984.286 280.84 985.641 285.882 986.428 290.506C987.192 295 987.486 304.043 987.006 308.326C986.335 314.309 984.723 321.192 982.791 326.325C978.686 337.223 969.117 348.507 958.287 355.22C956.858 356.106 955.62 356.762 955.536 356.677C955.451 356.593 955.671 356.37 956.024 356.181C957.158 355.575 961.988 349.857 964.36 346.313C974.475 331.2 976.508 312.683 969.817 296.617C968.89 294.39 967.95 292.472 967.278 291.371C966.964 290.832 964.844 287.22 963.12 285.203C962.495 284.154 960.799 282.166 958.694 280.068C945.187 266.607 924.92 261.354 905.491 266.28C895.649 268.775 886.546 273.85 879.146 280.967C867.96 291.728 861.896 305.844 861.896 321.121C861.896 322.512 861.913 323.304 861.998 323.784C862.077 325.157 862.199 326.661 862.356 327.519C862.361 327.545 862.366 327.572 862.372 327.601C862.438 327.919 862.721 329.375 863 330.837C864.08 336.489 867.04 343.587 870.43 348.651C880.372 363.502 896.946 372.106 915.612 372.106C919.69 372.106 925.677 371.548 927.472 371.001C929.047 370.521 924.246 372.794 921.597 373.782C914.477 376.438 903.791 378.266 898.029 377.812C895.267 377.595 888.848 376.381 885.255 375.397C873.108 372.069 862.24 365.817 853.448 357.099C841.8 345.55 835.015 331.392 833.408 315.284L833.026 311.456C832.979 310.98 832.958 310.113 832.958 308.967L833.029 307.005C833.068 305.926 833.256 303.496 833.446 301.604ZM901.001 373.517C894.113 371.649 888.904 369.381 883.697 365.983C869.862 356.954 861.216 343.238 859.219 327.153C856.734 307.132 865.66 286.832 882.544 274.105C891.459 267.384 902.696 262.853 913.046 261.807C915.962 261.512 924.703 261.525 927.408 261.828C935.201 262.701 943.456 265.515 950.286 269.627C970.378 281.725 980.263 304.032 975.748 327.085C975.15 330.141 973.415 335.704 972.214 338.418C971.929 339.063 971.759 339.591 971.837 339.591C972.089 339.591 975.366 334.133 976.642 331.588C979.821 325.249 982.292 317.457 983.476 310.046C984.245 305.229 984.25 295.355 983.487 290.662C981.897 280.887 978.608 272.305 973.373 264.279C962.925 248.262 945.243 237.199 925.09 234.072C920.487 233.358 910.929 233.113 906.223 233.588C882.365 236 861.179 248.432 848.167 267.655C834.54 287.787 831.973 311.826 841.155 333.312C849.162 352.049 866.271 366.382 887.069 371.778C891.861 373.021 898.591 374.056 902.878 374.21C903.309 374.225 902.464 373.913 901.001 373.517Z" fill="#FFF5EA" />
        {/* sun */}
        <Path mask="url(#mask0_322_1018)" fillColor={animateSun.animate ? colorPrimary : 'transparent'} drawDuration='2' scrolled={1} animateStroke={true} animateFill={true} inverse={false} double={2} lengthFactor={1} fillRule="evenodd" clipRule="evenodd" d="M831.69 311.405L833.132 312.568C834.073 313.484 835.102 314.379 836.221 315.256C841.699 319.546 849.324 323.382 859.178 326.943C860.218 327.32 861.284 327.693 862.374 328.063C862.819 328.214 863.268 328.364 863.722 328.515C873.437 331.178 881.103 332.26 890.158 332.26C904.616 332.26 918.057 329.061 931.224 322.487C944.005 316.106 954.8 307.037 963.632 295.262C964.823 293.448 965.719 292.3 966.554 291.1C967.046 290.393 967.516 289.668 968.014 288.778C968.145 288.537 968.274 288.297 968.403 288.057C972.074 281.214 974.756 274.915 976.468 270.427C976.922 269.236 977.308 268.172 977.626 267.259C978.154 265.745 978.347 265.072 978.5 264.5C978.508 264.47 978.549 264.346 978.59 264.218C978.592 264.214 978.593 264.209 978.595 264.205L978.691 263.904C979.802 259.626 980.72 254.594 981.164 250.349C985.388 209.9 962.428 171.418 924.927 156.092C916.727 152.742 909.072 150.782 899.7 149.637C895.623 149.138 884.291 149.136 880.303 149.633C858.597 152.339 840.261 161.122 825.386 175.939C807.954 193.304 798.488 216.143 798.498 240.813C798.507 262.422 805.623 282.22 819.423 299.033C822.144 302.347 828.859 309.121 831.69 311.405ZM975.565 250.505C975.126 254.53 973.95 261.291 973.688 261.291C973.454 262.124 973.147 263.156 972.776 264.337C971.202 269.348 968.472 277.047 965.228 283.652C964.7 284.728 964.158 285.775 963.605 286.776C963.559 286.858 963.514 286.941 963.468 287.022L963.465 287.028C963.056 287.71 962.635 288.39 962.201 289.066C954.775 300.631 943.675 311.242 931.922 317.937C921.582 323.828 910.036 327.601 898.137 328.978C894.472 329.402 883.042 329.571 880.303 329.242C874.49 328.543 867.501 327.224 864.205 326.263C863.47 326.048 862.918 325.852 862.605 325.684C862.558 325.659 862.515 325.633 862.476 325.605L862.14 325.478C861.058 325.065 860.006 324.662 858.979 324.261C850.651 321.016 843.953 317.994 835.964 312.234C835.017 311.552 834.052 310.831 833.064 310.066L833.064 310.079L831.814 309.086L831.813 309.084C827.87 305.949 820.423 297.921 816.793 292.893C803.365 274.293 797.759 249.98 801.649 227.215C804.72 209.242 813.108 192.936 825.864 180.139C839.057 166.905 854.641 158.72 872.795 155.49C878.519 154.471 879.051 154.415 885.309 154.173C905.702 153.385 925.63 159.875 942.403 172.766C946.516 175.928 955.047 184.613 958.138 188.786C967.949 202.03 973.512 215.921 975.408 231.903C975.936 236.36 976.02 246.326 975.565 250.505Z" fill="black" />
        <mask id="mask0_322_1018" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-178" y="-41" width="1247" height="431">
          <path id="SunMask" fillRule="evenodd" clipRule="evenodd" d="M1079 -46H-168V385H1079V-46ZM883.697 366.983C888.904 370.381 894.113 372.649 901.001 374.517C902.464 374.913 903.309 375.225 902.878 375.21C898.591 375.056 891.861 374.021 887.069 372.778C866.271 367.382 849.162 353.049 841.155 334.312C831.973 312.826 834.54 288.787 848.167 268.655C861.179 249.432 882.365 237 906.223 234.588C910.929 234.113 920.487 234.358 925.09 235.072C945.243 238.199 962.925 249.262 973.373 265.279C978.608 273.305 981.897 281.887 983.487 291.662C984.25 296.355 984.245 306.229 983.476 311.046C982.292 318.457 979.821 326.249 976.642 332.588C975.366 335.133 972.089 340.591 971.837 340.591C971.759 340.591 971.929 340.063 972.214 339.418C973.415 336.704 975.15 331.141 975.748 328.085C980.263 305.032 970.378 282.725 950.286 270.627C943.456 266.515 935.201 263.701 927.408 262.828C924.703 262.525 915.962 262.512 913.046 262.807C902.696 263.853 891.459 268.384 882.544 275.105C865.66 287.832 856.734 308.132 859.219 328.153C861.216 344.238 869.862 357.954 883.697 366.983Z" fill="#D9D9D9" />
        </mask>
        {/* first */}
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll2.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M708.239 302.383C716.04 298.315 724.542 295.885 732.664 292.566C743.89 288.21 755.116 283.824 766.355 279.503C772.43 277.306 778.5 275.084 784.532 272.78C786.37 272.393 792.166 270.468 791.456 273.543C789.666 275.464 787.269 276.074 784.752 277.235C780.118 279.098 775.381 280.7 770.848 282.802C766.156 284.504 761.547 286.444 756.853 288.151C754.463 289.362 751.773 289.998 749.245 291.066C745.137 292.503 741.103 294.129 737.021 295.62C733.184 297.146 729.275 298.528 725.367 299.837C722.342 301.035 718.973 302.801 715.673 303.886C712.541 304.703 709.393 306.876 706.099 306.089C704.744 304.818 707.299 302.984 708.239 302.383Z" fill="#FFF5EA" />
        {/* second */}
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll2.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M773.177 238.52C772.337 237.453 772.36 236.983 773.297 236.047C774.716 234.629 776.909 235.378 776.909 237.281C776.909 239.32 774.45 240.137 773.177 238.52Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll3.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M757.029 238.889C756.606 238.467 756.261 237.898 756.261 237.625C756.261 236.801 757.711 235.592 758.701 235.592C759.848 235.592 760.641 236.458 760.641 237.71C760.641 239.56 758.424 240.284 757.029 238.889Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll4.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M742.026 239.823C741.854 239.761 741.351 239.632 740.907 239.535C739.253 239.174 739.168 236.828 740.787 236.213C741.233 236.044 744.042 235.905 747.03 235.905C752.992 235.905 753.445 236.036 753.445 237.755C753.445 239.381 752.826 239.585 747.345 239.767C744.592 239.859 742.198 239.884 742.026 239.823Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll5.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M732.471 239.796C731.866 239.068 731.974 237.527 732.667 237.004C733.574 236.318 735.52 236.397 735.915 237.135C736.41 238.06 736.301 239.384 735.691 239.847C734.933 240.422 732.965 240.391 732.471 239.796Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll6.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M726.553 239.91C725.715 239.011 725.745 238.049 726.639 237.21C728.073 235.863 730.295 236.769 730.295 238.701C730.295 240.453 727.807 241.256 726.553 239.91Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll7.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M703.252 240.525C702.176 238.991 703.052 237.468 705.009 237.468C706.901 237.468 707.889 239.512 706.572 240.703C705.716 241.477 703.849 241.377 703.252 240.525Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll8.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M697.039 240.663C695.734 239.222 696.836 237.356 698.892 237.526C699.815 237.602 700.194 237.82 700.565 238.484C700.995 239.256 700.995 239.432 700.565 240.204C699.944 241.317 697.875 241.586 697.039 240.663Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll9.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M680.365 241.293C679.214 240.525 679.234 238.426 680.398 237.98C681.249 237.653 682.903 237.754 683.306 238.156C683.876 238.725 683.758 240.428 683.109 241.015C682.522 241.546 680.978 241.703 680.365 241.293Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll10.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M672.95 240.976C671.643 239.532 672.748 237.669 674.81 237.838C675.785 237.919 676.095 238.111 676.451 238.857C676.829 239.649 676.828 239.889 676.444 240.577C675.855 241.631 673.76 241.87 672.95 240.976Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll11.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M656.777 241.641C655.456 241.133 655.14 239.477 656.183 238.533C656.766 238.005 657.458 237.925 662.299 237.833C668.587 237.713 669.29 237.909 669.29 239.782C669.29 241.556 668.875 241.682 662.752 241.755C659.723 241.792 657.035 241.74 656.777 241.641Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll12.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M649.581 241.915C648.064 241.694 647.448 239.643 648.589 238.611C649.445 237.837 651.313 237.936 651.91 238.788C653.102 240.49 651.799 242.239 649.581 241.915Z" fill="#FFF5EA" />
        {/* third */}
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll14.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M787.232 196.443C784.858 195.999 782.404 194.673 779.977 193.909C775.608 192.124 771.111 190.682 766.773 188.826C762.429 187.504 758.381 185.361 754.071 183.942C747.575 181.297 741.131 178.525 734.55 176.103C731.653 175.079 729.252 173.32 726.787 172.885C722.487 171.454 718.175 169.843 714.17 167.795C712.182 166.818 711.578 163.643 714.576 164.356C720.57 164.944 725.853 168.122 731.442 170.095C739.743 173.364 748.054 176.6 756.381 179.809C762.378 182.147 768.389 184.468 774.333 186.949C778.674 188.762 783.066 190.479 787.395 192.303C789.555 192.853 792.117 197.18 788.156 196.601L787.715 196.538L787.232 196.443Z" fill="#FFF5EA" />
        {/* fourth */}
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll15.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M806.379 159.54C805.655 158.667 805.616 157.505 806.289 156.833C807.169 155.953 809.285 155.924 809.746 156.785C810.24 157.708 810.133 158.84 809.498 159.415C808.824 160.024 806.847 160.103 806.379 159.54Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll16.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M801.515 154.984C800.275 153.614 801.688 151.219 803.486 151.643C804.433 151.866 805.377 152.894 805.377 153.702C805.377 155.246 802.59 156.171 801.515 154.984Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll17.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M793.738 146.882C791.522 144.691 789.629 142.58 789.531 142.19C789.282 141.2 790.188 139.923 791.139 139.923C792.125 139.923 794.094 141.641 798.573 146.404C800.498 148.453 800.741 149.246 799.746 150.24C798.58 151.405 797.964 151.061 793.738 146.882Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll18.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M776.352 131.307C775.867 130.967 775.657 130.502 775.657 129.762C775.657 127.958 777.642 127.113 779.103 128.296C781.156 129.957 778.531 132.832 776.352 131.307Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll19.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M771.071 125.895C769.285 124.469 765.044 120.119 764.264 118.914C763.79 118.181 763.773 117.957 764.137 117.195C764.453 116.533 764.815 116.293 765.612 116.217C766.598 116.123 766.954 116.4 770.85 120.294C773.15 122.592 775.031 124.719 775.031 125.021C775.031 125.685 773.674 127.104 773.04 127.104C772.79 127.104 771.903 126.56 771.071 125.895Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll20.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M752.632 108.385C750.823 107.053 744.998 101.007 744.998 100.461C744.998 99.6247 746.584 98.306 747.315 98.5342C748.805 98.9991 756.261 106.312 756.261 107.308C756.261 108.228 755.357 109.284 754.569 109.284C754.175 109.284 753.303 108.879 752.632 108.385Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll21.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M740.48 97.0209C739.811 96.0667 739.869 95.3539 740.678 94.6015C741.54 93.7983 743.358 93.748 743.937 94.5111C744.533 95.2954 744.467 96.5958 743.801 97.1983C742.945 97.9725 741.077 97.8727 740.48 97.0209Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll22.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M727.088 84.3265C726.615 84.0147 724.609 82.1914 722.63 80.2748C718.761 76.5275 718.399 75.82 719.717 74.5924C721.018 73.3811 721.316 73.5578 726.8 78.8009C730.284 82.1317 730.662 82.9298 729.423 84.3504C728.816 85.0465 728.171 85.0399 727.088 84.3265Z" fill="#FFF5EA" />
        {/* fifth */}
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll23.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M850.309 139.832C847.686 137.834 847.083 134.468 845.686 131.668C842.593 124.588 839.638 117.451 836.73 110.295C833.682 103.225 831.151 95.9433 828.044 88.8972C826.257 83.5554 823.581 78.5739 821.637 73.2937C821.081 71.032 818.368 66.1178 821.676 66.0134C824.456 65.9257 824.936 70.4654 826.227 72.7721C828.871 78.9439 831.208 85.2333 833.888 91.3817C836.378 97.5108 839.053 103.57 841.491 109.725C844.397 116.389 846.99 123.188 849.601 129.973C850.597 132.655 851.996 135.256 852.575 138.113C853.113 139.482 851.419 140.412 850.309 139.832Z" fill="#FFF5EA" />
        {/* sixth */}
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll24.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M904.677 127.734C903.219 127.406 902.984 127.164 902.984 125.992C902.984 124.77 903.882 123.665 904.875 123.665C905.227 123.665 905.874 124.024 906.313 124.463C906.933 125.083 907.065 125.448 906.905 126.104C906.584 127.419 905.807 127.987 904.677 127.734Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll25.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M904.654 122.102C903.779 121.75 903.507 120.85 903.934 119.727C904.344 118.649 904.748 118.361 905.86 118.355C906.793 118.35 907.677 119.336 907.677 120.382C907.677 121.985 906.303 122.767 904.654 122.102Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll26.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M905.705 117.187C904.506 117.007 904.088 115.868 904.691 114.427C905.099 113.451 905.262 113.348 906.398 113.348C907.755 113.348 908.302 113.906 908.302 115.29C908.302 116.165 907.48 117.431 906.955 117.365C906.75 117.34 906.187 117.259 905.705 117.187Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll27.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M907.52 105.306C906.53 105.063 906.112 104.582 906.112 103.687C906.112 102.352 906.927 101.468 908.156 101.468C909.501 101.468 910.361 102.577 910.032 103.887C909.642 105.44 909.165 105.71 907.52 105.306Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll28.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M907.447 99.2008C906.831 98.413 906.815 97.3296 907.351 92.4293C907.942 87.0311 908.365 85.8352 909.683 85.8352C910.09 85.8352 910.752 86.1011 911.153 86.4261L911.883 87.0171L911.36 92.1831C911.072 95.0244 910.625 97.8537 910.367 98.4703C909.959 99.4478 909.761 99.5916 908.826 99.5916C908.236 99.5916 907.616 99.4157 907.447 99.2008Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll29.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M909.347 84.5851C908.472 84.2326 908.199 83.3331 908.627 82.2093C909.034 81.1386 909.441 80.8441 910.522 80.8377C912.132 80.8282 912.906 82.7423 911.882 84.2025C911.377 84.9232 910.51 85.0541 909.347 84.5851Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll30.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M912.057 70.7581C910.791 70.4103 910.504 70.0635 910.497 68.8742C910.491 67.8127 911.488 66.7639 912.503 66.7639C913.555 66.7639 914.656 68.2062 914.401 69.2515C914.068 70.6183 913.313 71.1033 912.057 70.7581Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll31.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M913.586 55.9271C912.656 55.6788 912.355 54.4457 912.939 53.2779C914.051 51.0553 917.12 52.2018 916.526 54.6177C916.176 56.0422 915.367 56.4028 913.586 55.9271Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll32.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M914.112 49.3899C913.365 48.6427 913.48 46.8885 914.316 46.3035C915.831 45.2427 917.688 46.0936 917.688 47.849C917.688 49.5928 915.331 50.6083 914.112 49.3899Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll33.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M914.883 43.0235C914.401 42.1232 914.48 40.8069 915.327 35.6453C915.971 31.7175 916.207 30.8752 916.793 30.3998C917.975 29.4415 919.877 30.3202 919.877 31.8243C919.877 33.4091 918.236 42.293 917.828 42.915C917.215 43.8496 915.362 43.9178 914.883 43.0235Z" fill="#FFF5EA" />
        {/* seventh */}
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll34.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M950.427 150.031C949.123 147.437 952.115 144.69 953.171 142.323C960.647 131.592 968.398 121.052 975.879 110.322C982.11 101.526 988.264 92.6523 994.961 84.204C995.854 82.396 999.664 81.1885 998.746 84.439C997.972 87.3876 995.59 89.5166 994.292 92.2153C991.98 95.194 989.708 98.2266 987.813 101.475C985.517 104.427 983.626 107.684 981.154 110.501C979.679 112.969 977.985 115.376 976.148 117.615C973.435 121.57 970.358 125.299 967.785 129.322C962.916 135.278 959.103 142.008 954.275 147.987C953.335 148.958 951.996 150.852 950.427 150.031Z" fill="#FFF5EA" />
        {/* eight */}
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll35.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M982.268 173.334C981.791 172.412 981.797 172.306 982.369 171.536C983.144 170.495 985.174 170.217 985.797 171.068C986.304 171.762 986.321 173.443 985.825 173.939C985.618 174.145 984.848 174.314 984.112 174.314C982.93 174.314 982.716 174.2 982.268 173.334Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll36.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M987.823 169.925C986.29 168.498 987.058 167.443 992.301 163.775C996.54 160.809 997.286 160.442 998.074 160.934C998.416 161.148 998.86 161.718 999.061 162.203C999.382 162.978 999.336 163.179 998.679 163.882C997.83 164.79 991.564 169.265 990.048 170.046C988.776 170.702 988.651 170.695 987.823 169.925Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll37.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M1007.02 156.449C1005.99 155.636 1006.01 154.623 1007.08 153.613C1008.27 152.497 1015.24 148.023 1016.24 147.737C1017.16 147.473 1017.81 147.837 1018.4 148.95C1019.01 150.084 1018.16 150.962 1013.61 153.886C1008.68 157.058 1008.09 157.289 1007.02 156.449Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll38.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M1021.42 147.725C1020.34 147.402 1020 146.942 1019.99 145.803C1019.98 144.107 1022.89 143.269 1023.88 144.682C1024.6 145.703 1024.48 146.67 1023.54 147.404C1022.63 148.119 1022.7 148.108 1021.42 147.725Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll39.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M1026.24 144.047C1024.77 142.858 1025.8 140.548 1027.79 140.548C1028.9 140.548 1029.69 141.432 1029.69 142.665C1029.69 144.385 1027.66 145.197 1026.24 144.047Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll40.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M1037.58 136.623C1036.6 135.937 1036.67 134.61 1037.74 133.607C1038.92 132.5 1045.93 128.061 1046.86 127.828C1047.27 127.723 1047.84 127.779 1048.11 127.951C1048.84 128.405 1049.28 129.836 1048.9 130.482C1048.29 131.504 1039.51 137.109 1038.52 137.109C1038.38 137.109 1037.96 136.89 1037.58 136.623Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll41.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M1052.34 126.329C1051.45 125.436 1051.4 125 1052.09 124.014C1052.68 123.179 1060.03 118.315 1061.44 117.831C1062.66 117.412 1063.07 117.577 1063.67 118.733C1064.12 119.62 1064.12 119.74 1063.55 120.503C1062.88 121.415 1055.58 126.227 1054.07 126.751C1053.22 127.048 1053.01 126.997 1052.34 126.329Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll42.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M1067.05 116.637C1065.49 115.085 1066.08 114.346 1071.72 110.7C1076.94 107.328 1077.42 107.209 1078.37 109.051C1078.83 109.926 1078.82 110.051 1078.26 110.811C1077.58 111.723 1070.28 116.534 1068.77 117.059C1067.92 117.355 1067.72 117.305 1067.05 116.637Z" fill="#FFF5EA" />
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll43.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M1087.25 103.031C1085.84 101.622 1086.65 100.612 1092 97.1541C1096 94.5674 1097.14 94.0478 1097.84 94.4868C1098.55 94.9223 1099.18 96.2991 1098.95 96.8929C1098.75 97.4218 1093.51 101.08 1090.66 102.676C1088.62 103.823 1088.1 103.877 1087.25 103.031Z" fill="#FFF5EA" />
        {/* ninth */}
        <Path fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll44.scroll / 1000} animateStroke={true} animateFill={true} inverse={false} double={1} lengthFactor={1} d="M993.821 203.669C997.381 200.84 1002.06 200.124 1006.28 198.711C1016.71 195.718 1027.04 192.432 1037.44 189.337C1046.98 186.421 1056.58 183.729 1066.17 181.006C1068.1 179.908 1072.25 181.29 1069.49 183.652C1067.51 185.431 1064.68 185.499 1062.34 186.605C1058.67 187.572 1055.06 188.728 1051.49 190.03C1046.32 191.544 1041.17 193.166 1035.98 194.603C1027.04 197.218 1018.08 199.739 1009.16 202.41C1004.69 203.808 1000.24 205.471 995.624 206.238C994.142 206.403 992.353 205.125 993.821 203.669Z" fill="#FFF5EA" />
        {/* ANIMATED LINE START */}
        <circle opacity={0} id="circle" cx="942" cy="365" r="2" fill={colorPrimary} />
        <Path id="beam" fillColor={colorPrimary} drawDuration='1' scrolled={fakeScroll45.scroll / 1000} animateStroke={false} inverse={true} double={1} lengthFactor={1} d="M1332 1205C1322 1183 1323 1165.5 1343.5 1129.5C1364 1093.5 1296.7 1094.72 1277.5 1061C1257 1025 1333.2 989.941 1306 938.5C1283 895 1204.5 921.5 1163 833.5L942 365" stroke="black" stroke-width="2" stroke-linecap="round" />
        {/* SCROLLING LINE START */}
        <circle opacity={0} id="circleScroll" cx="942" cy="365" r="2" fill={colorPrimary} />
        {/* <Path id="beamScroll" fillColor={animateStroke2.animate ? colorPrimary : 'transparent'} drawDuration='0.7' scrolled={fakeScroll46.scroll / 1000} animateStroke={false} inverse={true} double={1} lengthFactor={1} d="M1332 1205C1322 1183 1323 1165.5 1343.5 1129.5C1364 1093.5 1296.7 1094.72 1277.5 1061C1257 1025 1333.2 989.941 1306 938.5C1283 895 1204.5 921.5 1163 833.5L942 365" stroke="black" stroke-width="2" stroke-linecap="round" /> */}



        {/* ========LEGS======= */}
        {/* <Path id="leg" strokeColor={'black'} drawDuration='0.7' scrolled={fakeScroll47.scroll / 1000} animateStroke={false} inverse={true} double={1} lengthFactor={1} d="M942 365L1163 833.5C1204.5 921.5 1283 895 1306 938.5C1333.2 989.941 1257 1025 1277.5 1061C1296.7 1094.72 1364 1093.5 1343.5 1129.5C1323 1165.5 1322 1183 1332 1205C1356.12 1261.47 1415.35 1271.24 1399.31 1298.87M1297.21 1293.98C1288.68 1324.73 1396.11 1355.33 1399.31 1339.2M1297.21 1342.38C1291.54 1365.11 1390.5 1403.73 1394.14 1383.93M1297.21 1394.69C1294.74 1415.96 1385.49 1424.58 1390.19 1406.91M1301.4 1454.09C1292.03 1476.58 1351.96 1480 1345.06 1503.47M1295.73 1511.78C1294.5 1500.04 1347.52 1502.24 1345.06 1524.24M1294.5 1546.49C1288.08 1527.42 1346.29 1536.47 1328.28 1561.89C1322.63 1569.88 1325.08 1577.7 1325.08 1590" stroke="#FF0000" stroke-width="2" stroke-linecap="round" /> */}
        {/* <Path id="leg" strokeColor={'black'} drawDuration='1' scrolled={fakeScroll47.scroll / 1000} animateStroke={false} inverse={true} double={1} lengthFactor={1} d="M1325.08 1590C1325.08 1577.7 1322.63 1569.88 1328.28 1561.89C1346.29 1536.47 1288.08 1527.42 1294.5 1546.49L1285.5 1540.5L1289.5 1532.5L1297.21 1524.24L1310.5 1526L1321.5 1523L1335 1528.5L1349 1532.5L1345.06 1524.24C1347.52 1502.24 1294.5 1500.04 1295.73 1511.78L1289.5 1509L1297.21 1500.5H1309L1318.5 1497.5L1335 1503.47L1352.5 1509L1345.06 1503.47C1351.96 1480 1292.03 1476.58 1301.4 1454.09L1314.5 1444L1323.5 1433.5L1349 1440L1369 1433.5L1394.14 1429.5L1403 1411.5L1390.19 1406.91C1385.49 1424.58 1294.74 1415.96 1297.21 1394.69L1309 1391L1332 1401L1343 1391L1381.5 1401L1403 1391L1394.14 1383.93C1390.5 1403.73 1291.54 1365.11 1297.21 1342.38L1314.5 1348L1323.5 1345.5L1343 1356.5L1352.5 1354L1373.5 1361.5L1403 1356.5L1399.31 1339.2C1396.11 1355.33 1288.68 1324.73 1297.21 1293.98L1314.5 1298.87L1332 1289.5L1352.5 1301.5L1373.5 1298.87L1378 1313.5L1399.31 1298.87C1415.35 1271.24 1356.12 1261.47 1332 1205" stroke="#FF0000" stroke-width="2" stroke-linecap="round" /> */}
        <mask id="mask1_322_1017" style={{ 'mask-type': "alpha" }} maskUnits="userSpaceOnUse" x="867" y="359" width="655" height="1412">
          <path id="Subtract" fillRule="evenodd" clipRule="evenodd" d="M1522 359H867V1771H1522V359ZM1400.5 1306.5C1401.44 1301.77 1400.5 1295 1400.5 1295L1376.5 1282.5L1297.5 1289C1297.47 1289.42 1297.44 1289.86 1297.41 1290.32C1297.18 1293.48 1296.91 1297.18 1297.5 1300L1331.5 1323L1397 1340C1398.84 1337.91 1398.31 1334.83 1398.08 1333.48C1398.04 1333.28 1398.01 1333.12 1398 1333C1398.65 1331.82 1407.57 1344.99 1399 1348.5C1399 1349.7 1375 1349 1363 1348.5L1314.5 1333.5L1298 1338.5C1298.4 1341.7 1298.83 1345.83 1299 1347.5L1306.5 1351L1392 1384C1391.88 1381.47 1391.91 1379.81 1392 1376.5C1397.74 1376.78 1399.95 1387.91 1393 1393C1390.11 1395.11 1375.33 1393.67 1367.5 1392L1324 1384L1296 1389.5C1296 1391.5 1296 1394.5 1297 1396L1300.5 1399L1345.5 1406L1388.5 1407.5C1389.55 1406.38 1389.5 1404.5 1389 1403C1393.77 1403.79 1394.16 1410.66 1389.5 1415.5C1387.21 1417.88 1372.83 1424.17 1365 1426.5L1294 1428L1299 1455L1299.5 1461L1301 1463L1302 1464L1352 1477L1356.5 1498.5L1346.5 1508.5L1344 1505C1343.82 1503.56 1343.78 1501.94 1343.75 1500.67C1343.72 1499.24 1343.7 1498.26 1343.5 1498.5C1343.18 1498.9 1341.65 1498.3 1339.99 1497.65C1338.74 1497.16 1337.43 1496.64 1336.5 1496.5L1295 1492.5L1279.5 1510C1279.61 1510.95 1279.69 1511.85 1279.77 1512.72C1280.24 1518.04 1280.56 1521.64 1287 1522.5C1294 1523 1312.22 1521.53 1308 1510L1296 1513.5L1296.01 1513.58C1296.24 1516.85 1296.47 1519.98 1293 1518C1292.02 1516.44 1291.55 1511.63 1293 1508C1293.8 1506 1299.33 1504.17 1300.5 1504L1318 1502L1341 1507.5L1348 1518.5L1347.5 1537.5L1344 1529C1344 1526.5 1344 1524 1342.5 1521.5C1341.39 1519.65 1337.47 1518.51 1334.65 1517.69C1334.42 1517.62 1334.21 1517.56 1334 1517.5L1306 1520.5L1292 1524.5L1283 1532.5L1277.5 1547L1286.5 1560.5C1301.63 1560.65 1307 1546.5 1293.5 1547C1292.81 1548.43 1293 1549.67 1293.5 1552C1288.57 1548.74 1288.07 1545.62 1291.5 1541.5C1293.53 1539.06 1293.16 1537.11 1292.97 1536.15C1292.9 1535.77 1292.86 1535.55 1293 1535.5L1308.5 1533L1323 1535.5L1336 1548.5L1343 1552L1377 1536.5L1440.5 1393L1400.5 1306.5Z" fill="#D9D9D9" />
        </mask>
        <Path ignoreVisibility mask="url(#mask1_322_1017)" id="fullLeg" drawDuration='1' scrolled={fakeScroll46.scroll / 1000} animateStroke={false} inverse={true} double={1} lengthFactor={1} d="M911.25 1757.5C911.25 1686.5 928.059 1687.71 933 1656C940.947 1605 878.892 1606.03 889.5 1656C901.494 1712.5 1024.5 1719.5 1102.5 1719.5C1180.5 1719.5 1325.08 1682.5 1325.08 1590C1325.08 1577.7 1322.59 1569.85 1328.28 1561.89C1345 1538.5 1290 1528.5 1291.5 1547C1291.74 1550 1294.76 1551.25 1298.5 1551C1296.07 1562.69 1282.18 1552.48 1281.5 1543.5L1289.5 1532.5L1297.21 1524.24L1310.5 1526L1321.5 1523L1335 1528.5L1334 1532.5C1343.8 1528.78 1344.68 1527.2 1345 1524.5C1347.5 1504.5 1296 1500 1295 1513C1294 1526 1306 1510 1306.5 1512C1305.1 1524.33 1284.86 1524.02 1284 1511L1297.21 1500.5H1309L1318.5 1497.5L1333 1501.5C1336.38 1504.74 1342.02 1506.21 1344.5 1502C1353.5 1479.5 1291.13 1483.99 1300.5 1461.5L1314.5 1444L1323.5 1433.5L1349 1440L1369 1433.5L1394.14 1429.5L1405 1403.5C1397.72 1395.98 1381.66 1401.14 1381.5 1405C1379.42 1406.37 1391.1 1403.5 1390.19 1406.91C1385.49 1424.58 1295 1419 1295 1394.5C1295 1388.53 1303.73 1391.41 1309 1391L1332 1401L1343 1391L1379 1399L1403 1391C1400.07 1372.03 1393.54 1368.75 1385 1379C1389.14 1379.95 1394.76 1380.5 1394.14 1383.93C1390.5 1403.73 1289.5 1366.5 1298 1343C1301.01 1334.67 1308.88 1344.44 1314.5 1348L1323.5 1345.5L1343 1356.5L1352.5 1354L1373.5 1361.5L1403 1356.5C1414.18 1324.31 1406.72 1326.51 1387.5 1333.5C1394.44 1336.27 1400.15 1335 1399.31 1339.2C1396.11 1355.33 1292 1329.5 1296 1294.5C1296.83 1287.22 1307.58 1295.32 1314.5 1298.87L1332 1289.5L1352.5 1301.5L1373.5 1298.87L1380 1298C1390.08 1294.11 1399.5 1307.5 1402.5 1301C1414 1272 1356.12 1261.47 1332 1205C1322 1183 1323 1165.5 1343.5 1129.5C1364 1093.5 1296.7 1094.72 1277.5 1061C1257 1025 1333.2 989.941 1306 938.5C1283 895 1204.5 921.5 1163 833.5L942 365" stroke="#FF0000" stroke-width="2" stroke-linecap="round" />


      </g>
  }





  return (<>
    <AnimateSVG alt='miloweiler photography logo animation'
      scrollMin={scrollMin} scrollMax={scrollMax} speed={speed} setSvgHeight={setSvgHeight} setSvgWidth={setSvgWidth}>

      {getContent(mobile)}

    </AnimateSVG>


  </>
  )
}