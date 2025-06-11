import React, { useState, useEffect } from 'react';

interface Props {
  admin?: any;
  onAdminCreated?: () => void;
  onCancel?: () => void;
}

const AdminCreatePage: React.FC<Props> = ({ admin, onAdminCreated, onCancel }) => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    password2: '', // nuevo campo para repetir contraseña
    telefono: '',
    direccion: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [touched, setTouched] = useState<{[key:string]: boolean}>({});

  // Validación en tiempo real de contraseñas
  const passwordMismatch = (form.password || form.password2) && form.password !== form.password2;

  useEffect(() => {
    if (admin) {
      setForm({
        nombre: admin.nombre || '',
        email: admin.email || '',
        password: '', // nunca precargar password
        password2: '', // nunca precargar password2
        telefono: admin.telefono || '',
        direccion: admin.direccion || '',
      });
    } else {
      setForm({ nombre: '', email: '', password: '', password2: '', telefono: '', direccion: '' });
    }
  }, [admin]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    // Validar que las contraseñas coincidan solo si se está creando o cambiando la contraseña
    if ((!admin || form.password) && form.password !== form.password2) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }
    if (!form.nombre || !form.email || !form.telefono || (!admin && !form.password)) {
      setError('Por favor completa todos los campos obligatorios.');
      setLoading(false);
      return;
    }
    const token = localStorage.getItem('token');
    try {
      let user_id = admin?.user_id;
      // Si es creación, primero crear usuario en AuthService
      if (!admin) {
        const userRes = await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
          },
          body: JSON.stringify({
            name: form.nombre, // para AuthService
            nombre: form.nombre, // para AdminService
            email: form.email,
            password: form.password, // ahora siempre es obligatoria y validada
            rol: 'admin',
            telefono: form.telefono,
          })
        });
        const userData = await userRes.json();
        if (!userRes.ok) {
          setError(userData.error || (userData.message ? userData.message : 'Error al crear usuario en AuthService'));
          setLoading(false);
          return;
        }
        user_id = userData.user?.id || userData.id;
        if (!user_id) {
          setError('No se pudo obtener el user_id del usuario creado.');
          setLoading(false);
          return;
        }
      }
      // Crear o actualizar admin en AdminService
      const res = await fetch(admin ? `http://localhost:8002/api/administrador/${admin.id}` : 'http://localhost:8002/api/administrador', {
        method: admin ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          direccion: form.direccion,
          rol: 'admin',
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(admin ? 'Admin actualizado correctamente.' : 'Admin creado correctamente.');
        if (onAdminCreated) setTimeout(onAdminCreated, 1000);
      } else {
        setError(data.error || (data.message ? data.message : 'Error al guardar admin'));
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
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-700">{admin ? 'Editar Admin' : 'Crear Admin'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nombre <span className="text-red-500">*</span></label>
          <input type="text" name="nombre" className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400 ${touched.nombre && !form.nombre ? 'border-red-400' : ''}`} value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Correo electrónico <span className="text-red-500">*</span></label>
          <input type="email" name="email" className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400 ${touched.email && !form.email ? 'border-red-400' : ''}`} value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Contraseña{!admin && <span className="text-red-500">*</span>} {admin && <span className="text-xs text-gray-400">(dejar vacío para no cambiar)</span>}</label>
          <input type="password" name="password" className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400 ${(touched.password || touched.password2) && passwordMismatch ? 'border-red-400' : ''}`} value={form.password} onChange={handleChange} {...(!admin && { required: true })} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Repetir contraseña{!admin && <span className="text-red-500">*</span>} {admin && <span className="text-xs text-gray-400">(dejar vacío para no cambiar)</span>}</label>
          <input type="password" name="password2" className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400 ${(touched.password2 || touched.password) && passwordMismatch ? 'border-red-400' : ''}`} value={form.password2} onChange={handleChange} {...(!admin && { required: true })} />
          {passwordMismatch && <div className="text-red-500 text-xs mt-1">Las contraseñas no coinciden</div>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Teléfono <span className="text-red-500">*</span></label>
          <input type="text" name="telefono" className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400 ${touched.telefono && !form.telefono ? 'border-red-400' : ''}`} value={form.telefono} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Dirección</label>
          <input type="text" name="direccion" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400" value={form.direccion} onChange={handleChange} />
        </div>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
        <div className="flex gap-2">
          <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition" disabled={loading}>
            {loading ? (admin ? 'Actualizando...' : 'Creando...') : (admin ? 'Actualizar Admin' : 'Crear Admin')}
          </button>
          {onCancel && (
            <button type="button" className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition" onClick={onCancel} disabled={loading}>Cancelar</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminCreatePage;
