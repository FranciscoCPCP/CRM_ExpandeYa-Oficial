import React, { useEffect, useState } from 'react';

interface Categoria {
  id: number;
  nombre: string;
}

const Categorias: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nombre, setNombre] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const fetchCategorias = async () => {
    const res = await fetch('http://localhost:8003/api/categorias');
    const data = await res.json();
    setCategorias(data);
  };

  useEffect(() => { fetchCategorias(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!nombre.trim()) { setError('El nombre es obligatorio'); return; }
    const method = editId ? 'PUT' : 'POST';
    const url = editId
      ? `http://localhost:8003/api/categorias/${editId}`
      : 'http://localhost:8003/api/categorias';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre }),
    });
    if (!res.ok) { setError('Error al guardar'); return; }
    setNombre(''); setEditId(null); fetchCategorias();
  };

  const handleEdit = (cat: Categoria) => {
    setNombre(cat.nombre); setEditId(cat.id);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Eliminar esta categoría?')) return;
    await fetch(`http://localhost:8003/api/categorias/${id}`, { method: 'DELETE' });
    fetchCategorias();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Categorías</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} className="border rounded px-3 py-2" />
        </div>
        <button type="submit" className="px-4 py-2 bg-primary-orange text-white rounded">
          {editId ? 'Actualizar' : 'Agregar'}
        </button>
        {editId && (
          <button type="button" onClick={() => { setNombre(''); setEditId(null); }} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
        )}
      </form>
      {error && <div className="text-red-600">{error}</div>}
      <table className="min-w-full bg-white border mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(cat => (
            <tr key={cat.id}>
              <td className="px-4 py-2">{cat.nombre}</td>
              <td className="px-4 py-2">
                <button className="text-blue-600 mr-2" onClick={() => handleEdit(cat)}>Editar</button>
                <button className="text-red-600" onClick={() => handleDelete(cat.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categorias;
