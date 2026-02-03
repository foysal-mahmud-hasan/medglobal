import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils/index.ts';
import { base44 } from '../api/base44Client.js';
import { 
  ChevronLeft, Plus, TrendingUp, Activity, Syringe, BookOpen,
  Home as HomeIcon, Heart, Bell, Settings
} from 'lucide-react';
import { Button } from '../components/ui/button.jsx';

export default function ChildHealth() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    const childProfiles = await base44.entities.ChildProfile.list();
    setChildren(childProfiles);
    setLoading(false);
  };

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + today.getMonth() - birth.getMonth();
    
    if (ageInMonths < 12) {
      return `${ageInMonths} month${ageInMonths !== 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      return `${years} year${years !== 1 ? 's' : ''}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-violet-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // No children yet - show onboarding
  if (children.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-24">
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
          <div className="flex items-center gap-4 mb-4">
            <Link to={createPageUrl('Home')} className="p-2 -ml-2">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">Child Health</h1>
          </div>
        </div>

        <div className="px-6 py-12 text-center">
          <div className="text-6xl mb-4">👶</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Add Your Child's Profile
          </h2>
          <p className="text-gray-600 mb-8">
            Track growth, vaccinations, and get health advice
          </p>
          <Link to={createPageUrl('AddChild')}>
            <Button className="h-14 px-8 text-lg rounded-2xl bg-violet-500 hover:bg-violet-600">
              <Plus className="w-5 h-5 mr-2" />
              Add Child Profile
            </Button>
          </Link>
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

  // Has children - show child selection
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-24">
      <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link to={createPageUrl('Home')} className="p-2 -ml-2">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">Child Health</h1>
          </div>
          <Link to={createPageUrl('AddChild')}>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Plus className="w-6 h-6" />
            </Button>
          </Link>
        </div>
        <p className="text-white/80">Select a child to view their health dashboard</p>
      </div>

      {/* Children List */}
      <div className="px-6 -mt-4 space-y-3">
        {children.map((child, index) => (
          <motion.div
            key={child.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={createPageUrl(`ChildDashboard?childId=${child.id}`)}>
              <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-violet-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center text-3xl">
                    {child.gender === 'female' ? '👧' : child.gender === 'male' ? '👦' : '👶'}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800">{child.name}</h3>
                    <p className="text-violet-600 font-medium">{calculateAge(child.birth_date)}</p>
                    <p className="text-gray-500 text-sm">Born {new Date(child.birth_date).toLocaleDateString()}</p>
                  </div>
                  <ChevronLeft className="w-6 h-6 text-gray-400 rotate-180" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
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