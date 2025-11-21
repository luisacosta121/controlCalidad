import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import ListaProcesos from "../components/ListaProcesos";
import PrimaryButton from "../components/PrimaryButton";
import CargarProcesoModal from "../components/CargarProcesoModal";
import colores from "../styles/colores";
import { fontSizes } from "../styles/fontSizes";
import { buttonSizes } from "../styles/buttonSize";

function ProcesoListadoScreen({ onVerDetalles }) {
  const [procesos, setProcesos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const cargarProcesos = () => {
    fetch("http://localhost:8081/bobinas/procesos")
      .then(res => res.json())
      .then(setProcesos)
      .catch(() => toast.error("Error al cargar procesos"));
  };

  useEffect(() => {
    cargarProcesos();
  }, []);

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "100vh",
      width: "100%"
    }}>
      {/* Título FIJO */}
      <h1
        style={{
          textAlign: "center",
          fontSize: fontSizes.modalTitle,
          margin: "20px 0 30px 0",
          color: colores.black,
          flexShrink: 0
        }}
      >
        CONTROL DE CALIDAD
      </h1>

      {/* LISTA CON SCROLL (solo contenido, encabezado fijo dentro) */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {procesos.length > 0 ? (
          <ListaProcesos procesos={procesos} onVerDetalles={onVerDetalles} />
        ) : (
          <p
            style={{
              textAlign: "center",
              marginTop: "80px",
              fontSize: fontSizes.body,
            }}
          >
            Aún no ha cargado ningún proceso para controlar!
          </p>
        )}
      </div>

      {/* BOTÓN FIJO ABAJO A LA DERECHA */}
      <div style={{ 
        display: "flex", 
        justifyContent: "flex-end", 
        padding: "20px 20px 20px 0", 
        flexShrink: 0,
        paddingRight: "20px"
      }}>
        <PrimaryButton
          text="CARGAR PROCESO"
          color={colores.primaryBlue}
          textColor="white"
          width={buttonSizes.mediumButton}
          height="55px"
          fontWeight="600"
          onClick={() => setShowModal(true)}
        />
      </div>

      {/* MODAL */}
      <CargarProcesoModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={(nuevaBobina) => {
          console.log("Nueva bobina creada:", nuevaBobina);
          cargarProcesos();
          setShowModal(false);
        }}
      />
    </div>
  );
}

export default ProcesoListadoScreen;
