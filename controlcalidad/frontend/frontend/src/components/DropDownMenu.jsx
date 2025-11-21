import React from "react";
import colores from "../styles/colores";
import { fontSizes } from "../styles/fontSizes";

const DropDownMenu = ({
  label,
  value,
  onChange,
  height,
  gap,
  width = "200px",
  options = [],
}) => {

  const truncateText = (text) =>
    text.length > 12 ? text.substring(0, 12) + " ..." : text;

  // 🔥 Compatible con strings, números y objetos de la BD
  const parseOption = (opt) => {
    if (typeof opt === "string") {
      return { value: opt, label: opt };
    }

    if (typeof opt === "number") {
      return { value: opt, label: opt.toString() };
    }

    if (typeof opt === "object" && opt !== null) {
      return {
        value: opt.id ?? opt.numero ?? opt.value ?? "",
        label: opt.numero ?? opt.nombre ?? opt.label ?? opt.value ?? "",
      };
    }

    return { value: "", label: "" };
  };

  // Evitar crash si options no es array
  if (!Array.isArray(options)) {
    console.warn("DropDownMenu: options NO ES ARRAY:", options);
    options = [];
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: gap,
        marginBottom: "10px",
      }}
    >
      {/* LABEL */}
      <label
        style={{
          fontSize: fontSizes.dropDownText,
          color: colores.black,
          width: "180px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={label}
      >
        {truncateText(label)}
      </label>

      {/* SELECT */}
      <select
        value={value}
        onChange={onChange}
        style={{
          width,
          height,
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
        {options.map((opt, i) => {
          const parsed = parseOption(opt);
          return (
            <option key={i} value={parsed.value}>
              {parsed.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDownMenu;
