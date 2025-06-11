import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Perfil from './pages/Perfil';
import CatalogoServicios from './pages/CatalogoServicios';
import PaquetesInscritos from './pages/PaquetesInscritos';
import Tickets from './pages/Tickets';
import MovimientosYPagos from './pages/MovimientosYPagos';
import ReservaCitas from './pages/ReservaCitas';
import Chatbot from './pages/Chatbot';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /perfil */}
        <Route path="/" element={<Navigate to="/perfil\" replace />} />
        
        {/* Main Layout with nested routes */}
        <Route path="/" element={<MainLayout />}>
          <Route path="perfil" element={<Perfil />} />
          <Route path="servicios" element={<CatalogoServicios />} />
          <Route path="paquetes" element={<PaquetesInscritos />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="movimientos" element={<MovimientosYPagos />} />
          <Route path="citas" element={<ReservaCitas />} />
          <Route path="chatbot" element={<Chatbot />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;