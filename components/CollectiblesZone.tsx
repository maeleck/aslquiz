import React from 'react';
import { Card } from './Card';
import { ASL_CULTURE_QUOTES } from '../constants';
import { LockClosedIcon, CheckCircleIcon } from './Icons';

interface CollectiblesZoneProps {
  points: number;
  collectedFacts: string[];
  cost: number;
  onBuyFact: () => void;
  onViewFact: (fact: string) => void;
  areAllFactsCollected: boolean;
}

const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

export const CollectiblesZone: React.FC<CollectiblesZoneProps> = ({ points, collectedFacts, cost, onBuyFact, onViewFact, areAllFactsCollected }) => {
  const canAfford = points >= cost;

  return (
    <Card className="h-full flex flex-col">
      <h3 className="text-2xl font-bold mb-2 text-center text-slate-700 dark:text-slate-200">Collectible Facts</h3>
      <p className="text-center text-slate-500 dark:text-slate-400 mb-4">
        Collected: {collectedFacts.length} / {ASL_CULTURE_QUOTES.length}
      </p>

      <div className="flex-grow bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg mb-4">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
          {ASL_CULTURE_QUOTES.map((fact, index) => {
            const isCollected = collectedFacts.includes(fact);
            return (
              <button
                key={index}
                disabled={!isCollected}
                onClick={() => isCollected && onViewFact(fact)}
                className={`aspect-square rounded flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-sky-500
                  ${
                    isCollected 
                    ? 'bg-green-500 dark:bg-green-600 cursor-pointer hover:bg-green-400' 
                    : 'bg-slate-300 dark:bg-slate-600 cursor-not-allowed'
                  }`
                }
                title={isCollected ? fact : 'Uncollected'}
                aria-label={isCollected ? `View Fact ${index + 1}` : `Fact ${index + 1} uncollected`}
              >
                {isCollected ? (
                  <CheckCircleIcon className="w-6 h-6 text-white" />
                ) : (
                  <LockClosedIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {areAllFactsCollected ? (
        <div className="text-center font-bold text-green-600 dark:text-green-500 py-4 px-4 rounded-lg bg-green-100 dark:bg-green-900/50">
            <p>Congratulations!</p>
            <p className="text-sm font-normal">You've collected all the facts!</p>
        </div>
      ) : (
         <button 
          onClick={onBuyFact} 
          disabled={!canAfford}
          className="w-full text-center font-bold py-4 px-4 text-lg transition-all duration-300 rounded-lg shadow-lg
                     bg-sky-500 hover:bg-sky-600 text-white
                     disabled:bg-slate-400 dark:disabled:bg-slate-600 dark:disabled:text-slate-300
                     disabled:cursor-not-allowed disabled:shadow-none
                     focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800"
          aria-label={`Buy a random fact. Cost: ${formatNumber(cost)} points.`}
        >
          Buy a Fact
          <span className="block text-sm font-normal">Cost: {formatNumber(cost)}</span>
        </button>
      )}
    </Card>
  );
};