
import React, { useState, useEffect } from 'react';
import { getPanicReliefContent } from '../services/geminiService';

interface PanicProps {
  onBack: () => void;
}

const Panic: React.FC<PanicProps> = ({ onBack }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(10);
  const [breathePhase, setBreathePhase] = useState<'In' | 'Out'>('In');

  useEffect(() => {
    const fetchPanic = async () => {
      const res = await getPanicReliefContent();
      setData(res);
      setLoading(false);
    };
    fetchPanic();

    const breatheTimer = setInterval(() => {
      setBreathePhase(p => p === 'In' ? 'Out' : 'In');
    }, 4000);

    return () => clearInterval(breatheTimer);
  }, []);

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-8 p-6 text-center">
        <div className="w-24 h-24 bg-rose-500 rounded-full animate-ping opacity-20"></div>
        <h2 className="text-3xl font-black text-rose-600 dark:text-rose-400 uppercase tracking-tighter">Stay Calm</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xs">We are preparing your emergency intervention. Breathe with me.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-8 animate-fadeIn">
      <header className="text-center">
        <h2 className="text-4xl font-black text-rose-600 dark:text-rose-500 mb-2">HALT.</h2>
        <p className="text-lg font-medium text-slate-500 dark:text-slate-400">The urge is a wave. You are the rock.</p>
      </header>

      {/* Breathing Circle */}
      <div className="flex flex-col items-center justify-center p-10 bg-slate-50 dark:bg-slate-800/50 rounded-[3rem] border-2 border-slate-100 dark:border-slate-800 shadow-inner">
        <div className={`w-40 h-40 rounded-full flex items-center justify-center text-white font-black text-2xl transition-all duration-[4000ms] ease-in-out ${
          breathePhase === 'In' ? 'scale-125 bg-indigo-500 dark:bg-indigo-600' : 'scale-75 bg-indigo-300 dark:bg-indigo-800'
        }`}>
          {breathePhase}
        </div>
        <p className="mt-8 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest text-sm">Breathe {breathePhase === 'In' ? 'In' : 'Out'}</p>
      </div>

      <div className="space-y-4">
        <div className="p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 p-2 rounded-lg text-lg font-bold">1</span>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Physical Action</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{data.step1}</p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 p-2 rounded-lg text-lg font-bold">2</span>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">A Higher Truth</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm italic">"{data.step2}"</p>
        </div>

        <div className="p-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/50 rounded-3xl shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 p-2 rounded-lg text-lg font-bold">3</span>
            <h3 className="font-bold text-amber-800 dark:text-amber-300 italic serif">The Purity Prayer</h3>
          </div>
          <p className="text-amber-900 dark:text-amber-100 text-base leading-relaxed mb-4">{data.step3}</p>
          <div className="bg-white/50 dark:bg-slate-900/50 p-4 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-400 italic border border-amber-200 dark:border-amber-800/50">
            {data.emergencyVerse}
          </div>
        </div>
      </div>

      <button 
        onClick={onBack}
        className="w-full py-4 bg-slate-800 dark:bg-slate-100 dark:text-slate-900 text-white rounded-2xl font-bold shadow-lg hover:bg-slate-900 dark:hover:bg-white transition-all active:scale-95"
      >
        I'm Safe Now • Back Home
      </button>

      <div className="text-center pt-8">
        <p className="text-[10px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-[0.2em] mb-4 underline underline-offset-4 decoration-rose-300 dark:decoration-rose-900">Safe Web Blocker Active</p>
        <p className="text-[10px] text-slate-400 dark:text-slate-600 italic">Stay on this page for 10 minutes to let the urge pass completely.</p>
      </div>
    </div>
  );
};

export default Panic;
