import { useState } from "react";
import toast from "react-hot-toast";
import colores from "../styles/colores";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { loginStyles } from "../styles/loginStyles";

const LoginScreen = ({ onLogin }) => {
  const [rol, setRol] = useState(null); // null, 'OPERADOR', 'ADMIN'
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleSeleccionRol = (rolSeleccionado) => {
    setRol(rolSeleccionado);
    if (rolSeleccionado === "OPERADOR") {
      // OPERADOR entra directamente sin credenciales
      onLogin({ rol: "OPERADOR" });
    }
  };

  const handleLoginAdmin = () => {
    if (!usuario || !password) {
      toast.error("Ingrese usuario y contraseña");
      return;
    }

    fetch("http://localhost:8081/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Credenciales incorrectas");
        }
        return res.json();
      })
      .then((user) => {
        if (user.rol !== "ADMIN") {
          toast.error("No tiene permisos de administrador");
          return;
        }
        onLogin({ rol: "ADMIN", usuario: user });
        toast.success("Bienvenido Administrador");
      })
      .catch(() => {
        toast.error("Usuario o contraseña incorrectos");
      });
  };

  const handleVolver = () => {
    setRol(null);
    setUsuario("");
    setPassword("");
  };

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.card}>
        <h1 style={loginStyles.title}>CONTROL DE CALIDAD</h1>
        <h2 style={loginStyles.subtitle}>Sistema de Gestión</h2>

        {!rol ? (
          // Selección de rol
          <div style={loginStyles.roleSelection}>
            <p style={loginStyles.instruction}>Seleccione su tipo de acceso:</p>
            <div style={loginStyles.buttonContainer}>
              <button
                style={{ ...loginStyles.roleButton, backgroundColor: colores.primaryBlue }}
                onClick={() => handleSeleccionRol("OPERADOR")}
              >
                <div style={loginStyles.roleIcon}>👷</div>
                <div style={loginStyles.roleLabel}>OPERADOR</div>
                <div style={loginStyles.roleDescription}>Acceso directo</div>
              </button>
              <button
                style={{ ...loginStyles.roleButton, backgroundColor: colores.primaryOrange }}
                onClick={() => handleSeleccionRol("ADMIN")}
              >
                <div style={loginStyles.roleIcon}>⚙️</div>
                <div style={loginStyles.roleLabel}>ADMINISTRADOR</div>
                <div style={loginStyles.roleDescription}>Requiere credenciales</div>
              </button>
            </div>
          </div>
        ) : (
          // Login de admin
          <div style={loginStyles.loginForm}>
            <p style={loginStyles.adminTitle}>Acceso de Administrador</p>
            <InputField
              label="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingrese su usuario"
            />
            <InputField
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
            />
            <div style={loginStyles.loginButtons}>
              <PrimaryButton
                text="INGRESAR"
                color={colores.primaryOrange}
                textColor={colores.white}
                onClick={handleLoginAdmin}
                width="200px"
              />
              <SecondaryButton
                text="← Volver"
                color={colores.primaryGray}
                textColor={colores.black}
                onClick={handleVolver}
                width="200px"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
