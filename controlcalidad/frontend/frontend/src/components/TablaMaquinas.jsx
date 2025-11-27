import colores from "../styles/colores";
import FilaMaquina from "./FilaMaquina";
import { fontSizes } from "../styles/fontSizes";

//---------------------------------------
// TABLA DE MAQUINAS DEL ADMIN PANEL
const TablaMaquinas = ({ maquinas, onEditar, onEliminar }) => {
  const tableContainerStyle = {
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    border: `2px solid ${colores.lightGray}`,
    borderRadius: "10px",
    overflow: "hidden",
  };

  const headerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 2fr",
    padding: "12px 10px",
    backgroundColor: colores.lightGray,
    color: colores.darkGray,
    fontWeight: "bold",
    fontSize: fontSizes.listSubtitles,
    textAlign: "center",
  };

  return (
    <div style={tableContainerStyle}>
      <div style={headerStyle}>
        <span>SECTOR</span>
        <span>MÁQUINA</span>
        <span>ESTADO</span>
        <span>ACCIONES</span>
      </div>
      {maquinas.map((maquina, index) => (
        <FilaMaquina
          key={maquina.id}
          maquina={maquina}
          index={index}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
};

export default TablaMaquinas;
