

import React from 'react';
import { Card } from './Card';
import type { VocabTopic } from '../types';
import { STRUCTURED_VOCAB } from '../constants';
import { GraduationCapIcon } from './Icons';

interface LevelSelectorZoneProps {
    topic: VocabTopic;
    onSelectLevel: (level: number) => void;
    onBack: () => void;
}

export const LevelSelectorZone: React.FC<LevelSelectorZoneProps> = ({ topic, onSelectLevel, onBack }) => {
    const topicData = STRUCTURED_VOCAB[topic.id];
    const levels = topicData?.levels || [];

    return (
        <Card className="h-full flex flex-col">
            <div className="relative flex items-center justify-center mb-6">
                <button 
                    onClick={onBack} 
                    className="absolute left-0 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-1"
                    aria-label="Back to Topics"
                >
                    &larr; Back to Tree
                </button>
                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{topic.label} - Levels</h2>
            </div>

            {levels.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {levels.map(level => (
                        <button
                            key={level.level}
                            onClick={() => onSelectLevel(level.level)}
                            className="p-4 rounded-xl border-2 text-center transition-all duration-200 flex flex-col items-center justify-center h-full min-h-[140px]
                                       bg-indigo-50 dark:bg-indigo-900/50 border-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-800/60 cursor-pointer
                                       focus:outline-none focus:ring-4 focus:ring-offset-2 dark:focus:ring-offset-stone-800 focus:ring-indigo-400"
                            aria-label={`Select Level ${level.level}`}
                        >
                            <div className="flex-grow flex flex-col items-center justify-center">
                                <GraduationCapIcon className="h-8 w-8 mb-2 text-indigo-500" />
                                <h4 className="text-xl font-bold text-stone-800 dark:text-stone-100">Level {level.level}</h4>
                                <p className="text-xs text-stone-500 dark:text-stone-400">{level.words.length} words</p>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 flex-grow flex flex-col items-center justify-center">
                    <p className="text-lg font-semibold text-stone-600 dark:text-stone-300">Coming Soon!</p>
                    <p className="text-stone-500 dark:text-stone-400 mt-1">Levels for "{topic.label}" will be added in a future update.</p>
                </div>
            )}
        </Card>
    );
};