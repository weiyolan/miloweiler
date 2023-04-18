import React, {useState, useEffect, useRef} from "react"
import { useAppContext } from "@utils/appContext.js"
import { Path , TextAnimate} from '@/components/line/pathUtils'
import { SVGWrapper} from "./contextSVG"
import { usePageContext } from "@utils/pageContext"
import AnimateSVG from './AnimateSVG'

export default function StoryText({ scrollMin, scrollMax, speed }) {

  let { scrolled, locale, screens, width} = useAppContext();
    let { viewBox, mobile, setTextLocation,setAnimationLocation} = usePageContext()
  let [fakeScroll1, setFakeScroll1] = useState(0)

  let svgRef = useRef(null)
  // // let [fillStyle1,setFillStyle1] = useState(false)
  // // let [strokeColor1, setStrokeColor1] = useState('#FFFAEA')
  // let [fakeScroll2,setFakeScroll2] = useState(0)
  // let [fillStyle2,setFillStyle2] = useState(false)
  // let [strokeColor2, setStrokeColor2] = useState('#FFFAEA')

  useEffect(()=>{
    let timer = setTimeout(()=>{setFakeScroll1(1)},500)
      // let timer2 = setTimeout(()=>{setFillStyle(true)},2000)
    // let timer2 = setTimeout(()=>{setFakeScroll2(1)},1200)
    // let timer3 = setTimeout(()=>{setFillStyle2(true);setStrokeColor2('transparent')},3200)
    return ()=>{
      clearTimeout(timer)
      // clearTimeout(timer2)
      // clearTimeout(timer3)
    }
  },[])

  function handleNewPosition ({top, bottom}) {
    // if (scrolled>scrollMin && scrolled < scrollMax && !located) {
      // const {top, bottom} = animationRef.current.getBoundingClientRect();
      const {top: svgStart} = svgRef.current.getBoundingClientRect();
      // setTextLocation({top: top-svgStart, bottom: bottom-svgStart})
      setAnimationLocation({top: top-svgStart, bottom: bottom-svgStart})
  }
  // useEffect(()=>{
  //   if (scrolled>scrollMin && scrolled < scrollMax && !located) {
  //     const {top, bottom} = animationRef.current.getBoundingClientRect();
  //     const {top: svgStart} = svgRef.current.getBoundingClientRect();
  //     setLocated(true)
  //     setAnimationLocation({top: top-svgStart, bottom: bottom-svgStart})
  //   } else if ((scrolled<scrollMin || scrolled > scrollMax) && located) {
  //     setLocated(false)
  //   }
  // },[scrolled, scrollMin, scrollMax, setLocated])

  let fontSize=mobile?25:20

  return (
    <SVGWrapper handleNewPosition={handleNewPosition} scrollMin={scrollMin} scrollMax={scrollMax} animationSpeed={speed}>

      <svg ref={svgRef} alt='Story text explaining the founding story, as well as mission and vision of Spirée' style={{ transform: `translate(-50%, 0px)` }} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg"
          className={`absolute w-5/6 xs:w-4/6 sm:w-3/6 md:w-5/6 xl:w-3/5 max-w-6xl left-1/2`}>
      {!mobile?<g id='desktop'>
        <TextAnimate scrolled={fakeScroll1} at={0} fromTop={true} id="Meet Astrid" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="85.6895" y="56">Meet Astrid, a driven and sport-</tspan><tspan x="65.6211" y="81">loving women who&#x2019;s on a mission to </tspan><tspan x="96.8711" y="106">revolutionize the way women </tspan><tspan x="141.295" y="131">experience running.</tspan></TextAnimate>
        <TextAnimate at={0.04} fromTop={true} id="DoctorText" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="598.521" y="343">As a recent graduate with a </tspan><tspan x="588.688" y="368">doctorate in pharmacy, Astrid </tspan><tspan x="575.338" y="393">has a deep understanding of the </tspan><tspan x="605.631" y="418">body and its needs during </tspan><tspan x="651.031" y="443">physical activity.</tspan></TextAnimate>
        <TextAnimate at={0.17} fromTop={true} id="Mountains" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="1211.92" y="202">One day, while on a run in </tspan><tspan x="1234.07" y="227">the mountains, Astrid </tspan><tspan x="1210.23" y="252">stumbled upon a beautiful </tspan><tspan x="1212.57" y="277">and delicate flower called </tspan><tspan x="1300.94" y="302">Spir&#xe9;e.</tspan></TextAnimate>
        <TextAnimate at={0.35} fromTop={true} id="Willpower" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="629.422" y="714">As she learned more about the </tspan><tspan x="634.92" y="739">flower, she discovered that its </tspan><tspan x="636.873" y="764">name means &#34;willpower&#34; and </tspan><tspan x="709.852" y="789">&#34;persistence.&#34; </tspan></TextAnimate>
        <TextAnimate at={0.41} fromTop={true} id="Inspiration" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="243.457" y="750"> She realized that these traits </tspan><tspan x="217.539" y="775">reflected her own mentality during </tspan><tspan x="236.484" y="800">challenging runs and that they </tspan><tspan x="251.66" y="825">could inspire others as well. </tspan></TextAnimate>
        <TextAnimate at={0.52} fromTop={true} id="SpireeText" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="237.48" y="990">This led her to create </tspan><tspan x="255.742" y="1015">Spir&#xe9;e, a start-up </tspan><tspan x="215.635" y="1040">dedicated to creating  the </tspan><tspan x="226.709" y="1065">ultimate sportswear for </tspan><tspan x="232.783" y="1090">women made of 100% </tspan><tspan x="276.836" y="1115">Merino wool.</tspan></TextAnimate>
        <TextAnimate at={0.58} fromTop={true} id="SunText" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="574.354" y="1099">Spir&#xe9;e&#39;s first clothing </tspan><tspan x="564.891" y="1124">line, the Sun and Moon </tspan><tspan x="575.799" y="1149">series, leverages the </tspan><tspan x="590.633" y="1174">many benefits of </tspan><tspan x="611.199" y="1199">Merino wool,</tspan></TextAnimate>
        <TextAnimate at={0.60} fromTop={true} id="MoonText" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="812.066" y="1249">... to provide women </tspan><tspan x="816.91" y="1274">with a comfortable </tspan><tspan x="804.498" y="1299">and effective solution </tspan><tspan x="831.002" y="1324">for their athletic </tspan><tspan x="865.797" y="1349">pursuits.</tspan></TextAnimate>
        <TextAnimate at={0.67} fromTop={true} id="MerinoText" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="1199.63" y="1003">The natural softness, </tspan><tspan x="1165.89" y="1028">temperature regulation, and </tspan><tspan x="1156.02" y="1053">anti-odor properties of Merino </tspan><tspan x="1165.17" y="1078">wool will ensure that women </tspan><tspan x="1165.97" y="1103">stay comfortable, no matter </tspan><tspan x="1156.91" y="1128">the weather or the intensity of </tspan><tspan x="1233.1" y="1153">their workout. </tspan></TextAnimate>
        <TextAnimate at={0.74} fromTop={true} id="PassionText" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="1076.73" y="1571">Astrid&#39;s passion for </tspan><tspan x="1090.17" y="1596">running and her </tspan><tspan x="1052.12" y="1621">commitment to creating </tspan><tspan x="1054.92" y="1646">a brand that empowers </tspan><tspan x="1048.72" y="1671">women to reach their full </tspan><tspan x="1059.22" y="1696">potential is reflected in </tspan><tspan x="1058.53" y="1721">every aspect of Spir&#xe9;e.</tspan></TextAnimate>
        <TextAnimate at={0.81} fromTop={true} id="REText" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="193.391" y="1521">From the playful and vibrant </tspan><tspan x="182.424" y="1546">designs to the precise cuts and </tspan><tspan x="173.312" y="1571">attention to detail, Spir&#xe9;e is more </tspan><tspan x="200.305" y="1596">than just sportswear - it&#39;s a </tspan><tspan x="273.742" y="1621">movement.</tspan></TextAnimate>
        <TextAnimate at={0.85} fromTop={true} id="JoinText1" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="276.488" y="1839">So why not join Astrid and Spir&#xe9;e </tspan><tspan x="293.715" y="1864">on this exciting journey? Your </tspan><tspan x="289.184" y="1889">support will help bring the Sun </tspan><tspan x="291.645" y="1914">and Moon series to life, giving </tspan><tspan x="290.697" y="1939">women the tools they need to </tspan><tspan x="296.713" y="1964">push themselves further and </tspan><tspan x="337.992" y="1989">chase their dreams. </tspan></TextAnimate>
        <TextAnimate at={0.95} fromTop={true}  id="Support" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="809.889" y="2101">Join Spir&#xe9;e&#x2019;s movement now to be </tspan><tspan x="825.66" y="2126">part of something truly special. </tspan><tspan x="809.723" y="2151">Together, let&#39;s empower women to </tspan><tspan x="882.857" y="2176">reach new heights.</tspan></TextAnimate>
        </g>:<g id='mobile'>
        <TextAnimate scrolled={fakeScroll1} at={0} fromTop={true} id="Meet Astrid" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="168.527" y="54.875">Meet Astrid, a driven and sport-</tspan><tspan x="143.441" y="85.875">loving women who&#x2019;s on a mission to </tspan><tspan x="182.504" y="116.875">revolutionize the way women </tspan><tspan x="238.034" y="147.875">experience running.</tspan></TextAnimate>
        <TextAnimate at={0.04} fromTop={true} id="Doctor in Pharmacy" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="370.525" y="332.875">As a recent graduate with </tspan><tspan x="372.906" y="363.875">a doctorate in pharmacy, </tspan><tspan x="418.572" y="394.875">Astrid has a deep </tspan><tspan x="398.223" y="425.875">understanding of the </tspan><tspan x="368.414" y="456.875">body and its needs during </tspan><tspan x="425.164" y="487.875">physical activity.</tspan></TextAnimate>
        <TextAnimate at={0.08} fromTop={true} id="Mountains" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="390.025" y="968.875">One day, while on a run in </tspan><tspan x="417.71" y="999.875">the mountains, Astrid </tspan><tspan x="387.913" y="1030.88">stumbled upon a beautiful </tspan><tspan x="390.843" y="1061.88">and delicate flower called </tspan><tspan x="501.304" y="1092.88">Spir&#xe9;e.</tspan></TextAnimate>
        <TextAnimate at={0.21} fromTop={true} id="Willpower" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="48.0791" y="1613.88">As she learned more </tspan><tspan x="45.6377" y="1644.88">about the flower, she </tspan><tspan x="24.4341" y="1675.88">discovered that its name </tspan><tspan x="34.7856" y="1706.88">means &#34;willpower&#34; and </tspan><tspan x="89.3145" y="1737.88">&#34;persistence.&#34; </tspan></TextAnimate>
        <TextAnimate at={0.25} fromTop={true} id="Inspiration" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="379.856" y="1891.88"> She realized that these </tspan><tspan x="380.284" y="1922.88">traits reflected her own </tspan><tspan x="349.266" y="1953.88">mentality during challenging </tspan><tspan x="373.35" y="1984.88">runs and that they could </tspan><tspan x="392.088" y="2015.88">inspire others as well. </tspan></TextAnimate>
        <TextAnimate at={0.35} fromTop={true} id="SpireeText" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="287.317" y="2224.88">This led her to create Spir&#xe9;e, a </tspan><tspan x="263.086" y="2255.88">start-up dedicated to creating  the </tspan><tspan x="280.579" y="2286.88">ultimate sportswear for women </tspan><tspan x="304.163" y="2317.88">made of 100% Merino wool.</tspan></TextAnimate>
        <TextAnimate at={0.39} fromTop={true} id="SunText" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="164.798" y="2620.88">Spir&#xe9;e&#39;s first </tspan><tspan x="141.165" y="2651.88">clothing line, the </tspan><tspan x="151.26" y="2682.88">Sun and Moon </tspan><tspan x="139.2" y="2713.88">series, leverages </tspan><tspan x="129.556" y="2744.88">the many benefits </tspan><tspan x="146.158" y="2775.88">of Merino wool,</tspan></TextAnimate>
        <TextAnimate at={0.43} fromTop={true} id="MoonText" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="415.14" y="2775.88">... to provide </tspan><tspan x="403.531" y="2806.88">women with a </tspan><tspan x="387.162" y="2837.88">comfortable and </tspan><tspan x="385.428" y="2868.88">effective solution </tspan><tspan x="392.752" y="2899.88">for their athletic </tspan><tspan x="436.246" y="2930.88">pursuits.</tspan></TextAnimate>
        <TextAnimate at={0.52} fromTop={true} id="MerinoText" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="107.541" y="3125.88">The natural softness, </tspan><tspan x="65.3657" y="3156.88">temperature regulation, and </tspan><tspan x="96.103" y="3187.88">anti-odor properties of </tspan><tspan x="67.4409" y="3218.88">Merino wool will ensure that </tspan><tspan x="62.0942" y="3249.88">women stay comfortable, no </tspan><tspan x="78.5737" y="3280.88">matter the weather or the </tspan><tspan x="82.248" y="3311.88">intensity of their workout. </tspan></TextAnimate>
        <TextAnimate at={0.61} fromTop={true} id="PassionText" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="241.918" y="3474.88">Astrid&#39;s passion for </tspan><tspan x="258.715" y="3505.88">running and her </tspan><tspan x="262.206" y="3536.88">commitment to </tspan><tspan x="254.32" y="3567.88">creating a brand </tspan><tspan x="263.695" y="3598.88">that empowers </tspan><tspan x="257.006" y="3629.88">women to reach </tspan><tspan x="237.975" y="3660.88">their full potential is </tspan><tspan x="250.402" y="3691.88">reflected in every </tspan><tspan x="255.126" y="3722.88">aspect of Spir&#xe9;e.</tspan></TextAnimate>
        <TextAnimate at={0.69} fromTop={true} id="REText" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="277.863" y="3991.88">From the playful and vibrant </tspan><tspan x="289.96" y="4022.88">designs to the precise cuts </tspan><tspan x="272.871" y="4053.88">and attention to detail, Spir&#xe9;e </tspan><tspan x="270.197" y="4084.88">is more than just sportswear - </tspan><tspan x="348.701" y="4115.88">it&#39;s a movement.</tspan></TextAnimate>
        <TextAnimate at={0.80} fromTop={true} id="JoinText1" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="69.3408" y="4383.88">So why not join Astrid and </tspan><tspan x="41.521" y="4414.88">Spir&#xe9;e on this exciting journey? </tspan><tspan x="41.2769" y="4445.88">Your support will help bring the </tspan><tspan x="62.3584" y="4476.88">Sun and Moon series to life, </tspan><tspan x="57.0361" y="4507.88">giving women the tools they </tspan><tspan x="76.6406" y="4538.88">need to push themselves </tspan><tspan x="87.7368" y="4569.88">further and chase their </tspan><tspan x="173.674" y="4600.88">dreams. </tspan></TextAnimate>
        <TextAnimate at={0.91} fromTop={true} id="JoinText" fill="#FFFAEA" style="white-space: pre" font-family="var(--font-quicksand)" font-size={fontSize} letter-spacing="0em"><tspan x="26.6772" y="4836.88">Join Spir&#xe9;e&#x2019;s movement now to </tspan><tspan x="56.0474" y="4867.88">be part of something truly </tspan><tspan x="23.8086" y="4898.88">special. Together, let&#39;s empower </tspan><tspan x="38.6279" y="4929.88">women to reach new heights.</tspan></TextAnimate>
        </g>
        }
      </svg>

    </SVGWrapper>
  )
}