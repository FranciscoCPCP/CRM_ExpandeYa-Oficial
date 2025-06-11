import React, { useEffect, useState } from 'react';

interface Subcategoria {
  id: number;
  nombre: string;
  categoria_id: number;
  categoria_nombre?: string;
}

const Subcategorias: React.FC = () => {
  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([]);
  const [categorias, setCategorias] = useState<{id:number, nombre:string}[]>([]);
  const [nombre, setNombre] = useState('');
  const [categoriaId, setCategoriaId] = useState<number | ''>('');
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const fetchAll = async () => {
    const [catsRes, subsRes] = await Promise.all([
      fetch('http://localhost:8003/api/categorias'),
      fetch('http://localhost:8003/api/subcategorias'),
    ]);
    setCategorias(await catsRes.json());
    setSubcategorias(await subsRes.json());
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!nombre.trim() || !categoriaId) { setError('Todos los campos son obligatorios'); return; }
    const method = editId ? 'PUT' : 'POST';
    const url = editId
      ? `http://localhost:8003/api/subcategorias/${editId}`
      : 'http://localhost:8003/api/subcategorias';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, categoria_id: categoriaId }),
    });
    if (!res.ok) { setError('Error al guardar'); return; }
    setNombre(''); setCategoriaId(''); setEditId(null); fetchAll();
  };

  const handleEdit = (sub: Subcategoria) => {
    setNombre(sub.nombre); setCategoriaId(sub.categoria_id); setEditId(sub.id);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Eliminar esta subcategoría?')) return;
    await fetch(`http://localhost:8003/api/subcategorias/${id}`, { method: 'DELETE' });
    fetchAll();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Subcategorías</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} className="border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Categoría</label>
          <select value={categoriaId} onChange={e => setCategoriaId(Number(e.target.value))} className="border rounded px-3 py-2">
            <option value="">Selecciona una categoría</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-primary-orange text-white rounded">
          {editId ? 'Actualizar' : 'Agregar'}
        </button>
        {editId && (
          <button type="button" onClick={() => { setNombre(''); setCategoriaId(''); setEditId(null); }} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
        )}
      </form>
      {error && <div className="text-red-600">{error}</div>}
      <table className="min-w-full bg-white border mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Categoría</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {subcategorias.map(sub => (
            <tr key={sub.id}>
              <td className="px-4 py-2">{sub.nombre}</td>
              <td className="px-4 py-2">{sub.categoria_nombre || categorias.find(c => c.id === sub.categoria_id)?.nombre || '-'}</td>
              <td className="px-4 py-2">
                <button className="text-blue-600 mr-2" onClick={() => handleEdit(sub)}>Editar</button>
                <button className="text-red-600" onClick={() => handleDelete(sub.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subcategorias;
