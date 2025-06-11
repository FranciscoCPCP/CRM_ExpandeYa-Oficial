import React from 'react';
import ServiceCard from '../components/ServiceCard';
import { serviciosPrincipales, serviciosSecundarios } from '../services/mockData';

const CatalogoServicios: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Catálogo de Servicios</h1>
        <p className="text-gray-600">
          Explora nuestra variedad de servicios diseñados para impulsar tu presencia digital.
        </p>
      </div>
      
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Servicios Principales</h2>
          <button className="text-primary hover:underline text-sm font-medium">
            Ver todos
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {serviciosPrincipales.map((servicio) => (
            <ServiceCard
              key={servicio.id}
              nombre={servicio.nombre}
              descripcion={servicio.descripcion}
              precio={servicio.precio}
              icon={servicio.icon}
              isPrimary={true}
            />
          ))}
        </div>
      </section>
      
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Servicios Secundarios</h2>
          <button className="text-primary hover:underline text-sm font-medium">
            Ver todos
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviciosSecundarios.map((servicio) => (
            <ServiceCard
              key={servicio.id}
              nombre={servicio.nombre}
              descripcion={servicio.descripcion}
              precio={servicio.precio}
              icon={servicio.icon}
            />
          ))}
        </div>
      </section>
      
      <section className="bg-gradient-to-r from-secondary to-secondary/80 text-white p-6 rounded-xl">
        <div className="md:flex items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">¿No encuentras lo que buscas?</h3>
            <p className="opacity-90">
              Podemos crear soluciones personalizadas para tus necesidades específicas.
            </p>
          </div>
          <button className="bg-white text-secondary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Solicitar servicio personalizado
          </button>
        </div>
      </section>
    </div>
  );
};

export default CatalogoServicios;