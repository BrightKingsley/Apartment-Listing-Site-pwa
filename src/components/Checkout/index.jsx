import React, { useContext, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import classes from "./Checkout.module.css";
import Overlay from "../Overlay";
import { createPortal } from "react-dom";
import { CheckoutContext } from "../../context/CheckoutContext";
import Input from "../Input";
import { AuthContext } from "../../context/AuthContext";
import { NotificationContext } from "../../context/NotificationContext";
import { ModalContext } from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

// const config = {
//   reference: new Date().getTime().toString(),
//   email: "briggskvngzz@gmail.com",
//   amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
//   publicKey: "pk_test_bd2ebc6e0df8b4fd0bab4bce8c082598afa44ed9",
// };

const CheckoutHook = () => {
  const { user, isAuth } = useContext(AuthContext);
  const { triggerNotification } = useContext(NotificationContext);
  const { triggerModal } = useContext(ModalContext);

  const navigate = useNavigate();

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    if (reference.status === "success") {
      triggerNotification("payment successful");
    } else {
      triggerNotification("payment failed");
    }
  };

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    triggerNotification("checkout closed");
  };

  const [config, setConfig] = useState({
    reference: new Date().getTime().toString(),
    email: "",
    amount: 0, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_bd2ebc6e0df8b4fd0bab4bce8c082598afa44ed9",
  });

  const getValue = (value) => {
    setConfig((prev) => ({
      ...prev,
      reference: new Date().getTime().toString(),
      email: user?.email,
      amount: value,
    }));
  };

  const initializePayment = usePaystackPayment(config);

  const navigateLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div>
      <Input type="number" setValue={getValue} />
      <button
        onClick={() => {
          isAuth
            ? initializePayment(onSuccess, onClose)
            : triggerModal(
                "You must be logged in to initialize payment",
                () => navigateLogin,
                () => triggerModal
              );
        }}
      >
        make payment
      </button>
    </div>
  );
};

function Checkout() {
  const { showCheckout, triggerCheckout, actionCancel, disableOnClick } =
    useContext(CheckoutContext);

  // useEffect(() => {
  //   window.addEventListener("keydown", (e) => handleKey(e));
  // });

  const handleShowCheckout = () => {
    actionCancel && actionCancel();
    triggerCheckout();
  };

  // const handleKey = (e) => {
  //   e.code === "Escape" && handleShowCheckout();
  // };

  return createPortal(
    showCheckout && (
      <div className={classes.checkoutWrapper}>
        <Overlay
          show={showCheckout}
          handleshowOverlay={handleShowCheckout}
          disableOnClick={disableOnClick}
        />
        <div className={classes.checkout}>
          <span
            className={classes.close}
            onClick={() => handleShowCheckout()}
            title="hide modal"
          >
            <IconButton>
              <Close />
            </IconButton>
          </span>
          <CheckoutHook />
        </div>
      </div>
    ),
    document.getElementById("checkout")
  );
}

export default Checkout;
