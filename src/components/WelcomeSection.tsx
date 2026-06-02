import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';

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
        The right developer for
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400">
          SaaS Founders & Coaches
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
        2 years of fullstack experience building production-ready Next.js frontends —
        dashboards, client portals, and SaaS landing pages. TypeScript, Vercel, fixed price & timeline.
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
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <button
          onClick={() => document.getElementById('tiles')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-6 py-3 bg-gradient-to-r from-lime-400 to-green-500 text-black font-bold rounded-lg shadow-lg shadow-lime-400/30 hover:shadow-lime-400/60 hover:scale-105 active:scale-95 transition-all duration-200 text-lg cursor-pointer"
        >
          Ready to Explore
        </button>

        <a
          href="https://topmate.io/niyati_nehal/1604225"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-lime-400/70 text-lime-300 font-bold rounded-lg hover:bg-lime-400/10 hover:border-lime-400 transition-all duration-300 text-lg"
        >
          <CalendarDays size={20} />
          Schedule a Call
        </a>
      </motion.div>
    </motion.section>
  );
};

export default WelcomeSection;