import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ALPHABET, ASL_CULTURE_QUOTES, COST_PER_FACT, POINTS_PER_CORRECT_ANSWER, VOCAB_TREE, WORDS_BY_LEVEL, MAX_ALPHABET_LEVEL } from './constants';
import type { AlphabetSign, Category, SubCategory, VocabTopic } from './types';
import { StatsDisplay } from './components/StatsDisplay';
import { QuizZone } from './components/QuizZone';
import { CollectiblesZone } from './components/CollectiblesZone';
import { FactModal } from './components/FactModal';
import { ThemeToggle } from './components/ThemeToggle';
import { CategorySelector } from './components/CategorySelector';
import { PlaceholderZone } from './components/PlaceholderZone';
import { SubCategorySelector } from './components/SubCategorySelector';
import { BookOpenIcon, CogIcon, SparklesIcon, SitemapIcon } from './components/Icons';
import { TreeZone } from './components/TreeZone';
import { OptionsModal } from './components/OptionsModal';


interface GameState {
  points: number;
  collectedFacts: string[];
  streak: number;
  unlockedTopics: string[];
}

const STORAGE_KEY = 'aslQuizProgress';

const initialGameState: GameState = {
  points: 0,
  collectedFacts: [],
  streak: 0,
  unlockedTopics: ['basics'],
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
  const [currentQuestionSigns, setCurrentQuestionSigns] = useState<AlphabetSign[]>([]);
  const [choices, setChoices] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ choice: string, correct: boolean } | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  const [activeCategory, setActiveCategory] = useState<Category>('alphabet');
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | null>(null);
  const [activeTopic, setActiveTopic] = useState<VocabTopic | null>(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [userAnswer, setUserAnswer] = useState<string>('');

  const alphabetMap = useMemo(() => new Map(ALPHABET.map(sign => [sign.letter, sign])), []);

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

  const { points, streak, collectedFacts, unlockedTopics } = gameState;

  const generateNewQuestion = useCallback((level: number) => {
    setIsGenerating(true);
    setIsAnswered(false);
    setFeedback(null);
    setCurrentQuestionSigns([]);
    setUserAnswer('');

    if (level === 1) {
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

      setCurrentQuestionSigns([correctSign]);
      setChoices(allChoices);
      setCorrectAnswer(correctAnswerValue);
    } else {
      const wordsForLevel = WORDS_BY_LEVEL[level];
      if (!wordsForLevel) {
        console.error(`No words found for level: ${level}`);
        setIsGenerating(false);
        return;
      }
      const word = wordsForLevel[Math.floor(Math.random() * wordsForLevel.length)];
      const signs = word.split('').map(letter => alphabetMap.get(letter)).filter(Boolean) as AlphabetSign[];
      
      if (signs.length !== word.length) {
        console.error(`Could not generate signs for word: ${word}`);
        // Fallback to generate another question
        generateNewQuestion(level);
        return;
      }

      setCurrentQuestionSigns(signs);
      setChoices([]);
      setCorrectAnswer(word);
    }

    setIsGenerating(false);
  }, [alphabetMap]);

  useEffect(() => {
    if (activeCategory === 'alphabet' && activeSubCategory === 'quiz') {
        generateNewQuestion(currentLevel);
    }
  }, [activeCategory, activeSubCategory, currentLevel, generateNewQuestion]);

  const handleChoiceSelection = useCallback((selectedLetter: string) => {
    if (isAnswered) return;

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
        setGameState(prevState => ({ ...prevState, streak: 0 }));
    }

    setTimeout(() => generateNewQuestion(currentLevel), isCorrect ? 1000 : 1500);
  }, [isAnswered, correctAnswer, generateNewQuestion, currentLevel]);

  const handleWordSubmit = useCallback(() => {
    if (isAnswered || !userAnswer) return;

    const isCorrect = userAnswer.trim().toUpperCase() === correctAnswer;
    setIsAnswered(true);
    setFeedback({ choice: userAnswer, correct: isCorrect });

    if (isCorrect) {
      setGameState(prevState => ({
        ...prevState,
        points: prevState.points + POINTS_PER_CORRECT_ANSWER * (currentLevel),
        streak: prevState.streak + 1,
      }));
    } else {
        setGameState(prevState => ({ ...prevState, streak: 0 }));
    }
    
    setTimeout(() => generateNewQuestion(currentLevel), isCorrect ? 1200 : 2000);
  }, [isAnswered, userAnswer, correctAnswer, generateNewQuestion, currentLevel]);
  
  const handleSkipQuestion = useCallback(() => {
    if (isAnswered || isGenerating) return;
    setGameState(prevState => ({ ...prevState, streak: 0 }));
    generateNewQuestion(currentLevel);
  }, [isAnswered, isGenerating, generateNewQuestion, currentLevel]);

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
  
  const handleCloseModal = () => setNewlyAcquiredFact(null);
  const handleThemeToggle = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress? This action cannot be undone.')) {
        setGameState(initialGameState);
        setActiveCategory('alphabet');
        setActiveSubCategory(null);
        setActiveTopic(null);
        setCurrentLevel(1);
        setIsOptionsOpen(false);
    }
  };
  
  const handleSelectCategory = (category: Category) => {
      if (category === activeCategory && !['collectibles', 'dictionary', 'tree', 'story'].includes(category)) {
          setActiveSubCategory(null);
          return;
      }
      setActiveCategory(category);
      setActiveSubCategory(null);
      setActiveTopic(null);
  };

  const handleSelectSubCategory = (subCategory: SubCategory) => setActiveSubCategory(subCategory);

  const handleLevelChange = useCallback((level: number) => {
      setCurrentLevel(level);
      generateNewQuestion(level);
  }, [generateNewQuestion]);

  const handleUnlockTopic = useCallback((topic: VocabTopic) => {
      const { cost, id, prerequisites, label } = topic;
      if (points >= cost && !unlockedTopics.includes(id)) {
          const prereqsMet = prerequisites.every(p => unlockedTopics.includes(p));
          if (prereqsMet) {
              if (window.confirm(`Unlock "${label}" for ${cost} points?`)) {
                  setGameState(prev => ({
                      ...prev,
                      points: prev.points - cost,
                      unlockedTopics: [...prev.unlockedTopics, id],
                  }));
              }
          } else {
              window.alert("You must unlock prerequisite topics first!");
          }
      }
  }, [points, unlockedTopics]);

  const handleSelectTopic = (topic: VocabTopic) => {
      if (unlockedTopics.includes(topic.id)) {
          setActiveTopic(topic);
          setActiveSubCategory(null);
      }
  };

  const handleBackToTree = () => setActiveTopic(null);
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
      case 'tree':
        if (activeTopic) {
          if (!activeSubCategory) {
            return <SubCategorySelector category='tree' topic={activeTopic} onSelect={handleSelectSubCategory} onBack={handleBackToTree} />;
          }
          const subCategoryTitle = activeSubCategory.charAt(0).toUpperCase() + activeSubCategory.slice(1).replace(/-/g, ' ');
          return <PlaceholderZone title={`${activeTopic.label}: ${subCategoryTitle}`} message={`This mode is under active development. Check back soon!`} />;
        }
        return <TreeZone unlockedTopics={unlockedTopics} points={points} onSelectTopic={handleSelectTopic} onUnlockTopic={handleUnlockTopic} />;
      case 'dictionary':
        return <PlaceholderZone title="Dictionary" message="Browse a library of ASL signs and their meanings. This feature is currently in development." icon={BookOpenIcon} />;
      case 'story':
        return <PlaceholderZone title="Story Mode" message="Experience narratives told in ASL and test your comprehension. This feature is coming soon!" icon={SparklesIcon} />;
      case 'alphabet':
        if (!activeSubCategory) {
            return <SubCategorySelector category={activeCategory} onSelect={handleSelectSubCategory} />;
        }
        switch (activeSubCategory) {
            case 'quiz':
                return (
                  <QuizZone
                    level={currentLevel}
                    onLevelChange={handleLevelChange}
                    maxLevel={MAX_ALPHABET_LEVEL}
                    questionSigns={currentQuestionSigns}
                    choices={choices}
                    onSelectChoice={handleChoiceSelection}
                    onWordSubmit={handleWordSubmit}
                    userAnswer={userAnswer}
                    onUserAnswerChange={setUserAnswer}
                    feedback={feedback}
                    isAnswered={isAnswered}
                    pointsPerCorrectAnswer={POINTS_PER_CORRECT_ANSWER}
                    onSkip={handleSkipQuestion}
                    isGenerating={isGenerating}
                    correctAnswer={correctAnswer}
                  />
                );
            case 'time-attack':
            case 'matching':
            case 'reversal-quiz':
            case 'reversal-time-attack':
                 const subCategoryTitle = activeSubCategory.charAt(0).toUpperCase() + activeSubCategory.slice(1).replace(/-/g, ' ');
                 return <PlaceholderZone title={subCategoryTitle} message="This game mode is under active development. Check back soon!" />;
        }
        return null; // Should not be reached
      
      case 'vocabulary':
      case 'phrases':
          if (!activeSubCategory) {
              return <SubCategorySelector category={activeCategory} onSelect={handleSelectSubCategory} />;
          }
          const subCategoryTitle = activeSubCategory.charAt(0).toUpperCase() + activeSubCategory.slice(1).replace(/-/g, ' ');
          const categoryTitle = activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);
          return <PlaceholderZone title={`${categoryTitle}: ${subCategoryTitle}`} message={`This mode is under active development. Check back soon!`} />;

      default:
        return null;
    }
  }

  return (
    <>
      {isOptionsOpen && <OptionsModal onClose={() => setIsOptionsOpen(false)} onReset={handleResetProgress} />}
      {newlyAcquiredFact && <FactModal fact={newlyAcquiredFact} onClose={handleCloseModal} />}
      <div className="min-h-screen font-sans p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8 relative">
          <h1 className="text-4xl sm:text-5xl font-bold text-sky-600 dark:text-sky-400">
            ASL Quiz
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Guess the sign, earn points, and collect facts!
          </p>
          <div className="absolute top-0 right-0 flex items-center space-x-2">
             <button
                onClick={() => setIsOptionsOpen(true)}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 focus:ring-sky-500 transition-colors"
                aria-label="Open options menu"
              >
                <CogIcon className="h-6 w-6" />
              </button>
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
        </footer>
      </div>
    </>
  );
}