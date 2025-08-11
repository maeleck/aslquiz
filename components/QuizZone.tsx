import React, { useState, useEffect, useRef } from 'react';
import { Card } from './Card';
import type { AlphabetSign, Category, DictionaryEntry, Phrase } from '../types';

interface QuizZoneProps {
  mode: 'normal' | 'reversal';
  category: Category;
  level: number;
  maxLevel: number;
  onLevelChange: (level: number) => void;
  questionSigns: AlphabetSign[];
  questionVocab: DictionaryEntry | null;
  questionPhrase: Phrase | null;
  choices: string[];
  choiceSigns: AlphabetSign[];
  choiceVocab: DictionaryEntry[];
  choicePhrases: Phrase[];
  onSelectChoice: (choice: string) => void;
  onWordSubmit: () => void;
  userAnswer: string;
  onUserAnswerChange: (value: string) => void;
  feedback: { choice: string, correct: boolean } | null;
  isAnswered: boolean;
  pointsPerCorrectAnswer: number;
  onBack: () => void;
  onNextQuestion: () => void;
  isGenerating: boolean;
  correctAnswer: string;
  isTimeAttack?: boolean;
  topicLabel?: string;
}

const VocabChoiceButton: React.FC<{
  item: DictionaryEntry;
  onClick: () => void;
  disabled: boolean;
  buttonClass: string;
}> = ({ item, onClick, disabled, buttonClass }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 0.5;
      }
    }, [item.mediaUrl]);
    
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`w-full aspect-square bg-stone-200 dark:bg-stone-700 rounded-lg shadow-md transition-all duration-200 focus:outline-none p-2 overflow-hidden ${buttonClass}`}
            aria-label={`Choice ${item.term}`}
        >
            <video
                ref={videoRef}
                key={item.mediaUrl}
                src={item.mediaUrl}
                muted
                playsInline
                autoPlay
                className="w-full h-full object-contain rounded-md"
            />
        </button>
    )
};

const PhraseChoiceButton: React.FC<{
  phrase: Phrase;
  onClick: () => void;
  disabled: boolean;
  buttonClass: string;
}> = ({ phrase, onClick, disabled, buttonClass }) => {
    const [currentSignIndex, setCurrentSignIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        setCurrentSignIndex(0);
    }, [phrase]);

    // When a video finishes, play the next one in the sequence, then stop at the end.
    const handleVideoEnd = () => {
        if (currentSignIndex < phrase.signs.length - 1) {
            setCurrentSignIndex(prevIndex => prevIndex + 1);
        }
    };

    const handleReplayClick = (e: React.MouseEvent) => {
        // Stop the click from bubbling up to the main button onClick handler.
        e.stopPropagation();
        // Restart the video sequence from the beginning.
        setCurrentSignIndex(0);
    };
    
    const currentSign = phrase.signs[currentSignIndex];

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
        }
    }, [currentSign?.mediaUrl]);

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full aspect-video bg-stone-200 dark:bg-stone-700 rounded-lg shadow-md transition-all duration-200 focus:outline-none p-2 overflow-hidden ${buttonClass}`}
            aria-label={`Choice phrase starting with ${phrase.signs[0].term}`}
        >
            <div className="relative w-full h-full" onClick={handleReplayClick}>
                {currentSign && (
                    <video
                        ref={videoRef}
                        key={currentSign.mediaUrl}
                        src={currentSign.mediaUrl}
                        muted
                        playsInline
                        autoPlay
                        onEnded={handleVideoEnd}
                        className="w-full h-full object-contain rounded-md animate-fade-in-up cursor-pointer"
                    />
                )}
                <div className="absolute bottom-1 left-1 right-1 flex justify-center items-center gap-1">
                    {phrase.signs.map((_, index) => (
                        <div key={index} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${currentSignIndex === index ? 'bg-indigo-500/80' : 'bg-stone-300/60 dark:bg-stone-900/60'}`}></div>
                    ))}
                </div>
            </div>
        </button>
    );
};


export const QuizZone: React.FC<QuizZoneProps> = ({ 
  mode, category, level, maxLevel, onLevelChange,
  questionSigns, questionVocab, questionPhrase, choices, choiceSigns, choiceVocab, choicePhrases,
  onSelectChoice, onWordSubmit, userAnswer, onUserAnswerChange,
  feedback, isAnswered, pointsPerCorrectAnswer, onBack, onNextQuestion, isGenerating, correctAnswer, isTimeAttack = false,
  topicLabel
}) => {
  
  const [displayIndex, setDisplayIndex] = useState(0);
  const mainVideoRef = useRef<HTMLVideoElement>(null);

  const currentDisplaySign = questionSigns[displayIndex];
  const currentPhraseSign = questionPhrase?.signs[displayIndex];
  const mainMediaUrl = questionVocab?.mediaUrl || currentPhraseSign?.mediaUrl;

  // When a new question arrives, reset the sequence index.
  useEffect(() => {
    setDisplayIndex(0);
  }, [questionPhrase, questionSigns, questionVocab]);

  // Handle image-based sign sequences (alphabet words)
  useEffect(() => {
    if (category !== 'alphabet' || !questionSigns || questionSigns.length <= 1 || isAnswered) {
      return;
    }
    const timerId = setInterval(() => {
      setDisplayIndex(prev => (prev + 1) % questionSigns.length);
    }, 1200);
    return () => clearInterval(timerId);
  }, [category, questionSigns, isAnswered]);

  const handlePhraseVideoEnd = () => {
    if (questionPhrase && displayIndex < questionPhrase.signs.length - 1) {
        setDisplayIndex(prev => prev + 1);
    }
  };
  
  const handleRestartPlayback = () => {
    // For phrases, reset the sequence index to restart from the first sign.
    if (category === 'phrases') {
        setDisplayIndex(0);
    } 
    // For single vocabulary videos, seek to the beginning and play.
    else if ((category === 'vocabulary' || category === 'tree') && mainVideoRef.current) {
        mainVideoRef.current.currentTime = 0;
        mainVideoRef.current.play();
    }
  };

  // This effect ensures the playback rate is set correctly for the main video.
  useEffect(() => {
    if (mainVideoRef.current) {
        mainVideoRef.current.playbackRate = 0.5;
    }
  }, [mainMediaUrl]);


  const isLoading = isGenerating || 
    (mode === 'normal' && category === 'alphabet' && questionSigns.length === 0) ||
    (mode === 'normal' && (category === 'vocabulary' || category === 'tree') && !questionVocab) ||
    (mode === 'normal' && category === 'phrases' && !questionPhrase) ||
    (mode === 'reversal' && !correctAnswer);

  if (isLoading) {
    return (
        <Card className="flex flex-col items-center justify-center h-full min-h-[400px]">
            <div role="status" aria-label="Loading question">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
            <p className="text-stone-500 dark:text-stone-400 mt-4">Generating new question...</p>
        </Card>
    );
  }

  const getButtonClass = (choice: string) => {
    if (!isAnswered) return 'bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:ring-indigo-300 dark:focus:ring-indigo-800';
    if (choice.toUpperCase() === correctAnswer.toUpperCase()) return 'bg-green-500 dark:bg-green-600 cursor-default';
    if (feedback?.choice.toUpperCase() === choice.toUpperCase()) return 'bg-red-500 dark:bg-red-600 cursor-default';
    return 'bg-stone-400 dark:bg-stone-600 cursor-default opacity-70';
  };

  const getMediaChoiceClass = (choiceValue: string) => {
    const base = 'ring-4 ring-offset-2 dark:ring-offset-stone-800 rounded-lg transition-all duration-200';
    if (!isAnswered) return `ring-transparent hover:ring-indigo-400`;
    if (choiceValue.toUpperCase() === correctAnswer.toUpperCase()) return `ring-green-500 ${base}`;
    if (feedback?.choice.toUpperCase() === choiceValue.toUpperCase()) return `ring-red-500 ${base}`;
    return 'ring-transparent opacity-60';
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim()) {
      onWordSubmit();
    }
  };

  const renderQuestion = () => {
      if (mode === 'reversal') {
          return <div className="text-3xl sm:text-4xl md:text-6xl font-bold text-center text-stone-800 dark:text-stone-200 p-4">{correctAnswer}</div>;
      }
      const questionMedia = questionVocab || currentPhraseSign;
      if (((category === 'vocabulary' || category === 'tree') || category === 'phrases') && questionMedia) {
          const videoClassName = `w-full h-full object-contain p-2 animate-fade-in-up`;
          return (
            <video
              ref={mainVideoRef}
              key={questionMedia.mediaUrl}
              src={questionMedia.mediaUrl}
              onEnded={category === 'phrases' ? handlePhraseVideoEnd : undefined}
              onClick={handleRestartPlayback}
              muted
              playsInline
              autoPlay
              className={`${videoClassName} cursor-pointer`}
              aria-label={`ASL sign for a word or phrase`}
          />
          );
      }
      if (category === 'alphabet' && currentDisplaySign) {
          return (
            <img 
              key={currentDisplaySign.imageUrl}
              src={currentDisplaySign.imageUrl} 
              alt={level > 1 ? `Fingerspelling sign ${displayIndex + 1}` : `ASL sign`}
              className="w-full h-full object-contain p-2 animate-fade-in-up"
            />
          );
      }
      return null;
  }

  const renderChoices = () => {
    if (isAnswered && !isTimeAttack) {
        return (
            <button
                onClick={onNextQuestion}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-colors text-lg animate-fade-in-up"
            >
                Next Question
            </button>
        )
    }

    if (mode === 'reversal') {
        if (category === 'phrases') {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {choicePhrases.map(phrase => (
                        <PhraseChoiceButton
                            key={phrase.text}
                            phrase={phrase}
                            onClick={() => onSelectChoice(phrase.text)}
                            disabled={isAnswered}
                            buttonClass={getMediaChoiceClass(phrase.text)}
                        />
                    ))}
                </div>
            );
        }
        if (category === 'vocabulary' || category === 'tree') {
            return (
                <div className="grid grid-cols-2 gap-4">
                    {choiceVocab.map(item => (
                        <VocabChoiceButton 
                            key={item.term}
                            item={item}
                            onClick={() => onSelectChoice(item.term)}
                            disabled={isAnswered}
                            buttonClass={getMediaChoiceClass(item.term)}
                        />
                    ))}
                </div>
            );
        }
        return (
            <div className="grid grid-cols-2 gap-4">
              {choiceSigns.map(sign => (
                <button 
                  key={sign.letter}
                  onClick={() => onSelectChoice(sign.letter)}
                  disabled={isAnswered}
                  className={`w-full aspect-square bg-stone-200 dark:bg-stone-700 rounded-lg shadow-md transition-all duration-200 focus:outline-none p-2
                    ${getMediaChoiceClass(sign.letter)}`}
                  aria-label={`Choice ${sign.letter}`}
                >
                  <img src={sign.imageUrl} alt={`ASL sign for ${sign.letter}`} className="w-full h-full object-contain"/>
                </button>
              ))}
            </div>
        );
    }

    if (category === 'phrases' || (category === 'alphabet' && level > 1)) {
        return (
            <form onSubmit={handleFormSubmit}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => onUserAnswerChange(e.target.value)}
                  disabled={isAnswered}
                  autoFocus
                  className="flex-grow w-full text-center text-xl font-bold bg-stone-100 dark:bg-stone-800 border-2 border-stone-300 dark:border-stone-600 rounded-lg py-4 px-4 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors disabled:opacity-70"
                  placeholder={`Type the ${category === 'phrases' ? 'phrase' : 'word'}`}
                  aria-label={`Your answer for the ${category === 'phrases' ? 'phrase' : 'word'}`}
                  maxLength={correctAnswer.length + 5}
                  style={{ caretColor: isAnswered ? 'transparent' : 'auto' }}
                />
                <button
                  type="submit"
                  disabled={isAnswered || !userAnswer.trim()}
                  className={`text-white font-bold text-lg py-4 px-6 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 ${
                    isAnswered ? (feedback?.correct ? 'bg-green-500' : 'bg-red-500') : 'bg-indigo-500 hover:bg-indigo-600'
                  } disabled:bg-stone-400 dark:disabled:bg-stone-600 disabled:cursor-not-allowed`}
                >
                  Check
                </button>
              </div>
            </form>
        );
    }

    // Default: Multiple choice text buttons
    return (
        <div className="grid grid-cols-2 gap-4">
          {choices.map(choice => (
            <button 
              key={choice}
              onClick={() => onSelectChoice(choice)}
              disabled={isAnswered}
              className={`w-full text-white font-bold text-xl md:text-2xl py-6 px-4 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-4 ${getButtonClass(choice)}`}
              aria-label={`Choice ${choice}`}
            >
              {choice}
            </button>
          ))}
        </div>
    );
  };
  
  const getQuestionTitle = () => {
    if (topicLabel === 'Wildcard Review') {
        return topicLabel;
    }
    const noun = category === 'alphabet' ? 'letter' : (category === 'vocabulary' || category === 'tree') ? 'word' : 'phrase';
    const topicPrefix = topicLabel ? `${topicLabel}: ` : '';
    if (mode === 'reversal') {
        return `${topicPrefix}What sign is this ${noun}?`;
    }
    if (category === 'alphabet') {
        return level === 1 ? 'What letter is this sign?' : `What ${correctAnswer.length}-letter word is this?`;
    }
    return `${topicPrefix}What ${noun} is this?`;
  }
  
  const getPoints = () => {
    if (category === 'alphabet' && level > 1) return pointsPerCorrectAnswer * level;
    if (category === 'phrases') return pointsPerCorrectAnswer * 2;
    return pointsPerCorrectAnswer;
  }

  const questionMediaList = category === 'phrases' ? questionPhrase?.signs : questionSigns;

  return (
    <Card className="flex flex-col items-center h-full">
      {category === 'alphabet' && <div className="flex justify-center items-center gap-2 mb-2 self-stretch">
        <span className="text-sm font-semibold text-stone-500 dark:text-stone-400">Level:</span>
        {Array.from({ length: maxLevel }).map((_, index) => {
          const l = index + 1;
          return (
            <button
              key={l}
              onClick={() => onLevelChange(l)}
              disabled={isAnswered || isGenerating || isTimeAttack}
              className={`px-3 py-1 text-sm font-bold rounded-full transition-colors
                ${level === l 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-300 dark:hover:bg-stone-600'}
                disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {l}
            </button>
          )
        })}
      </div>}
      
      <h2 className="text-xl md:text-2xl font-bold text-stone-700 dark:text-stone-300 mb-1 text-center">
        {getQuestionTitle()}
      </h2>
      
      <div className="h-8 flex items-center justify-center my-1 text-center">
        {isAnswered && feedback && (
          <p className={`text-xl font-bold transition-opacity duration-300 ${isAnswered ? 'opacity-100' : 'opacity-0'}`}>
            {feedback.correct ? (
              <span className="text-green-500">Correct! +{getPoints()}</span>
            ) : (
              <span className="text-red-500">Correct answer: {correctAnswer}</span>
            )}
          </p>
        )}
      </div>
      
      <div className="w-full max-w-xs aspect-square bg-stone-200 dark:bg-stone-700 rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
        {renderQuestion()}
      </div>
      
      <div className="h-8 flex items-center justify-center mt-2 w-full max-w-xs">
          {(category === 'alphabet' || category === 'phrases') && mode === 'normal' && questionMediaList && questionMediaList.length > 1 && (
            <div className="flex gap-2">
              {questionMediaList.map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full transition-colors duration-300 ${displayIndex === i ? 'bg-indigo-500' : 'bg-stone-300 dark:bg-stone-600'}`}></div>
              ))}
            </div>
          )}
      </div>
      
      <div className="w-full max-w-md flex justify-end">
          {!isTimeAttack && (
            <button
                onClick={onBack}
                disabled={isGenerating}
                className="text-sm text-stone-500 dark:text-stone-400 hover:text-indigo-600 dark:hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center gap-1"
                aria-label="Back to activities"
            >
                Back to Activities
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
            </button>
          )}
      </div>

      <div className="w-full max-w-md mt-auto pt-2">
        {renderChoices()}
      </div>
    </Card>
  );
};