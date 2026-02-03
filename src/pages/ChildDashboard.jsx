import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { 
  ChevronLeft, TrendingUp, Activity, Syringe, BookOpen
} from 'lucide-react';
import GrowthNutrition from '@/components/child/GrowthNutrition';
import IllnessSymptoms from '@/components/child/IllnessSymptoms';
import VaccinesCalendar from '@/components/child/VaccinesCalendar';

export default function ChildDashboard() {
  const [searchParams] = useSearchParams();
  const childId = searchParams.get('childId');
  const [child, setChild] = useState(null);
  const [view, setView] = useState('main');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChild();
  }, [childId]);

  const loadChild = async () => {
    const children = await base44.entities.ChildProfile.list();
    const foundChild = children.find(c => c.id === childId);
    setChild(foundChild);
    setLoading(false);
  };

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + today.getMonth() - birth.getMonth();
    const ageInDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    
    if (ageInMonths < 1) {
      return `${ageInDays} days old`;
    } else if (ageInMonths < 12) {
      return `${ageInMonths} months old`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      return `${years} year${years !== 1 ? 's' : ''} old`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-violet-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!child) {
    return (
      <div className="min-h-screen bg-violet-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Child not found</p>
          <Link to={createPageUrl('ChildHealth')} className="text-violet-600">
            Go back
          </Link>
        </div>
      </div>
    );
  }

  if (view === 'growth') {
    return <GrowthNutrition child={child} onBack={() => setView('main')} />;
  }

  if (view === 'illness') {
    return <IllnessSymptoms child={child} onBack={() => setView('main')} />;
  }

  if (view === 'vaccines') {
    return <VaccinesCalendar child={child} onBack={() => setView('main')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pb-8">
      <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-4 mb-6">
          <Link to={createPageUrl('ChildHealth')} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">{child.name}</h1>
        </div>

        <div className="bg-white/20 backdrop-blur rounded-2xl p-5">
          <div className="flex items-center gap-4">
            <div className="text-5xl">
              {child.gender === 'female' ? '👧' : child.gender === 'male' ? '👦' : '👶'}
            </div>
            <div>
              <p className="text-white/80 text-sm">Today, {child.name} is</p>
              <p className="text-2xl font-bold">{calculateAge(child.birth_date)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tiles */}
      <div className="px-6 -mt-4 space-y-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setView('growth')}
          className="w-full bg-white rounded-2xl p-5 shadow-lg text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800">Growth & Nutrition</h3>
              <p className="text-gray-500 text-sm">Track weight, height & feeding</p>
            </div>
            <ChevronLeft className="w-6 h-6 text-gray-400 rotate-180" />
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => setView('illness')}
          className="w-full bg-white rounded-2xl p-5 shadow-lg text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-orange-500 rounded-2xl flex items-center justify-center">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800">Illness & Symptoms</h3>
              <p className="text-gray-500 text-sm">Check fever, cough, diarrhea</p>
            </div>
            <ChevronLeft className="w-6 h-6 text-gray-400 rotate-180" />
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => setView('vaccines')}
          className="w-full bg-white rounded-2xl p-5 shadow-lg text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center">
              <Syringe className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800">Vaccines & Calendar</h3>
              <p className="text-gray-500 text-sm">Track immunization schedule</p>
            </div>
            <ChevronLeft className="w-6 h-6 text-gray-400 rotate-180" />
          </div>
        </motion.button>

        {/* Learn Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border-2 border-amber-200"
        >
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-6 h-6 text-amber-600" />
            <h3 className="font-bold text-gray-800">Learn More</h3>
          </div>
          <Link to={createPageUrl('Learn')}>
            <div className="bg-white rounded-xl p-3 text-sm">
              <p className="font-medium text-gray-800">📚 Child Health Articles</p>
              <p className="text-gray-500">Fever, nutrition, sleep & more</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}