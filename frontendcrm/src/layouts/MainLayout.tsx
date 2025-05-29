import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Citas from '../pages/Citas';
import Clientes from '../pages/Clientes';
import Servicios from '../pages/Servicios';
import Pagos from '../pages/Pagos';
import Tickets from '../pages/Tickets';
import Chatbot from '../pages/Chatbot';
import Reportes from '../pages/Reportes';

const MainLayout: React.FC = () => {
  const [activeSection, setActiveSection] = useState('citas');

  // Function to render the appropriate component based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case 'citas':
        return <Citas />;
      case 'clientes':
        return <Clientes />;
      case 'servicios':
        return <Servicios />;
      case 'pagos':
        return <Pagos />;
      case 'tickets':
        return <Tickets />;
      case 'chatbot':
        return <Chatbot />;
      case 'reportes':
        return <Reportes />;
      default:
        return <div>Sección no encontrada</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 pt-14">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="ml-48 flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;