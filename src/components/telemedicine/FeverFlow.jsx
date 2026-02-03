import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, AlertTriangle, CheckCircle, Phone, Video, MessageCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function FeverFlow({ onComplete, onStartCall }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [messages, setMessages] = useState([]);

  const addMessage = (text, textBangla, isBot = true) => {
    setMessages(prev => [...prev, { text, textBangla, isBot }]);
  };

  const handleAnswer = (questionId, answer, answerLabel, answerLabelBangla) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    addMessage(answerLabel, answerLabelBangla, false);
    
    setTimeout(() => {
      setStep(prev => prev + 1);
    }, 500);
  };

  const flows = [
    {
      id: 'greeting',
      textEn: 'Assalamu alaikum. I\'m your MedGlobal Assistant. How can I help you today?',
      textBn: 'আসসালামু আলাইকুম। আমি আপনার মেডগ্লোবাল সহকারী। আপনাকে কীভাবে সাহায্য করতে পারি?',
      options: [
        { value: 'fever', labelEn: 'Fever', labelBn: 'জ্বর' },
        { value: 'cough', labelEn: 'Cough/Breathing', labelBn: 'কাশি/শ্বাসকষ্ট' },
        { value: 'stomach', labelEn: 'Stomach/Diarrhea', labelBn: 'পেট ব্যথা/ডায়রিয়া' },
        { value: 'pregnancy', labelEn: 'Pregnancy Concern', labelBn: 'গর্ভাবস্থা সমস্যা' }
      ]
    },
    {
      id: 'who',
      textEn: 'Is the fever in you or someone else?',
      textBn: 'জ্বর কি আপনার, নাকি অন্য কারো?',
      options: [
        { value: 'me', labelEn: 'Me', labelBn: 'আমার' },
        { value: 'child', labelEn: 'My Child', labelBn: 'আমার শিশু' },
        { value: 'other', labelEn: 'Someone Else', labelBn: 'অন্য কেউ' }
      ]
    },
    {
      id: 'duration',
      textEn: 'How many days has the fever been?',
      textBn: 'জ্বর কয়দিন ধরে?',
      options: [
        { value: '1', labelEn: '1 day', labelBn: '১ দিন' },
        { value: '2-3', labelEn: '2-3 days', labelBn: '২-৩ দিন' },
        { value: '3+', labelEn: 'More than 3 days', labelBn: '৩ দিনের বেশি', danger: true }
      ]
    },
    {
      id: 'danger',
      textEn: 'Do you have any of these danger signs?',
      textBn: 'নিচের কোন বিপদসংকেত আছে কি?',
      options: [
        { value: 'headache', labelEn: 'Severe headache', labelBn: 'তীব্র মাথাব্যথা', danger: true },
        { value: 'breathing', labelEn: 'Difficulty breathing', labelBn: 'শ্বাস নিতে কষ্ট', danger: true },
        { value: 'water', labelEn: 'Cannot drink water', labelBn: 'পানি পান করতে পারছি না', danger: true },
        { value: 'sleepy', labelEn: 'Very sleepy / confused', labelBn: 'খুব ঘুম ঘুম ভাব / বিভ্রান্ত', danger: true },
        { value: 'none', labelEn: 'None of these', labelBn: 'এর কোনটিই নয়' }
      ]
    },
    {
      id: 'symptoms',
      textEn: 'Okay. Do you also have cough, sore throat, or body pain?',
      textBn: 'ঠিক আছে। আপনার কি কাশি, গলা ব্যথা বা শরীর ব্যথা আছে?',
      options: [
        { value: 'yes', labelEn: 'Yes', labelBn: 'হ্যাঁ' },
        { value: 'no', labelEn: 'No', labelBn: 'না' }
      ]
    },
    {
      id: 'medicine',
      textEn: 'Have you taken any medicine already?',
      textBn: 'আপনি কি এর আগে কোনো ওষুধ খেয়েছেন?',
      options: [
        { value: 'yes', labelEn: 'Yes', labelBn: 'হ্যাঁ' },
        { value: 'no', labelEn: 'No', labelBn: 'না' }
      ]
    }
  ];

  const hasDangerSigns = () => {
    return answers.danger && answers.danger !== 'none';
  };

  const showDangerAlert = hasDangerSigns() && step === 4;
  const showMildAdvice = !hasDangerSigns() && step === 6;

  React.useEffect(() => {
    if (step === 0) {
      addMessage(flows[0].textEn, flows[0].textBn);
    } else if (step < flows.length && step > 0) {
      setTimeout(() => {
        addMessage(flows[step].textEn, flows[step].textBn);
      }, 300);
    } else if (showDangerAlert) {
      // Danger alert shown separately
    } else if (showMildAdvice) {
      setTimeout(() => {
        addMessage(
          'Based on your answers, this may be a mild viral fever.',
          'আপনার উত্তরের ভিত্তিতে মনে হচ্ছে এটি হালকা ভাইরাল জ্বর হতে পারে।'
        );
      }, 300);
    }
  }, [step]);

  const currentFlow = flows[step];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Messages */}
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[85%] rounded-2xl p-4 ${
                msg.isBot
                  ? 'bg-white border border-gray-200 rounded-bl-sm'
                  : 'bg-sky-500 text-white rounded-br-sm'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                {msg.textBangla && (
                  <p className="text-base leading-relaxed mt-1" style={{ fontFamily: 'system-ui' }}>
                    {msg.textBangla}
                  </p>
                )}
                {msg.isBot && (
                  <button className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                    <Volume2 className="w-3 h-3" />
                    Listen
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Danger Alert */}
        {showDangerAlert && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl p-5 text-white"
          >
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-8 h-8" />
              <div>
                <p className="font-bold text-lg">This may be serious.</p>
                <p className="text-base" style={{ fontFamily: 'system-ui' }}>এটি গুরুতর হতে পারে।</p>
              </div>
            </div>
            <p className="leading-relaxed mb-1">
              Please go to the nearest clinic or hospital now.
            </p>
            <p className="text-lg leading-relaxed" style={{ fontFamily: 'system-ui' }}>
              অনতিবিলম্বে নিকটস্থ ক্লিনিক/হাসপাতালে যান।
            </p>
            <Button 
              onClick={() => setStep(prev => prev + 1)}
              className="w-full mt-4 bg-white text-rose-600 hover:bg-white/90"
            >
              OK / ঠিক আছে
            </Button>
          </motion.div>
        )}

        {/* Mild Fever Advice */}
        {showMildAdvice && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
              <p className="font-bold text-emerald-800">Mild Fever / হালকা জ্বর</p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-3">
                <p className="text-gray-700 text-sm">Rest as much as you can.</p>
                <p className="text-gray-800" style={{ fontFamily: 'system-ui' }}>যতটা সম্ভব বিশ্রাম নিন।</p>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="text-gray-700 text-sm">Drink plenty of clean water or oral fluids.</p>
                <p className="text-gray-800" style={{ fontFamily: 'system-ui' }}>পরিষ্কার পানি বা স্যুপ/সালাইন পান করুন।</p>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="text-gray-700 text-sm">You may take paracetamol if not allergic, but do NOT take other medicines without doctor advice.</p>
                <p className="text-gray-800" style={{ fontFamily: 'system-ui' }}>অ্যালার্জি না থাকলে প্যারাসিটামল খেতে পারেন; অন্য ওষুধ ডাক্তারের পরামর্শ ছাড়া খাবেন না।</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Options */}
        {currentFlow && !showDangerAlert && !showMildAdvice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-2"
          >
            {currentFlow.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentFlow.id, option.value, option.labelEn, option.labelBn)}
                className={`p-4 rounded-2xl border-2 transition-all text-left ${
                  option.danger
                    ? 'bg-rose-50 border-rose-200 hover:border-rose-400'
                    : 'bg-gray-50 border-gray-200 hover:border-sky-400'
                }`}
              >
                <p className="font-medium text-gray-800 text-sm">{option.labelEn}</p>
                <p className="text-gray-700 mt-1" style={{ fontFamily: 'system-ui' }}>{option.labelBn}</p>
              </button>
            ))}
          </motion.div>
        )}

        {/* Doctor consultation offer */}
        {(showDangerAlert || showMildAdvice) && step >= 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border-2 border-violet-200 rounded-2xl p-5"
          >
            <p className="text-center font-medium text-gray-800 mb-1">
              Would you like to talk to a MedGlobal doctor now?
            </p>
            <p className="text-center text-gray-700 mb-4" style={{ fontFamily: 'system-ui' }}>
              আপনি কি এখন মেডগ্লোবাল ডাক্তারের সাথে কথা বলতে চান?
            </p>
            <div className="grid grid-cols-3 gap-2">
              <Button onClick={() => onStartCall('chat')} variant="outline" className="flex-col h-auto py-3">
                <MessageCircle className="w-5 h-5 mb-1" />
                <span className="text-xs">Chat</span>
              </Button>
              <Button onClick={() => onStartCall('audio')} variant="outline" className="flex-col h-auto py-3">
                <Phone className="w-5 h-5 mb-1" />
                <span className="text-xs">Audio</span>
              </Button>
              <Button onClick={() => onStartCall('video')} variant="outline" className="flex-col h-auto py-3">
                <Video className="w-5 h-5 mb-1" />
                <span className="text-xs">Video</span>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}