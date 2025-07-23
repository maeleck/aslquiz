
import React from 'react';
import { Card } from './Card';

interface FluencyZoneProps {
  score: number;
  fluencyLevel: number;
  cost: number;
  currentQuote: string;
  onGetFact: () => void;
  canAfford: boolean;
}

const formatNumber = (num: number): string => {
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
  if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
  return (num / 1000000000).toFixed(1) + 'B';
};

export const FluencyZone: React.FC<FluencyZoneProps> = ({ score, fluencyLevel, cost, currentQuote, onGetFact, canAfford }) => {
  const progress = canAfford ? 100 : Math.floor((score / cost) * 100);

  return (
    <Card className="h-full flex flex-col">
      <h3 className="text-2xl font-bold mb-4 text-center text-slate-700 dark:text-slate-200">Fluency & Culture</h3>
      
      <div className="text-center mb-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">Current Fluency Level</p>
        <p className="text-5xl font-bold text-sky-500 dark:text-sky-400">{fluencyLevel}</p>
      </div>

      <div className="flex-grow flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg mb-6 min-h-[100px]">
        <blockquote className="text-center">
            <p className="text-md italic text-slate-800 dark:text-slate-200">"{currentQuote}"</p>
        </blockquote>
      </div>
      
      <div className="relative w-full rounded-lg shadow-lg overflow-hidden bg-slate-200 dark:bg-slate-700">
        <div 
          className="absolute h-full top-0 left-0 bg-amber-400 dark:bg-amber-500 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
        <button 
          onClick={onGetFact} 
          disabled={!canAfford}
          className="relative w-full text-center font-bold py-3 px-4 text-lg transition-colors
                     text-amber-900 
                     disabled:text-slate-800 dark:disabled:text-slate-200
                     hover:bg-amber-500/50 dark:hover:bg-amber-400/50
                     disabled:cursor-not-allowed"
          aria-label={`Get a random fact and increase fluency. Cost: ${formatNumber(cost)} points.`}
        >
          Get a Random Fact
          <span className="block text-sm font-normal">Cost: {formatNumber(cost)}</span>
        </button>
      </div>
    </Card>
  );
};