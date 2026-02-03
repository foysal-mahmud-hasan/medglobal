import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ChevronLeft, Baby, Calendar, ListChecks, AlertTriangle,
  BookOpen, Volume2, Home as HomeIcon, Heart, Bell, Settings
} from 'lucide-react';
import { Button } from '../components/ui/button';
import DosAndDontsCarousel from '@/components/pregnancy/DosAndDontsCarousel';
import SymptomChecker from '@/components/pregnancy/SymptomChecker';

const babySize = [
  { week: 4, size: 'Poppy seed', emoji: '🌱' },
  { week: 8, size: 'Raspberry', emoji: '🫐' },
  { week: 12, size: 'Lime', emoji: '🍋' },
  { week: 16, size: 'Avocado', emoji: '🥑' },
  { week: 20, size: 'Banana', emoji: '🍌' },
  { week: 24, size: 'Corn', emoji: '🌽' },
  { week: 28, size: 'Eggplant', emoji: '🍆' },
  { week: 32, size: 'Coconut', emoji: '🥥' },
  { week: 36, size: 'Papaya', emoji: '🥭' },
  { week: 40, size: 'Watermelon', emoji: '🍉' }
];

export default function Pregnancy() {
  const [profile, setProfile] = useState(null);
  const [view, setView] = useState('main'); // main, dos, symptoms
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

  const getTrimester = (week) => {
    if (week <= 13) return 1;
    if (week <= 26) return 2;
    return 3;
  };

  const getBabySize = (week) => {
    const closest = babySize.reduce((prev, curr) => 
      Math.abs(curr.week - week) < Math.abs(prev.week - week) ? curr : prev
    );
    return closest;
  };

  const pregnancyWeek = calculatePregnancyWeek();
  const trimester = pregnancyWeek ? getTrimester(pregnancyWeek) : 1;
  const babySizeInfo = pregnancyWeek ? getBabySize(pregnancyWeek) : babySize[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (view === 'dos') {
    return <DosAndDontsCarousel trimester={trimester} onClose={() => setView('main')} />;
  }

  if (view === 'symptoms') {
    return <SymptomChecker onClose={() => setView('main')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-4 mb-6">
          <Link to={createPageUrl('Home')} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Pregnancy & Baby</h1>
        </div>

        {pregnancyWeek ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/20 backdrop-blur rounded-2xl p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Your baby is now</p>
                <p className="text-3xl font-bold mt-1">Week {pregnancyWeek}</p>
                <p className="text-white/80 text-sm mt-1">Trimester {trimester}</p>
              </div>
              <div className="text-center">
                <div className="text-5xl">{babySizeInfo.emoji}</div>
                <p className="text-white/80 text-xs mt-1">Size of a {babySizeInfo.size}</p>
              </div>
            </div>

            <div className="mt-4 bg-white/20 rounded-full h-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(pregnancyWeek / 40) * 100}%` }}
                className="bg-white rounded-full h-3"
              />
            </div>
            <p className="text-white/80 text-xs mt-2 text-center">
              {40 - pregnancyWeek} weeks until your due date
            </p>
          </motion.div>
        ) : (
          <div className="bg-white/20 backdrop-blur rounded-2xl p-5 text-center">
            <Baby className="w-12 h-12 mx-auto mb-3" />
            <p className="font-medium">Track your pregnancy</p>
            <p className="text-white/80 text-sm mt-1">Add your last period date to get started</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setView('dos')}
              className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-2xl p-4 text-left"
            >
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center mb-3">
                <ListChecks className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-800">Do's & Don'ts</h3>
              <p className="text-sm text-gray-500 mt-1">Week {pregnancyWeek || 8} guide</p>
            </button>

            <button 
              onClick={() => setView('symptoms')}
              className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-2xl p-4 text-left"
            >
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center mb-3">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-800">Check Symptoms</h3>
              <p className="text-sm text-gray-500 mt-1">How are you feeling?</p>
            </button>

            <Link to={createPageUrl('PregnancyCalendar')} className="col-span-2">
              <div className="bg-gradient-to-br from-pink-50 to-rose-100 border-2 border-pink-200 rounded-2xl p-4 text-left">
                <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-800">Pregnancy Calendar</h3>
                <p className="text-sm text-gray-500 mt-1">Check-ups & milestones</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* This Week's Tips */}
      <div className="px-6 mt-6">
        <h2 className="font-bold text-lg text-gray-800 mb-4">This Week's Tips</h2>
        
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4"
          >
            <div className="text-3xl">💊</div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">Take your vitamins</h3>
              <p className="text-sm text-gray-500">Folic acid helps baby's brain</p>
            </div>
            <button className="p-2 text-gray-400">
              <Volume2 className="w-5 h-5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4"
          >
            <div className="text-3xl">👩‍⚕️</div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">Visit your doctor</h3>
              <p className="text-sm text-gray-500">Schedule your next check-up</p>
            </div>
            <button className="p-2 text-gray-400">
              <Volume2 className="w-5 h-5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4"
          >
            <div className="text-3xl">🥗</div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">Eat iron-rich foods</h3>
              <p className="text-sm text-gray-500">Spinach, beans, meat</p>
            </div>
            <button className="p-2 text-gray-400">
              <Volume2 className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Danger Signs Banner */}
      <div className="px-6 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-4 text-white"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Know the Danger Signs</h3>
              <p className="text-white/80 text-sm">Learn when to seek help immediately</p>
            </div>
          </div>
          <Button 
            onClick={() => setView('symptoms')}
            className="w-full mt-4 bg-white text-rose-600 hover:bg-white/90"
          >
            Check Now
          </Button>
        </motion.div>
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
        <Link to={createPageUrl('Settings')} className="flex flex-col items-center text-gray-400">
          <Settings className="w-6 h-6" />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </div>
  );
}