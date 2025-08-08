import React from 'react';
import { Card } from './Card';
import { TrophyIcon, GraduationCapIcon, StreakIcon } from './Icons';

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
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <TrophyIcon />
            SCORE
          </span>
          <span className="text-3xl font-bold text-sky-600 dark:text-sky-400">{formatNumber(score)}</span>
        </div>
        <div className="border-l border-slate-200 dark:border-slate-700 h-12"></div>
        <div className="flex flex-col items-center px-4">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <GraduationCapIcon />
            FLUENCY LEVEL
          </span>
          <span className="text-3xl font-bold text-green-600 dark:text-green-400">{formatNumber(fluencyLevel)}</span>
        </div>
        <div className="border-l border-slate-200 dark:border-slate-700 h-12"></div>
        <div className="flex flex-col items-center px-4">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
            STREAK
            <StreakIcon />
          </span>
          <span className="text-3xl font-bold text-amber-500 dark:text-amber-400">{formatNumber(streak)}</span>
        </div>
      </div>
    </Card>
  );
};
