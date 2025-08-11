import React from 'react';
import { Card } from './Card';
import { TrophyIcon, StreakIcon, CurrencyDollarIcon } from './Icons';

interface StatsDisplayProps {
  points: number;
  streak: number;
  gameCash: number;
}

const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ points, streak, gameCash }) => {
  return (
    <Card className="max-w-2xl mx-auto">
      <div className="grid grid-cols-3 divide-x divide-stone-200 dark:divide-stone-700 text-center">
        <div className="flex flex-col items-center px-4">
          <span className="text-sm font-medium text-stone-500 dark:text-stone-400 flex items-center gap-1">
            <TrophyIcon />
            POINTS
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">{formatNumber(points)}</span>
        </div>
        <div className="flex flex-col items-center px-4">
          <span className="text-sm font-medium text-stone-500 dark:text-stone-400 flex items-center gap-1">
            <CurrencyDollarIcon />
            GAME CASH
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">{formatNumber(gameCash)}</span>
        </div>
        <div className="flex flex-col items-center px-4">
          <span className="text-sm font-medium text-stone-500 dark:text-stone-400 flex items-center gap-1">
            DAILY STREAK
            <StreakIcon />
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-amber-500 dark:text-amber-400">{formatNumber(streak)}</span>
        </div>
      </div>
    </Card>
  );
};