import React from 'react';
import { Card } from './Card';
import { TrophyIcon, StreakIcon } from './Icons';

interface StatsDisplayProps {
  points: number;
  streak: number;
}

const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ points, streak }) => {
  return (
    <Card className="max-w-2xl mx-auto">
      <div className="flex justify-around items-center text-center">
        <div className="flex flex-col items-center px-4">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <TrophyIcon />
            POINTS
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-sky-600 dark:text-sky-400">{formatNumber(points)}</span>
        </div>
        <div className="border-l border-slate-200 dark:border-slate-700 h-12"></div>
        <div className="flex flex-col items-center px-4">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
            STREAK
            <StreakIcon />
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-amber-500 dark:text-amber-400">{formatNumber(streak)}</span>
        </div>
      </div>
    </Card>
  );
};