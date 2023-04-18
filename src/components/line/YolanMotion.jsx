import React, {useEffect, useState} from 'react'
import {RiDoubleQuotesL, RiDoubleQuotesR} from 'react-icons/ri'
import { useAppContext } from "@context/appContext"
import { PathFillText } from '@/components/line/pathUtils'
import { SVGWrapper } from "./contextSVG"

export default function YolanMotion({ home, scrollMin, scrollMax }) {
  let {locale} = useAppContext()
  let [allLengths, setAllLengths] = useState([])
  let [allOffsetLengths, setAllOffsetLengths] = useState([])
  let [allRatios, setAllRatios] = useState([0])
  let [allPrevRatios, setAllPrevRatios] = useState([0])
  
  // let { scrolled } = useAppContext();
  let [fakeScroll,setFakeScroll] = useState(0)

  let [fillStyle,setFillStyle] = useState(false)
  let [strokeColor, setStrokeColor] = useState('#171B4D')

  function handleLength(f, newLength, position) {

    setAllLengths(prevLengths => {
      let copyLengths = [...prevLengths];
      copyLengths[position] = newLength;
      return copyLengths
    })
    setAllOffsetLengths(prevOffsets => {
      let copyOffsetLengths = [...prevOffsets];
      copyOffsetLengths[position] = newLength * f;
      return copyOffsetLengths
    })
  }

  useEffect(() => {
    if (allLengths.length > 0) {
      // let totLength = allLengths.reduce((x, y) => x + y);
      let totOffsetLength = allOffsetLengths.reduce((x, y) => x + y);
      let allRatios = allLengths.map(itemLength => itemLength / totOffsetLength);
      let newPrevRatios = allLengths.map((itemLength, index) => {
        let prevOffsetLength = allOffsetLengths.reduce((acc, y, i) => {
          return (i < index ? acc + y : acc)
        }, 0);
        return prevOffsetLength / totOffsetLength
      })
      setAllRatios(allRatios)
      setAllPrevRatios(newPrevRatios)
    }
  }, [allLengths, allOffsetLengths])

  useEffect(()=>{
    let timer = setTimeout(()=>{setFakeScroll(1)},500)
      // let timer2 = setTimeout(()=>{setFillStyle(true)},2000)
      let timer2 = setTimeout(()=>{setFillStyle(true);setStrokeColor('transparent')},2500)
      return ()=>{clearTimeout(timer);clearTimeout(timer2)}
  },[])

  return (
    <SVGWrapper myRatio={allRatios} prevRatio={allPrevRatios} scrollMin={scrollMin} scrollMax={scrollMax}>
    <section className='relative flex flex-col max-w-3xl w-full mx-auto cursor-default'>
      <div className={`mx-auto relative`}>
        {/* <Yolan className={`duration-500 transition-all delay-500 mt-12 sm:mt-24 mb-6 ${loaded?'opacity-100':'opacity-0'}`}  width='200' alt='Picture of Yolan Weiler' /> */}
        <div className='w-fit mt-6 sm:mt-12 h-[200px] flex'>
          <svg viewBox="0 0 260 328" fill="none" xmlns="http://www.w3.org/2000/svg">
            <PathFillText fillColor='#171B4D' strokeColor={strokeColor} scrolled={fakeScroll} animateFill={fillStyle} position={0} inverse={false} double={1} handleLength={(l, i) => handleLength(1, l, i)}  d="M117.724 66.5621C114.993 68.4735 114.993 70.1118 117.178 74.4808C121.82 82.9455 128.373 88.6797 133.288 88.6797C137.111 88.6797 137.384 88.1336 134.107 86.2222C131.104 84.3108 132.196 83.4916 138.203 82.6725L146.122 81.5802L136.565 76.6652L127.008 72.0232L137.93 73.3885C148.306 74.7538 148.579 74.4807 142.026 71.2041C131.923 66.016 122.093 64.1046 117.724 66.5621Z" />
            <PathFillText fillColor='#171B4D' strokeColor={strokeColor} scrolled={fakeScroll} animateFill={fillStyle} position={0} inverse={false} double={1} handleLength={(l, i) => handleLength(1, l, i)}  fillRule="evenodd" clipRule="evenodd" d="M105.436 4.85124C113.628 4.57819 122.366 3.21288 124.823 1.57454C127.554 0.209256 130.558 -0.336838 131.65 0.209276C132.742 1.02845 136.565 2.12065 139.568 2.66676C142.845 3.48594 147.487 5.67041 149.945 7.5818C152.402 9.76626 155.952 10.8585 158.136 10.0393C160.321 9.49321 161.14 10.0393 160.048 11.6777C159.228 13.316 160.867 16.3196 163.87 18.5041C166.874 20.4155 168.512 22.873 167.693 23.9652C166.874 24.7844 168.785 26.6958 171.789 28.6072C176.158 30.7916 177.523 30.7917 177.523 28.0611C177.523 25.8766 178.342 25.6036 180.527 27.788C182.984 30.2455 185.988 46.0828 186.534 58.3704C186.534 60.5549 188.992 64.6507 191.722 67.3813C196.637 72.2963 196.637 73.1155 192.541 79.3958C190.084 83.2186 188.719 87.8605 189.265 89.4989C189.811 91.4103 187.899 96.3253 185.169 100.421C182.165 104.517 180.254 110.251 181.073 113.255C181.892 116.258 180.8 118.989 178.616 119.808C176.431 120.627 173.427 124.45 171.516 128.273C166.601 138.922 161.14 137.011 161.14 124.177C161.14 115.166 161.959 113.255 166.601 113.255C169.332 113.255 173.154 110.797 174.793 108.067C178.616 100.694 178.342 99.8751 172.062 101.513C168.512 102.333 166.601 101.513 166.328 99.329C166.328 97.1445 165.236 97.9637 163.597 100.967C161.686 105.063 161.413 103.152 162.505 94.1408C163.597 82.3994 159.228 58.3704 154.86 54.2746C153.767 53.1823 152.948 48.8134 152.948 44.4445C152.948 37.6181 151.037 35.7067 140.388 30.7916C124.823 23.9652 112.263 23.6922 102.433 30.2455C96.4254 34.3414 95.3331 36.2528 96.6984 43.0792C97.7907 48.8134 96.9715 52.9093 93.9679 56.186C89.872 60.8279 89.872 61.101 96.4254 63.0124C107.621 65.7429 108.986 69.2927 105.982 87.0414C102.979 104.517 104.89 108.34 115.812 105.609C121 104.517 120.727 105.063 113.901 111.343L106.255 118.716H117.178C134.653 118.716 137.111 116.805 129.192 108.886C120.181 99.8751 123.185 97.4176 133.561 105.063C147.76 115.166 142.299 123.904 122.912 122.266C116.085 121.72 108.986 122.539 106.802 123.904C101.613 127.181 105.163 135.099 111.99 135.099C120.181 135.099 118.543 140.561 109.259 143.837C98.0637 147.66 100.248 152.029 113.901 153.394C125.096 154.486 126.462 153.667 145.849 132.642C153.221 124.723 155.952 125.542 152.675 134.28C149.945 142.472 122.093 173.6 113.628 178.242C108.986 180.427 110.624 181.519 124.004 184.25C132.742 185.888 140.934 186.434 142.026 185.069C156.771 169.232 166.601 155.579 165.509 152.575C162.778 145.203 170.697 149.025 176.158 157.763C179.435 162.951 196.091 176.331 217.117 190.257C256.146 216.458 256.164 216.743 258.072 247.011L258.075 247.053C259.53 273.573 259.609 297.487 258 320C257.669 324.33 252 328 248 328H0.276703C0.906786 324.34 1.50644 319.498 1.94766 314.498C3.85906 293.746 6.58963 288.011 14.5083 288.011C20.2425 288.011 21.0617 285.827 25.7036 258.794C31.7109 223.843 37.172 205.548 43.7254 197.083C46.4559 193.807 57.3782 187.526 67.7544 182.884C85.23 175.512 86.8684 173.873 89.599 163.77C92.3295 153.394 92.0565 151.756 80.315 132.369C73.7616 121.174 68.3005 110.524 68.3005 108.613C68.3005 106.701 67.2083 105.063 66.1161 105.063C64.7508 105.063 63.9316 102.333 64.2047 99.0559C64.4777 95.7792 61.4741 87.5875 57.6513 80.7611C53.5554 73.6616 52.4632 69.5657 54.9207 70.931C58.1974 73.1155 58.1974 72.5694 54.9207 68.7466C51.9171 64.9238 51.9171 62.7393 55.7399 54.8207C58.1974 49.6326 59.2896 43.3523 58.1974 40.6217C57.1052 37.345 57.3782 36.5258 59.8357 37.8911C62.0202 39.5295 62.8394 38.4373 62.2933 35.1606C61.7471 31.6108 63.1124 29.9725 66.3891 30.2455C68.8466 30.5186 71.0311 29.6994 71.0311 28.6072C71.0311 27.515 75.4 21.7808 80.8611 16.0466C89.872 6.76265 92.3295 5.39736 105.436 4.85124ZM85.5031 100.421C89.3259 101.786 96.4254 93.0486 93.6948 90.3181C92.6026 89.4989 89.599 88.6797 86.8684 88.6797C81.1342 88.6797 80.042 98.2367 85.5031 100.421ZM117.178 194.353C108.713 194.899 104.071 194.08 105.163 192.441C105.982 190.803 106.255 189.711 105.436 189.711C104.89 189.711 101.613 194.08 98.3368 199.541C95.0601 204.729 91.5103 208.552 90.9642 207.733C88.5067 205.275 78.9497 211.555 80.5881 214.559C81.6803 215.924 80.8611 217.016 79.2228 217.016C75.1269 217.016 65.843 238.588 65.2969 250.056C64.7508 255.244 63.9316 260.433 62.8394 262.071C62.0202 263.436 60.928 269.17 60.6549 274.358C60.3819 283.096 60.6549 283.369 62.8394 277.089C64.7508 271.901 65.0238 273.266 64.4777 283.915C63.6585 291.288 64.2047 300.026 65.5699 303.029C67.7544 308.218 68.0275 308.218 68.0275 302.483C68.3005 299.207 69.6658 295.657 71.0311 294.838C72.6694 293.746 73.2155 291.834 72.3964 290.469C71.3041 289.104 71.8502 288.011 73.2155 288.011C76.7653 288.011 82.2264 274.358 80.315 271.082C79.2228 269.17 79.7689 268.897 81.4072 269.99C83.3186 271.082 84.6839 270.809 84.6839 269.443C84.6839 267.805 92.8756 254.698 102.706 240.226C117.997 217.29 119.908 213.194 116.905 209.371C115.373 207.283 114.623 206.259 114.761 206.119C114.895 205.985 115.85 206.667 117.724 208.006C121.274 211.009 122.912 210.736 126.189 206.64C133.015 198.995 137.111 189.711 133.834 189.711C132.469 189.711 131.104 190.53 131.104 191.622C131.104 192.987 124.823 194.08 117.178 194.353Z" />
          </svg>
        </div>
        
        {/* <Image className={``} src={'/images/yolan'} width={3212} height={4818}  /> */}
      </div>

      <div className='flex flex-row mx-auto whitespace-pre-wrap'>
        <h2 className='text-center my-8 min-[400px]:px-6 min-[440px]:px-0 font-sans font-light text-xl sm:text-2xl text-primary'>
          <span className='inline-block flex-none '><RiDoubleQuotesL  fill='rgb(23 27 77)'/></span>
          {`${locale==='en'?' As a passionate biomedical engineer and surfer, I am dedicated to having a ':" En tant qu'ingénieur biomédical et surfeur passionné, je m'efforce d'avoir un "}`}
          <span className='text-primary font-medium'>{`${locale==='en'?'global positive impact ':"impact positif au niveau mondial "}`} </span>
          <span className='inline-block flex-none '><RiDoubleQuotesR  fill='rgb(23 27 77)'/></span>
        </h2>
      </div>
    </section>
    </SVGWrapper>
  )
}