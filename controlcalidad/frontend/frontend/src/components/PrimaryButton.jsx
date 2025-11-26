import React from "react";

const PrimaryButton = ({
  text, // TEXTO DEL BOTÓN
  color, // COLOR DE FONDO DEL BOTÓN
  width, // ANCHO DEL BOTÓN
  height, // ALTO DEL BOTÓN
  textColor, // COLOR DEL TEXTO
  fontSize, // TAMAÑO DE FUENTE
  fontWeight, // PESO DE FUENTE
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
        fontSize: fontSize,
        borderRadius: "15px",
        border: "none",
        cursor: "pointer",
        transition: "0.3s",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 4px 8px rgba(0, 0, 0.5, 0.5)",
      }}
      onMouseOver={(e) => (e.target.style.opacity = "0.7")}
      onMouseOut={(e) => (e.target.style.opacity = "1")}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
