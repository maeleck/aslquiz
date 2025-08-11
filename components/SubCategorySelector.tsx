

import React from 'react';
import { Card } from './Card';
import type { Category, SubCategory, VocabTopic } from '../types';
import { QuestionMarkCircleIcon, StopwatchIcon, PuzzlePieceIcon, SwitchHorizontalIcon, RefreshIcon, ArrowLeftIcon } from './Icons';
import { STRUCTURED_VOCAB, VOCAB_BY_COMMONALITY } from '../constants';

interface SubCategorySelectorProps {
  category: Category;
  onSelect: (subCategory: SubCategory) => void;
  topic?: VocabTopic;
  level?: number;
  onBack?: () => void;
  onShuffleWords?: () => void;
}

const allSubCategories: { id: SubCategory; label: string; description: string; icon: React.FC<{className?: string}> }[] = [
  { id: 'quiz', label: 'Quiz', description: 'Guess the {noun} from the sign.', icon: QuestionMarkCircleIcon },
  { id: 'reversal-quiz', label: 'Reversal Quiz', description: 'Guess the sign from the {noun}.', icon: SwitchHorizontalIcon },
  { id: 'time-attack', label: 'Time Attack', description: 'Test your speed and accuracy.', icon: StopwatchIcon },
  { id: 'reversal-time-attack', label: 'Reversal Time Attack', description: 'A fast-paced reversal challenge.', icon: StopwatchIcon },
  { id: 'matching', label: 'Matching Game', description: 'Match signs to {noun}s.', icon: PuzzlePieceIcon },
];

const categoryColors: { [key in Category]: { text: string; bg: string; border: string; hoverBg: string } } = {
    alphabet:     { text: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/50', border: 'border-indigo-500', hoverBg: 'hover:bg-indigo-100 dark:hover:bg-indigo-800/60' },
    vocabulary:   { text: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/50', border: 'border-green-500', hoverBg: 'hover:bg-green-100 dark:hover:bg-green-800/60' },
    phrases:      { text: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/50', border: 'border-purple-500', hoverBg: 'hover:bg-purple-100 dark:hover:bg-purple-800/60' },
    tree:         { text: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/50', border: 'border-indigo-500', hoverBg: 'hover:bg-indigo-100 dark:hover:bg-indigo-800/60' },
    adventure:    { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/50', border: 'border-amber-500', hoverBg: 'hover:bg-amber-100 dark:hover:bg-amber-800/60' },
    dictionary:   { text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/50', border: 'border-blue-500', hoverBg: 'hover:bg-blue-100 dark:hover:bg-blue-800/60' },
    story:        { text: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/50', border: 'border-rose-500', hoverBg: 'hover:bg-rose-100 dark:hover:bg-rose-800/60' },
};


export const SubCategorySelector: React.FC<SubCategorySelectorProps> = ({ category, onSelect, topic, level, onBack, onShuffleWords }) => {
    const colors = categoryColors[topic ? 'tree' : category];
    
    let title: string;
    let wordsForLevel: string[] = [];
    const subCategories = allSubCategories.filter(sub => {
        if (category === 'phrases' && sub.id === 'matching') return false;
        return true;
    });

    if (category === 'tree' && level) {
        if (topic) { // Topic Mode
            title = `${topic.label} - Level ${level}`;
            const levelData = STRUCTURED_VOCAB[topic.id]?.levels.find(l => l.level === level);
            wordsForLevel = levelData?.words || [];
        } else { // Commonality Mode
            title = `Commonality - Level ${level}`;
            const levelData = VOCAB_BY_COMMONALITY.find(l => l.level === level);
            wordsForLevel = levelData?.words || [];
        }
    } else {
        const categoryName = category === 'vocabulary' ? 'Wildcard' : category.charAt(0).toUpperCase() + category.slice(1);
        title = `${topic ? topic.label : categoryName} Activities`;
    }

    const isEnabled = (subId: SubCategory) => {
        if (category === 'tree' && level) {
            if (wordsForLevel.length === 0) return false;
            // The full pool of words for the level determines availability, not the random 10-word set.
            if (subId === 'matching' && wordsForLevel.length < 8) return false;
            if ((subId === 'reversal-quiz' || subId === 'reversal-time-attack') && wordsForLevel.length < 4) return false;
            return true;
        }
        if (category === 'alphabet' || category === 'vocabulary') return true;
        if (category === 'phrases') return subId !== 'matching';
        return false;
    }

    const handleShuffleClick = () => {
        if (onShuffleWords && window.confirm('Are you sure you want to get 10 new words?')) {
            onShuffleWords();
        }
    };

  return (
    <Card className="h-full flex flex-col">
        <div className="relative flex items-center justify-center mb-4">
            {onBack && (
                <button
                    onClick={onBack}
                    className="absolute left-0 p-2 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-stone-800 focus:ring-indigo-500 transition-colors"
                    aria-label="Back to level selection"
                    title="Back to level selection"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                </button>
            )}
            <h2 className={`text-xl md:text-2xl font-bold text-center px-12 ${colors.text}`}>{title}</h2>
            {onShuffleWords && (
                 <button
                    onClick={handleShuffleClick}
                    className="absolute right-0 p-2 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-stone-800 focus:ring-indigo-500 transition-colors"
                    aria-label="Get new words"
                    title="Get new words"
                >
                    <RefreshIcon className="h-5 w-5" />
                </button>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subCategories.map(sub => {
                const enabled = isEnabled(sub.id);
                const noun = (category === 'alphabet' || sub.label.toLowerCase().includes('alphabet')) ? 'letter' : 'word';
                const description = sub.description.replace(/{noun}/g, noun);
                
                return (
                    <button 
                        key={sub.id} 
                        onClick={() => onSelect(sub.id)}
                        disabled={!enabled}
                        className={`p-6 rounded-lg border-2 text-left transition-all duration-200 flex flex-col
                            ${enabled ? `${colors.border} ${colors.hoverBg} cursor-pointer` : 'border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 cursor-not-allowed opacity-60'}
                            focus:outline-none focus:ring-4 ${enabled ? 'focus:ring-indigo-300 dark:focus:ring-indigo-800' : 'focus:ring-stone-300 dark:focus:ring-stone-600'}
                        `}
                    >
                        <div className="flex items-center mb-2">
                           <sub.icon className={`h-6 w-6 mr-3 ${enabled ? colors.text : 'text-stone-400'}`} />
                           <h3 className={`text-xl font-bold ${enabled ? 'text-stone-800 dark:text-stone-100' : 'text-stone-500 dark:text-stone-400'}`}>{sub.label}</h3>
                        </div>
                        <p className="text-stone-600 dark:text-stone-400 flex-grow">{description}</p>
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