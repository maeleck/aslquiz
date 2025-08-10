

import React from 'react';
import { Card } from './Card';
import type { Category, SubCategory, VocabTopic } from '../types';
import { QuestionMarkCircleIcon, StopwatchIcon, PuzzlePieceIcon, SwitchHorizontalIcon } from './Icons';
import { VOCAB_BY_TOPIC } from '../constants';

interface SubCategorySelectorProps {
  category: Category;
  onSelect: (subCategory: SubCategory) => void;
  topic?: VocabTopic;
  onBack?: () => void;
}

const allSubCategories: { id: SubCategory; label: string; description: string; icon: React.FC<{className?: string}> }[] = [
  { id: 'quiz', label: 'Quiz', description: 'Guess the {noun} from the sign.', icon: QuestionMarkCircleIcon },
  { id: 'reversal-quiz', label: 'Reversal Quiz', description: 'Guess the sign from the {noun}.', icon: SwitchHorizontalIcon },
  { id: 'time-attack', label: 'Time Attack', description: 'Test your speed and accuracy.', icon: StopwatchIcon },
  { id: 'reversal-time-attack', label: 'Reversal Time Attack', description: 'A fast-paced reversal challenge.', icon: SwitchHorizontalIcon },
  { id: 'matching', label: 'Matching Game', description: 'Match signs to {noun}s.', icon: PuzzlePieceIcon },
];

const categoryColors: { [key in Category]: { text: string; bg: string; border: string; hoverBg: string } } = {
    alphabet:     { text: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-900/50', border: 'border-sky-500', hoverBg: 'hover:bg-sky-100 dark:hover:bg-sky-800/60' },
    vocabulary:   { text: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/50', border: 'border-green-500', hoverBg: 'hover:bg-green-100 dark:hover:bg-green-800/60' },
    phrases:      { text: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/50', border: 'border-purple-500', hoverBg: 'hover:bg-purple-100 dark:hover:bg-purple-800/60' },
    tree:         { text: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/50', border: 'border-indigo-500', hoverBg: 'hover:bg-indigo-100 dark:hover:bg-indigo-800/60' },
    collectibles: { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/50', border: 'border-amber-500', hoverBg: 'hover:bg-amber-100 dark:hover:bg-amber-800/60' },
    dictionary:   { text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/50', border: 'border-blue-500', hoverBg: 'hover:bg-blue-100 dark:hover:bg-blue-800/60' },
    story:        { text: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/50', border: 'border-rose-500', hoverBg: 'hover:bg-rose-100 dark:hover:bg-rose-800/60' },
};


export const SubCategorySelector: React.FC<SubCategorySelectorProps> = ({ category, onSelect, topic, onBack }) => {
    const colors = categoryColors[topic ? 'tree' : category];
    const title = topic ? `${topic.label} Activities` : `${category.charAt(0).toUpperCase() + category.slice(1)} Activities`;

    const subCategories = allSubCategories.filter(sub => {
        if (category === 'phrases' && sub.id === 'matching') return false;
        return true;
    });

    const isEnabled = (subId: SubCategory) => {
        if (topic) {
            const topicWords = VOCAB_BY_TOPIC[topic.id];
            if (!topicWords || topicWords.length === 0) return false;
            if (subId === 'matching' && topicWords.length < 8) return false;
            if ((subId === 'reversal-quiz' || subId === 'reversal-time-attack') && topicWords.length < 4) return false;
            return true;
        }
        if (category === 'alphabet' || category === 'vocabulary') return true;
        if (category === 'phrases') return subId !== 'matching';
        return false;
    }

  return (
    <Card className="h-full flex flex-col">
        <div className="relative flex items-center justify-center mb-4">
            {onBack && (
                <button 
                    onClick={onBack} 
                    className="absolute left-0 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-md p-1"
                    aria-label="Back to Tree"
                >
                    &larr; Back to Tree
                </button>
            )}
            <h2 className={`text-2xl font-bold ${colors.text}`}>{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subCategories.map(sub => {
                const enabled = isEnabled(sub.id);
                const noun = category === 'alphabet' ? 'letter' : 'word';
                const description = sub.description.replace(/{noun}/g, noun);
                
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
                        <p className="text-slate-600 dark:text-slate-400 flex-grow">{description}</p>
                        {!enabled && (
                             <span className="mt-4 text-xs font-semibold text-amber-600 dark:text-amber-500 bg-amber-100 dark:bg-amber-900/50 px-2 py-1 rounded-full self-start">Not Enough Words</span>
                        )}
                    </button>
                )
            })}
        </div>
    </Card>
  );
};