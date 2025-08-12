
import React from 'react';
import { Card } from './Card';
import type { TreeSortMode } from '../types';
import { UsersIcon, GraduationCapIcon, SparklesIcon } from './Icons';

interface TreeHomeZoneProps {
    onSelect: (mode: TreeSortMode) => void;
}

export const TreeHomeZone: React.FC<TreeHomeZoneProps> = ({ onSelect }) => {
    return (
        <Card className="h-full flex flex-col">
            <h3 className="text-2xl font-bold mb-2 text-center text-stone-700 dark:text-stone-200">Vocabulary Tree</h3>
            <p className="text-center text-stone-500 dark:text-stone-400 mb-6">Choose how you want to learn new words.</p>

            <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button
                        onClick={() => onSelect('topic')}
                        className="p-6 rounded-xl border-2 text-center transition-all duration-200 flex flex-col items-center justify-center
                                bg-green-50 dark:bg-green-900/50 border-green-500 hover:bg-green-100 dark:hover:bg-green-800/60
                                focus:outline-none focus:ring-4 focus:ring-offset-2 dark:focus:ring-offset-stone-950 focus:ring-green-400"
                        aria-label="Learn vocabulary sorted by topic"
                    >
                        <UsersIcon className="h-10 w-10 mb-3 text-green-600 dark:text-green-400" />
                        <h4 className="text-lg md:text-xl font-bold text-stone-800 dark:text-stone-100">By Topic</h4>
                        <p className="text-stone-600 dark:text-stone-400 mt-1 text-sm">Unlock and master words in thematic groups.</p>
                    </button>
                    <button
                        onClick={() => onSelect('commonality')}
                        className="p-6 rounded-xl border-2 text-center transition-all duration-200 flex flex-col items-center justify-center
                                bg-indigo-50 dark:bg-indigo-900/50 border-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-800/60
                                focus:outline-none focus:ring-4 focus:ring-offset-2 dark:focus:ring-offset-stone-950 focus:ring-indigo-400"
                        aria-label="Learn vocabulary sorted by commonality"
                    >
                        <GraduationCapIcon className="h-10 w-10 mb-3 text-indigo-600 dark:text-indigo-400" />
                        <h4 className="text-lg md:text-xl font-bold text-stone-800 dark:text-stone-100">By Commonality</h4>
                        <p className="text-stone-600 dark:text-stone-400 mt-1 text-sm">Learn words in progressive levels of difficulty.</p>
                    </button>
                    <button
                        onClick={() => onSelect('wildcard')}
                        className="p-6 rounded-xl border-2 text-center transition-all duration-200 flex flex-col items-center justify-center
                                bg-amber-50 dark:bg-amber-900/50 border-amber-500 hover:bg-amber-100 dark:hover:bg-amber-800/60
                                focus:outline-none focus:ring-4 focus:ring-offset-2 dark:focus:ring-offset-stone-950 focus:ring-amber-400"
                        aria-label="Review all unlocked vocabulary"
                    >
                        <SparklesIcon className="h-10 w-10 mb-3 text-amber-600 dark:text-amber-400" />
                        <h4 className="text-lg md:text-xl font-bold text-stone-800 dark:text-stone-100">Wildcard Review</h4>
                        <p className="text-stone-600 dark:text-stone-400 mt-1 text-sm">Practice with all the words you have unlocked.</p>
                    </button>
                </div>
            </div>
        </Card>
    );
};