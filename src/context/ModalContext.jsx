import React, { createContext, useState } from "react";

export const ModalContext = createContext({
  showModal: !null,
  triggerModal: () => {},
  modalMessage: "",
  actionConfirm: () => {},
  actionCancel: () => {},
});

export const ModalContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [actionConfirm, setActionConfirm] = useState(null);
  const [actionCancel, setActionCancel] = useState(null);
  const [modalMessage, setModalMessage] = useState("");

  const triggerModal = (message, confirm, cancel) => {
    !showModal ? setShowModal(true) : setShowModal(false);
    message && setModalMessage(message);
    confirm && typeof confirm === "function" && setActionConfirm(confirm);
    cancel && typeof cancel === "function" && setActionCancel(cancel);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        triggerModal,
        modalMessage,
        actionConfirm,
        actionCancel,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
