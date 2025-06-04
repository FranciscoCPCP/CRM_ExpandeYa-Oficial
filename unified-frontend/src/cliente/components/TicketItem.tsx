import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

interface Mensaje {
  autor: string;
  fecha: string;
  contenido: string;
}

interface TicketItemProps {
  id: number;
  asunto: string;
  fecha: string;
  estado: string;
  mensajes: Mensaje[];
}

const TicketItem: React.FC<TicketItemProps> = ({
  id,
  asunto,
  fecha,
  estado,
  mensajes,
}) => {
  const [showMessages, setShowMessages] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Abierto':
        return 'bg-green-100 text-green-800';
      case 'En Proceso':
        return 'bg-blue-100 text-blue-800';
      case 'Cerrado':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-MX', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Aquí iría la lógica para enviar el mensaje al backend
    console.log('Mensaje enviado:', newMessage);
    
    // Limpiamos el input
    setNewMessage('');
    
    // Simulamos que el mensaje se agregó
    alert('Mensaje enviado correctamente');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
        onClick={() => setShowMessages(!showMessages)}
      >
        <div className="flex items-center">
          <div className="mr-4">
            <span className="text-secondary font-semibold">#{id}</span>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800">{asunto}</h3>
            <p className="text-sm text-gray-500">
              Creado el {formatDate(fecha)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(estado)}`}>
            {estado}
          </span>
          
          <button className="btn-secondary px-3 py-1.5 text-sm rounded flex items-center gap-1">
            <MessageSquare size={16} />
            <span>Ver / Responder</span>
          </button>
        </div>
      </div>
      
      {showMessages && (
        <div className="border-t border-gray-200">
          <div className="max-h-80 overflow-y-auto p-4 space-y-4">
            {mensajes.map((mensaje, idx) => (
              <div 
                key={idx} 
                className={`flex ${mensaje.autor === 'cliente' ? 'justify-end' : ''}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    mensaje.autor === 'cliente' 
                      ? 'bg-primary/10 text-gray-800' 
                      : 'bg-secondary/10 text-gray-800'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">
                      {mensaje.autor === 'cliente' ? 'Tú' : 'Soporte'}
                    </span>
                    <span className="text-xs text-gray-500">{mensaje.fecha}</span>
                  </div>
                  <p className="text-sm">{mensaje.contenido}</p>
                </div>
              </div>
            ))}
          </div>
          
          {estado !== 'Cerrado' && (
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  className="form-input flex-1"
                />
                <button 
                  type="submit"
                  className="btn btn-primary"
                  disabled={!newMessage.trim()}
                >
                  Enviar
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketItem;