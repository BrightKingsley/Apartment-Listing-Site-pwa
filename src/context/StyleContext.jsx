import React, { createContext, useState } from "react";

export const StyleContext = createContext({
  showSide: null,
  showClientsList: null,
  toggleClientList: () => {},
  toggleSidebar: () => {},
});

export const StyleContextProvider = ({ children }) => {
  const [showSide, setShowSide] = useState(true);
  const [showClientsList, setShowClientsList] = useState(false);

  const toggleSidebar = (show) => {
    show ? setShowSide(show) : setShowSide((prev) => !prev);
  };

  const toggleClientList = (show) => {
    show ? setShowClientsList(show) : setShowClientsList((prev) => !prev);
  };

  return (
    <StyleContext.Provider
      value={{
        showSide,
        toggleSidebar,
        showClientsList,
        toggleClientList,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};
