import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Thermometer, Droplet, Wind, AlertTriangle, MessageCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const symptomFlows = {
  fever: {
    icon: '🌡️',
    title: 'Fever',
    color: 'from-rose-400 to-orange-500',
    questions: [
      {
        id: 'age',
        text: 'How old is your child?',
        textBn: 'আপনার সন্তানের বয়স কত?',
        options: [
          { value: '0-2m', label: '0–2 months', labelBn: '০-২ মাস' },
          { value: '2-12m', label: '2–12 months', labelBn: '২-১২ মাস' },
          { value: '1-5y', label: '1–5 years', labelBn: '১-৫ বছর' },
          { value: '5+y', label: 'More than 5 years', labelBn: '৫ বছরের বেশি' }
        ]
      },
      {
        id: 'duration',
        text: 'How many days has the fever been?',
        textBn: 'জ্বর কতদিন ধরে আছে?',
        options: [
          { value: '1d', label: '1 day', labelBn: '১ দিন' },
          { value: '2-3d', label: '2–3 days', labelBn: '২-৩ দিন' },
          { value: '3+d', label: 'More than 3 days', labelBn: '৩ দিনের বেশি' }
        ]
      },
      {
        id: 'danger',
        text: 'Does your child have any of these danger signs?',
        textBn: 'আপনার সন্তানের কি এই বিপদসংকেতগুলোর কোনটি আছে?',
        options: [
          { value: 'breathing', label: 'Breathing very fast or struggling', labelBn: 'খুব দ্রুত শ্বাস বা শ্বাসকষ্ট', danger: true },
          { value: 'sleepy', label: 'Very sleepy, difficult to wake', labelBn: 'খুব ঘুম ঘুম, জাগাতে কষ্ট', danger: true },
          { value: 'notdrinking', label: 'Cannot drink or breastfeed', labelBn: 'পান বা বুকের দুধ খেতে পারছে না', danger: true },
          { value: 'fits', label: 'Has convulsions (fits)', labelBn: 'খিঁচুনি (ফিট) হয়েছে', danger: true },
          { value: 'none', label: 'None of these', labelBn: 'এর কোনটিই নয়' }
        ]
      }
    ]
  },
  diarrhea: {
    icon: '💧',
    title: 'Diarrhea',
    color: 'from-cyan-400 to-blue-500',
    questions: [
      {
        id: 'duration',
        text: 'How many days has the diarrhea been?',
        textBn: 'ডায়রিয়া কতদিন ধরে আছে?',
        options: [
          { value: '1d', label: '1 day', labelBn: '১ দিন' },
          { value: '2-3d', label: '2–3 days', labelBn: '২-৩ দিন' },
          { value: '3+d', label: 'More than 3 days', labelBn: '৩ দিনের বেশি' }
        ]
      },
      {
        id: 'blood',
        text: 'Is there blood in the stool?',
        textBn: 'মলে রক্ত আছে কি?',
        options: [
          { value: 'yes', label: 'Yes', labelBn: 'হ্যাঁ', danger: true },
          { value: 'no', label: 'No', labelBn: 'না' }
        ]
      },
      {
        id: 'drinking',
        text: 'Is the child drinking and breastfeeding?',
        textBn: 'শিশু কি পানি এবং বুকের দুধ খাচ্ছে?',
        options: [
          { value: 'yes', label: 'Yes, drinking well', labelBn: 'হ্যাঁ, ভালোভাবে খাচ্ছে' },
          { value: 'little', label: 'Drinking a little', labelBn: 'সামান্য খাচ্ছে' },
          { value: 'no', label: 'Not drinking at all', labelBn: 'একদমই খাচ্ছে না', danger: true }
        ]
      },
      {
        id: 'dehydration',
        text: 'Does the child have these signs?',
        textBn: 'শিশুর কি এই লক্ষণগুলো আছে?',
        options: [
          { value: 'sunken', label: 'Sunken eyes or dry mouth', labelBn: 'চোখ কোটরাগত বা মুখ শুকনো', danger: true },
          { value: 'sleepy', label: 'Very sleepy and weak', labelBn: 'খুব ঘুম ঘুম ও দুর্বল', danger: true },
          { value: 'none', label: 'None of these', labelBn: 'এর কোনটিই নয়' }
        ]
      }
    ]
  },
  cough: {
    icon: '🫁',
    title: 'Cough/Breathing',
    color: 'from-purple-400 to-violet-500',
    questions: [
      {
        id: 'duration',
        text: 'How long has the cough been?',
        textBn: 'কাশি কতদিন ধরে আছে?',
        options: [
          { value: '1-2d', label: '1–2 days', labelBn: '১-২ দিন' },
          { value: '3-7d', label: '3–7 days', labelBn: '৩-৭ দিন' },
          { value: '7+d', label: 'More than a week', labelBn: 'এক সপ্তাহের বেশি' }
        ]
      },
      {
        id: 'breathing',
        text: 'Is the child breathing fast or with difficulty?',
        textBn: 'শিশু কি দ্রুত বা কষ্ট করে শ্বাস নিচ্ছে?',
        options: [
          { value: 'yes', label: 'Yes, breathing very fast', labelBn: 'হ্যাঁ, খুব দ্রুত শ্বাস', danger: true },
          { value: 'chest', label: 'Chest going in deeply', labelBn: 'বুক ভিতরে ঢুকে যাচ্ছে', danger: true },
          { value: 'no', label: 'No, breathing normally', labelBn: 'না, স্বাভাবিকভাবে শ্বাস' }
        ]
      },
      {
        id: 'feeding',
        text: 'Can the child eat and drink normally?',
        textBn: 'শিশু কি স্বাভাবিকভাবে খেতে পারছে?',
        options: [
          { value: 'yes', label: 'Yes', labelBn: 'হ্যাঁ' },
          { value: 'difficult', label: 'Difficulty eating or drinking', labelBn: 'খেতে কষ্ট হচ্ছে', danger: true }
        ]
      }
    ]
  }
};

export default function IllnessSymptoms({ child, onBack }) {
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleSymptomSelect = (flowKey) => {
    setSelectedFlow(flowKey);
    setStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
    const flow = symptomFlows[selectedFlow];
    
    if (step < flow.questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const hasDangerSigns = () => {
    const flow = symptomFlows[selectedFlow];
    return flow.questions.some(q => {
      const answer = answers[q.id];
      const option = q.options.find(opt => opt.value === answer);
      return option?.danger;
    });
  };

  if (!selectedFlow) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white pb-24">
        <div className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={onBack} className="p-2 -ml-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Illness & Symptoms</h1>
          </div>
          <p className="text-white/80">What is {child.name} experiencing?</p>
        </div>

        <div className="px-6 -mt-4 space-y-3">
          {Object.entries(symptomFlows).map(([key, flow], index) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSymptomSelect(key)}
              className="w-full bg-white rounded-2xl p-5 shadow-lg text-left"
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${flow.color} rounded-2xl flex items-center justify-center text-2xl`}>
                  {flow.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{flow.title}</h3>
                  <p className="text-gray-500 text-sm">Check symptoms</p>
                </div>
                <ChevronLeft className="w-6 h-6 text-gray-400 rotate-180" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  const flow = symptomFlows[selectedFlow];
  const currentQuestion = flow.questions[step];

  if (showResult) {
    const isDanger = hasDangerSigns();
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white pb-24">
        <div className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => setSelectedFlow(null)} className="p-2 -ml-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Assessment Result</h1>
          </div>
        </div>

        <div className="px-6 -mt-4">
          {isDanger ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500 text-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <AlertTriangle className="w-12 h-12" />
                <h3 className="text-xl font-bold">Seek Care Immediately</h3>
              </div>
              <p className="text-white/90 mb-4">
                Based on your answers, this can be serious. Please go to the nearest clinic or hospital immediately if possible.
              </p>
              <p className="text-white/90" style={{ fontFamily: 'system-ui' }}>
                আপনার উত্তরের ভিত্তিতে এটি গুরুতর হতে পারে। যত দ্রুত সম্ভব নিকটতম ক্লিনিক বা হাসপাতালে যান।
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Home Care Possible</h3>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="bg-emerald-50 rounded-xl p-4">
                  <p className="text-gray-700 mb-1">✓ Keep child lightly dressed and comfortable</p>
                  <p className="text-gray-600" style={{ fontFamily: 'system-ui' }}>হালকা পোশাক পরান ও আরামদায়ক রাখুন</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4">
                  <p className="text-gray-700 mb-1">✓ Offer plenty of fluids (water, breastmilk, ORS)</p>
                  <p className="text-gray-600" style={{ fontFamily: 'system-ui' }}>পর্যাপ্ত তরল দিন (পানি, বুকের দুধ, ওআরএস)</p>
                </div>
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm">
                  If symptoms worsen or last more than 2–3 days, please see a health worker.
                </p>
              </div>
            </motion.div>
          )}

          <div className="mt-6 space-y-3">
            <Link to={createPageUrl('Telemedicine')}>
              <Button className="w-full h-14 bg-violet-500 hover:bg-violet-600">
                <MessageCircle className="w-5 h-5 mr-2" />
                Talk to a MedGlobal Doctor
              </Button>
            </Link>
            <Button onClick={() => setSelectedFlow(null)} variant="outline" className="w-full h-14">
              Check Another Symptom
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white pb-24">
      <div className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => setSelectedFlow(null)} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{flow.title} Check</h1>
        </div>
        <div className="flex gap-2">
          {flow.questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </div>

      <div className="px-6 -mt-4">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-2">{currentQuestion.text}</h3>
          <p className="text-gray-600 mb-6" style={{ fontFamily: 'system-ui' }}>
            {currentQuestion.textBn}
          </p>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                  option.danger
                    ? 'bg-rose-50 border-rose-200 hover:border-rose-400'
                    : 'bg-gray-50 border-gray-200 hover:border-violet-400'
                }`}
              >
                <p className="font-medium text-gray-800">{option.label}</p>
                <p className="text-gray-700 text-sm" style={{ fontFamily: 'system-ui' }}>
                  {option.labelBn}
                </p>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}