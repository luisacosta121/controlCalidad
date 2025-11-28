import colores from "../styles/colores";
import FilaParametro from "./FilaParametro";
import { fontSizes } from "../styles/fontSizes";

//---------------------------------------
// TABLA DE PARAMETROS DEL ADMIN PANEL
const TablaParametros = ({ parametros, onEditar, onEliminar }) => {
  const headerRowStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr 1fr 2fr",
    color: colores.black,
    padding: "12px 10px",
    borderBottom: `1px solid ${colores.black}`,
    fontSize: fontSizes.dropDownText,
    fontWeight: "regular",
    backgroundColor: colores.white,
    position: "sticky",
    top: 0,
    zIndex: 10,
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%"
    }}>
      <div style={{ flex: 1, overflow: "auto" }}>
        <div style={{ minWidth: "max-content" }}>
          {/* Encabezado */}
          <div style={headerRowStyle}>
            <span>SECTOR</span>
            <span>PARAMETRO</span>
            <span>OBLIGATORIO</span>
            <span>ESTADO</span>
            <span style={{ textAlign: "center" }}>ACCIONES</span>
          </div>

          {/* Filas */}
          {parametros.map((parametro, index) => (
            <FilaParametro
              key={parametro.id}
              parametro={parametro}
              index={index}
              onEditar={onEditar}
              onEliminar={onEliminar}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TablaParametros;
