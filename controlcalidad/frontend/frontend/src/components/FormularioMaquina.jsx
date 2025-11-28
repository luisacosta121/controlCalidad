import { useState, useEffect } from "react";
import Modal from "./Modal";
import InputField from "./InputField";
import DropDownMenu from "./DropDownMenu";
import { toast } from "sonner";

//---------------------------------------
// FORMULARIO DE CREAR/EDITAR MAQUINA
const FormularioMaquina = ({ isOpen, onClose, maquina, onGuardar }) => {
  const [formData, setFormData] = useState({
    id: null,
    numero: "",
    sector: "",
    activo: true,
  });
  const [sectores, setSectores] = useState([]);

  useEffect(() => {
    // Cargar sectores desde el backend
    fetch("http://localhost:8081/sectores")
      .then((res) => res.json())
      .then((data) => {
        console.log("Sectores recibidos del backend:", data);
        const sectoresFormateados = data.map((sector) => ({
          label: sector,
          value: sector,
        }));
        console.log("Sectores formateados:", sectoresFormateados);
        setSectores(sectoresFormateados);
      })
      .catch((error) => {
        console.error("Error al cargar sectores:", error);
        toast.error("Error al cargar sectores");
      });
  }, []);

  // Actualizar formData cuando cambia maquina (para editar)
  useEffect(() => {
    if (isOpen) {
      if (maquina) {
        setFormData({
          id: maquina.id,
          numero: maquina.numero,
          sector: maquina.sector,
          activo: maquina.activo,
        });
      } else {
        setFormData({
          id: null,
          numero: "",
          sector: "",
          activo: true,
        });
      }
    }
  }, [maquina, isOpen]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (!formData.numero || !formData.sector) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    const url = formData.id
      ? `http://localhost:8081/maquinas/${formData.id}`
      : "http://localhost:8081/maquinas";
    const method = formData.id ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al guardar máquina");
        return res.json();
      })
      .then(() => {
        toast.success(
          formData.id ? "Máquina actualizada" : "Máquina creada"
        );
        onGuardar();
        onClose();
      })
      .catch(() => toast.error("Error al guardar máquina"));
  };

  const estadoOpciones = [
    { label: "ACTIVO", value: true },
    { label: "INACTIVO", value: false },
  ];

  if (!isOpen) return null;

  return (
    <Modal
      show={isOpen}
      title={formData.id ? "EDITAR MAQUINA" : "NUEVA MAQUINA"}
      onConfirm={handleSubmit}
      onCancel={onClose}
      showButtons={true}
      width="400px"
    >
      <div>
        <InputField
          label="NUMERO"
          value={formData.numero}
          onChange={(e) => {
            let valor = e.target.value;
            valor = valor.replace(/[^0-9]/g, "");
            valor = valor.slice(0, 2);
            handleChange("numero", valor);
          }}
          width="200px"
          placeholder="Ingrese número de máquina"
          required
        />

        <DropDownMenu
          label="SECTOR"
          value={formData.sector}
          onChange={(e) => handleChange("sector", e.target.value)}
          options={[
            { label: "Seleccione un sector", value: "" },
            ...sectores
          ]}
          required
        />

        <DropDownMenu
          label="ESTADO"
          value={formData.activo}
          onChange={(e) => handleChange("activo", e.target.value === "true")}
          options={estadoOpciones}
          required
        />
      </div>
    </Modal>
  );
};

export default FormularioMaquina;
