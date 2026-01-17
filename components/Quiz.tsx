
import React, { useState } from 'react';
import { analyzeQuizResults } from '../services/geminiService';
import { RecoveryPath } from '../types';

interface QuizProps {
  onComplete: (path: RecoveryPath) => void;
}

const QUESTIONS = [
  {
    id: 'trigger',
    text: "When are you most likely to encounter an urge?",
    options: ["Late at night alone", "When stressed or overwhelmed", "When bored and idle", "After an argument or feeling lonely"]
  },
  {
    id: 'frequency',
    text: "How deeply has this pattern rooted itself in your life?",
    options: ["Daily struggle", "A few times a week", "Occasionally, usually during crisis", "Just starting to feel like a problem"]
  },
  {
    id: 'other_addictions',
    text: "Do you find yourself escaping into other things as well?",
    options: ["Social Media scrolling", "Video games", "Excessive eating/spending", "Mostly just this one struggle"]
  },
  {
    id: 'motivation',
    text: "What is your deepest 'Why' for wanting to be pure?",
    options: ["My spiritual relationship", "My current or future spouse/family", "My mental health and self-respect", "My focus and productivity"]
  },
  {
    id: 'environment',
    text: "How much of your physical/digital environment is a trap?",
    options: ["My phone is full of triggers", "Social media is my main danger zone", "Environmental cues (bedroom, late hours)", "I've cleaned up but keep finding ways back"]
  }
];

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<RecoveryPath | null>(null);

  const handleAnswer = (option: string) => {
    const question = QUESTIONS[currentStep];
    const newAnswers = { ...answers, [question.id]: option };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      performAnalysis(newAnswers);
    }
  };

  const performAnalysis = async (finalAnswers: Record<string, string>) => {
    setIsAnalyzing(true);
    try {
      const analysis = await analyzeQuizResults(finalAnswers);
      setResult(analysis);
      onComplete(analysis);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-6 text-center py-20">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-indigo-100 dark:border-indigo-900/30 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-xl">✨</div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Crafting Your Path...</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">Our Soul Mentor is reviewing your heart and building a personalized map to freedom.</p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="space-y-8 animate-fadeIn pb-12">
        <header className="text-center">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm">🌿</div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white serif">Your Path to Freedom</h2>
        </header>

        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-8 shadow-xl shadow-indigo-100/30 dark:shadow-none space-y-6">
          <p className="text-slate-700 dark:text-slate-200 italic leading-relaxed text-lg">"{result.summary}"</p>
          
          <div className="grid md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-emerald-500 dark:text-emerald-400 uppercase tracking-widest">Your Strengths</h4>
              <ul className="space-y-2">
                {result.strengths.map((s, i) => (
                  <li key={i} className="flex items-start space-x-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="text-emerald-500 dark:text-emerald-400 mt-0.5">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-rose-400 dark:text-rose-500 uppercase tracking-widest">Key Triggers</h4>
              <ul className="space-y-2">
                {result.vulnerabilities.map((v, i) => (
                  <li key={i} className="flex items-start space-x-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="text-rose-400 dark:text-rose-500 mt-0.5">!</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-2">Recommended Strategy</h3>
          {result.recommendedActions.map((action, i) => (
            <div key={i} className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 p-5 rounded-2xl flex items-start space-x-4 shadow-sm hover:translate-x-1 transition-transform cursor-default">
              <div className="bg-indigo-600 dark:bg-indigo-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0">{i + 1}</div>
              <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200 leading-snug pt-1">{action}</p>
            </div>
          ))}
        </div>

        <button 
          onClick={() => {setResult(null); setCurrentStep(0); setAnswers({});}}
          className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          Retake Assessment
        </button>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[currentStep];

  return (
    <div className="space-y-8 animate-fadeIn py-4">
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white serif">Inner Compass</h2>
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Step {currentStep + 1} / {QUESTIONS.length}</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 dark:bg-indigo-400 transition-all duration-500" 
            style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-8 leading-snug">{currentQuestion.text}</h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              className="w-full text-left p-5 rounded-2xl border-2 border-slate-50 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:border-indigo-200 dark:hover:border-indigo-600 hover:bg-white dark:hover:bg-slate-800 transition-all text-sm font-medium text-slate-700 dark:text-slate-300 active:scale-95"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-[10px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-widest">Be honest with yourself. There is no judgment here.</p>
    </div>
  );
};

export default Quiz;
