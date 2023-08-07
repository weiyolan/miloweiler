// import { usePageContext } from '@/utils/pageContext'
import React, { useEffect } from 'react'

export default function LogoAnimated({ className, darkMode, transitionTl }) {
  // let {darkMode} = usePageContext();
  let fill = darkMode ? '#FFF5EA' : '#000'


  useEffect(() => {
    transitionTl && transitionTl
      .to(['.rayMaskCircle2'], {
        r: 1109,
        stagger: { amount: 1, ease: 'power2.in' },
        // stagger: 0.10,
        duration: 1.5,
      }, 1)

  }, [transitionTl])


  return (
    <svg className={className} viewBox="0 0 1924 1398" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Logo">
        {/* id="sunMoon */}
        <path d="M745.088 1091.08C752.081 1021.73 784.297 956.487 836.892 905.166C862.97 879.719 888.805 861.584 922.767 844.885C1026.53 793.866 1147.46 800.428 1240.07 862.104C1261.93 876.661 1286.81 899.122 1300.76 916.902C1304.15 921.213 1307.32 924.74 1307.81 924.74C1308.86 924.74 1313.58 897.591 1315.34 881.427C1317.17 864.647 1316.83 824.628 1314.71 806.729C1307.1 742.555 1284.76 686.775 1245.37 633.594C1232.95 616.837 1198.7 581.962 1182.18 569.266C1114.83 517.5 1034.81 491.441 952.917 494.605C927.788 495.576 925.652 495.801 902.668 499.891C829.772 512.862 767.192 545.731 714.217 598.872C662.993 650.257 629.312 715.734 616.98 787.904C601.359 879.32 623.869 976.946 677.79 1051.64C692.365 1071.83 722.27 1104.06 738.102 1116.65L743.127 1120.65L743.412 1112.77C743.568 1108.44 744.323 1098.68 745.088 1091.08ZM1004.43 1196.54C1052.21 1191.01 1098.57 1175.86 1140.09 1152.2C1190.04 1123.75 1237.06 1077.67 1266.75 1028.09C1267.75 1026.42 1259.37 1015.91 1248.02 1004.6C1193.78 950.55 1112.4 929.459 1034.38 949.237C994.863 959.256 958.309 979.636 928.598 1008.22C883.679 1051.42 859.328 1108.11 859.328 1169.46C859.328 1180.57 859.606 1182.16 861.748 1183.31C868.657 1187.01 904.268 1194.16 932.817 1197.6C943.816 1198.92 989.714 1198.24 1004.43 1196.54ZM1016.36 1379.85C988.696 1372.35 967.78 1363.24 946.871 1349.6C891.316 1313.34 856.597 1258.27 848.58 1193.68C838.601 1113.28 874.442 1031.77 942.239 980.659C978.039 953.672 1023.16 935.48 1064.72 931.278C1076.43 930.095 1111.53 930.145 1122.39 931.361C1153.68 934.865 1186.83 946.166 1214.26 962.68C1294.94 1011.26 1334.63 1100.83 1316.5 1193.4C1314.1 1205.67 1307.13 1228.01 1302.31 1238.91C1301.17 1241.5 1300.49 1243.62 1300.8 1243.62C1301.81 1243.62 1314.97 1221.7 1320.09 1211.49C1332.86 1186.03 1342.78 1154.74 1347.53 1124.98C1350.62 1105.64 1350.65 1065.99 1347.58 1047.14C1341.2 1007.89 1327.99 973.434 1306.97 941.205C1265.01 876.886 1194.01 832.464 1113.09 819.906C1094.6 817.038 1056.22 816.054 1037.32 817.965C941.52 827.649 856.448 877.568 804.2 954.759C749.481 1035.6 739.172 1132.13 776.043 1218.41C808.194 1293.64 876.898 1351.2 960.411 1372.87C979.652 1377.86 1006.68 1382.02 1023.89 1382.63C1025.62 1382.7 1022.23 1381.44 1016.36 1379.85ZM1004.42 1397.1C993.332 1396.23 967.555 1391.35 953.126 1387.4C904.35 1374.04 860.711 1348.93 825.404 1313.92C778.631 1267.55 751.387 1210.7 744.934 1146.02L743.401 1130.64L737.611 1125.97C726.243 1116.8 699.276 1089.6 688.352 1076.29C632.936 1008.78 604.363 929.278 604.327 842.509C604.286 743.446 642.297 651.734 712.297 582.005C772.025 522.507 845.656 487.238 932.817 476.375C948.829 474.379 994.335 474.387 1010.7 476.388C1048.34 480.989 1079.08 488.856 1112 502.311C1262.59 563.853 1354.79 718.378 1337.82 880.8C1336.04 897.846 1332.36 918.053 1327.89 935.231C1325.43 944.719 1324.45 950.621 1325.2 951.543C1327.72 954.667 1340.7 981.593 1344.79 992.186C1350.79 1007.7 1356.23 1027.95 1359.39 1046.52C1362.46 1064.57 1363.64 1100.88 1361.71 1118.08C1359.02 1142.1 1352.54 1169.74 1344.78 1190.35C1328.3 1234.11 1289.88 1279.42 1246.39 1306.38C1240.65 1309.94 1235.68 1312.57 1235.34 1312.23C1235 1311.89 1235.88 1311 1237.3 1310.24C1241.86 1307.8 1261.25 1284.84 1270.77 1270.61C1311.39 1209.93 1319.56 1135.57 1292.69 1071.06C1286.49 1056.18 1280.16 1044.74 1278.88 1046.12C1278.36 1046.68 1273.2 1053.45 1267.43 1061.15C1231.96 1108.43 1188.61 1144.85 1137.29 1170.47C1084.42 1196.87 1030.45 1209.71 972.388 1209.71C935.181 1209.71 903.816 1205.17 863.496 1193.92C861.301 1193.31 860.851 1193.62 861.239 1195.48C861.506 1196.75 862.641 1202.6 863.762 1208.47C868.097 1231.16 879.985 1259.67 893.597 1280C933.518 1339.64 1000.07 1374.19 1075.03 1374.19C1091.4 1374.19 1115.44 1371.95 1122.65 1369.75C1128.98 1367.82 1109.69 1376.95 1099.06 1380.92C1070.47 1391.58 1027.56 1398.92 1004.42 1397.1Z" fill={fill} />
        <g id="Mask group">
          <mask id="mask0_209_615" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-147" y="-271" width="2218" height="2218">
            <circle className='rayMaskCircle2' id="rayMask" cx="962" cy="838" r="400" fill={fill} />
          </mask>
          <g mask="url(#mask0_209_615)">
            {/* id="ray1" */}
            <path d="M241.892 1093.76C273.215 1077.43 307.357 1067.67 339.97 1054.34C385.047 1036.85 430.126 1019.24 475.256 1001.88C499.652 993.062 524.027 984.142 548.249 974.888C555.627 973.332 578.902 965.604 576.052 977.951C568.863 985.668 559.237 988.114 549.131 992.778C530.524 1000.26 511.503 1006.69 493.298 1015.13C474.458 1021.97 455.952 1029.76 437.1 1036.61C427.504 1041.47 416.703 1044.03 406.553 1048.31C390.055 1054.09 373.858 1060.62 357.465 1066.6C342.059 1072.73 326.361 1078.28 310.669 1083.54C298.521 1088.35 284.995 1095.44 271.744 1099.79C259.166 1103.08 246.526 1111.8 233.298 1108.64C227.858 1103.54 238.115 1096.17 241.892 1093.76Z" fill={fill} />
          </g>
        </g>
        <g id="Mask group_2">
          <mask id="mask1_209_615" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-147" y="-271" width="2218" height="2218">
            <circle className='rayMaskCircle2' id="rayMask_2" cx="962" cy="838" r="400" fill={fill} />
          </mask>
          <g mask="url(#mask1_209_615)">
            {/* id="ray2" */}
            <g >
              <path d="M6.34975 850.95C0.257082 850.06 -2.21553 841.825 2.36592 837.681C5.80336 834.573 13.3028 834.973 15.7002 838.394C20.4882 845.225 15.2566 852.251 6.34975 850.95Z" fill={fill} />
              <path d="M35.2428 849.849C29.9394 847.811 28.6696 841.161 32.8594 837.368C35.2021 835.247 37.9801 834.929 57.4166 834.558C82.6668 834.076 85.4919 834.863 85.4919 842.384C85.4919 849.509 83.8246 850.012 59.2354 850.307C47.0758 850.454 36.2792 850.247 35.2428 849.849Z" fill={fill} />
              <path d="M100.188 847.178C94.9375 841.38 99.3742 833.898 107.658 834.579C111.572 834.901 112.816 835.674 114.247 838.671C115.765 841.851 115.761 842.812 114.217 845.576C111.851 849.807 103.439 850.768 100.188 847.178Z" fill={fill} />
              <path d="M129.962 848.453C125.339 845.368 125.423 836.939 130.095 835.147C133.511 833.837 140.155 834.24 141.771 835.855C144.059 838.142 143.589 844.977 140.981 847.336C138.624 849.468 132.425 850.096 129.962 848.453Z" fill={fill} />
              <path d="M196.917 845.922C191.677 840.136 196.104 832.64 204.357 833.324C208.063 833.631 209.588 834.504 211.075 837.173C212.803 840.274 212.803 840.978 211.075 844.078C208.584 848.547 200.274 849.629 196.917 845.922Z" fill={fill} />
              <path d="M221.864 845.368C217.546 839.208 221.061 833.093 228.92 833.093C236.518 833.093 240.485 841.299 235.198 846.081C231.761 849.19 224.261 848.789 221.864 845.368Z" fill={fill} />
              <path d="M315.43 842.9C312.064 839.289 312.188 835.426 315.776 832.056C321.537 826.648 330.456 830.286 330.456 838.044C330.456 845.077 320.469 848.305 315.43 842.9Z" fill={fill} />
              <path d="M339.195 842.442C336.766 839.517 337.201 833.331 339.983 831.227C343.623 828.474 351.437 828.791 353.024 831.755C355.013 835.469 354.575 840.787 352.126 842.644C349.081 844.954 341.178 844.831 339.195 842.442Z" fill={fill} />
              <path d="M377.565 842.547C376.874 842.302 374.851 841.783 373.069 841.393C366.427 839.943 366.087 830.523 372.588 828.053C374.379 827.373 385.66 826.816 397.657 826.816C421.596 826.816 423.417 827.341 423.417 834.244C423.417 840.773 420.932 841.593 398.921 842.325C387.866 842.693 378.256 842.793 377.565 842.547Z" fill={fill} />
              <path d="M437.807 838.799C436.111 837.105 434.723 834.819 434.723 833.721C434.723 830.412 440.549 825.56 444.521 825.56C449.126 825.56 452.31 829.036 452.31 834.062C452.31 841.492 443.41 844.399 437.807 838.799Z" fill={fill} />
              <path d="M502.651 837.318C499.278 833.032 499.369 831.146 503.131 827.387C508.831 821.691 517.635 824.699 517.635 832.342C517.635 840.531 507.761 843.81 502.651 837.318Z" fill={fill} />
            </g>
          </g>
        </g>
        <g id="Mask group_3">
          <mask id="mask2_209_615" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-147" y="-271" width="2218" height="2218">
            <circle className='rayMaskCircle2' id="rayMask_3" cx="962" cy="838" r="400" fill={fill} />
          </mask>
          <g mask="url(#mask2_209_615)">
            {/* id="ray3"  */}
            <path d="M559.09 668.353C549.558 666.573 539.702 661.247 529.957 658.178C512.414 651.012 494.355 645.223 476.934 637.767C459.493 632.462 443.235 623.857 425.93 618.158C399.847 607.536 373.969 596.406 347.545 586.678C335.909 582.566 326.267 575.506 316.372 573.758C299.106 568.011 281.789 561.542 265.707 553.318C257.723 549.397 255.298 536.645 267.336 539.508C291.406 541.869 312.618 554.631 335.065 562.553C368.396 575.683 401.768 588.677 435.205 601.56C459.289 610.949 483.423 620.268 507.291 630.232C524.724 637.512 542.359 644.408 559.743 651.729C568.415 653.941 578.705 671.315 562.799 668.991L561.03 668.737L559.09 668.353Z" fill={fill} />
          </g>
        </g>
        <g id="Mask group_4">
          <mask id="mask3_209_615" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-147" y="-271" width="2218" height="2218">
            <circle className='rayMaskCircle2' id="rayMask_4" cx="962" cy="838" r="400" fill={fill} />
          </mask>
          <g mask="url(#mask3_209_615)">
            {/* id="ray4" */}
            <path d="M635.975 520.169C633.066 516.667 632.91 511.999 635.611 509.3C639.144 505.768 647.643 505.651 649.494 509.109C651.479 512.814 651.05 517.359 648.497 519.668C645.794 522.113 637.853 522.431 635.975 520.169Z" fill={fill} />
            <path d="M616.442 501.874C611.462 496.375 617.137 486.759 624.359 488.46C628.16 489.354 631.951 493.483 631.951 496.728C631.951 502.927 620.759 506.641 616.442 501.874Z" fill={fill} />
            <path d="M585.212 469.342C576.315 460.544 568.713 452.066 568.321 450.501C567.322 446.526 570.96 441.398 574.778 441.398C578.735 441.398 586.645 448.295 604.628 467.425C612.359 475.649 613.334 478.836 609.339 482.828C604.657 487.506 602.182 486.123 585.212 469.342Z" fill={fill} />
            <path d="M515.402 406.802C513.451 405.437 512.61 403.567 512.61 400.596C512.61 393.352 520.579 389.961 526.446 394.709C534.691 401.381 524.148 412.925 515.402 406.802Z" fill={fill} />
            <path d="M494.193 385.069C487.021 379.341 469.992 361.875 466.862 357.036C464.957 354.092 464.89 353.192 466.351 350.132C467.619 347.475 469.071 346.513 472.275 346.206C476.231 345.828 477.661 346.941 493.308 362.578C502.542 371.806 510.097 380.347 510.097 381.559C510.097 384.223 504.648 389.925 502.102 389.925C501.096 389.925 497.537 387.74 494.193 385.069Z" fill={fill} />
            <path d="M420.151 314.757C412.888 309.408 389.499 285.129 389.499 282.938C389.499 279.579 395.865 274.284 398.801 275.201C404.783 277.067 434.723 306.431 434.723 310.431C434.723 314.127 431.095 318.365 427.931 318.365C426.347 318.365 422.846 316.742 420.151 314.757Z" fill={fill} />
            <path d="M371.355 269.124C368.67 265.292 368.903 262.43 372.149 259.409C375.613 256.184 382.91 255.981 385.238 259.046C387.63 262.195 387.364 267.417 384.689 269.836C381.252 272.945 373.752 272.544 371.355 269.124Z" fill={fill} />
            <path d="M317.58 218.149C315.68 216.897 307.624 209.576 299.679 201.88C284.143 186.832 282.687 183.991 287.981 179.062C293.206 174.198 294.4 174.907 316.424 195.961C330.414 209.336 331.929 212.541 326.957 218.245C324.52 221.041 321.927 221.014 317.58 218.149Z" fill={fill} />
          </g>
        </g>
        <mask id="mask4_209_615" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-147" y="-271" width="2218" height="2218">
          <circle className='rayMaskCircle2' id="rayMask_5" cx="962" cy="838" r="400" fill={fill} />
        </mask>
        {/* id="ray5" */}
        <g mask="url(#mask4_209_615)">
          <path d="M812.374 441.034C801.844 433.011 799.421 419.494 793.814 408.25C781.39 379.822 769.528 351.161 757.851 322.426C745.612 294.035 735.447 264.797 722.971 236.503C715.796 215.053 705.048 195.05 697.241 173.847C695.009 164.765 684.114 145.032 697.399 144.613C708.561 144.26 710.49 162.49 715.672 171.752C726.292 196.535 735.676 221.791 746.438 246.479C756.435 271.091 767.178 295.422 776.966 320.139C788.636 346.898 799.048 374.2 809.532 401.446C813.534 412.215 819.15 422.659 821.477 434.131C823.634 439.629 816.835 443.363 812.374 441.034Z" fill={fill} />
        </g>

        <mask id="mask5_209_615" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-147" y="-271" width="2218" height="2218">
          <circle className='rayMaskCircle2' id="rayMask_6" cx="962" cy="838" r="400" fill={fill} />
        </mask>
        {/* id="ray6" */}
        <g mask="url(#mask5_209_615)">
          <path d="M1030.69 392.452C1024.84 391.137 1023.89 390.166 1023.89 385.457C1023.89 380.552 1027.5 376.115 1031.49 376.115C1032.9 376.115 1035.5 377.556 1037.26 379.317C1039.75 381.806 1040.28 383.273 1039.64 385.908C1038.35 391.187 1035.23 393.47 1030.69 392.452Z" fill={fill} />
          <path d="M1030.6 369.839C1027.09 368.423 1025.99 364.812 1027.71 360.299C1029.36 355.972 1030.98 354.817 1035.44 354.791C1039.19 354.771 1042.74 358.731 1042.74 362.932C1042.74 369.369 1037.22 372.508 1030.6 369.839Z" fill={fill} />
          <path d="M1034.82 350.1C1030.01 349.377 1028.33 344.807 1030.75 339.019C1032.39 335.098 1033.04 334.685 1037.6 334.685C1043.05 334.685 1045.25 336.926 1045.25 342.484C1045.25 345.995 1041.95 351.082 1039.84 350.818C1039.01 350.714 1036.76 350.391 1034.82 350.1Z" fill={fill} />
          <path d="M1042.11 302.392C1038.13 301.415 1036.46 299.486 1036.46 295.893C1036.46 290.532 1039.73 286.98 1044.66 286.98C1050.06 286.98 1053.52 291.434 1052.2 296.693C1050.63 302.93 1048.71 304.014 1042.11 302.392Z" fill={fill} />
          <path d="M1041.82 277.877C1039.34 274.714 1039.28 270.364 1041.43 250.686C1043.8 229.009 1045.5 224.207 1050.79 224.207C1052.43 224.207 1055.08 225.275 1056.7 226.58L1059.63 228.953L1057.53 249.698C1056.37 261.107 1054.58 272.468 1053.54 274.944C1051.9 278.869 1051.11 279.446 1047.35 279.446C1044.98 279.446 1042.49 278.74 1041.82 277.877Z" fill={fill} />
          <path d="M1049.44 219.188C1045.93 217.772 1044.84 214.16 1046.55 209.648C1048.19 205.348 1049.82 204.166 1054.16 204.14C1060.63 204.102 1063.73 211.788 1059.63 217.651C1057.6 220.545 1054.12 221.071 1049.44 219.188Z" fill={fill} />
          <path d="M1060.33 163.665C1055.24 162.268 1054.09 160.876 1054.06 156.1C1054.04 151.838 1058.04 147.626 1062.12 147.626C1066.34 147.626 1070.76 153.418 1069.74 157.615C1068.4 163.104 1065.37 165.051 1060.33 163.665Z" fill={fill} />
          <path d="M1066.47 104.111C1062.73 103.114 1061.52 98.1622 1063.87 93.4727C1068.33 84.5482 1080.66 89.1518 1078.27 98.853C1076.87 104.573 1073.62 106.021 1066.47 104.111Z" fill={fill} />
          <path d="M1068.58 77.8607C1065.58 74.8601 1066.04 67.8161 1069.4 65.4672C1075.48 61.2075 1082.94 64.6241 1082.94 71.6732C1082.94 78.6754 1073.48 82.7531 1068.58 77.8607Z" fill={fill} />
          <path d="M1071.67 52.2963C1069.74 48.6808 1070.06 43.3954 1073.46 22.669C1076.04 6.89654 1076.99 3.51443 1079.34 1.60537C1084.09 -2.24248 1091.73 1.28563 1091.73 7.32536C1091.73 13.6892 1085.14 49.3629 1083.5 51.8605C1081.04 55.6132 1073.6 55.8874 1071.67 52.2963Z" fill={fill} />
        </g>
        <mask id="mask6_209_615" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-147" y="-271" width="2218" height="2218">
          <circle className='rayMaskCircle2' id="rayMask_7" cx="962" cy="838" r="400" fill={fill} />
        </mask>
        {/* id="ray7" */}
        <g mask="url(#mask6_209_615)">
          <path d="M1214.4 481.988C1209.16 471.572 1221.18 460.539 1225.42 451.037C1255.44 407.945 1286.56 365.621 1316.6 322.536C1341.63 287.214 1366.34 251.582 1393.23 217.657C1396.82 210.397 1412.12 205.548 1408.43 218.601C1405.32 230.441 1395.75 238.99 1390.54 249.827C1381.26 261.788 1372.13 273.965 1364.53 287.008C1355.31 298.864 1347.71 311.943 1337.78 323.253C1331.86 333.165 1325.06 342.829 1317.69 351.819C1306.79 367.701 1294.43 382.676 1284.1 398.83C1264.55 422.747 1249.24 449.769 1229.85 473.781C1226.08 477.677 1220.7 485.285 1214.4 481.988Z" fill={fill} />
        </g>
        <mask id="mask7_209_615" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-147" y="-271" width="2218" height="2218">
          <circle className='rayMaskCircle2' id="rayMask_8" cx="962" cy="838" r="400" fill={fill} />
        </mask>
        {/* id="ray8" */}
        <g mask="url(#mask7_209_615)">
          <path d="M1342.26 575.561C1340.34 571.857 1340.37 571.434 1342.67 568.342C1345.78 564.159 1353.93 563.045 1356.43 566.462C1358.47 569.248 1358.53 575.999 1356.54 577.989C1355.71 578.818 1352.62 579.496 1349.67 579.496C1344.92 579.496 1344.06 579.04 1342.26 575.561Z" fill={fill} />
          <path d="M1364.57 561.871C1358.41 556.14 1361.5 551.903 1382.55 537.176C1399.57 525.266 1402.56 523.793 1405.73 525.769C1407.1 526.626 1408.89 528.918 1409.69 530.863C1410.98 533.977 1410.8 534.782 1408.16 537.606C1404.75 541.251 1379.59 559.222 1373.5 562.359C1368.39 564.992 1367.89 564.965 1364.57 561.871Z" fill={fill} />
          <path d="M1441.65 507.758C1437.5 504.494 1437.59 500.426 1441.9 496.369C1446.67 491.89 1474.67 473.924 1478.67 472.776C1482.37 471.715 1484.98 473.176 1487.36 477.648C1489.79 482.198 1486.37 485.727 1468.13 497.465C1448.33 510.204 1445.94 511.133 1441.65 507.758Z" fill={fill} />
          <path d="M1499.48 472.729C1495.14 471.432 1493.77 469.584 1493.74 465.009C1493.7 458.199 1505.38 454.834 1509.35 460.509C1512.23 464.608 1511.75 468.492 1508 471.437C1504.35 474.309 1504.63 474.267 1499.48 472.729Z" fill={fill} />
          <path d="M1518.83 457.956C1512.93 453.182 1517.05 443.909 1525.07 443.909C1529.5 443.909 1532.67 447.457 1532.67 452.411C1532.67 459.317 1524.54 462.575 1518.83 457.956Z" fill={fill} />
          <path d="M1564.35 428.145C1560.42 425.392 1560.71 420.065 1565.01 416.037C1569.76 411.592 1597.88 393.768 1601.62 392.829C1603.29 392.41 1605.56 392.632 1606.66 393.323C1609.58 395.149 1611.36 400.895 1609.82 403.488C1607.38 407.592 1572.12 430.099 1568.13 430.099C1567.59 430.099 1565.89 429.22 1564.35 428.145Z" fill={fill} />
          <path d="M1623.65 386.81C1620.07 383.226 1619.88 381.476 1622.65 377.517C1625 374.161 1654.52 354.629 1660.17 352.686C1665.07 351.003 1666.71 351.667 1669.11 356.311C1670.96 359.873 1670.93 360.355 1668.66 363.416C1665.95 367.081 1636.63 386.4 1630.58 388.507C1627.17 389.697 1626.34 389.494 1623.65 386.81Z" fill={fill} />
          <path d="M1682.69 347.891C1676.46 341.66 1678.79 338.692 1701.46 324.054C1722.42 310.512 1724.35 310.035 1728.18 317.43C1729.99 320.945 1729.96 321.446 1727.7 324.497C1724.99 328.162 1695.67 347.481 1689.62 349.588C1686.21 350.777 1685.38 350.575 1682.69 347.891Z" fill={fill} />
          <path d="M1763.81 293.257C1758.15 287.599 1761.43 283.544 1782.89 269.659C1798.94 259.272 1803.52 257.185 1806.36 258.948C1809.18 260.697 1811.73 266.226 1810.81 268.61C1809.99 270.734 1788.94 285.424 1777.53 291.831C1769.33 296.436 1767.21 296.656 1763.81 293.257Z" fill={fill} />
        </g>
        {/* id="ray9"  */}
        <mask id="mask8_209_615" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-147" y="-271" width="2218" height="2218">
          <circle className='rayMaskCircle2' id="rayMask_9" cx="962" cy="838" r="400" fill={fill} />
        </mask>
        <g mask="url(#mask8_209_615)">
          <path d="M1388.65 697.371C1402.95 686.011 1421.75 683.136 1438.7 677.461C1480.57 665.444 1522.06 652.251 1563.81 639.821C1602.1 628.111 1640.65 617.302 1679.17 606.367C1686.92 601.961 1703.58 607.51 1692.5 616.995C1684.55 624.138 1673.17 624.411 1663.78 628.851C1649.04 632.734 1634.54 637.377 1620.22 642.603C1599.45 648.685 1578.8 655.198 1557.93 660.966C1522.04 671.466 1486.06 681.591 1450.24 692.314C1432.3 697.93 1414.45 704.609 1395.89 707.688C1389.94 708.349 1382.75 703.22 1388.65 697.371Z" fill={fill} />
        </g>
      </g>

    </svg>
  )
}
