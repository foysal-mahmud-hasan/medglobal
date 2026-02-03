import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, Syringe, CheckCircle, Clock } from 'lucide-react';

const vaccineSchedule = [
  {
    age: 'Birth–1 week',
    name: 'Birth Vaccines (e.g., BCG)',
    detail: 'Soon after birth, babies in many countries receive vaccines such as BCG to protect against severe infections. Ask your clinic which vaccines your baby should receive at birth.',
    notifBefore: 'If your baby is just born, ask your clinic about birth vaccines such as BCG.',
    notifDay: 'Reminder: If you have not done so, ask your health worker about BCG and other birth vaccines.'
  },
  {
    age: '6 weeks',
    name: '6-Week Vaccines',
    detail: 'Around 6 weeks old, babies often receive important vaccines to protect against serious diseases. Take your child\'s vaccination card and visit your clinic.',
    notifBefore: 'Your baby is nearing 6 weeks. Check the vaccination card and plan a clinic visit.',
    notifDay: 'Today is a good time to visit the clinic for your baby\'s 6-week vaccines.'
  },
  {
    age: '10 weeks',
    name: '10-Week Vaccines',
    detail: 'Many vaccine schedules include a 10-week dose. These repeat doses help build stronger protection. Follow your clinic\'s guidance.',
    notifBefore: 'Your baby is nearing 10 weeks. Ask your health worker about the 10-week vaccines.',
    notifDay: 'Reminder: Please check if your baby\'s 10-week vaccines are due.'
  },
  {
    age: '14 weeks',
    name: '14-Week Vaccines',
    detail: 'The 14-week visit often completes the early infant vaccine series. Keep your baby\'s card safe and bring it to the clinic.',
    notifBefore: 'Your baby is nearing 14 weeks. Check the vaccination schedule for this visit.',
    notifDay: 'Reminder: 14-week vaccines may be due now. Please check with your clinic.'
  },
  {
    age: '9 months',
    name: 'Measles Vaccine',
    detail: 'Around 9 months, many countries recommend the measles vaccine. This protects against a very serious disease.',
    notifBefore: 'Your baby is approaching 9 months. Check with your clinic about the measles vaccine.',
    notifDay: 'Today is a good time for your baby\'s 9-month measles vaccine.'
  }
];

export default function VaccinesCalendar({ child, onBack }) {
  const calculateAgeInWeeks = () => {
    const birth = new Date(child.birth_date);
    const today = new Date();
    return Math.floor((today - birth) / (1000 * 60 * 60 * 24 * 7));
  };

  const ageInWeeks = calculateAgeInWeeks();

  const getVaccineStatus = (vaccine) => {
    if (vaccine.age === 'Birth–1 week' && ageInWeeks > 1) return 'done';
    if (vaccine.age === '6 weeks' && ageInWeeks > 6) return 'done';
    if (vaccine.age === '10 weeks' && ageInWeeks > 10) return 'done';
    if (vaccine.age === '14 weeks' && ageInWeeks > 14) return 'done';
    if (vaccine.age === '9 months' && ageInWeeks > 36) return 'done';
    
    if (vaccine.age === '6 weeks' && ageInWeeks >= 5 && ageInWeeks <= 7) return 'upcoming';
    if (vaccine.age === '10 weeks' && ageInWeeks >= 9 && ageInWeeks <= 11) return 'upcoming';
    if (vaccine.age === '14 weeks' && ageInWeeks >= 13 && ageInWeeks <= 15) return 'upcoming';
    
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white pb-24">
      <div className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Vaccines & Calendar</h1>
        </div>
        <p className="text-white/80">{child.name}'s immunization schedule</p>
      </div>

      <div className="px-6 -mt-4 space-y-3">
        {vaccineSchedule.map((vaccine, index) => {
          const status = getVaccineStatus(vaccine);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-5 shadow-sm border-2 ${
                status === 'done' 
                  ? 'border-emerald-200 bg-emerald-50/30' 
                  : status === 'upcoming'
                  ? 'border-amber-200 bg-amber-50/30'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  status === 'done'
                    ? 'bg-emerald-500'
                    : status === 'upcoming'
                    ? 'bg-amber-500'
                    : 'bg-gray-300'
                }`}>
                  {status === 'done' ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : status === 'upcoming' ? (
                    <Clock className="w-6 h-6 text-white" />
                  ) : (
                    <Syringe className="w-6 h-6 text-white" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      status === 'done'
                        ? 'bg-emerald-100 text-emerald-700'
                        : status === 'upcoming'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {vaccine.age}
                    </span>
                    {status === 'done' && (
                      <span className="text-xs text-emerald-600 font-medium">✓ Completed</span>
                    )}
                    {status === 'upcoming' && (
                      <span className="text-xs text-amber-600 font-medium">⚠ Due Soon</span>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-gray-800 mb-2">{vaccine.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{vaccine.detail}</p>
                  
                  {status === 'upcoming' && (
                    <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
                      <p className="text-sm text-amber-800 font-medium">
                        📅 {vaccine.notifDay}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="px-6 mt-6">
        <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-5">
          <Calendar className="w-8 h-8 text-sky-600 mb-3" />
          <h3 className="font-bold text-gray-800 mb-2">Keep Track of Vaccines</h3>
          <p className="text-sm text-gray-600">
            Always bring your child's vaccination card to the clinic. If you're not sure about the schedule, ask your health worker.
          </p>
        </div>
      </div>
    </div>
  );
}