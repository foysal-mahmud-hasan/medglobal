import React from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';

export default function HealthCard({ 
  icon: Icon, 
  title, 
  subtitle,
  type = 'do', // 'do' | 'dont' | 'neutral'
  image,
  onClick,
  showAudio = true,
  className = ''
}) {
  const bgColors = {
    do: 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200',
    dont: 'bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200',
    neutral: 'bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200'
  };

  const iconColors = {
    do: 'text-emerald-600',
    dont: 'text-rose-600',
    neutral: 'text-sky-600'
  };

  const badges = {
    do: { text: '✓', bg: 'bg-emerald-500' },
    dont: { text: '✗', bg: 'bg-rose-500' },
    neutral: null
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative rounded-3xl border-2 p-5 cursor-pointer shadow-sm hover:shadow-md transition-shadow ${bgColors[type]} ${className}`}
    >
      {badges[type] && (
        <div className={`absolute -top-2 -right-2 w-8 h-8 ${badges[type].bg} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md`}>
          {badges[type].text}
        </div>
      )}
      
      <div className="flex flex-col items-center text-center gap-3">
        {image ? (
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/50 flex items-center justify-center">
            <img src={image} alt={title} className="w-16 h-16 object-contain" />
          </div>
        ) : Icon && (
          <div className={`w-16 h-16 rounded-2xl bg-white/60 flex items-center justify-center ${iconColors[type]}`}>
            <Icon className="w-8 h-8" />
          </div>
        )}
        
        <h3 className="font-semibold text-gray-800 text-base leading-tight">{title}</h3>
        
        {subtitle && (
          <p className="text-sm text-gray-600 leading-snug">{subtitle}</p>
        )}
        
        {showAudio && (
          <button 
            onClick={(e) => { e.stopPropagation(); }}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 mt-1"
          >
            <Volume2 className="w-4 h-4" />
            <span>Listen</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}