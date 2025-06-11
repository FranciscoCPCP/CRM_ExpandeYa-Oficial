import React from 'react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`
        max-w-[75%] rounded-lg px-4 py-3 
        ${isUser 
          ? 'bg-primary text-white rounded-tr-none' 
          : 'bg-gray-100 text-gray-800 rounded-tl-none'
        }
      `}>
        <p className="text-sm">{message}</p>
        <span className={`text-xs block mt-1 ${isUser ? 'text-white/80' : 'text-gray-500'}`}>
          {timestamp}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;