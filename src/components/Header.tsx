import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Search, Volume2, VolumeX, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SEARCH_ITEMS = [
  { label: 'Profile', description: 'Summary, Bio & Resume', href: '/profile' },
  { label: 'Projects', description: 'Case studies and apps built', href: '/projects' },
  { label: 'Settings', description: 'Contact info & links', href: '/settings' },
];

const Header = () => {
  const navigate = useNavigate();
  const [muted, setMuted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const filtered = SEARCH_ITEMS.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearchSelect = (href: string) => {
    setSearchOpen(false);
    setQuery('');
    navigate(href);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
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

            {/* Volume toggle */}
            <button
              onClick={() => setMuted((m) => !m)}
              title={muted ? 'Unmute' : 'Mute'}
              className="text-gray-400 hover:text-lime-400 transition-colors p-2 rounded-lg hover:bg-gray-800/50"
            >
              {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>

            {/* Settings → /settings */}
            <button
              onClick={() => navigate('/settings')}
              title="Settings"
              className="text-gray-400 hover:text-lime-400 transition-colors p-2 rounded-lg hover:bg-gray-800/50"
            >
              <Settings size={24} />
            </button>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              title="Search"
              className="text-gray-400 hover:text-lime-400 transition-colors p-2 rounded-lg hover:bg-gray-800/50"
            >
              <Search size={24} />
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-sm"
            onClick={() => { setSearchOpen(false); setQuery(''); }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="w-full max-w-lg bg-gray-900 border border-gray-700/60 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Input row */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-700/60">
                <Search size={18} className="text-gray-400 flex-shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages…"
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base"
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') { setSearchOpen(false); setQuery(''); }
                    if (e.key === 'Enter' && filtered.length > 0) handleSearchSelect(filtered[0].href);
                  }}
                />
                <button
                  onClick={() => { setSearchOpen(false); setQuery(''); }}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Results */}
              <ul className="py-2">
                {filtered.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => handleSearchSelect(item.href)}
                      className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-800/60 transition-colors text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-lime-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-lime-400/20 transition-colors">
                        <span className="text-lime-400 text-xs font-bold">{item.label[0]}</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{item.label}</p>
                        <p className="text-gray-400 text-xs">{item.description}</p>
                      </div>
                    </button>
                  </li>
                ))}
                {filtered.length === 0 && (
                  <li className="px-5 py-4 text-gray-500 text-sm text-center">No results for "{query}"</li>
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
