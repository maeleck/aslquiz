import React from 'react';
import { Card } from './Card';
import { SparklesIcon } from './Icons';

interface PlaceholderZoneProps {
    title: string;
    message: string;
    icon?: React.FC<{className?: string}>;
}

export const PlaceholderZone: React.FC<PlaceholderZoneProps> = ({ title, message, icon: IconComponent = SparklesIcon }) => {
    return (
        <Card className="flex flex-col items-center justify-center text-center h-full min-h-[400px]">
            <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/50 rounded-full flex items-center justify-center mb-4">
                <IconComponent className="w-8 h-8 text-sky-500 dark:text-sky-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{title}</h2>
            <p className="mt-2 max-w-sm text-slate-600 dark:text-slate-400">{message}</p>
        </Card>
    );
};