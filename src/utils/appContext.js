import React, { createContext, useContext, useEffect, useState } from 'react';
import useWindowSize from './useWindowSize';
import { useRouter } from 'next/router';
// import useLocalStorage from './useLocalStorage';
// import { toast } from 'react-hot-toast';
// import { useCycle } from 'framer-motion';

const AppContext = createContext();

export function AppWrapper({ children, scrolled , className}) {
  let { width, height, mobileHeight } = useWindowSize();
  let { locale } = useRouter();
  // const [navIsOpen, toggleNav] = useCycle(false, true);
  // const [cartIsOpen, toggleCart] = useCycle(false, true);

  function handleLightboxes(event) {
    if (navIsOpen && event.target === document.getElementById('navBackground')) {
      toggleNav()
    } else if (cartIsOpen && event.target === document.getElementById('cartBackground')) {
      toggleCart()
    }
  };

  return (
    <AppContext.Provider
      value={{
        width: width,
        height: height,
        mobileHeight: mobileHeight,
        locale: locale,
        // mobile:width<768,
        // breakPointSmall: breakPointSmall,
        // noBlur: true,
        scrolled: scrolled,
        // navIsOpen: navIsOpen,
        // toggleNav: toggleNav,
        handleLightboxes: handleLightboxes,
      }}>
        <div className={`${className}`}>
      {children}
      </div>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
