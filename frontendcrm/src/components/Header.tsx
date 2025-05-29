import React from 'react';
import { Bell, User, Briefcase } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-primary-orange flex items-center justify-between px-4 shadow-md z-10">
      <div className="flex items-center">
        <Briefcase className="text-white h-6 w-6 mr-2" />
        <span className="text-white font-bold text-xl">CRM Pro</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Bell className="text-white h-5 w-5 cursor-pointer hover:opacity-80 transition-opacity" />
          <div className="absolute -top-1 -right-1 bg-white text-primary-orange rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
            3
          </div>
        </div>
        <div className="bg-white/20 rounded-full p-1.5 cursor-pointer hover:bg-white/30 transition-colors">
          <User className="text-white h-5 w-5" />
        </div>
      </div>
    </header>
  );
};

export default Header;