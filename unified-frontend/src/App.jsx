import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayoutCliente from './cliente/layouts/MainLayout';
import MainLayoutAdmin from './admin/layouts/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/cliente" replace />} />
        <Route path="/cliente/*" element={<MainLayoutCliente />} />
        <Route path="/admin/*" element={<MainLayoutAdmin />} />
        {/* Aquí puedes agregar rutas de autenticación unificada si lo deseas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
