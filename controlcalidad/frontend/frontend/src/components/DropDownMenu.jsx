import React from "react";
import colores from "../styles/colores";
import { fontSizes } from "../styles/fontSizes";

const DropDownMenu = ({
    label,
    value,
    onChange,
    height,
    gap,
}) => {

    const truncateText = (text) =>
        text.length > 12 ? text.substring(0, 12) + " ..." : text;


    return (
        <div style={{ display: "flex", alignItems: "center", gap: gap, marginBottom: "10px" }}>

            {/* LABEL */}
            <label style={{
                fontSize: fontSizes.dropDownText,
                color: colores.black,
                fontWeight: "regular",
                width: "180px",
                textAlign: "left",
                whiteSpace: "nowrap",
                overflow: "hidden",          // ⬅ NECESARIO PARA MOSTRAR “...”
                textOverflow: "ellipsis"
            }} title={label} >{truncateText(label)}</label>

            {/* DROPDOWN */}
            <select
                value={value}
                onChange={(e) => {
                    onChange(e);
                    e.target.style.textOverflow = "clip";
                    setTimeout(() => {
                        e.target.style.textOverflow = "ellipsis";
                    }, 0);
                }}
                style={{
                    width: "200px",
                    height: height,
                    padding: "0 12px",
                    borderRadius: "10px",
                    border: `1px solid ${colores.black}`,
                    backgroundColor: colores.white,
                    fontSize: fontSizes.dropDownText,
                    color: colores.black,
                    cursor: "pointer",

                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",

                    appearance: "none",
                    backgroundImage:
                        "linear-gradient(45deg, transparent 50%, black 50%), linear-gradient(135deg, black 50%, transparent 50%)",
                    backgroundPosition:
                        "calc(100% - 15px) calc(50% - 3px), calc(100% - 10px) calc(50% - 3px)",
                    backgroundSize: "5px 5px, 5px 5px",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <option value="extrusion">LUIS ALBERTO ACOSTA</option>
                <option value="impresion">VERONICA PAULINA LILLO JARAMILLO</option>
                <option value="corte">SECTOR</option>
            </select>
        </div>
    );
};

export default DropDownMenu;
