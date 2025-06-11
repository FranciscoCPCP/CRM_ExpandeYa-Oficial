import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

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
          const userWithRol = {
            ...u,
            rol: u.rol || u.role || '',
          };
          if (userWithRol.rol === 'cliente') {
            if (t) localStorage.setItem('token', t);
            if (u) localStorage.setItem('user', JSON.stringify(userWithRol));
            window.location.href = 'http://localhost:5174';
            return null; // Evita renderizar mensaje de error
          }
          setToken(t);
          setUser(userWithRol);
          if (t) localStorage.setItem('token', t);
          if (u) localStorage.setItem('user', JSON.stringify(userWithRol));
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
  // Si el usuario no tiene rol válido, mostrar mensaje o redirigir
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-red-600 font-bold gap-4">
      <span>Usuario sin rol válido</span>
      <button
        className="bg-primary-orange text-white px-4 py-2 rounded hover:bg-primary-orange/90 transition-colors shadow"
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.reload();
        }}
      >
        Volver al Login
      </button>
    </div>
  );
}

export default App;