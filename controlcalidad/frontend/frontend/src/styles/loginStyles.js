import colores from "./colores";
import { fontSizes } from "./fontSizes";

export const loginStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: colores.lightGray,
  },
  card: {
    backgroundColor: colores.white,
    borderRadius: "16px",
    padding: "50px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    minWidth: "500px",
    textAlign: "center",
  },
  title: {
    fontSize: fontSizes.modalTitle,
    fontWeight: "bold",
    color: colores.black,
    margin: "0 0 10px 0",
  },
  subtitle: {
    fontSize: fontSizes.dropDownText,
    fontWeight: "500",
    color: colores.primaryGray,
    margin: "0 0 40px 0",
  },
  instruction: {
    fontSize: fontSizes.dropDownText,
    fontWeight: "500",
    color: colores.black,
    marginBottom: "30px",
  },
  roleSelection: {
    display: "flex",
    flexDirection: "column",
  },
  buttonContainer: {
    display: "flex",
    gap: "30px",
    justifyContent: "center",
  },
  roleButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 40px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    color: colores.white,
    minWidth: "180px",
  },
  roleIcon: {
    fontSize: "60px",
    marginBottom: "15px",
  },
  roleLabel: {
    fontSize: fontSizes.dropDownText,
    fontWeight: "bold",
    marginBottom: "8px",
  },
  roleDescription: {
    fontSize: fontSizes.body,
    opacity: 0.9,
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    textAlign: "left",
  },
  adminTitle: {
    fontSize: fontSizes.dropDownText,
    fontWeight: "600",
    color: colores.primaryOrange,
    textAlign: "center",
    marginBottom: "10px",
  },
  loginButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "10px",
    alignItems: "center",
  },
};
