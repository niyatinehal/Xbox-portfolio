import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Search, Volume2, VolumeX, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SEARCH_ITEMS = [
  { label: 'Profile', description: 'Summary, Bio & Resume', href: '/profile' },
  { label: 'Projects', description: 'Case studies and apps built', href: '/projects' },
  { label: 'Settings', description: 'Contact info & links', href: '/settings' },
];

const SOUNDCLOUD_URL =
  'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/steveburke/xbox-360-dashboard-avatars-1&color=%23a3e635&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false';

const Header = () => {
  const navigate = useNavigate();
  const [muted, setMuted] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const soundCloudRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!musicOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMusicOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [musicOpen]);

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
        className="w-full px-8 py-6 relative z-40"
      >
        <div className="flex justify-between items-center">
          {/* Left - Profile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => navigate('/')}
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
              onClick={() => setMusicOpen((o) => !o)}
              title="Music Player"
              aria-expanded={musicOpen}
              aria-controls="music-drawer"
              className={`transition-colors p-2 rounded-lg ${
                musicOpen
                  ? 'text-black bg-lime-400'
                  : 'text-gray-400 hover:text-lime-400 hover:bg-gray-800/50'
              }`}
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

        {/* Music player drawer */}
        <AnimatePresence>
          {musicOpen && (
            <motion.div
              id="music-drawer"
              initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              style={{ transformOrigin: 'top right' }}
              className="absolute right-8 top-full w-80 bg-[#1a1a1a] border border-lime-400 border-t-0 rounded-b-xl shadow-[0_8px_32px_rgba(163,230,53,0.15)] overflow-hidden z-50"
            >
              {/* Drawer header row */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800">
                <span className="text-lime-400 text-xs font-semibold tracking-widest">♪ NOW PLAYING</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-xs">Mute</span>
                  <button
                    onClick={() => {
                      const next = !muted;
                      setMuted(next);
                      soundCloudRef.current?.contentWindow?.postMessage(
                        JSON.stringify({ method: 'setVolume', value: next ? 0 : 100 }),
                        '*'
                      );
                    }}
                    className="text-gray-400 hover:text-lime-400 transition-colors"
                    title={muted ? 'Unmute' : 'Mute'}
                  >
                    {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
              </div>
              {/* SoundCloud embed */}
              <div className="p-3">
                <iframe
                  title="Music Player"
                  width="100%"
                  height={120}
                  allow="autoplay"
                  sandbox="allow-scripts allow-same-origin"
                  ref={soundCloudRef}
                  src={SOUNDCLOUD_URL}
                  className="rounded-lg"
                  style={{ border: 'none' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Click-outside overlay — closes music drawer */}
      {musicOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-30 cursor-default"
          onClick={() => setMusicOpen(false)}
        />
      )}

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
