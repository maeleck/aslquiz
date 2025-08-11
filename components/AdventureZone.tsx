
import React from 'react';
import { Card } from './Card';
import type { AdventureSubCategory } from '../types';
import { MapIcon, BriefcaseIcon, ClipboardListIcon, ShoppingCartIcon, GlobeAltIcon } from './Icons';

interface AdventureZoneProps {
    onSelect: (subCategory: AdventureSubCategory) => void;
}

const adventureOptions: { id: AdventureSubCategory; label: string; description: string; icon: React.FC<{className?: string}> }[] = [
    {
        id: 'world-map',
        label: 'World Map',
        description: 'Explore the globe to find stories and challenges.',
        icon: GlobeAltIcon,
    },
    {
        id: 'city-map',
        label: 'City Map',
        description: 'Explore interactive locations and find new stories.',
        icon: MapIcon,
    },
    {
        id: 'job',
        label: 'Job',
        description: 'Take on jobs to test your skills and earn Game Cash.',
        icon: BriefcaseIcon,
    },
    {
        id: 'quest',
        label: 'Quest',
        description: 'Embark on guided quests with unique challenges.',
        icon: ClipboardListIcon,
    },
    {
        id: 'market',
        label: 'Market',
        description: 'Spend your Game Cash on items and upgrades.',
        icon: ShoppingCartIcon,
    }
];

export const AdventureZone: React.FC<AdventureZoneProps> = ({ onSelect }) => {
    return (
        <Card className="h-full flex flex-col">
            <h3 className="text-2xl font-bold mb-2 text-center text-stone-700 dark:text-stone-200">Adventure Mode</h3>
            <p className="text-center text-stone-500 dark:text-stone-400 mb-6">Choose an activity to begin your adventure.</p>

            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                {adventureOptions.map(opt => (
                     <button 
                        key={opt.id} 
                        onClick={() => onSelect(opt.id)}
                        className={`p-6 rounded-lg border-2 text-left transition-all duration-200 flex flex-col
                            border-amber-500 bg-amber-50 dark:bg-amber-900/50 hover:bg-amber-100 dark:hover:bg-amber-800/60 cursor-pointer
                            focus:outline-none focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-800
                        `}
                    >
                        <div className="flex items-center mb-2">
                           <opt.icon className="h-7 w-7 mr-3 text-amber-600 dark:text-amber-400" />
                           <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100">{opt.label}</h3>
                        </div>
                        <p className="text-stone-600 dark:text-stone-400 flex-grow">{opt.description}</p>
                         <span className="mt-4 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/50 px-2 py-1 rounded-full self-start">Coming Soon</span>
                    </button>
                ))}
            </div>
        </Card>
    );
};