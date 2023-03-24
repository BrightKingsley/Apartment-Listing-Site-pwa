import React, { createContext, useState } from "react";

export const ModalContext = createContext({
  showModal: !null,
  triggerModal: () => {},
  modalMessage: "",
  actionConfirm: () => {},
  actionCancel: () => {},
  disableOnClick: false,
});

export const ModalContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [actionConfirm, setActionConfirm] = useState(null);
  const [actionCancel, setActionCancel] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [disableOnClick, setDisableOnClick] = useState(false);

  const triggerModal = (message, confirm, cancel, clickToDisable) => {
    !showModal ? setShowModal(true) : setShowModal(false);
    message && setModalMessage(message);
    confirm && typeof confirm === "function" && setActionConfirm(confirm);
    cancel && typeof cancel === "function" && setActionCancel(cancel);
    typeof clickToDisable === "boolean" && setDisableOnClick(clickToDisable);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        triggerModal,
        modalMessage,
        actionConfirm,
        actionCancel,
        disableOnClick,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
