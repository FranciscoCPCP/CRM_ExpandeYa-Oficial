import React, { useState } from 'react';
import { Bell, User, Menu } from 'lucide-react';
import { userProfile } from '../services/mockData';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="bg-primary text-white h-14 px-4 flex items-center justify-between shadow-md sticky top-0 z-10">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-3 md:hidden p-1 rounded-full hover:bg-primary-light"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold">CRM Portal</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-primary-light relative"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-white rounded-full"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-20">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="font-semibold">Notificaciones</h3>
              </div>
              <div className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50">
                <p className="text-sm">Nueva respuesta en tu ticket #101</p>
                <p className="text-xs text-gray-500 mt-1">Hace 2 horas</p>
              </div>
              <div className="px-4 py-3 hover:bg-gray-50">
                <p className="text-sm">Tu pago ha sido procesado</p>
                <p className="text-xs text-gray-500 mt-1">Hace 1 día</p>
              </div>
              <div className="px-4 py-2 text-center">
                <button className="text-primary text-sm hover:underline">
                  Ver todas
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 hover:bg-primary-light rounded-full"
            aria-label="User profile"
          >
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <img 
                src={userProfile.profilePicture} 
                alt="Profile" 
                className="h-full w-full object-cover"
              />
            </div>
          </button>
          
          {showProfile && (
            <div className="absolute right-0 mt-2 w-60 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-20">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-medium">{userProfile.name}</p>
                <p className="text-sm text-gray-500">{userProfile.email}</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                Mi perfil
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                Configuración
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600">
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;