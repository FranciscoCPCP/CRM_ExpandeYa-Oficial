import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface Servicio {
  nombre: string;
  monto: number;
}

interface PackageCardProps {
  id: number;
  nombre: string;
  descripcion: string;
  servicios: Servicio[];
  total: number;
  estado: string;
  fechaInicio: string;
  fechaFin: string;
}

const PackageCard: React.FC<PackageCardProps> = ({
  id,
  nombre,
  descripcion,
  servicios,
  total,
  estado,
  fechaInicio,
  fechaFin,
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return 'bg-green-100 text-green-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Terminado':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-MX', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{nombre}</h3>
            <p className="text-gray-600 text-sm mt-1">{descripcion}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(estado)}`}>
            {estado}
          </span>
        </div>
        
        <div className="flex flex-wrap items-center justify-between mt-4 pb-4 border-b border-gray-200">
          <div>
            <p className="text-sm text-gray-500">Periodo</p>
            <p className="text-gray-700">
              {formatDate(fechaInicio)} - {formatDate(fechaFin)}
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">Monto total</p>
            <p className="text-xl font-bold text-secondary">${total.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-left text-primary font-medium focus:outline-none"
          >
            <span>Ver servicios incluidos ({servicios.length})</span>
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expanded && (
            <div className="mt-4 space-y-3 pt-3 border-t border-gray-100">
              {servicios.map((servicio, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-700">{servicio.nombre}</span>
                  <span className="font-medium">${servicio.monto.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-between mt-6">
          <button className="btn-secondary px-4 py-2 text-sm rounded-md">
            Ver detalles
          </button>
          
          {estado !== 'Terminado' && (
            <button className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm">
              <AlertCircle size={16} />
              <span>Cancelar paquete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageCard;