import { useState, useEffect } from 'react';
import { Camera, Mail, Phone, MapPin, Save } from 'lucide-react';

const API_CLIENTES = 'http://localhost:8001/api/clientes';
const API_USERS = 'http://localhost:8000/api/usuarios';
const API_UPDATE_PROFILE = (id: number) => `${API_CLIENTES}/${id}`;
const API_UPDATE_PASSWORD = (id: number) => `${API_USERS}/${id}/password`;
const API_UBIGEO = 'http://localhost:8001/api/ubigeo';

const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const initialForm = {
  nombre: '',
  email: '',
  telefono: '',
  direccion: '',
  fecha_nacimiento: '',
  tipo_cliente: '',
  actividad: '',
  nombre_negocio: '',
  idea_emprendimiento: '',
  region: '',
  provincia: '',
  distrito: '',
};

// Helper para normalizar el perfil completo
const getProfileFull = (profile: any) => ({
  nombre: profile.nombre || profile.name || '',
  email: profile.email || '',
  telefono: profile.telefono || profile.phone || '',
  direccion: profile.direccion || profile.address || '',
  fecha_nacimiento: profile.fecha_nacimiento || '',
  fecha_registro: profile.fecha_registro || '',
  tipo_cliente: profile.tipo_cliente || '',
  actividad: profile.actividad || '',
  nombre_negocio: profile.nombre_negocio || '',
  idea_emprendimiento: profile.idea_emprendimiento || '',
  region: profile.region || '',
  provincia: profile.provincia || '',
  distrito: profile.distrito || '',
  profilePicture: profile.profilePicture || '',
});

const Perfil: React.FC = () => {
  // Cambia el tipo inicial de profile a 'any' para permitir campos extendidos
  const [profile, setProfile] = useState<any>(null); // <-- Inicia en null, no con userProfile
  const [form, setForm] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [ubigeo, setUbigeo] = useState<any[]>([]);
  const [ubigeoLoading, setUbigeoLoading] = useState(true);
  const [ubigeoError, setUbigeoError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);
  const user = getUserFromStorage();

  useEffect(() => {
    // Cargar ubigeo
    fetch(API_UBIGEO)
      .then(res => res.json())
      .then(data => setUbigeo(data))
      .catch(() => setUbigeoError('No se pudo cargar el ubigeo'))
      .finally(() => setUbigeoLoading(false));
    // Cargar datos reales del cliente desde ClienteService y AuthService
    if (user && user.id) {
      // 1. Obtener datos extendidos de ClienteService
      fetch(`${API_CLIENTES}/${user.id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
        .then(res => res.json())
        .then(clienteData => {
          // 2. Obtener datos básicos de AuthService
          fetch(`${API_USERS}/${user.id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          })
            .then(res => res.json())
            .then(userData => {
              // Unir ambos objetos (AuthService tiene name/email, ClienteService tiene extendidos)
              const full = getProfileFull({ ...userData, ...clienteData });
              setProfile(full);
              setForm(full);
            })
            .catch(() => {
              // Si falla AuthService, usar solo ClienteService
              const full = getProfileFull(clienteData);
              setProfile(full);
              setForm(full);
            });
        })
        .catch(() => {
          // Si falla ClienteService, usar solo localStorage
          const full = getProfileFull(user);
          setProfile(full);
          setForm(full);
        });
    }
  }, []);

  // Selectores dependientes
  const regiones = ubigeo.map((r: any) => r.region);
  // Corrige la declaración de provincias y distritos para evitar referencia circular
  type Provincia = { provincia: string; distritos: string[] };
  const provincias: Provincia[] = form.region
    ? (ubigeo.find((r: any) => r.region === form.region)?.provincias || [])
    : [];
  const distritos: string[] = form.region && form.provincia
    ? (provincias.find((p: any) => p.provincia === form.provincia)?.distritos || [])
    : [];

  // Edad
  const getEdad = (fecha: string) => {
    if (!fecha) return 0;
    const hoy = new Date();
    const nac = new Date(fecha);
    let edad = hoy.getFullYear() - nac.getFullYear();
    const m = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    return edad;
  };
  const edad = getEdad(form.fecha_nacimiento);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    // Limpiar selects dependientes
    if (name === 'region') setForm(f => ({ ...f, provincia: '', distrito: '' }));
    if (name === 'provincia') setForm(f => ({ ...f, distrito: '' }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const token = localStorage.getItem('token');
      // Usar los datos del formulario, no del profile
      const res = await fetch(API_UPDATE_PROFILE(user.id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          direccion: form.direccion,
          fecha_nacimiento: form.fecha_nacimiento,
          tipo_cliente: form.tipo_cliente,
          actividad: form.actividad,
          nombre_negocio: form.nombre_negocio,
          idea_emprendimiento: form.idea_emprendimiento,
          region: form.region,
          provincia: form.provincia,
          distrito: form.distrito,
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al actualizar perfil');
      setSuccess('Perfil actualizado correctamente');
      setIsEditing(false);
      // Actualizar localStorage y el estado extendido
      localStorage.setItem('user', JSON.stringify({ ...user, ...data }));
      setProfile(getProfileFull(data));
      setForm(getProfileFull(data)); // Refrescar el formulario con los datos nuevos
    } catch (err: any) {
      setError(err.message || 'Error de red');
    } finally {
      setLoading(false);
    }
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    if (passwordForm.new !== passwordForm.confirm) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }
    if (passwordForm.new.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      setLoading(false);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API_UPDATE_PASSWORD(user.id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: passwordForm.current,
          new_password: passwordForm.new,
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al cambiar contraseña');
      setSuccess('Contraseña actualizada correctamente');
      setPasswordForm({ current: '', new: '', confirm: '' });
      setShowPasswordForm(false);
    } catch (err: any) {
      setError(err.message || 'Error de red');
    } finally {
      setLoading(false);
    }
  };
  
  // Cierre de sesión seguro desde el perfil
  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = 'http://localhost:5173/login'; // Redirección directa al login real de frontendcrm
    }, 800);
  };

  // Mostrar mensajes de error o éxito
  // Puedes personalizar el estilo según tu diseño
  // Render condicional de campos según tipo_cliente
  // y selects dependientes igual que en ClientesRegisterForm
  // SIEMPRE mostrar la vista de perfil, aunque no haya datos cargados aún
  const profileFull = getProfileFull(profile || user || initialForm);

  // Eliminar cualquier return condicional que bloquee la vista
  // (No mostrar mensaje de error ni loader, siempre mostrar el front)

  // Usar profile directamente, ya está normalizado
  return (
    <div className="space-y-6">
      {(error || success) && (
        <div className={`rounded-lg px-4 py-3 mb-2 text-sm font-medium ${error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {error || success}
        </div>
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Mi Perfil</h1>
        <button 
          onClick={() => { 
            setIsEditing(!isEditing); 
            setForm(profileFull); 
          }}
          className={`btn ${isEditing ? 'bg-gray-500 hover:bg-gray-600' : 'btn-secondary'} text-white`}
          disabled={false}
        >
          {isEditing ? 'Cancelar' : 'Editar Perfil'}
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
            <div className="relative">
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img 
                  src={profile?.profilePicture || '/default-avatar.png'} 
                  alt="Profile" 
                  className="h-full w-full object-cover"
                />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary/90 transition-colors">
                  <Camera size={18} />
                </button>
              )}
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">{profileFull.nombre}</h2>
            <p className="text-gray-500 text-sm">
              Cliente desde {('fecha_registro' in profileFull && profileFull.fecha_registro) ? new Date((profileFull as any).fecha_registro).toLocaleDateString() : '2024'}
            </p>
            <div className="mt-6 w-full space-y-3">
              <div className="flex items-center text-gray-600">
                <Mail size={16} className="mr-2" />
                <span className="text-sm">{profileFull.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone size={16} className="mr-2" />
                <span className="text-sm">{profileFull.telefono}</span>
              </div>
              <div className="flex items-start text-gray-600">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">{profileFull.direccion}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="text-xs font-semibold mr-2">Tipo:</span>
                <span className="text-sm">{profileFull.tipo_cliente}</span>
              </div>
              {profileFull.region && (
                <div className="flex items-center text-gray-600">
                  <span className="text-xs font-semibold mr-2">Región:</span>
                  <span className="text-sm">{profileFull.region}</span>
                </div>
              )}
              {profileFull.provincia && (
                <div className="flex items-center text-gray-600">
                  <span className="text-xs font-semibold mr-2">Provincia:</span>
                  <span className="text-sm">{profileFull.provincia}</span>
                </div>
              )}
              {profileFull.distrito && (
                <div className="flex items-center text-gray-600">
                  <span className="text-xs font-semibold mr-2">Distrito:</span>
                  <span className="text-sm">{profileFull.distrito}</span>
                </div>
              )}
              {profileFull.fecha_nacimiento && (
                <div className="flex items-center text-gray-600">
                  <span className="text-xs font-semibold mr-2">Nacimiento:</span>
                  <span className="text-sm">{new Date(profileFull.fecha_nacimiento).toLocaleDateString()}</span>
                  {edad > 0 && (
                    <span className="ml-3 text-xs text-gray-500">({edad} años)</span>
                  )}
                </div>
              )}
              {profileFull.tipo_cliente === 'profesional' && profileFull.actividad && (
                <div className="flex items-center text-gray-600">
                  <span className="text-xs font-semibold mr-2">Actividad:</span>
                  <span className="text-sm">{profileFull.actividad}</span>
                </div>
              )}
              {profileFull.tipo_cliente === 'negocio' && profileFull.nombre_negocio && (
                <div className="flex items-center text-gray-600">
                  <span className="text-xs font-semibold mr-2">Negocio:</span>
                  <span className="text-sm">{profileFull.nombre_negocio}</span>
                </div>
              )}
              {profileFull.tipo_cliente === 'emprendimiento' && profileFull.idea_emprendimiento && (
                <div className="flex items-center text-gray-600">
                  <span className="text-xs font-semibold mr-2">Idea:</span>
                  <span className="text-sm">{profileFull.idea_emprendimiento}</span>
                </div>
              )}
            </div>
          </div>
          <div className="md:w-2/3 p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="form-label">Nombre completo</label>
                    <input type="text" id="nombre" name="nombre" value={form.nombre} onChange={handleInputChange} className="form-input" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input type="email" id="email" name="email" value={form.email} onChange={handleInputChange} className="form-input" required />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input type="tel" id="telefono" name="telefono" value={form.telefono} onChange={handleInputChange} className="form-input" required />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input type="text" id="direccion" name="direccion" value={form.direccion} onChange={handleInputChange} className="form-input" />
                  </div>
                  <div>
                    <label htmlFor="fecha_nacimiento" className="form-label">Fecha de nacimiento</label>
                    <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleInputChange} className="form-input" required />
                  </div>
                  <div>
                    <label htmlFor="tipo_cliente" className="form-label">Tipo de cliente</label>
                    <select id="tipo_cliente" name="tipo_cliente" value={form.tipo_cliente} onChange={handleInputChange} className="form-input" required>
                      <option value="">Selecciona...</option>
                      <option value="profesional">Profesional</option>
                      <option value="negocio">Negocio</option>
                      <option value="emprendimiento">Emprendimiento</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="region" className="form-label">Región</label>
                    <select id="region" name="region" value={form.region} onChange={handleInputChange} className="form-input" required>
                      <option value="">Selecciona...</option>
                      {regiones.map((region: string) => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="provincia" className="form-label">Provincia</label>
                    <select id="provincia" name="provincia" value={form.provincia} onChange={handleInputChange} className="form-input" required disabled={!form.region}>
                      <option value="">Selecciona...</option>
                      {provincias.map((provincia: any, index: number) => (
                        <option key={index} value={provincia.provincia || provincia}>{provincia.provincia || provincia}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="distrito" className="form-label">Distrito</label>
                    <select id="distrito" name="distrito" value={form.distrito} onChange={handleInputChange} className="form-input" required disabled={!form.provincia}>
                      <option value="">Selecciona...</option>
                      {distritos.map((distrito: any, index: number) => (
                        <option key={index} value={distrito.distrito || distrito}>{distrito.distrito || distrito}</option>
                      ))}
                    </select>
                  </div>
                  {/* Dinámica según tipo_cliente */}
                  {form.tipo_cliente === 'profesional' && (
                    <div className="md:col-span-2">
                      <label className="form-label">Actividad profesional</label>
                      <input type="text" name="actividad" value={form.actividad} onChange={handleInputChange} className="form-input" required />
                    </div>
                  )}
                  {form.tipo_cliente === 'negocio' && (
                    <div className="md:col-span-2">
                      <label className="form-label">Nombre del negocio</label>
                      <input type="text" name="nombre_negocio" value={form.nombre_negocio} onChange={handleInputChange} className="form-input" required />
                    </div>
                  )}
                  {form.tipo_cliente === 'emprendimiento' && (
                    <div className="md:col-span-2">
                      <label className="form-label">Idea de emprendimiento</label>
                      <input type="text" name="idea_emprendimiento" value={form.idea_emprendimiento} onChange={handleInputChange as any} className="form-input" required />
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <button type="button" onClick={() => setShowPasswordForm(!showPasswordForm)} className="text-secondary hover:underline text-sm font-medium">
                    Cambiar contraseña
                  </button>
                  <button type="submit" className="btn btn-primary flex items-center gap-2">
                    <Save size={18} />
                    Guardar cambios
                  </button>
                </div>
                {showPasswordForm && (
                  <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h3 className="text-lg font-medium mb-4">Cambiar contraseña</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="current" className="form-label">Contraseña actual</label>
                        <input type="password" id="current" name="current" value={passwordForm.current} onChange={handlePasswordChange} className="form-input" required />
                      </div>
                      <div>
                        <label htmlFor="new" className="form-label">Nueva contraseña</label>
                        <input type="password" id="new" name="new" value={passwordForm.new} onChange={handlePasswordChange} className="form-input" required />
                      </div>
                      <div>
                        <label htmlFor="confirm" className="form-label">Confirmar contraseña</label>
                        <input type="password" id="confirm" name="confirm" value={passwordForm.confirm} onChange={handlePasswordChange} className="form-input" required />
                      </div>
                      <button type="button" onClick={handlePasswordSubmit} className="btn btn-secondary w-full">
                        Actualizar contraseña
                      </button>
                    </div>
                  </div>
                )}
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Información personal</h3>
                  <p className="text-gray-600">
                    Administra tu información personal y cómo quieres recibir comunicaciones de nosotros.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Preferencias de comunicación</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="emailNotif" 
                        className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                        defaultChecked 
                      />
                      <label htmlFor="emailNotif" className="ml-2 text-sm text-gray-700">
                        Recibir notificaciones por correo electrónico
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="smsNotif" 
                        className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                        defaultChecked 
                      />
                      <label htmlFor="smsNotif" className="ml-2 text-sm text-gray-700">
                        Recibir notificaciones SMS
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="promoNotif" 
                        className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                      />
                      <label htmlFor="promoNotif" className="ml-2 text-sm text-gray-700">
                        Recibir ofertas y promociones
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Seguridad de la cuenta</h3>
                  <button 
                    onClick={() => {
                      setIsEditing(true);
                      setShowPasswordForm(true);
                    }} 
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    Cambiar contraseña
                  </button>
                </div>
              </div>
            )}
            {!isEditing && (
              <button
                onClick={handleLogout}
                className="mt-6 w-full bg-red-100 text-red-700 py-2 rounded-lg font-semibold hover:bg-red-200 transition relative"
                disabled={loggingOut}
              >
                {loggingOut ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-red-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                    Cerrando sesión...
                  </span>
                ) : (
                  'Cerrar sesión'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;