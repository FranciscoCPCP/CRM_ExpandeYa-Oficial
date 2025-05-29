import React, { useState } from 'react';

const AdminCreatePage: React.FC<{ onAdminCreated?: () => void }> = ({ onAdminCreated }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
    area: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:8000/api/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Admin creado correctamente.');
        setForm({ name: '', email: '', password: '', telefono: '', direccion: '', area: '' });
        if (onAdminCreated) setTimeout(onAdminCreated, 1500);
      } else {
        setError(data.error || 'Error al crear admin');
      }
    } catch (err) {
      setError('Error de red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-700">Crear Admin</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nombre</label>
          <input type="text" name="name" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Correo electrónico</label>
          <input type="email" name="email" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Contraseña</label>
          <input type="password" name="password" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400" value={form.password} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Teléfono</label>
          <input type="text" name="telefono" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400" value={form.telefono} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Dirección</label>
          <input type="text" name="direccion" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400" value={form.direccion} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Área</label>
          <input type="text" name="area" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400" value={form.area} onChange={handleChange} required />
        </div>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
        <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Admin'}
        </button>
      </form>
    </div>
  );
};

export default AdminCreatePage;
