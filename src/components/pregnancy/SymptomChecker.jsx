import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, AlertTriangle, CheckCircle, Volume2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import DangerSignsAlert from './DangerSignsAlert';

const symptoms = [
  { icon: '🩸', label: 'Bleeding', id: 'bleeding', danger: true },
  { icon: '🤕', label: 'Severe headache', id: 'headache', danger: true },
  { icon: '😰', label: 'Face/hands swelling', id: 'swelling', danger: true },
  { icon: '😖', label: 'Severe belly pain', id: 'pain', danger: true },
  { icon: '🤢', label: 'Nausea/vomiting', id: 'nausea', danger: false },
  { icon: '😴', label: 'Feeling very tired', id: 'fatigue', danger: false },
  { icon: '🦵', label: 'Leg cramps', id: 'cramps', danger: false },
  { icon: '🔙', label: 'Back pain', id: 'backpain', danger: false }
];

export default function SymptomChecker({ onClose }) {
  const [selected, setSelected] = useState([]);
  const [showDanger, setShowDanger] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const toggleSymptom = (id) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const checkSymptoms = () => {
    const hasDanger = selected.some(id => 
      symptoms.find(s => s.id === id)?.danger
    );
    
    if (hasDanger) {
      setShowDanger(true);
    } else {
      setShowResult(true);
    }
  };

  if (showDanger) {
    return (
      <DangerSignsAlert 
        onClose={() => { setShowDanger(false); onClose(); }}
        selectedSign={selected.find(id => symptoms.find(s => s.id === id)?.danger)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onClose} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-bold text-lg">Check My Symptoms</h1>
        <div className="w-10" />
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="checker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Are you having any of these today?
              </h2>
              <p className="text-gray-500 mt-1">Tap all that apply</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {symptoms.map((symptom, index) => (
                <motion.button
                  key={symptom.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    selected.includes(symptom.id)
                      ? symptom.danger
                        ? 'bg-rose-100 border-rose-400'
                        : 'bg-amber-100 border-amber-400'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="text-3xl mb-2">{symptom.icon}</div>
                  <p className="text-sm font-medium text-gray-800">{symptom.label}</p>
                  {symptom.danger && (
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <AlertTriangle className="w-3 h-3 text-rose-500" />
                      <span className="text-xs text-rose-500">Urgent</span>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <Button 
                onClick={checkSymptoms}
                disabled={selected.length === 0}
                className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-50"
              >
                Check Symptoms
              </Button>

              <p className="text-center text-gray-400 text-sm">
                Selected: {selected.length} symptom{selected.length !== 1 ? 's' : ''}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6"
          >
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-6 text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-xl font-bold text-emerald-800 mb-3">
                Probably Mild Symptoms
              </h2>
              
              <p className="text-emerald-700 mb-6">
                These are common during pregnancy. Here's what you can do:
              </p>

              <div className="space-y-3 text-left">
                <div className="bg-white rounded-2xl p-4 flex items-start gap-3">
                  <span className="text-2xl">💧</span>
                  <div>
                    <p className="font-medium text-gray-800">Drink water</p>
                    <p className="text-sm text-gray-500">Stay hydrated throughout the day</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 flex items-start gap-3">
                  <span className="text-2xl">😴</span>
                  <div>
                    <p className="font-medium text-gray-800">Get rest</p>
                    <p className="text-sm text-gray-500">Your body needs extra sleep</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 flex items-start gap-3">
                  <span className="text-2xl">🍌</span>
                  <div>
                    <p className="font-medium text-gray-800">Eat small meals</p>
                    <p className="text-sm text-gray-500">Small, frequent meals help with nausea</p>
                  </div>
                </div>
              </div>

              <button className="flex items-center gap-2 mx-auto mt-6 text-emerald-600">
                <Volume2 className="w-4 h-4" />
                Listen to advice
              </button>
            </div>

            <p className="text-center text-gray-500 text-sm mt-6 px-4">
              If symptoms get worse or don't go away, please see a doctor.
            </p>

            <Button 
              onClick={onClose}
              className="w-full h-14 mt-6 text-lg font-semibold rounded-2xl"
            >
              Done
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}