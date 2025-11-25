import SecondaryButton from "./SecondaryButton";
import colores from "../styles/colores";
import { fontSizes } from "../styles/fontSizes";
import { buttonSizes } from "../styles/buttonSize";

const TablaControles = ({ bobinas, parametros = [], onEstadoChange }) => {
  // Calcular columnas dinámicamente: bobina + maq + ayu1 + ayu2 + parámetros
  const gridTemplate = `0.5fr 1.5fr 1.5fr 1.5fr ${parametros.map(() => "1fr").join(" ")}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
      <div style={{ flex: 1, overflow: "auto" }}>
        <div style={{ minWidth: "max-content" }}>
          {/* ENCABEZADO FIJO */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: gridTemplate,
              color: colores.black,
              padding: "15px 20px",
              borderBottom: `2px solid ${colores.black}`,
              fontSize: fontSizes.button,
              fontWeight: "regular",
              backgroundColor: colores.white,
              position: "sticky",
              top: 0,
              zIndex: 10,
            }}
          >
            <span>BOBINA</span>
            <span>MAQ.</span>
            <span>AYU. 1</span>
            <span>AYU. 2</span>
            {parametros.map((param) => (
              <span key={param.id} style={{ textAlign: "center" }}>
                {param.nombreParametro.toUpperCase()}
              </span>
            ))}
          </div>

          {/* FILAS */}
          {bobinas.map((bobina, index) => (
            <div
              key={bobina.id}
              style={{
                display: "grid",
                gridTemplateColumns: gridTemplate,
                padding: "15px 20px",
                backgroundColor: index % 2 === 0 ? colores.secondaryGray : colores.white,
                alignItems: "center",
                color: colores.black,
                fontSize: fontSizes.textList,
                borderBottom: `1px solid ${colores.lightGray}`,
                borderLeft: `4px solid ${colores.primaryBlue}`,
                fontWeight: "600",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
            <span style={{ fontWeight: "bold" }}>{bobina.numero}</span>
            <span style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>{bobina.maquinista}</span>
            <span style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>{bobina.ayudante1}</span>
            <span style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>{bobina.ayudante2 || "-"}</span>

            {/* BOTONES DE ESTADO DINÁMICOS */}
            {parametros.map((param) => {
              const estado = bobina[param.nombreParametro];
              const coloresEstado = {
                BIEN: colores.primaryGreen,
                REGULAR: colores.primaryYellow,
                MAL: colores.primaryRed,
              };


              return (
                <div key={param.id} style={{ display: "flex", justifyContent: "center" }}>
                  {estado ? (
                    <SecondaryButton
                      text={estado}
                      color={coloresEstado[estado]}
                      textColor="white"
                      width={buttonSizes.smallButton}
                      height="40px"
                      fontSize={fontSizes.body}
                      fontWeight="bold"
                      onClick={() => onEstadoChange && onEstadoChange(bobina.id, param.nombreParametro, null)}
                    />
                  ) : (
                    <span style={{ fontSize: "1.2rem", color: "#ccc" }}>-</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default TablaControles;
