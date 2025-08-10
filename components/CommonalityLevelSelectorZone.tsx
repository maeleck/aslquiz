import React from 'react';
import { Card } from './Card';
import { VOCAB_BY_COMMONALITY } from '../constants';
import { GraduationCapIcon } from './Icons';

interface CommonalityLevelSelectorZoneProps {
    onSelectLevel: (level: number) => void;
    onBack: () => void;
}

export const CommonalityLevelSelectorZone: React.FC<CommonalityLevelSelectorZoneProps> = ({ onSelectLevel, onBack }) => {
    const levels = VOCAB_BY_COMMONALITY;

    return (
        <Card className="h-full flex flex-col">
            <div className="relative flex items-center justify-center mb-6">
                <button 
                    onClick={onBack} 
                    className="absolute left-0 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-md p-1"
                    aria-label="Back to Sort Selection"
                >
                    &larr; Back
                </button>
                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Commonality Levels</h2>
            </div>

            {levels.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {levels.map(level => (
                        <button
                            key={level.level}
                            onClick={() => onSelectLevel(level.level)}
                            className="p-4 rounded-xl border-2 text-center transition-all duration-200 flex flex-col items-center justify-center h-full min-h-[140px]
                                       bg-indigo-50 dark:bg-indigo-900/50 border-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-800/60 cursor-pointer
                                       focus:outline-none focus:ring-4 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-sky-400"
                            aria-label={`Select Level ${level.level}`}
                        >
                            <div className="flex-grow flex flex-col items-center justify-center">
                                <GraduationCapIcon className="h-8 w-8 mb-2 text-indigo-500" />
                                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">Level {level.level}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{level.words.length} words</p>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 flex-grow flex flex-col items-center justify-center">
                    <p className="text-lg font-semibold text-slate-600 dark:text-slate-300">No Words Found</p>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Vocabulary data could not be loaded.</p>
                </div>
            )}
        </Card>
    );
};
