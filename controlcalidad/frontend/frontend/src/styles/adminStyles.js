import colores from "./colores";
import { fontSizes } from "./fontSizes";

export const adminStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: colores.white,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px 20px 20px",
    backgroundColor: colores.white,
    flexShrink: 0,
  },
  title: {
    fontSize: fontSizes.modalTitle,
    fontWeight: "bold",
    color: colores.black,
    margin: 0,
  },
  mainLayout: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px 10px 20px 5px",
    width: "140px",
    backgroundColor: colores.white,
    flexShrink: 0,
  },
  tab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "12px 10px",
    backgroundColor: colores.lightGray,
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    color: colores.black,
    textAlign: "center",
  },
  activeTab: {
    backgroundColor: colores.primaryOrange,
    color: colores.white,
    fontWeight: "600",
    boxShadow: "0 2px 6px rgba(229, 137, 45, 0.3)",
  },
  tabIcon: {
    fontSize: "18px",
    flexShrink: 0,
  },
  tabLabel: {
    fontSize: "13px",
    lineHeight: "1.2",
  },
  content: {
    flex: 1,
    overflow: "auto",
    padding: "10px 20px",
  },
  placeholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: colores.white,
    padding: "60px",
    textAlign: "center",
  },
};
