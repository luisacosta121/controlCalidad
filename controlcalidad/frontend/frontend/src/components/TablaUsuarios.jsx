import colores from "../styles/colores";
import { fontSizes } from "../styles/fontSizes";
import FilaUsuario from "./FilaUsuario";

//---------------------------------------------
// COMPONENTE TABLA DE USUARIOS
const TablaUsuarios = ({ usuarios, onEditar, onEliminar }) => {
    const headerRowStyle = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 2fr",
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
                        <span>USUARIO</span>
                        <span>NOMBRE</span>
                        <span>APELLIDO</span>
                        <span>ROL</span>
                        <span>ESTADO</span>
                        <span style={{ textAlign: "center" }}>ACCIONES</span>
                    </div>

                    {/* Filas */}
                    {usuarios.map((usuario, index) => (
                        <FilaUsuario
                            key={usuario.id}
                            usuario={usuario}
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

export default TablaUsuarios;
