
import React, { useState, useEffect } from 'react';
import { PrayerRequest } from '../types';
import { getPersonalizedPrayer } from '../services/geminiService';

const Prayer: React.FC = () => {
  const [requests, setRequests] = useState<PrayerRequest[]>([
    { id: '1', userAlias: 'Sojourner', content: 'Struggling with late-night triggers. Praying for peace and focus.', timestamp: new Date(), supportCount: 12 },
    { id: '2', userAlias: 'Faithful77', content: 'About to hit 30 days. Asking for strength to keep going.', timestamp: new Date(), supportCount: 25 },
    { id: '3', userAlias: 'BrotherM', content: 'Relapsed after 2 weeks. Feeling low. Need guidance back to the light.', timestamp: new Date(), supportCount: 8 }
  ]);
  const [newRequest, setNewRequest] = useState('');
  const [personalPrayer, setPersonalPrayer] = useState('');
  const [loadingPrayer, setLoadingPrayer] = useState(false);

  const submitRequest = () => {
    if (!newRequest.trim()) return;
    const req: PrayerRequest = {
      id: Math.random().toString(),
      userAlias: 'You',
      content: newRequest,
      timestamp: new Date(),
      supportCount: 0
    };
    setRequests([req, ...requests]);
    setNewRequest('');
  };

  const handlePrayForMe = async () => {
    if (!newRequest.trim() && !personalPrayer) {
       alert("Tell the Soul Mentor what's on your heart first.");
       return;
    }
    setLoadingPrayer(true);
    const prayer = await getPersonalizedPrayer(newRequest || "strength in the journey");
    setPersonalPrayer(prayer);
    setLoadingPrayer(false);
  };

  const support = (id: string) => {
    setRequests(requests.map(r => r.id === id ? { ...r, supportCount: r.supportCount + 1 } : r));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white serif italic">The Prayer Wall</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Cast all your anxiety on him because he cares for you.</p>
      </header>

      {/* Post a Request */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
        <textarea 
          value={newRequest}
          onChange={(e) => setNewRequest(e.target.value)}
          placeholder="What is your heart's request?"
          className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white resize-none"
          rows={3}
        />
        <div className="flex space-x-2">
          <button 
            onClick={submitRequest}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-2xl font-bold text-xs hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
          >
            Post to Wall
          </button>
          <button 
            onClick={handlePrayForMe}
            className="flex-1 bg-amber-500 text-white py-3 rounded-2xl font-bold text-xs hover:bg-amber-600 transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>Soul Prayer</span>
            <span>✨</span>
          </button>
        </div>
      </section>

      {/* Personalized Prayer Display */}
      {(loadingPrayer || personalPrayer) && (
        <section className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50 p-8 rounded-[2.5rem] shadow-sm animate-fadeIn">
           <h3 className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-4">Your Personalized Prayer</h3>
           {loadingPrayer ? (
             <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
             </div>
           ) : (
             <p className="text-slate-800 dark:text-slate-200 serif italic text-lg leading-relaxed">"{personalPrayer}"</p>
           )}
        </section>
      )}

      {/* Wall Items */}
      <section className="space-y-4">
        <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Community Requests</h3>
        {requests.map(req => (
          <div key={req.id} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm space-y-4 hover:border-indigo-100 dark:hover:border-indigo-900 transition-all group">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest">@{req.userAlias}</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">{req.timestamp.toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">"{req.content}"</p>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-1">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-bold">{req.supportCount} interceding</span>
              </div>
              <button 
                onClick={() => support(req.id)}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-50 dark:bg-slate-700 rounded-full text-slate-500 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-900/30 transition-all active:scale-95"
              >
                <span className="text-sm">🙌</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Pray</span>
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Prayer;
