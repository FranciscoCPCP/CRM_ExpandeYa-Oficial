// Utilidad para obtener la URL base de los microservicios
export const API_URLS = {
  admins: 'http://192.168.10.19:8002/api/administrador', // AdminService
  clientes: 'http://192.168.10.19:8001/api/clientes',    // ClienteService
  ubigeo: 'http://192.168.10.19:8001/api/ubigeo',        // ClienteService - Ubigeo
  usuarios: 'http://192.168.10.19:8000/api/usuarios',   // AuthService - Usuarios
  servicios: 'http://192.168.10.19:8003/api/servicios',
};
