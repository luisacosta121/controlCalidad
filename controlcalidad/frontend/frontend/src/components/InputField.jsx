import React from "react";
import colores from "../styles/colores";
import { fontSizes } from "../styles/fontSizes";

//------------------------------------------------
// COMPONENTE: InputField
const InputField = ({
    label, // ETIQUETA AL LADO DEL INPUT
    value, // VALOR DEL INPUT
    onChange, // FUNCIÓN ONCHANGE
    width, // ANCHO DEL INPUT
    height, // ALTURA DEL INPUT
    gap = "20px", // ESPACIO ENTRE LABEL E INPUT
    maxLength, // LONGITUD MÁXIMA DEL INPUT
    placeholder = "", // TEXTO PLACEHOLDER
    readOnly = false, // SI ES TRUE EL INPUT NO SE PUEDE EDITAR
}) => {

    //------------------------------------------------
    // RENDERIZADO DEL COMPONENTE
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: gap,
            marginBottom: "10px"
        }}>
            {/* LABEL (TEXTO FUERA DEL INPUT) */}
            <label style={{
                fontSize: fontSizes.dropDownText,
                color: colores.black,
                fontWeight: "regular",
                width: "180px",
                textAlign: "right",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis" // PARA TEXTO MUY LARGO AGREGA "..."
            }}>
                {label}
            </label>

            {/* INPUT (CAMPO DE TEXTO) */}
            <input
                type="text" // TIPO DE INPUT
                value={value}
                onChange={onChange}
                placeholder={placeholder} // TEXTO PLACEHOLDER
                maxLength={maxLength} // LONGITUD MÁXIMA DEL INPUT
                readOnly={readOnly}   // SI ES TRUE EL INPUT NO SE PUEDE EDITAR
                style={{
                    width: width,
                    height: height,
                    padding: "0 12px",
                    borderRadius: "10px",
                    border: `1px solid ${colores.black}`,
                    backgroundColor: readOnly ? colores.white : colores.white, // COLOR DE FONDO SI ES READONLY
                    fontSize: fontSizes.dropDownText,
                    color: colores.black,
                    outline: "none", // QUITA EL BORDE AZUL AL HACER CLICK
                }}
            />
        </div>
    );
};

export default InputField;
