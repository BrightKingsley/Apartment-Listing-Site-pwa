import { Close } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "../../context/ModalContext";
import Overlay from "../Overlay";
import classes from "./Modal.module.css";

const Modal = () => {
  const {
    showModal,
    triggerModal,
    modalMessage,
    actionConfirm,
    actionCancel,
    disableOnClick,
  } = useContext(ModalContext);

  // useEffect(() => {
  //   window.addEventListener("keydown", (e) => handleKey(e));
  // });

  const handleShowModal = () => {
    actionCancel && actionCancel();
    triggerModal();
  };

  // const handleKey = (e) => {
  //   e.code === "Escape" && handleShowModal();
  // };

  return createPortal(
    showModal && (
      <div className={classes.modalWrapper}>
        <Overlay
          show={showModal}
          handleshowOverlay={handleShowModal}
          disableOnClick={disableOnClick}
        />
        <div className={classes.modal}>
          <span
            className={classes.close}
            onClick={() => handleShowModal()}
            title="hide modal"
          >
            <IconButton>
              <Close />
            </IconButton>
          </span>
          <div className={classes.message}>{modalMessage}</div>
          <div className={classes.actionBtn}>
            <Button
              disableElevation={true}
              style={{
                backgroundColor: "#d34949",
                color: "#fff",
                fontWeight: "bold",
              }}
              onClick={() => {
                actionCancel();
                triggerModal();
              }}
            >
              Cancel
            </Button>
            <Button
              disableElevation={true}
              style={{
                backgroundColor: "#07594b",
                color: "#fff",
                fontWeight: "bold",
              }}
              onClick={() => {
                actionConfirm();
                triggerModal();
                // triggerNotification("logged out");
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    ),

    document.getElementById("modal")
  );
};

export default Modal;
