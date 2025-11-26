import PrimaryButton from "../components/PrimaryButton";
import { buttonSizes } from "../styles/buttonSize";
import colores from "../styles/colores";
import { fontSizes } from "../styles/fontSizes";

//-------------------------------------------------
// LISTA DE PROCESOS
const ListaProcesos = ({ procesos, onVerDetalles }) => {
  // ------------------------------------------------
  // RENDERIZADO
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%"
    }}>
      {/* ENCABEZADOS FIJOS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 5fr 1fr",
          color: colores.black,
          padding: "0 20px 10px 20px",
          borderBottom: `1px solid ${colores.black}`,
          fontSize: fontSizes.dropDownText,
          backgroundColor: colores.white,
          position: "sticky", // MANTIENE EL ENCABEZADO VISIBLE AL HACER SCROLL
          top: 0, // POSICIÓN SUPERIOR
          zIndex: 10, // NIVEL DE SUPERPOSICIÓN
          flexShrink: 0 // EVITA QUE SE ENCOJA
        }}
      >
        <span>SECTOR</span>
        <span>MAQUINA</span>
        <span>LOTE</span>
        <span>TRABAJO</span>
        <span></span>
      </div>

      {/* FILAS CON SCROLL */}
      <div style={{
        flex: 1,
        overflow: "auto"
      }}>
        {procesos.map((p, index) => (
          <div
            key={p.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 5fr 1fr",
              padding: "10px 20px",
              backgroundColor: index % 2 === 0 ? colores.secondaryGray : colores.white,
              alignItems: "center",
              color: colores.black,
              fontSize: fontSizes.textList,
              borderLeft: `4px solid ${colores.primaryBlue}`, // BARRA AZUL LATERAL
              fontWeight: "600",
              boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span>{p.sector}</span>
            <span>{p.maquina}</span>
            <span>{p.lote}</span>

            {/* TRABAJO CON TRUNCAMIENTO */}
            <span
              style={{
                whiteSpace: "nowrap", // UNA SOLA LÍNEA
                overflow: "hidden", // OCULTA DESBORDES
                textOverflow: "ellipsis", // TRUNCAMIENTO CON PUNTOS
              }}
              title={p.trabajo}
            >
              {p.trabajo}
            </span>

            {/* BOTÓN DETALLES */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              paddingRight: "20px",
              marginLeft: "10px"
            }}>
              <PrimaryButton
                text="VER DETALLES"
                color={colores.primaryOrange}
                textColor={colores.white}
                width={buttonSizes.smallMediumButton}
                height="45px"
                fontSize={fontSizes.buttonText}
                fontWeight="bold"
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
