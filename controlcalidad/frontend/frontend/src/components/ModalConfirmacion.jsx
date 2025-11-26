import Modal from "./Modal";

//----------------------------------------
// MODAL DE CONFIRMACION REUTILIZABLE
const ModalConfirmacion = ({ show, onConfirm, onCancel, titulo, mensaje }) => {
  if (!show) return null;

  return (
    <Modal
      title={titulo}
      width="500px"
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <div style={{ 
        textAlign: "center", 
        fontSize: "1.4rem",
        padding: "20px 0"
      }}>
        {mensaje}
      </div>
    </Modal>
  );
};

export default ModalConfirmacion;
