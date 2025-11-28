import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import colores from "../../styles/colores";
import PrimaryButton from "../../components/PrimaryButton";
import Modal from "../../components/Modal";
import TablaUsuarios from "../../components/TablaUsuarios";
import FormularioUsuario from "../../components/FormularioUsuario";
import { fontSizes } from "../../styles/fontSizes";
import { buttonSizes } from "../../styles/buttonSize";

const UsuariosPanel = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
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

  const usuariosFiltrados = busqueda.trim() === ""
    ? usuarios
    : usuarios.filter((usuario) => {
        const busquedaLower = busqueda.toLowerCase();
        return (
          usuario.usuario.toLowerCase().includes(busquedaLower) ||
          usuario.nombre.toLowerCase().includes(busquedaLower) ||
          usuario.apellido.toLowerCase().includes(busquedaLower)
        );
      });

  const cargarUsuarios = () => {
    fetch("http://localhost:8081/usuarios/no-eliminados")
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
      toast.error("USUARIO, NOMBRE, APELLIDO Y ROL SON OBLIGATORIOS");
      return;
    }

    // Validar contraseña solo para ADMIN
    if (formData.rol === "ADMIN" && !formData.passwordHash) {
      toast.error("LA CONTRASEÑA ES OBLIGATORIA PARA ROL ADMIN");
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
        toast.success(modoEdicion ? "USUARIO ACTUALIZADO" : "USUARIO CREADO");
        cargarUsuarios();
        setShowModal(false);
      })
      .catch(() => toast.error("Error al guardar usuario"));
  };

  const handleEliminar = (id) => {
    const usuario = usuarios.find(u => u.id === id);
    setUsuarioAEliminar(usuario);
    setShowModalEliminar(true);
  };

  const confirmarEliminar = () => {
    if (!usuarioAEliminar) return;

    fetch(`http://localhost:8081/usuarios/${usuarioAEliminar.id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al eliminar usuario");
        }
        toast.success("USUARIO ELIMINADO");
        cargarUsuarios();
        setShowModalEliminar(false);
        setUsuarioAEliminar(null);
      })
      .catch(() => toast.error("ERROR AL ELIMINAR USUARIO"));
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>GESTION DE USUARIOS</h2>
      </div>

      {/* Barra de búsqueda */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por usuario, nombre o apellido"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value.toUpperCase())}
          style={styles.searchInput}
          width="500px"
        />
      </div>

      {/* Tabla de usuarios */}
      <div style={styles.tableContainer}>
        {usuariosFiltrados.length === 0 ? (
          <p style={{ ...styles.emptyMessage, color: colores.primaryGray, fontSize: fontSizes.dropDownText }}>
            {busqueda ? "NO SE ENCONTRARON USUARIOS" : "NO HAY USUARIOS REGISTRADOS"}
          </p>
        ) : (
          <TablaUsuarios
            usuarios={usuariosFiltrados}
            onEditar={abrirModalEditar}
            onEliminar={handleEliminar}
          />
        )}
      </div>

      {/* Botón crear nuevo usuario */}
      <div style={styles.buttonContainer}>
        <PrimaryButton
          text="NUEVO USUARIO"
          color={colores.primaryBlue}
          textColor={colores.white}
          width={buttonSizes.mediumButton}
          height="55px"
          fontWeight="bold"
          onClick={abrirModalCrear}
          fontSize={fontSizes.buttonText}
        />
      </div>

      {/* Modal de crear/editar */}
      <Modal
        show={showModal}
        title={modoEdicion ? "EDITAR USUARIO" : "NUEVO USUARIO"}
        onCancel={() => setShowModal(false)}
        onConfirm={handleSubmit}
      >
        <FormularioUsuario
          formData={formData}
          setFormData={setFormData}
          modoEdicion={modoEdicion}
        />
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <Modal
        show={showModalEliminar}
        title="ELIMINAR USUARIO"
        onCancel={() => {
          setShowModalEliminar(false);
          setUsuarioAEliminar(null);
        }}
        onConfirm={confirmarEliminar}
      >
        <div style={{ padding: "20px" }}>
          <p style={{ fontSize: fontSizes.button, marginBottom: "10px" }}>
            ¿ESTÁ SEGURO DE ELIMINAR ESTE USUARIO?
          </p>
          <p style={{ fontSize: fontSizes.button, color: colores.black, marginBottom: "5px" }}>
            <strong>USUARIO:</strong> {usuarioAEliminar?.usuario}
          </p>
          <p style={{ fontSize: fontSizes.button, color: colores.black }}>
            <strong>NOMBRE:</strong> {usuarioAEliminar?.nombre} {usuarioAEliminar?.apellido}
          </p>
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
  searchContainer: {
    display: "flex",
    justifyContent: "flex-start", // ALINEAR A LA IZQUIERDA LA BUSQUEDA
    padding: "0px 0px 20px 0px", // PRIMERO ES ARRIBA; SEGUNDO DERECHA; TERCERO ABAJO; CUARTO IZQUIERDA
  },
  searchInput: {
    width: "100%",
    maxWidth: "500px",
    padding: "12px 20px",
    fontSize: "16px",
    border: `1px solid ${colores.primaryGray}`,
    borderRadius: "8px",
    outline: "none"

  },
  tableContainer: {
    overflow: "hidden",
    flex: 1,
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
};

export default UsuariosPanel;
