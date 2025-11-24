import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import DropDownMenu from "../components/DropDownMenu";
import PrimaryButton from "../components/PrimaryButton";
import { buttonSizes } from "../styles/buttonSize";
import { fontSizes } from "../styles/fontSizes";
import colores from "../styles/colores";

const CargarProcesoModal = ({ show, onClose, onConfirm }) => {

  const [lote, setLote] = useState("");
  const [loteId, setLoteId] = useState(null);
  const [trabajo, setTrabajo] = useState("");

  const [sector, setSector] = useState("");
  const [maquina, setMaquina] = useState("");

  const [sectores, setSectores] = useState([]);
  const [maquinas, setMaquinas] = useState([]);

  // 🔹 Cargar sectores cuando se abre
  useEffect(() => {
    if (!show) return;

    fetch("http://localhost:8081/sectores")
      .then(r => r.json())
      .then(setSectores)
      .catch(() => setSectores([]));

  }, [show]);

  // 🔹 Cargar máquinas cuando cambia el sector
   useEffect(() => {
    if (!sector) {
      setMaquinas([]); // 🔹 Limpiar máquinas si no hay sector
      setMaquina(""); // 🔹 Resetear máquina seleccionada
      return;
    }

    fetch(`http://localhost:8081/maquinas/${sector}`)
      .then(r => r.json())
      .then(setMaquinas)
      .catch(() => setMaquinas([]));

  }, [sector]);

  // 🔹 Buscar lote → traer trabajo e ID real
  const handleBuscarLote = async () => {
    if (!lote.trim()) {
      toast("Ingrese un número de lote", {
        icon: '⚠️',
        style: {
          background: '#f59e0b',
          color: '#fff',
        },
      });
      return;
    }

    try {
      const res = await fetch(`http://localhost:8081/lotes/buscar/${lote}`);

      if (!res.ok) {
        toast("Lote no encontrado", {
          icon: '⚠️',
          style: {
            background: '#f59e0b',
            color: '#fff',
          },
        });
        setTrabajo("");
        setLoteId(null);
        return;
      }

      const data = await res.json();
      console.log("📦 Lote encontrado:", data);
      setTrabajo(data.nombreTrabajo || "");
      setLoteId(data.id);

    } catch {
      toast.error("Error al buscar el lote");
      setTrabajo("");
      setLoteId(null);
    }
  };

  // 🔹 Cerrar modal y resetear campos
  const handleClose = () => {
    setLote("");
    setLoteId(null);
    setTrabajo("");
    setSector("");
    setMaquina("");
    onClose();
  };

  // 🔹 Crear bobina desde el modal
  const handleConfirm = async () => {

    // 🔹 DEBUG: Ver qué valores tiene antes de validar
    console.log("📊 Valores antes de confirmar:", { 
      loteId, 
      sector, 
      maquina,
      sectorTipo: typeof sector,
      maquinaTipo: typeof maquina
    });

    // 🔹 Validación mejorada para detectar strings vacíos
    if (!loteId) {
      toast("Debe buscar un lote antes de confirmar", {
        icon: '⚠️',
        style: {
          background: '#f59e0b',
          color: '#fff',
        },
      });
      return;
    }

    if (!sector || sector === "") {
      toast("Debe seleccionar un sector", {
        icon: '⚠️',
        style: {
          background: '#f59e0b',
          color: '#fff',
        },
      });
      return;
    }

    if (!maquina || maquina === "") {
      toast("Debe seleccionar una máquina", {
        icon: '⚠️',
        style: {
          background: '#f59e0b',
          color: '#fff',
        },
      });
      return;
    }

    try {
      const payload = {
        loteId: Number(loteId),
        sector: String(sector),
        maquina: String(maquina)
      };

      console.log("📤 Enviando:", payload);

      const response = await fetch("http://localhost:8081/bobinas/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const nuevaBobina = await response.json();

      onConfirm(nuevaBobina);
      handleClose();
      toast.success("Proceso creado correctamente");

    } catch {
      toast.error("No se pudo crear el proceso");
    }
  };

  if (!show) return null;

  return (
    <Modal
      title="CARGAR PROCESO"
      width="650px"
      onConfirm={handleConfirm}
      onCancel={handleClose}
    >
      {/* TRABAJO → TEXTO */}
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
          fontSize: fontSizes.dropDownText, 
          color: colores.black,
          margin: 0,
          padding: "10px",
          backgroundColor: colores.lightGray,
          borderRadius: "8px",
          minHeight: "25px"
        }}>
          {trabajo || "Busque un lote para ver el trabajo"}
        </p>
      </div>

      <hr style={{ marginBottom: "20px" }} />

      {/* LOTE + BUSCAR */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "15px", marginBottom: "20px" }}>
        <InputField
          label="LOTE"
          value={lote}
          placeholder="Nro Lote"
          onChange={(e) => setLote(e.target.value)}
          width="200px"
          height="45px"
          gap="20px"
        />

        <PrimaryButton
          text="BUSCAR"
          color={colores.primaryOrange}
          width={buttonSizes.mediumButton}
          height="45px"
          textColor="white"
          fontWeight="bold"
          onClick={handleBuscarLote}
        />
      </div>

      {/* SECTOR */}
      <div style={{ marginBottom: "20px" }}>
        <DropDownMenu
          label="SECTOR"
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
          label="MAQUINA"
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
