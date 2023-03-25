import React,{ createContext, useContext } from 'react';

const PageContext = createContext();

export function PageWrapper(props) {

//   Navbar Open?
//   Shopping Cart Open?
//   Checkout Open?
//   const [isOpen, toggleOpen] = useCycle(false, true);

  let sharedState = {
        ...props
    };

    delete sharedState.children;

  return (
    <PageContext.Provider value={sharedState}>
      {props.children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}