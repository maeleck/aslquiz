import React, { useState, useEffect, useRef } from 'react';
import { Card } from './Card';
import { STORIES } from '../constants';
import type { Story, StoryStep, Phrase } from '../types';

const TabButton: React.FC<{label: string, isActive: boolean, onClick: () => void}> = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`whitespace-nowrap py-3 px-6 border-b-2 font-semibold text-base transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-sky-500 rounded-t-lg
        ${isActive
          ? 'border-rose-500 text-rose-600 dark:border-rose-400 dark:text-rose-400'
          : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-500'
        }
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </button>
);

const PhrasePlayer: React.FC<{ phrase: Phrase }> = ({ phrase }) => {
    const [displayIndex, setDisplayIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isPlayingRef = useRef(false);

    useEffect(() => {
        setDisplayIndex(0);
        isPlayingRef.current = true;
    }, [phrase]);

    const handleVideoEnd = () => {
        if (displayIndex < phrase.signs.length - 1) {
            setDisplayIndex(prev => prev + 1);
        } else {
            isPlayingRef.current = false;
        }
    };

    const handleRestartPlayback = () => {
        if (!isPlayingRef.current) {
            setDisplayIndex(0);
            isPlayingRef.current = true;
        }
    };
    
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
            videoRef.current.play();
        }
    }, [displayIndex]);

    const currentSign = phrase.signs[displayIndex];

    return (
        <div className="w-full max-w-xs aspect-square bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden shadow-inner flex items-center justify-center" onClick={handleRestartPlayback}>
            {currentSign && (
                <video
                    ref={videoRef}
                    key={currentSign.mediaUrl}
                    src={currentSign.mediaUrl}
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleVideoEnd}
                    className="w-full h-full object-contain p-2 animate-fade-in-up cursor-pointer"
                />
            )}
             <div className="absolute bottom-3 left-3 right-3 flex justify-center items-center gap-2">
                {phrase.signs.map((_, index) => (
                    <div key={index} className={`h-2 w-2 rounded-full transition-colors duration-300 ${displayIndex >= index ? 'bg-rose-500/80' : 'bg-slate-300/60 dark:bg-slate-900/60'}`}></div>
                ))}
            </div>
        </div>
    );
};

interface StoryZoneProps {
    onCorrectAnswer: () => void;
    onIncorrectAnswer: () => void;
}

export const StoryZone: React.FC<StoryZoneProps> = ({ onCorrectAnswer, onIncorrectAnswer }) => {
    const [activeStory, setActiveStory] = useState<Story>(STORIES[0]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState<{ choice: string, correct: boolean } | null>(null);

    const currentStep = activeStory.steps[currentStepIndex];

    const handleSelectStory = (story: Story) => {
        setActiveStory(story);
        setCurrentStepIndex(0);
        setIsAnswered(false);
        setFeedback(null);
    };

    const handleSelectChoice = (choice: string) => {
        if (isAnswered) return;
        const isCorrect = choice === currentStep.correctChoice;
        setFeedback({ choice, correct: isCorrect });
        setIsAnswered(true);
        if (isCorrect) {
            onCorrectAnswer();
        } else {
            onIncorrectAnswer();
        }
    };

    const handleNext = () => {
        if (currentStepIndex < activeStory.steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
            setIsAnswered(false);
            setFeedback(null);
        } else {
            // End of story, maybe show a completion message or restart
            alert(`You completed "${activeStory.title}"!`);
            handleSelectStory(activeStory === STORIES[0] ? STORIES[1] : STORIES[0]);
        }
    };
    
    const getButtonClass = (choice: string) => {
        if (!isAnswered) return 'bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 focus:ring-sky-300 dark:focus:ring-sky-800';
        if (choice === currentStep.correctChoice) return 'bg-green-500 dark:bg-green-600 cursor-default';
        if (feedback?.choice === choice) return 'bg-red-500 dark:bg-red-600 cursor-default';
        return 'bg-slate-400 dark:bg-slate-600 cursor-default opacity-70';
    };


    return (
        <Card className="h-full flex flex-col">
            <h3 className="text-2xl font-bold mb-2 text-center text-slate-700 dark:text-slate-200">Story Mode</h3>
             <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
                <nav className="flex justify-center space-x-4" aria-label="Stories">
                   {STORIES.map(story => (
                        <TabButton 
                            key={story.id}
                            label={story.title} 
                            isActive={activeStory.id === story.id} 
                            onClick={() => handleSelectStory(story)} 
                        />
                   ))}
                </nav>
            </div>
            
            <div className="flex flex-col items-center flex-grow">
                 <h4 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-4 text-center">
                    {currentStep.prompt}
                </h4>
                <PhrasePlayer phrase={currentStep.phrase} />

                <div className="w-full max-w-md mt-6">
                    {isAnswered && (
                        <div className="text-center p-4 mb-4 rounded-lg bg-slate-100 dark:bg-slate-900/50 animate-fade-in-up">
                            {feedback?.correct ? (
                                <p className="font-bold text-green-500">Correct! +2 Points</p>
                            ) : (
                                <p className="font-bold text-red-500">Not quite. The correct answer was "{currentStep.correctChoice}"</p>
                            )}
                             <p className="mt-2 text-lg text-slate-800 dark:text-slate-200">
                                The signs meant: <strong className="text-rose-600 dark:text-rose-400">"{currentStep.phrase.text}"</strong>
                            </p>
                        </div>
                    )}

                    {!isAnswered ? (
                        <div className="grid grid-cols-1 gap-3">
                            {currentStep.choices.map(choice => (
                                <button
                                    key={choice}
                                    onClick={() => handleSelectChoice(choice)}
                                    disabled={isAnswered}
                                    className={`w-full text-white font-bold text-lg py-4 px-4 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-4 ${getButtonClass(choice)}`}
                                >
                                    {choice}
                                </button>
                            ))}
                        </div>
                    ) : (
                         <button
                            onClick={handleNext}
                            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-rose-300 dark:focus:ring-rose-800 transition-colors text-lg animate-fade-in-up"
                        >
                            {currentStepIndex < activeStory.steps.length - 1 ? 'Next' : 'Finish Story'}
                        </button>
                    )}
                </div>
            </div>

            <div className="mt-6 flex justify-center items-center gap-3">
                {activeStory.steps.map((step, index) => (
                    <div
                        key={step.id}
                        className={`w-4 h-4 rounded-full transition-colors duration-300 ${index <= currentStepIndex ? 'bg-rose-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                        title={`Step ${index + 1}`}
                    />
                ))}
            </div>
        </Card>
    )
};