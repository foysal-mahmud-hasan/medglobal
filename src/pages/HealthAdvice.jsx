import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ChevronLeft, Thermometer, Wind, Heart, Brain,
  Volume2, AlertTriangle, CheckCircle, Home as HomeIcon,
  Bell, Settings
} from 'lucide-react';
import { Button } from '../components/ui/button';

const categories = [
  { id: 'fever', icon: '🤒', label: 'Fever', color: 'from-orange-400 to-red-500' },
  { id: 'cough', icon: '😷', label: 'Cough', color: 'from-blue-400 to-blue-600' },
  { id: 'stomach', icon: '🤢', label: 'Stomach', color: 'from-green-400 to-emerald-500' },
  { id: 'women', icon: '👩', label: "Women's Health", color: 'from-pink-400 to-rose-500' },
  { id: 'mental', icon: '🧠', label: 'Mental Health', color: 'from-violet-400 to-purple-500' },
  { id: 'other', icon: '❓', label: 'Other', color: 'from-gray-400 to-gray-600' }
];

const feverQuestions = [
  {
    id: 'severity',
    question: 'How high is your fever?',
    options: [
      { icon: '🌡️', label: 'Mild (below 38°C)', value: 'mild' },
      { icon: '🔥', label: 'High (38°C or above)', value: 'high', danger: true }
    ]
  },
  {
    id: 'duration',
    question: 'How long have you had it?',
    options: [
      { icon: '1️⃣', label: '1-2 days', value: 'short' },
      { icon: '3️⃣', label: 'More than 3 days', value: 'long', danger: true }
    ]
  },
  {
    id: 'breathing',
    question: 'Any difficulty breathing?',
    options: [
      { icon: '😮‍💨', label: 'Yes, hard to breathe', value: 'yes', danger: true },
      { icon: '😊', label: 'No, breathing is fine', value: 'no' }
    ]
  }
];

export default function HealthAdvice() {
  const [view, setView] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const selectCategory = (cat) => {
    setSelectedCategory(cat);
    setView('questions');
    setCurrentQuestion(0);
    setAnswers({});
  };

  const answerQuestion = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < feverQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setView('result');
    }
  };

  const hasDangerSigns = () => {
    return Object.entries(answers).some(([key, value]) => {
      const question = feverQuestions.find(q => q.id === key);
      const option = question?.options.find(o => o.value === value);
      return option?.danger;
    });
  };

  const reset = () => {
    setView('categories');
    setSelectedCategory(null);
    setCurrentQuestion(0);
    setAnswers({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center gap-4">
          <Link to={createPageUrl('Home')} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Health Advice</h1>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'categories' && (
          <motion.div
            key="categories"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 mt-6"
          >
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
              What's bothering you?
            </h2>
            <p className="text-gray-500 text-center mb-6">
              Choose the problem area
            </p>

            <div className="grid grid-cols-2 gap-4">
              {categories.map((cat, index) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => selectCategory(cat)}
                  className="bg-white rounded-2xl p-5 shadow-sm border-2 border-gray-100 hover:border-sky-200 transition-all"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mx-auto mb-3`}>
                    <span className="text-2xl">{cat.icon}</span>
                  </div>
                  <p className="font-semibold text-gray-800">{cat.label}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="px-6 mt-6"
          >
            {/* Progress */}
            <div className="flex gap-2 mb-6">
              {feverQuestions.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full ${
                    i <= currentQuestion ? 'bg-sky-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <p className="text-sm text-gray-500 text-center mb-2">
              Question {currentQuestion + 1} of {feverQuestions.length}
            </p>

            <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
              {feverQuestions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {feverQuestions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => answerQuestion(feverQuestions[currentQuestion].id, option.value)}
                  className={`w-full p-5 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                    option.danger
                      ? 'bg-rose-50 border-rose-200 hover:border-rose-400'
                      : 'bg-white border-gray-200 hover:border-sky-400'
                  }`}
                >
                  <span className="text-3xl">{option.icon}</span>
                  <span className="font-medium text-gray-800 flex-1">{option.label}</span>
                  {option.danger && (
                    <AlertTriangle className="w-5 h-5 text-rose-500" />
                  )}
                </motion.button>
              ))}
            </div>

            <button
              onClick={reset}
              className="w-full mt-6 text-gray-500 py-3"
            >
              Start over
            </button>
          </motion.div>
        )}

        {view === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 mt-6"
          >
            {hasDangerSigns() ? (
              <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-3xl p-6 text-white text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-10 h-10 text-rose-600" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Could Be Serious</h2>
                <p className="text-white/90 mb-6">
                  Based on your answers, please see a doctor or go to a clinic as soon as you can.
                </p>
                <Button className="w-full bg-white text-rose-600 hover:bg-white/90 h-14 text-lg font-semibold rounded-2xl">
                  Find Nearest Clinic
                </Button>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-3xl p-6 text-center">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-emerald-800 mb-3">Probably Mild</h2>
                <p className="text-emerald-700 mb-6">
                  Here's what you can do at home:
                </p>

                <div className="space-y-3 text-left">
                  <div className="bg-white rounded-2xl p-4 flex items-center gap-3">
                    <span className="text-2xl">💧</span>
                    <div>
                      <p className="font-medium text-gray-800">Drink lots of water</p>
                      <p className="text-sm text-gray-500">Stay hydrated</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 flex items-center gap-3">
                    <span className="text-2xl">😴</span>
                    <div>
                      <p className="font-medium text-gray-800">Get plenty of rest</p>
                      <p className="text-sm text-gray-500">Sleep helps you heal</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 flex items-center gap-3">
                    <span className="text-2xl">🧊</span>
                    <div>
                      <p className="font-medium text-gray-800">Cool compress</p>
                      <p className="text-sm text-gray-500">Put cool cloth on forehead</p>
                    </div>
                  </div>
                </div>

                <button className="flex items-center gap-2 mx-auto mt-6 text-emerald-600">
                  <Volume2 className="w-5 h-5" />
                  Listen to advice
                </button>
              </div>
            )}

            <p className="text-center text-gray-500 text-sm mt-6 px-4">
              This is general advice only. If you feel very sick or symptoms get worse, please see a doctor.
            </p>

            <Button 
              onClick={reset}
              variant="outline"
              className="w-full mt-6 h-14 text-lg font-semibold rounded-2xl"
            >
              Check another symptom
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

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