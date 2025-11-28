import InputField from "./InputField";
import DropDownMenu from "./DropDownMenu";
import colores from "../styles/colores";

//-----------------------------------------------------
// FORMULARIO USUARIO COMPONENTE
const FormularioUsuario = ({ formData, setFormData }) => {
    const infoTextStyle = {
        fontSize: "14px",
        color: colores.primaryBlue,
        padding: "0px",
        margin: 0,
    };

    //-----------------------------------------------------
    // RENDERIZADO DEL COMPONENTE
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <InputField
                label={<>USUARIO<span style={{ color: colores.errorToast }}> *</span></>}
                value={formData.usuario}
                onChange={(e) => {
                    let valor = e.target.value.toUpperCase();

                    // Solo letras, números y guión bajo
                    valor = valor.replace(/[^A-Z0-9_]/g, "");

                    // Longitud máxima ya la controla maxLength
                    setFormData({ ...formData, usuario: valor });
                }}
                width="300px"
                maxLength={12}
                placeholder="Ingrese usuario"
            />
            <InputField
                label={
                    <>NOMBRE<span style={{ color: colores.errorToast }}> *</span></>
                }
                value={formData.nombre}
                onChange={(e) => {
                    let valor = e.target.value.toUpperCase();

                    // Permitir solo letras y un solo espacio
                    valor = valor.replace(/[^A-Z ]/g, "");   // quita números y símbolos

                    // No permitir más de un espacio
                    valor = valor.replace(/\s{2,}/g, " ");   // reemplaza dobles por uno


                    setFormData({ ...formData, nombre: valor });
                }}
                width="300px"
                maxLength={20}
                placeholder="Ingrese nombre"
            />

            <InputField
                label={<>APELLIDO<span style={{ color: colores.errorToast }}> *</span></>}
                value={formData.apellido}
                onChange={(e) => {
                    let valor = e.target.value.toUpperCase();

                    // Permitir solo letras y un solo espacio
                    valor = valor.replace(/[^A-Z ]/g, "");   // quita números y símbolos

                    // No permitir más de un espacio
                    valor = valor.replace(/\s{2,}/g, " ");   // reemplaza dobles por uno


                    setFormData({ ...formData, apellido: valor });
                }}
                width="300px"
                maxLength={20}
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
                    label={<>CLAVE<span style={{ color: colores.errorToast }}> *</span></>}
                    type="password"
                    value={formData.passwordHash}
                    onChange={(e) => setFormData({ ...formData, passwordHash: e.target.value })}
                    width="300px"
                    maxLength={10}
                    placeholder="Ingrese clave"
                />
            )}

            {formData.rol === "OPERADOR" && (
                <p style={infoTextStyle}>
                    LOS OPERADORES NO REQUIEREN CLAVE
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
