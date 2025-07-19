import React from 'react';
import { Clock, Volume2, Settings, Search, Home, User, FolderOpen, Phone } from 'lucide-react';

const Navbar = () => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="w-full bg-black/80 backdrop-blur-md border-b border-green-500/20">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-8 py-4">
        {/* Left - Profile */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
            NN
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">Niyati Nehal</h2>
            <p className="text-green-400 text-sm font-medium">Level 2 Fullstack Explorer</p>
          </div>
        </div>

        {/* Right - Controls */}
        <div className="flex items-center space-x-6">
          <span className="text-white font-mono text-lg">{currentTime}</span>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Volume2 size={24} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Settings size={24} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Search size={24} />
          </button>
        </div>
      </div>

      {/* Navigation Icons */}
      <div className="flex items-center space-x-8 px-8 pb-4">
        <button className="flex flex-col items-center space-y-1 text-green-400 group">
          <Home size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-xs">Dashboard</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors group">
          <User size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-xs">Profile</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors group">
          <FolderOpen size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-xs">Projects</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors group">
          <Settings size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-xs">Settings</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors group">
          <Phone size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-xs">Contact</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;