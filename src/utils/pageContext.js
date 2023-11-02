import React,{ createContext, useContext } from 'react';

const PageContext = createContext();

export function PageWrapper({ className, ...props }) {
  //   Navbar Open?
  //   Shopping Cart Open?
  //   Checkout Open?
  //   const [isOpen, toggleOpen] = useCycle(false, true);

  let sharedState = {
    ...props,
  };

  delete sharedState.children;

  return (
    <PageContext.Provider value={sharedState}>
      {/* <div className={className}>{props.children}</div> */}
      {props.children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}