import { useAppContext } from "@/utils/appContext";
import { usePageContext } from "@/utils/pageContext";
import { gsap } from "gsap/dist/gsap";
import React, { useEffect, useRef } from "react";

const Path = ({ open, darkMode, openD, closeD, openOp, closeOp, ...props }) => {
  let pathRef = useRef(null)
  let ctx = useRef(gsap.context(() => { }))
  useEffect(() => { return () => ctx.current.revert() }, [])

  useEffect(() => {
    ctx.current.add(() => {
      gsap.to(pathRef.current, {
        attr: { d: open ? openD : closeD },
        strokeOpacity: open ? openOp : closeOp,
        duration: 0.5,
      }, 0)
    })
  }, [open])

  return (
    < path
      ref={pathRef}
      fill="transparent"
      strokeWidth="2.5"
      // stroke={`${props.open?'#171B4D':'hsl(236, 0%, 100%)'}`}
      stroke={`${open ? '#FFF5EA' : darkMode ? '#FFF5EA' : '#000'}`}
      // stroke="hsl(236, 45%, 20%)"
      strokeLinecap="round"
      {...props}
    />)
};

export default function NavToggle({ open, className }) {
  const { locale } = useAppContext()
  const { darkMode } = usePageContext()
  return (
    <button title={`${locale === 'en' ? 'Menu toggle' : 'Ouvrir et fermer le menu'}`} className={'flex justify-center items-center w-10 h-10 absolute top-0 right-0 ' + className}>
      <svg className='w-[17px] sm:w-[23px]' viewBox="0 0 23 23">
        <Path open={open} darkMode={darkMode}
          closeD="M 2 2.5 L 20 2.5"
          openD="M 3 16.5 L 17 2.5"
          closeOp={100}
          openOp={100}
        />
        <Path open={open} darkMode={darkMode}
          closeD="M 2 9.423 L 20 9.423"
          openD="M 2 9.423 L 20 9.423"
          closeOp={100}
          openOp={0}
        // className='opacity-100'
        // transition={{ duration: 0.1 }}
        />
        <Path open={open} darkMode={darkMode}
          closeD="M 2 16.346 L 20 16.346"
          openD="M 3 2.5 L 17 16.346"
          closeOp={100}
          openOp={100}
        />
      </svg>
    </button>
  )
};
