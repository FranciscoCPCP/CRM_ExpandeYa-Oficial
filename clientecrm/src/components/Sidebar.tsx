import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, ShoppingBag, Package, TicketCheck, 
  CreditCard, Calendar, MessageCircle, X 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const sidebarLinks = [
    { name: 'Perfil', path: '/perfil', icon: <User size={20} /> },
    { name: 'Catálogo de Servicios', path: '/servicios', icon: <ShoppingBag size={20} /> },
    { name: 'Paquetes Inscritos', path: '/paquetes', icon: <Package size={20} /> },
    { name: 'Tickets', path: '/tickets', icon: <TicketCheck size={20} /> },
    { name: 'Movimientos y Pagos', path: '/movimientos', icon: <CreditCard size={20} /> },
    { name: 'Reserva de Citas', path: '/citas', icon: <Calendar size={20} /> },
    { name: 'Chatbot', path: '/chatbot', icon: <MessageCircle size={20} /> },
  ];
  
  const sidebarClasses = `
    bg-secondary h-screen w-64 fixed left-0 top-0 z-20 shadow-lg pt-14 transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0
  `;
  
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      <aside className={sidebarClasses}>
        <button 
          className="absolute top-3 right-3 text-white md:hidden p-1 hover:bg-secondary-light rounded-full"
          onClick={toggleSidebar}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
        
        <nav className="mt-6 px-3">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => {
              const isActive = currentPath === link.path;
              const linkClasses = isActive 
                ? 'sidebar-link sidebar-link-active' 
                : 'sidebar-link sidebar-link-inactive';
                
              return (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className={linkClasses}
                    onClick={() => window.innerWidth < 768 && toggleSidebar()}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <div className="bg-white/10 rounded-lg p-4 text-white text-sm">
            <p className="font-medium mb-2">¿Necesitas ayuda?</p>
            <p className="opacity-80 text-xs mb-3">
              Nuestro equipo está disponible 24/7 para resolver tus dudas.
            </p>
            <button className="bg-white text-secondary w-full py-2 rounded-md font-medium text-sm hover:bg-white/90 transition-colors">
              Contactar soporte
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;