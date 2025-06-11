import React, { useState, useEffect } from 'react';

interface ServicioFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const ServicioForm: React.FC<ServicioFormProps> = ({ initialData = {}, onSubmit, onClose }) => {
  const [form, setForm] = useState({
    nombre: initialData.nombre || '',
    descripcion: initialData.descripcion || '',
    precio: initialData.precio || '',
    precio_variable: initialData.precio_variable || false,
    estado: initialData.estado || 'activo',
    categoria_id: initialData.categoria_id || '',
    subcategoria_id: initialData.subcategoria_id || '',
    uuid: initialData.uuid || '',
  });
  const [categorias, setCategorias] = useState<{id:number, nombre:string}[]>([]);
  const [subcategorias, setSubcategorias] = useState<{id:number, nombre:string, categoria_id:number}[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Cargar categorías y subcategorías al abrir el modal
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const [catRes, subRes] = await Promise.all([
          fetch('http://localhost:8003/api/categorias', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:8003/api/subcategorias', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);
        if (!catRes.ok || !subRes.ok) {
          throw new Error('No autorizado o error de red');
        }
        setCategorias(await catRes.json());
        setSubcategorias(await subRes.json());
      } catch (err: any) {
        setError('Error al cargar categorías o subcategorías. Verifica tu sesión.');
      }
    };
    fetchData();
  }, []);

  // Filtrar subcategorías según la categoría seleccionada
  const subcatsFiltradas = form.categoria_id
    ? subcategorias.filter(s => s.categoria_id === Number(form.categoria_id))
    : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value,
      // Si cambia la categoría, limpiar subcategoría
      ...(name === 'categoria_id' ? { subcategoria_id: '' } : {}),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.descripcion || !form.categoria_id || (!form.precio_variable && !form.precio)) {
      setError('Todos los campos son obligatorios. Si el precio es variable, deja el campo precio vacío.');
      return;
    }
    setError('');
    // Buscar el nombre de la categoría y subcategoría
    const categoriaObj = categorias.find(c => c.id === Number(form.categoria_id));
    const subcategoriaObj = subcategorias.find(s => s.id === Number(form.subcategoria_id));
    const dataToSend = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: form.precio_variable ? null : form.precio,
      precio_variable: form.precio_variable,
      estado: form.estado,
      categoria: categoriaObj ? categoriaObj.nombre : '',
      subcategoria: subcategoriaObj ? subcategoriaObj.nombre : '',
      uuid: form.uuid,
    };
    onSubmit(dataToSend);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">{initialData.id ? 'Editar Servicio' : 'Nuevo Servicio'}</h2>
        {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="precio_variable"
              checked={!!form.precio_variable}
              onChange={e => {
                setForm(prev => ({
                  ...prev,
                  precio_variable: e.target.checked,
                }));
              }}
              id="precio_variable"
            />
            <label htmlFor="precio_variable" className="text-sm">Precio variable</label>
          </div>
          {!form.precio_variable && (
            <div>
              <label className="block text-sm font-medium">Precio</label>
              <input name="precio" type="number" step="0.01" value={form.precio} onChange={handleChange} className="w-full border rounded px-3 py-2" required={!form.precio_variable} />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium">Categoría</label>
            <select name="categoria_id" value={form.categoria_id} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
              <option value="">Selecciona una categoría</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Subcategoría</label>
            <select name="subcategoria_id" value={form.subcategoria_id} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
              <option value="">Selecciona una subcategoría</option>
              {subcatsFiltradas.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Estado</label>
            <select name="estado" value={form.estado} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
              <option value="activo">Activo</option>
              <option value="suspendido">Suspendido</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded bg-primary-orange text-white hover:bg-primary-orange/90">{initialData.id ? 'Actualizar' : 'Crear'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServicioForm;
