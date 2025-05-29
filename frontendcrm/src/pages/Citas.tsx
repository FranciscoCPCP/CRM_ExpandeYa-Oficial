import React from 'react';
import { Calendar, Clock, User, PlusCircle } from 'lucide-react';

const Citas: React.FC = () => {
  const citasHoy = [
    { id: 1, cliente: 'Ana García', hora: '09:00', servicio: 'Consulta general' },
    { id: 2, cliente: 'Carlos Rodríguez', hora: '10:30', servicio: 'Revisión mensual' },
    { id: 3, cliente: 'Laura Martínez', hora: '12:00', servicio: 'Presentación propuesta' },
  ];

  const citasProximas = [
    { id: 4, cliente: 'Miguel Sánchez', fecha: '15/10/2025', hora: '11:00', servicio: 'Asesoría' },
    { id: 5, cliente: 'Patricia López', fecha: '16/10/2025', hora: '15:30', servicio: 'Seguimiento' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Citas</h1>
        <button className="flex items-center gap-2 bg-primary-orange text-white px-4 py-2 rounded-lg hover:bg-primary-orange/90 transition-colors">
          <PlusCircle size={18} />
          <span>Nueva Cita</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center mb-4">
          <Calendar className="text-primary-orange mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Citas de Hoy</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {citasHoy.map(cita => (
            <div key={cita.id} className="py-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-primary-blue/10 p-2 rounded-full mr-4">
                  <User className="h-5 w-5 text-primary-blue" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{cita.cliente}</p>
                  <p className="text-sm text-gray-500">{cita.servicio}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>{cita.hora}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center mb-4">
          <Calendar className="text-primary-blue mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Próximas Citas</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {citasProximas.map(cita => (
            <div key={cita.id} className="py-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-primary-orange/10 p-2 rounded-full mr-4">
                  <User className="h-5 w-5 text-primary-orange" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{cita.cliente}</p>
                  <p className="text-sm text-gray-500">{cita.servicio}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-800">{cita.fecha}</p>
                <p className="text-sm text-gray-500">{cita.hora}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Citas;