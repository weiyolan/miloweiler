import { useState, useEffect, useCallback } from 'react';

// function useDimensions(ref) {
//   const [dimensions, setDimensions] = useState({width:undefined,height:undefined,top:undefined,bottom:undefined});

//   useLayoutEffect(() => {
//     const getDimensions = () => ({
//       width: ref.current.offsetWidth,
//       height: ref.current.offsetHeight,
//       top: ref.current.offsetTop,
//       bottom: ref.current.offsetTop + ref.current.offsetHeight
//     });

//     const handleResize = () => {
//       setDimensions(getDimensions());
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [ref]);

//   useLayoutEffect(() => {
//     setDimensions({
//       width: ref.current.offsetWidth,
//       height: ref.current.offsetHeight,
//       top: ref.current.offsetTop,
//       bottom: ref.current.offsetTop + ref.current.offsetHeight
//     });
//   }, []);

//   return dimensions;
// }

// export default useDimensions;


// const useDimensions = (ref) => {
//   const [dimensions, setDimensions] = useState({width:undefined,height:undefined,top:undefined,bottom:undefined});

//   const getDimensions = useCallback(() => {
//     if (ref.current) {
//       const { width, height, x, y } = ref.current.getBBox();
//       setDimensions({
//         width,
//         height,
//         x,
//         y,
//         top: y,
//         width: width,
//         bottom: y + height,
//         height: height
//       });
//     }
//   }, [ref]);

//   useState(() => {
//     getDimensions();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return dimensions;
// };

// export default useDimensions;


// import { useState, useEffect } from "react";

// function useDimensions() {
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
//   const [node, setNode] = useState(null);

//   useEffect(() => {
//     if (node) {
//       const resizeObserver = new ResizeObserver(entries => {
//         const { width, height } = entries[0].contentRect;
//         setDimensions({ width, height });
//       });
//       resizeObserver.observe(node);

//       return () => {
//         resizeObserver.disconnect();
//       };
//     }
//   }, [node]);

//   return [setNode, dimensions];
// }

// export default useDimensions;

// import { useState, useEffect } from 'react';

export default function useDimensions(ref) {
  const [dimensions, setDimensions] = useState({ width: undefined, height: undefined, top: undefined, bottom: undefined});

  useEffect(() => {
    function handleResize() {
      const { width, height, x, y} = ref.current.getBoundingClientRect();

      setDimensions({ width: width, height: height , top: y, bottom: y + height});
    }

    // const { width, height, x, y } = ref.current.getBBox();
//       setDimensions({
//         width,
//         height,
//         x,
//         y,
//         top: y,
//         width: width,
//         bottom: y + height,
//         height: height
//       });

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [ref]);

  return dimensions;
}