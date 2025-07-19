import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Settings, Search, Volume2 } from 'lucide-react';

const Header = () => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full px-8 py-6"
    >
      <div className="flex justify-between items-center">
        {/* Left - Profile */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center space-x-4"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-lime-400/30">
            NN
          </div>
          <div>
            <h1 className="text-white font-bold text-2xl">Niyati Nehal</h1>
            <p className="text-lime-400 text-sm font-semibold tracking-wide">Level 2 Fullstack Explorer</p>
          </div>
        </motion.div>

        {/* Right - Controls */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center space-x-6"
        >
          <span className="text-white font-mono text-xl">{currentTime}</span>
          <button className="text-gray-400 hover:text-lime-400 transition-colors p-2 rounded-lg hover:bg-gray-800/50">
            <Volume2 size={24} />
          </button>
          <button className="text-gray-400 hover:text-lime-400 transition-colors p-2 rounded-lg hover:bg-gray-800/50">
            <Settings size={24} />
          </button>
          <button className="text-gray-400 hover:text-lime-400 transition-colors p-2 rounded-lg hover:bg-gray-800/50">
            <Search size={24} />
          </button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;