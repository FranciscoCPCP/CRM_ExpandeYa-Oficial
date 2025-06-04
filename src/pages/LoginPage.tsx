import React, { useState } from 'react';

const LoginPage: React.FC<{ onLoginSuccess: (token: string, user: any) => void; onGoToRegister: () => void; onGoToForgot: () => void }> = ({ onLoginSuccess, onGoToRegister, onGoToForgot }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://192.168.10.19:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        onLoginSuccess(data.access_token, data.user);
      } else {
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Líneas diagonales decorativas */}
      <div className="absolute -top-32 -left-32 w-[150%] h-[150%] pointer-events-none z-0">
        <div style={{transform: 'rotate(-30deg)'}} className="absolute left-0 top-1/4 w-full h-8 bg-[#2e318f] opacity-90" />
        <div style={{transform: 'rotate(-30deg)'}} className="absolute left-0 top-1/2 w-full h-8 bg-[#fa6b1b] opacity-90" />
        <div style={{transform: 'rotate(-30deg)'}} className="absolute left-0 top-3/4 w-full h-8 bg-[#2e318f] opacity-90" />
      </div>
      <form 
        onSubmit={handleSubmit} 
        className="relative z-10 bg-gradient-to-b from-[#2e318f] to-[#fa6b1b] shadow-xl rounded-2xl p-10 w-full max-w-lg flex flex-col gap-6 animate-login-fadein"
      >
        <h2 className="text-3xl font-bold mb-2 text-center text-white">Iniciar Sesión</h2>
        <div>
          <label className="block text-white font-semibold mb-2 text-lg">Correo Electrónico</label>
          <input
            type="email"
            className="w-full px-6 py-3 rounded-xl border-none outline-none text-[#1e1e1e] bg-white placeholder-gray-400 text-base"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2 text-lg">Contraseña</label>
          <input
            type="password"
            className="w-full px-6 py-3 rounded-xl border-none outline-none text-[#1e1e1e] bg-white placeholder-gray-400 text-base"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Puedes agregar aquí el checkbox de Remember Me si lo necesitas */}
        {error && <div className="mb-2 text-[#fff] bg-[#fa6b1b] rounded text-center py-2">{error}</div>}
        <button
          type="submit"
          className="w-full bg-[#2e318f] text-white py-3 rounded-full font-bold text-xl border-2 border-white hover:bg-[#1e1e1e] transition"
          disabled={loading}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
        <hr className="border-t-2 border-[#2e318f] my-2" />
        <div className="text-center text-white">
          ¿Olvidaste tu contraseña?
        </div>
        <div className="text-center mt-2">
          <a href="#" className="text-[#FFFFFF] font-bold underline" onClick={e => { e.preventDefault(); onGoToRegister(); }}>
            Aun no eres miembro? Crear una cuenta
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
