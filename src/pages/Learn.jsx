import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ChevronLeft, Play, Volume2, X, BookOpen,
  Home as HomeIcon, Heart, Bell, Settings
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { learnArticles } from '@/components/learn/ArticleContent';

const categories = ['All', 'Pregnancy', 'Baby Care', 'Child Health', 'Newborn', 'Mental Health', 'General Health'];

export default function Learn() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = selectedCategory === 'All' 
    ? learnArticles 
    : learnArticles.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      {/* Header */}
      <div className="bg-white border-b px-6 pt-12 pb-4 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <Link to={createPageUrl('Home')} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Learn & Watch</h1>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          {filteredArticles.map((article, index) => (
            <motion.button
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedArticle(article)}
              className="text-left"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-square bg-gray-200">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className={`text-xs font-medium text-white px-2 py-1 rounded-full ${article.color}`}>
                    {article.category}
                  </span>
                </div>
                <button className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-gray-700 ml-0.5" />
                </button>
              </div>
              <h3 className="font-semibold text-gray-800 mt-2 line-clamp-2">
                {article.title}
              </h3>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto"
            >
              <div className="relative">
                <img 
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-48 object-cover"
                />
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className={`absolute bottom-4 left-4 text-sm font-medium text-white px-3 py-1 rounded-full ${selectedArticle.color}`}>
                  {selectedArticle.category}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {selectedArticle.title}
                </h2>
                
                <div className="prose prose-sm max-w-none">
                  {selectedArticle.content.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <h3 key={idx} className="text-lg font-bold text-gray-800 mt-4 mb-2">
                          {paragraph.replace(/\*\*/g, '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('•')) {
                      const items = paragraph.split('\n');
                      return (
                        <ul key={idx} className="space-y-1 ml-4 my-2">
                          {items.map((item, i) => (
                            <li key={i} className="text-gray-600 leading-relaxed">
                              {item.replace('• ', '')}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={idx} className="text-gray-600 leading-relaxed my-3">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                <button className="flex items-center gap-2 mt-6 text-sky-600 font-medium">
                  <Volume2 className="w-5 h-5" />
                  Listen to this article
                </button>

                <Button 
                  onClick={() => setSelectedArticle(null)}
                  className="w-full mt-6 h-14 text-lg rounded-2xl"
                >
                  Done Reading
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-around items-center">
        <Link to={createPageUrl('Home')} className="flex flex-col items-center text-gray-400">
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to={createPageUrl('MyHealth')} className="flex flex-col items-center text-gray-400">
          <Heart className="w-6 h-6" />
          <span className="text-xs mt-1">My Health</span>
        </Link>
        <Link to={createPageUrl('Notifications')} className="flex flex-col items-center text-gray-400">
          <Bell className="w-6 h-6" />
          <span className="text-xs mt-1">Alerts</span>
        </Link>
        <Link to={createPageUrl('Settings')} className="flex flex-col items-center text-gray-400">
          <Settings className="w-6 h-6" />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </div>
  );
}