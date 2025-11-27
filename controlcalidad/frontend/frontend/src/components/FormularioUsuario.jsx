import InputField from "./InputField";
import DropDownMenu from "./DropDownMenu";
import colores from "../styles/colores";

//-----------------------------------------------------
// FORMULARIO USUARIO COMPONENTE
const FormularioUsuario = ({ formData, setFormData, modoEdicion }) => {
    const infoTextStyle = {
        fontSize: "14px",
        color: colores.primaryBlue,
        padding: "10px",
        margin: 0,
    };

    //-----------------------------------------------------
    // RENDERIZADO DEL COMPONENTE
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <InputField
                label={<>USUARIO<span style={{ color: colores.errorToast }}> *</span></>}
                value={formData.usuario}
                onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                width="300px"
                maxLength={30}
                placeholder="Ingrese usuario"
            />
            <InputField
                label={<>NOMBRE<span style={{ color: colores.errorToast }}> *</span></>}
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                width="300px"
                maxLength={30}
                placeholder="Ingrese nombre"
            />
            <InputField
                label={<>APELLIDO<span style={{ color: colores.errorToast }}> *</span></>}
                value={formData.apellido}
                onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                width="300px"
                maxLength={30}
                placeholder="Ingrese apellido"
            />
            <DropDownMenu
                label={<>ROL<span style={{ color: colores.errorToast }}> *</span></>}
                options={["", "OPERADOR", "ADMIN"]}
                value={formData.rol}
                onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                width="300px"
                maxLength={30}
            />

            {formData.rol === "ADMIN" && (
                <InputField
                    label={modoEdicion ? "Contraseña (dejar vacío para mantener)" : <>CLAVE <span style={{ color: colores.errorToast }}> *</span></>}
                    type="password"
                    value={formData.passwordHash}
                    onChange={(e) => setFormData({ ...formData, passwordHash: e.target.value })}
                    width="300px"
                    maxLength={30}
                    placeholder="Ingrese contraseña"
                />
            )}

            {formData.rol === "OPERADOR" && (
                <p style={infoTextStyle}>
                    ℹ️ Los operadores no requieren contraseña
                </p>
            )}

            <DropDownMenu
                label={<>ESTADO<span style={{ color: colores.errorToast }}> *</span></>}
                options={["ACTIVO", "INACTIVO"]}
                value={formData.activo ? "ACTIVO" : "INACTIVO"}
                onChange={(e) => setFormData({ ...formData, activo: e.target.value === "ACTIVO" })}
            />
        </div>
    );
};

export default FormularioUsuario;
