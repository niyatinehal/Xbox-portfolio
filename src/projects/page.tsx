import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FolderOpen, ExternalLink, Play, Star, Clock, Settings, Search, Volume2 } from 'lucide-react';

const projects = [
  {
    title: 'K-Verse',
    description: 'A full-stack social media app',
    tags: ['React', 'Tailwind', 'CRUD'],
    link: 'https://k-verse-connect.netlify.app/',
    isExternal: true,
    coverImage: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-purple-600 to-blue-600',
    rating: 5
  },
  {
    title: 'Bookshala',
    description: 'E-commerce app for books',
    tags: ['React', 'Cart', 'Filter'],
    link: 'https://bookshalaa-library.netlify.app/',
    isExternal: true,
    coverImage: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-orange-600 to-red-600',
    rating: 4
  },
  {
    title: 'Profile',
    description: 'Know more about me',
    tags: ['Bio', 'Skills', 'Achievements'],
    link: '/profile',
    isExternal: false,
    coverImage: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-lime-600 to-green-600',
    rating: 5
  }
];

export default function ProjectsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
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

  const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
    const CardContent = (
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...transition, delay: 0.3 + index * 0.15 }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
        className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer transform-gpu"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={project.coverImage} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80`}></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Glow Border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-lime-500/40 group-hover:border-lime-400 transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-lime-400/50"></div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-6 text-white">
          {/* Top - Rating */}
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={`${i < project.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                />
              ))}
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="p-2 bg-lime-400/20 rounded-full backdrop-blur-sm"
            >
              <Play size={16} className="text-lime-400" />
            </motion.div>
          </div>

          {/* Bottom - Info */}
          <div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-lime-300 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-200 mb-4 text-sm leading-relaxed">
              {project.description}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 + tagIndex * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="px-3 py-1 bg-black/50 backdrop-blur-sm text-xs rounded-full border border-lime-400/30 group-hover:border-lime-400/60 group-hover:text-lime-300 transition-all duration-300"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Launch Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center space-x-2 bg-lime-500/80 hover:bg-lime-400 text-black py-3 rounded-xl font-bold transition-all duration-300 group-hover:shadow-lg group-hover:shadow-lime-400/30"
            >
              {project.isExternal ? (
                <>
                  <ExternalLink size={18} />
                  <span>Launch Project</span>
                </>
              ) : (
                <>
                  <Play size={18} />
                  <span>View Profile</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );

    return project.isExternal ? (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {CardContent}
      </a>
    ) : (
      <Link to={project.link} className="block">
        {CardContent}
      </Link>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
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
        className="fixed w-8 h-8 bg-lime-400/20 rounded-full blur-xl pointer-events-none z-10"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* Xbox-style Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full px-8 py-6 bg-gray-900/30 backdrop-blur-md border-b border-gray-700/50"
      >
        <div className="flex justify-between items-center">
          {/* Left - Back to Dashboard */}
          <Link to="/" className="flex items-center space-x-3 text-lime-400 hover:text-lime-300 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center text-black font-bold text-sm">
              NN
            </div>
            <span className="font-semibold">Back to Dashboard</span>
          </Link>

          {/* Right - Xbox Controls */}
          <div className="flex items-center space-x-6">
            <span className="text-white font-mono text-lg">{currentTime}</span>
            <button className="text-gray-400 hover:text-lime-400 transition-colors p-2 rounded-lg hover:bg-gray-800/50">
              <Volume2 size={20} />
            </button>
            <button className="text-gray-400 hover:text-lime-400 transition-colors p-2 rounded-lg hover:bg-gray-800/50">
              <Settings size={20} />
            </button>
            <button className="text-gray-400 hover:text-lime-400 transition-colors p-2 rounded-lg hover:bg-gray-800/50">
              <Search size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 px-8 py-12">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.1 }}
          className="flex items-center space-x-4 mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <FolderOpen size={48} className="text-lime-400" />
          </motion.div>
          <h1 className="text-5xl font-bold text-white">
            My <span className="text-lime-400">Projects</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.2 }}
          className="text-xl text-gray-300 mb-12 max-w-2xl"
        >
          Explore my collection of full-stack applications and interactive experiences. 
          Each project showcases different technologies and problem-solving approaches.
        </motion.p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-block px-8 py-4 bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-700/50">
            <p className="text-gray-400 text-lg">
              <span className="text-lime-400 font-bold">{projects.length}</span> Projects Completed |
              <span className="text-lime-400 font-bold ml-2">100%</span> Success Rate |
              <span className="text-lime-400 font-bold ml-2">∞</span> Learning Mode
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}