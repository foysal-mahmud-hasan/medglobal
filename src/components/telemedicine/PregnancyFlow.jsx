import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, AlertTriangle, CheckCircle, Phone, Video, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';

const TrimesterCards = ({ trimester }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tab, setTab] = useState('do');

  const trimesterData = {
    1: {
      dos: [
        { icon: '💧', titleEn: 'Drink plenty of clean water.', titleBn: 'পর্যাপ্ত পরিমাণে পরিষ্কার পানি পান করুন।' },
        { icon: '🥗', titleEn: 'Eat fresh vegetables & fruits.', titleBn: 'তাজা সবজি ও ফল খেতে হবে।' },
        { icon: '😴', titleEn: 'Rest when tired.', titleBn: 'ক্লান্ত লাগলে বিশ্রাম নিন।' }
      ],
      donts: [
        { icon: '🚬', titleEn: 'Don\'t smoke or drink alcohol.', titleBn: 'সিগারেট বা মদ্যপান করবেন না।' },
        { icon: '💊', titleEn: 'Don\'t take medicine without doctor.', titleBn: 'ডাক্তারের পরামর্শ ছাড়া ওষুধ খাবেন না।' },
        { icon: '🏋️', titleEn: 'Don\'t lift heavy things.', titleBn: 'ভারী কিছু তুলবেন না।' }
      ]
    },
    2: {
      dos: [
        { icon: '👩‍⚕️', titleEn: 'Continue ANC check-ups.', titleBn: 'নিয়মিত ANC চেক-আপ চালিয়ে যান।' },
        { icon: '🍛', titleEn: 'Eat rice, dal, vegetables, protein.', titleBn: 'ভাত, ডাল, সবজি ও প্রোটিন খান।' },
        { icon: '💧', titleEn: 'Drink clean water daily.', titleBn: 'দিনজুড়ে পরিষ্কার পানি পান করুন।' }
      ],
      donts: [
        { icon: '🏋️', titleEn: 'Don\'t lift heavy loads.', titleBn: 'ভারী বোঝা তুলবেন না।' },
        { icon: '🧍‍♀️', titleEn: 'Don\'t stand too long.', titleBn: 'অনেকক্ষণ দাঁড়িয়ে থাকবেন না।' },
        { icon: '🍔', titleEn: 'Avoid oily junk food.', titleBn: 'তেল-মশলাদার জাঙ্ক ফুড এড়িয়ে চলুন।' }
      ]
    },
    3: {
      dos: [
        { icon: '📅', titleEn: 'Go for all ANC check-ups.', titleBn: 'সব ANC চেক-আপ নিয়মিত করুন।' },
        { icon: '👶', titleEn: 'Count baby kicks daily.', titleBn: 'বাচ্চার নড়াচড়া/কিক লক্ষ্য করুন।' },
        { icon: '🎒', titleEn: 'Keep delivery bag ready.', titleBn: 'প্রসূতি ব্যাগ প্রস্তুত রাখুন।' }
      ],
      donts: [
        { icon: '👶', titleEn: 'Don\'t ignore reduced movements.', titleBn: 'নড়াচড়া কম হলে অবহেলা করবেন না।' },
        { icon: '🩸', titleEn: 'Don\'t wait with heavy bleeding.', titleBn: 'রক্তপাত হলে বাড়িতে বসে থাকবেন না।' },
        { icon: '🚌', titleEn: 'Avoid long travel.', titleBn: 'দীর্ঘ ভ্রমণ এড়িয়ে চলুন।' }
      ]
    }
  };

  const cards = tab === 'do' ? trimesterData[trimester]?.dos || [] : trimesterData[trimester]?.donts || [];
  const currentCard = cards[currentIndex];

  const nextCard = () => setCurrentIndex((prev) => (prev + 1) % cards.length);
  const prevCard = () => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);

  if (!currentCard) return null;

  return (
    <div className="bg-white rounded-2xl p-4 border-2 border-gray-200">
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => { setTab('do'); setCurrentIndex(0); }}
          className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
            tab === 'do' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          ✓ Do
        </button>
        <button
          onClick={() => { setTab('dont'); setCurrentIndex(0); }}
          className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
            tab === 'dont' ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          ✗ Don't
        </button>
      </div>

      <div className="flex justify-center gap-1 mb-3">
        {cards.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${
              i === currentIndex ? (tab === 'do' ? 'bg-emerald-500 w-4' : 'bg-rose-500 w-4') : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <div className="relative">
        <div className={`rounded-2xl p-5 ${
          tab === 'do' ? 'bg-emerald-50 border-2 border-emerald-200' : 'bg-rose-50 border-2 border-rose-200'
        }`}>
          <div className="text-4xl text-center mb-3">{currentCard.icon}</div>
          <p className="text-gray-800 text-center font-medium mb-1">{currentCard.titleEn}</p>
          <p className="text-gray-700 text-center" style={{ fontFamily: 'system-ui' }}>{currentCard.titleBn}</p>
          <button className="flex items-center gap-1 text-xs text-gray-500 mx-auto mt-3">
            <Volume2 className="w-3 h-3" />
            Listen
          </button>
        </div>

        <button
          onClick={prevCard}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={nextCard}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-gray-500 text-xs mt-3">
        {currentIndex + 1} of {cards.length} • Swipe to see more
      </p>
    </div>
  );
};

export default function PregnancyFlow({ onComplete, onStartCall }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [messages, setMessages] = useState([]);
  const [trimester, setTrimester] = useState(null);
  const [showCards, setShowCards] = useState(false);

  const addMessage = (text, textBangla, isBot = true) => {
    setMessages(prev => [...prev, { text, textBangla, isBot }]);
  };

  const handleAnswer = (questionId, answer, answerLabel, answerLabelBangla, option) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    addMessage(answerLabel, answerLabelBangla, false);
    
    // Determine trimester based on duration answer
    if (questionId === 'duration' && option?.tri) {
      setTrimester(option.tri);
    }
    
    setTimeout(() => {
      setStep(prev => prev + 1);
    }, 500);
  };

  const flows = [
    {
      id: 'pregnant',
      textEn: 'Are you currently pregnant, sister?',
      textBn: 'আপনি কি এখন গর্ভবতী, আপা?',
      options: [
        { value: 'yes', labelEn: 'Yes', labelBn: 'হ্যাঁ' },
        { value: 'no', labelEn: 'No', labelBn: 'না' },
        { value: 'not_sure', labelEn: 'Not sure', labelBn: 'নিশ্চিত নই' }
      ]
    },
    {
      id: 'duration',
      textEn: 'Which week or month are you in?',
      textBn: 'আপনার গর্ভধারণের কয় সপ্তাহ/মাস চলছে?',
      options: [
        { value: '1-12', labelEn: '1-12 weeks (1st trimester)', labelBn: '১-১২ সপ্তাহ (১ম ত্রৈমাসিক)', tri: 1 },
        { value: '13-27', labelEn: '13-27 weeks (2nd trimester)', labelBn: '১৩-২৭ সপ্তাহ (২য় ত্রৈমাসিক)', tri: 2 },
        { value: '28+', labelEn: '28+ weeks (3rd trimester)', labelBn: '২৮+ সপ্তাহ (৩য় ত্রৈমাসিক)', tri: 3 },
        { value: 'not_sure', labelEn: 'Not sure', labelBn: 'নিশ্চিত নই', tri: 1 }
      ]
    },
    {
      id: 'concern',
      textEn: 'What is worrying you today?',
      textBn: 'আজ আপনাকে কোন সমস্যায় চিন্তিত করছে?',
      options: [
        { value: 'pain', labelEn: 'Abdominal pain', labelBn: 'পেট ব্যথা' },
        { value: 'nausea', labelEn: 'Nausea/vomiting', labelBn: 'বমি ভাব/বমি' },
        { value: 'bleeding', labelEn: 'Bleeding/spotting', labelBn: 'রক্তপাত', danger: true },
        { value: 'dizzy', labelEn: 'Dizziness/weakness', labelBn: 'মাথা ঘোরা/দুর্বলতা' }
      ]
    },
    {
      id: 'danger',
      textEn: 'Do you have any of these danger signs?',
      textBn: 'নিচের কোন বিপদসংকেত আছে কি?',
      options: [
        { value: 'bleeding', labelEn: 'Heavy bleeding', labelBn: 'তীব্র রক্তপাত', danger: true },
        { value: 'headache', labelEn: 'Severe headache', labelBn: 'তীব্র মাথাব্যথা', danger: true },
        { value: 'vision', labelEn: 'Blurry vision', labelBn: 'ঝাপসা দৃষ্টি', danger: true },
        { value: 'swelling', labelEn: 'Swelling of face or hands', labelBn: 'মুখ বা হাত ফোলা', danger: true },
        { value: 'severe_pain', labelEn: 'Severe abdominal pain', labelBn: 'তীব্র পেট ব্যথা', danger: true },
        { value: 'none', labelEn: 'None', labelBn: 'কোনটিই নয়' }
      ]
    },
    {
      id: 'eating',
      textEn: 'Are you able to eat and drink normally?',
      textBn: 'আপনি কি স্বাভাবিকভাবে খেতে ও পানি পান করতে পারছেন?',
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
  const showHomeAdvice = !hasDangerSigns() && step === 5;

  React.useEffect(() => {
    if (step === 0) {
      addMessage(flows[0].textEn, flows[0].textBn);
    } else if (step < flows.length && step > 0 && !showDangerAlert && !showHomeAdvice) {
      setTimeout(() => {
        addMessage(flows[step].textEn, flows[step].textBn);
      }, 300);
    } else if (step === 4 && !hasDangerSigns()) {
      setTimeout(() => {
        addMessage(
          'Thank you. Let me ask a little more to guide you correctly.',
          'ঠিক আছে। আপনাকে সঠিকভাবে সাহায্য করতে আরও একটু জানতে চাই।'
        );
      }, 300);
    } else if (showHomeAdvice && !showCards) {
      setTimeout(() => {
        addMessage(
          'Based on your answers, this problem may be manageable at home.',
          'আপনার উত্তরের ভিত্তিতে সমস্যাটি ঘরে সামলানো সম্ভব হতে পারে।'
        );
      }, 300);
      setTimeout(() => {
        addMessage(
          'Here are some important Dos & Don\'ts for your stage of pregnancy.',
          'আপনার গর্ভধারণের এই ধাপে কিছু গুরুত্বপূর্ণ করণীয় ও বর্জনীয় দেখুন।'
        );
        setShowCards(true);
      }, 800);
    }
  }, [step, showHomeAdvice]);

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
                  : 'bg-pink-500 text-white rounded-br-sm'
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
                <p className="font-bold text-lg">Danger Signs in Pregnancy</p>
                <p className="text-base" style={{ fontFamily: 'system-ui' }}>গর্ভাবস্থায় বিপদ সংকেত</p>
              </div>
            </div>
            <p className="leading-relaxed mb-1">
              These are danger signs in pregnancy. Please go to the nearest clinic or hospital now.
            </p>
            <p className="text-lg leading-relaxed" style={{ fontFamily: 'system-ui' }}>
              এগুলো গর্ভধারণে বিপদ সংকেত। অনতিবিলম্বে নিকটস্থ ক্লিনিক বা হাসপাতালে যান।
            </p>
            <Button 
              onClick={() => setStep(prev => prev + 1)}
              className="w-full mt-4 bg-white text-rose-600 hover:bg-white/90"
            >
              Understood / বুঝেছি
            </Button>
          </motion.div>
        )}

        {/* Trimester Cards */}
        {showCards && trimester && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-3"
          >
            <TrimesterCards trimester={trimester} />
            
            {/* Warning */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mt-3">
              <p className="text-amber-800 text-sm mb-1">
                If your problem gets worse, or you see any danger sign, please go to a clinic or hospital.
              </p>
              <p className="text-amber-900" style={{ fontFamily: 'system-ui' }}>
                সমস্যা বেড়ে গেলে বা কোনো বিপদসংকেত দেখা দিলে দ্রুত ক্লিনিক/হাসপাতালে যান।
              </p>
            </div>
          </motion.div>
        )}

        {/* Options */}
        {currentFlow && !showDangerAlert && !showHomeAdvice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-2"
          >
            {currentFlow.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentFlow.id, option.value, option.labelEn, option.labelBn, option)}
                className={`p-4 rounded-2xl border-2 transition-all text-left ${
                  option.danger
                    ? 'bg-rose-50 border-rose-200 hover:border-rose-400'
                    : 'bg-gray-50 border-gray-200 hover:border-pink-400'
                }`}
              >
                <p className="font-medium text-gray-800 text-sm">{option.labelEn}</p>
                <p className="text-gray-700 mt-1" style={{ fontFamily: 'system-ui' }}>{option.labelBn}</p>
              </button>
            ))}
          </motion.div>
        )}

        {/* Doctor consultation offer */}
        {(showDangerAlert || showCards) && step >= 5 && (
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