import React from 'react';
import { Card } from './Card';
import type { TreeSortMode } from '../types';
import { UsersIcon, GraduationCapIcon } from './Icons';

interface TreeHomeZoneProps {
    onSelect: (mode: TreeSortMode) => void;
}

export const TreeHomeZone: React.FC<TreeHomeZoneProps> = ({ onSelect }) => {
    return (
        <Card className="h-full flex flex-col">
            <h3 className="text-2xl font-bold mb-2 text-center text-slate-700 dark:text-slate-200">Vocabulary Tree</h3>
            <p className="text-center text-slate-500 dark:text-slate-400 mb-6">Choose how you want to learn new words.</p>

            <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button
                        onClick={() => onSelect('topic')}
                        className="p-6 rounded-xl border-2 text-center transition-all duration-200 flex flex-col items-center justify-center
                                bg-green-50 dark:bg-green-900/50 border-green-500 hover:bg-green-100 dark:hover:bg-green-800/60
                                focus:outline-none focus:ring-4 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-green-400"
                        aria-label="Learn vocabulary sorted by topic"
                    >
                        <UsersIcon className="h-10 w-10 mb-3 text-green-600 dark:text-green-400" />
                        <h4 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100">By Topic</h4>
                        <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">Unlock and master words in thematic groups.</p>
                    </button>
                    <button
                        onClick={() => onSelect('commonality')}
                        className="p-6 rounded-xl border-2 text-center transition-all duration-200 flex flex-col items-center justify-center
                                bg-sky-50 dark:bg-sky-900/50 border-sky-500 hover:bg-sky-100 dark:hover:bg-sky-800/60
                                focus:outline-none focus:ring-4 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-sky-400"
                        aria-label="Learn vocabulary sorted by commonality"
                    >
                        <GraduationCapIcon className="h-10 w-10 mb-3 text-sky-600 dark:text-sky-400" />
                        <h4 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100">By Commonality</h4>
                        <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">Learn words in progressive levels of difficulty.</p>
                    </button>
                </div>
            </div>
        </Card>
    );
};