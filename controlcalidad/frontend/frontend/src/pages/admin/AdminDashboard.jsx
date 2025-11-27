import { useState } from "react";
import colores from "../../styles/colores";
import SecondaryButton from "../../components/SecondaryButton";
import { adminStyles } from "../../styles/adminStyles";
import UsuariosPanel from "./UsuariosPanel";
import MaquinasPanel from "./MaquinasPanel";
import ParametrosPanel from "./ParametrosPanel";
import PrimaryButton from "../../components/PrimaryButton";

const AdminDashboard = ({ onCerrarSesion }) => {
  const [activeTab, setActiveTab] = useState("estadisticas");

  const tabs = [
    { id: "estadisticas", label: "ESTADISTICAS", icon: "📊" },
    { id: "usuarios", label: "USUARIOS", icon: "👥" },
    { id: "maquinas", label: "MÁQUINAS", icon: "🏭" },
    { id: "parametros", label: "PARÁMETROS", icon: "✅" },
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
        return <ParametrosPanel />;
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
            <div key={tab.id} style={{ paddingLeft: "5px", paddingRight: "5px" }}>
              <PrimaryButton
                text={`${tab.icon} ${tab.label}`}
                onClick={() => setActiveTab(tab.id)}
                color={activeTab === tab.id ? colores.primaryOrange : colores.lightGray}
                textColor={activeTab === tab.id ? colores.white : colores.black}
                width="130px"
                height="50px"
                fontWeight={activeTab === tab.id ? "bold" : "500"}
              />
            </div>
          ))}

          {/* Botón Cerrar Sesión */}
          <div style={{
            marginTop: "auto",
            paddingTop: "20px",
            paddingLeft: "5px",
            paddingRight: "5px",
          }}>
            <PrimaryButton
              text="CERRAR SESION"
              onClick={onCerrarSesion}
              color={colores.primaryRed}
              textColor={colores.white}
              width="130px"
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
