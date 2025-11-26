import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import ListaProcesos from "../components/ListaProcesos";
import PrimaryButton from "../components/PrimaryButton";
import CargarProcesoModal from "../components/CargarProcesoModal";
import colores from "../styles/colores";
import { fontSizes } from "../styles/fontSizes";
import { buttonSizes } from "../styles/buttonSize";

//-------------------------------------------------
// PANTALLA QUE PERMITE LISTAR LOS PROCESOS CARGADOS Y CARGAR NUEVOS
function ProcesoListadoScreen({ onVerDetalles }) {
  const [procesos, setProcesos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // CARGA DE PROCESOS DESDE EL BACKEND
  const cargarProcesos = () => {
    fetch("http://localhost:8081/bobinas/procesos")
      .then(res => res.json())
      .then(setProcesos)
      .catch(() => toast.error("ERROR AL CARGAR LOS PROCESOS"));
  };

  // CARGA INICIAL DE PROCESOS
  useEffect(() => {
    cargarProcesos();
  }, []);

  //--------------------------------------------------------
  // RENDERIZADO DE LA PANTALLA
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      width: "100%"
    }}>
      {/* TITULO DE LA PARTE SUPERIOR */}
      <h1
        style={{
          textAlign: "center",
          fontSize: fontSizes.modalTitle,
          margin: "20px 0 30px 0",
          color: colores.black,
          flexShrink: 0 // EVITA QUE SE ENCOJA
        }}
      >
        LISTADO DE TRABAJOS
      </h1>

      {/* LISTA CON SCROLL (solo contenido, encabezado fijo dentro) */}
      <div style={{
        flex: 1,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "0 20px"
      }}>
        {procesos.length > 0 ? (
          <ListaProcesos procesos={procesos} onVerDetalles={onVerDetalles} />
        ) : (
          <p
            style={{
              textAlign: "center",
              marginTop: "80px",
              fontSize: fontSizes.modalTitle,
            }}
          >
            AÚN NO HA CARGADO NINGÚN TRABAJO PARA CONTROLAR
          </p>
        )}
      </div>

      {/* BOTÓN FIJO ABAJO A LA DERECHA */}
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "20px 20px 20px 0",
        flexShrink: 0,
        paddingRight: "30px"
      }}>
        <PrimaryButton
          text="CARGAR PROCESO"
          color={colores.primaryBlue}
          textColor={colores.white}
          width={buttonSizes.mediumButton}
          height="55px"
          fontWeight="bold"
          onClick={() => setShowModal(true)}
        />
      </div>

      {/* MODAL DE CARGA DE PROCESO */}
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
