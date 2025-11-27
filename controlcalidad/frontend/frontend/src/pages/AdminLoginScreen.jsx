import { useState } from "react";
import toast from "react-hot-toast";
import colores from "../styles/colores";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { loginStyles } from "../styles/loginStyles";
import { buttonSizes } from "../styles/buttonSize";

//-------------------------------------------------
// PANTALLA DE LOGIN PARA ADMINISTRADOR
const AdminLoginScreen = ({ onLogin, onVolver }) => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    //-------------------------------------------------
    // MANEJA EL LOGIN DE ADMINISTRADOR
    const handleLoginAdmin = () => {
        if (!usuario || !password) {
            toast.error("INGRESE USUARIO Y CONTRASEÑA");
            return;
        }

        // REALIZA LA PETICIÓN DE LOGIN
        fetch("http://localhost:8081/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, password }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("CREDENCIALES INCORRECTAS");
                }
                return res.json();
            })
            .then((user) => {
                if (user.rol !== "ADMIN") {
                    toast.error("NO TIENE PERMISOS DE ADMINISTRADOR");
                    return;
                }
                onLogin({ rol: "ADMIN", usuario: user });
                toast.success(`BIENVENIDO ${user.usuario.toUpperCase()}`);
            })
            .catch(() => {
                toast.error("USUARIO O CONTRASEÑA INCORRECTOS");
            });
    };

    //--------------------------------------------------------
    // RENDERIZADO DE LA PANTALLA
    return (
        <div style={loginStyles.container}>
            <div style={loginStyles.card}>
                <h1 style={loginStyles.title}>SISTEMA DE GESTIÓN DE CALIDAD</h1>

                <div style={loginStyles.loginForm}>
                    <p style={loginStyles.adminTitle}>ACCESO DE ADMINISTRADOR</p>
                    <InputField
                        label="USUARIO"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        placeholder="Ingrese su usuario"
                        width="300px"
                        height="45px"
                        gap="20px"
                    />
                    <InputField
                        label="CLAVE"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingrese su clave"
                        width="300px"
                        height="45px"
                        gap="20px"
                    />
                    <div style={loginStyles.loginButtons}>
                        <PrimaryButton
                            text="VOLVER"
                            onClick={onVolver}
                            height="55px"
                            fontWeight="bold"
                            color={colores.primaryGray}
                            textColor={colores.black}
                            width={buttonSizes.mediumButton}
                        />
                        <PrimaryButton
                            text="INGRESAR"
                            onClick={handleLoginAdmin}
                            height="55px"
                            fontWeight="bold"
                            color={colores.primaryBlue}
                            textColor={colores.white}
                            width={buttonSizes.mediumButton}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginScreen;
