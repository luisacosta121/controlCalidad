import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import TablaControles from "../components/TablaControles";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import CargarBobinaModal from "../components/CargarBobinaModal";
import ModalConfirmacion from "../components/ModalConfirmacion";
import colores from "../styles/colores";
import { fontSizes } from "../styles/fontSizes";
import { buttonSizes } from "../styles/buttonSize";

function ControlesScreen({ proceso, onVolverAtras }) {
  const [bobinas, setBobinas] = useState([]);
  const [parametros, setParametros] = useState([]);

  // Información del proceso
  const [procesoInfo] = useState(proceso);

  // Estado del modal de cargar bobina
  const [showCargarBobina, setShowCargarBobina] = useState(false);
  
  // Estado del modal de finalizar trabajo
  const [showFinalizarModal, setShowFinalizarModal] = useState(false);

  // Cargar parámetros del sector
  useEffect(() => {
    if (proceso?.sectorId) {
      fetch(`http://localhost:8081/parametros/sector/${proceso.sectorId}`)
        .then(res => res.json())
        .then(data => setParametros(data))
        .catch(() => toast.error("Error cargando parámetros"));
    }
  }, [proceso]);

  // Cargar bobinas existentes cuando se monta el componente
  useEffect(() => {
    if (proceso?.id) {
      fetch(`http://localhost:8081/bobinas/proceso/${proceso.id}/controles`)
        .then(res => res.json())
        .then(data => {
          // Transformar los datos para que los controles sean propiedades directas
          const bobinasTransformadas = data.map(bobina => ({
            ...bobina,
            ...bobina.controles, // Spread de los controles dinámicos
          }));
          setBobinas(bobinasTransformadas);
        })
        .catch(() => toast.error("Error cargando bobinas"));
    }
  }, [proceso]);

  const handleEstadoChange = (bobinaId, control, estado) => {
    setBobinas((prev) =>
      prev.map((bobina) =>
        bobina.id === bobinaId ? { ...bobina, [control]: estado } : bobina
      )
    );
  };

  const handleVolverAtras = () => {
    if (onVolverAtras) {
      onVolverAtras();
    }
  };

  const handleFinalizarTrabajo = () => {
    setShowFinalizarModal(true);
  };

  const handleConfirmFinalizarTrabajo = async () => {
    try {
      const response = await fetch(`http://localhost:8081/bobinas/finalizar/${proceso.id}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Error al finalizar el trabajo");
      }

      setShowFinalizarModal(false);
      toast.success("Trabajo finalizado correctamente");
      // Volver a la pantalla de listado de procesos
      if (onVolverAtras) {
        onVolverAtras();
      }
    } catch {
      toast.error("Error al finalizar el trabajo");
    }
  };

  const handleCargarBobina = () => {
    setShowCargarBobina(true);
  };

  const handleConfirmCargarBobina = async (bobina) => {
    try {
      // Construir mapa de controles con parámetros dinámicos
      const controles = {};
      parametros.forEach(param => {
        controles[param.nombreParametro] = bobina[param.nombreParametro];
      });

      // Construir objeto de request
      const requestBody = {
        procesoId: procesoInfo.id || proceso?.id,
        operadorId: bobina.operadorId,
        ayudante1Id: bobina.ayudante1Id,
        ayudante2Id: bobina.ayudante2Id,
        controles: controles,
      };

      // Enviar al backend
      const response = await fetch("http://localhost:8081/bobinas/crear-con-controles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const nuevaBobina = await response.json();
      
      // Agregar a la lista con los nombres para mostrar
      const bobinaConDatos = {
        id: nuevaBobina.id,
        numero: nuevaBobina.numero,
        maquinista: nuevaBobina.maquinista,
        ayudante1: nuevaBobina.ayudante1,
        ayudante2: nuevaBobina.ayudante2,
        ...nuevaBobina.controles, // Spread de los controles dinámicos
      };

      setBobinas([...bobinas, bobinaConDatos]);
      toast.success(`Bobina #${nuevaBobina.numero} cargada correctamente`);
    } catch (error) {
      toast.error(`Error al guardar la bobina: ${error.message}`);
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "100vh",
      width: "100%"
    }}>
      {/* ENCABEZADO CON BOTÓN VOLVER Y TÍTULO EN LA MISMA LÍNEA */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "20px 20px 20px 20px",
          flexShrink: 0,
        }}
      >
        {/* Botón volver a la izquierda */}
        <div style={{ position: "absolute", left: "20px" }}>
          <SecondaryButton
            text="VOLVER ATRÁS"
            color={colores.gray}
            textColor={colores.black}
            width={buttonSizes.mediumButton}
            height="55px"
            fontWeight="bold"
            fontSize="1rem"
            onClick={handleVolverAtras}
          />
        </div>

        {/* Título centrado */}
        <h1
          style={{
            fontSize: fontSizes.modalTitle,
            margin: 0,
            color: colores.black,
          }}
        >
          CONTROL DE CALIDAD
        </h1>
      </div>

      {/* INFORMACIÓN DEL PROCESO - 2 FILAS */}
      <div style={{ flexShrink: 0, padding: "0 20px" }}>
        {/* Primera fila - Encabezados */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr 1.5fr 5fr",
            padding: "12px 0px",
            backgroundColor: colores.white,
            borderBottom: `1px solid ${colores.black}`,
            fontSize: fontSizes.dropDownText,
            fontWeight: "regular",
          }}
        >
          <span>SECTOR</span>
          <span>MAQUINA</span>
          <span>LOTE</span>
          <span>TRABAJO</span>
        </div>

        {/* Segunda fila - Datos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr 1.5fr 5fr",
            padding: "12px 0px",
            backgroundColor: colores.lightGray,
            borderBottom: `1px solid ${colores.black}`,
            borderLeft: `4px solid ${colores.primaryBlue}`,
            fontSize: fontSizes.textList,
            fontWeight: "600",
            boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <span>{procesoInfo.sector}</span>
          <span>{procesoInfo.maquina}</span>
          <span>{procesoInfo.lote}</span>
          <span>{procesoInfo.trabajo}</span>
        </div>
      </div>

      {/* TABLA CON SCROLL */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          padding: "0 20px",
        }}
      >
        {bobinas.length > 0 ? (
          <TablaControles bobinas={bobinas} parametros={parametros} onEstadoChange={handleEstadoChange} />
        ) : (
          <p
            style={{
              textAlign: "center",
              marginTop: "80px",
              fontSize: fontSizes.modalTitle,
            }}
          >
            Aún no ha cargado ningún control
          </p>
        )}
      </div>

      {/* BOTONES FIJOS ABAJO */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 20px",
          flexShrink: 0,
        }}
      >
        <PrimaryButton
          text="FINALIZAR TRABAJO"
          color={colores.primaryRed}
          textColor="white"
          width={buttonSizes.mediumButton}
          height="55px" 
          fontWeight="bold"
          onClick={handleFinalizarTrabajo}
        />

        <PrimaryButton
          text="CARGAR BOBINA"
          color={colores.primaryBlue}
          textColor="white"
          width={buttonSizes.mediumButton}
                    height="55px"
          fontWeight="bold"
          onClick={handleCargarBobina}
        />
      </div>

      {/* Modal Cargar Bobina */}
      <CargarBobinaModal
        show={showCargarBobina}
        onClose={() => setShowCargarBobina(false)}
        onConfirm={handleConfirmCargarBobina}
        numeroBobina={bobinas.length + 1}
        proceso={proceso}
      />

      {/* Modal Finalizar Trabajo */}
      <ModalConfirmacion
        show={showFinalizarModal}
        titulo="FINALIZAR TRABAJO"
        mensaje={`¿DESEA DAR POR FINALIZADO EL TRABAJO "${procesoInfo.trabajo}"?`}
        onConfirm={handleConfirmFinalizarTrabajo}
        onCancel={() => setShowFinalizarModal(false)}
      />
    </div>
  );
}

export default ControlesScreen;
