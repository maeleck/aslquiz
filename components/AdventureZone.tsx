import React, { useState } from 'react';
import { Card } from './Card';
import { CollectiblesZone } from './CollectiblesZone';
import { GlobeAltIcon } from './Icons';

interface AdventureZoneProps {
    points: number;
    collectedFacts: string[];
    cost: number;
    onBuyFact: () => void;
    onViewFact: (fact: string) => void;
    areAllFactsCollected: boolean;
}

type AdventureView = 'map' | 'collectibles';

const TabButton: React.FC<{label: string, isActive: boolean, onClick: () => void}> = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`whitespace-nowrap py-3 px-6 border-b-2 font-semibold text-base transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-stone-950 focus:ring-amber-500 rounded-t-lg
        ${isActive
          ? 'border-amber-500 text-amber-600 dark:border-amber-400 dark:text-amber-400'
          : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300 dark:text-stone-400 dark:hover:text-stone-200 dark:hover:border-stone-500'
        }
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </button>
);

export const AdventureZone: React.FC<AdventureZoneProps> = (props) => {
    const [activeView, setActiveView] = useState<AdventureView>('map');
    
    return (
        <div className="h-full flex flex-col">
            <div className="border-b border-stone-200 dark:border-stone-700 mb-6">
                <nav className="flex justify-center space-x-4" aria-label="Adventure sections">
                    <TabButton label="World Map" isActive={activeView === 'map'} onClick={() => setActiveView('map')} />
                    <TabButton label="Collectibles" isActive={activeView === 'collectibles'} onClick={() => setActiveView('collectibles')} />
                </nav>
            </div>

            {activeView === 'map' && (
                <Card>
                    <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px] py-8">
                        <div className="perspective-1000">
                            <GlobeAltIcon className="w-48 h-48 text-indigo-500 dark:text-indigo-400 spinning-globe"/>
                        </div>
                        <h2 className="text-2xl font-bold mt-6 text-stone-800 dark:text-stone-200">Explore the World</h2>
                        <p className="mt-2 max-w-sm text-stone-600 dark:text-stone-400">Future home of interactive stories from around the globe. For now, enjoy the spin!</p>
                    </div>
                </Card>
            )}

            {activeView === 'collectibles' && (
                <CollectiblesZone {...props} />
            )}
        </div>
    );
};