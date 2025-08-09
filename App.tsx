import React, { useState, useCallback, useEffect } from 'react';
import { ALPHABET, ASL_CULTURE_QUOTES, COST_PER_FACT, POINTS_PER_CORRECT_ANSWER } from './constants';
import type { AlphabetSign, Category, SubCategory } from './types';
import { StatsDisplay } from './components/StatsDisplay';
import { QuizZone } from './components/QuizZone';
import { CollectiblesZone } from './components/CollectiblesZone';
import { FactModal } from './components/FactModal';
import { ThemeToggle } from './components/ThemeToggle';
import { CategorySelector } from './components/CategorySelector';
import { PlaceholderZone } from './components/PlaceholderZone';
import { SubCategorySelector } from './components/SubCategorySelector';
import { BookOpenIcon, CogIcon } from './components/Icons';


interface GameState {
  points: number;
  collectedFacts: string[];
  streak: number;
}

const STORAGE_KEY = 'aslQuizProgress';

const initialGameState: GameState = {
  points: 0,
  collectedFacts: [],
  streak: 0,
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedState = window.localStorage.getItem(STORAGE_KEY);
        if (savedState) {
          const parsed = JSON.parse(savedState);
          return { ...initialGameState, ...parsed };
        }
      }
    } catch (error) {
      console.error("Could not load saved state:", error);
    }
    return initialGameState;
  });
  
  const [newlyAcquiredFact, setNewlyAcquiredFact] = useState<string | null>(null);
  const [currentSign, setCurrentSign] = useState<AlphabetSign | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ choice: string, correct: boolean } | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  const [activeCategory, setActiveCategory] = useState<Category>('alphabet');
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | null>(null);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
      }
    } catch (error) {
      console.error("Could not save state:", error);
    }
  }, [gameState]);

  const { points, streak, collectedFacts } = gameState;

  const generateNewQuestion = useCallback(() => {
    setIsGenerating(true);
    setIsAnswered(false);
    setFeedback(null);
    setCurrentSign(null);

    const correctSign = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    const correctAnswerValue = correctSign.letter;
    
    const allPossibleAnswers = ALPHABET.map(s => s.letter);
    const distractors: string[] = [];

    while (distractors.length < 3) {
        const randomAnswer = allPossibleAnswers[Math.floor(Math.random() * allPossibleAnswers.length)];
        if (randomAnswer !== correctAnswerValue && !distractors.includes(randomAnswer)) {
            distractors.push(randomAnswer);
        }
    }

    const allChoices = [correctAnswerValue, ...distractors];
    for (let i = allChoices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allChoices[i], allChoices[j]] = [allChoices[j], allChoices[i]];
    }

    setCurrentSign(correctSign);
    setChoices(allChoices);
    setCorrectAnswer(correctAnswerValue);
    setIsGenerating(false);
  }, []);

  useEffect(() => {
    // Only generate a question if the quiz is the active view
    if (activeCategory === 'alphabet' && activeSubCategory === 'quiz') {
        generateNewQuestion();
    }
  }, [activeCategory, activeSubCategory, generateNewQuestion]);

  const handleChoiceSelection = useCallback((selectedLetter: string) => {
    if (isAnswered || !currentSign) return;

    const isCorrect = selectedLetter === correctAnswer;
    setIsAnswered(true);
    setFeedback({ choice: selectedLetter, correct: isCorrect });

    if (isCorrect) {
      setGameState(prevState => ({
        ...prevState,
        points: prevState.points + POINTS_PER_CORRECT_ANSWER,
        streak: prevState.streak + 1,
      }));
    } else {
        setGameState(prevState => ({
            ...prevState,
            streak: 0,
        }));
    }

    setTimeout(() => {
      generateNewQuestion();
    }, isCorrect ? 1000 : 1500);
  }, [isAnswered, currentSign, correctAnswer, generateNewQuestion]);
  
  const handleSkipQuestion = useCallback(() => {
    if (isAnswered || isGenerating) return;
    setGameState(prevState => ({
        ...prevState,
        streak: 0,
    }));
    generateNewQuestion();
  }, [isAnswered, isGenerating, generateNewQuestion]);

  const handleBuyFact = useCallback(() => {
    const uncollectedFacts = ASL_CULTURE_QUOTES.filter(
      q => !gameState.collectedFacts.includes(q)
    );
  
    if (uncollectedFacts.length > 0 && gameState.points >= COST_PER_FACT) {
      const newFact = uncollectedFacts[Math.floor(Math.random() * uncollectedFacts.length)];
      setGameState(prevState => ({
        ...prevState,
        points: prevState.points - COST_PER_FACT,
        collectedFacts: [...prevState.collectedFacts, newFact]
      }));
      setNewlyAcquiredFact(newFact);
    }
  }, [gameState]);
  
  const handleCloseModal = () => {
    setNewlyAcquiredFact(null);
  };

  const handleThemeToggle = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress? This action cannot be undone.')) {
        setGameState(initialGameState);
        setActiveCategory('alphabet');
        setActiveSubCategory(null);
    }
  };
  
  const handleSelectCategory = (category: Category) => {
      if (category === activeCategory && !['collectibles', 'dictionary', 'options'].includes(category)) {
          setActiveSubCategory(null);
          return;
      }
      setActiveCategory(category);
      setActiveSubCategory(null);
  };

  const handleSelectSubCategory = (subCategory: SubCategory) => {
      setActiveSubCategory(subCategory);
  };

  const areAllFactsCollected = collectedFacts.length === ASL_CULTURE_QUOTES.length;

  const renderContent = () => {
    switch(activeCategory) {
      case 'collectibles':
        return (
          <CollectiblesZone
            points={points}
            collectedFacts={collectedFacts}
            cost={COST_PER_FACT}
            onBuyFact={handleBuyFact}
            areAllFactsCollected={areAllFactsCollected}
          />
        );
      case 'dictionary':
        return <PlaceholderZone title="Dictionary" message="Browse a library of ASL signs and their meanings. This feature is currently in development." icon={BookOpenIcon} />;
      case 'options':
        return <PlaceholderZone title="Options" message="Customize your learning experience. This section is coming soon!" icon={CogIcon} />;
      case 'alphabet':
        if (!activeSubCategory) {
            return <SubCategorySelector category={activeCategory} onSelect={handleSelectSubCategory} />;
        }
        switch (activeSubCategory) {
            case 'quiz':
                return (
                  <QuizZone
                    sign={currentSign}
                    choices={choices}
                    onSelectChoice={handleChoiceSelection}
                    feedback={feedback}
                    isAnswered={isAnswered}
                    pointsPerCorrectAnswer={POINTS_PER_CORRECT_ANSWER}
                    onSkip={handleSkipQuestion}
                    isGenerating={isGenerating}
                    correctAnswer={correctAnswer}
                  />
                );
            case 'time-attack':
                return <PlaceholderZone title="Time Attack" message="Test your speed and accuracy against the clock. Coming soon!" />;
            case 'matching':
                return <PlaceholderZone title="Matching Game" message="Match signs to letters in a fun and interactive game. Coming soon!" />;
        }
        return null; // Should not be reached
      
      case 'vocabulary':
      case 'phrases':
          if (!activeSubCategory) {
              return <SubCategorySelector category={activeCategory} onSelect={handleSelectSubCategory} />;
          }
          // All sub-categories for vocab/phrases are placeholders for now
          const subCategoryTitle = activeSubCategory.charAt(0).toUpperCase() + activeSubCategory.slice(1).replace('-', ' ');
          const categoryTitle = activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);
          return <PlaceholderZone title={`${categoryTitle}: ${subCategoryTitle}`} message={`This mode is under active development. Check back soon!`} />;

      default:
        return null;
    }
  }

  return (
    <>
      {newlyAcquiredFact && <FactModal fact={newlyAcquiredFact} onClose={handleCloseModal} />}
      <div className="min-h-screen font-sans p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8 relative">
          <h1 className="text-4xl sm:text-5xl font-bold text-sky-600 dark:text-sky-400">
            ASL Quiz
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Guess the sign, earn points, and collect facts!
          </p>
          <div className="absolute top-0 right-0">
             <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
          </div>
        </header>
        
        <main className="max-w-4xl mx-auto">
          <StatsDisplay points={points} streak={streak} />
          
          <div className="mt-8">
            <CategorySelector activeCategory={activeCategory} onSelectCategory={handleSelectCategory} />
            <div className="mt-6">
              {renderContent()}
            </div>
          </div>
        </main>
        
        <footer className="text-center mt-12 text-sm text-slate-500 dark:text-slate-500">
            <p>Created by a World-Class Senior Frontend React Engineer.</p>
            <button
              onClick={handleResetProgress}
              className="mt-4 text-xs text-red-600 dark:text-red-500 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
              aria-label="Reset all progress"
            >
              Reset All Progress
            </button>
        </footer>
      </div>
    </>
  );
}