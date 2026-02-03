import React from 'react';
import { motion } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';

const eventIcons = {
  anc_visit: '🩺',
  ultrasound: '👶',
  blood_test: '🩸',
  birth_planning: '🎒',
  danger_signs: '⚠️',
  vaccine: '💉',
  checkup: '🩺',
  custom: '📌'
};

export default function DayDetailSheet({ day, events, onClose, onEventClick }) {
  if (!day) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-white rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            {day.toLocaleDateString('default', { month: 'long', day: 'numeric' })}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No events on this day</p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onEventClick(event)}
                className="w-full bg-gray-50 hover:bg-gray-100 rounded-2xl p-4 text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">
                    {eventIcons[event.type] || '📌'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{event.title}</h4>
                    {event.subtitle && (
                      <p className="text-sm text-gray-500 mt-1">{event.subtitle}</p>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}