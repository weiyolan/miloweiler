import React, { useState, useEffect, useRef } from "react"
// import { useDimensions } from "@/utils/useDimensions"
import { useAppContext } from "@utils/appContext.js"
// import { Path, TextAnimate } from '@/components/line/pathUtils'
// import { SVGWrapper } from "./contextSVG"
import { usePageContext } from "@utils/pageContext"
// import { PageWrapper } from "@context/pageContext"
// import AnimateSVG from "./AnimateSVG"
// import AnimateSVGBanner from "./AnimateSVGBanner"
import { gsap } from "gsap/dist/gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { PathGSAPStandalone } from "./pathUtilsGsap"
// import { PathGSAP } from "@/components/line/pathUtilsGsap"
// import useStateRef from "@/utils/useStateRef"
gsap.registerPlugin(ScrollTrigger)

let drops = [
  "M916.679 1213.22C913.377 1216.6 913.18 1222.73 912.288 1222.97C911.225 1223.27 911.54 1220.89 910.637 1220.58C908.385 1219.81 912.826 1218.47 912.826 1214.35C912.826 1208.74 918.371 1211.49 916.679 1213.22Z",
  "M915.38 1221.34C916.34 1224.46 913.978 1228.84 908.478 1228.84C902.978 1228.84 901.522 1224.48 902.38 1221.34C903.88 1215.84 905.617 1219.84 908.88 1219.84C912.144 1219.84 913.38 1214.84 915.38 1221.34Z",
  "M916 1222.84C917.357 1227.15 915.723 1233.34 907.946 1233.34C900.169 1233.34 898.885 1226.34 901 1222.34C904.5 1215.72 903.9 1220.88 908.515 1220.88C913.129 1220.88 913.172 1213.84 916 1222.84Z",
  "M915.909 1229.91C917.266 1234.23 915.632 1240.41 907.855 1240.41C900.078 1240.41 898.795 1233.41 900.909 1229.41C903.024 1225.42 905 1225.84 907.5 1225.34C910 1224.84 914.47 1225.34 915.909 1229.91Z",
  "M915.5 1249.94C915.5 1254.8 911.694 1258.75 907 1258.75C902.306 1258.75 900 1254.8 900 1249.94C900 1245.07 908.5 1231.75 908.5 1236.25C908.5 1240.75 915.5 1245.75 915.5 1249.94Z",
]

let dropsMobile = [
  "M294.307 1291.97C291.137 1295.22 290.947 1301.1 290.091 1301.34C289.07 1301.62 289.373 1299.34 288.505 1299.04C286.343 1298.3 290.607 1297.01 290.607 1293.06C290.607 1287.67 295.932 1290.31 294.307 1291.97Z",
  "M293.059 1299.77C293.981 1302.77 291.713 1306.97 286.432 1306.97C281.15 1306.97 279.752 1302.79 280.576 1299.77C282.016 1294.49 283.684 1298.33 286.818 1298.33C289.952 1298.33 291.139 1293.53 293.059 1299.77Z",
  "M293.655 1301.21C294.958 1305.35 293.389 1311.29 285.921 1311.29C278.453 1311.29 277.22 1304.57 279.251 1300.73C282.612 1294.37 282.036 1299.33 286.468 1299.33C290.898 1299.33 290.939 1292.57 293.655 1301.21Z",
  "M293.568 1308C294.871 1312.15 293.302 1318.08 285.834 1318.08C278.366 1318.08 277.134 1311.36 279.164 1307.52C281.195 1303.69 283.092 1304.09 285.493 1303.61C287.894 1303.13 292.186 1303.61 293.568 1308Z",
  "M293.175 1327.23C293.175 1331.9 289.52 1335.69 285.013 1335.69C280.505 1335.69 278.291 1331.9 278.291 1327.23C278.291 1322.56 286.453 1309.77 286.453 1314.09C286.453 1318.41 293.175 1323.21 293.175 1327.23Z",
]

export default function Page1Moon({ className, style, scrubTl0, scrubTl1, transitionTl, animationName }) {

  let { locale, scrolled, width, height } = useAppContext()

  let { mobile } = usePageContext()
  let [introEnded, setIntroEnded] = useState(false)
  // let [myPosition, setMyPosition] = useState({ x:-0.5, y: 0.77167 })

  let tweens1 = [
    {
      timeline: transitionTl,
      id: "fullLegTrans2",
      ratio: 1,
      attr: {
        duration: 3,
        // overwrite: true,
        // ease: 'ease.out',
      },
      position: 0.5
    },
    {
      timeline: scrubTl0,
      id: "fullLegScrub2",
      ratio: mobile ? 0.20 : 0.08,
      attr: { duration: 1 },
      position: 0
    },
  ]

  useEffect(() => {
    // let tl = gsap.timeline()

    scrubTl1 && scrubTl1
      .set('#droplet', {
        scale: 0,
        opacity: 0,
        transformOrigin: '50% 50%',
      }, 0)
      .to('#droplet', {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        transformOrigin: '50% 50%',
      }, 0)
      .to('#droplet', {
        attr: { d: mobile ? dropsMobile[0] : drops[0] },
        duration: 0.6,
        ease: 'none',
      }, 0.3 + 0 * 0.6)
      .to('#droplet', {
        attr: { d: mobile ? dropsMobile[1] : drops[1] },
        duration: 0.6,
        ease: 'none',
      }, 0.3 + 1 * 0.6)
      .to('#droplet', {
        attr: { d: mobile ? dropsMobile[2] : drops[2] },
        duration: 0.6,
        ease: 'none',
      }, 0.3 + 2 * 0.6)
      .to('#droplet', {
        attr: { d: mobile ? dropsMobile[3] : drops[3] },
        duration: 0.6,
        ease: 'none',
      }, 0.3 + 3 * 0.6)
      .to('#droplet', {
        attr: { d: mobile ? dropsMobile[4] : drops[4] },
        scale: 1.5,
        transformOrigin: '50% 50%',
        duration: 0.6,
        ease: 'none',
      }, 0.3 + 4 * 0.6)
    // .add(tl, 0)
  }, [scrubTl1])


  // let colorPrimary = "#FFF5EA";
  let colorPrimary = "#FFF5EA";

  //==============X FROM CENTER, Y FROM BOTTOM============
  // let originalY = 0.630861

  // useEffect(() => {
  //   setMyPosition({ x: getX(), y: getY() })
  // }, [width, height])

  return (
    <div style={{ left: `calc(50%)`, top: `calc(50% + ${115.86 * 0.26543 * 0.3}vw)`, ...style }} className={`${animationName} ${className && className}`}>
      {/* svgPage2Inner */}
      {/* <svg className={`w-full h-full relative top-[0]`} width="655" height="1384" viewBox="0 0 655 1384" fill="none" xmlns="http://www.w3.org/2000/svg"> */}

      <svg alt={'Moon animation'} className={`${animationName}Inner w-full h-full relative top-[0]`} width="1782" height="1982" viewBox="0 0 1782 1982" fill="none">
        {/* ====== LEGnFLOWER ========  */}
        <mask id="mask0_876_624" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="867" y="-5" width="655" height="1412">
          <path id="Subtract" fillRule="evenodd" clipRule="evenodd" d="M1522 -5H867V1407H1522V-5ZM1400.5 942.5C1401.44 937.77 1400.5 931 1400.5 931L1376.5 918.5L1297.5 925C1297.47 925.42 1297.44 925.86 1297.41 926.32C1297.18 929.48 1296.91 933.18 1297.5 936L1331.5 959L1397 976C1398.84 973.91 1398.31 970.83 1398.08 969.48C1398.04 969.28 1398.01 969.12 1398 969C1398.65 967.82 1407.57 980.99 1399 984.5C1399 985.7 1375 985 1363 984.5L1314.5 969.5L1298 974.5C1298.4 977.7 1298.83 981.83 1299 983.5L1306.5 987L1392 1020C1391.88 1017.47 1391.91 1015.81 1392 1012.5C1397.74 1012.78 1399.95 1023.91 1393 1029C1390.11 1031.11 1375.33 1029.67 1367.5 1028L1324 1020L1296 1025.5C1296 1027.5 1296 1030.5 1297 1032L1300.5 1035L1345.5 1042L1388.5 1043.5C1389.55 1042.38 1389.5 1040.5 1389 1039C1393.77 1039.79 1394.16 1046.66 1389.5 1051.5C1387.21 1053.88 1372.83 1060.17 1365 1062.5L1294 1064L1299 1091L1299.5 1097L1301 1099L1302 1100L1352 1113L1356.5 1134.5L1346.5 1144.5L1344 1141C1343.82 1139.56 1343.78 1137.94 1343.75 1136.67C1343.72 1135.24 1343.7 1134.26 1343.5 1134.5C1343.18 1134.9 1341.65 1134.3 1339.99 1133.65C1338.74 1133.16 1337.43 1132.64 1336.5 1132.5L1295 1128.5L1279.5 1146C1279.61 1146.95 1279.69 1147.85 1279.77 1148.72C1280.24 1154.04 1280.56 1157.64 1287 1158.5C1294 1159 1312.22 1157.53 1308 1146L1296 1149.5L1296.01 1149.58C1296.24 1152.85 1296.47 1155.98 1293 1154C1292.02 1152.44 1291.55 1147.63 1293 1144C1293.8 1142 1299.33 1140.17 1300.5 1140L1318 1138L1341 1143.5L1348 1154.5L1347.5 1173.5L1344 1165C1344 1162.5 1344 1160 1342.5 1157.5C1341.39 1155.65 1337.47 1154.51 1334.65 1153.69C1334.42 1153.62 1334.21 1153.56 1334 1153.5L1306 1156.5L1292 1160.5L1283 1168.5L1277.5 1183L1286.5 1196.5C1301.63 1196.65 1307 1182.5 1293.5 1183C1292.81 1184.43 1293 1185.67 1293.5 1188C1288.57 1184.74 1288.07 1181.62 1291.5 1177.5C1293.53 1175.06 1293.16 1173.11 1292.97 1172.15C1292.9 1171.77 1292.86 1171.55 1293 1171.5L1308.5 1169L1323 1171.5L1336 1184.5L1343 1188L1377 1172.5L1440.5 1029L1400.5 942.5Z" fill="#D9D9D9" />
        </mask>
        <PathGSAPStandalone tweens={tweens1} mask="url(#mask0_876_624)" className='will-change-transform legFlower' id="fullLeg" d="M941.999 1L1163 469.5C1204.5 557.5 1283 531 1306 574.5C1333.2 625.941 1257 661 1277.5 697C1296.7 730.72 1364 729.5 1343.5 765.5C1323 801.5 1322 819 1332 841C1356.12 897.47 1414 908 1402.5 937C1399.5 943.5 1390.08 930.11 1380 934L1373.5 934.87L1352.5 937.5L1332 925.5L1314.5 934.87C1307.58 931.32 1296.83 923.22 1296 930.5C1292 965.5 1396.11 991.33 1399.31 975.2C1400.15 971 1394.44 972.27 1387.5 969.5C1406.72 962.51 1414.18 960.31 1403 992.5L1373.5 997.5L1352.5 990L1343 992.5L1323.5 981.5L1314.5 984C1308.87 980.44 1301.01 970.67 1298 979C1289.5 1002.5 1390.5 1039.73 1394.13 1019.93C1394.76 1016.5 1389.14 1015.95 1385 1015C1393.54 1004.75 1400.07 1008.03 1403 1027L1379 1035L1343 1027L1332 1037L1309 1027C1303.73 1027.41 1295 1024.53 1295 1030.5C1295 1055 1385.49 1060.58 1390.19 1042.91C1391.09 1039.5 1379.42 1042.37 1381.5 1041C1381.65 1037.14 1397.72 1031.98 1405 1039.5L1394.13 1065.5L1369 1069.5L1349 1076L1323.5 1069.5L1314.5 1080L1300.5 1097.5C1291.13 1119.99 1353.5 1115.5 1344.5 1138C1342.02 1142.21 1336.38 1140.74 1333 1137.5L1318.5 1133.5L1309 1136.5H1297.21L1284 1147C1284.86 1160.02 1305.1 1160.33 1306.5 1148C1306 1146 1294 1162 1295 1149C1296 1136 1347.5 1140.5 1345 1160.5C1344.68 1163.2 1343.8 1164.78 1334 1168.5L1335 1164.5L1321.5 1159L1310.5 1162L1297.21 1160.24L1289.5 1168.5L1281.5 1179.5C1282.17 1188.48 1296.07 1198.69 1298.5 1187C1294.75 1187.25 1291.74 1186 1291.5 1183C1290 1164.5 1352.5 1172 1323.5 1206C1294.5 1240 1254 1346 1291.5 1337.5C1329 1329 1222 1251.46 1114 1279.5C1035.5 1299.88 973.496 1364 973.496 1383.5C967 1352.5 961.5 1308.5 962 1288C962.028 1286.86 969 1276.5 971 1279.5C973 1282.5 961.702 1289.75 961.5 1287C959.296 1257 955.046 1237.5 952.5 1230.5C951.123 1226.71 942.612 1235.5 944.612 1237.5C947.374 1240.26 954.059 1231.36 952.113 1229.5C952.113 1228 954.613 1218.5 958.613 1220C962.613 1221.5 951.556 1231.01 951.113 1228.5C944.612 1209.5 925.065 1204.56 916.565 1207.56C916.575 1203.53 908.708 1200.16 906.465 1204.06C903.599 1209.05 908.611 1213.37 910.844 1213.5C912.902 1213.62 915.62 1210.23 916 1207.56C928 1206.68 926 1191.18 913.5 1204.06C922.906 1193.36 909.5 1189.18 910 1202.68C906 1190.68 892.5 1202.18 906 1206.68C891.817 1207.04 897.501 1218.38 907 1210.18C897 1221.68 916 1225.68 913.5 1212.18C918.344 1223.22 933.211 1207.55 916.565 1208.18" stroke={colorPrimary} strokeWidth="2" strokeLinecap="round" />
        {/* ====== WATER DROP ========  */}
        <path className={`opacity-0`} id="droplet" d="M917 1209.92C917 1212.06 914.555 1214 912.295 1214C910.036 1214 908 1212.06 908 1209.92C908 1207.77 910.445 1207 912.705 1207C914.964 1207 917 1207.77 917 1209.92Z" fill={colorPrimary} />
        {/* <path id="droplet0a" d="M916.679 1213.22C913.377 1216.6 913.18 1222.73 912.288 1222.97C911.225 1223.27 911.54 1220.89 910.637 1220.58C908.385 1219.81 912.826 1218.47 912.826 1214.35C912.826 1208.74 918.371 1211.49 916.679 1213.22Z" fill={colorPrimary} /> */}
        {/* <path id="droplet1" d="M915.38 1221.34C916.34 1224.46 913.978 1228.84 908.478 1228.84C902.978 1228.84 901.522 1224.48 902.38 1221.34C903.88 1215.84 905.617 1219.84 908.88 1219.84C912.144 1219.84 913.38 1214.84 915.38 1221.34Z" fill={colorPrimary} /> */}
        {/* <path id="droplet2" d="M916 1222.84C917.357 1227.15 915.723 1233.34 907.946 1233.34C900.169 1233.34 898.885 1226.34 901 1222.34C904.5 1215.72 903.9 1220.88 908.515 1220.88C913.129 1220.88 913.172 1213.84 916 1222.84Z" fill={colorPrimary} /> */}
        {/* <path id="droplet3" d="M915.909 1229.91C917.266 1234.23 915.632 1240.41 907.855 1240.41C900.078 1240.41 898.795 1233.41 900.909 1229.41C903.024 1225.42 905 1225.84 907.5 1225.34C910 1224.84 914.47 1225.34 915.909 1229.91Z" fill={colorPrimary} /> */}
        {/* <path id="droplet4" d="M915.5 1249.94C915.5 1254.8 911.694 1258.75 907 1258.75C902.306 1258.75 900 1254.8 900 1249.94C900 1245.07 908.5 1231.75 908.5 1236.25C908.5 1240.75 915.5 1245.75 915.5 1249.94Z" fill={colorPrimary} /> */}
        {/* <path id="droplet4b" d="M923 1965.57C923 1974.08 916.125 1981 907.645 1981C899.166 1981 895 1974.08 895 1965.57C895 1957.05 910.355 1933.72 910.355 1941.6C910.355 1949.48 923 1958.24 923 1965.57Z" fill="#FF0000"/> */}
        {/* <path id="droplet5" d="M933.688 1974.71C932.547 1977.53 879.803 1982.2 881.021 1975.75C881.021 1966.42 901.519 1978.72 899.977 1972.64C894.712 1951.9 923.146 1958.12 915.774 1969.53C908.402 1980.93 937.286 1965.84 933.688 1974.71Z" fill="#FF0000"/> */}
        {/* <path id="droplet5b" d="M915 1975.5C915 1977.34 910.381 1979 906.115 1979C901.847 1979 898 1977.34 898 1975.5C898 1973.66 902.619 1973 906.885 1973C911.153 1973 915 1973.66 915 1975.5Z" fill="#FF0000"/> */}
        <path className={`opacity-0`} id="dropletEnd" d="M914.286 1973.66C914.286 1978.04 910.598 1982 907.191 1982C903.784 1982 900.714 1978.04 900.714 1973.66C900.714 1969.28 904.402 1967.71 907.809 1967.71C911.216 1967.71 914.286 1969.28 914.286 1973.66Z" fill={colorPrimary}/>
        {/* <path id="droplet7" d="M915 1978.5C915 1980.34 910.381 1982 906.115 1982C901.847 1982 898 1980.34 898 1978.5C898 1976.66 902.619 1976 906.885 1976C911.153 1976 915 1976.66 915 1978.5Z" fill="#FF0000"/> */}
      </svg>

    </div>
  )
}