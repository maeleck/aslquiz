
import React from 'react';
import { Card } from './Card';

interface StatsDisplayProps {
  score: number;
  fluencyLevel: number;
  streak: number;
}

const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ score, fluencyLevel, streak }) => {
  return (
    <Card className="max-w-4xl mx-auto">
      <div className="flex justify-around items-center text-center">
        <div className="flex flex-col items-center px-4">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">SCORE</span>
          <span className="text-3xl font-bold text-sky-600 dark:text-sky-400">{formatNumber(score)}</span>
        </div>
        <div className="border-l border-slate-200 dark:border-slate-700 h-12"></div>
        <div className="flex flex-col items-center px-4">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">FLUENCY LEVEL</span>
          <span className="text-3xl font-bold text-green-600 dark:text-green-400">{formatNumber(fluencyLevel)}</span>
        </div>
        <div className="border-l border-slate-200 dark:border-slate-700 h-12"></div>
        <div className="flex flex-col items-center px-4">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
            STREAK
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.934l-6.75 12.25a1 1 0 001.649 1.805l6.75-12.25a1 1 0 00-.377-1.454zM9.5 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </span>
          <span className="text-3xl font-bold text-amber-500 dark:text-amber-400">{formatNumber(streak)}</span>
        </div>
      </div>
    </Card>
  );
};