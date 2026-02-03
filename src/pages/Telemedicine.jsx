import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ChevronLeft, MessageCircle, Phone, Video,
  Home as HomeIcon, Heart, Bell, Settings
} from 'lucide-react';
import { Button } from '../components/ui/button';
import ChatBot from '@/components/telemedicine/ChatBot';
import FeverFlow from '@/components/telemedicine/FeverFlow';
import PregnancyFlow from '@/components/telemedicine/PregnancyFlow';
import CallScreen from '@/components/telemedicine/CallScreen';

export default function Telemedicine() {
  const [view, setView] = useState('menu'); // menu, chat, fever, pregnancy, call
  const [callType, setCallType] = useState(null);

  const startCall = (type) => {
    setCallType(type);
    setView('call');
  };

  const endCall = () => {
    setCallType(null);
    setView('menu');
  };

  if (view === 'call') {
    return <CallScreen type={callType} onEnd={endCall} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center gap-4">
          {view !== 'menu' && view !== 'call' ? (
            <button onClick={() => setView('menu')} className="p-2 -ml-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
          ) : (
            <Link to={createPageUrl('Home')} className="p-2 -ml-2">
              <ChevronLeft className="w-6 h-6" />
            </Link>
          )}
          <h1 className="text-xl font-bold">Talk to a Doctor</h1>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'menu' ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 px-6 py-8"
          >
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-sky-400 to-sky-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-sky-200">
                <MessageCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Get Free Medical Help
              </h2>
              <p className="text-gray-500 mt-2">
                Connect with MedGlobal doctors anytime
              </p>
            </div>

            <div className="space-y-4">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => setView('fever')}
                className="w-full bg-white rounded-2xl p-5 shadow-sm border-2 border-gray-100 flex items-center gap-4"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">🤒</span>
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-bold text-gray-800 text-lg">Fever Help</h3>
                  <p className="text-gray-500 text-sm">Check fever symptoms & get advice</p>
                </div>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => setView('pregnancy')}
                className="w-full bg-white rounded-2xl p-5 shadow-sm border-2 border-gray-100 flex items-center gap-4"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">🤰</span>
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-bold text-gray-800 text-lg">Pregnancy Concern</h3>
                  <p className="text-gray-500 text-sm">Get help with pregnancy worries</p>
                </div>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setView('chat')}
                className="w-full bg-white rounded-2xl p-5 shadow-sm border-2 border-gray-100 flex items-center gap-4"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-violet-400 to-violet-600 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-bold text-gray-800 text-lg">General Chat</h3>
                  <p className="text-gray-500 text-sm">Other health concerns</p>
                </div>
              </motion.button>


            </div>

            <div className="mt-8 bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
              <p className="text-amber-800 text-sm text-center">
                ⏰ Doctors usually respond within 1 hour during working hours.
              </p>
            </div>
          </motion.div>
        ) : view === 'fever' ? (
          <motion.div
            key="fever"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <FeverFlow onComplete={() => setView('menu')} onStartCall={startCall} />
          </motion.div>
        ) : view === 'pregnancy' ? (
          <motion.div
            key="pregnancy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <PregnancyFlow onComplete={() => setView('menu')} onStartCall={startCall} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <ChatBot onStartCall={startCall} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation - only show on menu */}
      {view === 'menu' && (
        <div className="bg-white border-t border-gray-100 px-6 py-3 flex justify-around items-center">
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
      )}
    </div>
  );
}