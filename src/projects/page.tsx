import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, ChevronRight } from 'lucide-react';

const projects = [
  {
    title: 'Creo — Collaborative Whiteboard',
    subtitle: 'Real-time distributed whiteboard',
    description:
      'Full-stack distributed system with WebSocket-powered real-time sync, allowing remote teams to draw and collaborate concurrently. Built with a Next.js 15 frontend, Express backend, PostgreSQL persistence, all wired together in a Turborepo monorepo.',
    tags: ['Next.js 15', 'TypeScript', 'WebSocket', 'PostgreSQL', 'Drizzle ORM', 'Turborepo'],
    link: 'https://creo-whiteboard.vercel.app',
    githubLink: 'https://github.com/niyatinehal/whiteboard',
    gradient: 'from-purple-700 via-blue-700 to-indigo-800',
    accentColor: 'bg-purple-500',
    rating: 5,
    preview: '/previews/creo.png',
  },
  {
    title: 'Coach Platform Template',
    subtitle: 'Course management & client portal',
    description:
      'Comprehensive coaching platform built for coaches who need to manage courses, interact with clients, and track analytics — all in one place. Features a polished client portal and analytics dashboard built with Next.js and TypeScript.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React.js'],
    link: 'https://coach-platform-template.vercel.app',
    githubLink: 'https://github.com/niyatinehal/coach-platform-template',
    gradient: 'from-emerald-700 via-teal-700 to-green-800',
    accentColor: 'bg-emerald-500',
    rating: 5,
    preview: '/previews/coach.png',
  },
  {
    title: 'DSA Tracker Gamified',
    subtitle: 'Gamified interview prep with 3D visuals',
    description:
      'Developers had no engaging way to track DSA interview prep. This gamified tracker adds 3D visualizations powered by Three.js, an integrated code editor, and a progress system that keeps you coming back — built with React, TypeScript, and Redux.',
    tags: ['React.js', 'TypeScript', 'Three.js', 'Redux'],
    link: 'https://dsa-tracker-gamified.vercel.app',
    githubLink: 'https://github.com/niyatinehal/DSA_tracker_gamified',
    gradient: 'from-orange-700 via-red-700 to-rose-800',
    accentColor: 'bg-orange-500',
    rating: 5,
    preview: '/previews/dsa-tracker.png',
  },
  {
    title: 'YouTube Analysis Tool',
    subtitle: 'Channel analytics for content creators',
    description:
      'Full-stack analytics platform that fetches YouTube channel data via API and surfaces it through interactive Recharts visualisations. Helps content creators understand their performance trends at a glance without leaving the browser.',
    tags: ['React.js', 'Node.js', 'TypeScript', 'Recharts'],
    link: 'https://cactro-youtube-analysis.vercel.app',
    githubLink: 'https://github.com/niyatinehal/cactro-youtube-analysis',
    gradient: 'from-red-700 via-pink-700 to-rose-800',
    accentColor: 'bg-red-500',
    rating: 4,
    preview: '/previews/youtube.png',
  },
];

const transition = { type: 'spring' as const, stiffness: 300, damping: 28 };

export default function ProjectsPage() {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/8 rounded-full blur-3xl"
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(163,230,53,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(163,230,53,0.15) 1px,transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* ── Sidebar ── */}
        <motion.aside
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...transition, delay: 0.1 }}
          className="w-72 flex-shrink-0 border-r border-gray-800/70 flex flex-col py-10 px-4 gap-2 overflow-y-auto"
        >
          <p className="text-xs text-gray-500 uppercase tracking-widest px-3 mb-4">
            My Projects
          </p>

          {projects.map((p, i) => (
            <motion.button
              key={p.title}
              onClick={() => setSelected(i)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...transition, delay: 0.15 + i * 0.08 }}
              whileHover={{ x: 4 }}
              className={`relative w-full text-left rounded-xl px-4 py-3 transition-all duration-200 group ${
                selected === i
                  ? 'bg-lime-400/10 border border-lime-400/50'
                  : 'hover:bg-gray-800/60 border border-transparent'
              }`}
            >
              {/* active indicator bar */}
              {selected === i && (
                <motion.div
                  layoutId="activeBar"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-lime-400 rounded-full"
                />
              )}

              <div className="flex items-center justify-between">
                <div className="min-w-0 pl-2">
                  <p
                    className={`text-sm font-semibold truncate transition-colors ${
                      selected === i ? 'text-lime-300' : 'text-gray-300 group-hover:text-white'
                    }`}
                  >
                    {p.title.split('—')[0].trim()}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{p.subtitle}</p>
                </div>
                <ChevronRight
                  size={14}
                  className={`flex-shrink-0 ml-2 transition-colors ${
                    selected === i ? 'text-lime-400' : 'text-gray-600 group-hover:text-gray-400'
                  }`}
                />
              </div>
            </motion.button>
          ))}

          {/* Stats strip */}
          <div className="mt-auto pt-6 border-t border-gray-800/60 px-3">
            <p className="text-xs text-gray-600">
              <span className="text-lime-400 font-bold">{projects.length}</span> featured projects
            </p>
            <p className="text-xs text-gray-600 mt-1">
              <span className="text-lime-400 font-bold">2+</span> years experience
            </p>
          </div>
        </motion.aside>

        {/* ── Detail Panel ── */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ ...transition, duration: 0.3 }}
              className="h-full flex flex-col"
            >
              {/* Cover area — browser chrome + screenshot */}
              <div className={`relative h-72 bg-gradient-to-br ${project.gradient} flex-shrink-0 flex flex-col`}>
                {/* Browser chrome bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-black/50 backdrop-blur-sm border-b border-white/[0.08] flex-shrink-0 z-10">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 bg-white/[0.08] rounded px-3 py-1 text-gray-400 font-mono text-[11px] truncate">
                    {project.link.replace('https://', '')}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lime-400 text-xs font-semibold hover:text-lime-300 transition-colors flex-shrink-0"
                  >
                    ↗ Live
                  </a>
                </div>

                {/* Screenshot */}
                <div className="flex-1 overflow-hidden relative">
                  <img
                    src={project.preview}
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Bottom fade into body */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />
                </div>

                {/* Stars */}
                <div className="absolute top-12 right-6 flex items-center gap-1 z-10">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < project.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                    />
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 px-8 py-8 max-w-3xl">
                {/* Project number + title (moved from cover) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                    Project {selected + 1} of {projects.length}
                  </p>
                  <h1 className="text-3xl font-bold text-white leading-tight mb-1">{project.title}</h1>
                  <p className="text-lime-300 text-sm">{project.subtitle}</p>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-300 text-base leading-relaxed mb-8"
                >
                  {project.description}
                </motion.p>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mb-8"
                >
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-lime-400/8 border border-lime-400/25 rounded-full text-lime-300 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-4"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-lime-400 hover:bg-lime-300 text-black font-bold rounded-xl transition-all duration-200 shadow-lg shadow-lime-400/20 hover:shadow-lime-400/40"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl border border-gray-700 hover:border-gray-500 transition-all duration-200"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
