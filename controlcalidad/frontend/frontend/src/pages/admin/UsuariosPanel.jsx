import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import colores from "../../styles/colores";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import DropDownMenu from "../../components/DropDownMenu";
import { fontSizes } from "../../styles/fontSizes";
import { buttonSizes } from "../../styles/buttonSize";

const UsuariosPanel = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [formData, setFormData] = useState({
    usuario: "",
    nombre: "",
    apellido: "",
    passwordHash: "",
    rol: "",
    activo: true,
  });

  const cargarUsuarios = () => {
    fetch("http://localhost:8081/usuarios")
      .then((res) => res.json())
      .then(setUsuarios)
      .catch(() => toast.error("Error al cargar usuarios"));
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const abrirModalCrear = () => {
    setModoEdicion(false);
    setUsuarioSeleccionado(null);
    setFormData({
      usuario: "",
      nombre: "",
      apellido: "",
      passwordHash: "",
      rol: "",
      activo: true,
    });
    setShowModal(true);
  };

  const abrirModalEditar = (usuario) => {
    setModoEdicion(true);
    setUsuarioSeleccionado(usuario);
    setFormData({
      usuario: usuario.usuario,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      passwordHash: "",
      rol: usuario.rol,
      activo: usuario.activo,
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!formData.usuario || !formData.nombre || !formData.apellido || !formData.rol) {
      toast.error("Usuario, Nombre, Apellido y Rol son obligatorios");
      return;
    }

    // Validar contraseña solo para ADMIN
    if (formData.rol === "ADMIN" && !formData.passwordHash && !modoEdicion) {
      toast.error("La contraseña es obligatoria para usuarios ADMIN");
      return;
    }

    const url = modoEdicion
      ? `http://localhost:8081/usuarios/${usuarioSeleccionado.id}`
      : "http://localhost:8081/usuarios";

    const method = modoEdicion ? "PUT" : "POST";

    // Si es OPERADOR, limpiar password
    const dataToSend = { ...formData };
    if (formData.rol === "OPERADOR") {
      dataToSend.passwordHash = null;
    }

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success(modoEdicion ? "Usuario actualizado" : "Usuario creado");
        cargarUsuarios();
        setShowModal(false);
      })
      .catch(() => toast.error("Error al guardar usuario"));
  };

  const handleEliminar = (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;

    fetch(`http://localhost:8081/usuarios/${id}`, { method: "DELETE" })
      .then(() => {
        toast.success("Usuario eliminado");
        cargarUsuarios();
      })
      .catch(() => toast.error("Error al eliminar usuario"));
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>GESTION DE USUARIOS</h2>
      </div>

      {/* Tabla de usuarios */}
      <div style={styles.tableContainer}>
        {usuarios.length === 0 ? (
          <p style={styles.emptyMessage}>No hay usuarios registrados</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
            <div style={{ flex: 1, overflow: "auto" }}>
              <div style={{ minWidth: "max-content" }}>
                {/* Encabezado */}
                <div style={styles.headerRow}>
                <span>USUARIO</span>
                <span>NOMBRE</span>
                <span>APELLIDO</span>
                <span>ROL</span>
                <span>ESTADO</span>
                <span style={{ textAlign: "center" }}>ACCIONES</span>
              </div>

              {/* Filas */}
              {usuarios.map((usuario, index) => (
                <div
                  key={usuario.id}
                  style={{
                    ...styles.row,
                    backgroundColor: index % 2 === 0 ? colores.white : colores.secondaryGray,
                  }}
                >
                  <span>{usuario.usuario}</span>
                  <span>{usuario.nombre}</span>
                  <span>{usuario.apellido}</span>
                  <span>
                    <SecondaryButton
                      text={usuario.rol}
                      color={usuario.rol === "ADMIN" ? colores.primaryOrange : colores.primaryBlue}
                      textColor={colores.white}
                      width={buttonSizes.smallButton}
                      fontSize={fontSizes.body}
                      fontWeight="600"
                      disabled
                    />
                  </span>
                  <span>
                    <SecondaryButton
                      text={usuario.activo ? "ACTIVO" : "INACTIVO"}
                      color={usuario.activo ? colores.primaryGreen : colores.primaryRed}
                      textColor={colores.white}
                      width={buttonSizes.smallButton}
                      fontSize={fontSizes.body}
                      fontWeight="600"
                      disabled
                    />
                  </span>
                  <div style={styles.actionButtons}>
                    <SecondaryButton
                      text="Editar"
                      color={colores.primaryBlue}
                      textColor={colores.white}
                      onClick={() => abrirModalEditar(usuario)}
                      width={buttonSizes.smallButton}
                      fontSize={fontSizes.buttonText}
                      fontWeight="bold"
                    />
                    <SecondaryButton
                      text="Eliminar"
                      color={colores.primaryRed}
                      textColor={colores.white}
                      onClick={() => handleEliminar(usuario.id)}
                      width={buttonSizes.smallButton}
                      fontSize={fontSizes.buttonText}
                      fontWeight="bold"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        )}
      </div>

      {/* Botón crear nuevo usuario */}
      <div style={styles.buttonContainer}>
        <PrimaryButton
          text="+ NUEVO USUARIO"
          color={colores.primaryBlue}
          textColor={colores.white}
          onClick={abrirModalCrear}
          width={buttonSizes.largeMediumButton}
          fontSize={fontSizes.buttonText}
          fontWeight="bold"
        />
      </div>

      {/* Modal de crear/editar */}
      <Modal
        show={showModal}
        title={modoEdicion ? "Editar Usuario" : "Nuevo Usuario"}
        onCancel={() => setShowModal(false)}
        onConfirm={handleSubmit}
      >
        <div style={styles.form}>
          <InputField
            label="Usuario *"
            value={formData.usuario}
            onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
            placeholder="Ingrese usuario"
          />
          <InputField
            label="Nombre *"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            placeholder="Ingrese nombre"
          />
          <InputField
            label="Apellido *"
            value={formData.apellido}
            onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
            placeholder="Ingrese apellido"
          />
          <DropDownMenu
            label="Rol *"
            options={["", "OPERADOR", "ADMIN"]}
            value={formData.rol}
            onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
          />
          
          {formData.rol === "ADMIN" && (
            <InputField
              label={modoEdicion ? "Contraseña (dejar vacío para mantener)" : "Contraseña *"}
              type="password"
              value={formData.passwordHash}
              onChange={(e) => setFormData({ ...formData, passwordHash: e.target.value })}
              placeholder="Ingrese contraseña"
            />
          )}

          {formData.rol === "OPERADOR" && (
            <p style={styles.infoText}>
              ℹ️ Los operadores no requieren contraseña
            </p>
          )}

          <DropDownMenu
            label="Estado *"
            options={["Activo", "Inactivo"]}
            value={formData.activo ? "Activo" : "Inactivo"}
            onChange={(e) => setFormData({ ...formData, activo: e.target.value === "Activo" })}
          />
        </div>
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0px",
  },
  title: {
    fontSize: fontSizes.modalTitle,
    fontWeight: "bold",
    color: colores.black,
    margin: 0,
  },
  tableContainer: {
    overflow: "hidden",
    flex: 1,
  },
  headerRow: {
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
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 2fr",
    padding: "12px 10px",
    alignItems: "center",
    color: colores.black,
    fontSize: fontSizes.textList,
    borderBottom: `1px solid ${colores.black}`,
    borderLeft: `4px solid ${colores.primaryOrange}`,
    fontWeight: "600",
    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  actionButtons: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "20px 10px",
  },
  emptyMessage: {
    textAlign: "center",
    padding: "40px",
    fontSize: "18px",
    color: colores.primaryGray,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  infoText: {
    fontSize: "14px",
    color: colores.primaryBlue,
    backgroundColor: colores.lightGray,
    padding: "10px",
    borderRadius: "8px",
    margin: 0,
  },
};

export default UsuariosPanel;
