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

//-------------------------------------------------
// PANTALLA QUE PERMITE CONTROLAR LAS BOBINAS DE UN LOTE EN UN PROCESO

function ControlesScreen({ proceso, onVolverAtras }) {
  const [bobinas, setBobinas] = useState([]);
  const [parametros, setParametros] = useState([]);
  const [procesoInfo] = useState(proceso);
  const [showCargarBobina, setShowCargarBobina] = useState(false);
  const [showFinalizarModal, setShowFinalizarModal] = useState(false);

  // CARGAR PARAMÉTROS DEL SECTOR CUANDO CAMBIA EL PROCESO
  useEffect(() => {
    if (proceso?.sectorId) {
      fetch(`http://localhost:8081/parametros/sector/${proceso.sectorId}`)
        .then(res => res.json())
        .then(data => setParametros(data))
        .catch(() => toast.error("ERROR CARGANDO PARAMETROS"));
    }
  }, [proceso]);

  // CARGA LAS BOBINAS EXISTENTES CUANDO CAMBIA EL PROCESO
  useEffect(() => {
    if (proceso?.id) {
      fetch(`http://localhost:8081/bobinas/proceso/${proceso.id}/controles`)
        .then(res => res.json())
        .then(data => {
          // Transformar los datos para que los controles sean propiedades directas
          const bobinasTransformadas = data.map(bobina => ({
            ...bobina,
            ...bobina.controles, // SPREAD DE LOS CONTROLES DINÁMICOS
          }));
          setBobinas(bobinasTransformadas);
        })
        .catch(() => toast.error("ERROR CARGANDO BOBINAS"));
    }
  }, [proceso]);

  // MANEJADORES DE EVENTOS
  const handleEstadoChange = (bobinaId, control, estado) => {
    setBobinas((prev) =>
      prev.map((bobina) =>
        bobina.id === bobinaId ? { ...bobina, [control]: estado } : bobina
      )
    );
  };

  // EJECUTA LA ACCIÓN DE VOLVER ATRÁS
  const handleVolverAtras = () => {
    if (onVolverAtras) {
      onVolverAtras();
    }
  };

  // ABRE EL MODAL DE FINALIZAR TRABAJO
  const handleFinalizarTrabajo = () => {
    setShowFinalizarModal(true);
  };

  // CONFIRMA LA FINALIZACIÓN DEL TRABAJO
  const handleConfirmFinalizarTrabajo = async () => {
    try {
      const response = await fetch(`http://localhost:8081/bobinas/finalizar/${proceso.id}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Error al finalizar el trabajo");
      }

      setShowFinalizarModal(false);
      toast.success("TRABAJO FINALIZADO CORRECTAMENTE");
      // Volver a la pantalla de listado de procesos
      if (onVolverAtras) {
        onVolverAtras();
      }
    } catch {
      toast.error("Error al finalizar el trabajo");
    }
  };

  // ABRE EL MODAL DE CARGAR BOBINA
  const handleCargarBobina = () => {
    setShowCargarBobina(true);
  };

  // CONFIRMA LA CARGA DE UNA NUEVA BOBINA
  const handleConfirmCargarBobina = async (bobina) => {
    try {
      // CONSTRUYER MAPA DE CONTROLES CON PARÁMETROS DINÁMICOS
      const controles = {};
      parametros.forEach(param => {
        controles[param.nombreParametro] = bobina[param.nombreParametro];
      });

      // CONSTRUYE OBJETO DE REQUEST
      const requestBody = {
        procesoId: procesoInfo.id || proceso?.id,
        operadorId: bobina.operadorId,
        ayudante1Id: bobina.ayudante1Id,
        ayudante2Id: bobina.ayudante2Id,
        controles: controles,
      };

      // ENVIAR PETICIÓN AL BACKEND
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

      // AGREGAR LA NUEVA BOBINA A LA LISTA CON LOS CONTROLES
      const bobinaConDatos = {
        id: nuevaBobina.id,
        numero: nuevaBobina.numero,
        maquinista: nuevaBobina.maquinista,
        ayudante1: nuevaBobina.ayudante1,
        ayudante2: nuevaBobina.ayudante2,
        ...nuevaBobina.controles, // Spread de los controles dinámicos
      };

      setBobinas([...bobinas, bobinaConDatos]);
      toast.success(`BOBINA #${nuevaBobina.numero} CARGADA CORRECTAMENTE`);
    } catch (error) {
      toast.error(`ERROR AL GUARDAR LA BOBINA: ${error.message}`);
    }
  };

  //--------------------------------------------------------
  // RENDERIZADO DE LA PANTALLA
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
        {/* BOTON DE VOLVER */}
        <div style={{ position: "absolute", left: "20px" }}>
          <PrimaryButton
            text="VOLVER ATRÁS"
            color={colores.primaryGray}
            textColor={colores.black}
            width={buttonSizes.mediumButton}
            height="55px"
            fontWeight="bold"
            fontSize={fontSizes.body}
            onClick={handleVolverAtras}
          />
        </div>

        {/* TITULO CENTRADO ARRIBA */}
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
            AÚN NO HA CARGADO NINGÚN CONTROL
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
          textColor={colores.white}
          width={buttonSizes.mediumButton}
          height="55px"
          fontWeight="bold"
          onClick={handleFinalizarTrabajo}
        />

        <PrimaryButton
          text="CARGAR BOBINA"
          color={colores.primaryBlue}
          textColor={colores.white}
          width={buttonSizes.mediumButton}
          height="55px"
          fontWeight="bold"
          onClick={handleCargarBobina}
        />
      </div>

      {/* MODAL DE CARGAR BOBINA */}
      <CargarBobinaModal
        show={showCargarBobina}
        onClose={() => setShowCargarBobina(false)}
        onConfirm={handleConfirmCargarBobina}
        numeroBobina={bobinas.length + 1}
        proceso={proceso}
      />

      {/* MODAL DE FINALIZAR TRABAJO */}
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
