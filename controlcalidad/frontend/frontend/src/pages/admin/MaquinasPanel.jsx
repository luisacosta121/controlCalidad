import { useState, useEffect } from "react";
import TablaMaquinas from "../../components/TablaMaquinas";
import FormularioMaquina from "../../components/FormularioMaquina";
import PrimaryButton from "../../components/PrimaryButton";
import colores from "../../styles/colores";
import { buttonSizes } from "../../styles/buttonSize";
import { fontSizes } from "../../styles/fontSizes";
import { toast } from "sonner";

const MaquinasPanel = () => {
  const [maquinas, setMaquinas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [maquinaSeleccionada, setMaquinaSeleccionada] = useState(null);

  const maquinasFiltradas = busqueda.trim() === ""
    ? maquinas
    : maquinas.filter((maquina) => {
        const busquedaLower = busqueda.toLowerCase();
        const nombreMaquina = maquina.nombreMaquina || "";
        const numero = maquina.numero ? maquina.numero.toString() : "";
        const sector = typeof maquina.sector === "string" 
          ? maquina.sector 
          : maquina.sector?.sector || "";
        return (
          nombreMaquina.toLowerCase().includes(busquedaLower) ||
          numero.includes(busquedaLower) ||
          sector.toLowerCase().includes(busquedaLower)
        );
      });

  const cargarMaquinas = () => {
    fetch("http://localhost:8081/maquinas/no-eliminadas")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar máquinas");
        return res.json();
      })
      .then((data) => {
        console.log("Máquinas cargadas:", data);
        if (data.length > 0) {
          console.log("Ejemplo de máquina:", data[0]);
        }
        setMaquinas(data);
      })
      .catch(() => toast.error("Error al cargar máquinas"));
  };

  useEffect(() => {
    cargarMaquinas();
  }, []);

  const handleNuevaMaquina = () => {
    setMaquinaSeleccionada(null);
    setModalOpen(true);
  };

  const handleEditar = (maquina) => {
    setMaquinaSeleccionada(maquina);
    setModalOpen(true);
  };

  const handleEliminar = (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta máquina?")) return;

    fetch(`http://localhost:8081/maquinas/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar máquina");
        toast.success("Máquina eliminada correctamente");
        cargarMaquinas();
      })
      .catch(() => toast.error("Error al eliminar máquina"));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setMaquinaSeleccionada(null);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>GESTIÓN DE MÁQUINAS</h2>
      </div>

      {/* Barra de búsqueda */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por sector o máquina"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Tabla de máquinas */}
      <div style={styles.tableContainer}>
        {maquinasFiltradas.length === 0 ? (
          <p style={styles.emptyMessage}>
            {busqueda ? "No se encontraron máquinas" : "No hay máquinas registradas"}
          </p>
        ) : (
          <TablaMaquinas
            maquinas={maquinasFiltradas}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
          />
        )}
      </div>

      {/* Botón crear nueva máquina */}
      <div style={styles.buttonContainer}>
        <PrimaryButton
          text="NUEVA MÁQUINA"
          onClick={handleNuevaMaquina}
          color={colores.primaryBlue}
          textColor={colores.white}
          width={buttonSizes.mediumButton}
          height="55px"
          fontSize={fontSizes.buttonText}
          fontWeight="bold"
        />
      </div>

      <FormularioMaquina
        isOpen={modalOpen}
        onClose={handleCloseModal}
        maquina={maquinaSeleccionada}
        onGuardar={cargarMaquinas}
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

export default MaquinasPanel;
