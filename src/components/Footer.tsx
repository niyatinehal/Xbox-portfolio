import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/niyatinehal',
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/niyati-nehal-5791221b6',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:niyatinehal67@gmail.com',
      color: 'hover:text-lime-400'
    },
    {
      name: 'Portfolio',
      icon: ExternalLink,
      url: 'https://niyati-nehal.netlify.app/',
      color: 'hover:text-green-400'
    }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="relative z-10 mt-auto border-t border-gray-700/50 bg-gray-900/30 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left side - Branding */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center text-black font-bold text-sm">
              NN
            </div>
            <div>
              <h3 className="text-white font-semibold">Niyati Nehal</h3>
              <p className="text-gray-400 text-sm">Fullstack Developer</p>
            </div>
          </div>

          {/* Center - Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className={`text-gray-400 ${link.color} transition-all duration-300 p-2 rounded-lg hover:bg-gray-800/50`}
                aria-label={link.name}
              >
                <link.icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Right side - Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © {currentYear} Niyati Nehal
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Built with React & Tailwind CSS
            </p>
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 h-px bg-gradient-to-r from-transparent via-lime-400/50 to-transparent"
        />
      </div>
    </motion.footer>
  );
};

export default Footer;