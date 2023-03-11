import { useLottie } from "lottie-react";
import React from "react";
import loading from "../../animation/House_Cloud-1.json";
import classes from "./ActivityIndicator.module.css";

const ActivityIndicator = () => {
  const options = {
    animationData: loading,
    loop: true,
  };

  const { View, setSpeed } = useLottie(options);
  setSpeed(1.2);

  return <div className={classes.activityWrapper}>{View}</div>;
};

export default ActivityIndicator;
