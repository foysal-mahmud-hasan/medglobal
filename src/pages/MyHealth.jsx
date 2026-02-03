import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ChevronLeft, Baby, Calendar, Edit2, User,
  Home as HomeIcon, Heart, Bell, Settings
} from 'lucide-react';
import { Button } from '../components/ui/button';

export default function MyHealth() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const profiles = await base44.entities.UserProfile.list();
    if (profiles.length > 0) {
      setProfile(profiles[0]);
    }
    setLoading(false);
  };

  const calculatePregnancyWeek = () => {
    if (!profile?.last_menstrual_period) return null;
    const lmp = new Date(profile.last_menstrual_period);
    const today = new Date();
    const diffTime = Math.abs(today - lmp);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    return weeks > 0 && weeks <= 42 ? weeks : null;
  };

  const pregnancyWeek = calculatePregnancyWeek();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-4 mb-4">
          <Link to={createPageUrl('Home')} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">My Health</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/30 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg">My Profile</p>
              <p className="text-white/80 text-sm">
                {profile?.country || 'Location not set'} • {profile?.age_group?.replace('_', '-') || 'Age not set'}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <Edit2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Health Summary */}
      <div className="px-6 -mt-4 space-y-4">
        {/* Pregnancy Status */}
        {profile?.is_pregnant && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-lg border-2 border-pink-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center">
                <Baby className="w-7 h-7 text-pink-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">Pregnancy</h3>
                {pregnancyWeek ? (
                  <>
                    <p className="text-pink-600 font-semibold">Week {pregnancyWeek}</p>
                    {profile.due_date && (
                      <p className="text-gray-500 text-sm">
                        Due: {new Date(profile.due_date).toLocaleDateString()}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500 text-sm">Add your last period date</p>
                )}
              </div>
              <Link 
                to={createPageUrl('Pregnancy')}
                className="text-pink-600 font-medium text-sm"
              >
                View →
              </Link>
            </div>
          </motion.div>
        )}

        {/* Health Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-sm"
        >
          <h3 className="font-bold text-gray-800 mb-4">Your Health Categories</h3>
          <div className="flex flex-wrap gap-2">
            {profile?.user_type?.map(type => (
              <span 
                key={type}
                className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 capitalize"
              >
                {type.replace('_', ' ')}
              </span>
            )) || (
              <p className="text-gray-500">No categories selected</p>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 shadow-sm"
        >
          <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link 
              to={createPageUrl('HealthAdvice')}
              className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 text-center"
            >
              <span className="text-2xl">🩺</span>
              <p className="font-medium text-emerald-700 mt-2 text-sm">Check Symptoms</p>
            </Link>
            <Link 
              to={createPageUrl('Telemedicine')}
              className="bg-sky-50 border-2 border-sky-200 rounded-xl p-4 text-center"
            >
              <span className="text-2xl">👩‍⚕️</span>
              <p className="font-medium text-sky-700 mt-2 text-sm">Talk to Doctor</p>
            </Link>
            <Link 
              to={createPageUrl('MyPrescriptions')}
              className="bg-violet-50 border-2 border-violet-200 rounded-xl p-4 text-center"
            >
              <span className="text-2xl">📄</span>
              <p className="font-medium text-violet-700 mt-2 text-sm">My Prescriptions</p>
            </Link>
            <Link 
              to={createPageUrl('PregnancyCalendar')}
              className="bg-pink-50 border-2 border-pink-200 rounded-xl p-4 text-center"
            >
              <span className="text-2xl">📅</span>
              <p className="font-medium text-pink-700 mt-2 text-sm">Calendar</p>
            </Link>
          </div>
        </motion.div>

        {/* Settings Quick Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            to={createPageUrl('Settings')}
            className="flex items-center justify-between bg-white rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Settings</h3>
                <p className="text-gray-500 text-sm">Language, notifications & more</p>
              </div>
            </div>
            <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
          </Link>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-around items-center">
        <Link to={createPageUrl('Home')} className="flex flex-col items-center text-gray-400">
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to={createPageUrl('MyHealth')} className="flex flex-col items-center text-rose-500">
          <Heart className="w-6 h-6" />
          <span className="text-xs mt-1">My Health</span>
        </Link>
        <Link to={createPageUrl('Notifications')} className="flex flex-col items-center text-gray-400">
          <Bell className="w-6 h-6" />
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