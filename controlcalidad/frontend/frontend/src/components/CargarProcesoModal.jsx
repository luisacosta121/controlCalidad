import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import DropDownMenu from "../components/DropDownMenu";
import PrimaryButton from "../components/PrimaryButton";
import { buttonSizes } from "../styles/buttonSize";
import { fontSizes } from "../styles/fontSizes";
import colores from "../styles/colores";

const MAX_LENGTH_LOTE = 7; // NUMERO MÁXIMO DE CARACTERES PARA EL LOTE
//-----------------------------------------------------
/*
MODAL PARA CREAR PROCESOS CON LOTE, SECTOR y MAQUINA
SE USA EN LA PANTALLA PRINCIPAL DE OPERADORES
*/
const CargarProcesoModal = ({ show, onClose, onConfirm }) => {
  const [lote, setLote] = useState(""); // Número de lote ingresado
  const [loteId, setLoteId] = useState(null); // ID real del lote
  const [trabajo, setTrabajo] = useState(""); // Nombre del trabajo asociado al lote
  const [sector, setSector] = useState(""); // Sector seleccionado
  const [maquina, setMaquina] = useState(""); // Número máquina seleccionada
  const [sectores, setSectores] = useState([]); // Lista de sectores disponibles
  const [maquinas, setMaquinas] = useState([]); // Lista de máquinas disponibles para el sector seleccionado

  //-----------------------------------------------------
  // CARGA DE SECTORES
  useEffect(() => {
    if (!show) return;
    fetch("http://localhost:8081/sectores")
      .then(r => r.json())
      .then(setSectores)
      .catch(() => setSectores([]));
  }, [show]);

  //-----------------------------------------------------
  // CARGA DE MÁQUINAS (SE EJECUTA CUANDO CAMBIA EL SECTOR)
  useEffect(() => {
    if (!sector) {
      setMaquinas([]); // LIMPIA MÁQUINAS SI NO HAY SECTOR
      setMaquina(""); // RESETEA MÁQUINA SELECCIONADA
      return;
    }
    fetch(`http://localhost:8081/maquinas/sector/${sector}`)
      .then(r => r.json())
      .then(data => {
        // Filtrar solo máquinas activas y no eliminadas
        const maquinasActivas = data.filter(m => m.activo && !m.eliminado);
        setMaquinas(maquinasActivas);
      })
      .catch(() => setMaquinas([]));
  }, [sector]);

  //-----------------------------------------------------
  // BUSCAR LOTE Y TRAE EL TRABAJO ASOCIADO
  const handleBuscarLote = async () => {
    if (!lote.trim()) {
      toast("INGRESE NUMERO DE LOTE", {
        style: {
          background: colores.warningToast,
          color: colores.white,
          fontSize: fontSizes.body
        },
      });
      return;
    }
    try {
      // VALIDA QUE EL LOTE EXISTA, SI NO MUESTRA TOAST
      const res = await fetch(`http://localhost:8081/lotes/buscar/${lote}`);
      if (!res.ok) {
        toast("LOTE NO ENCONTRADO", {
          style: {
            background: colores.warningToast,
            color: colores.white,
            fontSize: fontSizes.body
          },
        });
        setTrabajo(""); // LIMPIA TRABAJO SI NO ENCUENTRA LOTE
        setLoteId(null); // LIMPIA LOTE ID
        return;
      }
      // SI EL LOTE EXISTE, SETEA EL TRABAJO Y LOTE ID
      const data = await res.json();
      console.log("Lote encontrado:", data);
      setTrabajo(data.nombreTrabajo || "");
      setLoteId(data.id);
    } catch {
      toast.error("ERROR AL BUSCAR LOTE");
      setTrabajo("");
      setLoteId(null);
    }
  };

  //-----------------------------------------------------
  // CERRAR MODAL Y RESETEAR CAMPOS
  const handleClose = () => {
    setLote("");
    setLoteId(null);
    setTrabajo("");
    setSector("");
    setMaquina("");
    onClose();
  };

  //-----------------------------------------------------
  // CREAR PROCESO DESDE EL MODAL
  const handleConfirm = async () => {

    console.log("Valores antes de confirmar:", {
      loteId,
      sector,
      maquina,
      sectorTipo: typeof sector,
      maquinaTipo: typeof maquina
    });

    // VALIDACIÓN MEJORADA PARA DETECTAR STRINGS VACÍOS
    if (!loteId) {
      toast("DEBE BUSCAR UN LOTE ANTES DE CONFIRMAR", {
        style: {
          background: colores.warningToast,
          color: colores.white,
          fontSize: fontSizes.body
        },
      });
      return;
    }
    // VALIDAR SECTOR
    if (!sector || sector === "") {
      toast("DEBE SELECCIONAR UN SECTOR", {
        style: {
          background: colores.warningToast,
          color: colores.white,
          fontSize: fontSizes.body
        },
      });
      return;
    }
    // VALIDAR MÁQUINA
    if (!maquina || maquina === "") {
      toast("DEBE SELECCIONAR UNA MÁQUINA", {
        style: {
          background: colores.warningToast,
          color: colores.white,
          fontSize: fontSizes.body
        },
      });
      return;
    }

    // ENVIAR PETICIÓN AL BACKEND
    try {
      const payload = {
        loteId: Number(loteId),
        sector: String(sector),
        maquina: String(maquina)
      };

      console.log("Enviando:", payload);

      // ENVIAR PETICIÓN AL BACKEND  - POR EJ. Body: { "loteId": 5, "sector": "EXTRUSION", "maquina": "1" }
      const response = await fetch("http://localhost:8081/bobinas/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // VALIDAR RESPUESTA DEL BACKEND
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const nuevaBobina = await response.json();

      // LLAMA AL ONCONFIRM PASÁNDOLE LA NUEVA BOBINA Y CIERRA EL MODAL
      onConfirm(nuevaBobina);
      handleClose();
      toast.success("PROCESO CREADO CORRECTAMENTE");

    } catch {
      toast.error("NO SE PUDO CREAR EL PROCESO");
    }
  };

  // ------------------------------------------------------
  if (!show) return null;

  // ------------------------------------------------------
  // Renderizado del componente
  return (
    <Modal
      title="CARGAR PROCESO"
      width="650px"
      onConfirm={handleConfirm}
      onCancel={handleClose}
    >
      {/* SEGUNDA FILA DONDE SE VE EL NOMBRE DEL TRABAJO */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{
          fontSize: fontSizes.dropDownText,
          fontWeight: "bold",
          color: colores.black,
          display: "block",
          marginBottom: "8px"
        }}>
          TRABAJO
        </label>
        <p style={{
          fontSize: fontSizes.button,
          margin: 0,
          padding: "10px",
          minHeight: "25px"
        }}>
          {trabajo || "BUSQUE UN LOTE PARA VER EL TRABAJO ASOCIADO"}
        </p>
      </div>

      <hr style={{ marginBottom: "20px" }} />

      {/* LOTE + BUSCAR */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
        {/* INPUT PARA LOTE */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <label style={{
            fontSize: fontSizes.dropDownText,
            color: colores.black,
            fontWeight: "regular",
            width: "180px",
            textAlign: "right",
          }}>
            LOTE<span style={{ color: colores.errorToast }}> *</span>
          </label>
          <input
            type="text"
            value={lote}
            placeholder="Nro Lote"
            onChange={(e) => setLote(e.target.value)}
            maxLength={MAX_LENGTH_LOTE}
            style={{
              width: "200px",
              height: "45px",
              padding: "0 12px",
              borderRadius: "10px",
              border: `1px solid ${colores.black}`,
              backgroundColor: colores.white,
              fontSize: fontSizes.dropDownText,
              color: colores.black,
              outline: "none",
            }}
          />
        </div>

        {/* BOTÓN BUSCAR */}
        <PrimaryButton
          text="BUSCAR"
          color={colores.primaryOrange}
          width={buttonSizes.mediumButton}
          height="45px"
          textColor={colores.white}
          fontWeight="bold"
          onClick={handleBuscarLote}
        />
      </div>

      {/* SECTOR */}
      <div style={{ marginBottom: "20px" }}>
        <DropDownMenu
          label={<>SECTOR<span style={{ color: colores.errorToast }}> *</span></>}
          value={sector}
          height="45px"
          gap="20px"
          options={[
            { value: "", label: "Seleccione un sector" },
            ...sectores.map(s => ({ value: s, label: s }))
          ]}
          onChange={(e) => setSector(e.target.value)}
        />
      </div>

      {/* MÁQUINA */}
      <div style={{ marginBottom: "20px" }}>
        <DropDownMenu
          label={<>MÁQUINA<span style={{ color: colores.errorToast }}> *</span></>}
          value={maquina}
          height="45px"
          gap="20px"
          options={[
            { value: "", label: "Seleccione una máquina" },
            ...maquinas.map(m => ({ value: m.numero, label: m.numero }))
          ]}
          onChange={(e) => setMaquina(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default CargarProcesoModal;
