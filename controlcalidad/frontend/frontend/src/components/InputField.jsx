import React from "react";
import colores from "../styles/colores";
import { fontSizes } from "../styles/fontSizes";

const InputField = ({
    label,
    value,
    onChange,
    width,
    height,
    gap,
    placeholder = "",
}) => {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: gap, marginBottom: "10px" }}>

            {/* Label */}
            <label style={{
                fontSize: fontSizes.dropDownText,
                color: colores.black,
                fontWeight: "regular",
                width: "180px",
                textAlign: "left",
                whiteSpace: "nowrap",
                overflow: "hidden",          // ⬅ NECESARIO PARA MOSTRAR “...”
                textOverflow: "ellipsis"
            }}>
                {label}
            </label>

            {/* Input */}
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{
                    width: width,
                    height: height,
                    padding: "0 12px",
                    borderRadius: "10px",
                    border: `1px solid ${colores.black}`,
                    backgroundColor: colores.white,
                    fontSize: fontSizes.dropDownText,
                    color: colores.black,
                    outline: "none",
                }}
            />
        </div>
    );
};

export default InputField;
