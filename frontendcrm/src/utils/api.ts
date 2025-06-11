// Utilidad para obtener la URL base de los microservicios
export const API_URLS = {
  admins: 'http://localhost:8002/api/administrador', // AdminService
  clientes: 'http://localhost:8001/api/clientes',    // ClienteService
  ubigeo: 'http://localhost:8001/api/ubigeo',        // ClienteService - Ubigeo
  usuarios: 'http://localhost:8000/api/usuarios',   // AuthService - Usuarios
  servicios: 'http://localhost:8003/api/servicios',
};
