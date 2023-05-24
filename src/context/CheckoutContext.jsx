import React, { createContext, useState } from "react";

export const CheckoutContext = createContext({
  showCheckout: !null,
  triggerCheckout: () => {},
  modalMessage: "",
  actionConfirm: () => {},
  actionCancel: () => {},
  disableOnClick: false,
});

export const CheckoutContextProvider = ({ children }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [actionConfirm, setActionConfirm] = useState(null);
  const [actionCancel, setActionCancel] = useState(null);
  const [modalMessage, setCheckoutMessage] = useState("");
  const [disableOnClick, setDisableOnClick] = useState(false);

  const triggerCheckout = (message, confirm, cancel, clickToDisable) => {
    !showCheckout ? setShowCheckout(true) : setShowCheckout(false);
    message && setCheckoutMessage(message);
    confirm && typeof confirm === "function" && setActionConfirm(confirm);
    cancel && typeof cancel === "function" && setActionCancel(cancel);
    typeof clickToDisable === "boolean" && setDisableOnClick(clickToDisable);
  };

  return (
    <CheckoutContext.Provider
      value={{
        showCheckout,
        triggerCheckout,
        modalMessage,
        actionConfirm,
        actionCancel,
        disableOnClick,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
