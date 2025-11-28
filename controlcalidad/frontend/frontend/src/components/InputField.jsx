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

            {/* CONTENEDOR DEL INPUT CON CONTADOR */}
            <div style={{ position: "relative", width: width }}>
                {/* INPUT (CAMPO DE TEXTO) */}
                <input
                    type="text" // TIPO DE INPUT
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder} // TEXTO PLACEHOLDER
                    maxLength={maxLength} // LONGITUD MÁXIMA DEL INPUT
                    readOnly={readOnly}   // SI ES TRUE EL INPUT NO SE PUEDE EDITAR
                    style={{
                        width: "100%",
                        height: height,
                        padding: "0 12px",
                        paddingRight: maxLength ? "50px" : "12px", // ESPACIO PARA EL CONTADOR
                        borderRadius: "10px",
                        border: `1px solid ${colores.black}`,
                        backgroundColor: readOnly ? colores.white : colores.white, // COLOR DE FONDO SI ES READONLY
                        fontSize: fontSizes.dropDownText,
                        color: colores.black,
                        outline: "none", // QUITA EL BORDE AZUL AL HACER CLICK
                        boxSizing: "border-box"
                    }}
                />
                
                {/* CONTADOR DE CARACTERES DENTRO DEL INPUT */}
                {maxLength && (
                    <span style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "11px",
                        color: colores.primaryRed,
                        fontWeight: "500",
                        pointerEvents: "none" // PARA QUE NO INTERFIERA CON EL CLICK
                    }}>
                        {value.length}/{maxLength}
                    </span>
                )}
            </div>
        </div>
    );
};

export default InputField;
