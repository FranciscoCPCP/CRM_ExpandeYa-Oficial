// Mock data for the CRM client portal

// User profile
export const userProfile = {
  id: 1,
  name: "María González",
  email: "maria.gonzalez@example.com",
  phone: "+52 555 123 4567",
  address: "Av. Insurgentes Sur 1234, Col. Del Valle, CDMX",
  profilePicture: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=256"
};

// Services catalog
export const serviciosPrincipales = [
  { 
    id: 1, 
    nombre: "Landing Page (Código, WP, DIVI)", 
    descripcion: "Sitios web profesionales con diseño atractivo y optimizado para convertir visitantes en clientes. Incluye instalación de WordPress, tema DIVI y configuración básica.", 
    precio: 300,
    icon: "Layout"
  },
  { 
    id: 2, 
    nombre: "Marketing Digital", 
    descripcion: "Estrategias completas de marketing digital incluyendo SEO, SEM, redes sociales y email marketing para incrementar la visibilidad de tu negocio.", 
    precio: 500,
    icon: "TrendingUp"
  },
  { 
    id: 3, 
    nombre: "Tiendas en línea (pasarelas de pago)", 
    descripcion: "Implementación de tiendas virtuales con WooCommerce o Shopify, incluyendo configuración de métodos de pago, envío e inventario.", 
    precio: 800,
    icon: "ShoppingCart"
  },
  { 
    id: 4, 
    nombre: "Sistemas personalizados", 
    descripcion: "Desarrollo de aplicaciones web y sistemas a medida según las necesidades específicas de tu negocio. Incluye análisis, diseño e implementación.", 
    precio: 1200,
    icon: "Code2"
  }
];

export const serviciosSecundarios = [
  { 
    id: 5, 
    nombre: "Diseño gráfico", 
    descripcion: "Diseño de logotipos, tarjetas de presentación, folletos y material gráfico corporativo con identidad visual consistente.", 
    precio: 150,
    icon: "Palette" 
  },
  { 
    id: 6, 
    nombre: "Animación 2D y modelado 3D", 
    descripcion: "Creación de animaciones 2D y modelos 3D para presentaciones, publicidad y contenido digital. Cobro por segundo de animación.", 
    precio: null,
    icon: "Video" 
  },
  { 
    id: 7, 
    nombre: "Fotografías", 
    descripcion: "Sesiones fotográficas profesionales para productos, equipo, instalaciones o eventos corporativos.", 
    precio: 200,
    icon: "Camera" 
  },
  { 
    id: 8, 
    nombre: "Producción audiovisual", 
    descripcion: "Producción de videos corporativos, spots publicitarios y material audiovisual de alta calidad. Cobro por segundo.", 
    precio: null,
    icon: "Film" 
  },
  { 
    id: 9, 
    nombre: "Generación de chatbot", 
    descripcion: "Implementación de asistentes virtuales y chatbots para atención al cliente y automatización de respuestas.", 
    precio: 350,
    icon: "MessageCircle" 
  },
  { 
    id: 10, 
    nombre: "Mantenimiento", 
    descripcion: "Servicio de mantenimiento y actualización para sitios web y aplicaciones después de 6 meses a 1 año.", 
    precio: 100,
    icon: "Wrench" 
  },
  { 
    id: 11, 
    nombre: "Migración de sitios web", 
    descripcion: "Migración de sitios web existentes a nuevas plataformas o servidores con mínimo tiempo de inactividad.", 
    precio: 250,
    icon: "MoveRight" 
  }
];

// Paquetes
export const paquetesCombo = [
  {
    id: 1,
    nombre: "Combo Emprende Ya",
    descripcion: "Paquete ideal para emprendedores que quieren establecer presencia en línea",
    servicios: [
      { nombre: "Landing Page en WordPress con DIVI", monto: 300 },
      { nombre: "Diseño de logo y tarjeta de presentación", monto: 200 },
      { nombre: "Dominio y hosting por 1 año", monto: 100 },
      { nombre: "Asesoría básica en Meta Ads y SEO", monto: 150 },
      { nombre: "Garantía de soporte por 6 meses", monto: 50 }
    ],
    total: 800,
    estado: "Activo",
    fechaInicio: "2025-01-15",
    fechaFin: "2026-01-15"
  },
  {
    id: 2,
    nombre: "Combo Tienda Ya",
    descripcion: "Solución completa para vender tus productos en línea",
    servicios: [
      { nombre: "Tienda online con WooCommerce", monto: 800 },
      { nombre: "Configuración de pasarela de pagos", monto: 150 },
      { nombre: "Carga inicial de 20 productos", monto: 200 },
      { nombre: "Capacitación de administración", monto: 150 },
      { nombre: "Optimización SEO básica", monto: 100 }
    ],
    total: 1400,
    estado: "Pendiente",
    fechaInicio: "2025-06-01",
    fechaFin: "2026-06-01"
  },
  {
    id: 3,
    nombre: "Combo Digital Pro",
    descripcion: "Marketing digital completo para maximizar tu presencia online",
    servicios: [
      { nombre: "Gestión de redes sociales (3 meses)", monto: 600 },
      { nombre: "Campaña Google Ads", monto: 400 },
      { nombre: "Campaña Meta Ads", monto: 350 },
      { nombre: "Optimización SEO avanzada", monto: 450 },
      { nombre: "Informes mensuales de rendimiento", monto: 200 }
    ],
    total: 2000,
    estado: "Terminado",
    fechaInicio: "2024-10-01",
    fechaFin: "2025-01-01"
  },
  {
    id: 4,
    nombre: "Combo Creativo 360°",
    descripcion: "Identidad visual completa para tu marca",
    servicios: [
      { nombre: "Diseño de logo y manual de marca", monto: 500 },
      { nombre: "Diseño de papelería corporativa", monto: 300 },
      { nombre: "Diseño de redes sociales", monto: 250 },
      { nombre: "Sesión fotográfica de producto", monto: 350 },
      { nombre: "Video promocional (30 segundos)", monto: 600 }
    ],
    total: 2000,
    estado: "Activo",
    fechaInicio: "2025-03-15",
    fechaFin: "2025-06-15"
  },
  {
    id: 5,
    nombre: "Combo Web PRO a Medida",
    descripcion: "Sistema web personalizado para necesidades específicas",
    servicios: [
      { nombre: "Análisis y diseño de sistema", monto: 800 },
      { nombre: "Desarrollo frontend a medida", monto: 1200 },
      { nombre: "Desarrollo backend y API", monto: 1500 },
      { nombre: "Integración con sistemas existentes", monto: 600 },
      { nombre: "Capacitación y documentación", monto: 400 }
    ],
    total: 4500,
    estado: "Pendiente",
    fechaInicio: "2025-07-01",
    fechaFin: "2025-12-31"
  }
];

// Tickets
export const ticketsSimulados = [
  { 
    id: 101, 
    asunto: "Problema con acceso al panel de administración", 
    fecha: "2025-05-10", 
    estado: "Abierto",
    mensajes: [
      {
        autor: "cliente",
        fecha: "2025-05-10 14:32",
        contenido: "No puedo acceder al panel de administración de mi WordPress. Me sale error 500."
      },
      {
        autor: "soporte",
        fecha: "2025-05-10 15:45",
        contenido: "Hola María, vamos a revisar el problema. ¿Podrías decirnos cuándo comenzó a ocurrir y si realizaste algún cambio recientemente?"
      },
      {
        autor: "cliente",
        fecha: "2025-05-10 16:20",
        contenido: "Comenzó ayer después de instalar un nuevo plugin de SEO."
      }
    ]
  },
  { 
    id: 102, 
    asunto: "Consulta sobre paquete Tienda Ya", 
    fecha: "2025-05-12", 
    estado: "Cerrado",
    mensajes: [
      {
        autor: "cliente",
        fecha: "2025-05-12 09:15",
        contenido: "Quería saber si el paquete Tienda Ya incluye la configuración de múltiples métodos de pago o solo uno."
      },
      {
        autor: "soporte",
        fecha: "2025-05-12 10:30",
        contenido: "Buenos días María. El paquete incluye la configuración de hasta 3 métodos de pago distintos (tarjetas, PayPal, transferencia, etc.). Si necesitas más, podemos cotizarlo adicionalmente."
      },
      {
        autor: "cliente",
        fecha: "2025-05-12 11:05",
        contenido: "Perfecto, con eso es suficiente. Gracias por la aclaración."
      },
      {
        autor: "soporte",
        fecha: "2025-05-12 11:10",
        contenido: "Excelente, estamos a tus órdenes. Si tienes cualquier otra duda, no dudes en contactarnos."
      }
    ]
  },
  { 
    id: 103, 
    asunto: "Solicitud de cambio en logotipo", 
    fecha: "2025-05-15", 
    estado: "En Proceso",
    mensajes: [
      {
        autor: "cliente",
        fecha: "2025-05-15 13:45",
        contenido: "Necesito realizar un pequeño ajuste en el logotipo. El color naranja debería ser un poco más oscuro."
      },
      {
        autor: "soporte",
        fecha: "2025-05-15 14:30",
        contenido: "Hola María. Entendido, nuestro diseñador ya está trabajando en el ajuste. Te enviaremos una propuesta en las próximas 24 horas."
      }
    ]
  },
  { 
    id: 104, 
    asunto: "Error en pasarela de pagos", 
    fecha: "2025-05-18", 
    estado: "Abierto",
    mensajes: [
      {
        autor: "cliente",
        fecha: "2025-05-18 16:20",
        contenido: "Los clientes reportan que al intentar pagar con tarjeta aparece un error. Necesito solución urgente."
      }
    ]
  }
];

// Movimientos y pagos
export const movimientosSimulados = [
  { 
    id: 201, 
    fecha: "2025-04-20", 
    concepto: "Pago Combo Emprende Ya", 
    monto: 800, 
    metodo: "Tarjeta", 
    estado: "Pagado",
    factura: "FAC-2025-0123"
  },
  { 
    id: 202, 
    fecha: "2025-05-01", 
    concepto: "Pago Landing Page", 
    monto: 300, 
    metodo: "PayPal", 
    estado: "Pendiente",
    factura: "FAC-2025-0145"
  },
  { 
    id: 203, 
    fecha: "2025-05-10", 
    concepto: "Pago Sesión Fotográfica", 
    monto: 250, 
    metodo: "Transferencia", 
    estado: "Pagado",
    factura: "FAC-2025-0156"
  },
  { 
    id: 204, 
    fecha: "2025-05-15", 
    concepto: "Anticipo Combo Digital Pro", 
    monto: 1000, 
    metodo: "Tarjeta", 
    estado: "Pagado",
    factura: "FAC-2025-0178"
  },
  { 
    id: 205, 
    fecha: "2025-05-25", 
    concepto: "Segundo pago Combo Digital Pro", 
    monto: 1000, 
    metodo: "Tarjeta", 
    estado: "Pendiente",
    factura: "FAC-2025-0189"
  }
];

// Citas
export const citasSimuladas = [
  {
    id: 301,
    fecha: "2025-05-25",
    hora: "10:00",
    servicio: "Marketing Digital",
    estado: "Confirmada",
    notas: "Revisión de estrategia de redes sociales"
  },
  {
    id: 302,
    fecha: "2025-06-05",
    hora: "16:30",
    servicio: "Diseño gráfico",
    estado: "Pendiente",
    notas: "Presentación de propuestas de logo"
  },
  {
    id: 303,
    fecha: "2025-05-20",
    hora: "11:00",
    servicio: "Sistemas personalizados",
    estado: "Cancelada",
    notas: "Definición de requerimientos"
  }
];

// Mensajes del chatbot
export const mensajesChatbotPredefinidos = [
  "Hola, soy el asistente virtual del CRM. ¿En qué puedo ayudarte hoy?",
  "Puedo ayudarte con información sobre nuestros servicios y paquetes.",
  "Para problemas técnicos, te recomiendo abrir un ticket de soporte.",
  "Los tiempos de respuesta para tickets son de 24 horas hábiles.",
  "¿Necesitas más información sobre algún servicio específico?",
  "Recuerda que puedes agendar una cita con nuestros especialistas desde la sección 'Reserva de Citas'.",
  "¿Hay algo más en lo que pueda ayudarte?",
  "Si tienes un problema urgente, puedes llamarnos al 555-123-4567.",
  "Entiendo. Un asesor revisará tu solicitud y te contactará pronto."
];