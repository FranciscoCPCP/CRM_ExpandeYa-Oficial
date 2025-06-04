import React, { useState } from 'react';
import { Send, Bot, MessageSquare } from 'lucide-react';

const Chatbot: React.FC = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([
    { id: 1, sender: 'bot', text: '¡Hola! Soy el asistente virtual del CRM. ¿En qué puedo ayudarte hoy?' },
  ]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // Add user message
    const userMessage = { id: conversation.length + 1, sender: 'user', text: message };
    setConversation([...conversation, userMessage]);
    
    // Clear input
    setMessage('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = { 
        id: conversation.length + 2, 
        sender: 'bot', 
        text: 'Gracias por tu mensaje. Un agente revisará tu consulta y te responderá lo antes posible.' 
      };
      setConversation(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-800">Chatbot Asistente</h1>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col h-[calc(100vh-13rem)]">
        <div className="p-4 border-b bg-primary-blue text-white flex items-center gap-2">
          <Bot size={20} />
          <h2 className="font-semibold">Asistente Virtual CRM</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {conversation.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                  msg.sender === 'user' 
                    ? 'bg-primary-orange text-white rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Escribe tu mensaje..."
              className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
            <button
              onClick={handleSendMessage}
              className="bg-primary-blue text-white rounded-r-lg px-4 py-2 hover:bg-primary-blue/90 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;