import colores from "../styles/colores";
import SecondaryButton from "./SecondaryButton";
import { fontSizes } from "../styles/fontSizes";
import { buttonSizes } from "../styles/buttonSize";
import PrimaryButton from "./PrimaryButton";

const MAX_TRUNCATE_LENGTH = 15;
//---------------------------------------
// FILA DE USUARIO EN LA TABLA DE USUARIOS DEL ADMIN PANEL
const FilaUsuario = ({ usuario, index, onEditar, onEliminar }) => {
  const rowStyle = { // ESTILO DE FILA
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 2fr",
    padding: "12px 10px",
    alignItems: "center",
    color: colores.black,
    fontSize: fontSizes.textList,
    borderLeft: `4px solid ${colores.primaryOrange}`,
    fontWeight: "normal",
    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: index % 2 === 0 ? colores.white : colores.secondaryGray,
  };

  // ESTILO DE BOTONES DE ACCIÓN
  const actionButtonsStyle = {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  };

    // FUNCIÓN PARA TRUNCAR TEXTO A 20 CARACTERES
  const truncate = (text) => {
    if (!text) return "";
    return text.length > MAX_TRUNCATE_LENGTH ? text.substring(0, MAX_TRUNCATE_LENGTH) + "..." : text;
  };

  return (
    <div style={rowStyle}>
      <span title={usuario.usuario}>{truncate(usuario.usuario.toUpperCase())}</span>
      <span title={usuario.nombre}>{truncate(usuario.nombre.toUpperCase())}</span>
      <span title={usuario.apellido}>{truncate(usuario.apellido.toUpperCase())}</span>
      <span style={{ display: "flex", justifyContent: "center" }}>
        {/* BOTON DE ROL */}
        <SecondaryButton
          text={usuario.rol}
          color={usuario.rol === "ADMIN" ? colores.primaryOrange : colores.primaryBlue}
          textColor={colores.white}
          width={buttonSizes.smallMediumButton}
          height="30px"
          fontSize={fontSizes.body}
          fontWeight="bold"
          disabled
        />
      </span>
      <span style={{ display: "flex", justifyContent: "center" }}>
        {/* BOTON DE ESTADO */}
        <SecondaryButton
          text={usuario.activo ? "ACTIVO" : "INACTIVO"}
          color={usuario.activo ? colores.primaryGreen : colores.primaryRed}
          textColor={colores.white}
          width={buttonSizes.smallMediumButton}
          height="30px"
          fontSize={fontSizes.body}
          fontWeight="bold"
          disabled
        />
      </span>
      <div style={actionButtonsStyle}>
        {/* BOTON DE EDITAR */}
        <PrimaryButton
          text="EDITAR"
          color={colores.primaryBlue}
          textColor={colores.white}
          onClick={() => onEditar(usuario)}
          width={buttonSizes.smallButton}
          height="50px"
          fontWeight="bold"
          fontSize={fontSizes.body}
        />
        {/* BOTON DE ELIMINAR */}
        <PrimaryButton
          text="ELIMINAR"
          color={colores.primaryRed}
          textColor={colores.white}
          onClick={() => onEliminar(usuario.id)}
          width={buttonSizes.smallButton}
          height="50px"
          fontWeight="bold"
          fontSize={fontSizes.body}
        />
      </div>
    </div>
  );
};

export default FilaUsuario;
