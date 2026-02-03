import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ChevronLeft, ChevronRight, Globe, Bell, Moon, Shield, HelpCircle, LogOut,
  Home as HomeIcon, Heart, Settings as SettingsIcon
} from 'lucide-react';
import { Switch } from '../components/ui/switch';

export default function Settings() {
  const [profile, setProfile] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const profiles = await base44.entities.UserProfile.list();
    if (profiles.length > 0) {
      setProfile(profiles[0]);
      setNotificationsEnabled(profiles[0].notifications_enabled ?? true);
    }
  };

  const toggleNotifications = async (enabled) => {
    setNotificationsEnabled(enabled);
    if (profile) {
      await base44.entities.UserProfile.update(profile.id, {
        notifications_enabled: enabled
      });
    }
  };

  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        {
          icon: Globe,
          label: 'Language',
          value: profile?.preferred_language || 'English',
          color: 'bg-sky-100 text-sky-600'
        },
        {
          icon: Bell,
          label: 'Notifications',
          toggle: true,
          color: 'bg-violet-100 text-violet-600'
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & FAQ',
          color: 'bg-emerald-100 text-emerald-600'
        },
        {
          icon: Shield,
          label: 'Privacy & Terms',
          color: 'bg-amber-100 text-amber-600'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      {/* Header */}
      <div className="bg-white border-b px-6 pt-12 pb-4">
        <div className="flex items-center gap-4">
          <Link to={createPageUrl('Home')} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Settings</h1>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-5 text-white"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">👤</span>
            </div>
            <div>
              <p className="font-bold text-lg">MedGlobal User</p>
              <p className="text-white/80 text-sm">
                {profile?.country || 'Set up your profile'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Settings Sections */}
      <div className="px-6 space-y-6">
        {settingsSections.map((section, sIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sIndex * 0.1 }}
          >
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {section.title}
            </h2>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm divide-y divide-gray-100">
              {section.items.map((item, iIndex) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.label}</p>
                    {item.value && (
                      <p className="text-sm text-gray-500">{item.value}</p>
                    )}
                  </div>
                  {item.toggle ? (
                    <Switch
                      checked={notificationsEnabled}
                      onCheckedChange={toggleNotifications}
                    />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => base44.auth.logout(createPageUrl('Onboarding'))}
          className="w-full bg-rose-50 text-rose-600 rounded-2xl p-4 flex items-center justify-center gap-3 font-medium"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </motion.button>

        {/* App Info */}
        <div className="text-center py-6">
          <p className="text-gray-400 text-sm">MedGlobal Care+ v1.0.0</p>
          <p className="text-gray-400 text-xs mt-1">© 2024 MedGlobal</p>
        </div>
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
        <Link to={createPageUrl('Notifications')} className="flex flex-col items-center text-gray-400">
          <Bell className="w-6 h-6" />
          <span className="text-xs mt-1">Alerts</span>
        </Link>
        <Link to={createPageUrl('Settings')} className="flex flex-col items-center text-sky-600">
          <SettingsIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </div>
  );
}