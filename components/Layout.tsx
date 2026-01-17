
import React from 'react';
import { AppSection } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: AppSection;
  onSectionChange: (section: AppSection) => void;
  streak: number;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, onSectionChange, streak }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto bg-white dark:bg-slate-900 shadow-xl relative transition-colors duration-500">
      {/* Header */}
      <header className="p-6 border-b dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky top-0 z-20 transition-colors">
        <div>
          <h1 className="text-2xl font-bold text-indigo-900 dark:text-indigo-400 serif">Purity Guardian</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-tight">Your Sanctuary of Peace</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-full border border-indigo-100 dark:border-indigo-800 shadow-sm">
            <span className="text-lg">🔥</span>
            <span className="font-black text-indigo-700 dark:text-indigo-300 text-sm">{streak}d</span>
          </div>
          <button 
            onClick={() => onSectionChange(AppSection.SETTINGS)}
            className={`p-2 rounded-full transition-all ${activeSection === AppSection.SETTINGS ? 'bg-indigo-600 text-white rotate-45 shadow-lg shadow-indigo-200 dark:shadow-none' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-32 p-6 bg-slate-50/30 dark:bg-slate-950/20">
        {children}
      </main>

      {/* Panic Button - Sticky Overlay */}
      <button 
        onClick={() => onSectionChange(AppSection.PANIC)}
        className="fixed bottom-28 right-6 w-16 h-16 rounded-full bg-rose-500 text-white shadow-2xl flex items-center justify-center hover:bg-rose-600 hover:scale-105 active:scale-90 transition-all z-20 group"
      >
        <span className="text-2xl group-hover:animate-pulse">🆘</span>
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 px-2 py-3 overflow-x-auto no-scrollbar flex justify-around items-center z-10 shadow-2xl">
        <NavButton 
          active={activeSection === AppSection.DASHBOARD} 
          onClick={() => onSectionChange(AppSection.DASHBOARD)} 
          label="Home" 
          icon="🏠" 
        />
        <NavButton 
          active={activeSection === AppSection.PLANS} 
          onClick={() => onSectionChange(AppSection.PLANS)} 
          label="Plans" 
          icon="🎯" 
        />
        <NavButton 
          active={activeSection === AppSection.PRAYER} 
          onClick={() => onSectionChange(AppSection.PRAYER)} 
          label="Prayer" 
          icon="🙏" 
        />
        <NavButton 
          active={activeSection === AppSection.FRIENDS} 
          onClick={() => onSectionChange(AppSection.FRIENDS)} 
          label="Band" 
          icon="🛡️" 
        />
        <NavButton 
          active={activeSection === AppSection.WORSHIP} 
          onClick={() => onSectionChange(AppSection.WORSHIP)} 
          label="Music" 
          icon="🎵" 
        />
        <NavButton 
          active={activeSection === AppSection.ACCOUNTABILITY} 
          onClick={() => onSectionChange(AppSection.ACCOUNTABILITY)} 
          label="Circle" 
          icon="🤝" 
        />
        <NavButton 
          active={activeSection === AppSection.WISDOM} 
          onClick={() => onSectionChange(AppSection.WISDOM)} 
          label="Wisdom" 
          icon="🕯️" 
        />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean, onClick: () => void, label: string, icon: string }> = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center transition-all px-3 shrink-0 ${active ? 'scale-110 text-indigo-600 dark:text-indigo-400' : 'text-slate-400 opacity-70 hover:opacity-100'}`}
  >
    <span className="text-xl mb-1">{icon}</span>
    <span className={`text-[8px] font-black uppercase tracking-wider ${active ? 'opacity-100' : 'opacity-70'}`}>{label}</span>
  </button>
);

export default Layout;
