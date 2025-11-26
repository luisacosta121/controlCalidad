import SecondaryButton from "./SecondaryButton";
import colores from "../styles/colores";
import { fontSizes } from "../styles/fontSizes";
import { buttonSizes } from "../styles/buttonSize";

const MAX_TRUNCATE_LENGTH = 18;

//---------------------------------------
// TABLA DE CONTROLES DE CALIDAD
const TablaControles = ({ bobinas, parametros = [], onEstadoChange }) => {
  // AJUSTA LAS COLUMNAS DE BOB MAQ AYU1 AYU2 + PARÁMETROS DINÁMICOS
  const gridTemplate = `0.5fr 1.5fr 1.5fr 1.5fr ${parametros.map(() => "1fr").join(" ")}`;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%"
    }}>
      <div style={{ flex: 1, overflow: "auto" }}>
        <div style={{ minWidth: "max-content" }}>
          {/* ENCABEZADO FIJO */}
          <div
            // ENCABEZADO CON BOB MAQ AYU1 AYU2 + PARÁMETROS DINÁMICOS
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
            <span>MAQUINISTA</span>
            <span>AYUDANTE 1</span>
            <span>AYUDANTE 2</span>
            {/* PARÁMETROS DINÁMICOS */}
            {parametros.map((param) => (
              <span key={param.id} style={{ textAlign: "center" }}>
                {param.nombreParametro.toUpperCase()}
              </span>
            ))}
          </div>

          {/* FILAS RECORRE  CADA BOBINA DEL ARRAY Y GENERA UNA FILA */}
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
                borderLeft: `4px solid ${colores.primaryBlue}`,
                fontWeight: "bold",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span>{bobina.numero}</span>
              <span title={bobina.maquinista}>
                {bobina.maquinista.length > MAX_TRUNCATE_LENGTH ? bobina.maquinista.substring(0, MAX_TRUNCATE_LENGTH).toUpperCase() + "..." : bobina.maquinista.toUpperCase()}
              </span>
              <span title={bobina.ayudante1 || "-"}>
                {bobina.ayudante1 ? (bobina.ayudante1.length > MAX_TRUNCATE_LENGTH ? bobina.ayudante1.substring(0, MAX_TRUNCATE_LENGTH).toUpperCase() + "..." : bobina.ayudante1.toUpperCase()) : "-"}
              </span>
              <span title={bobina.ayudante2 || "-"}>
                {bobina.ayudante2 ? (bobina.ayudante2.length > MAX_TRUNCATE_LENGTH ? bobina.ayudante2.substring(0, MAX_TRUNCATE_LENGTH).toUpperCase() + "..." : bobina.ayudante2.toUpperCase()) : "-"}
              </span>

              {/* BOTONES DE ESTADO DINÁMICOS */}
              {parametros.map((param) => {
                const estado = bobina[param.nombreParametro];
                const coloresEstado = {
                  BIEN: colores.primaryGreen,
                  REGULAR: colores.primaryYellow,
                  MAL: colores.primaryRed,
                };

                return (
                  <div key={param.id} style={{
                    display: "flex",
                    justifyContent: "center"
                  }}>
                    {estado ? (
                      <SecondaryButton
                        text={estado}
                        color={coloresEstado[estado]}
                        textColor={colores.white}
                        width={buttonSizes.smallButton}
                        height="40px"
                        fontSize={fontSizes.body}
                        fontWeight="semi-bold"
                        onClick={() => onEstadoChange && onEstadoChange(bobina.id, param.nombreParametro, null)}
                      />
                    ) : (
                      <span style={{
                        fontSize: fontSizes.textList,
                        color: colores.black,
                      }}>-</span>
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
