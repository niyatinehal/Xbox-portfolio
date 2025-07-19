'use client';
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { GraduationCap, MapPin, Mail, User, Code, Star } from 'lucide-react';

export default function ProfilePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Smooth cursor following
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [cursorX, cursorY]);

  const transition = { type: 'spring', stiffness: 300, damping: 25 };

  return (
    <main className="min-h-screen bg-gradient-radial from-gray-950 via-black to-gray-900 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial gradients */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/8 rounded-full blur-3xl"
        />

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(163, 230, 53, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(163, 230, 53, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Cursor Following Glow */}
      <motion.div
        className="fixed w-8 h-8 bg-lime-400/30 rounded-full blur-xl pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...transition, delay: 0.2 }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
          className="max-w-4xl w-full"
        >
          {/* Profile Card */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-lime-400/20 to-green-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 group-hover:border-lime-400/80 rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-500">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
                {/* Animated Avatar */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ ...transition, delay: 0.4 }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="relative"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(163, 230, 53, 0.3)",
                        "0 0 40px rgba(163, 230, 53, 0.5)",
                        "0 0 20px rgba(163, 230, 53, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center text-black font-bold text-4xl"
                  >
                    NN
                  </motion.div>
                  
                  {/* Floating particles around avatar */}
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0"
                  >
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-lime-400 rounded-full opacity-60"></div>
                    <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-green-400 rounded-full opacity-40"></div>
                    <div className="absolute top-1/2 -right-4 w-1 h-1 bg-lime-300 rounded-full opacity-80"></div>
                  </motion.div>
                </motion.div>

                {/* Name and Title */}
                <div className="text-center md:text-left flex-1">
                  <motion.h1
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...transition, delay: 0.5 }}
                    className="text-4xl md:text-5xl font-bold text-lime-400 mb-2 tracking-tight"
                  >
                    Niyati Nehal
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...transition, delay: 0.6 }}
                    className="text-xl text-gray-300 font-semibold mb-4"
                  >
                    Level 2 Fullstack Explorer
                  </motion.p>

                  {/* XP Bar */}
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ ...transition, delay: 0.7 }}
                    className="w-full max-w-md"
                  >
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Current XP: 2,847</span>
                      <span>Next Level: 3,000</span>
                    </div>
                    <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "94.9%" }}
                        transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-lime-400 to-green-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bio Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.8 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-lime-400 mb-4 flex items-center gap-2">
                  <User className="w-6 h-6" />
                  About Me
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Niyati is a mission-driven full-stack developer who crafts interactive frontends and powerful backends. 
                  Finalist of the Smart India Hackathon, she's ready for her next co-op adventure at Microsoft.
                </p>
              </motion.div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Education */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...transition, delay: 0.9 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-lime-400/50 transition-all duration-300"
                >
                  <div className="p-2 bg-lime-400/20 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-lime-400" />
                  </div>
                  <div>
                    <h3 className="text-lime-300 font-semibold mb-1">Education</h3>
                    <p className="text-gray-300 text-sm">Rewa Engineering College</p>
                    <p className="text-gray-400 text-sm">B.Tech in CSE • CGPA: 8.34</p>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...transition, delay: 1.0 }}
                  whileHover={{ scale: 1.02, x: -5 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-lime-400/50 transition-all duration-300"
                >
                  <div className="p-2 bg-lime-400/20 rounded-lg">
                    <MapPin className="w-6 h-6 text-lime-400" />
                  </div>
                  <div>
                    <h3 className="text-lime-300 font-semibold mb-1">Location</h3>
                    <p className="text-gray-300 text-sm">Bangalore, India</p>
                    <p className="text-gray-400 text-sm">Available for remote work</p>
                  </div>
                </motion.div>

                {/* Contact */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...transition, delay: 1.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-lime-400/50 transition-all duration-300"
                >
                  <div className="p-2 bg-lime-400/20 rounded-lg">
                    <Mail className="w-6 h-6 text-lime-400" />
                  </div>
                  <div>
                    <h3 className="text-lime-300 font-semibold mb-1">Contact</h3>
                    <p className="text-gray-300 text-sm">niyatinehal67@gmail.com</p>
                    <p className="text-gray-400 text-sm">Open to opportunities</p>
                  </div>
                </motion.div>

                {/* Achievement */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...transition, delay: 1.2 }}
                  whileHover={{ scale: 1.02, x: -5 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-lime-400/50 transition-all duration-300"
                >
                  <div className="p-2 bg-lime-400/20 rounded-lg">
                    <Star className="w-6 h-6 text-lime-400" />
                  </div>
                  <div>
                    <h3 className="text-lime-300 font-semibold mb-1">Achievement</h3>
                    <p className="text-gray-300 text-sm">SIH Finalist</p>
                    <p className="text-gray-400 text-sm">Smart India Hackathon</p>
                  </div>
                </motion.div>
              </div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 1.3 }}
                className="border-t border-gray-700/50 pt-6"
              >
                <h2 className="text-xl font-bold text-lime-400 mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'TypeScript', 'Express', 'Socket.io'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ ...transition, delay: 1.4 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-4 py-2 bg-lime-400/10 border border-lime-400/30 rounded-full text-lime-300 text-sm font-medium hover:bg-lime-400/20 hover:border-lime-400/50 transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}