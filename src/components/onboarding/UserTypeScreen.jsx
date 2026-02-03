import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Baby, Users, Heart, Check } from 'lucide-react';
import { Button } from '../../components/ui/button';
import ProgressSteps from '../../components/ui/ProgressSteps';

const userTypes = [
  {
    id: 'pregnancy',
    icon: Baby,
    title: 'Pregnancy & Baby',
    description: 'Track your pregnancy journey',
    color: 'from-pink-400 to-rose-500',
    bgLight: 'bg-pink-50 border-pink-200',
    bgSelected: 'bg-pink-100 border-pink-400'
  },
  {
    id: 'child_health',
    icon: Users,
    title: 'Child Health',
    description: 'Care for your children',
    color: 'from-violet-400 to-purple-500',
    bgLight: 'bg-violet-50 border-violet-200',
    bgSelected: 'bg-violet-100 border-violet-400'
  },
  {
    id: 'general_health',
    icon: Heart,
    title: 'General Health',
    description: 'Health advice for everyone',
    color: 'from-emerald-400 to-teal-500',
    bgLight: 'bg-emerald-50 border-emerald-200',
    bgSelected: 'bg-emerald-100 border-emerald-400'
  }
];

export default function UserTypeScreen({ onContinue, onBack }) {
  const [selected, setSelected] = useState([]);

  const toggleSelection = (id) => {
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col"
    >
      <div className="pt-8 pb-4">
        <ProgressSteps current={0} total={4} />
      </div>

      <div className="flex-1 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          What brings you here?
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Select all that apply to you
        </p>

        <div className="mt-8 space-y-4">
          {userTypes.map((type, index) => {
            const isSelected = selected.includes(type.id);
            const Icon = type.icon;
            
            return (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => toggleSelection(type.id)}
                className={`w-full p-5 rounded-2xl border-2 transition-all ${
                  isSelected ? type.bgSelected : type.bgLight
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center shadow-md`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-gray-800 text-lg">{type.title}</h3>
                    <p className="text-gray-500 text-sm">{type.description}</p>
                  </div>
                  
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'bg-emerald-500 border-emerald-500' 
                      : 'border-gray-300'
                  }`}>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="p-6 pb-8 space-y-3">
        <Button 
          onClick={() => onContinue(selected)}
          disabled={selected.length === 0}
          className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 shadow-lg shadow-sky-200 disabled:opacity-50"
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