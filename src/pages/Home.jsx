import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, Baby, Users, Phone, BookOpen,
  Home as HomeIcon, Heart, Bell, Settings, X
} from 'lucide-react';
import BigTile from '../components/ui/BigTile';
import NotificationBanner from '../components/ui/NotificationBanner';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const profiles = await base44.entities.UserProfile.list();
    if (profiles.length > 0) {
      setProfile(profiles[0]);
    }
    
    const notifs = await base44.entities.Notification.filter({ is_read: false });
    setNotifications(notifs);
    if (notifs.length > 0) {
      setShowNotification(notifs[0]);
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

  const dismissNotification = async () => {
    if (showNotification) {
      await base44.entities.Notification.update(showNotification.id, { is_read: true });
      setShowNotification(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Redirect to onboarding if no profile
  if (!profile) {
    window.location.href = createPageUrl('Onboarding');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-pink-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold">Hello, Friend! 👋</h1>
          
          {profile.is_pregnant && pregnancyWeek && (
            <div className="mt-4 bg-white/20 backdrop-blur rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
                  <Baby className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Your pregnancy</p>
                  <p className="text-xl font-bold">Week {pregnancyWeek} of 40</p>
                </div>
              </div>
              <div className="mt-3 bg-white/20 rounded-full h-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(pregnancyWeek / 40) * 100}%` }}
                  className="bg-white rounded-full h-2"
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Notification */}
      <div className="px-6 -mt-4">
        <AnimatePresence>
          {showNotification && (
            <NotificationBanner
              notification={showNotification}
              onClose={dismissNotification}
              onAction={() => {
                dismissNotification();
                if (showNotification.action_url) {
                  window.location.href = showNotification.action_url;
                }
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Main Tiles */}
      <div className="px-6 mt-6 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link to={createPageUrl('HealthAdvice')}>
            <BigTile
              icon={Stethoscope}
              title="Health Advice"
              subtitle="Get help with symptoms"
              color="green"
            />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to={createPageUrl('Pregnancy')}>
            <BigTile
              icon={Baby}
              title="Pregnancy & Baby"
              subtitle={pregnancyWeek ? `Week ${pregnancyWeek} tips available` : 'Track your journey'}
              color="pink"
              badge={pregnancyWeek ? 'NEW' : undefined}
            />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link to={createPageUrl('ChildHealth')}>
            <BigTile
              icon={Users}
              title="Child Health"
              subtitle="Care for your children"
              color="purple"
            />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to={createPageUrl('Telemedicine')}>
            <BigTile
              icon={Phone}
              title="Talk to a Doctor"
              subtitle="Chat, audio or video call"
              color="blue"
            />
          </Link>
        </motion.div>

        {/* Learn & Watch Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            to={createPageUrl('Learn')}
            className="flex items-center justify-center gap-2 text-sky-600 font-medium py-4"
          >
            <BookOpen className="w-5 h-5" />
            Learn & Watch
          </Link>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-around items-center">
        <Link to={createPageUrl('Home')} className="flex flex-col items-center text-sky-600">
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to={createPageUrl('MyHealth')} className="flex flex-col items-center text-gray-400">
          <Heart className="w-6 h-6" />
          <span className="text-xs mt-1">My Health</span>
        </Link>
        <Link to={createPageUrl('Notifications')} className="flex flex-col items-center text-gray-400 relative">
          <Bell className="w-6 h-6" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-white text-xs flex items-center justify-center">
              {notifications.length}
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