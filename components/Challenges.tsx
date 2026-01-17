
import React from 'react';
import { Badge, Challenge } from '../types';

interface ChallengesProps {
  challenges: Challenge[];
  earnedBadges: Badge[];
  onClaim: (challengeId: string) => void;
}

const Challenges: React.FC<ChallengesProps> = ({ challenges, earnedBadges, onClaim }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white serif">Quests & Honors</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Master yourself and earn the marks of a Guardian.</p>
      </header>

      {/* Badges Showcase */}
      <section>
        <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Your Medals</h3>
        <div className="flex flex-wrap gap-4">
          {earnedBadges.length > 0 ? earnedBadges.map((badge) => (
            <div key={badge.id} className="group relative">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 ${badge.isLimited ? 'bg-amber-100 dark:bg-amber-900/30 border-amber-400 dark:border-amber-600' : 'bg-white dark:bg-slate-800 border-indigo-100 dark:border-indigo-900'} transition-transform hover:rotate-12`}>
                {badge.emoji}
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 dark:bg-slate-700 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                {badge.name}
              </div>
            </div>
          )) : (
            <div className="w-full p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
              <span className="text-3xl mb-2 opacity-30">🛡️</span>
              <p className="text-xs font-medium">Complete challenges to earn your first badge</p>
            </div>
          )}
        </div>
      </section>

      {/* Active Challenges */}
      <section className="space-y-4">
        <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Active Quests</h3>
        {challenges.map((challenge) => (
          <div key={challenge.id} className={`p-6 rounded-3xl border-2 transition-all shadow-sm ${challenge.isLimited ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 shadow-indigo-100/50 dark:shadow-none' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                {challenge.isLimited && (
                  <span className="inline-block px-2 py-0.5 bg-amber-400 dark:bg-amber-600 text-white text-[9px] font-black uppercase rounded-full mb-2 tracking-widest animate-pulse">
                    Limited Time: {challenge.endsIn}
                  </span>
                )}
                <h4 className="font-bold text-slate-800 dark:text-slate-100">{challenge.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{challenge.description}</p>
              </div>
              <div className="text-2xl bg-white dark:bg-slate-700 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-600">
                {challenge.rewardBadgeId === 'sprint' ? '⚡' : challenge.rewardBadgeId === 'weekend' ? '🛡️' : '🌟'}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black text-slate-400 dark:text-slate-500">
                <span>PROGRESS</span>
                <span>{challenge.progress} / {challenge.requirement}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${challenge.isLimited ? 'bg-indigo-500 dark:bg-indigo-400' : 'bg-emerald-500 dark:bg-emerald-400'}`} 
                  style={{ width: `${(challenge.progress / challenge.requirement) * 100}%` }}
                ></div>
              </div>
            </div>

            {challenge.progress >= challenge.requirement && (
              <button 
                onClick={() => onClaim(challenge.id)}
                className="mt-6 w-full py-3 bg-slate-800 dark:bg-slate-100 dark:text-slate-900 text-white rounded-xl font-bold text-sm shadow-xl shadow-slate-200 dark:shadow-none hover:bg-slate-900 dark:hover:bg-white active:scale-95 transition-all"
              >
                Claim Honor
              </button>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Challenges;
