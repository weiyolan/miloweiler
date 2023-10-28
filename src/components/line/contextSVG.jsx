import { createContext, useContext } from 'react';

const SVGContext = createContext();

export function SVGWrapper({ children, prevRatio, myRatio, scrollMin, scrollMax, handleLength, animationSpeed, ...props }) {

  return (
    <SVGContext.Provider value={{
      myRatio: myRatio,
      prevRatio: prevRatio,
      scrollMin: scrollMin,
      scrollMax: scrollMax,
      animationSpeed: animationSpeed,
      handleLength: handleLength,
      ...props
    }}>
      {children}
    </SVGContext.Provider>
  );
}

export function useSVGContext() {
  return useContext(SVGContext);
}