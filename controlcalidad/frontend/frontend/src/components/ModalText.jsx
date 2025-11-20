import colores from "../styles/colores";
import { fontSizes } from "../styles/fontSizes";

const ModalText = ({ text }) => {
  return (
    <p style={{ textAlign: "center", fontSize: fontSizes.dropDownText, color: colores.black, paddingTop: "20px", paddingBottom: "20px" }}>
      {text}
    </p>
  );
};

export default ModalText;