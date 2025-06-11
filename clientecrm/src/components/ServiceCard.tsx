import React from 'react';
import { MicIcon as icons } from 'lucide-react';

interface ServiceCardProps {
  nombre: string;
  descripcion: string;
  precio: number | null;
  icon: string;
  isPrimary?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  nombre, 
  descripcion, 
  precio, 
  icon,
  isPrimary = false
}) => {
  // Dinámicamente obtener el ícono de Lucide
  const LucideIcon = icons[icon as keyof typeof icons];
  
  return (
    <div className={`
      bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300
      ${isPrimary 
        ? 'border-2 border-primary hover:shadow-lg' 
        : 'border border-gray-200 hover:border-primary/30 hover:shadow-md'
      }
    `}>
      <div className="p-6">
        <div className="flex items-start">
          <div className={`
            p-3 rounded-full mr-4 flex-shrink-0
            ${isPrimary ? 'bg-primary text-white' : 'bg-gray-100 text-secondary'}
          `}>
            {LucideIcon && <LucideIcon size={24} />}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{nombre}</h3>
            <p className="text-gray-600 text-sm mb-4">{descripcion}</p>
            
            <div className="flex items-center justify-between">
              <div>
                {precio !== null ? (
                  <p className="font-bold text-lg text-secondary">
                    ${precio.toLocaleString()}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 italic">Precio variable</p>
                )}
              </div>
              
              <button className={`
                px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                ${isPrimary 
                  ? 'bg-primary text-white hover:bg-primary/90' 
                  : 'border border-secondary text-secondary hover:bg-secondary hover:text-white'
                }
              `}>
                Ver detalles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;