import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Users } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function WelcomeScreen({ onContinue }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-pink-50 flex flex-col"
    >
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-28 h-28 bg-gradient-to-br from-sky-400 to-sky-600 rounded-[2rem] flex items-center justify-center shadow-xl shadow-sky-200 mb-8"
        >
          <Heart className="w-14 h-14 text-white" fill="white" />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-800 text-center"
        >
          MedGlobal Care+
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 text-center mt-3 text-lg"
        >
          Free health help, anytime.
        </motion.p>

        {/* Features */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 space-y-4 w-full max-w-xs"
        >
          <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Safe & Private</h3>
              <p className="text-sm text-gray-500">Your health, your data</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Expert Doctors</h3>
              <p className="text-sm text-gray-500">Real help when you need it</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="p-6 pb-8">
        <Button 
          onClick={onContinue}
          className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 shadow-lg shadow-sky-200"
        >
          Get Started
        </Button>
      </div>
    </motion.div>
  );
}