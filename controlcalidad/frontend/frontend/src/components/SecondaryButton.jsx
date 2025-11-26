import React from "react";
import { fontSizes } from "../styles/fontSizes";

const SecondaryButton = ({
  text, // TEXTO DEL BOTÓN
  color, // COLOR DE FONDO DEL BOTÓN
  width, // ANCHO DEL BOTÓN
  height, // ALTO DEL BOTÓN
  textColor, // COLOR DEL TEXTO
  fontWeight, // PESO DE FUENTE
  fontSize, // TAMAÑO DE FUENTE
  onClick // FUNCION AL HACER CLICK
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
        fontSize: fontSize || fontSizes.button,
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
