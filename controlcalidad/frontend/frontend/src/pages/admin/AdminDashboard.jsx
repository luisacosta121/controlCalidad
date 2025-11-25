import { useState } from "react";
import colores from "../../styles/colores";
import { fontSizes } from "../../styles/fontSizes";

const AdminDashboard = ({ onCerrarSesion }) => {
  const [activeTab, setActiveTab] = useState("estadisticas");

  const tabs = [
    { id: "estadisticas", label: "Estadísticas", icon: "📊" },
    { id: "usuarios", label: "Usuarios", icon: "👥" },
    { id: "maquinas", label: "Máquinas", icon: "🏭" },
    { id: "parametros", label: "Parámetros", icon: "✅" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "estadisticas":
        return (
          <div style={styles.placeholder}>
            <h2>📊 Panel de Estadísticas</h2>
            <p>Aquí se mostrarán gráficos y métricas del sistema</p>
          </div>
        );
      case "usuarios":
        return (
          <div style={styles.placeholder}>
            <h2>👥 Gestión de Usuarios</h2>
            <p>CRUD de usuarios del sistema</p>
          </div>
        );
      case "maquinas":
        return (
          <div style={styles.placeholder}>
            <h2>🏭 Gestión de Máquinas</h2>
            <p>CRUD de máquinas por sector</p>
          </div>
        );
      case "parametros":
        return (
          <div style={styles.placeholder}>
            <h2>✅ Gestión de Parámetros de Calidad</h2>
            <p>CRUD de controles de calidad por sector</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>PANEL DE ADMINISTRACIÓN</h1>
        <button onClick={onCerrarSesion} style={styles.logoutButton}>
          Cerrar Sesión
        </button>
      </div>

      {/* Tabs Navigation */}
      <div style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.activeTab : {}),
            }}
          >
            <span style={styles.tabIcon}>{tab.icon}</span>
            <span style={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={styles.content}>{renderContent()}</div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: colores.lightGray,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    backgroundColor: colores.white,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: fontSizes.modalTitle,
    fontWeight: "bold",
    color: colores.black,
    margin: 0,
  },
  logoutButton: {
    padding: "10px 24px",
    backgroundColor: colores.primaryRed,
    color: colores.white,
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  tabsContainer: {
    display: "flex",
    gap: "10px",
    padding: "20px 40px",
    backgroundColor: colores.white,
    borderBottom: `2px solid ${colores.secondaryGray}`,
  },
  tab: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 24px",
    backgroundColor: colores.lightGray,
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    color: colores.black,
  },
  activeTab: {
    backgroundColor: colores.primaryOrange,
    color: colores.white,
    fontWeight: "600",
    boxShadow: "0 2px 6px rgba(229, 137, 45, 0.3)",
  },
  tabIcon: {
    fontSize: "20px",
  },
  tabLabel: {
    fontSize: "16px",
  },
  content: {
    flex: 1,
    padding: "30px 40px",
    overflow: "auto",
  },
  placeholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: colores.white,
    borderRadius: "12px",
    padding: "60px",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default AdminDashboard;
