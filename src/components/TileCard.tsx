import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface TileCardProps {
  title: string;
  description: string;
  icon: typeof LucideIcon;
  link: string;
  index: number;
}

const TileCard: React.FC<TileCardProps> = ({
  title,
  description,
  icon: Icon,
  link,
  index
}) => {
  return (
    <Link to={link}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: index * 0.1
        }}
        whileHover={{
          scale: 1.07,
          transition: { duration: 0.2 }
        }}
        className="group cursor-pointer"
      >
        <div className="relative h-80 rounded-2xl overflow-hidden backdrop-blur-md bg-gray-900/40 border border-gray-700/50 hover:border-lime-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-lime-400/20">
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/40"></div>

          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-lime-400/10 to-transparent"></div>

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mb-6"
            >
              <Icon size={64} className="text-lime-400 group-hover:text-lime-300 transition-colors duration-300" />
            </motion.div>

            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-lime-300 transition-colors duration-300">
              {title}
            </h3>

            <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
              {description}
            </p>

            {/* Subtle bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-lime-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default TileCard;
