import { useState, useEffect } from "react";
import Modal from "./Modal";
import InputField from "./InputField";
import DropDownMenu from "./DropDownMenu";
import { toast } from "sonner";

//---------------------------------------
// FORMULARIO DE CREAR/EDITAR PARAMETRO
const FormularioParametro = ({ isOpen, onClose, parametro, onGuardar }) => {
  const [formData, setFormData] = useState({
    id: null,
    nombreParametro: "",
    sector: null,
    obligatorio: false,
    activo: true,
    orden: 0,
  });
  const [sectores, setSectores] = useState([]);

  useEffect(() => {
    // Cargar sectores desde el backend
    fetch("http://localhost:8081/sectores/con-id")
      .then((res) => res.json())
      .then((data) => {
        setSectores(data);
      })
      .catch((error) => {
        console.error("Error al cargar sectores:", error);
        toast.error("Error al cargar sectores");
      });
  }, []);

  // Actualizar formData cuando cambia parametro (para editar)
  useEffect(() => {
    if (isOpen) {
      if (parametro) {
        setFormData({
          id: parametro.id,
          nombreParametro: parametro.nombreParametro,
          sector: parametro.sector,
          obligatorio: parametro.obligatorio,
          activo: parametro.activo,
          orden: parametro.orden || 0,
        });
      } else {
        setFormData({
          id: null,
          nombreParametro: "",
          sector: null,
          obligatorio: false,
          activo: true,
          orden: 0,
        });
      }
    }
  }, [parametro, isOpen]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (!formData.nombreParametro || !formData.sector) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    console.log("FormData antes de enviar:", formData);

    const url = formData.id
      ? `http://localhost:8081/parametros/${formData.id}`
      : "http://localhost:8081/parametros";
    const method = formData.id ? "PUT" : "POST";

    console.log("URL:", url);
    console.log("Method:", method);
    console.log("Body:", JSON.stringify(formData));

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) {
          return res.text().then(text => {
            console.error("Error response:", text);
            throw new Error("Error al guardar parámetro");
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("Parámetro guardado:", data);
        toast.success(
          formData.id ? "Parámetro actualizado" : "Parámetro creado"
        );
        onGuardar();
        onClose();
      })
      .catch((error) => {
        console.error("Error completo:", error);
        toast.error("Error al guardar parámetro");
      });
  };

  const estadoOpciones = [
    { label: "ACTIVO", value: true },
    { label: "INACTIVO", value: false },
  ];

  const obligatorioOpciones = [
    { label: "SÍ", value: true },
    { label: "NO", value: false },
  ];

  if (!isOpen) return null;

  return (
    <Modal
      show={isOpen}
      title={formData.id ? "EDITAR PARÁMETRO" : "NUEVO PARÁMETRO"}
      onConfirm={handleSubmit}
      onCancel={onClose}
      showButtons={true}
      width="600px"
    >
      <div>
        <InputField
          label="PARÁMETRO"
          value={formData.nombreParametro}
          onChange={(e) => handleChange("nombreParametro", e.target.value)}
          type="text"
          placeholder="Ingrese nombre del parámetro"
          required
        />

        <DropDownMenu
          label="SECTOR"
          value={formData.sector?.id || ""}
          onChange={(e) => {
            const sectorSeleccionado = sectores.find(
              (s) => s.id === parseInt(e.target.value)
            );
            handleChange("sector", sectorSeleccionado);
          }}
          options={[
            { label: "Seleccione un sector", value: "" },
            ...sectores.map((s) => ({ label: s.sector, value: s.id })),
          ]}
          required
        />

        <DropDownMenu
          label="OBLIGATORIO"
          value={formData.obligatorio}
          onChange={(e) => handleChange("obligatorio", e.target.value === "true")}
          options={obligatorioOpciones}
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

export default FormularioParametro;
