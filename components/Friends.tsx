
import React, { useState } from 'react';
import { Friend, UserProfile } from '../types';

interface FriendsProps {
  user: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
}

const Friends: React.FC<FriendsProps> = ({ user, onUpdate }) => {
  const [friendCode, setFriendCode] = useState('');

  const addFriend = () => {
    if (!friendCode.trim()) return;
    const newFriend: Friend = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Guardian_${friendCode.substr(0, 4)}`,
      streak: Math.floor(Math.random() * 50) + 1,
      lastActive: 'Just now',
      avatar: '🛡️'
    };
    onUpdate({ friends: [...user.friends, newFriend] });
    setFriendCode('');
    alert("Friend added! You are now walking this path together.");
  };

  const pingFriend = (name: string) => {
    alert(`You sent an encouragement ping to ${name}! "Stay strong, brother!"`);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white serif">Your Band of Brothers</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Two are better than one, for they have a good return for their labor.</p>
      </header>

      <section className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm">
        <h3 className="text-xs font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-4">Add a Guardian</h3>
        <div className="flex space-x-2">
          <input 
            type="text" 
            value={friendCode}
            onChange={(e) => setFriendCode(e.target.value)}
            placeholder="Enter Friend Code"
            className="flex-1 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
          />
          <button 
            onClick={addFriend}
            className="bg-indigo-600 dark:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold text-xs hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
          >
            Add
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Active Allies</h3>
        {user.friends.length > 0 ? (
          user.friends.map(friend => (
            <div key={friend.id} className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-xl shadow-inner">
                  {friend.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{friend.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-indigo-500 dark:text-indigo-400 font-black tracking-tighter">🔥 {friend.streak} Days</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">• {friend.lastActive}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => pingFriend(friend.name)}
                className="p-3 bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-300 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-300 transition-all"
                title="Send Encouragement"
              >
                <span className="text-lg">🙌</span>
              </button>
            </div>
          ))
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem]">
            <p className="text-4xl mb-4 grayscale opacity-20">🛡️</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">No allies yet. Share your code to build your band.</p>
            <p className="mt-2 text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest">Code: GUARD-{user.name.substr(0, 3).toUpperCase()}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Friends;
