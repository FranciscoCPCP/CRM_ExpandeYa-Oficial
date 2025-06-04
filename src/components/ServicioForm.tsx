import React, { useState } from 'react';

interface ServicioFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const categorias = [
  { value: 'principal', label: 'Principal' },
  { value: 'secundario', label: 'Secundario' },
  { value: 'complemento', label: 'Complemento' },
];

const subcategorias = [
  // Principales
  { value: 'Desarrollo de páginas web personalizadas', label: 'Desarrollo de páginas web personalizadas', categoria: 'principal' },
  { value: 'Publicidad y marketing digital', label: 'Publicidad y marketing digital', categoria: 'principal' },
  { value: 'Integración de pasarelas de pago', label: 'Integración de pasarelas de pago', categoria: 'principal' },
  { value: 'Sistemas personalizados', label: 'Sistemas personalizados', categoria: 'principal' },
  // Secundarios
  { value: 'Diseño gráfico', label: 'Diseño gráfico', categoria: 'secundario' },
  { value: 'Animación 2D y modelado 3D', label: 'Animación 2D y modelado 3D', categoria: 'secundario' },
  { value: 'Producción audiovisual y fotografía profesional', label: 'Producción audiovisual y fotografía profesional', categoria: 'secundario' },
  { value: 'Mantenimiento post-venta', label: 'Mantenimiento post-venta', categoria: 'secundario' },
  { value: 'Migración segura de sitios web existentes', label: 'Migración segura de sitios web existentes', categoria: 'secundario' },
  { value: 'Capacitaciones técnicas para la gestión de herramientas digitales', label: 'Capacitaciones técnicas para la gestión de herramientas digitales', categoria: 'secundario' },
  // Complementos
  { value: 'Dominio gratuito por un año', label: 'Dominio gratuito por un año', categoria: 'complemento' },
  { value: 'Mantenimiento durante la garantía', label: 'Mantenimiento durante la garantía', categoria: 'complemento' },
  { value: 'Análisis de requerimientos', label: 'Análisis de requerimientos', categoria: 'complemento' },
];

const ServicioForm: React.FC<ServicioFormProps> = ({ initialData = {}, onSubmit, onClose }) => {
  const [form, setForm] = useState({
    nombre: initialData.nombre || '',
    descripcion: initialData.descripcion || '',
    precio: initialData.precio || '',
    precio_variable: initialData.precio_variable || false,
    estado: initialData.estado || 'activo',
    categoria: initialData.categoria || '',
    subcategoria: initialData.subcategoria || '',
    uuid: initialData.uuid || '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value,
    }));
  };

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm(prev => ({
      ...prev,
      categoria: e.target.value,
      subcategoria: '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.descripcion || !form.categoria || !form.subcategoria || (!form.precio_variable && !form.precio)) {
      setError('Todos los campos son obligatorios. Si el precio es variable, deja el campo precio vacío.');
      return;
    }
    setError('');
    onSubmit(form);
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
            <select name="categoria" value={form.categoria} onChange={handleCategoriaChange} className="w-full border rounded px-3 py-2" required>
              <option value="">Selecciona una categoría</option>
              {categorias.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Subcategoría</label>
            <select name="subcategoria" value={form.subcategoria} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
              <option value="">Selecciona una subcategoría</option>
              {subcategorias.filter(sub => sub.categoria === form.categoria).map(sub => (
                <option key={sub.value} value={sub.value}>{sub.label}</option>
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
