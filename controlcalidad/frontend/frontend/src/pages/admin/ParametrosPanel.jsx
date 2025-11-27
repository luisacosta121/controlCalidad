import { useState, useEffect } from "react";
import TablaParametros from "../../components/TablaParametros";
import FormularioParametro from "../../components/FormularioParametro";
import PrimaryButton from "../../components/PrimaryButton";
import colores from "../../styles/colores";
import { buttonSizes } from "../../styles/buttonSize";
import { fontSizes } from "../../styles/fontSizes";
import { toast } from "sonner";

const ParametrosPanel = () => {
  const [parametros, setParametros] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [parametroSeleccionado, setParametroSeleccionado] = useState(null);

  const parametrosFiltrados = busqueda.trim() === ""
    ? parametros
    : parametros.filter((parametro) => {
        const busquedaLower = busqueda.toLowerCase();
        const nombreParametro = parametro.nombreParametro || "";
        const sector = parametro.sector?.sector || "";
        return (
          nombreParametro.toLowerCase().includes(busquedaLower) ||
          sector.toLowerCase().includes(busquedaLower)
        );
      });

  const cargarParametros = () => {
    console.log("Cargando parámetros...");
    fetch("http://localhost:8081/parametros/no-eliminados")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar parámetros");
        return res.json();
      })
      .then((data) => {
        console.log("Parámetros cargados:", data);
        setParametros(data);
      })
      .catch((error) => {
        console.error("Error al cargar:", error);
        toast.error("Error al cargar parámetros");
      });
  };

  useEffect(() => {
    cargarParametros();
  }, []);

  const handleNuevoParametro = () => {
    setParametroSeleccionado(null);
    setModalOpen(true);
  };

  const handleEditar = (parametro) => {
    setParametroSeleccionado(parametro);
    setModalOpen(true);
  };

  const handleEliminar = (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este parámetro?")) return;

    fetch(`http://localhost:8081/parametros/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar parámetro");
        toast.success("Parámetro eliminado correctamente");
        cargarParametros();
      })
      .catch(() => toast.error("Error al eliminar parámetro"));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setParametroSeleccionado(null);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>GESTIÓN DE PARÁMETROS DE CALIDAD</h2>
      </div>

      {/* Barra de búsqueda */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por sector o parámetro"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Tabla de parámetros */}
      <div style={styles.tableContainer}>
        {parametrosFiltrados.length === 0 ? (
          <p style={styles.emptyMessage}>
            {busqueda ? "No se encontraron parámetros" : "No hay parámetros registrados"}
          </p>
        ) : (
          <TablaParametros
            parametros={parametrosFiltrados}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
          />
        )}
      </div>

      {/* Botón crear nuevo parámetro */}
      <div style={styles.buttonContainer}>
        <PrimaryButton
          text="NUEVO PARÁMETRO"
          onClick={handleNuevoParametro}
          color={colores.primaryBlue}
          textColor={colores.white}
          width={buttonSizes.mediumButton}
          height="55px"
          fontSize={fontSizes.buttonText}
          fontWeight="bold"
        />
      </div>

      <FormularioParametro
        isOpen={modalOpen}
        onClose={handleCloseModal}
        parametro={parametroSeleccionado}
        onGuardar={cargarParametros}
      />
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
    justifyContent: "flex-start",
    padding: "0px 0px 20px 0px",
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

export default ParametrosPanel;
