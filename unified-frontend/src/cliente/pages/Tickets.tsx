import React, { useState } from 'react';
import { Plus, TicketCheck, Filter } from 'lucide-react';
import TicketItem from '../components/TicketItem';
import { ticketsSimulados } from '../services/mockData';

const Tickets: React.FC = () => {
  const [filtro, setFiltro] = useState('Todos');
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [newTicket, setNewTicket] = useState({
    asunto: '',
    descripcion: ''
  });
  
  // Filtrar tickets según el estado seleccionado
  const ticketsFiltrados = filtro === 'Todos'
    ? ticketsSimulados
    : ticketsSimulados.filter(ticket => ticket.estado === filtro);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTicket(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aquí iría la lógica para enviar el ticket al backend
    console.log('Nuevo ticket:', newTicket);
    
    // Limpiamos el formulario
    setNewTicket({
      asunto: '',
      descripcion: ''
    });
    
    setShowNewTicketForm(false);
    
    // Simulamos que el ticket se creó
    alert('Ticket creado correctamente');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Mis Tickets</h1>
          <p className="text-gray-600">
            Gestiona tus solicitudes de soporte y consultas.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <Filter size={16} className="text-gray-500 mr-2" />
              <select 
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="appearance-none bg-transparent pr-8 focus:outline-none text-gray-700"
              >
                <option value="Todos">Todos</option>
                <option value="Abierto">Abiertos</option>
                <option value="En Proceso">En proceso</option>
                <option value="Cerrado">Cerrados</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          
          <button 
            className="btn btn-primary flex items-center gap-2"
            onClick={() => setShowNewTicketForm(!showNewTicketForm)}
          >
            <Plus size={18} />
            Nuevo Ticket
          </button>
        </div>
      </div>
      
      {showNewTicketForm && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Crear nuevo ticket</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="asunto" className="form-label">Asunto</label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                value={newTicket.asunto}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Ej: Problema con acceso al panel"
                required
              />
            </div>
            
            <div>
              <label htmlFor="descripcion" className="form-label">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={newTicket.descripcion}
                onChange={handleInputChange}
                className="form-input h-32 resize-none"
                placeholder="Describe detalladamente tu consulta o problema..."
                required
              ></textarea>
            </div>
            
            <div className="flex justify-end gap-3">
              <button 
                type="button" 
                className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
                onClick={() => setShowNewTicketForm(false)}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Enviar ticket
              </button>
            </div>
          </form>
        </div>
      )}
      
      {ticketsFiltrados.length > 0 ? (
        <div className="space-y-4">
          {ticketsFiltrados.map((ticket) => (
            <TicketItem
              key={ticket.id}
              id={ticket.id}
              asunto={ticket.asunto}
              fecha={ticket.fecha}
              estado={ticket.estado}
              mensajes={ticket.mensajes}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TicketCheck size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No hay tickets {filtro !== 'Todos' ? filtro.toLowerCase() + 's' : ''}</h3>
          <p className="text-gray-500 mb-6">
            {filtro === 'Todos' 
              ? 'No tienes tickets de soporte en este momento.' 
              : `No tienes tickets ${filtro.toLowerCase()}s en este momento.`}
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowNewTicketForm(true)}
          >
            Crear nuevo ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default Tickets;