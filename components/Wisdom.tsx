
import React, { useState, useEffect } from 'react';
import { Quote } from '../types';
import { getDailyWisdom } from '../services/geminiService';

const Wisdom: React.FC = () => {
  const [wisdom, setWisdom] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [mood, setMood] = useState<string>('');

  const fetchWisdom = async (userMood?: string) => {
    setLoading(true);
    const data = await getDailyWisdom(userMood);
    setWisdom(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchWisdom();
  }, []);

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white serif">Ancient Wisdom</h2>
        <p className="text-slate-500 dark:text-slate-400">Words of life for your journey.</p>
      </header>

      {/* Mood Selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['Tempted', 'Ashamed', 'Lonely', 'Bored', 'Anxious'].map(m => (
          <button
            key={m}
            onClick={() => {
              setMood(m);
              fetchWisdom(m);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
              mood === m 
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg scale-105' 
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-sm text-slate-400 dark:text-slate-500 font-medium animate-pulse">Consulting the scrolls...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {wisdom.map((q, idx) => (
            <div 
              key={idx} 
              className={`p-8 rounded-3xl shadow-sm border ${
                q.type === 'bible' 
                  ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/50' 
                  : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'
              } transition-transform hover:scale-[1.02] cursor-default`}
            >
              <div className="mb-4">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                  q.type === 'bible' 
                    ? 'bg-amber-200 dark:bg-amber-800/50 text-amber-800 dark:text-amber-200' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {q.type === 'bible' ? 'Scripture' : 'Inspiration'}
                </span>
              </div>
              <p className="text-xl serif italic text-slate-800 dark:text-slate-100 leading-relaxed mb-6">"{q.text}"</p>
              <div className="flex items-center justify-between">
                <p className="font-bold text-slate-600 dark:text-slate-400 text-sm">— {q.author}</p>
                {q.reference && <p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium">{q.reference}</p>}
              </div>
            </div>
          ))}
          
          <button 
            onClick={() => fetchWisdom(mood)}
            className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 dark:text-slate-600 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all font-bold text-sm"
          >
            Refresh Wisdom
          </button>

          {/* YouVersion Bible App Section */}
          <div className="mt-12 p-8 bg-indigo-50 dark:bg-indigo-900/10 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-800/50 text-center space-y-6">
            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-3xl shadow-sm mx-auto flex items-center justify-center text-3xl">📖</div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 serif italic">Continue Your Study</h3>
              <p className="text-sm text-indigo-700 dark:text-indigo-400 max-w-xs mx-auto">Access thousands of reading plans and study the Word deeply with the YouVersion Bible App.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a 
                href="https://apps.apple.com/app/bible/id284945674" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-slate-900 dark:bg-slate-800 text-white px-6 py-3 rounded-2xl hover:bg-black dark:hover:bg-slate-700 transition-all shadow-lg active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 384 512" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                <span className="text-xs font-black uppercase tracking-widest">App Store</span>
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.sirma.mobile.bible.android" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-indigo-600 dark:bg-indigo-700 text-white px-6 py-3 rounded-2xl hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-all shadow-lg active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-127.3-60.1-60.1L104.6 499z"/>
                </svg>
                <span className="text-xs font-black uppercase tracking-widest">Google Play</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wisdom;
