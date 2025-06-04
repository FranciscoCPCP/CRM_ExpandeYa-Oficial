import React, { useState } from 'react';
import { API_URLS } from '../utils/api';

interface Props {
  onSuccess?: () => void;
  ubigeo: any[];
  ubigeoLoading?: boolean;
  ubigeoError?: string;
  cliente?: any;
  hidePasswordFields?: boolean; // Nuevo: para ocultar campos de contraseña
}

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
  password: '',
  password_confirmation: '',
};

const ClienteRegisterForm: React.FC<Props> = ({ onSuccess, ubigeo, ubigeoLoading, ubigeoError, cliente, hidePasswordFields }) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [touched, setTouched] = useState<{[k:string]:boolean}>({});

  React.useEffect(() => {
    if (cliente) {
      setForm({
        ...initialForm,
        ...cliente,
        password: '',
        password_confirmation: '',
      });
    } else {
      setForm(initialForm);
    }
  }, [cliente]);

  // Selectores dependientes
  const regiones = ubigeo.map((r: any) => r.region);
  const provincias = form.region
    ? (ubigeo.find((r: any) => r.region === form.region)?.provincias || [])
    : [];
  const distritos = form.region && form.provincia
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

  // Validaciones visuales
  const isValid = () => {
    if (!form.nombre || !form.email || !form.telefono || !form.fecha_nacimiento || !form.tipo_cliente || !form.region || !form.provincia || !form.distrito) return false;
    if (edad < 18) return false;
    if (form.tipo_cliente === 'profesional' && !form.actividad) return false;
    if (form.tipo_cliente === 'negocio' && !form.nombre_negocio) return false;
    if (form.tipo_cliente === 'emprendimiento' && !form.idea_emprendimiento) return false;
    if (!hidePasswordFields) {
      if (!form.password || !form.password_confirmation) return false;
      if (form.password !== form.password_confirmation) return false;
      if (form.password.length < 6) return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setTouched(t => ({ ...t, [name]: true }));
    // Limpiar selects dependientes
    if (name === 'region') setForm(f => ({ ...f, provincia: '', distrito: '' }));
    if (name === 'provincia') setForm(f => ({ ...f, distrito: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    if (!cliente && form.password !== form.password_confirmation) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }
    try {
      let res, data;
      if (cliente) {
        // Modo edición: PUT a ClienteService y PUT a AuthService
        const { password, password_confirmation, ...clientePayload } = form;
        res = await fetch(`http://192.168.10.19:8001/api/clientes/${cliente.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clientePayload)
        });
        data = await res.json();
        if (res.ok) {
          // Sincronizar con AuthService
          if (cliente.user_id) {
            const userPayload: any = {};
            if (form.nombre) userPayload.name = form.nombre;
            if (form.email) userPayload.email = form.email;
            if (form.telefono) userPayload.telefono = form.telefono;
            if (form.direccion) userPayload.direccion = form.direccion;
            await fetch(`http://192.168.10.19:8000/api/users/${cliente.user_id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userPayload)
            });
          }
          setSuccess('Cliente actualizado exitosamente.');
          if (onSuccess) onSuccess();
        } else {
          setError(data.error || data.message || 'Error al actualizar cliente');
        }
      } else {
        // Cambia la URL para registrar clientes a través de AuthService
        const payload = { ...form, rol: 'cliente' };
        const res = await fetch('http://192.168.10.19:8000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok) {
          setSuccess('Cliente registrado exitosamente.');
          setForm(initialForm);
          setTouched({});
          if (onSuccess) onSuccess();
        } else {
          setError(data.error || data.message || 'Error al registrar cliente');
        }
      }
    } catch (err) {
      setError('Error de red o servidor.');
    } finally {
      setLoading(false);
    }
  };

  // Render condicional de campos según tipo_cliente
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto bg-white p-6 rounded-xl shadow border border-[#2e318f]">
      <h2 className="text-xl font-bold mb-2 text-[#2e318f]">{cliente ? 'Editar Cliente' : 'Registrar Cliente'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#1e1e1e]">Nombre completo *</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#fa6b1b] focus:border-[#fa6b1b] text-[#1e1e1e]" required />
        </div>
        <div>
          <label className="block text-[#1e1e1e]">Email *</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#fa6b1b] focus:border-[#fa6b1b] text-[#1e1e1e]" required />
        </div>
        <div>
          <label className="block text-[#1e1e1e]">Teléfono *</label>
          <input type="text" name="telefono" value={form.telefono} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#fa6b1b] focus:border-[#fa6b1b] text-[#1e1e1e]" required />
        </div>
        <div>
          <label className="block text-[#1e1e1e]">Dirección <span className="text-gray-400">(opcional)</span></label>
          <input type="text" name="direccion" value={form.direccion} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#fa6b1b] focus:border-[#fa6b1b] text-[#1e1e1e]" />
          <span className="text-xs text-gray-400">Puedes dejar este campo vacío si no deseas registrar una dirección.</span>
        </div>
        <div>
          <label className="block text-[#1e1e1e]">Fecha de nacimiento *</label>
          <input type="date" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} className={`w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#fa6b1b] focus:border-[#fa6b1b] text-[#1e1e1e] ${touched.fecha_nacimiento && edad < 18 ? 'border-red-500' : ''}`} required />
          {touched.fecha_nacimiento && edad < 18 && <span className="text-xs text-red-500">Debes ser mayor de 18 años.</span>}
        </div>
        <div>
          <label className="block text-[#1e1e1e]">Tipo de cliente *</label>
          <select
            name="tipo_cliente"
            value={form.tipo_cliente}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#fa6b1b] focus:border-[#fa6b1b] text-[#1e1e1e]"
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="profesional">Profesional/Freelancer</option>
            <option value="negocio">Negocio/Empresa</option>
            <option value="emprendimiento">Emprendimiento</option>
          </select>
        </div>
        {/* Selectores dependientes */}
        <div>
          <label className="block text-[#1e1e1e]">Región *</label>
          <select name="region" value={form.region} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#fa6b1b] focus:border-[#fa6b1b] text-[#1e1e1e]" required>
            <option value="">Selecciona...</option>
            {ubigeoLoading ? (
              <option value="" disabled>Cargando regiones...</option>
            ) : ubigeoError ? (
              <option value="" disabled>{ubigeoError}</option>
            ) : (
              regiones && regiones.map((r: any) => <option key={r} value={r}>{r}</option>)
            )}
          </select>
        </div>
        <div>
          <label className="block text-[#1e1e1e]">Provincia *</label>
          <select name="provincia" value={form.provincia} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#fa6b1b] focus:border-[#fa6b1b] text-[#1e1e1e]" required disabled={!form.region}>
            <option value="">Selecciona...</option>
            {ubigeoLoading ? (
              <option value="" disabled>Cargando provincias...</option>
            ) : ubigeoError ? (
              <option value="" disabled>{ubigeoError}</option>
            ) : (
              provincias && Array.isArray(provincias) && provincias.map((p: any) => (
                typeof p === 'string'
                  ? <option key={p} value={p}>{p}</option>
                  : <option key={p.provincia} value={p.provincia}>{p.provincia}</option>
              ))
            )}
          </select>
        </div>
        <div>
          <label className="block text-[#1e1e1e]">Distrito *</label>
          <select name="distrito" value={form.distrito} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#fa6b1b] focus:border-[#fa6b1b] text-[#1e1e1e]" required disabled={!form.provincia}>
            <option value="">Selecciona...</option>
            {ubigeoLoading ? (
              <option value="" disabled>Cargando distritos...</option>
            ) : ubigeoError ? (
              <option value="" disabled>{ubigeoError}</option>
            ) : (
              distritos && Array.isArray(distritos) && distritos.map((d: any) => (
                typeof d === 'string'
                  ? <option key={d} value={d}>{d}</option>
                  : <option key={d.distrito} value={d.distrito}>{d.distrito}</option>
              ))
            )}
          </select>
        </div>
        {!hidePasswordFields && (
          <>
            <div>
              <label className="block text-[#1e1e1e]">Contraseña *</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#fa6b1b] focus:border-[#fa6b1b] text-[#1e1e1e]" required minLength={6} />
              <span className="text-xs text-gray-400">Mínimo 6 caracteres.</span>
            </div>
            <div>
              <label className="block text-[#1e1e1e]">Repetir contraseña *</label>
              <input type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} className={`w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#fa6b1b] focus:border-[#fa6b1b] text-[#1e1e1e] ${touched.password_confirmation && form.password !== form.password_confirmation ? 'border-red-500' : ''}`} required minLength={6} />
              {touched.password_confirmation && form.password !== form.password_confirmation && (
                <span className="text-xs text-red-500">Las contraseñas no coinciden.</span>
              )}
            </div>
          </>
        )}
        {/* Dinámica según tipo_cliente */}
        {form.tipo_cliente === 'profesional' && (
          <div className="md:col-span-2">
            <label className="block text-[#1e1e1e]">Actividad profesional/freelancer *</label>
            <input type="text" name="actividad" value={form.actividad} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#fa6b1b] focus:border-[#fa6b1b] text-[#1e1e1e]" required />
          </div>
        )}
        {form.tipo_cliente === 'negocio' && (
          <div className="md:col-span-2">
            <label className="block text-[#1e1e1e]">Nombre del negocio/empresa *</label>
            <input type="text" name="nombre_negocio" value={form.nombre_negocio} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#fa6b1b] focus:border-[#fa6b1b] text-[#1e1e1e]" required />
          </div>
        )}
        {form.tipo_cliente === 'emprendimiento' && (
          <div className="md:col-span-2">
            <label className="block text-[#1e1e1e]">Idea de emprendimiento *</label>
            <input type="text" name="idea_emprendimiento" value={form.idea_emprendimiento} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[#fa6b1b] focus:border-[#fa6b1b] text-[#1e1e1e]" required />
          </div>
        )}
      </div>
      {/* Mensajes de error y éxito */}
      {error && <div className="text-[#fa6b1b] text-sm text-center">{error}</div>}
      {success && <div className="text-green-600 text-sm text-center">{success}</div>}
      {!isValid() && touched && Object.keys(touched).length > 0 && !loading && !success && (
        <div className="text-[#fa6b1b] text-xs text-center">Debes completar todos los campos marcados con *.</div>
      )}
      <div className="flex justify-end gap-2">
        {cliente && (
          <button type="button" className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors shadow" onClick={() => { if (onSuccess) onSuccess(); }}>
            Cancelar
          </button>
        )}
        <button type="submit" className="bg-[#fa6b1b] text-white px-6 py-2 rounded-lg hover:bg-[#2e318f] transition-colors shadow font-bold" disabled={loading || !isValid()}>
          {loading ? (cliente ? 'Guardando...' : 'Registrando...') : (cliente ? 'Guardar cambios' : 'Registrar')}
        </button>
      </div>
    </form>
  );
};

export default ClienteRegisterForm;
