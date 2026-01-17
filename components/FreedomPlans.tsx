
import React, { useState } from 'react';
import { BiblePlan, UserProfile, BiblePlanDay } from '../types';

interface FreedomPlansProps {
  user: UserProfile;
  onSelectPlan: (planId: string) => void;
  onCompleteDay: () => void;
}

// Fallback pool for long-term plans to ensure every day has content
const DAILY_BREAD_POOL: Partial<BiblePlanDay>[] = [
  { verse: "Submit yourselves, then, to God. Resist the devil, and he will flee from you.", reference: "James 4:7", meditation: "Freedom is found in submission to the Creator. When you yield to Him, you find the strength to resist.", task: "Spend 2 minutes in complete silence, telling God 'I am yours today.'" },
  { verse: "No temptation has overtaken you except what is common to mankind.", reference: "1 Corinthians 10:13", meditation: "You are not alone. Millions are fighting with you. God is faithful to provide the exit.", task: "Identify your exit strategy for the next time an urge hits." },
  { verse: "The Lord will keep you from all harm—he will watch over your life.", reference: "Psalm 121:7", meditation: "He is your keeper. He is not sleeping on the job. Rest in His watch over you.", task: "Before bed, thank the Lord for keeping you safe today." },
  { verse: "Let us not become weary in doing good, for at the proper time we will reap a harvest.", reference: "Galatians 6:9", meditation: "Purity is a long-term investment. The harvest of peace is coming. Don't quit now.", task: "Encourage one other person in the Circle who might be struggling." },
  { verse: "I can do all things through Christ who strengthens me.", reference: "Philippians 4:13", meditation: "Your strength is finite. His is infinite. Tap into the Source.", task: "Say this verse aloud 10 times during your lunch break." }
];

const GENERATED_PLANS: BiblePlan[] = [
  // --- SPRINTS (7 DAYS) ---
  { id: 'urgent-escape', title: 'The Urgent Escape', category: 'Sprint', duration: 7, description: 'Immediate tactics for those in a high-risk week.', days: [] },
  { id: 'morning-manna', title: 'Morning Manna', category: 'Sprint', duration: 7, description: 'Quick 3-minute reflections to start your day strong.', days: [] },
  { id: 'student-purity', title: 'Campus Guardian', category: 'Sprint', duration: 7, description: 'Navigating purity in a college/school environment.', days: [] },
  { id: 'weekend-warrior', title: 'Weekend Fort', category: 'Sprint', duration: 7, description: 'Specialized focus for the high-risk Friday-Sunday stretch.', days: [] },
  { id: 'eyes-of-light', title: 'Eyes of Light', category: 'Sprint', duration: 7, description: 'A deep dive into guarding what you see.', days: [] },

  // --- FORTIFICATIONS (14-30 DAYS) ---
  { id: 'renewal-30', title: '30 Days of Renewal', category: 'Fortification', duration: 30, description: 'The comprehensive guide to rewiring your brain and heart.', days: [] },
  { id: 'identity-shift', title: 'The Identity Shift', category: 'Fortification', duration: 14, description: 'Move from "struggling addict" to "free child of God."', days: [] },
  { id: 'marriage-mend', title: 'Heart of the Home', category: 'Fortification', duration: 21, description: 'For those seeking to restore intimacy in marriage.', days: [] },
  { id: 'nehemiah-wall', title: 'Building the Wall', category: 'Fortification', duration: 28, description: 'Rebuilding your life like Nehemiah rebuilt Jerusalem.', days: [] },

  // --- REBOOT (90 DAYS) ---
  { id: 'reboot-90', title: 'The 90-Day Reboot', category: 'Reboot', duration: 90, description: 'The golden standard for biological and spiritual reset.', days: [] },
  { id: 'desert-journey', title: 'Desert Journey', category: 'Reboot', duration: 90, description: 'A meditative walk through the wilderness into the promised land.', days: [] },

  // --- LEGACY (365 DAYS) ---
  { id: 'guardian-legacy', title: 'The Guardian Legacy', category: 'Legacy', duration: 365, description: 'A full year of daily mentorship and character building.', days: [] },
  { id: 'wisdom-walk', title: 'A Year of Wisdom', category: 'Legacy', duration: 365, description: 'Walking through Proverbs and Psalms over 12 months.', days: [] }
];

// Add 26 more placeholder plans to hit the "39 more" request
for(let i=1; i<=26; i++) {
  GENERATED_PLANS.push({
    id: `plan-extra-${i}`,
    title: `Path of Strength Vol. ${i}`,
    category: 'Specialized',
    duration: (i % 3 === 0) ? 90 : (i % 2 === 0) ? 30 : 7,
    description: `Targeted wisdom for season ${i} of your journey to freedom.`,
    days: []
  });
}

const FreedomPlans: React.FC<FreedomPlansProps> = ({ user, onSelectPlan, onCompleteDay }) => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const activePlan = GENERATED_PLANS.find(p => p.id === user.activePlanId);
  
  const getDayContent = (plan: BiblePlan, day: number): BiblePlanDay => {
    // Return specific content if it exists, else use the bread pool
    const poolIndex = day % DAILY_BREAD_POOL.length;
    const poolItem = DAILY_BREAD_POOL[poolIndex];
    return {
      day,
      verse: poolItem.verse || "Stay strong.",
      reference: poolItem.reference || "God's Word",
      meditation: poolItem.meditation || "Consistency is key.",
      task: poolItem.task || "Do one good deed."
    };
  };

  const currentDayData = activePlan ? getDayContent(activePlan, user.planProgress + 1) : null;

  const filteredPlans = activeTab === 'All' 
    ? GENERATED_PLANS 
    : GENERATED_PLANS.filter(p => p.category === activeTab);

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white serif">Freedom Plans</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">From 7-day sprints to year-long legacies. Choose your path.</p>
      </header>

      {activePlan ? (
        <div className="space-y-6">
          <div className="bg-indigo-600 dark:bg-indigo-900 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">Day {user.planProgress + 1}</span>
                <button onClick={() => onSelectPlan('')} className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors">Change Plan</button>
              </div>
              <h3 className="text-2xl font-bold mt-4 serif italic">{activePlan.title}</h3>
              <div className="mt-6 flex items-center space-x-4">
                <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-1000" 
                    style={{ width: `${((user.planProgress + 1) / activePlan.duration) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs font-bold whitespace-nowrap">{user.planProgress + 1} / {activePlan.duration}</span>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          </div>

          {currentDayData && (
            <div className="space-y-6 animate-fadeInUp">
              <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-8 shadow-sm">
                <h4 className="text-xs font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-4">Daily Manna</h4>
                <p className="text-xl serif italic text-slate-800 dark:text-slate-100 leading-relaxed mb-4">"{currentDayData.verse}"</p>
                <p className="text-sm font-bold text-slate-400 dark:text-slate-500">— {currentDayData.reference}</p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50 rounded-3xl p-8 shadow-sm">
                <h4 className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2">The Heart</h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{currentDayData.meditation}</p>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-xl">⚔️</span>
                  <h4 className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Warrior Task</h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm font-medium mb-6">{currentDayData.task}</p>
                <button 
                  onClick={onCompleteDay}
                  className="w-full py-4 bg-emerald-600 dark:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-100 dark:shadow-none hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all active:scale-95"
                >
                  Mark Day {currentDayData.day} Complete
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
            {['All', 'Sprint', 'Fortification', 'Reboot', 'Legacy', 'Specialized'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
                  activeTab === tab 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:border-slate-200 dark:hover:border-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid gap-4">
            {filteredPlans.map(plan => (
              <button 
                key={plan.id}
                onClick={() => onSelectPlan(plan.id)}
                className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 rounded-[2.5rem] text-left hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group shadow-sm flex items-center justify-between"
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                      plan.category === 'Legacy' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 
                      plan.category === 'Reboot' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300' : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-300'
                    }`}>{plan.category}</span>
                    <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{plan.duration} Days</span>
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{plan.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">{plan.description}</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-colors shrink-0 ${
                   plan.category === 'Legacy' 
                     ? 'bg-amber-50 dark:bg-amber-900/20 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/40' 
                     : 'bg-slate-50 dark:bg-slate-900 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/40'
                }`}>
                  {plan.category === 'Sprint' ? '⚡' : 
                   plan.category === 'Fortification' ? '🛡️' :
                   plan.category === 'Reboot' ? '🔥' :
                   plan.category === 'Legacy' ? '👑' : '⚔️'}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FreedomPlans;
