import React, { createContext, useState } from "react";

export const RentlyContext = createContext({
  showRently: !null,
  listing: null,
  triggerRently: () => {},
});

export const RentlyContextProvider = ({ children }) => {
  const [showRently, setShowRently] = useState(false);
  const [listing, setListing] = useState(null);

  const triggerRently = (trigger, listing) => {
    listing && setListing(listing);
    trigger !== undefined ? setShowRently(trigger) : setShowRently(true);
  };

  return (
    <RentlyContext.Provider
      value={{
        showRently,
        triggerRently,
        listing,
      }}
    >
      {children}
    </RentlyContext.Provider>
  );
};
