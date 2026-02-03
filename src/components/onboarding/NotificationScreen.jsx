import React from 'react';
import { motion } from 'framer-motion';
import { Bell, BellOff, Baby, MessageCircle, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import ProgressSteps from '../../components/ui/ProgressSteps';

export default function NotificationScreen({ onComplete, onBack }) {
  const handleEnable = () => {
    onComplete(true);
  };

  const handleSkip = () => {
    onComplete(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gradient-to-b from-violet-50 to-white flex flex-col"
    >
      <div className="pt-8 pb-4">
        <ProgressSteps current={3} total={4} />
      </div>

      <div className="flex-1 px-6 py-4 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-24 h-24 bg-gradient-to-br from-violet-400 to-purple-500 rounded-3xl flex items-center justify-center shadow-xl shadow-violet-200 mb-8"
        >
          <Bell className="w-12 h-12 text-white" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Stay Updated
        </h1>
        <p className="text-gray-500 text-center mt-2 max-w-xs">
          Get helpful reminders and important health alerts
        </p>

        <div className="mt-8 space-y-3 w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm"
          >
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
              <Baby className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Pregnancy Updates</h3>
              <p className="text-sm text-gray-500">Weekly tips for each stage</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm"
          >
            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Doctor Messages</h3>
              <p className="text-sm text-gray-500">When doctors reply to you</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm"
          >
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Health Alerts</h3>
              <p className="text-sm text-gray-500">Important safety reminders</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="p-6 pb-8 space-y-3">
        <Button 
          onClick={handleEnable}
          className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 shadow-lg shadow-violet-200"
        >
          <Bell className="w-5 h-5 mr-2" />
          Enable Notifications
        </Button>
        <Button 
          onClick={handleSkip}
          variant="ghost"
          className="w-full h-12 text-gray-500"
        >
          <BellOff className="w-4 h-4 mr-2" />
          Maybe Later
        </Button>
      </div>
    </motion.div>
  );
}