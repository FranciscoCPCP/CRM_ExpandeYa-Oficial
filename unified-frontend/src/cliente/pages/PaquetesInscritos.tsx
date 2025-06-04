import React, { useState } from 'react';
import { Package, Filter } from 'lucide-react';
import PackageCard from '../components/PackageCard';
import { paquetesCombo } from '../services/mockData';

const PaquetesInscritos: React.FC = () => {
  const [filtro, setFiltro] = useState('Todos');
  
  // Filtrar paquetes según el estado seleccionado
  const paquetesFiltrados = filtro === 'Todos'
    ? paquetesCombo
    : paquetesCombo.filter(paquete => paquete.estado === filtro);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Mis Paquetes</h1>
          <p className="text-gray-600">
            Administra tus paquetes contratados y visualiza sus detalles.
          </p>
        </div>
        
        <div className="relative">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <Filter size={16} className="text-gray-500 mr-2" />
            <select 
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="appearance-none bg-transparent pr-8 focus:outline-none text-gray-700"
            >
              <option value="Todos">Todos</option>
              <option value="Activo">Activos</option>
              <option value="Pendiente">Pendientes</option>
              <option value="Terminado">Terminados</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {paquetesFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {paquetesFiltrados.map((paquete) => (
            <PackageCard
              key={paquete.id}
              id={paquete.id}
              nombre={paquete.nombre}
              descripcion={paquete.descripcion}
              servicios={paquete.servicios}
              total={paquete.total}
              estado={paquete.estado}
              fechaInicio={paquete.fechaInicio}
              fechaFin={paquete.fechaFin}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No hay paquetes {filtro !== 'Todos' ? filtro.toLowerCase() + 's' : ''}</h3>
          <p className="text-gray-500 mb-6">
            {filtro === 'Todos' 
              ? 'No tienes paquetes contratados en este momento.' 
              : `No tienes paquetes ${filtro.toLowerCase()}s en este momento.`}
          </p>
          <button className="btn btn-primary">
            Explorar paquetes disponibles
          </button>
        </div>
      )}
      
      <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">¿Sabías que...?</h3>
        <p className="text-gray-600 mb-4">
          Combinar múltiples servicios en un paquete personalizado te permite ahorrar hasta un 25% comparado con contratarlos individualmente.
        </p>
        <button className="text-primary font-medium hover:underline">
          Solicitar paquete personalizado
        </button>
      </div>
    </div>
  );
};

export default PaquetesInscritos;