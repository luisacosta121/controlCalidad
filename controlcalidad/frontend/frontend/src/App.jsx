
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css'
import ControlesScreen from './pages/ControlesScreen.jsx';
import ProcesoListadoScreen from './pages/ProcesoListadoScreen.jsx';

function App() {
  const [currentScreen, setCurrentScreen] = useState('listado'); // 'listado' o 'controles'
  const [selectedProceso, setSelectedProceso] = useState(null);

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
              background: '#9b0404ff',
            },
          },
          warning: {
            duration: 4000,
            style: {
              background: '#4f370dff',
            },
          },
        }}
        containerStyle={{
          zIndex: 9999,
        }}
      />
      {currentScreen === 'controles' ? (
        <ControlesScreen proceso={selectedProceso} onVolverAtras={handleVolverAtras} />
      ) : (
        <ProcesoListadoScreen onVerDetalles={handleVerDetalles} />
      )}
    </>
  );
}

export default App
