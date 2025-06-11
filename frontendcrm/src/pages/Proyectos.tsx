import React, { useEffect, useState } from 'react';

interface Proyecto {
  id: number;
  nombre: string;
  estado: string;
  paquete_id: number;
  avance: number;
  servicios: { nombre: string; categoria: string; subcategoria: string }[];
  cliente_nombre?: string;
}

const Proyectos: React.FC = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8003/api/proyectos', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || 'Error al obtener proyectos');
        }
        const data = await res.json();
        setProyectos(data);
      } catch (err: any) {
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    fetchProyectos();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Proyectos y Paquetes de Clientes</h1>
      {loading ? (
        <div>Cargando proyectos...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectos.map(proy => (
            <div key={proy.id} className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg text-primary-blue">{proy.nombre}</h2>
                <span className={`px-2 py-1 rounded text-xs ${proy.estado === 'finalizado' ? 'bg-green-100 text-green-700' : proy.estado === 'en progreso' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{proy.estado}</span>
              </div>
              {proy.cliente_nombre && (
                <div className="text-xs text-gray-500 mb-1">Cliente: {proy.cliente_nombre}</div>
              )}
              <div className="mb-2">
                <span className="text-sm text-gray-600">Avance:</span>
                <div className="w-full bg-gray-200 rounded h-2 mt-1">
                  <div className="bg-primary-orange h-2 rounded" style={{ width: `${proy.avance || 0}%` }}></div>
                </div>
                <span className="text-xs text-gray-500">{proy.avance || 0}%</span>
              </div>
              <div>
                <span className="text-sm font-medium">Servicios incluidos:</span>
                <ul className="list-disc ml-5 mt-1 text-sm">
                  {proy.servicios.map((s, idx) => (
                    <li key={idx}>{s.nombre} <span className="text-xs text-gray-400">({s.categoria} / {s.subcategoria})</span></li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Proyectos;
