import React, { useEffect, useState } from 'react';
import { Package, PlusCircle, Filter, Layers } from 'lucide-react';
import ServicioForm from '../components/ServicioForm';
import AdminCategorias from './AdminCategorias';
import AdminSubcategorias from './AdminSubcategorias';

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number | null;
  precio_variable: boolean;
  estado: string;
  categoria: string;
  subcategoria: string;
  uuid: string;
}

const Servicios: React.FC = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Servicio | null>(null);
  const [showGestion, setShowGestion] = useState(false);

  const fetchServicios = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8003/api/servicios', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setServicios(data);
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  const handleCreate = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleEdit = (servicio: Servicio) => {
    setEditData(servicio);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Seguro que deseas eliminar este servicio?')) {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:8003/api/servicios/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      fetchServicios();
    }
  };

  const handleSubmit = async (data: any) => {
    const token = localStorage.getItem('token');
    if (editData) {
      await fetch(`http://localhost:8003/api/servicios/${editData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
    } else {
      await fetch('http://localhost:8003/api/servicios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
    }
    setShowModal(false);
    fetchServicios();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Catálogo de Servicios</h1>
        <div className="flex flex-wrap gap-2">
          <button
            className="flex items-center gap-2 bg-primary-orange text-white px-4 py-2 rounded-lg hover:bg-primary-orange/90 transition-colors"
            onClick={handleCreate}
          >
            <PlusCircle size={18} />
            <span>Nuevo Servicio</span>
          </button>
          <button
            className="flex items-center gap-2 bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-blue/90 transition-colors"
            onClick={() => setShowGestion((v) => !v)}
          >
            <Layers size={18} />
            <span>Gestión de Categorías</span>
          </button>
        </div>
      </div>

      <div className={`transition-all duration-300 flex flex-col md:flex-row gap-6 ${showGestion ? '' : ''}`}>
        {/* Catálogo de servicios a la izquierda */}
        <div className={`w-full ${showGestion ? 'md:w-1/2' : ''} transition-all duration-300`}> 
          <div className="bg-white rounded-xl shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Package className="text-primary-blue" />
                <h2 className="text-xl font-semibold text-gray-800">Servicios</h2>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
                <Filter size={16} />
                <span>Filtrar</span>
              </button>
            </div>
            <div className={`grid grid-cols-1 ${showGestion ? '' : 'md:grid-cols-2 xl:grid-cols-3'} gap-4 p-4`}>
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
                      <span className="text-sm text-gray-500">Subcategoría:</span>
                      <span className="text-sm font-medium">{servicio.subcategoria}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Precio:</span>
                      <span className="text-sm font-medium">
                        {servicio.precio_variable ? 'Variable' : (servicio.precio ? `$${servicio.precio}` : 'No definido')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Estado:</span>
                      <span className="text-sm font-medium">{servicio.estado}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <button className="text-sm text-primary-blue hover:text-primary-orange" onClick={() => handleEdit(servicio)}>Editar</button>
                    <button className="text-sm text-gray-500 hover:text-red-500" onClick={() => handleDelete(servicio.id)}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {showModal && (
            <ServicioForm
              initialData={editData || {}}
              onSubmit={handleSubmit}
              onClose={() => setShowModal(false)}
            />
          )}
        </div>

        {/* Gestión de categorías y subcategorías en la mitad de la vista */}
        {showGestion && (
          <div className="w-full md:w-1/2 flex flex-col gap-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow p-4 mb-6">
              <AdminCategorias />
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <AdminSubcategorias />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Servicios;