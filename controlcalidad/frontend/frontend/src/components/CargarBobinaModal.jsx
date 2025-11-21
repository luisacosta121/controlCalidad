import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import Modal from "./Modal";
import DropDownMenu from "./DropDownMenu";
import ModalConfirmacion from "./ModalConfirmacion";

const CargarBobinaModal = ({ show, onClose, onConfirm, numeroBobina, proceso }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [operador, setOperador] = useState("");
  const [ayudante1, setAyudante1] = useState("");
  const [ayudante2, setAyudante2] = useState("");
  const [parametros, setParametros] = useState([]);
  const [valoresParametros, setValoresParametros] = useState({});
  const [showConfirmacion, setShowConfirmacion] = useState(false);

  const estadosCalidad = [
    { value: "", label: "Seleccione" },
    { value: "BIEN", label: "BIEN" },
    { value: "REGULAR", label: "REGULAR" },
    { value: "MAL", label: "MAL" },
  ];

  // Cargar usuarios cuando se abre el modal
  useEffect(() => {
    if (show) {
      fetch("http://localhost:8081/usuarios/activos")
        .then(res => res.json())
        .then(data => {
          setUsuarios(data);
        })
        .catch(() => toast.error("Error cargando usuarios"));
    }
  }, [show]);

  // Cargar parámetros dinámicos cuando se abre el modal
  useEffect(() => {
    if (show && proceso?.sectorId) {
      fetch(`http://localhost:8081/parametros/sector/${proceso.sectorId}`)
        .then(res => res.json())
        .then(data => {
          setParametros(data);
          // Inicializar valores vacíos para cada parámetro
          const valoresIniciales = {};
          data.forEach(param => {
            valoresIniciales[param.nombreParametro] = "";
          });
          setValoresParametros(valoresIniciales);
        })
        .catch(() => toast.error("Error cargando parámetros de calidad"));
    }
  }, [show, proceso]);

  const handleClose = () => {
    // Resetear campos
    setOperador("");
    setAyudante1("");
    setAyudante2("");
    setValoresParametros({});
    setParametros([]);
    onClose();
  };

  const handleConfirm = () => {
    // Validación - solo operador es obligatorio
    if (!operador || operador === "") {
      toast("Debe seleccionar un operador", {
        icon: '⚠️',
        style: {
          background: '#f59e0b',
          color: '#fff',
        },
      });
      return;
    }
    
    // Validar que todos los parámetros de calidad estén seleccionados
    for (const param of parametros) {
      if (!valoresParametros[param.nombreParametro] || valoresParametros[param.nombreParametro] === "") {
        toast(`Debe seleccionar el estado de ${param.nombreParametro.toUpperCase()}`, {
          icon: '⚠️',
          style: {
            background: '#f59e0b',
            color: '#fff',
          },
        });
        return;
      }
    }

    // Mostrar modal de confirmación
    setShowConfirmacion(true);
  };

  const handleConfirmarGuardado = () => {
    // Buscar los nombres completos de los usuarios para mostrar en la UI
    const operadorUsuario = usuarios.find(u => u.id === parseInt(operador));
    const ayudante1Usuario = ayudante1 ? usuarios.find(u => u.id === parseInt(ayudante1)) : null;
    const ayudante2Usuario = ayudante2 ? usuarios.find(u => u.id === parseInt(ayudante2)) : null;

    const bobina = {
      operadorId: parseInt(operador),
      ayudante1Id: ayudante1 ? parseInt(ayudante1) : null,
      ayudante2Id: ayudante2 ? parseInt(ayudante2) : null,
      operadorNombre: operadorUsuario ? `${operadorUsuario.nombre} ${operadorUsuario.apellido}` : "",
      ayudante1Nombre: ayudante1Usuario ? `${ayudante1Usuario.nombre} ${ayudante1Usuario.apellido}` : null,
      ayudante2Nombre: ayudante2Usuario ? `${ayudante2Usuario.nombre} ${ayudante2Usuario.apellido}` : null,
      ...valoresParametros, // Agregar todos los parámetros dinámicamente
    };

    onConfirm(bobina);
    setShowConfirmacion(false);
    handleClose();
  };

  const handleCancelarConfirmacion = () => {
    setShowConfirmacion(false);
  };

  if (!show) return null;

  // Opciones para los dropdowns - validar que usuarios sea un array
  const opcionesUsuarios = [
    { value: "", label: "Seleccione" },
    ...(Array.isArray(usuarios) ? usuarios.map(u => ({
      value: u.id,
      label: `${u.nombre} ${u.apellido}`.toUpperCase()
    })) : [])
  ];

  const opcionesAyudantes = [
    { value: "", label: "VACIO" },
    ...(Array.isArray(usuarios) ? usuarios.map(u => ({
      value: u.id,
      label: `${u.nombre} ${u.apellido}`.toUpperCase()
    })) : [])
  ];

  return (
    <>
    <Modal
      title={`CARGAR BOBINA N°${numeroBobina || "?"}`}
      width="450px"
      onConfirm={handleConfirm}
      onCancel={handleClose}
    >
      {/* OPERADOR */}
      <div style={{ marginBottom: "20px" }}>
        <DropDownMenu
          label="OPERADOR"
          value={operador}
          height="45px"
          gap="20px"
          options={opcionesUsuarios}
          onChange={(e) => setOperador(e.target.value)}
        />
      </div>

      {/* AYUDANTE 1 */}
      <div style={{ marginBottom: "20px" }}>
        <DropDownMenu
          label="AYUDANTE 1"
          value={ayudante1}
          height="45px"
          gap="20px"
          options={opcionesAyudantes}
          onChange={(e) => setAyudante1(e.target.value)}
        />
      </div>

      {/* AYUDANTE 2 */}
      <div style={{ marginBottom: "20px" }}>
        <DropDownMenu
          label="AYUDANTE 2"
          value={ayudante2}
          height="45px"
          gap="20px"
          options={opcionesAyudantes}
          onChange={(e) => setAyudante2(e.target.value)}
        />
      </div>

      {/* PARÁMETROS DINÁMICOS */}
      {parametros.map((param) => (
        <div key={param.id} style={{ marginBottom: "20px" }}>
          <DropDownMenu
            label={param.nombreParametro.toUpperCase()}
            value={valoresParametros[param.nombreParametro] || ""}
            height="45px"
            gap="20px"
            options={estadosCalidad}
            onChange={(e) => setValoresParametros(prev => ({
              ...prev,
              [param.nombreParametro]: e.target.value
            }))}
          />
        </div>
      ))}
    </Modal>

    {/* Modal de Confirmación */}
    <ModalConfirmacion
      show={showConfirmacion}
      titulo={`CARGAR BOBINA N°${numeroBobina || "?"}`}
      mensaje="¿DESEA CONFIRMAR LOS CAMBIOS?"
      onConfirm={handleConfirmarGuardado}
      onCancel={handleCancelarConfirmacion}
    />
    </>
  );
};

export default CargarBobinaModal;
