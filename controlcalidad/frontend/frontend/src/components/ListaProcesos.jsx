import PrimaryButton from "../components/PrimaryButton";
import { buttonSizes } from "../styles/buttonSize";
import colores from "../styles/colores";
import { fontSizes } from "../styles/fontSizes";

const ListaProcesos = ({ procesos, onVerDetalles }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>

      {/* ENCABEZADOS FIJOS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 5fr 1fr",
          color: colores.black,
          paddingBottom: "10px",
          borderBottom: `1px solid ${colores.black}`,
          fontSize: fontSizes.dropDownText,
          backgroundColor: colores.white,
          position: "sticky",
          top: 0,
          zIndex: 10,
          flexShrink: 0
        }}
      >
        <span>SECTOR</span>
        <span>MAQUINA</span>
        <span>LOTE</span>
        <span>TRABAJO</span>
        <span></span>
      </div>

      {/* FILAS CON SCROLL */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {procesos.map((p, index) => (
          <div
            key={p.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 5fr 1fr",
              padding: "10px 0",
              backgroundColor: index % 2 === 0 ? colores.secondaryGray : colores.white,
              alignItems: "center",
              color: colores.black,
              fontSize: fontSizes.textList,
            }}
          >
            <span>{p.sector}</span>
            <span>{p.maquina}</span>
            <span>{p.lote}</span>

            {/* TRABAJO */}
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={p.trabajo}
            >
              {p.trabajo}
            </span>

            {/* BOTÓN DETALLES */}
            <div style={{ display: "flex", justifyContent: "center", paddingRight: "20px" }}>
              <PrimaryButton
                text="VER DETALLES"
                color={colores.primaryOrange}
                textColor={colores.white}
                width={buttonSizes.mediumButton}
                height="50px"
                fontSize={fontSizes.buttonText}
                fontWeight="regular"
                onClick={() => onVerDetalles && onVerDetalles(p)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaProcesos;
