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
    readOnly = false,   // <-- agregado
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
                overflow: "hidden",
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
                readOnly={readOnly}   // <-- agregado
                style={{
                    width: width,
                    height: height,
                    padding: "0 12px",
                    borderRadius: "10px",
                    border: `1px solid ${colores.black}`,
                    backgroundColor: readOnly ? "#e6e6e6" : colores.white, // <-- agregado
                    fontSize: fontSizes.dropDownText,
                    color: colores.black,
                    outline: "none",
                }}
            />
        </div>
    );
};

export default InputField;
