import colores from "../styles/colores";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";
import { fontSizes } from "../styles/fontSizes";
import { buttonSizes } from "../styles/buttonSize";

//---------------------------------------
// FILA DE PARAMETRO EN LA TABLA DE PARAMETROS DEL ADMIN PANEL
const FilaParametro = ({ parametro, index, onEditar, onEliminar }) => {
  const rowStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr 1fr 2fr",
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
      <span>{parametro.sector?.sector || parametro.sector}</span>
      <span>{parametro.nombreParametro}</span>
      <span style={{ display: "flex", justifyContent: "center" }}>
        <SecondaryButton
          text={parametro.obligatorio ? "SÍ" : "NO"}
          color={parametro.obligatorio ? colores.primaryGreen : colores.primaryRed}
          textColor={colores.white}
          width={buttonSizes.smallMediumButton}
          height="30px"
          fontSize={fontSizes.body}
          fontWeight="bold"
          disabled
        />
      </span>
      <span style={{ display: "flex", justifyContent: "center" }}>
        <SecondaryButton
          text={parametro.activo ? "ACTIVO" : "INACTIVO"}
          color={parametro.activo ? colores.primaryGreen : colores.primaryRed}
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
          onClick={() => onEditar(parametro)}
          width={buttonSizes.smallButton}
          height="50px"
          fontWeight="bold"
          fontSize={fontSizes.body}
        />
        <PrimaryButton
          text="ELIMINAR"
          color={colores.primaryRed}
          textColor={colores.white}
          onClick={() => onEliminar(parametro.id)}
          width={buttonSizes.smallButton}
          height="50px"
          fontWeight="bold"
          fontSize={fontSizes.body}
        />
      </div>
    </div>
  );
};

export default FilaParametro;
