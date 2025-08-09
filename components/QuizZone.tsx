import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import type { AlphabetSign } from '../types';

interface QuizZoneProps {
  level: number;
  maxLevel: number;
  onLevelChange: (level: number) => void;
  questionSigns: AlphabetSign[];
  choices: string[];
  onSelectChoice: (choice: string) => void;
  onWordSubmit: () => void;
  userAnswer: string;
  onUserAnswerChange: (value: string) => void;
  feedback: { choice: string, correct: boolean } | null;
  isAnswered: boolean;
  pointsPerCorrectAnswer: number;
  onSkip: () => void;
  isGenerating: boolean;
  correctAnswer: string;
}

export const QuizZone: React.FC<QuizZoneProps> = ({ 
  level, maxLevel, onLevelChange, questionSigns, choices, onSelectChoice,
  onWordSubmit, userAnswer, onUserAnswerChange,
  feedback, isAnswered, pointsPerCorrectAnswer, onSkip, isGenerating, correctAnswer
}) => {
  
  const [displayIndex, setDisplayIndex] = useState(0);

  useEffect(() => {
    setDisplayIndex(0);
    if (level === 1 || questionSigns.length <= 1 || isAnswered) {
        return;
    }
    const timerId = setInterval(() => {
        setDisplayIndex(prev => (prev + 1) % questionSigns.length);
    }, 1200);
    return () => clearInterval(timerId);
  }, [level, questionSigns, isAnswered]);

  if (isGenerating || questionSigns.length === 0) {
    return (
        <Card className="flex flex-col items-center justify-center h-full min-h-[400px]">
            <div role="status" aria-label="Loading question">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-500"></div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-4">Generating new question...</p>
        </Card>
    );
  }

  const getButtonClass = (choice: string) => {
    if (!isAnswered) return 'bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 focus:ring-sky-300 dark:focus:ring-sky-800';
    if (choice === correctAnswer) return 'bg-green-500 dark:bg-green-600 cursor-default';
    if (feedback?.choice === choice) return 'bg-red-500 dark:bg-red-600 cursor-default';
    return 'bg-slate-400 dark:bg-slate-600 cursor-default opacity-70';
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim()) {
      onWordSubmit();
    }
  };

  const currentDisplaySign = questionSigns[displayIndex];

  return (
    <Card className="flex flex-col items-center h-full">
      <div className="flex justify-center items-center gap-2 mb-2 self-stretch">
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Level:</span>
        {Array.from({ length: maxLevel }).map((_, index) => {
          const l = index + 1;
          return (
            <button
              key={l}
              onClick={() => onLevelChange(l)}
              disabled={isAnswered || isGenerating}
              className={`px-3 py-1 text-sm font-bold rounded-full transition-colors
                ${level === l 
                  ? 'bg-sky-600 text-white' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'}
                disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {l}
            </button>
          )
        })}
      </div>
      
      <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-1">
        {level === 1 ? 'What character is this sign?' : `What ${correctAnswer.length}-letter word is this?`}
      </h2>
      
      <div className="h-8 flex items-center justify-center my-1 text-center">
        {isAnswered && feedback && (
          <p className={`text-xl font-bold transition-opacity duration-300 ${isAnswered ? 'opacity-100' : 'opacity-0'}`}>
            {feedback.correct ? (
              <span className="text-green-500">Correct! +{pointsPerCorrectAnswer * (level === 1 ? 1 : level)}</span>
            ) : (
              <span className="text-red-500">Correct answer: {correctAnswer}</span>
            )}
          </p>
        )}
      </div>
      
      <div className="w-full max-w-xs aspect-square bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
        {currentDisplaySign && <img 
          key={currentDisplaySign.imageUrl} // Use key to force re-render on change
          src={currentDisplaySign.imageUrl} 
          alt={level > 1 ? `Fingerspelling sign ${displayIndex + 1} of ${questionSigns.length}` : `American sign language sign for ${currentDisplaySign.letter}`}
          className="w-full h-full object-contain p-2 animate-fade-in-up"
        />}
      </div>
      
      <div className="h-8 flex items-center justify-center mt-2 w-full max-w-xs">
          {level > 1 && questionSigns.length > 1 && (
            <div className="flex gap-2">
              {questionSigns.map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full transition-colors duration-300 ${displayIndex === i ? 'bg-sky-500' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
              ))}
            </div>
          )}
      </div>
      
      <div className="w-full max-w-xs flex justify-end">
          <button
              onClick={onSkip}
              disabled={isAnswered || isGenerating}
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center gap-1"
              aria-label="Skip question and reset streak"
          >
              Skip
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
          </button>
      </div>

      <div className="w-full max-w-md mt-auto pt-2">
        {level === 1 ? (
            <div className="grid grid-cols-2 gap-4">
              {choices.map(choice => (
                <button 
                  key={choice}
                  onClick={() => onSelectChoice(choice)}
                  disabled={isAnswered}
                  className={`w-full text-white font-bold text-2xl py-6 px-4 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-4 ${getButtonClass(choice)}`}
                  aria-label={`Choice ${choice}`}
                >
                  {choice}
                </button>
              ))}
            </div>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="flex gap-2">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => onUserAnswerChange(e.target.value)}
                disabled={isAnswered}
                autoFocus
                className="flex-grow w-full text-center text-xl font-bold bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg py-4 px-4 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 focus:border-sky-500 dark:focus:border-sky-500 transition-colors disabled:opacity-70"
                placeholder="Type the word"
                aria-label="Your answer for the word"
                maxLength={correctAnswer.length}
                style={{ caretColor: isAnswered ? 'transparent' : 'auto' }}
              />
              <button
                type="submit"
                disabled={isAnswered || !userAnswer.trim()}
                className={`text-white font-bold text-lg py-4 px-6 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 ${
                  isAnswered ? (feedback?.correct ? 'bg-green-500' : 'bg-red-500') : 'bg-sky-500 hover:bg-sky-600'
                } disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed`}
              >
                Check
              </button>
            </div>
          </form>
        )}
      </div>
    </Card>
  );
};