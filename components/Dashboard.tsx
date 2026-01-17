
import React from 'react';
import { UserProfile } from '../types';

interface DashboardProps {
  user: UserProfile;
  onRelapse: () => void;
  onNavigateToQuiz: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onRelapse, onNavigateToQuiz }) => {
  const recentBadge = user.badges[user.badges.length - 1];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-violet-700 dark:from-indigo-900 dark:to-violet-950 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2 serif italic">Hello, {user.name}</h2>
          <p className="opacity-90 text-lg mb-6 leading-tight">Your soul is growing stronger with every breath.</p>
          
          <div className="flex items-end space-x-4">
            <div className="text-7xl font-black drop-shadow-lg">{user.streak}</div>
            <div className="text-xl mb-3 opacity-80 uppercase tracking-widest font-bold">Days Pure</div>
          </div>
        </div>
        
        {/* Subtle decorative elements */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl"></div>
      </section>

      {/* Quiz / Recovery Path Card */}
      {!user.recoveryPath ? (
        <button 
          onClick={onNavigateToQuiz}
          className="w-full bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-100 dark:border-indigo-800/50 rounded-3xl p-6 text-left hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all group shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 dark:text-indigo-300">Find Your Best Path</h3>
              <p className="text-xs text-indigo-700 dark:text-indigo-400">Take a short assessment to get a personalized recovery plan from our Soul Mentor.</p>
            </div>
            <span className="text-2xl group-hover:scale-110 transition-transform">🧭</span>
          </div>
          <div className="mt-4 flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
            <span>Start Assessment</span>
            <span>→</span>
          </div>
        </button>
      ) : (
        <button 
          onClick={onNavigateToQuiz}
          className="w-full bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800/50 rounded-3xl p-6 text-left hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all group shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-emerald-900 dark:text-emerald-300">Your Recovery Path</h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-snug truncate max-w-[200px]">"{user.recoveryPath.summary}"</p>
            </div>
            <span className="text-2xl group-hover:scale-110 transition-transform">📜</span>
          </div>
          <div className="mt-4 flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
            <span>Review Full Strategy</span>
            <span>→</span>
          </div>
        </button>
      )}

      {/* Rewards & Challenges Highlights */}
      <div className="grid grid-cols-2 gap-4">
        {/* Badge Preview */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Latest Honor</p>
          {recentBadge ? (
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{recentBadge.emoji}</span>
              <div>
                <p className="text-xs font-black text-slate-800 dark:text-slate-200 leading-tight">{recentBadge.name}</p>
                <p className="text-[9px] text-slate-400 dark:text-slate-500">Earned {recentBadge.dateEarned}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3 opacity-40 grayscale">
              <span className="text-3xl">🔒</span>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">No honors yet</p>
            </div>
          )}
        </div>

        {/* Garden Seeds */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Garden Seeds</p>
          <div className="flex items-center space-x-3">
             <span className="text-3xl">🌻</span>
             <div>
                <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 leading-none">{user.seeds}</p>
                <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 uppercase">Ready to plant</p>
             </div>
          </div>
        </div>
      </div>

      {/* Daily Challenge */}
      <section className="bg-white dark:bg-slate-800 border-2 border-indigo-50 dark:border-indigo-900/30 rounded-3xl p-6 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest text-[10px]">Daily Meditation</h3>
          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-[9px] rounded-full font-black uppercase tracking-tighter">Active</span>
        </div>
        <div className="flex items-start space-x-4">
          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-2xl text-2xl shadow-inner">🕯️</div>
          <div>
            <p className="font-bold text-slate-900 dark:text-slate-100">The 3-Minute Silence</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">Close your eyes. Visualize your urge as a dark cloud passing over a clear mountain peak. You are the mountain.</p>
          </div>
        </div>
        {/* Progress indicator */}
        <div className="mt-4 h-1.5 w-full bg-slate-50 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-amber-400 w-1/3"></div>
        </div>
      </section>

      {/* Bible App Quick Link */}
      <div className="bg-indigo-600 dark:bg-indigo-900/50 rounded-3xl p-6 text-white shadow-lg flex items-center justify-between group">
        <div className="space-y-1">
          <h3 className="font-bold text-sm">Grow with the Word</h3>
          <p className="text-[10px] opacity-80 uppercase tracking-widest font-black">Try YouVersion Bible Plans</p>
        </div>
        <div className="flex space-x-2">
          <a href="https://apps.apple.com/app/bible/id284945674" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors">
            <span className="text-xl">🍎</span>
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.sirma.mobile.bible.android" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors">
            <span className="text-xl">🤖</span>
          </a>
        </div>
      </div>

      {/* The Honest Button */}
      <div className="pt-4 text-center">
        <button 
          onClick={() => {
            if (confirm("Honesty is the first step to healing. Did you slip up? We are here to support you, not condemn you.")) {
              onRelapse();
            }
          }}
          className="px-6 py-2 text-slate-300 dark:text-slate-600 hover:text-rose-500 transition-colors text-[11px] font-black uppercase tracking-[0.2em]"
        >
          Relapse Reset • Start Over
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
