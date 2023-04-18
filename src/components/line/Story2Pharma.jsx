import React, {useState, useEffect, useRef} from "react"
import { useAppContext } from "@utils/appContext.js"
import { Path} from '@/components/line/pathUtils'
// import { SVGWrapper } from "./contextSVG"
import { usePageContext } from "@utils/pageContext"
import AnimateSVG from './AnimateSVG'

export default function Story2Pharma({scrollMin, scrollMax, speed}) {

    let {locale} = useAppContext();

    let [fakeScroll1, setFakeScroll1] = useState(0)

    let {mobile} = usePageContext()

    // // let [fillStyle1,setFillStyle1] = useState(false)
    // // let [strokeColor1, setStrokeColor1] = useState('#FFFAEA')

    // let [fakeScroll2,setFakeScroll2] = useState(0)
    // let [fillStyle2,setFillStyle2] = useState(false)
    // let [strokeColor2, setStrokeColor2] = useState('#FFFAEA')

    useEffect(()=>{
      let timer = setTimeout(()=>{setFakeScroll1(1)},2000)
        // let timer2 = setTimeout(()=>{setFillStyle(true)},2000)
      // let timer2 = setTimeout(()=>{setFakeScroll2(1)},1200)
      // let timer3 = setTimeout(()=>{setFillStyle2(true);setStrokeColor2('transparent')},3200)
      return ()=>{
        clearTimeout(timer)
        // clearTimeout(timer2)
        // clearTimeout(timer3)
      }
    },[])

    return (
        <AnimateSVG print={false} alt='Story Part 2, a medical staff caduceus illustrating Astrids doctorate in pharmacy'
        scrollMin={scrollMin} scrollMax={scrollMax} speed={speed} fakeScroll={[]}>
            {!mobile?<g id='desktop'>
            <Path drawDuration='1' position={0} scrolled={fakeScroll1} inverse={false} double={1} lengthFactor={1} id="fromAstrid1aMob" d="M574 511.623C586.334 521.557 623.44 552.279 669.003 543.413" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round"/>
            <Path drawDuration='0.5' position={0} inverse={false} double={1} lengthFactor={1} id="fromAstrid1bMob" d="M574 511.623C586.334 521.557 623.44 552.279 669.003 543.413" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round"/>
            <Path drawDuration='1' position={1} inverse={false} double={1} lengthFactor={1} id="fromAstrid2Mob" d="M669.003 543.413C717.504 533.975 693.503 479.833 747.005 469.402C800.506 458.971 819.507 513.113 874.508 497.715C929.51 482.317 948.5 444.5 948.5 397" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round"/>
            
            <Path drawDuration='2' animateFill={true} fastErase={true} animateStroke={true} id='SnakeMob' position={5} inverse={false} lengthFactor={1} d="M938.948 349.549C935.312 347.973 931.059 346.183 929.551 342.482C928.337 338.075 933.09 334.469 937.463 334.073C941.158 333.389 944.526 336.798 944.212 340.037C943.076 341.412 941.053 340.022 939.82 339.381C938.471 338.245 936.291 337.59 934.879 339.01C932.937 340.566 934.206 343.327 936.333 344.152C939.269 345.784 942.656 346.575 945.988 347.193C945.854 348.194 944.087 347.827 943.243 348.267C941.781 348.579 940.326 349.116 938.948 349.549ZM939.4 361.476C936.231 360.081 933.279 356.671 935.008 353.336C937.231 349.704 942.099 349.08 946.085 348.147C951.445 347.074 957.285 346.635 961.875 343.615C964.202 342.419 963.881 339.021 961.296 338.307C958.396 337.523 956.581 341.231 953.642 340.514C952.317 339.201 953.781 337.288 954.611 336.041C957.209 332.791 962.438 333.969 965.362 336.22C968.274 338.19 969.041 342.469 966.333 344.866C962.065 348.819 956.112 350.492 950.509 352.173C946.711 353.372 942.11 353.662 939.4 356.705L940.559 356.035C942.004 355.199 944.47 357.921 945.71 358.827C945.173 359.165 944.408 359.073 943.469 359.687C942.039 360.109 940.708 360.925 939.4 361.476ZM941.984 373.165C938.714 371.823 935.47 368.784 936.849 365.203C938.159 361.956 942.086 360.644 945.342 359.568C948.576 358.637 953.214 357.072 956.352 355.923C956.983 355.796 957.289 356.077 957.524 356.446C957.732 356.772 958.023 357.046 958.242 357.57C957.903 355.49 955.237 354.668 953.384 353.932C952.515 353.613 950.668 353.414 951.672 352.352C953.992 351.725 956.261 350.803 958.518 350.145C961.708 351.253 964.155 354.719 962.264 357.749C959.735 361.881 954.356 362.898 949.831 364.189C947.401 364.873 944.875 365.424 942.645 366.575C941.65 367.074 941.652 368.862 942.307 369.229C941.957 368.423 941.991 368.15 942.569 368.205C942.935 368.24 943.589 368.575 944.051 368.692C945.265 369 946.295 370.504 946.311 371.137C944.801 371.668 943.346 372.465 941.984 373.165ZM947.345 395.945C944.345 394.273 941.016 391.065 942.694 387.567C944.967 383.379 951.11 383.185 953.657 379.259C954.51 380.433 954.444 380.105 954.126 378.77C953.879 377.176 951.407 376.2 950.35 375.414C952.124 374.828 953.894 374.308 955.633 373.614C955.741 373.876 956.141 374.436 956.452 374.746C959.075 377.37 957.66 381.651 954.579 383.332C951.627 385.487 947.523 385.832 944.89 388.372C943.313 390.769 945.842 393.341 947.538 394.916C947.505 395.143 947.885 396.069 947.345 395.945ZM944.793 384.465C941.467 383.044 938.233 379.585 939.982 376.057C942.302 372.409 947.093 371.593 950.897 369.825C952.24 369.383 954.049 368.213 955.301 367.831C955.547 368.125 955.193 369.641 955.547 368.125C955.495 366.083 952.793 365.88 951.22 365.203C950.808 363.755 953.023 364.086 953.965 363.533C955.362 363.242 956.658 362.397 958.002 362.192C961.614 364.102 961.725 369.292 958.325 371.435C954.209 374.696 948.355 374.75 943.969 377.532C943.316 378.074 942.944 379.851 943.179 379.933C943.149 379.836 943.362 379.57 943.453 379.42C945.165 380.438 946.106 382.601 946.86 383.392C946.143 383.681 945.51 384.311 944.793 384.465ZM945.472 401.402C944.505 396.916 950.467 395.438 952.318 392.105C953.492 390.448 952.855 388.56 950.969 387.149C950.729 386.97 950.38 386.359 950.257 385.989C950.566 385.816 951.947 385.106 952.518 385.034C952.917 385.214 954.047 386.557 954.675 387.507C956.431 391.033 953.047 394.281 950.025 395.975C947.789 397.179 945.14 398.841 945.504 401.581L945.472 401.402ZM951.866 401.074C952.006 399.512 950.786 398.323 949.799 397.274C949.973 395.891 951.715 398.763 951.446 398.361C952.031 399.335 952.113 400.497 951.898 401.581L951.866 401.074Z" fill="#FFFAEA"/>
            <Path drawDuration='2' animateFill={true} fastErase={true} animateStroke={true} id="TailstartMob" position={1} inverse={true} lengthFactor={1} d="M948.309 397.582L949.176 397.151L948.749 405.739L948.309 397.582Z" fill="#FFFAEA"/>
            <Path drawDuration='2' animateFill={true} fastErase={true} animateStroke={true} id='PoleWingsMob' position={6} inverse={false} lengthFactor={1} d="M946.615 347.414L946.356 322.665C944.984 322.818 943.691 323.944 944.033 325.465C944.528 328.056 942.656 331.634 939.656 331.119C940.189 328.17 941.04 325.157 941.512 322.248C940.756 322.117 940.981 323.586 940.64 324.156C939.891 326.49 939.703 329.048 938.542 331.223C937.48 332.997 935.128 334.015 933.162 333.178C934.255 330.58 935.668 328.04 936.894 325.468C937.51 324.088 938.375 322.754 938.818 321.336C938.149 321.002 937.998 322.401 937.572 322.844C935.808 325.989 934.23 329.25 932.341 332.318C930.76 334.329 927.474 334.93 925.455 333.288C929.137 328.853 932.813 324.405 936.543 320.013C935.443 319.77 934.567 321.922 933.568 322.665C930.618 325.812 927.943 329.25 924.817 332.207C922.602 333.719 919.226 333.25 917.594 331.119C923.254 326.83 928.91 322.524 934.537 318.192C933.839 317.599 932.885 319.175 932.083 319.445C927.209 322.86 922.43 326.426 917.486 329.732C914.689 330.946 911.29 329.437 909.929 326.803C917.555 323.149 925.352 319.708 932.987 316.047C932.58 315.414 931.709 316.33 931.114 316.434C924.45 319.206 917.842 322.127 911.156 324.842C907.757 326.102 903.794 323.686 903.212 320.161C905.195 319.424 907.502 319.174 909.606 318.61C917.025 316.968 924.445 315.324 931.857 313.661C931.862 312.775 930.127 313.763 929.435 313.691C921.058 315.253 912.688 316.85 904.31 318.402C900.246 319.031 896.186 315.121 897.141 310.977H934.602C934.8 316.654 940.965 320.723 946.357 319.654C949.834 319.098 953.526 320.534 956.852 318.968C960.073 317.655 962.643 314.523 962.762 310.977H1000.22C1001.18 315.118 997.119 319.031 993.054 318.402C983.902 316.698 974.752 314.974 965.604 313.244C965.039 313.976 966.859 313.805 967.348 314.079C976.26 316.071 985.184 318.018 994.087 320.041C993.817 323.399 990.007 325.91 986.724 324.991C983.448 323.866 980.317 322.322 977.101 321.026C972.93 319.278 968.783 317.47 964.603 315.749C964.074 316.346 965.592 316.467 965.992 316.822C973.112 320.19 980.339 323.404 987.435 326.803C985.874 330.024 981.172 331.336 978.45 328.808C973.323 325.177 968.217 321.515 963.081 317.898C962.843 318.867 965.006 319.579 965.733 320.429C970.408 323.998 975.081 327.574 979.771 331.12C977.676 333.885 972.894 333.683 970.997 330.716C967.712 327.061 964.468 323.365 961.148 319.743C960.559 320.429 962.31 321.379 962.665 322.188C965.745 325.889 968.846 329.573 971.908 333.287C969.396 335.316 965.309 333.892 964.183 330.955C962.388 327.701 960.694 324.382 958.83 321.174C958.164 321.65 959.181 322.526 959.34 323.172C960.954 326.467 962.596 329.748 964.215 333.042C963.089 333.937 961.025 333.395 959.922 332.445C957.694 330.657 957.837 327.538 956.949 325.051C956.636 324.144 956.557 322.837 956.078 322.188C955.454 322.612 956.351 323.86 956.304 324.603C956.763 326.775 957.304 328.948 957.708 331.119C954.732 331.632 952.837 328.093 953.33 325.508C953.674 323.977 952.404 322.814 951.007 322.665L950.749 346.877L950.212 346.928L949.328 347.116C948.502 347.072 947.161 347.721 946.615 347.414Z" fill="#FFFAEA"/>
            <Path drawDuration='2' animateFill={true} fastErase={true} animateStroke={true} id='Tail3Mob' position={5} inverse={false} lengthFactor={1} d="M946.809 353.676C946.844 353.676 946.873 353.663 946.873 353.646L950.555 352.662L950.5 357.575L946.905 358.626H946.809L946.809 353.676Z" fill="#FFFAEA"/>
            <Path drawDuration='2' animateFill={true} fastErase={true} animateStroke={true} id='Tail2Mob' position={4} inverse={false} lengthFactor={1} d="M947.131 370.764L947.025 365.426L950.361 364.589L950.21 369.591L947.131 370.764Z" fill="#FFFAEA"/>
            <Path drawDuration='2' animateFill={true} fastErase={true} animateStroke={true} id='Tail1Mob' position={3} inverse={false} lengthFactor={1} d="M947.609 383.017L947.383 376.47L950.03 375.58L949.776 381.873L947.609 383.017Z" fill="#FFFAEA"/>
            <Path drawDuration='2' animateFill={true} fastErase={true} animateStroke={true} id="Tail0Mob" position={2} inverse={false} lengthFactor={1} d="M949.613 386.297L949.184 394.632L948.126 395.421L947.766 387.012L949.613 386.297Z" fill="#FFFAEA"/>
            <Path drawDuration='2' animateFill={true} fastErase={true} animateStroke={true} id="HeadMob" position={6} inverse={false} lengthFactor={1} d="M956.356 311.996C956.356 313.851 955.547 315.63 954.108 316.942C952.669 318.254 950.717 318.991 948.682 318.991C946.646 318.991 944.694 318.254 943.255 316.942C941.816 315.63 941.008 313.851 941.008 311.996C941.008 310.14 941.816 308.361 943.255 307.049C944.694 305.737 946.646 305 948.682 305C950.717 305 952.669 305.737 954.108 307.049C955.547 308.361 956.356 310.14 956.356 311.996Z" fill="#FFFAEA"/>
            </g>:<g id='mobile'>
            <Path drawDuration='1' position={0} scrolled={fakeScroll1} inverse={false} double={1} lengthFactor={1} id="fromAstrid1a" d="M348 794.5C360.334 804.434 399 805.5 431.5 788.5" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round"/>
            <Path drawDuration='0.5' position={0} inverse={false} double={1} lengthFactor={1} id="fromAstrid1b" d="M348 794.5C360.334 804.434 399 805.5 431.5 788.5" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round"/>
            <Path drawDuration='1' position={1} inverse={false} double={1} lengthFactor={1} id="fromAstrid2" d="M431.5 788.5C458 775.5 473.5 750.246 470.5 702.246" stroke="#FFFAEA" stroke-width="2" stroke-linecap="round"/>
            
            <Path drawDuration='2' animateFill={true} fastErase={true} animateStroke={true} id='Snake' position={5} inverse={false} lengthFactor={1}  d="M460.948 667.295C457.312 665.719 453.059 663.929 451.551 660.228C450.337 655.821 455.09 652.215 459.463 651.819C463.158 651.135 466.526 654.544 466.212 657.783C465.076 659.158 463.053 657.768 461.82 657.127C460.471 655.991 458.291 655.336 456.879 656.756C454.937 658.313 456.206 661.073 458.333 661.898C461.269 663.53 464.656 664.321 467.988 664.939C467.854 665.94 466.087 665.573 465.243 666.013C463.781 666.325 462.326 666.862 460.948 667.295ZM461.4 679.222C458.231 677.827 455.279 674.417 457.008 671.082C459.231 667.45 464.099 666.826 468.085 665.893C473.445 664.82 479.285 664.381 483.875 661.361C486.202 660.165 485.881 656.767 483.296 656.053C480.396 655.269 478.581 658.977 475.642 658.26C474.317 656.947 475.781 655.035 476.611 653.787C479.209 650.537 484.438 651.716 487.362 653.966C490.274 655.936 491.041 660.215 488.333 662.612C484.065 666.565 478.112 668.238 472.509 669.919C468.711 671.118 464.11 671.408 461.4 674.451L462.559 673.781C464.004 672.945 466.47 675.667 467.71 676.573C467.173 676.911 466.408 676.819 465.469 677.433C464.039 677.855 462.708 678.671 461.4 679.222ZM463.984 690.911C460.714 689.57 457.47 686.53 458.849 682.949C460.159 679.702 464.086 678.39 467.342 677.314C470.576 676.383 475.214 674.818 478.352 673.669C478.983 673.542 479.289 673.823 479.524 674.192C479.732 674.518 480.023 674.792 480.242 675.316C479.903 673.236 477.237 672.414 475.384 671.678C474.515 671.359 472.668 671.16 473.672 670.098C475.992 669.471 478.261 668.549 480.518 667.891C483.708 668.999 486.155 672.465 484.264 675.495C481.735 679.627 476.356 680.644 471.831 681.935C469.401 682.619 466.875 683.17 464.645 684.321C463.65 684.82 463.652 686.608 464.307 686.975C463.957 686.169 463.991 685.897 464.569 685.951C464.935 685.986 465.589 686.321 466.051 686.438C467.265 686.746 468.295 688.25 468.311 688.883C466.801 689.414 465.346 690.211 463.984 690.911ZM469.345 713.691C466.345 712.02 463.016 708.811 464.694 705.313C466.967 701.125 473.11 700.931 475.657 697.005C476.51 698.179 476.444 697.851 476.126 696.516C475.879 694.922 473.407 693.946 472.35 693.161C474.124 692.574 475.894 692.055 477.633 691.36C477.741 691.622 478.141 692.182 478.452 692.492C481.075 695.116 479.66 699.397 476.579 701.079C473.627 703.233 469.523 703.578 466.89 706.118C465.313 708.515 467.842 711.087 469.538 712.662C469.505 712.889 469.885 713.815 469.345 713.691ZM466.793 702.212C463.467 700.79 460.233 697.331 461.982 693.803C464.302 690.155 469.093 689.339 472.897 687.571C474.24 687.129 476.049 685.959 477.301 685.577C477.547 685.871 477.193 687.387 477.547 685.871C477.495 683.829 474.793 683.626 473.22 682.949C472.808 681.501 475.023 681.832 475.965 681.279C477.362 680.989 478.658 680.143 480.002 679.938C483.614 681.849 483.725 687.038 480.325 689.181C476.209 692.442 470.355 692.496 465.969 695.278C465.316 695.82 464.944 697.597 465.179 697.679C465.149 697.582 465.362 697.316 465.453 697.166C467.165 698.184 468.106 700.347 468.86 701.138C468.143 701.427 467.51 702.057 466.793 702.212ZM467.472 719.148C466.505 714.663 472.467 713.185 474.318 709.852C475.492 708.194 474.855 706.306 472.969 704.895C472.729 704.716 472.38 704.105 472.257 703.735C472.566 703.562 473.947 702.852 474.518 702.78C474.917 702.96 476.047 704.303 476.675 705.253C478.431 708.779 475.047 712.027 472.025 713.721C469.789 714.925 467.14 716.587 467.504 719.327L467.472 719.148ZM473.866 718.82C474.006 717.258 472.786 716.069 471.799 715.021C471.973 713.637 473.715 716.509 473.446 716.107C474.031 717.081 474.113 718.243 473.898 719.327L473.866 718.82Z" fill="#FFFAEA"/>
            <Path drawDuration='2' animateFill={true} fastErase={true} animateStroke={true} id="Tailstart" position={1} inverse={true} lengthFactor={1}  d="M470.309 715.328L471.176 714.898L470.749 723.485L470.309 715.328Z" fill="#FFFAEA"/>
            <Path drawDuration='2' animateFill={true} fastErase={true} animateStroke={true} id='PoleWings' position={6} inverse={false} lengthFactor={1}  d="M468.615 665.16L468.356 640.411C466.984 640.564 465.691 641.69 466.033 643.211C466.528 645.802 464.656 649.381 461.656 648.865C462.189 645.917 463.04 642.903 463.512 639.994C462.756 639.864 462.981 641.332 462.64 641.902C461.891 644.236 461.703 646.795 460.542 648.969C459.48 650.744 457.128 651.761 455.162 650.924C456.255 648.326 457.668 645.786 458.894 643.214C459.51 641.834 460.375 640.5 460.818 639.082C460.149 638.748 459.998 640.148 459.572 640.59C457.808 643.735 456.23 646.997 454.341 650.064C452.76 652.075 449.474 652.676 447.455 651.034C451.137 646.599 454.813 642.151 458.543 637.759C457.443 637.517 456.567 639.668 455.568 640.411C452.618 643.558 449.943 646.996 446.817 649.953C444.602 651.465 441.226 650.996 439.594 648.865C445.254 644.576 450.91 640.27 456.537 635.938C455.839 635.345 454.885 636.921 454.083 637.191C449.209 640.606 444.43 644.172 439.486 647.478C436.689 648.692 433.29 647.183 431.929 644.549C439.555 640.895 447.352 637.454 454.987 633.793C454.58 633.16 453.709 634.076 453.114 634.181C446.45 636.952 439.842 639.873 433.156 642.588C429.757 643.848 425.794 641.432 425.212 637.907C427.195 637.17 429.502 636.92 431.606 636.356C439.025 634.714 446.445 633.07 453.857 631.407C453.862 630.521 452.127 631.509 451.435 631.437C443.058 632.999 434.688 634.596 426.31 636.148C422.246 636.777 418.186 632.867 419.141 628.723H456.602C456.8 634.4 462.965 638.469 468.357 637.4C471.834 636.844 475.526 638.28 478.852 636.714C482.073 635.401 484.643 632.269 484.762 628.723H522.223C523.176 632.864 519.119 636.778 515.054 636.148C505.902 634.444 496.752 632.72 487.604 630.99C487.039 631.722 488.859 631.551 489.348 631.825C498.26 633.817 507.184 635.764 516.087 637.787C515.817 641.145 512.007 643.656 508.724 642.737C505.448 641.612 502.317 640.068 499.101 638.772C494.93 637.024 490.783 635.216 486.603 633.495C486.074 634.092 487.592 634.213 487.992 634.568C495.112 637.936 502.339 641.15 509.435 644.549C507.874 647.77 503.172 649.082 500.45 646.554C495.323 642.923 490.217 639.262 485.081 635.644C484.843 636.613 487.006 637.326 487.733 638.175C492.408 641.744 497.081 645.321 501.771 648.866C499.676 651.631 494.894 651.429 492.997 648.462C489.712 644.807 486.468 641.111 483.148 637.489C482.559 638.175 484.31 639.125 484.665 639.934C487.745 643.635 490.846 647.32 493.908 651.034C491.396 653.062 487.309 651.638 486.183 648.701C484.388 645.447 482.694 642.128 480.83 638.92C480.164 639.396 481.181 640.272 481.34 640.918C482.954 644.213 484.596 647.494 486.215 650.788C485.089 651.683 483.025 651.141 481.922 650.192C479.694 648.403 479.837 645.284 478.949 642.797C478.636 641.89 478.557 640.583 478.078 639.934C477.454 640.358 478.351 641.606 478.304 642.349C478.763 644.521 479.304 646.694 479.708 648.865C476.732 649.378 474.837 645.839 475.33 643.254C475.674 641.723 474.404 640.561 473.007 640.411L472.749 664.624L472.212 664.674L471.328 664.862C470.502 664.818 469.161 665.467 468.615 665.16Z" fill="#FFFAEA"/>
            <Path drawDuration='2' animateFill={true} fastErase={true} animateStroke={true} id='Tail3' position={5} inverse={false} lengthFactor={1} d="M468.809 671.422C468.844 671.422 468.873 671.409 468.873 671.392L472.555 670.408L472.5 675.321L468.905 676.372H468.809L468.809 671.422Z" fill="#FFFAEA"/>
            <Path drawDuration='2' animateFill={true} fastErase={true} animateStroke={true} id='Tail2' position={4} inverse={false} lengthFactor={1} d="M469.131 688.51L469.025 683.172L472.361 682.335L472.21 687.337L469.131 688.51Z" fill="#FFFAEA"/>
            <Path drawDuration='2' animateFill={true} fastErase={true} animateStroke={true} id='Tail1' position={3} inverse={false} lengthFactor={1}  d="M469.609 700.763L469.383 694.217L472.03 693.326L471.776 699.619L469.609 700.763Z" fill="#FFFAEA"/>
            <Path drawDuration='2' animateFill={true} fastErase={true} animateStroke={true} id="Tail0" position={2} inverse={false} lengthFactor={1} d="M471.613 704.043L471.184 712.378L470.126 713.167L469.766 704.759L471.613 704.043Z" fill="#FFFAEA"/>
            <Path drawDuration='2' animateFill={true} fastErase={true} animateStroke={true} id="Head" position={6} inverse={false} lengthFactor={1} d="M478.356 629.742C478.356 631.597 477.547 633.376 476.108 634.688C474.669 636 472.717 636.737 470.682 636.737C468.646 636.737 466.694 636 465.255 634.688C463.816 633.376 463.008 631.597 463.008 629.742C463.008 627.886 463.816 626.107 465.255 624.795C466.694 623.483 468.646 622.746 470.682 622.746C472.717 622.746 474.669 623.483 476.108 624.795C477.547 626.107 478.356 627.886 478.356 629.742Z" fill="#FFFAEA"/>
            </g>}
        </AnimateSVG>

    )
  }