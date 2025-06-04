import React, { useState } from 'react';
import { User, LogOut, Pencil } from 'lucide-react';

const ClienteHeader: React.FC<{ user: any; onLogout: () => void; onEditProfile?: () => void }> = ({ user, onLogout, onEditProfile }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-primary-orange flex items-center justify-between px-4 shadow-md z-10">
      <div className="flex items-center">
        <span className="text-white font-bold text-xl">CRM Pro</span>
      </div>
      <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 relative">
        <button title="Opciones de usuario" onClick={() => setShowModal(v => !v)} className="p-1 rounded hover:bg-white/30 transition-colors flex items-center">
          <User className="text-white h-5 w-5" />
          <span className="text-white text-sm font-semibold ml-2">{user.name}</span>
          <span className="text-white text-xs ml-2 bg-primary-blue-light rounded px-2 py-0.5">{user.rol}</span>
        </button>
        {showModal && (
          <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg py-2 w-44 z-50 animate-fade-in">
            <button
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-primary-orange/10 transition-colors"
              onClick={() => { setShowModal(false); onEditProfile && onEditProfile(); }}
            >
              <Pencil size={16} /> Editar perfil
            </button>
            <button
              className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 transition-colors"
              onClick={() => { setShowModal(false); onLogout && onLogout(); }}
            >
              <LogOut size={16} /> Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default ClienteHeader;
