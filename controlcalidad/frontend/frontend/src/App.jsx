
import './App.css'
import CargarProcesoModal from './components/CargarProcesoModal.jsx';
import ProcesoListadoScreen from './pages/ProcesoListadoScreen.jsx';
import SelectorSectorScreen from './pages/SelectorSectorScreen.jsx';

function App() {
  //return <CargarProcesoModal show={true} onClose={() => {}} onConfirm={(datos) => {console.log(datos)}} />;
  return <ProcesoListadoScreen />;
}

export default App
