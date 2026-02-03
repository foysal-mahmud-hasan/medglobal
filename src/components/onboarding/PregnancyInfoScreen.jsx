import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Baby, Calendar, HelpCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import ProgressSteps from '../../components/ui/ProgressSteps';

export default function PregnancyInfoScreen({ onContinue, onBack, onSkip }) {
  const [isPregnant, setIsPregnant] = useState(null);
  const [knowsLMP, setKnowsLMP] = useState(null);
  const [lmpDate, setLmpDate] = useState('');

  const handleContinue = () => {
    onContinue({
      is_pregnant: isPregnant,
      last_menstrual_period: knowsLMP ? lmpDate : null
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col"
    >
      <div className="pt-8 pb-4">
        <ProgressSteps current={2} total={4} />
      </div>

      <div className="flex-1 px-6 py-4">
        <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-200">
          <Baby className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Pregnancy Info
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Help us track your journey
        </p>

        <div className="mt-8 space-y-6">
          {/* Are you pregnant? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="font-medium text-gray-700 mb-3 text-center">
              Are you pregnant now?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setIsPregnant(true)}
                className={`flex-1 max-w-32 h-16 rounded-2xl font-semibold text-lg transition-all ${
                  isPregnant === true 
                    ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' 
                    : 'bg-white border-2 border-gray-200 text-gray-700'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setIsPregnant(false)}
                className={`flex-1 max-w-32 h-16 rounded-2xl font-semibold text-lg transition-all ${
                  isPregnant === false 
                    ? 'bg-gray-500 text-white shadow-lg' 
                    : 'bg-white border-2 border-gray-200 text-gray-700'
                }`}
              >
                No
              </button>
            </div>
          </motion.div>

          {/* LMP Question */}
          {isPregnant === true && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <p className="font-medium text-gray-700 text-center">
                Do you know when your last period started?
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setKnowsLMP(true)}
                  className={`flex-1 max-w-32 h-14 rounded-2xl font-semibold transition-all ${
                    knowsLMP === true 
                      ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' 
                      : 'bg-white border-2 border-gray-200 text-gray-700'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setKnowsLMP(false)}
                  className={`flex-1 max-w-32 h-14 rounded-2xl font-semibold transition-all flex items-center justify-center gap-1 ${
                    knowsLMP === false 
                      ? 'bg-gray-500 text-white shadow-lg' 
                      : 'bg-white border-2 border-gray-200 text-gray-700'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  Not sure
                </button>
              </div>

              {knowsLMP === true && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-4 border-2 border-pink-200"
                >
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 text-pink-500" />
                    First day of last period
                  </label>
                  <Input
                    type="date"
                    value={lmpDate}
                    onChange={(e) => setLmpDate(e.target.value)}
                    className="h-12 rounded-xl"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <div className="p-6 pb-8 space-y-3">
        <Button 
          onClick={handleContinue}
          disabled={isPregnant === null}
          className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-200 disabled:opacity-50"
        >
          Continue
        </Button>
        <Button 
          onClick={onBack}
          variant="ghost"
          className="w-full h-12 text-gray-500"
        >
          Go Back
        </Button>
      </div>
    </motion.div>
  );
}