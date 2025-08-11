
import React from 'react';
import { Card } from './Card';
import { SparklesIcon, ArrowLeftIcon } from './Icons';

interface PlaceholderZoneProps {
    title: string;
    message: string;
    icon?: React.FC<{className?: string}>;
    onBack?: () => void;
}

export const PlaceholderZone: React.FC<PlaceholderZoneProps> = ({ title, message, icon: IconComponent = SparklesIcon, onBack }) => {
    return (
        <Card className="flex flex-col items-center justify-center text-center h-full min-h-[400px]">
            {onBack && (
                 <button
                    onClick={onBack}
                    className="absolute top-6 left-6 p-2 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-stone-800 focus:ring-indigo-500 transition-colors"
                    aria-label="Go back"
                    title="Go back"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                </button>
            )}
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-4">
                <IconComponent className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-200">{title}</h2>
            <p className="mt-2 max-w-sm text-stone-600 dark:text-stone-400">{message}</p>
        </Card>
    );
};