import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, PlusCircle, User, Search } from 'lucide-react';
import { API_URLS } from '../utils/api';
import AdminCreatePage from './AdminCreatePage';

const Admins: React.FC = () => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editAdmin, setEditAdmin] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [userRol, setUserRol] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    // Obtener rol y email del usuario autenticado
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        setUserRol(parsed.rol || parsed.role || '');
        setUserEmail(parsed.email || '');
      } catch {}
    }
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No hay token de sesión. Inicia sesión para ver administradores.');
      setLoading(false);
      return;
    }
    fetchAdmins();
    // eslint-disable-next-line
  }, []);

  const fetchAdmins = () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    fetch(API_URLS.admins, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    })
      .then(async res => {
        if (!res.ok) {
          let msg = 'Error al obtener administradores: ' + res.status + ' ' + res.statusText;
          if (res.status === 401) msg = 'No autorizado. El token es inválido o expiró. Inicia sesión nuevamente.';
          if (res.status === 403) msg = 'No tienes permisos para ver administradores.';
          const data = await res.json().catch(() => ({}));
          if (data && data.error) msg += ` (${data.error})`;
          throw new Error(msg);
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) setAdmins(data);
        else if (data && Array.isArray(data.data)) setAdmins(data.data);
        else setAdmins([]);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas eliminar este admin?')) return;
    setDeletingId(id);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URLS.admins}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Error al eliminar admin');
      fetchAdmins();
    } catch (err) {
      alert('No se pudo eliminar el admin');
    } finally {
      setDeletingId(null);
    }
  };

  // Ordenar admins: primero el admin actual (yo), luego el resto
  const sortedAdmins = [
    ...admins.filter((a: any) => a.email === userEmail),
    ...admins.filter((a: any) => a.email !== userEmail),
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Administradores</h1>
        {userRol === 'superadmin' && (
          <button
            className="flex items-center gap-2 bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-blue/90 transition-colors shadow"
            onClick={() => { setEditAdmin(null); setShowForm(true); }}
          >
            <PlusCircle size={18} />
            <span>Nuevo Admin</span>
          </button>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl relative animate-fade-in">
            <AdminCreatePage
              key={editAdmin ? editAdmin.id : 'new'}
              admin={editAdmin}
              onAdminCreated={() => { setShowForm(false); fetchAdmins(); }}
              onCancel={() => setShowForm(false)}
            />
            <button className="absolute top-2 right-2 text-gray-400 hover:text-primary-orange text-xl" onClick={() => setShowForm(false)}>&times;</button>
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
              placeholder="Buscar administradores..."
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
                    Admin
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teléfono
                  </th>
                  {userRol === 'superadmin' && (
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dirección
                    </th>
                  )}
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedAdmins.map((admin: any) => {
                  const isSelf = admin.email === userEmail;
                  return (
                    <tr
                      key={admin.id}
                      className={
                        isSelf
                          ? "bg-orange-100 hover:bg-orange-200 border-l-4 border-orange-400"
                          : "hover:bg-gray-50"
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={isSelf ? "bg-orange-400 p-2 rounded-full mr-3" : "bg-primary-orange/10 p-2 rounded-full mr-3"}>
                            <User className={isSelf ? "h-5 w-5 text-white" : "h-5 w-5 text-primary-orange"} />
                          </div>
                          <div>
                            <div className={isSelf ? "text-sm font-bold text-orange-700" : "text-sm font-medium text-gray-900"}>
                              {admin.nombre} {isSelf && <span className="ml-2 px-2 py-0.5 text-xs rounded bg-orange-500 text-white">Yo</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{admin.email || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{admin.telefono}</div>
                      </td>
                      {userRol === 'superadmin' && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{admin.direccion || '-'}</div>
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {userRol === 'superadmin' && !isSelf && (
                          <div className="flex gap-2 justify-end">
                            <button
                              className="text-primary-blue hover:text-primary-orange"
                              title="Editar"
                              onClick={() => { setEditAdmin(admin); setShowForm(true); }}
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800"
                              title="Eliminar"
                              disabled={deletingId === admin.id}
                              onClick={() => handleDelete(admin.id)}
                            >
                              {deletingId === admin.id ? <span className="animate-spin">...</span> : <Trash2 size={18} />}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admins;
