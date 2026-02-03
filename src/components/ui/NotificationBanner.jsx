import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, AlertTriangle, MessageCircle, Baby, Heart } from 'lucide-react';

const icons = {
  pregnancy_milestone: Baby,
  reminder: Bell,
  danger_alert: AlertTriangle,
  telemedicine: MessageCircle,
  general: Heart
};

const colors = {
  pregnancy_milestone: 'bg-pink-50 border-pink-200 text-pink-800',
  reminder: 'bg-sky-50 border-sky-200 text-sky-800',
  danger_alert: 'bg-rose-50 border-rose-200 text-rose-800',
  telemedicine: 'bg-violet-50 border-violet-200 text-violet-800',
  general: 'bg-emerald-50 border-emerald-200 text-emerald-800'
};

const iconBg = {
  pregnancy_milestone: 'bg-pink-100 text-pink-600',
  reminder: 'bg-sky-100 text-sky-600',
  danger_alert: 'bg-rose-100 text-rose-600',
  telemedicine: 'bg-violet-100 text-violet-600',
  general: 'bg-emerald-100 text-emerald-600'
};

export default function NotificationBanner({ 
  notification, 
  onClose, 
  onAction,
  show = true 
}) {
  if (!notification) return null;
  
  const Icon = icons[notification.type] || Bell;
  
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`rounded-2xl border-2 p-4 shadow-md ${colors[notification.type]}`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg[notification.type]}`}>
              <Icon className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">{notification.title}</h4>
              <p className="text-sm opacity-80 mt-0.5">{notification.message}</p>
              
              {onAction && (
                <button 
                  onClick={onAction}
                  className="text-sm font-medium mt-2 underline hover:no-underline"
                >
                  Tap to see details →
                </button>
              )}
            </div>
            
            {onClose && (
              <button 
                onClick={onClose}
                className="p-1 hover:bg-black/5 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}