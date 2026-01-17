
import React from 'react';

const WORSHIP_PLAYLISTS = [
  {
    category: 'Peace & Rest',
    icon: '🌊',
    color: 'bg-blue-500',
    tracks: [
      { title: 'The Blessing', artist: 'Kari Jobe', link: 'https://www.youtube.com/results?search_query=the+blessing+kari+jobe' },
      { title: 'Peace Be Still', artist: 'The Belonging Co', link: 'https://www.youtube.com/results?search_query=peace+be+still+belonging+co' },
      { title: 'Rest On Us', artist: 'Maverick City Music', link: 'https://www.youtube.com/results?search_query=rest+on+us+maverick+city+music' }
    ]
  },
  {
    category: 'Strength & Warfare',
    icon: '🛡️',
    color: 'bg-rose-600',
    tracks: [
      { title: 'Battle Belongs', artist: 'Phil Wickham', link: 'https://www.youtube.com/results?search_query=battle+belongs+phil+wickham' },
      { title: 'Graves Into Gardens', artist: 'Elevation Worship', link: 'https://www.youtube.com/results?search_query=graves+into+gardens+elevation' },
      { title: 'Firm Foundation', artist: 'Cody Carnes', link: 'https://www.youtube.com/results?search_query=firm+foundation+cody+carnes' }
    ]
  },
  {
    category: 'Praise & Freedom',
    icon: '🕊️',
    color: 'bg-emerald-500',
    tracks: [
      { title: 'Promises', artist: 'Maverick City Music', link: 'https://www.youtube.com/results?search_query=promises+maverick+city+music' },
      { title: 'Glorious Day', artist: 'Passion', link: 'https://www.youtube.com/results?search_query=glorious+day+passion' },
      { title: 'Living Hope', artist: 'Phil Wickham', link: 'https://www.youtube.com/results?search_query=living+hope+phil+wickham' }
    ]
  }
];

const Worship: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white serif italic">The Sound of Freedom</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Praise is a weapon. Music heals the soul.</p>
      </header>

      <div className="space-y-10">
        {WORSHIP_PLAYLISTS.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <div className="flex items-center space-x-3">
               <div className={`w-10 h-10 ${section.color} rounded-2xl flex items-center justify-center text-xl shadow-lg`}>
                 {section.icon}
               </div>
               <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 serif">{section.category}</h3>
            </div>

            <div className="grid gap-3">
              {section.tracks.map((track, tidx) => (
                <a 
                  key={tidx}
                  href={track.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between group hover:border-indigo-300 dark:hover:border-indigo-500 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-indigo-500 dark:text-indigo-400 shadow-inner group-hover:scale-110 transition-transform">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                       </svg>
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">{track.title}</h4>
                       <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">{track.artist}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Listen →</span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="bg-indigo-900 dark:bg-slate-900 rounded-[2.5rem] p-8 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold serif italic mb-2">Build Your Own Fortress</h3>
          <p className="text-indigo-200 dark:text-slate-400 text-xs max-w-xs mx-auto mb-6">Create a dedicated playlist for your hardest moments. Surround yourself with truth.</p>
          <div className="flex items-center justify-center space-x-4">
             <a href="https://spotify.com" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">🟢</a>
             <a href="https://music.apple.com" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">🍎</a>
             <a href="https://youtube.com" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">🔴</a>
          </div>
        </div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Worship;
