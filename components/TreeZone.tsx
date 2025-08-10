
import React from 'react';
import { Card } from './Card';
import { VOCAB_TREE } from '../constants';
import type { VocabTopic } from '../types';
import { LockClosedIcon, GraduationCapIcon, UsersIcon, CakeIcon, PawPrintIcon, TrophyIcon } from './Icons';

interface TreeZoneProps {
    unlockedTopics: string[];
    points: number;
    onSelectTopic: (topic: VocabTopic) => void;
    onUnlockTopic: (topic: VocabTopic) => void;
}

const topicIcons: { [key in VocabTopic['iconId']]: React.FC<{className?: string}> } = {
    'graduation-cap': GraduationCapIcon,
    'users': UsersIcon,
    'cake': CakeIcon,
    'paw-print': PawPrintIcon,
};

const TopicCard: React.FC<{
    topic: VocabTopic,
    isUnlocked: boolean,
    canUnlock: boolean,
    onSelect: () => void,
    onUnlock: () => void,
}> = ({ topic, isUnlocked, canUnlock, onSelect, onUnlock }) => {
    const { label, cost, iconId } = topic;
    const IconComponent = topicIcons[iconId];

    let statusStyles = 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed opacity-60';
    let actionHandler = () => {};
    let title = 'Locked';

    if (isUnlocked) {
        statusStyles = 'bg-green-50 dark:bg-green-900/50 border-green-500 hover:bg-green-100 dark:hover:bg-green-800/60 cursor-pointer';
        actionHandler = onSelect;
        title = `Open ${label}`;
    } else if (canUnlock) {
        statusStyles = 'bg-sky-50 dark:bg-sky-900/50 border-sky-500 hover:bg-sky-100 dark:hover:bg-sky-800/60 cursor-pointer';
        actionHandler = onUnlock;
        title = `Unlock ${label} for ${cost} points`;
    }

    return (
        <button
            onClick={actionHandler}
            disabled={!isUnlocked && !canUnlock}
            className={`p-4 rounded-xl border-2 text-center transition-all duration-200 flex flex-col items-center justify-between h-full min-h-[160px]
                        focus:outline-none focus:ring-4 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-sky-400
                        ${statusStyles}`}
            aria-label={title}
        >
            <div className="flex-grow flex flex-col items-center justify-center">
                <IconComponent className="h-10 w-10 mb-2" />
                <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">{label}</h4>
            </div>
            <div className="mt-2 text-xs font-semibold">
                {isUnlocked ? (
                    <span className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-300">UNLOCKED</span>
                ) : (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-700">
                        <TrophyIcon />
                        <span>{cost}</span>
                        <LockClosedIcon className="w-3 h-3 ml-1" />
                    </div>
                )}
            </div>
        </button>
    );
};


export const TreeZone: React.FC<TreeZoneProps> = ({ unlockedTopics, points, onSelectTopic, onUnlockTopic }) => {
    return (
        <Card>
            <h3 className="text-2xl font-bold mb-1 text-center text-slate-700 dark:text-slate-200">Vocabulary Tree</h3>
            <p className="text-center text-slate-500 dark:text-slate-400 mb-6">Unlock topics to learn new vocabulary.</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {VOCAB_TREE.map(topic => {
                    const isUnlocked = unlockedTopics.includes(topic.id);
                    const prerequisitesMet = topic.prerequisites.every(p => unlockedTopics.includes(p));
                    const canAfford = points >= topic.cost;
                    const canUnlock = !isUnlocked && prerequisitesMet && canAfford;
                    
                    return (
                        <TopicCard 
                            key={topic.id}
                            topic={topic}
                            isUnlocked={isUnlocked}
                            canUnlock={canUnlock}
                            onSelect={() => onSelectTopic(topic)}
                            onUnlock={() => onUnlockTopic(topic)}
                        />
                    );
                })}
            </div>
        </Card>
    );
};
