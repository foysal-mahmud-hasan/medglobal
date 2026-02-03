import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Phone, MapPin, X, Volume2 } from 'lucide-react';
import { Button } from '../../components/ui/button';

const dangerSigns = [
  { icon: '🩸', label: 'Heavy bleeding', id: 'bleeding' },
  { icon: '🤕', label: 'Severe headache', id: 'headache' },
  { icon: '😰', label: 'Face/hands swelling', id: 'swelling' },
  { icon: '😖', label: 'Severe belly pain', id: 'pain' },
  { icon: '🤢', label: 'Cannot keep food down', id: 'vomiting' },
  { icon: '🤒', label: 'High fever', id: 'fever' }
];

export default function DangerSignsAlert({ onClose, selectedSign }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-rose-600 z-50 flex flex-col"
    >
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/80"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl"
        >
          <AlertTriangle className="w-14 h-14 text-rose-600" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-white mb-4"
        >
          This Can Be Serious
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/90 text-lg mb-8 max-w-sm"
        >
          {selectedSign ? (
            <>You selected: <strong>{dangerSigns.find(s => s.id === selectedSign)?.label}</strong></>
          ) : (
            'If you have any of these symptoms'
          )}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl"
        >
          <p className="text-rose-700 font-bold text-xl mb-4">
            Please go to the nearest clinic or hospital NOW
          </p>

          <div className="space-y-3">
            <Button 
              className="w-full h-14 bg-rose-600 hover:bg-rose-700 text-lg font-semibold rounded-2xl"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Emergency
            </Button>
            
            <Button 
              variant="outline"
              className="w-full h-14 border-2 border-rose-200 text-rose-600 text-lg font-semibold rounded-2xl"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Find Nearest Clinic
            </Button>
          </div>
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex items-center gap-2 text-white/80"
        >
          <Volume2 className="w-5 h-5" />
          Listen to this message
        </motion.button>
      </div>

      <div className="p-6">
        <Button 
          onClick={onClose}
          variant="ghost"
          className="w-full text-white/80"
        >
          I understand, go back
        </Button>
      </div>
    </motion.div>
  );
}