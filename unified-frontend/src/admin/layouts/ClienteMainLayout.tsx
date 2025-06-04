import React, { useState } from 'react';
import ClienteHeader from '../components/ClienteHeader';
import Sidebar from '../components/Sidebar';

const ClienteMainLayout: React.FC<{ user: any; onLogout: () => void }> = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('perfil');

  // Renderiza el contenido según la sección activa
  const renderContent = () => {
    switch (activeSection) {
      case 'perfil':
        return <div className="p-8">Aquí va el perfil del cliente.</div>;
      case 'tickets':
        return <div className="p-8">Aquí van los tickets del cliente.</div>;
      case 'servicios':
        return <div className="p-8">Aquí van los servicios contratados.</div>;
      case 'pagos':
        return <div className="p-8">Aquí van los pagos y facturación.</div>;
      case 'chatbot':
        return <div className="p-8">Aquí va el chatbot.</div>;
      case 'reportes':
        return <div className="p-8">Aquí van los reportes del cliente.</div>;
      default:
        return <div className="p-8">Sección no encontrada</div>;
    }
  };

  // Sidebar personalizado para cliente
  const clienteNavItems = [
    { id: 'perfil', label: 'Mi Perfil', icon: <span className="material-icons">person</span> },
    { id: 'tickets', label: 'Tickets', icon: <span className="material-icons">confirmation_number</span> },
    { id: 'servicios', label: 'Servicios', icon: <span className="material-icons">build</span> },
    { id: 'pagos', label: 'Pagos', icon: <span className="material-icons">credit_card</span> },
    { id: 'chatbot', label: 'Chatbot', icon: <span className="material-icons">chat</span> },
    { id: 'reportes', label: 'Reportes', icon: <span className="material-icons">bar_chart</span> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col">
      <ClienteHeader user={user} onLogout={onLogout} />
      <div className="flex pt-14">
        <aside className="w-52 bg-primary-blue min-h-screen pt-4">
          <nav className="flex flex-col space-y-2">
            {clienteNavItems.map((item) => (
              <button
                key={item.id}
                className={`flex items-center px-4 py-2.5 rounded-full transition-colors text-left w-full mb-1 ${
                  activeSection === item.id
                    ? 'bg-primary-orange text-white'
                    : 'bg-primary-blue-light text-white/80 hover:bg-primary-blue-light/80'
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="mr-3 text-current">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 flex flex-col items-start justify-start bg-transparent min-h-screen">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ClienteMainLayout;
