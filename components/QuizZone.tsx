
import React from 'react';
import { Card } from './Card';
import type { AlphabetSign, Language } from '../types';

interface QuizZoneProps {
  sign: AlphabetSign | null;
  choices: string[];
  onSelectChoice: (choice: string) => void;
  feedback: { choice: string, correct: boolean } | null;
  isAnswered: boolean;
  language: Language;
  pointsPerCorrectAnswer: number;
  onSkip: () => void;
  isGenerating: boolean;
  correctAnswer: string;
}

export const QuizZone: React.FC<QuizZoneProps> = ({ sign, choices, onSelectChoice, feedback, isAnswered, language, pointsPerCorrectAnswer, onSkip, isGenerating, correctAnswer }) => {
  
  if (isGenerating || !sign) {
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
    if (!isAnswered) {
      return 'bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 focus:ring-sky-300 dark:focus:ring-sky-800';
    }

    const isCorrectChoice = choice === correctAnswer;
    const wasSelectedChoice = feedback?.choice === choice;

    if (isCorrectChoice) {
      return 'bg-green-500 dark:bg-green-600 cursor-default';
    }
    if (wasSelectedChoice && !feedback?.correct) {
      return 'bg-red-500 dark:bg-red-600 cursor-default';
    }

    return 'bg-slate-400 dark:bg-slate-600 cursor-default opacity-70';
  };

  return (
    <Card className="flex flex-col items-center h-full">
      <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-1">
        {language === 'Kanji' ? 'What is the meaning of this Kanji?' : 'What character is this sign?'}
      </h2>
      
      <div className="h-8 flex items-center justify-center my-1 text-center">
        {isAnswered && feedback && (
          <p className={`text-xl font-bold transition-opacity duration-300 ${isAnswered ? 'opacity-100' : 'opacity-0'}`}>
            {feedback.correct ? (
              <span className="text-green-500">Correct! +{pointsPerCorrectAnswer}</span>
            ) : (
              <span className="text-red-500">Correct answer: {correctAnswer}</span>
            )}
          </p>
        )}
      </div>
      
      <div className="w-full max-w-xs aspect-square bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
        {language === 'Kanji' ? (
             <span className="text-9xl font-serif text-slate-800 dark:text-slate-200 select-none" lang="ja">{sign.letter}</span>
        ) : language === 'JSL' ? (
           <div
              className="w-full h-full"
              role="img"
              aria-label={`Japanese sign language sign for ${sign.letter}`}
              style={{
                backgroundImage: `url(${sign.imageUrl})`,
                backgroundSize: '133.33% 100%',
                backgroundPosition: 'right center',
                backgroundRepeat: 'no-repeat',
              }}
            />
        ) : (
            <img 
              src={sign.imageUrl} 
              alt={`American sign language sign for ${sign.letter}`}
              className="w-full h-full object-contain p-2"
            />
        )}
      </div>
      
      <div className="h-8 flex items-center justify-center mt-2 w-full max-w-xs">
          {isAnswered && language === 'Kanji' && sign?.romaji && (
              <p className="text-2xl font-semibold text-sky-600 dark:text-sky-400" lang="ja-Latn" aria-label={`Pronunciation: ${sign.romaji}`}>
                  {sign.romaji}
              </p>
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

      <div className="w-full max-w-md grid grid-cols-2 gap-4 mt-auto pt-2">
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
    </Card>
  );
};