import colores from "../styles/colores";
import PrimaryButton from "../components/PrimaryButton";
import { loginStyles } from "../styles/loginStyles";

//-------------------------------------------------
// PANTALLA DE SELECCIÓN DE ROL (OPERADOR / ADMIN)
const LoginScreen = ({ onLogin, onAdminLogin }) => {
    //-------------------------------------------------
    // MANEJA LA SELECCIÓN DE ROL
    const handleSeleccionRol = (rolSeleccionado) => {
        if (rolSeleccionado === "OPERADOR") {
            // OPERADOR ENTRA DIRECTAMENTE SIN CREDENCIALES
            onLogin({ rol: "OPERADOR" });
        } else {
            // SI ES ADMIN, NAVEGA A LA PANTALLA DE ADMIN LOGIN
            onAdminLogin();
        }
    };

    //--------------------------------------------------------
    // RENDERIZADO DE LA PANTALLA
    return (
        // ESTRUCTURA PRINCIPAL DEL LOGIN
        <div style={loginStyles.container}>
            <div style={loginStyles.card}>
                <h1 style={loginStyles.title}>SISTEMA DE GESTIÓN DE CALIDAD</h1>

                {/* SELECCIÓN DE ROL */}
                <div style={loginStyles.roleSelection}>
                    <p style={loginStyles.instruction}>SELECCIONE TIPO DE ACCESO</p>
                    <div style={loginStyles.buttonContainer}>
                        <button
                            style={{
                                ...loginStyles.roleButton,
                                backgroundColor: colores.primaryBlue, // COLOR OPERADOR
                                width: "280px",
                            }}
                            onClick={() => handleSeleccionRol("OPERADOR")}
                        >
                            <div style={loginStyles.roleIcon}>👷</div>
                            <div style={loginStyles.roleLabel}>OPERADOR</div>
                            <div style={loginStyles.roleDescription}>ACCESO DIRECTO</div>
                        </button>
                        <button
                            style={{
                                ...loginStyles.roleButton,
                                backgroundColor: colores.primaryOrange, // COLOR ADMIN
                            }}
                            onClick={() => handleSeleccionRol("ADMIN")}
                        >
                            <div style={loginStyles.roleIcon}>⚙️</div>
                            <div style={loginStyles.roleLabel}>ADMINISTRADOR</div>
                            <div style={loginStyles.roleDescription}>REQUIERE CREDENCIALES</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
