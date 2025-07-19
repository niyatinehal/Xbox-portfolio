'use client';
import { motion } from 'framer-motion';

const transition = { type: 'spring', stiffness: 300, damping: 25 };

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 to-black p-8 text-white">
      <motion.h1
        className="text-4xl font-bold text-lime-400 mb-6"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 0.1 }}
      >
        👤 Profile
      </motion.h1>

      <motion.div
        className="bg-gray-900 rounded-xl p-6 border border-lime-700/40 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 0.2 }}
      >
        <p className="text-gray-300 leading-relaxed">
          Niyati is a mission-driven full-stack developer who crafts interactive frontends and powerful backends.
          Finalist of the Smart India Hackathon, she’s ready for her next co-op adventure at Microsoft.
        </p>

        <ul className="mt-4 space-y-2 text-lime-300 text-sm">
          <li>🎓 Rewa Engineering College – B.Tech in CSE – CGPA: 8.34</li>
          <li>📍 Bangalore, India</li>
          <li>📧 niyatinehal67@gmail.com</li>
        </ul>
      </motion.div>
    </main>
  );
}
