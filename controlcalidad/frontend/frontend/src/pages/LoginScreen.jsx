import { useState } from "react";
import toast from "react-hot-toast";
import colores from "../styles/colores";
import { fontSizes } from "../styles/fontSizes";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

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
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>CONTROL DE CALIDAD</h1>
        <h2 style={styles.subtitle}>Sistema de Gestión</h2>

        {!rol ? (
          // Selección de rol
          <div style={styles.roleSelection}>
            <p style={styles.instruction}>Seleccione su tipo de acceso:</p>
            <div style={styles.buttonContainer}>
              <button
                style={{ ...styles.roleButton, backgroundColor: colores.primaryBlue }}
                onClick={() => handleSeleccionRol("OPERADOR")}
              >
                <div style={styles.roleIcon}>👷</div>
                <div style={styles.roleLabel}>OPERADOR</div>
                <div style={styles.roleDescription}>Acceso directo</div>
              </button>
              <button
                style={{ ...styles.roleButton, backgroundColor: colores.primaryOrange }}
                onClick={() => handleSeleccionRol("ADMIN")}
              >
                <div style={styles.roleIcon}>⚙️</div>
                <div style={styles.roleLabel}>ADMINISTRADOR</div>
                <div style={styles.roleDescription}>Requiere credenciales</div>
              </button>
            </div>
          </div>
        ) : (
          // Login de admin
          <div style={styles.loginForm}>
            <p style={styles.adminTitle}>Acceso de Administrador</p>
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
            <div style={styles.loginButtons}>
              <PrimaryButton
                text="INGRESAR"
                color={colores.primaryOrange}
                textColor={colores.white}
                onClick={handleLoginAdmin}
                width="200px"
              />
              <button style={styles.backButton} onClick={handleVolver}>
                ← Volver
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: colores.lightGray,
  },
  card: {
    backgroundColor: colores.white,
    borderRadius: "16px",
    padding: "50px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    minWidth: "500px",
    textAlign: "center",
  },
  title: {
    fontSize: fontSizes.modalTitle,
    fontWeight: "bold",
    color: colores.black,
    margin: "0 0 10px 0",
  },
  subtitle: {
    fontSize: "20px",
    fontWeight: "500",
    color: colores.primaryGray,
    margin: "0 0 40px 0",
  },
  instruction: {
    fontSize: "18px",
    fontWeight: "500",
    color: colores.black,
    marginBottom: "30px",
  },
  roleSelection: {
    display: "flex",
    flexDirection: "column",
  },
  buttonContainer: {
    display: "flex",
    gap: "30px",
    justifyContent: "center",
  },
  roleButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 40px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    color: colores.white,
    minWidth: "180px",
  },
  roleIcon: {
    fontSize: "60px",
    marginBottom: "15px",
  },
  roleLabel: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  roleDescription: {
    fontSize: "14px",
    opacity: 0.9,
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    textAlign: "left",
  },
  adminTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: colores.primaryOrange,
    textAlign: "center",
    marginBottom: "10px",
  },
  loginButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "10px",
    alignItems: "center",
  },
  backButton: {
    padding: "10px 20px",
    backgroundColor: colores.primaryGray,
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    color: colores.black,
  },
};

export default LoginScreen;
