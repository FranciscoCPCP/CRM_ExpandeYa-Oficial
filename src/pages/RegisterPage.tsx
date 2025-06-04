import React, { useEffect, useState } from 'react';
import ClienteRegisterForm from './ClienteRegisterForm';
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
    <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Líneas diagonales decorativas */}
      <div className="absolute -top-32 -left-32 w-[150%] h-[150%] pointer-events-none z-0">
        <div style={{transform: 'rotate(-30deg)'}} className="absolute left-0 top-1/4 w-full h-8 bg-[#2e318f] opacity-90" />
        <div style={{transform: 'rotate(-30deg)'}} className="absolute left-0 top-1/2 w-full h-8 bg-[#fa6b1b] opacity-90" />
        <div style={{transform: 'rotate(-30deg)'}} className="absolute left-0 top-3/4 w-full h-8 bg-[#2e318f] opacity-90" />
      </div>
      <div className="relative z-10 bg-gradient-to-b from-[#2e318f] to-[#fa6b1b] shadow-xl rounded-2xl p-10 w-full max-w-2xl flex flex-col gap-6">
        <h2 className="text-3xl font-bold mb-2 text-center text-white">Crear Cuenta de Cliente</h2>
        <ClienteRegisterForm
          onSuccess={onRegisterSuccess}
          ubigeo={ubigeo}
          ubigeoLoading={ubigeoLoading}
          ubigeoError={ubigeoError}
        />
        <div className="mt-4 text-center">
          <a href="#" className="text-[#fa6b1b] font-bold underline text-base" onClick={e => { e.preventDefault(); onGoToLogin(); }}>¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
