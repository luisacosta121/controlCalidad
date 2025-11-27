import { useState, useEffect } from "react";
import TablaMaquinas from "../../components/TablaMaquinas";
import FormularioMaquina from "../../components/FormularioMaquina";
import PrimaryButton from "../../components/PrimaryButton";
import colores from "../../styles/colores";
import { buttonSizes } from "../../styles/buttonSize";
import { fontSizes } from "../../styles/fontSizes";
import { adminStyles } from "../../styles/adminStyles";
import { toast } from "sonner";

const MaquinasPanel = () => {
  const [maquinas, setMaquinas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [maquinaSeleccionada, setMaquinaSeleccionada] = useState(null);

  const cargarMaquinas = () => {
    fetch("http://localhost:8081/maquinas/no-eliminadas")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar máquinas");
        return res.json();
      })
      .then((data) => setMaquinas(data))
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
    <div style={adminStyles.contentArea}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: fontSizes.pageTitle,
            color: colores.darkGray,
            margin: 0,
          }}
        >
          Gestión de Máquinas
        </h1>
        <PrimaryButton
          text="NUEVA MÁQUINA"
          onClick={handleNuevaMaquina}
          color={colores.primaryOrange}
          textColor={colores.white}
          width={buttonSizes.largeButton}
          height="50px"
          fontSize={fontSizes.body}
          fontWeight="bold"
        />
      </div>

      <TablaMaquinas
        maquinas={maquinas}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />

      <FormularioMaquina
        isOpen={modalOpen}
        onClose={handleCloseModal}
        maquina={maquinaSeleccionada}
        onGuardar={cargarMaquinas}
      />
    </div>
  );
};

export default MaquinasPanel;
