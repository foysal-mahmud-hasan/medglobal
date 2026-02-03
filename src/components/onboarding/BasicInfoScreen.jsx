import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import ProgressSteps from '../../components/ui/ProgressSteps';

const countries = [
  'Afghanistan', 'Bangladesh', 'Egypt', 'Ethiopia', 'India', 'Indonesia', 
  'Iraq', 'Jordan', 'Kenya', 'Lebanon', 'Myanmar', 'Nigeria', 'Pakistan',
  'Palestine', 'Somalia', 'South Sudan', 'Sudan', 'Syria', 'Turkey', 
  'Uganda', 'Ukraine', 'Yemen', 'Other'
];

const ageGroups = [
  { value: 'under_18', label: 'Under 18' },
  { value: '18_25', label: '18-25 years' },
  { value: '26_35', label: '26-35 years' },
  { value: '36_45', label: '36-45 years' },
  { value: 'over_45', label: 'Over 45 years' }
];

const languages = [
  { value: 'english', label: 'English' },
  { value: 'arabic', label: 'العربية (Arabic)' },
  { value: 'french', label: 'Français (French)' },
  { value: 'spanish', label: 'Español (Spanish)' },
  { value: 'swahili', label: 'Kiswahili (Swahili)' },
  { value: 'urdu', label: 'اردو (Urdu)' }
];

export default function BasicInfoScreen({ onContinue, onBack }) {
  const [info, setInfo] = useState({
    country: '',
    age_group: '',
    preferred_language: 'english'
  });

  const isValid = info.country && info.age_group;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col"
    >
      <div className="pt-8 pb-4">
        <ProgressSteps current={1} total={4} />
      </div>

      <div className="flex-1 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Tell us about you
        </h1>
        <p className="text-gray-500 text-center mt-2">
          This helps us give better advice
        </p>

        <div className="mt-8 space-y-6">
          {/* Country */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Globe className="w-4 h-4" />
              Where do you live?
            </label>
            <Select 
              value={info.country} 
              onValueChange={(v) => setInfo({...info, country: v})}
            >
              <SelectTrigger className="h-14 rounded-2xl text-lg">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Age Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4" />
              Your age group
            </label>
            <Select 
              value={info.age_group} 
              onValueChange={(v) => setInfo({...info, age_group: v})}
            >
              <SelectTrigger className="h-14 rounded-2xl text-lg">
                <SelectValue placeholder="Select age group" />
              </SelectTrigger>
              <SelectContent>
                {ageGroups.map(a => (
                  <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Language */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              Preferred language
            </label>
            <Select 
              value={info.preferred_language} 
              onValueChange={(v) => setInfo({...info, preferred_language: v})}
            >
              <SelectTrigger className="h-14 rounded-2xl text-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map(l => (
                  <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        </div>
      </div>

      <div className="p-6 pb-8 space-y-3">
        <Button 
          onClick={() => onContinue(info)}
          disabled={!isValid}
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