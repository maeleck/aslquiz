import React from 'react';
import { Card } from './Card';
import type { Category, SubCategory } from '../types';
import { QuestionMarkCircleIcon, StopwatchIcon, PuzzlePieceIcon } from './Icons';

interface SubCategorySelectorProps {
  category: Category;
  onSelect: (subCategory: SubCategory) => void;
}

const subCategories: { id: SubCategory; label: string; description: string; icon: React.FC<{className?: string}> }[] = [
  { id: 'quiz', label: 'Quiz', description: 'Guess the letter from the sign.', icon: QuestionMarkCircleIcon },
  { id: 'time-attack', label: 'Time Attack', description: 'Test your speed and accuracy.', icon: StopwatchIcon },
  { id: 'matching', label: 'Matching Game', description: 'Match signs to letters.', icon: PuzzlePieceIcon },
];

const categoryColors: { [key in Category]: { text: string; bg: string; border: string; hoverBg: string } } = {
    alphabet:     { text: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-900/50', border: 'border-sky-500', hoverBg: 'hover:bg-sky-100 dark:hover:bg-sky-800/60' },
    vocabulary:   { text: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/50', border: 'border-green-500', hoverBg: 'hover:bg-green-100 dark:hover:bg-green-800/60' },
    phrases:      { text: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/50', border: 'border-purple-500', hoverBg: 'hover:bg-purple-100 dark:hover:bg-purple-800/60' },
    collectibles: { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/50', border: 'border-amber-500', hoverBg: 'hover:bg-amber-100 dark:hover:bg-amber-800/60' },
    dictionary:   { text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/50', border: 'border-blue-500', hoverBg: 'hover:bg-blue-100 dark:hover:bg-blue-800/60' },
    options:      { text: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-800/50', border: 'border-slate-500', hoverBg: 'hover:bg-slate-100 dark:hover:bg-slate-700/60' },
};


export const SubCategorySelector: React.FC<SubCategorySelectorProps> = ({ category, onSelect }) => {
    const colors = categoryColors[category];
    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

    const isEnabled = (subId: SubCategory) => {
        // Currently, only the alphabet quiz is enabled.
        return category === 'alphabet' && subId === 'quiz';
    }

  return (
    <Card className="h-full flex flex-col">
        <h2 className={`text-2xl font-bold mb-4 text-center ${colors.text}`}>{categoryTitle} Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subCategories.map(sub => {
                const enabled = isEnabled(sub.id);
                return (
                    <button 
                        key={sub.id} 
                        onClick={() => onSelect(sub.id)}
                        disabled={!enabled}
                        className={`p-6 rounded-lg border-2 text-left transition-all duration-200 flex flex-col
                            ${enabled ? `${colors.border} ${colors.hoverBg} cursor-pointer` : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed opacity-60'}
                            focus:outline-none focus:ring-4 ${enabled ? 'focus:ring-sky-300 dark:focus:ring-sky-800' : 'focus:ring-slate-300 dark:focus:ring-slate-600'}
                        `}
                    >
                        <div className="flex items-center mb-2">
                           <sub.icon className={`h-6 w-6 mr-3 ${enabled ? colors.text : 'text-slate-400'}`} />
                           <h3 className={`text-xl font-bold ${enabled ? 'text-slate-800 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>{sub.label}</h3>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 flex-grow">{sub.description}</p>
                        {!enabled && (
                             <span className="mt-4 text-xs font-semibold text-amber-600 dark:text-amber-500 bg-amber-100 dark:bg-amber-900/50 px-2 py-1 rounded-full self-start">Coming Soon</span>
                        )}
                    </button>
                )
            })}
        </div>
    </Card>
  );
};