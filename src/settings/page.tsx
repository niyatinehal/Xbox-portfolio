'use client';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Globe, CalendarDays, MapPin } from 'lucide-react';

const transition = { type: "spring" as const, stiffness: 300, damping: 25 };

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'niyatinehal67@gmail.com',
    href: 'mailto:niyatinehal67@gmail.com',
    description: 'Responds within 24 hours',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/niyatinehal',
    href: 'https://github.com/niyatinehal',
    description: 'Open-source projects & contributions',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'niyati-nehal-5791221b6',
    href: 'https://www.linkedin.com/in/niyati-nehal-5791221b6/',
    description: 'Professional profile',
  },
  {
    icon: Globe,
    label: 'Portfolio',
    value: 'niyati-portfolio-ten.vercel.app',
    href: 'https://niyati-portfolio-ten.vercel.app/',
    description: 'Full portfolio website',
  },
  {
    icon: CalendarDays,
    label: 'Schedule a Call',
    value: 'topmate.io/niyati_nehal',
    href: 'https://topmate.io/niyati_nehal/1604225',
    description: 'Book a slot — free intro call',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Bangalore, India',
    href: null,
    description: 'Available for remote & on-site',
  },
];

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 p-8 text-white">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 0.1 }}
      >
        <motion.h1
          className="text-4xl font-bold text-lime-400 mb-2"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.1 }}
        >
          Contact &amp; Links
        </motion.h1>
        <motion.p
          className="text-gray-400 mb-10 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...transition, delay: 0.2 }}
        >
          Open to freelance work and full-time opportunities. Let's build something together.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {contacts.map((item, index) => {
            const Icon = item.icon;
            const inner = (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.3 + index * 0.08 }}
                whileHover={{ scale: 1.03, x: 4 }}
                className={`flex items-start gap-4 p-5 rounded-2xl bg-gray-900/60 border border-gray-700/50 hover:border-lime-400/60 transition-all duration-300 group ${item.href ? 'cursor-pointer' : ''}`}
              >
                <div className="p-2.5 bg-lime-400/10 rounded-xl group-hover:bg-lime-400/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-lime-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">{item.label}</p>
                  <p className="text-lime-300 font-semibold text-sm truncate group-hover:text-lime-200 transition-colors">{item.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{item.description}</p>
                </div>
              </motion.div>
            );

            return item.href ? (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <div key={item.label}>{inner}</div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.9 }}
          className="mt-10 p-6 rounded-2xl bg-lime-400/5 border border-lime-400/20 text-center"
        >
          <p className="text-gray-300 text-lg">
            Available for <span className="text-lime-400 font-semibold">freelance</span> and{' '}
            <span className="text-lime-400 font-semibold">full-time</span> opportunities
          </p>
          <p className="text-gray-500 text-sm mt-1">Response time within 24 hours</p>
        </motion.div>
      </motion.div>
    </main>
  );
}
