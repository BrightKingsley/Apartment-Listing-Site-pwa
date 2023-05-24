import { useLottie } from "lottie-react";
import React from "react";
// import loading from "../../animation/House_Cloud-1.json";
import loading_1 from "../../animation/ani-h.json";
import loading_2 from "../../animation/ani-1.json";
import loading_3 from "../../animation/ani-2.json";
import loading_4 from "../../animation/ani-3.json";
import loading_5 from "../../animation/ani-4.json";
import loading_6 from "../../animation/ani-5.json";
import classes from "./ActivityIndicator.module.css";

const ActivityIndicator = ({ variant, color, bg }) => {
  let animation;
  switch (variant) {
    case "snake":
      if (color === "accent") {
        animation = loading_3;
      } else {
        animation = loading_2;
      }
      break;

    case "dash":
      if (color === "accent") {
        animation = loading_4;
      }else if(color === "white") {
        animation = loading_6;
      } else {
        animation = loading_5;
      }
      break;

    default:
      animation = loading_1;
      break;
  }

  const options = {
    animationData: animation,
    loop: true,
  };

  const { View, setSpeed } = useLottie(options);
  setSpeed(1.2);

  return (
    <div
      className={`${classes.activityContainer} ${
        variant === "dash" ? classes.dash : ""
      }`}
      style={{
        backgroundColor: bg === "trans" ? "transparent" : null,
      }}
    >
      <div className={classes.activityWrapper}>{View}</div>
    </div>
  );
};

export default ActivityIndicator;
