import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Image, Mic, Phone, Video, X, Volume2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const initialQuestions = [
  {
    id: 'who',
    bot: "Assalamu alaikum! I'm your MedGlobal Assistant. I'll ask a few questions, then a doctor can help you.",
    question: "Who needs help today?",
    options: [
      { icon: '👤', label: 'Me', value: 'self' },
      { icon: '👶', label: 'My child', value: 'child' },
      { icon: '👥', label: 'Someone else', value: 'other' }
    ]
  },
  {
    id: 'problem',
    question: "What is the main problem?",
    options: [
      { icon: '🤒', label: 'Fever', value: 'fever' },
      { icon: '😷', label: 'Cough/Breathing', value: 'cough' },
      { icon: '🤢', label: 'Stomach/Diarrhea', value: 'stomach' },
      { icon: '🤰', label: 'Pregnancy concern', value: 'pregnancy' },
      { icon: '🧠', label: 'Mental health', value: 'mental' },
      { icon: '❓', label: 'Other', value: 'other' }
    ]
  },
  {
    id: 'duration',
    question: "How long has this been happening?",
    options: [
      { icon: '1️⃣', label: 'Today', value: 'today' },
      { icon: '2️⃣', label: '1-3 days', value: 'few_days' },
      { icon: '📅', label: 'More than a week', value: 'week' }
    ]
  },
  {
    id: 'danger',
    question: "Any of these danger signs?",
    options: [
      { icon: '🩸', label: 'Bleeding', value: 'bleeding', danger: true },
      { icon: '😵', label: 'Very dizzy/confused', value: 'dizzy', danger: true },
      { icon: '😮‍💨', label: 'Hard to breathe', value: 'breathing', danger: true },
      { icon: '✅', label: 'None of these', value: 'none' }
    ]
  }
];

export default function ChatBot({ onStartCall }) {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [hasDanger, setHasDanger] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messages.length === 0) {
      startConversation();
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startConversation = async () => {
    setIsTyping(true);
    await delay(500);
    
    addBotMessage(initialQuestions[0].bot);
    await delay(1000);
    addBotMessage(initialQuestions[0].question);
    setShowOptions(true);
    setIsTyping(false);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, { type: 'bot', text }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { type: 'user', text }]);
  };

  const handleOption = async (option) => {
    setShowOptions(false);
    addUserMessage(option.label);

    if (option.danger) {
      setHasDanger(true);
    }

    if (currentStep < initialQuestions.length - 1) {
      setIsTyping(true);
      await delay(800);
      
      const nextQ = initialQuestions[currentStep + 1];
      addBotMessage(nextQ.question);
      setCurrentStep(prev => prev + 1);
      setShowOptions(true);
      setIsTyping(false);
    } else {
      // Complete
      setIsTyping(true);
      await delay(1000);

      if (hasDanger || option.danger) {
        addBotMessage("⚠️ This might be serious. Please go to a clinic or hospital immediately if possible.");
        await delay(1500);
        addBotMessage("If you cannot go now, a doctor will reply to you very soon.");
      } else {
        addBotMessage("Thank you! A MedGlobal doctor will reply soon.");
        await delay(1000);
        addBotMessage("While you wait, you can see basic advice in the Health Advice section.");
      }

      setCompleted(true);
      setIsTyping(false);
    }
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    addUserMessage(inputValue);
    setInputValue('');
  };

  const currentQuestion = initialQuestions[currentStep];

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.type === 'user'
                  ? 'bg-sky-500 text-white rounded-br-sm'
                  : 'bg-white border border-gray-200 rounded-bl-sm'
              }`}>
                <p className="text-sm">{msg.text}</p>
                {msg.type === 'bot' && (
                  <button className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                    <Volume2 className="w-3 h-3" />
                    Listen
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-1 p-4 bg-gray-100 rounded-2xl w-fit"
          >
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </motion.div>
        )}

        {/* Options */}
        {showOptions && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2"
          >
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOption(option)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium transition-all ${
                  option.danger
                    ? 'bg-rose-100 text-rose-700 border-2 border-rose-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-xl">{option.icon}</span>
                {option.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Doctor response simulation */}
        {completed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center text-white font-bold">
                Dr
              </div>
              <div>
                <p className="font-semibold text-gray-800">Dr. Sarah</p>
                <p className="text-xs text-violet-600">MedGlobal Doctor</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              Hello! I've reviewed your symptoms. How are you feeling right now? Can you tell me more about when this started?
            </p>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-white p-4">
        {completed && (
          <div className="flex gap-2 mb-3">
            <Button
              onClick={() => onStartCall('audio')}
              variant="outline"
              className="flex-1 h-12 rounded-2xl"
            >
              <Phone className="w-5 h-5 mr-2" />
              Audio Call
            </Button>
            <Button
              onClick={() => onStartCall('video')}
              variant="outline"
              className="flex-1 h-12 rounded-2xl"
            >
              <Video className="w-5 h-5 mr-2" />
              Video Call
            </Button>
          </div>
        )}
        
        <div className="flex gap-2">
          <button className="p-3 text-gray-400 hover:text-gray-600">
            <Image className="w-6 h-6" />
          </button>
          <button className="p-3 text-gray-400 hover:text-gray-600">
            <Mic className="w-6 h-6" />
          </button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 h-12 rounded-2xl"
          />
          <Button 
            onClick={sendMessage}
            className="w-12 h-12 rounded-2xl bg-sky-500 hover:bg-sky-600"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}