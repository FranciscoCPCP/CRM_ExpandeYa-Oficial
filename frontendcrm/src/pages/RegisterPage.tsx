import React, { useEffect, useState } from 'react';
import ClienteRegisterForm from './ClientesRegisterForm';
import { API_URLS } from '../utils/api';

const RegisterPage: React.FC<{ onRegisterSuccess: () => void; onGoToLogin: () => void }> = ({ onRegisterSuccess, onGoToLogin }) => {
  const [ubigeo, setUbigeo] = useState<any[]>([]);
  const [ubigeoLoading, setUbigeoLoading] = useState(true);
  const [ubigeoError, setUbigeoError] = useState('');

  useEffect(() => {
    fetch(API_URLS.ubigeo)
      .then(res => res.json())
      .then(data => {
        // El backend retorna un objeto, pero el front espera un array de regiones
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          // Convertir el objeto a array de regiones con estructura esperada
          const regiones = Object.entries(data).map(([region, provinciasObj]) => ({
            region,
            provincias: Object.entries(provinciasObj as any).map(([provincia, distritosObj]) => ({
              provincia,
              distritos: Object.entries(distritosObj as any).map(([distrito, ciudades]) => ({
                distrito,
                ciudades
              }))
            }))
          }));
          setUbigeo(regiones);
        } else {
          setUbigeo(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => setUbigeoError('No se pudo cargar el ubigeo'))
      .finally(() => setUbigeoLoading(false));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-blue">Crear Cuenta de Cliente</h2>
        <ClienteRegisterForm
          onSuccess={onRegisterSuccess}
          ubigeo={ubigeo}
          ubigeoLoading={ubigeoLoading}
          ubigeoError={ubigeoError}
        />
        <div className="mt-4 text-center">
          <a href="#" className="text-indigo-500 hover:underline text-sm" onClick={e => { e.preventDefault(); onGoToLogin(); }}>¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
