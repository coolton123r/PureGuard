
export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  dateEarned?: string;
  isLimited?: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  requirement: number;
  progress: number;
  rewardBadgeId: string;
  isLimited?: boolean;
  endsIn?: string;
}

export interface BiblePlanDay {
  day: number;
  verse: string;
  reference: string;
  meditation: string;
  task: string;
}

export interface BiblePlan {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: string;
  days: BiblePlanDay[];
}

export interface RecoveryPath {
  summary: string;
  strengths: string[];
  vulnerabilities: string[];
  recommendedActions: string[];
}

export interface Friend {
  id: string;
  name: string;
  streak: number;
  lastActive: string;
  avatar: string;
}

export interface PrayerRequest {
  id: string;
  userAlias: string;
  content: string;
  timestamp: Date;
  supportCount: number;
}

export interface UserProfile {
  name: string;
  email?: string;
  isLoggedIn: boolean;
  streak: number;
  lastRelapseDate: string | null;
  seeds: number;
  dailyGoal: string;
  badges: Badge[];
  activePlanId?: string;
  planProgress: number; // Day count
  recoveryPath?: RecoveryPath;
  friends: Friend[];
  settings: {
    notifications: boolean;
    anonymousMode: boolean;
    partnerEmail: string;
    theme: 'indigo' | 'violet' | 'emerald';
    darkMode: boolean;
  };
}

export interface Quote {
  text: string;
  author: string;
  type: 'bible' | 'inspirational';
  reference?: string;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  userAlias?: string;
}

export enum AppSection {
  DASHBOARD = 'dashboard',
  SOUL_MENTOR = 'soul-mentor',
  GARDEN = 'garden',
  WISDOM = 'wisdom',
  PANIC = 'panic',
  ACCOUNTABILITY = 'accountability',
  CHALLENGES = 'challenges',
  SETTINGS = 'settings',
  QUIZ = 'quiz',
  PLANS = 'plans',
  FRIENDS = 'friends',
  PRAYER = 'prayer',
  WORSHIP = 'worship'
}
