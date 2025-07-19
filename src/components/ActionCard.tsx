import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  action: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  color,
  action 
}) => {
  return (
    <div className="w-72 h-40 rounded-xl overflow-hidden group cursor-pointer relative">
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color}`}></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Hover Border */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-green-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-400/30"></div>
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-between p-6 text-white">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-sm text-gray-200 mb-3">{description}</p>
          <span className="text-xs font-semibold text-green-300">{action}</span>
        </div>
        <div className="ml-4">
          <Icon size={32} className="group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default ActionCard;