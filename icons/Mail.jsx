import React from "react";
import Svg from "./resources/mail.svg";

function Mail({ ...props }) {
  return <Svg style={{ fill: "currentColor" }} {...props} />;
}

export default Mail;
