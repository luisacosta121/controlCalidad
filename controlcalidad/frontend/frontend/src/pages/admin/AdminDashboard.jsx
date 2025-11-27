import { useState } from "react";
import colores from "../../styles/colores";
import SecondaryButton from "../../components/SecondaryButton";
import { adminStyles } from "../../styles/adminStyles";
import UsuariosPanel from "./UsuariosPanel";
import MaquinasPanel from "./MaquinasPanel";
import PrimaryButton from "../../components/PrimaryButton";
import { buttonSizes } from "../../styles/buttonSize";

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
        return <MaquinasPanel />;
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
          <div style={{
            marginTop: "auto",
            paddingTop: "20px",
            paddingLeft: "10px",
          }}>
            <PrimaryButton
              text="CERRAR SESION"
              onClick={onCerrarSesion}
              color={colores.primaryRed}
              textColor={colores.white}
              width={buttonSizes.mediumButton}
              height="55px"
              fontWeight="bold"
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
