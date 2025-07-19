import React from 'react';
import { Play, Star, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  rating: number;
  color: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  image, 
  tags, 
  rating,
  color 
}) => {
  return (
    <div className="flex-shrink-0 w-80 h-64 rounded-xl overflow-hidden group cursor-pointer relative">
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color}`}></div>
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Hover Border */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-green-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-400/30"></div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6 text-white">
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm text-gray-200 mb-3 line-clamp-2">{description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-black/50 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                />
              ))}
            </div>
            <span className="text-xs">{rating}/5</span>
          </div>

          {/* Action Button */}
          <button className="w-full flex items-center justify-center space-x-2 bg-green-500/80 hover:bg-green-400 text-black py-2 rounded-lg font-semibold transition-colors group/btn">
            <ExternalLink size={16} className="group-hover/btn:scale-110 transition-transform" />
            <span>View Project</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;