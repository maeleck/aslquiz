import React, { useEffect, useState } from 'react';
import { Card } from './Card';
import { CogIcon } from './Icons';
import { ThemeToggle } from './ThemeToggle';
import { showRewardedVideo } from '../services/ads';
import type { Language } from '../types';

interface OptionsModalProps {
  onClose: () => void;
  onReset: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onAdReward: (points: number) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const LANGUAGES: { id: Language, label: string }[] = [
    { id: 'ASL', label: 'ASL' },
    { id: 'JSL', label: 'JSL' },
    { id: 'LSM', label: 'LSM' },
    { id: 'LSF', label: 'LSF' },
    { id: 'VSL', label: 'VSL' },
];

export const OptionsModal: React.FC<OptionsModalProps> = ({ onClose, onReset, theme, onThemeToggle, onAdReward, language, onLanguageChange }) => {
  const [isAdLoading, setIsAdLoading] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleWatchAd = async () => {
    setIsAdLoading(true);
    try {
        const { success, points } = await showRewardedVideo();
        if (success) {
            onAdReward(points);
        }
    } catch (e) {
        console.error("Ad service failed", e);
        alert("Sorry, the ad service is not available right now.");
    } finally {
        setIsAdLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="options-modal-title"
    >
      <div onClick={e => e.stopPropagation()} className="w-full max-w-md">
        <Card className="animate-fade-in-up">
            <div className="flex items-center mb-6">
                <CogIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400 mr-3" />
                <h2 id="options-modal-title" className="text-2xl font-bold text-stone-800 dark:text-stone-200">
                    Options
                </h2>
            </div>
            
            <div className="space-y-4 mb-6">
                <div className="p-4 bg-stone-100 dark:bg-stone-800/50 rounded-lg">
                    <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-2">Language</span>
                    <div className="grid grid-cols-3 gap-2">
                        {LANGUAGES.map(lang => {
                            const isSelected = language === lang.id;
                            const isDisabled = lang.id !== 'ASL';
                            return (
                                <button
                                    key={lang.id}
                                    onClick={() => onLanguageChange(lang.id)}
                                    disabled={isDisabled}
                                    className={`px-3 py-2 text-sm font-bold rounded-md transition-colors relative
                                        ${isSelected ? 'bg-indigo-600 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-300 dark:hover:bg-stone-600'}
                                        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                                    `}
                                    title={isDisabled ? `${lang.label} (Coming Soon)` : `Select ${lang.label}`}
                                >
                                    {lang.label}
                                    {isDisabled && <span className="absolute -top-1.5 -right-1.5 text-[10px] bg-amber-500 text-white font-semibold px-1.5 py-0.5 rounded-full">Soon</span>}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-stone-100 dark:bg-stone-800/50 rounded-lg">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">Appearance</span>
                    <ThemeToggle theme={theme} onToggle={onThemeToggle} />
                </div>

                <div className="flex items-center justify-between p-4 bg-stone-100 dark:bg-stone-800/50 rounded-lg">
                    <div className="flex flex-col">
                        <span className="font-semibold text-stone-700 dark:text-stone-300">Watch Ad for Reward</span>
                        <span className="text-xs text-stone-500 dark:text-stone-400">+100 Points</span>
                    </div>
                    <button 
                      onClick={handleWatchAd}
                      className="px-4 py-2 text-sm font-semibold rounded-md bg-green-500 hover:bg-green-600 text-white transition-colors disabled:bg-stone-400 disabled:cursor-wait"
                      disabled={isAdLoading}
                    >
                        {isAdLoading ? 'Loading...' : 'Watch Ad'}
                    </button>
                </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-red-800 dark:text-red-300">Danger Zone</h3>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1 mb-3">This action cannot be undone.</p>
                <button
                    onClick={onReset}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 transition-colors"
                    aria-label="Reset all progress"
                >
                    Reset All Progress
                </button>
            </div>
            
            <button
                onClick={onClose}
                className="mt-6 w-full bg-stone-200 hover:bg-stone-300 dark:bg-stone-700 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-colors"
                aria-label="Close modal"
            >
                Close
            </button>
        </Card>
      </div>
    </div>
  );
};