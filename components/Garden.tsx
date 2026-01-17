
import React from 'react';

const Garden: React.FC<{ seeds: number }> = ({ seeds }) => {
  const plants = [
    { emoji: '🌱', label: 'Seedling', cost: 1 },
    { emoji: '🌿', label: 'Fern', cost: 3 },
    { emoji: '🌻', label: 'Sunflower', cost: 7 },
    { emoji: '🌳', label: 'Oak', cost: 14 },
    { emoji: '🏰', label: 'Sanctuary', cost: 30 },
  ];

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white serif">Your Virtual Sanctuary</h2>
        <p className="text-slate-500 dark:text-slate-400">Every day of purity plants a new seed of life.</p>
      </header>

      {/* Garden Visualization */}
      <div className="aspect-square bg-gradient-to-b from-sky-100 to-green-100 dark:from-sky-900/30 dark:to-emerald-900/30 rounded-3xl border-4 border-white dark:border-slate-800 shadow-xl flex items-center justify-center p-8 relative overflow-hidden transition-colors">
        {/* Sky / Clouds */}
        <div className="absolute top-10 left-10 w-20 h-8 bg-white/40 dark:bg-white/10 rounded-full blur-md animate-pulse"></div>
        <div className="absolute top-20 right-10 w-16 h-6 bg-white/40 dark:bg-white/10 rounded-full blur-md animate-pulse [animation-delay:-2s]"></div>

        <div className="grid grid-cols-4 gap-8 z-10">
          {Array.from({ length: Math.min(seeds, 16) }).map((_, i) => (
            <div key={i} className="text-4xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
              {plants[Math.min(Math.floor(i/3), plants.length-1)].emoji}
            </div>
          ))}
          {seeds === 0 && (
            <div className="col-span-4 text-center">
              <p className="text-slate-400 dark:text-slate-600 italic text-sm">Your garden is waiting for its first seed...</p>
              <p className="text-4xl mt-4 grayscale opacity-20 dark:opacity-10">🍂</p>
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-500/20 dark:bg-emerald-900/20 blur-xl"></div>
      </div>

      {/* Rewards List */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-widest px-2">Garden Milestones</h3>
        {plants.map((p, i) => (
          <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${
            seeds >= p.cost 
              ? 'bg-white dark:bg-slate-800 border-green-100 dark:border-emerald-800/50' 
              : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 opacity-60'
          }`}>
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{p.emoji}</span>
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-100">{p.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{p.cost} Days Required</p>
              </div>
            </div>
            {seeds >= p.cost ? (
              <span className="text-green-500 dark:text-emerald-400 font-black text-xs uppercase tracking-tighter">Unlocked</span>
            ) : (
              <div className="h-1.5 w-16 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 dark:bg-indigo-400" style={{ width: `${(seeds/p.cost) * 100}%` }}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Garden;
