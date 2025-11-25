import { useState } from "react";
import colores from "../../styles/colores";
import SecondaryButton from "../../components/SecondaryButton";
import { adminStyles } from "../../styles/adminStyles";
import UsuariosPanel from "./UsuariosPanel";

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
          <div style={adminStyles.placeholder}>
            <h2>📊 Panel de Estadísticas</h2>
            <p>Aquí se mostrarán gráficos y métricas del sistema</p>
          </div>
        );
      case "usuarios":
        return <UsuariosPanel />;
      case "maquinas":
        return (
          <div style={adminStyles.placeholder}>
            <h2>🏭 Gestión de Máquinas</h2>
            <p>CRUD de máquinas por sector</p>
          </div>
        );
      case "parametros":
        return (
          <div style={adminStyles.placeholder}>
            <h2>✅ Gestión de Parámetros de Calidad</h2>
            <p>CRUD de controles de calidad por sector</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={adminStyles.container}>
      {/* Header */}
      <div style={adminStyles.header}>
        <h1 style={adminStyles.title}>PANEL DE ADMINISTRACIÓN</h1>
      </div>

      {/* Main Layout con Sidebar y Content */}
      <div style={adminStyles.mainLayout}>
        {/* Sidebar Navigation */}
        <div style={adminStyles.sidebar}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...adminStyles.tab,
                ...(activeTab === tab.id ? adminStyles.activeTab : {}),
              }}
            >
              <span style={adminStyles.tabIcon}>{tab.icon}</span>
              <span style={adminStyles.tabLabel}>{tab.label}</span>
            </button>
          ))}
          
          {/* Botón Cerrar Sesión */}
          <div style={{ marginTop: "auto", paddingTop: "20px" }}>
            <SecondaryButton
              text="Cerrar Sesión"
              color={colores.primaryRed}
              textColor={colores.white}
              onClick={onCerrarSesion}
              width="100%"
              fontWeight="600"
            />
          </div>
        </div>

        {/* Content Area */}
        <div style={adminStyles.content}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
