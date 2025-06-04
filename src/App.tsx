import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminCreatePage from './pages/AdminCreatePage';
import ClienteHeader from './components/ClienteHeader';
import ClientePanel from './pages/ClientePanel';
import ClienteMainLayout from './layouts/ClienteMainLayout';

// Paneles de ejemplo (puedes reemplazar por componentes reales luego)
const ClientePanelPlaceholder = ({ user, onLogout }: { user: any; onLogout: () => void }) => {
  // Editar perfil (placeholder)
  const handleEditProfile = () => {
    alert('Funcionalidad de editar perfil próximamente.');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center">
      <ClienteHeader user={user} onLogout={onLogout} onEditProfile={handleEditProfile} />
      <div className="pt-20 w-full flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-4 text-indigo-700">Bienvenido, {user.name} (Cliente)</h1>
          <ul className="list-disc ml-6 mb-4 text-gray-700">
            <li className="mb-2">Editar perfil</li>
            <li className="mb-2">Crear paquetes (combinar servicios)</li>
            <li className="mb-2">Chatbot</li>
            <li className="mb-2">Ver y usar tickets de soporte</li>
            <li className="mb-2">Ver reportes y pagos</li>
            <li className="mb-2">Acceso a servicios contratados</li>
          </ul>
          <div className="flex gap-4 mt-6">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">Ir a mi perfil</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Ver mis tickets</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Servicios</button>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  // Leer token y user desde localStorage al iniciar la app
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [user, setUser] = useState<any>(() => {
    const u = localStorage.getItem('user');
    if (!u) return null;
    try {
      const parsed = JSON.parse(u);
      return { ...parsed, rol: parsed.rol || parsed.role || '' };
    } catch {
      return null;
    }
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  if (!token) {
    if (showForgot) {
      return <ForgotPasswordPage onBack={() => setShowForgot(false)} />;
    }
    if (showRegister) {
      return (
        <RegisterPage
          onRegisterSuccess={() => setShowRegister(false)}
          onGoToLogin={() => setShowRegister(false)}
        />
      );
    }
    return (
      <LoginPage
        onLoginSuccess={(t, u) => {
          setToken(t);
          // Normalizar el campo rol para evitar problemas de redirección
          const userWithRol = {
            ...u,
            rol: u.rol || u.role || '',
          };
          setUser(userWithRol);
          if (t) {
            localStorage.setItem('token', t);
          }
          if (u) {
            localStorage.setItem('user', JSON.stringify(userWithRol));
          }
        }}
        onGoToRegister={() => setShowRegister(true)}
        onGoToForgot={() => setShowForgot(true)}
      />
    );
  }

  // Redirección según rol
  if (user && (user.rol === 'admin' || user.rol === 'superadmin')) {
    return <MainLayout />;
  }
  if (user && user.rol === 'cliente') {
    return <ClienteMainLayout user={user} onLogout={() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    }} />;
  }
  // Si el usuario no tiene rol válido, mostrar mensaje o redirigir
  return <div className="flex items-center justify-center min-h-screen text-red-600 font-bold">Usuario sin rol válido</div>;
}

export default App;