import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function BigTile({ 
  icon: Icon, 
  title, 
  subtitle,
  color = 'blue',
  onClick,
  badge,
  className = ''
}) {
  const colorStyles = {
    blue: 'bg-gradient-to-br from-sky-400 to-sky-600 shadow-sky-200',
    pink: 'bg-gradient-to-br from-pink-400 to-pink-600 shadow-pink-200',
    purple: 'bg-gradient-to-br from-violet-400 to-violet-600 shadow-violet-200',
    green: 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-200',
    orange: 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-200',
    rose: 'bg-gradient-to-br from-rose-400 to-rose-600 shadow-rose-200'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative w-full rounded-3xl p-5 text-white shadow-lg ${colorStyles[color]} ${className}`}
    >
      {badge && (
        <div className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
          {badge}
        </div>
      )}
      
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
          <Icon className="w-7 h-7" />
        </div>
        
        <div className="flex-1 text-left">
          <h3 className="font-bold text-lg">{title}</h3>
          {subtitle && (
            <p className="text-white/80 text-sm mt-0.5">{subtitle}</p>
          )}
        </div>
        
        <ChevronRight className="w-5 h-5 text-white/60" />
      </div>
    </motion.button>
  );
}