import React from 'react';
import { 
  Calendar, 
  Users, 
  Package, 
  CreditCard, 
  TicketCheck, 
  MessageSquare, 
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  // Navigation items with their icons and labels
  const navItems = [
    { id: 'citas', label: 'Citas', icon: <Calendar /> },
    { id: 'admins', label: 'Administradores', icon: <Users /> },
    { id: 'clientes', label: 'Clientes', icon: <Users /> },
    { id: 'servicios', label: 'Servicios', icon: <Package /> },
    { id: 'proyectos', label: 'Proyectos', icon: <Package /> },
    { id: 'pagos', label: 'Pagos', icon: <CreditCard /> },
    { id: 'tickets', label: 'Tickets', icon: <TicketCheck /> },
    { id: 'chatbot', label: 'Chatbot', icon: <MessageSquare /> },
    { id: 'reportes', label: 'Reportes', icon: <BarChart3 /> },
  ];

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-48 bg-primary-blue p-3 overflow-y-auto">
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center px-4 py-2.5 rounded-full transition-colors text-left ${
              activeSection === item.id
                ? 'bg-primary-orange text-white'
                : 'bg-primary-blue-light text-white/80 hover:bg-primary-blue-light/80'
            }`}
            onClick={() => onSectionChange(item.id)}
          >
            <span className="mr-3 text-current">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;