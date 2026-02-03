import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ChevronLeft, Bell, Baby, MessageCircle, AlertTriangle, Heart,
  Home as HomeIcon, Settings, Check, Trash2
} from 'lucide-react';
import { Button } from '../components/ui/button';

const mockNotifications = [
  {
    id: '1',
    title: 'Week 10 Update',
    message: 'Your baby is growing fast! Tap to see this week\'s Dos & Don\'ts.',
    type: 'pregnancy_milestone',
    is_read: false,
    action_url: '/Pregnancy',
    created_date: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Doctor Reply',
    message: 'A MedGlobal doctor replied to your message. Tap to open chat.',
    type: 'telemedicine',
    is_read: false,
    action_url: '/Telemedicine',
    created_date: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: '3',
    title: 'Safety Reminder',
    message: 'If you have heavy bleeding or severe pain, go to a clinic immediately.',
    type: 'danger_alert',
    is_read: true,
    created_date: new Date(Date.now() - 86400000).toISOString()
  }
];

const iconMap = {
  pregnancy_milestone: Baby,
  reminder: Bell,
  danger_alert: AlertTriangle,
  telemedicine: MessageCircle,
  general: Heart
};

const colorMap = {
  pregnancy_milestone: 'bg-pink-100 text-pink-600',
  reminder: 'bg-sky-100 text-sky-600',
  danger_alert: 'bg-rose-100 text-rose-600',
  telemedicine: 'bg-violet-100 text-violet-600',
  general: 'bg-emerald-100 text-emerald-600'
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [loading, setLoading] = useState(false);

  const markAsRead = async (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, is_read: true } : n)
    );
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 3600000) {
      const mins = Math.floor(diff / 60000);
      return `${mins}m ago`;
    }
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours}h ago`;
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      {/* Header */}
      <div className="bg-white border-b px-6 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={createPageUrl('Home')} className="p-2 -ml-2">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-500">{unreadCount} unread</p>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllRead}>
              <Check className="w-4 h-4 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-6 py-4 space-y-3">
        <AnimatePresence>
          {notifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-gray-300" />
              </div>
              <p className="text-gray-500">No notifications yet</p>
            </motion.div>
          ) : (
            notifications.map((notif, index) => {
              const Icon = iconMap[notif.type] || Bell;
              
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-2xl p-4 shadow-sm border-2 ${
                    notif.is_read ? 'border-gray-100' : 'border-sky-200'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[notif.type]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`font-semibold ${notif.is_read ? 'text-gray-600' : 'text-gray-800'}`}>
                          {notif.title}
                        </h3>
                        {!notif.is_read && (
                          <div className="w-2 h-2 bg-sky-500 rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                      <p className={`text-sm mt-1 ${notif.is_read ? 'text-gray-400' : 'text-gray-600'}`}>
                        {notif.message}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-400">
                          {formatTime(notif.created_date)}
                        </span>
                        <div className="flex gap-2">
                          {notif.action_url && (
                            <Link 
                              to={createPageUrl(notif.action_url.replace('/', ''))}
                              onClick={() => markAsRead(notif.id)}
                              className="text-sm text-sky-600 font-medium"
                            >
                              View →
                            </Link>
                          )}
                          <button
                            onClick={() => deleteNotification(notif.id)}
                            className="text-gray-400 hover:text-rose-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-around items-center">
        <Link to={createPageUrl('Home')} className="flex flex-col items-center text-gray-400">
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to={createPageUrl('MyHealth')} className="flex flex-col items-center text-gray-400">
          <Heart className="w-6 h-6" />
          <span className="text-xs mt-1">My Health</span>
        </Link>
        <Link to={createPageUrl('Notifications')} className="flex flex-col items-center text-sky-600 relative">
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
          <span className="text-xs mt-1">Alerts</span>
        </Link>
        <Link to={createPageUrl('Settings')} className="flex flex-col items-center text-gray-400">
          <Settings className="w-6 h-6" />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </div>
  );
}