import colores from "../styles/colores";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";
import { fontSizes } from "../styles/fontSizes";
import { buttonSizes } from "../styles/buttonSize";

//---------------------------------------
// FILA DE MAQUINA EN LA TABLA DE MAQUINAS DEL ADMIN PANEL
const FilaMaquina = ({ maquina, index, onEditar, onEliminar }) => {
  const rowStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 2fr",
    padding: "12px 10px",
    alignItems: "center",
    color: colores.black,
    fontSize: fontSizes.textList,
    borderLeft: `4px solid ${colores.primaryOrange}`,
    fontWeight: "600",
    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: index % 2 === 0 ? colores.white : colores.secondaryGray,
  };

  const actionButtonsStyle = {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  };

  return (
    <div style={rowStyle}>
      <span>{maquina.sector}</span>
      <span>MÁQUINA {maquina.numero}</span>
      <span style={{ display: "flex", justifyContent: "center" }}>
        <SecondaryButton
          text={maquina.activo ? "ACTIVO" : "INACTIVO"}
          color={maquina.activo ? colores.primaryGreen : colores.primaryRed}
          textColor={colores.white}
          width={buttonSizes.smallMediumButton}
          height="30px"
          fontSize={fontSizes.body}
          fontWeight="bold"
          disabled
        />
      </span>
      <div style={actionButtonsStyle}>
        <PrimaryButton
          text="EDITAR"
          color={colores.primaryBlue}
          textColor={colores.white}
          onClick={() => onEditar(maquina)}
          width={buttonSizes.smallButton}
          height="50px"
          fontWeight="bold"
          fontSize={fontSizes.body}
        />
        <PrimaryButton
          text="ELIMINAR"
          color={colores.primaryRed}
          textColor={colores.white}
          onClick={() => onEliminar(maquina.id)}
          width={buttonSizes.smallButton}
          height="50px"
          fontWeight="bold"
          fontSize={fontSizes.body}
        />
      </div>
    </div>
  );
};

export default FilaMaquina;
