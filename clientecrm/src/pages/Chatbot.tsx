import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ChatMessage from '../components/ChatMessage';
import { mensajesChatbotPredefinidos } from '../services/mockData';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hola, soy el asistente virtual del CRM. ¿En qué puedo ayudarte hoy?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Añadir mensaje del usuario
    const userMessage: Message = {
      text: newMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simular respuesta del chatbot después de un breve retraso
    setTimeout(() => {
      // Elegir una respuesta aleatoria de las predefinidas
      const randomIndex = Math.floor(Math.random() * mensajesChatbotPredefinidos.length);
      const botResponse: Message = {
        text: mensajesChatbotPredefinidos[randomIndex],
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };
  
  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col">
      <div className="bg-white rounded-t-xl shadow-md p-4 border border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white mr-3">
            <span className="text-lg font-semibold">A</span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">Asistente Virtual</h2>
            <p className="text-xs text-green-600">En línea</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 bg-white border-l border-r border-gray-200 p-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg, idx) => (
            <ChatMessage
              key={idx}
              message={msg.text}
              isUser={msg.isUser}
              timestamp={msg.timestamp}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="bg-white rounded-b-xl shadow-md p-4 border border-t-0 border-gray-200">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            className="form-input flex-1"
            autoFocus
          />
          <button 
            type="submit"
            className="btn btn-primary aspect-square p-3"
            disabled={!newMessage.trim()}
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Este es un chatbot de simulación. Para soporte real, por favor usa la sección de Tickets.
        </p>
      </div>
    </div>
  );
};

export default Chatbot;