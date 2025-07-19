import React from 'react';

const WaveBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated waves */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 1200 800" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        
        {/* Wave 1 */}
        <path 
          d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z" 
          fill="url(#wave1)"
          className="animate-pulse"
        />
        
        {/* Wave 2 */}
        <path 
          d="M0,500 C400,350 800,550 1200,450 L1200,800 L0,800 Z" 
          fill="url(#wave2)"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </svg>
      
      {/* Radial gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
    </div>
  );
};

export default WaveBackground;