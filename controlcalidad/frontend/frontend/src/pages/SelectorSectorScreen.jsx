import DropDownMenu from "../components/DropDownMenu";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import Modal from "../components/Modal";
import ModalText from "../components/ModalText";
import colores from "../styles/colores";
import { buttonSizes } from "../styles/buttonSize";


function SelectorSectorScreen() {

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <Modal
        title="CARGAR PROCESO"
        width="650px"
        onConfirm={() => { }}
        onCancel={() => { }}
      >
        {/* LOTE + INPUT + BOTÓN BUSCAR */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "10px" }}>
          <InputField
            label="LOTE"
            value={""}
            onChange={() => { }}
            width="200px"
            height="45px"
            gap="20px"
          />

          <PrimaryButton
            text="BUSCAR"
            color={colores.primaryOrange}
            width={buttonSizes.MediumButton}
            onClick={() => { }}
          />
        </div>

        {/* TRABAJO */}
        <InputField
          label="TRABAJO"
          value={""}
          onChange={() => { }}
          width="350px"
          height="45px"
          gap="20px"
        />

        {/* SECTOR */}
        <DropDownMenu
          label="SECTOR"
          value={""}
          onChange={() => { }}
          height="45px"
          gap="20px"
        />

        {/* MAQUINA */}
        <DropDownMenu
          label="MAQUINA"
          value={""}
          onChange={() => { }}
          height="45px"
          gap="20px"
        />
      </Modal>

    </div>


  );
}

export default SelectorSectorScreen;