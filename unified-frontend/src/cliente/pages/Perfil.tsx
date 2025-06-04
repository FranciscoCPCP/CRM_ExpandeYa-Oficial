import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Save } from 'lucide-react';
import { userProfile } from '../services/mockData';

const Perfil: React.FC = () => {
  const [profile, setProfile] = useState(userProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar cambios en el backend
    setIsEditing(false);
    
    // Simulamos una notificación de éxito
    alert('Perfil actualizado correctamente');
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación simple
    if (passwordForm.new !== passwordForm.confirm) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    if (passwordForm.new.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    // Aquí iría la lógica para cambiar la contraseña
    setPasswordForm({
      current: '',
      new: '',
      confirm: ''
    });
    
    setShowPasswordForm(false);
    
    // Simulamos una notificación de éxito
    alert('Contraseña actualizada correctamente');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Mi Perfil</h1>
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className={`btn ${isEditing ? 'bg-gray-500 hover:bg-gray-600' : 'btn-secondary'} text-white`}
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
                  src={profile.profilePicture} 
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
            <h2 className="mt-4 text-xl font-semibold text-gray-800">{profile.name}</h2>
            <p className="text-gray-500 text-sm">Cliente desde 2024</p>
            
            {!isEditing && (
              <div className="mt-6 w-full space-y-3">
                <div className="flex items-center text-gray-600">
                  <Mail size={16} className="mr-2" />
                  <span className="text-sm">{profile.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone size={16} className="mr-2" />
                  <span className="text-sm">{profile.phone}</span>
                </div>
                <div className="flex items-start text-gray-600">
                  <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                  <span className="text-sm">{profile.address}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="md:w-2/3 p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="form-label">Nombre completo</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="form-label">Teléfono</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="form-label">Dirección</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={profile.address}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <button 
                    type="button"
                    onClick={() => setShowPasswordForm(!showPasswordForm)} 
                    className="text-secondary hover:underline text-sm font-medium"
                  >
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
                        <input
                          type="password"
                          id="current"
                          name="current"
                          value={passwordForm.current}
                          onChange={handlePasswordChange}
                          className="form-input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="new" className="form-label">Nueva contraseña</label>
                        <input
                          type="password"
                          id="new"
                          name="new"
                          value={passwordForm.new}
                          onChange={handlePasswordChange}
                          className="form-input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirm" className="form-label">Confirmar contraseña</label>
                        <input
                          type="password"
                          id="confirm"
                          name="confirm"
                          value={passwordForm.confirm}
                          onChange={handlePasswordChange}
                          className="form-input"
                          required
                        />
                      </div>
                      
                      <button 
                        type="button"
                        onClick={handlePasswordSubmit}
                        className="btn btn-secondary w-full"
                      >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;