
import React from 'react';

interface LoginProps {
  onLogin: (provider: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="animate-fadeIn">
          <div className="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-200 dark:shadow-indigo-900/20 rotate-12 hover:rotate-0 transition-transform duration-500">
            <span className="text-5xl">🛡️</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white serif italic mb-2">Purity Guardian</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Reclaiming your soul, one breath at a time.</p>
        </div>

        <div className="space-y-4 pt-10 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <button 
            onClick={() => onLogin('Google')}
            className="w-full flex items-center justify-center space-x-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl shadow-sm hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-all group"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
            <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">Continue with Google</span>
          </button>

          <button 
            onClick={() => onLogin('Apple')}
            className="w-full flex items-center justify-center space-x-3 bg-slate-900 dark:bg-slate-100 border border-slate-900 dark:border-white p-4 rounded-2xl shadow-sm hover:shadow-md hover:opacity-90 transition-all"
          >
            <svg className="w-5 h-5 text-white dark:text-slate-900" viewBox="0 0 384 512" fill="currentColor">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
            </svg>
            <span className="font-bold text-white dark:text-slate-900 text-sm">Continue with Apple</span>
          </button>

          <button 
            onClick={() => onLogin('Microsoft')}
            className="w-full flex items-center justify-center space-x-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl shadow-sm hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 23 23">
              <rect x="0" y="0" width="10.8" height="10.8" fill="#f25022"/>
              <rect x="12.2" y="0" width="10.8" height="10.8" fill="#7fba00"/>
              <rect x="0" y="12.2" width="10.8" height="10.8" fill="#00a4ef"/>
              <rect x="12.2" y="12.2" width="10.8" height="10.8" fill="#ffb900"/>
            </svg>
            <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">Continue with Microsoft</span>
          </button>
        </div>

        <div className="pt-12 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em] max-w-[200px] mx-auto leading-relaxed">
            By continuing, you join a community dedicated to purity and wholeness.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
