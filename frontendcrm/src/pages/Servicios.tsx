import React from 'react';
import { Package, PlusCircle, Filter } from 'lucide-react';

const Servicios: React.FC = () => {
  const servicios = [
    { id: 1, nombre: 'Consultoría Inicial', duracion: '1 hora', precio: '$150.00', categoria: 'Consultoría' },
    { id: 2, nombre: 'Implementación CRM', duracion: '20 horas', precio: '$2,500.00', categoria: 'Implementación' },
    { id: 3, nombre: 'Soporte Técnico', duracion: 'Variable', precio: '$75.00/hora', categoria: 'Soporte' },
    { id: 4, nombre: 'Capacitación', duracion: '4 horas', precio: '$500.00', categoria: 'Formación' },
    { id: 5, nombre: 'Mantenimiento Mensual', duracion: 'Mensual', precio: '$350.00/mes', categoria: 'Mantenimiento' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Servicios</h1>
        <button className="flex items-center gap-2 bg-primary-orange text-white px-4 py-2 rounded-lg hover:bg-primary-orange/90 transition-colors">
          <PlusCircle size={18} />
          <span>Nuevo Servicio</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Package className="text-primary-blue" />
            <h2 className="text-xl font-semibold text-gray-800">Catálogo de Servicios</h2>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
            <Filter size={16} />
            <span>Filtrar</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {servicios.map(servicio => (
            <div key={servicio.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-800">{servicio.nombre}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-blue/10 text-primary-blue">
                  {servicio.categoria}
                </span>
              </div>
              <div className="mt-4 space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Duración:</span>
                  <span className="text-sm font-medium">{servicio.duracion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Precio:</span>
                  <span className="text-sm font-medium">{servicio.precio}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button className="text-sm text-primary-blue hover:text-primary-orange">Editar</button>
                <button className="text-sm text-gray-500 hover:text-red-500">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Servicios;