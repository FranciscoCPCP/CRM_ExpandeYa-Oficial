import React from 'react';
import { TicketCheck, Clock, AlertCircle, CheckCircle, PlusCircle } from 'lucide-react';

const Tickets: React.FC = () => {
  const tickets = [
    { id: 1, asunto: 'Error en generación de reportes', cliente: 'Ana García', fecha: '11/10/2025', prioridad: 'Alta', estado: 'Abierto' },
    { id: 2, asunto: 'Problema con acceso a módulo de pagos', cliente: 'Carlos Rodríguez', fecha: '09/10/2025', prioridad: 'Media', estado: 'En proceso' },
    { id: 3, asunto: 'Solicitud de nueva funcionalidad', cliente: 'Laura Martínez', fecha: '07/10/2025', prioridad: 'Baja', estado: 'Pendiente' },
    { id: 4, asunto: 'Sistema lento al cargar clientes', cliente: 'Miguel Sánchez', fecha: '04/10/2025', prioridad: 'Media', estado: 'Cerrado' },
  ];

  // Helper function to get the correct icon and color based on the ticket state
  const getStatusDetails = (estado: string) => {
    switch (estado) {
      case 'Abierto':
        return { icon: <AlertCircle className="h-4 w-4" />, color: 'text-red-500 bg-red-50' };
      case 'En proceso':
        return { icon: <Clock className="h-4 w-4" />, color: 'text-amber-500 bg-amber-50' };
      case 'Pendiente':
        return { icon: <Clock className="h-4 w-4" />, color: 'text-blue-500 bg-blue-50' };
      case 'Cerrado':
        return { icon: <CheckCircle className="h-4 w-4" />, color: 'text-green-500 bg-green-50' };
      default:
        return { icon: <AlertCircle className="h-4 w-4" />, color: 'text-gray-500 bg-gray-50' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Tickets de Soporte</h1>
        <button className="flex items-center gap-2 bg-primary-orange text-white px-4 py-2 rounded-lg hover:bg-primary-orange/90 transition-colors">
          <PlusCircle size={18} />
          <span>Nuevo Ticket</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="text-red-600 text-sm font-medium">Tickets Abiertos</p>
            <p className="text-2xl font-bold text-gray-800">2</p>
          </div>
          <div className="bg-red-100 p-2 rounded-full">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="text-amber-600 text-sm font-medium">En Proceso</p>
            <p className="text-2xl font-bold text-gray-800">1</p>
          </div>
          <div className="bg-amber-100 p-2 rounded-full">
            <Clock className="h-6 w-6 text-amber-500" />
          </div>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="text-green-600 text-sm font-medium">Tickets Cerrados</p>
            <p className="text-2xl font-bold text-gray-800">1</p>
          </div>
          <div className="bg-green-100 p-2 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 border-b flex items-center gap-2">
          <TicketCheck className="text-primary-blue" />
          <h2 className="text-xl font-semibold text-gray-800">Tickets Recientes</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asunto
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prioridad
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets.map((ticket) => {
                const statusDetail = getStatusDetails(ticket.estado);
                return (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      #{ticket.id.toString().padStart(4, '0')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{ticket.asunto}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{ticket.cliente}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{ticket.fecha}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        ticket.prioridad === 'Alta' 
                          ? 'bg-red-100 text-red-800' 
                          : ticket.prioridad === 'Media'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}>
                        {ticket.prioridad}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusDetail.color}`}>
                        <span className="mr-1">{statusDetail.icon}</span>
                        {ticket.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-blue hover:text-primary-orange">Ver detalles</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tickets;