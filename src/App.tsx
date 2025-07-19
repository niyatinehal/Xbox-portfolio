import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import WelcomeSection from './components/WelcomeSection';
import TileCard from './components/TileCard';
import BackgroundEffects from './components/BackgroundEffects';
import { User, FolderOpen, Settings } from 'lucide-react';

function App() {
  const tiles = [
    {
      title: "Profile",
      description: "Summary, Bio & Resume",
      icon: User,
      link: "/profile"
    },
    {
      title: "Projects",
      description: "Case studies and apps built",
      icon: FolderOpen,
      link: "/projects"
    },
    {
      title: "Settings",
      description: "Contact info, preferences",
      icon: Settings,
      link: "/settings"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Background Effects */}
      <BackgroundEffects />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="px-8 py-12">
          {/* Welcome Section */}
          <WelcomeSection />

          {/* Tiles Grid */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tiles.map((tile, index) => (
                <TileCard
                  key={tile.title}
                  title={tile.title}
                  description={tile.description}
                  icon={tile.icon}
                  link={tile.link}
                  index={index}
                />
              ))}
            </div>
          </motion.section>

          {/* Footer XP Info */}
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="text-center mt-20 pb-12"
          >
            <div className="inline-block px-8 py-4 bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-700/50">
              <p className="text-gray-400 text-lg">
                Current XP: <span className="text-lime-400 font-bold">2,847</span> | 
                Next Level: <span className="text-lime-400 font-bold">3,000</span>
              </p>
              <div className="mt-3 w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "94.9%" }}
                  transition={{ duration: 2, delay: 2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-lime-400 to-green-500 rounded-full"
                />
              </div>
            </div>
          </motion.footer>
        </main>
      </div>
    </div>
  );
}

export default App;