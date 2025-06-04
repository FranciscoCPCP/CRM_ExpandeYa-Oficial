import React from 'react';
import { CreditCard, Filter, Download } from 'lucide-react';

const Pagos: React.FC = () => {
  const pagos = [
    { id: 1, cliente: 'Ana García', fecha: '10/10/2025', monto: '$250.00', metodo: 'Tarjeta', estado: 'Completado' },
    { id: 2, cliente: 'Carlos Rodríguez', fecha: '05/10/2025', monto: '$500.00', metodo: 'Transferencia', estado: 'Completado' },
    { id: 3, cliente: 'Laura Martínez', fecha: '01/10/2025', monto: '$1,200.00', metodo: 'Tarjeta', estado: 'Completado' },
    { id: 4, cliente: 'Miguel Sánchez', fecha: '28/09/2025', monto: '$750.00', metodo: 'Efectivo', estado: 'Completado' },
    { id: 5, cliente: 'Patricia López', fecha: '25/09/2025', monto: '$180.00', metodo: 'Transferencia', estado: 'Pendiente' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Pagos</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            <Download size={18} />
            <span>Exportar</span>
          </button>
          <button className="flex items-center gap-2 bg-primary-orange text-white px-4 py-2 rounded-lg hover:bg-primary-orange/90 transition-colors">
            <CreditCard size={18} />
            <span>Registrar Pago</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CreditCard className="text-primary-blue" />
            <h2 className="text-xl font-semibold text-gray-800">Historial de Pagos</h2>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
            <Filter size={16} />
            <span>Filtrar</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Método
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
              {pagos.map((pago) => (
                <tr key={pago.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{pago.cliente}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{pago.fecha}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{pago.monto}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{pago.metodo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      pago.estado === 'Completado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pago.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-blue hover:text-primary-orange">Ver detalles</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pagos;