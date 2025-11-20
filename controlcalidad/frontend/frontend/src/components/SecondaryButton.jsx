import React from "react";
import { fontSizes } from "../styles/fontSizes";

const SecondaryButton = ({
  text,
  color,
  width,
  height,
  textColor,
  fontWeight,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        width: width,
        height: height,
        color: textColor,
        fontWeight: fontWeight,
        fontSize: fontSizes.button,
        borderRadius: "15px",
        border: "none",
        cursor: "default",
        transition: "0.3s",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
