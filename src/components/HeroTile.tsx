import React from 'react';
import { Play, Star } from 'lucide-react';

const HeroTile = () => {
  return (
    <div className="relative w-full h-96 rounded-2xl overflow-hidden group cursor-pointer">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-green-500"></div>
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-400/50"></div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 text-white">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-green-500 text-black text-xs font-bold rounded-full mb-2">
            FEATURED PROJECT
          </span>
          <h1 className="text-4xl font-bold mb-2">K-Verse Social Platform</h1>
          <p className="text-lg text-gray-200 mb-4">
            Next-generation social media platform with real-time messaging and AI-powered content discovery
          </p>
          
          {/* Tech Stack */}
          <div className="flex space-x-2 mb-4">
            <span className="px-2 py-1 bg-blue-500/80 text-xs rounded">React</span>
            <span className="px-2 py-1 bg-green-500/80 text-xs rounded">Node.js</span>
            <span className="px-2 py-1 bg-purple-500/80 text-xs rounded">MongoDB</span>
            <span className="px-2 py-1 bg-orange-500/80 text-xs rounded">Socket.io</span>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                />
              ))}
            </div>
            <span className="text-sm">4.5/5</span>
          </div>

          {/* Action Button */}
          <button className="flex items-center space-x-2 bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-lg font-bold transition-colors group">
            <Play size={20} className="group-hover:scale-110 transition-transform" />
            <span>Live Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroTile;