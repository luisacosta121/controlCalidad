import colores from "./colores";
import { fontSizes } from "./fontSizes";

export const usuariosPanelStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0px",
  },
  title: {
    fontSize: fontSizes.modalTitle,
    fontWeight: "bold",
    color: colores.black,
    margin: 0,
  },
  tableContainer: {
    overflow: "hidden",
    flex: 1,
  },
  tableWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  scrollContainer: {
    flex: 1,
    overflow: "auto",
  },
  tableContent: {
    minWidth: "max-content",
  },
  headerRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 2fr",
    color: colores.black,
    padding: "12px 10px",
    borderBottom: `1px solid ${colores.black}`,
    fontSize: fontSizes.dropDownText,
    fontWeight: "regular",
    backgroundColor: colores.white,
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 2fr",
    padding: "12px 10px",
    alignItems: "center",
    color: colores.black,
    fontSize: fontSizes.textList,
    borderBottom: `1px solid ${colores.black}`,
    borderLeft: `4px solid ${colores.primaryOrange}`,
    fontWeight: "600",
    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  actionButtons: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "20px 10px",
  },
  emptyMessage: {
    textAlign: "center",
    padding: "40px",
    fontSize: "18px",
    color: colores.primaryGray,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  infoText: {
    fontSize: "14px",
    color: colores.primaryBlue,
    backgroundColor: colores.lightGray,
    padding: "10px",
    borderRadius: "8px",
    margin: 0,
  },
};
