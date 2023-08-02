import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from "next/image";

 export function ScrollDown (props) {
    const styleDown = {transform:`translateY(${50})`};
    const styleUp = {transform: `translateY(0) scale(${1.1})`};
    
    // let [style,setStyle] = useState(styleDown);
    let [float, setFloat] = useState(false);

    function makeFloat () {
        // setStyle(float?styleDown:styleUp);
        setFloat(!float);
    }

    useEffect(() => {
        const timer = setInterval(()=>makeFloat(), 20);
        return () => clearInterval(timer)
    },[])

    return (
        <div style={float?styleDown:styleUp} className={'fixed bottom-6 left-1/2 -translate-x-1/2 w-6 cursor-pointer '} >
            {/* <Link href="#idia-lomist"> */}
                <Image width='100' height='100' className="w-full" alt={'arrow down'} src={'/images/arrowDown.png'}/>
            {/* </Link> */}
        </div>
    )
}


