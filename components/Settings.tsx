
import React from 'react';
import { UserProfile } from '../types';

interface SettingsProps {
  user: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onReset: () => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdate, onReset }) => {
  const toggleSetting = (key: keyof UserProfile['settings']) => {
    onUpdate({
      settings: {
        ...user.settings,
        [key]: !user.settings[key as any]
      }
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 serif">Settings</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Customize your sanctuary of peace.</p>
      </header>

      <section className="space-y-6">
        <div>
          <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Identity</h3>
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 shadow-sm">
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase mb-1 ml-1">Guardian Name</label>
            <input 
              type="text" 
              value={user.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
              placeholder="Your Alias"
            />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Appearance</h3>
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm divide-y divide-slate-50 dark:divide-slate-700">
            <div className="flex items-center justify-between p-6">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">Dark Mode</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Easier on the eyes at night</p>
              </div>
              <button 
                onClick={() => toggleSetting('darkMode')}
                className={`w-12 h-6 rounded-full transition-colors relative ${user.settings.darkMode ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${user.settings.darkMode ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Preferences</h3>
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm divide-y divide-slate-50 dark:divide-slate-700">
            <div className="flex items-center justify-between p-6">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">Quiet Mode</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Silence all notifications after 9PM</p>
              </div>
              <button 
                onClick={() => toggleSetting('notifications')}
                className={`w-12 h-6 rounded-full transition-colors relative ${user.settings.notifications ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${user.settings.notifications ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between p-6">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">Anonymous Circle</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Hide your profile details in Accountability</p>
              </div>
              <button 
                onClick={() => toggleSetting('anonymousMode')}
                className={`w-12 h-6 rounded-full transition-colors relative ${user.settings.anonymousMode ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${user.settings.anonymousMode ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Accountability Partner</h3>
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">We will send a weekly progress report to this email. Leave blank to disable.</p>
            <input 
              type="email" 
              value={user.settings.partnerEmail}
              onChange={(e) => onUpdate({ settings: { ...user.settings, partnerEmail: e.target.value } })}
              className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500 dark:text-white"
              placeholder="partner@example.com"
            />
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={() => {
              if (confirm("Are you sure? This will wipe your streak, badges, and garden progress forever. This action cannot be undone.")) {
                onReset();
              }
            }}
            className="w-full py-4 bg-rose-50 dark:bg-rose-950/20 text-rose-500 font-bold rounded-2xl text-sm border border-rose-100 dark:border-rose-900/50 hover:bg-rose-100 dark:hover:bg-rose-950/40 transition-colors"
          >
            Master Reset (Danger Zone)
          </button>
        </div>
      </section>

      <div className="text-center py-4">
        <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">Purity Guardian v3.1.0</p>
      </div>
    </div>
  );
};

export default Settings;
