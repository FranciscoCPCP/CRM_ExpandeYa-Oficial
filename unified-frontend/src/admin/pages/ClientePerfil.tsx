import React, { useState, useEffect } from 'react';
import ClienteRegisterForm from './ClienteRegisterForm';

const ClientePerfil: React.FC<{ user: any; onUpdate: (data: any) => void }> = ({ user, onUpdate }) => {
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

  if (editMode) {
    return (
      <ClienteRegisterForm
        cliente={user}
        ubigeo={ubigeo}
        ubigeoLoading={ubigeoLoading}
        ubigeoError={ubigeoError}
        onSuccess={() => { setEditMode(false); onUpdate && onUpdate(user); }}
        hidePasswordFields
      />
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">Bienvenido, {user.nombre || user.name} (Cliente)</h1>
      {/* Mostrar datos del cliente aquí */}
      <button className="bg-primary-orange text-white px-4 py-2 rounded mt-4" onClick={() => setEditMode(true)}>
        Editar perfil
      </button>
    </div>
  );
};

export default ClientePerfil;
