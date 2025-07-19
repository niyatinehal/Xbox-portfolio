import React from 'react';
import { motion } from 'framer-motion';

const WelcomeSection = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-center mb-16"
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.5,
          type: "spring",
          stiffness: 100
        }}
        className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight"
      >
        Welcome to my
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400">
          Developer Hub
        </span>
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.8,
          ease: "easeOut"
        }}
        className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
      >
        Explore my journey as a fullstack developer through interactive tiles. 
        Discover projects, skills, and achievements in this Xbox-inspired portfolio experience.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5, 
          delay: 1.0,
          type: "spring",
          stiffness: 150
        }}
        className="mt-8 inline-block px-6 py-3 bg-gradient-to-r from-lime-400 to-green-500 text-black font-bold rounded-lg shadow-lg shadow-lime-400/30 hover:shadow-lime-400/50 transition-shadow duration-300"
      >
        <span className="text-lg">Ready to Explore</span>
      </motion.div>
    </motion.section>
  );
};

export default WelcomeSection;