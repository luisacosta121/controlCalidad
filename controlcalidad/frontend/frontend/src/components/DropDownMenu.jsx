import React from "react";
import colores from "../styles/colores";
import { fontSizes } from "../styles/fontSizes";

const MAX_TRUNCATE_LENGTH = 12; // MÁXIMO DE CARACTERES ANTES DE TRUNCAR

//------------------------------------------------
// COMPONENTE: DropDownMenu
const DropDownMenu = ({
  label, // ETIQUETA AL LADO DEL SELECT
  value, // VALOR SELECCIONADO
  onChange,
  height, // ALTURA DEL SELECT
  gap = "20px", // ESPACIO ENTRE LABEL Y SELECT
  width = "200px", // ANCHO DEL SELECT
  options = [], // OPCIONES DEL SELECT
}) => {

  //------------------------------------------------
  // FUNCION TRUNCATE PARA ACORTAR TEXTOS LARGOS
  const truncateText = (text) =>
    text.length > MAX_TRUNCATE_LENGTH ? text.substring(0, MAX_TRUNCATE_LENGTH) + " ..." : text;

  //------------------------------------------------
  // FUNCION PARA CONVERTIR DIFERENTES FORMATOS DE OPCIONES A UN FORMATO UNIFORME
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

  //------------------------------------------------
  // VERIFICAR QUE OPTIONS SEA UN ARRAY
  if (!Array.isArray(options)) {
    console.warn("DropDownMenu: options NO ES ARRAY:", options);
    options = [];
  }

  //------------------------------------------------
  // RENDERIZADO DEL COMPONENTE
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: gap,
        marginBottom: "10px",
      }}
    >
      {/* LABEL (TEXTO FUERA DEL DROPDOWN) */}
      <label
        style={{
          fontSize: fontSizes.dropDownText,
          color: colores.black,
          width: "180px",
          textAlign: "right",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={label}
      >
        {truncateText(label)}
      </label>

      {/* SELECT (OPCIONES DEL DROPDOWN) */}
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
          // ESTILOS PARA LA FLECHA DEL SELECT
          appearance: "none",
          backgroundImage: // FLECHA HACIA ABAJO DEL SELECT
            "linear-gradient(45deg, transparent 50%, black 50%), linear-gradient(135deg, black 50%, transparent 50%)",
          backgroundPosition: // POSICIÓN DE LA FLECHA
            "calc(100% - 15px) calc(50% - 3px), calc(100% - 10px) calc(50% - 3px)",
          backgroundSize: "5px 5px, 5px 5px", // TAMAÑO DE LA FLECHA
          backgroundRepeat: "no-repeat", // EVITAR REPETICIÓN DE LA FLECHA
        }}
      >
        {/* OPCIONES DEL SELECT */}
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
