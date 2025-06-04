import React, { useState, useEffect } from 'react';
import ClienteHeader from '../components/ClienteHeader';
import ClienteRegisterForm from './ClienteRegisterForm';
import ClientePerfil from './ClientePerfil';

const ClientePanel: React.FC<{ user: any; onLogout: () => void }> = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('perfil');
  const [editMode, setEditMode] = useState(false);
  const [ubigeo, setUbigeo] = useState<any[]>([]);
  const [ubigeoLoading, setUbigeoLoading] = useState(true);
  const [ubigeoError, setUbigeoError] = useState('');

  useEffect(() => {
    fetch('http://192.168.10.19:8001/api/ubigeo')
      .then(res => res.json())
      .then(data => setUbigeo(data))
      .catch(() => setUbigeoError('No se pudo cargar el ubigeo'))
      .finally(() => setUbigeoLoading(false));
  }, []);

  // Placeholder para editar perfil
  const handleEditProfile = () => {
    alert('Funcionalidad de editar perfil próximamente.');
  };

  // Renderiza el contenido según la sección activa
  const renderContent = () => {
    switch (activeSection) {
      case 'perfil':
        return <ClientePerfil user={user} onUpdate={() => window.location.reload()} />;
      case 'tickets':
        return <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl mx-auto mt-20">Aquí irán los tickets del cliente.</div>;
      case 'servicios':
        return <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl mx-auto mt-20">Aquí irán los servicios contratados.</div>;
      case 'pagos':
        return <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl mx-auto mt-20">Aquí irán los pagos y facturación.</div>;
      case 'chatbot':
        return <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl mx-auto mt-20">Aquí irá el chatbot.</div>;
      case 'reportes':
        return <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl mx-auto mt-20">Aquí irán los reportes del cliente.</div>;
      default:
        return <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl mx-auto mt-20">Sección no encontrada</div>;
    }
  };

  // Mostrar el header y el menú
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col">
      <ClienteHeader user={user} onLogout={onLogout} onEditProfile={() => setActiveSection('perfil')} />
      <nav className="flex gap-4 justify-center mt-20 mb-8">
        <button onClick={() => setActiveSection('perfil')} className={`px-4 py-2 rounded-lg font-semibold ${activeSection === 'perfil' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50'}`}>Perfil</button>
        <button onClick={() => setActiveSection('tickets')} className={`px-4 py-2 rounded-lg font-semibold ${activeSection === 'tickets' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50'}`}>Tickets</button>
        <button onClick={() => setActiveSection('servicios')} className={`px-4 py-2 rounded-lg font-semibold ${activeSection === 'servicios' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50'}`}>Servicios</button>
        <button onClick={() => setActiveSection('pagos')} className={`px-4 py-2 rounded-lg font-semibold ${activeSection === 'pagos' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50'}`}>Pagos</button>
        <button onClick={() => setActiveSection('chatbot')} className={`px-4 py-2 rounded-lg font-semibold ${activeSection === 'chatbot' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50'}`}>Chatbot</button>
        <button onClick={() => setActiveSection('reportes')} className={`px-4 py-2 rounded-lg font-semibold ${activeSection === 'reportes' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50'}`}>Reportes</button>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-start">
        {renderContent()}
      </main>
    </div>
  );
};

export default ClientePanel;
