
import React, { useState, useEffect } from 'react';
import { AppSection, UserProfile, Challenge, Badge, RecoveryPath } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Wisdom from './components/Wisdom';
import SoulMentor from './components/SoulMentor';
import Panic from './components/Panic';
import Garden from './components/Garden';
import Accountability from './components/Accountability';
import Challenges from './components/Challenges';
import Settings from './components/Settings';
import Quiz from './components/Quiz';
import FreedomPlans from './components/FreedomPlans';
import Login from './components/Login';
import Friends from './components/Friends';
import Prayer from './components/Prayer';
import Worship from './components/Worship';

const INITIAL_CHALLENGES: Challenge[] = [
  { id: '1', title: 'The 7-Day Sprint', description: 'Maintain your streak for 7 consecutive days.', requirement: 7, progress: 0, rewardBadgeId: 'sprint' },
  { id: '2', title: 'Community Pillar', description: 'Participate in the Circle discussions.', requirement: 5, progress: 2, rewardBadgeId: 'pillar' },
  { id: '3', title: 'Guardian of the Weekend', description: 'Stay strong during the high-risk weekend period.', requirement: 3, progress: 0, rewardBadgeId: 'weekend', isLimited: true, endsIn: '2d 4h' }
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.DASHBOARD);
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('purity_guardian_user_v3');
    return saved ? JSON.parse(saved) : {
      name: 'Warrior',
      isLoggedIn: false,
      streak: 1,
      lastRelapseDate: null,
      seeds: 1,
      dailyGoal: 'Stay pure today',
      badges: [],
      planProgress: 0,
      friends: [],
      settings: {
        notifications: true,
        anonymousMode: false,
        partnerEmail: '',
        theme: 'indigo',
        darkMode: false
      }
    };
  });

  // Persist user data
  useEffect(() => {
    localStorage.setItem('purity_guardian_user_v3', JSON.stringify(user));
  }, [user]);

  // Handle Dark Mode
  useEffect(() => {
    if (user.settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [user.settings.darkMode]);

  // Update challenge progress based on user stats
  useEffect(() => {
    setChallenges(prev => prev.map(c => {
      if (c.id === '1') return { ...c, progress: Math.min(user.streak, c.requirement) };
      return c;
    }));
  }, [user.streak]);

  const handleLogin = (provider: string) => {
    setUser(prev => ({ 
      ...prev, 
      isLoggedIn: true, 
      name: prev.name === 'Warrior' ? `${provider} User` : prev.name 
    }));
  };

  const handleClaimBadge = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return;

    const newBadge: Badge = {
      id: challenge.rewardBadgeId,
      name: challenge.rewardBadgeId === 'sprint' ? '⚡ Sprint King' : challenge.rewardBadgeId === 'weekend' ? '🛡️ Weekend Warrior' : '🌟 Community Pillar',
      emoji: challenge.rewardBadgeId === 'sprint' ? '⚡' : challenge.rewardBadgeId === 'weekend' ? '🛡️' : '🤝',
      description: challenge.description,
      dateEarned: new Date().toLocaleDateString(),
      isLimited: challenge.isLimited
    };

    if (!user.badges.find(b => b.id === newBadge.id)) {
      setUser(prev => ({ ...prev, badges: [...prev.badges, newBadge], seeds: prev.seeds + 5 }));
      alert(`Congratulations! You've earned the ${newBadge.name} badge!`);
    }
  };

  const handleRelapse = () => {
    setUser(prev => ({
      ...prev,
      streak: 0,
      lastRelapseDate: new Date().toISOString()
    }));
    setActiveSection(AppSection.PANIC);
  };

  const handleUpdateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const handleQuizComplete = (path: RecoveryPath) => {
    setUser(prev => ({ ...prev, recoveryPath: path }));
  };

  const handleSelectPlan = (planId: string) => {
    setUser(prev => ({ ...prev, activePlanId: planId, planProgress: 0 }));
  };

  const handleCompleteDay = () => {
    setUser(prev => ({ ...prev, planProgress: prev.planProgress + 1, seeds: prev.seeds + 2 }));
    alert("Day complete! Your spirit is strengthened and your garden grows.");
  };

  const handleReset = () => {
    localStorage.removeItem('purity_guardian_user_v3');
    window.location.reload();
  };

  if (!user.isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case AppSection.DASHBOARD:
        return <Dashboard user={user} onRelapse={handleRelapse} onNavigateToQuiz={() => setActiveSection(AppSection.QUIZ)} />;
      case AppSection.WISDOM:
        return <Wisdom />;
      case AppSection.CHALLENGES:
        return <Challenges challenges={challenges} earnedBadges={user.badges} onClaim={handleClaimBadge} />;
      case AppSection.SOUL_MENTOR:
        return <SoulMentor />;
      case AppSection.PANIC:
        return <Panic onBack={() => setActiveSection(AppSection.DASHBOARD)} />;
      case AppSection.GARDEN:
        return <Garden seeds={user.streak} />;
      case AppSection.ACCOUNTABILITY:
        return <Accountability />;
      case AppSection.SETTINGS:
        return <Settings user={user} onUpdate={handleUpdateUser} onReset={handleReset} />;
      case AppSection.QUIZ:
        return <Quiz onComplete={handleQuizComplete} />;
      case AppSection.PLANS:
        return <FreedomPlans user={user} onSelectPlan={handleSelectPlan} onCompleteDay={handleCompleteDay} />;
      case AppSection.FRIENDS:
        return <Friends user={user} onUpdate={handleUpdateUser} />;
      case AppSection.PRAYER:
        return <Prayer />;
      case AppSection.WORSHIP:
        return <Worship />;
      default:
        return <Dashboard user={user} onRelapse={handleRelapse} onNavigateToQuiz={() => setActiveSection(AppSection.QUIZ)} />;
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-500">
      <Layout 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        streak={user.streak}
      >
        {renderSection()}
      </Layout>
    </div>
  );
};

export default App;
