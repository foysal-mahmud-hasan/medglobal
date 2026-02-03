import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Plus, Scale, Ruler, Volume2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const nutritionByAge = {
  '0-6': {
    title: 'Feeding in 0–6 Months',
    icon: '🤱',
    short: 'Only breastmilk. No water or food.',
    full: `**For 0–6 months:**
• Breastmilk is the only food and drink your baby needs.
• Do not give water, honey, cow's milk, or any other foods at this age unless advised by a health worker.
• Feed whenever your baby wants (day and night).
• Make sure you are drinking enough water and eating well so you have energy to feed.`
  },
  '6-8': {
    title: 'Starting Foods (6–8 Months)',
    icon: '🥄',
    short: 'Soft, mashed foods + breastmilk.',
    full: `**From 6 months:**
Breastmilk is still very important, but your baby also needs other foods.

**What to offer:**
• Soft mashed rice or khichuri
• Mashed lentils (dal)
• Mashed vegetables (pumpkin, potato, carrot)
• Mashed banana or other soft fruits

Start with 2–3 spoonfuls 2–3 times a day, then slowly increase the number and amount of meals. Always wash your hands and use clean utensils.`
  },
  '9-11': {
    title: 'Growing Appetite (9–11 Months)',
    icon: '🍲',
    short: '3 small meals + snacks.',
    full: `**As your baby grows:**
They need more food along with breastmilk.

**Daily goal:**
• About 3 small meals + 1–2 healthy snacks

**Good foods:**
• Thick porridge with oil or ghee
• Rice with lentils and cooked vegetables
• Egg, fish, or small pieces of soft meat if possible

Let the child try to feed themselves with their hands or a spoon — it's messy but normal.`
  },
  '12+': {
    title: 'Family Foods (12–24 Months)',
    icon: '🍽️',
    short: 'Soft family foods + breastfeeding.',
    full: `**At 1–2 years:**
Your child can eat most of the foods your family eats, cut into small, soft pieces.

**Tips:**
• Offer 3–4 small meals + 1–2 snacks
• Include something from each group: rice/roti, lentils/beans, vegetables, a little oil, eggs/fish/meat if available
• Continue breastfeeding up to 2 years or beyond if you can

If your child is often sick or not gaining weight, talk to a health worker about their feeding.`
  }
};

export default function GrowthNutrition({ child, onBack }) {
  const [showAddWeight, setShowAddWeight] = useState(false);
  const [showNutritionDetail, setShowNutritionDetail] = useState(null);

  const calculateAgeInMonths = () => {
    const birth = new Date(child.birth_date);
    const today = new Date();
    return (today.getFullYear() - birth.getFullYear()) * 12 + today.getMonth() - birth.getMonth();
  };

  const getAgeCategory = () => {
    const months = calculateAgeInMonths();
    if (months < 6) return '0-6';
    if (months < 9) return '6-8';
    if (months < 12) return '9-11';
    return '12+';
  };

  const ageCategory = getAgeCategory();
  const nutritionInfo = nutritionByAge[ageCategory];

  const latestWeight = child.weight_records?.length > 0 
    ? child.weight_records[child.weight_records.length - 1] 
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white pb-24">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Growth & Nutrition</h1>
        </div>
        <p className="text-white/80">{child.name}'s growth tracker</p>
      </div>

      <div className="px-6 -mt-4 space-y-4">
        {/* Latest Measurements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-lg"
        >
          <h3 className="font-bold text-gray-800 mb-4">Latest Measurements</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <Scale className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">
                {latestWeight ? `${latestWeight.weight_kg} kg` : '—'}
              </p>
              <p className="text-sm text-gray-500">Weight</p>
            </div>
            <div className="bg-teal-50 rounded-xl p-4 text-center">
              <Ruler className="w-6 h-6 text-teal-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">—</p>
              <p className="text-sm text-gray-500">Height</p>
            </div>
          </div>
          <Button
            onClick={() => setShowAddWeight(true)}
            className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Measurement
          </Button>
        </motion.div>

        {/* Growth Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-5 text-white"
        >
          <h3 className="font-bold mb-2">Growth Status</h3>
          <p className="text-white/90 text-sm">
            {latestWeight 
              ? "Your child's growth looks within a normal range for their age. Keep offering good foods and regular check-ups."
              : "Add your child's weight and height to track growth."}
          </p>
        </motion.div>

        {/* Nutrition Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 shadow-sm"
        >
          <h3 className="font-bold text-gray-800 mb-4">Nutrition Guide</h3>
          <button
            onClick={() => setShowNutritionDetail(nutritionInfo)}
            className="w-full bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{nutritionInfo.icon}</div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">{nutritionInfo.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{nutritionInfo.short}</p>
              </div>
              <Volume2 className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Add Weight Modal */}
      <AnimatePresence>
        {showAddWeight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setShowAddWeight(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-3xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Add Measurement</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Weight (kg)
                  </label>
                  <Input type="number" step="0.1" placeholder="e.g. 8.5" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Height (cm)
                  </label>
                  <Input type="number" step="0.1" placeholder="e.g. 70" />
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => setShowAddWeight(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                    Save
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nutrition Detail Modal */}
      <AnimatePresence>
        {showNutritionDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setShowNutritionDetail(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">{showNutritionDetail.icon}</div>
                <h3 className="text-xl font-bold text-gray-800">{showNutritionDetail.title}</h3>
              </div>
              <div className="prose prose-sm max-w-none">
                {showNutritionDetail.full.split('\n\n').map((para, idx) => {
                  if (para.startsWith('**') && para.endsWith('**')) {
                    return <h4 key={idx} className="font-bold text-gray-800 mt-3 mb-2">{para.replace(/\*\*/g, '')}</h4>;
                  }
                  if (para.includes('• ')) {
                    return (
                      <ul key={idx} className="space-y-1 ml-4 my-2">
                        {para.split('\n').filter(l => l.startsWith('•')).map((item, i) => (
                          <li key={i} className="text-gray-600">{item.replace('• ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={idx} className="text-gray-600 my-2">{para}</p>;
                })}
              </div>
              <Button onClick={() => setShowNutritionDetail(null)} className="w-full mt-6">
                Done Reading
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}