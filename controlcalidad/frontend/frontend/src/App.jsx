
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css'
import LoginScreen from './pages/LoginScreen.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ControlesScreen from './pages/ControlesScreen.jsx';
import ProcesoListadoScreen from './pages/ProcesoListadoScreen.jsx';

function App() {
  const [usuario, setUsuario] = useState(null); // null cuando no está logueado
  const [currentScreen, setCurrentScreen] = useState('listado'); // 'listado' o 'controles'
  const [selectedProceso, setSelectedProceso] = useState(null);

  const handleLogin = (user) => {
    setUsuario(user);
  };

  const handleCerrarSesion = () => {
    setUsuario(null);
    setCurrentScreen('listado');
    setSelectedProceso(null);
  };

  const handleVerDetalles = (proceso) => {
    setSelectedProceso(proceso);
    setCurrentScreen('controles');
  };

  const handleVolverAtras = () => {
    setCurrentScreen('listado');
    setSelectedProceso(null);
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
            fontSize: '16px',
            padding: '16px',
          },
          success: {
            duration: 3000,
            style: {
              background: '#10b981',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: '#ef4444',
            },
          },
          warning: {
            duration: 4000,
            style: {
              background: '#fab236ff',
            },
          },
        }}
        containerStyle={{
          zIndex: 9999,
        }}
      />
      {!usuario ? (
        <LoginScreen onLogin={handleLogin} />
      ) : usuario.rol === 'ADMIN' ? (
        <AdminDashboard onCerrarSesion={handleCerrarSesion} />
      ) : currentScreen === 'controles' ? (
        <ControlesScreen proceso={selectedProceso} onVolverAtras={handleVolverAtras} />
      ) : (
        <ProcesoListadoScreen onVerDetalles={handleVerDetalles} />
      )}
    </>
  );
}

export default App
