import React, { useEffect, useState } from 'react';
import { User, Search, PlusCircle } from 'lucide-react';
import { API_URLS } from '../utils/api';
import ClienteRegisterForm from './ClienteRegisterForm';

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [ubigeo, setUbigeo] = useState<any[]>([]);
  const [ubigeoLoading, setUbigeoLoading] = useState(true);
  const [ubigeoError, setUbigeoError] = useState('');
  const [editCliente, setEditCliente] = useState<any | null>(null);

  useEffect(() => {
    fetch(API_URLS.clientes)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener clientes: ' + res.status + ' ' + res.statusText);
        return res.json();
      })
      .then(data => {
        // Si el backend retorna un array, lo usamos. Si retorna un objeto con data, lo usamos también.
        if (Array.isArray(data)) setClientes(data);
        else if (data && Array.isArray(data.data)) setClientes(data.data);
        else setClientes([]);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch('http://192.168.10.19:8001/api/ubigeo')
      .then(res => res.json())
      .then(data => setUbigeo(data))
      .catch(() => setUbigeoError('No se pudo cargar el ubigeo'))
      .finally(() => setUbigeoLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
        <button
          className="flex items-center gap-2 bg-primary-orange text-white px-4 py-2 rounded-lg hover:bg-primary-orange/90 transition-colors shadow"
          onClick={() => { setShowForm(true); setEditCliente(null); }}
        >
          <PlusCircle size={18} />
          <span>Nuevo Cliente</span>
        </button>
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl relative animate-fade-in">
            <ClienteRegisterForm
              cliente={editCliente}
              onSuccess={() => { setShowForm(false); setEditCliente(null); setLoading(true); fetch(API_URLS.clientes)
                .then(res => res.json())
                .then(data => {
                  if (Array.isArray(data)) setClientes(data);
                  else if (data && Array.isArray(data.data)) setClientes(data.data);
                  else setClientes([]);
                })
                .catch(err => setError(err.message))
                .finally(() => setLoading(false)); }}
              ubigeo={ubigeo}
              ubigeoLoading={ubigeoLoading}
              ubigeoError={ubigeoError}
            />
            <button className="absolute top-2 right-2 text-gray-400 hover:text-primary-orange text-xl" onClick={() => { setShowForm(false); setEditCliente(null); }}>&times;</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar clientes..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-6 text-center text-gray-500">Cargando...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dirección
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo cliente
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actividad/Negocio/Idea
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Región
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provincia
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distrito
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha nacimiento
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha registro
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clientes.map((cliente: any) => (
                  <tr key={cliente.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-primary-blue/10 p-2 rounded-full mr-3">
                          <User className="h-5 w-5 text-primary-blue" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{cliente.nombre}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{cliente.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{cliente.telefono}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{cliente.direccion}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{cliente.tipo_cliente}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {cliente.tipo_cliente === 'profesional' && cliente.actividad}
                        {cliente.tipo_cliente === 'negocio' && cliente.nombre_negocio}
                        {cliente.tipo_cliente === 'emprendimiento' && cliente.idea_emprendimiento}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{cliente.region}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{cliente.provincia}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{cliente.distrito}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{cliente.fecha_nacimiento ? cliente.fecha_nacimiento : '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{cliente.fecha_registro ? cliente.fecha_registro : '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {/* Eliminar botón de editar, aquí irá el futuro botón de estado si se requiere */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clientes;