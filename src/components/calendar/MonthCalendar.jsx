import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';

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

export default function MonthCalendar({ events = [], currentWeek, onDayClick, onAddEvent, type = 'pregnancy' }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [animationDirection, setAnimationDirection] = useState(0);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Add empty slots for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add all days in month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const changeMonth = (direction) => {
    setAnimationDirection(direction);
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getEventsForDay = (day) => {
    if (!day) return [];
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return day === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear();
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-bold text-lg">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar for Pregnancy */}
      {type === 'pregnancy' && currentWeek && (
        <div className="mb-4">
          <div className="flex gap-1 mb-2">
            <div className={`flex-1 h-2 rounded-full ${currentWeek <= 13 ? 'bg-pink-500' : 'bg-pink-200'}`} />
            <div className={`flex-1 h-2 rounded-full ${currentWeek > 13 && currentWeek <= 27 ? 'bg-orange-500' : currentWeek > 27 ? 'bg-orange-200' : 'bg-gray-200'}`} />
            <div className={`flex-1 h-2 rounded-full ${currentWeek > 27 ? 'bg-purple-500' : 'bg-gray-200'}`} />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>1st Tri</span>
            <span>2nd Tri</span>
            <span>3rd Tri</span>
          </div>
        </div>
      )}

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <motion.div
        key={currentMonth.toISOString()}
        initial={{ opacity: 0, x: animationDirection * 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-7 gap-1"
      >
        {days.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const today = isToday(day);
          
          return (
            <button
              key={index}
              onClick={() => day && onDayClick(day, dayEvents)}
              disabled={!day}
              className={`aspect-square p-1 rounded-lg relative ${
                !day ? 'invisible' : ''
              } ${
                today ? 'bg-pink-100 ring-2 ring-pink-500' : 'hover:bg-gray-50'
              }`}
            >
              {day && (
                <>
                  <div className={`text-sm font-medium ${today ? 'text-pink-600' : 'text-gray-700'}`}>
                    {day}
                  </div>
                  {dayEvents.length > 0 && (
                    <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {dayEvents.slice(0, 3).map((event, i) => (
                        <span key={i} className="text-xs">
                          {eventIcons[event.type] || '📌'}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              )}
            </button>
          );
        })}
      </motion.div>

      {/* Add Event Button */}
      {onAddEvent && (
        <Button
          onClick={onAddEvent}
          variant="outline"
          className="w-full mt-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Custom Event
        </Button>
      )}
    </div>
  );
}