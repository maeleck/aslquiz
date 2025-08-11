


import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ALPHABET, ASL_CULTURE_QUOTES, COST_PER_FACT, POINTS_PER_CORRECT_ANSWER, VOCAB_TREE, WORDS_BY_LEVEL, MAX_ALPHABET_LEVEL, WORD_DICTIONARY, PHRASES, STRUCTURED_VOCAB, VOCAB_BY_COMMONALITY } from './constants';
import type { AlphabetSign, Category, SubCategory, VocabTopic, DictionaryEntry, Phrase, TreeSortMode } from './types';
import { StatsDisplay } from './components/StatsDisplay';
import { QuizZone } from './components/QuizZone';
import { CollectiblesZone } from './components/CollectiblesZone';
import { FactModal } from './components/FactModal';
import { CategorySelector } from './components/CategorySelector';
import { PlaceholderZone } from './components/PlaceholderZone';
import { SubCategorySelector } from './components/SubCategorySelector';
import { BookOpenIcon, CogIcon, SparklesIcon, SitemapIcon, QuestionMarkCircleIcon } from './components/Icons';
import { TreeZone } from './components/TreeZone';
import { OptionsModal } from './components/OptionsModal';
import { DictionaryZone } from './components/DictionaryZone';
import { MatchingGameZone } from './components/MatchingGameZone';
import { StoryZone } from './components/StoryZone';
import { LevelSelectorZone } from './components/LevelSelectorZone';
import { HelpModal } from './components/HelpModal';
import { TreeHomeZone } from './components/TreeHomeZone';
import { CommonalityLevelSelectorZone } from './components/CommonalityLevelSelectorZone';
import { showRewardedVideo } from './services/ads';


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

type TimeAttackState = {
    isActive: boolean;
    timeLeft: number;
    score: number;
    isFinished: boolean;
} | null;


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
  
  // Quiz state
  const [currentQuestionSigns, setCurrentQuestionSigns] = useState<AlphabetSign[]>([]);
  const [currentVocabQuestion, setCurrentVocabQuestion] = useState<DictionaryEntry | null>(null);
  const [currentPhraseQuestion, setCurrentPhraseQuestion] = useState<Phrase | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [choiceSigns, setChoiceSigns] = useState<AlphabetSign[]>([]);
  const [choiceVocab, setChoiceVocab] = useState<DictionaryEntry[]>([]);
  const [choicePhrases, setChoicePhrases] = useState<Phrase[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ choice: string, correct: boolean } | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  const [activeCategory, setActiveCategory] = useState<Category>('tree');
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | null>(null);
  const [activeTopic, setActiveTopic] = useState<VocabTopic | null>(null);
  const [activeVocabLevel, setActiveVocabLevel] = useState<number | null>(null);
  const [treeSortMode, setTreeSortMode] = useState<TreeSortMode | null>(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [userAnswer, setUserAnswer] = useState<string>('');

  const [timeAttackState, setTimeAttackState] = useState<TimeAttackState>(null);

  const [activeLevelWordPool, setActiveLevelWordPool] = useState<DictionaryEntry[] | null>(null);
  const [currentWordSet, setCurrentWordSet] = useState<DictionaryEntry[] | null>(null);

  const alphabetMap = useMemo(() => new Map(ALPHABET.map(sign => [sign.letter, sign])), []);
  const wordMap = useMemo(() => new Map(WORD_DICTIONARY.map(entry => [entry.term, entry])), []);
  
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

  useEffect(() => {
    if (timeAttackState?.isActive && timeAttackState.timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeAttackState(prev => prev ? { ...prev, timeLeft: prev.timeLeft - 1 } : null);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeAttackState?.isActive && timeAttackState.timeLeft === 0) {
      setTimeAttackState(prev => prev ? { ...prev, isActive: false, isFinished: true } : null);
      setGameState(prev => ({ ...prev, points: prev.points + (timeAttackState?.score || 0) }));
    }
  }, [timeAttackState]);

  const { points, streak, collectedFacts, unlockedTopics } = gameState;
  
  const generateAndSetWordSubset = useCallback((wordPool: DictionaryEntry[] | null) => {
    if (!wordPool || wordPool.length === 0) {
        setCurrentWordSet([]);
        return;
    }
    const shuffled = shuffleArray(wordPool);
    const subset = shuffled.slice(0, 10);
    setCurrentWordSet(subset);
  }, []);

  useEffect(() => {
    // When user enters the main vocabulary review, prepare the word pool and initial set.
    if (activeCategory === 'vocabulary' && !activeSubCategory) {
        const unlockedWords = new Set<string>();
        unlockedTopics.forEach(topicId => {
            STRUCTURED_VOCAB[topicId]?.levels.forEach(level => {
                level.words.forEach(word => unlockedWords.add(word));
            });
        });
        
        const wordPool = Array.from(unlockedWords)
            .map(word => wordMap.get(word))
            .filter(Boolean) as DictionaryEntry[];
        
        setActiveLevelWordPool(wordPool);
        generateAndSetWordSubset(wordPool);
    }
  }, [activeCategory, activeSubCategory, unlockedTopics, wordMap, generateAndSetWordSubset]);


  const generateNewQuestion = useCallback((category: Category, level: number, mode: 'normal' | 'reversal') => {
    setIsGenerating(true);
    setIsAnswered(false);
    setFeedback(null);
    setCurrentQuestionSigns([]);
    setCurrentVocabQuestion(null);
    setCurrentPhraseQuestion(null);
    setChoiceSigns([]);
    setChoiceVocab([]);
    setChoicePhrases([]);
    setChoices([]);
    setUserAnswer('');

    if (category === 'alphabet') {
        if (mode === 'reversal') {
            const correctSign = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
            setCorrectAnswer(correctSign.letter);
            const distractors: AlphabetSign[] = [];
            while (distractors.length < 3) {
                const randomSign = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
                if (randomSign.letter !== correctSign.letter && !distractors.some(d => d.letter === randomSign.letter)) {
                    distractors.push(randomSign);
                }
            }
            setChoiceSigns(shuffleArray([correctSign, ...distractors]));
        } else if (level === 1) { // Normal level 1
            const correctSign = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
            setCorrectAnswer(correctSign.letter);
            const distractors: string[] = [];
            while (distractors.length < 3) {
                const randomLetter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)].letter;
                if (randomLetter !== correctSign.letter && !distractors.includes(randomLetter)) {
                    distractors.push(randomLetter);
                }
            }
            setCurrentQuestionSigns([correctSign]);
            setChoices(shuffleArray([correctSign.letter, ...distractors]));
        } else { // Normal level 2+ (words)
            const wordsForLevel = WORDS_BY_LEVEL[level];
            if (!wordsForLevel) { setIsGenerating(false); return; }
            const word = wordsForLevel[Math.floor(Math.random() * wordsForLevel.length)];
            const signs = word.split('').map(letter => alphabetMap.get(letter)).filter(Boolean) as AlphabetSign[];
            if (signs.length !== word.length) { generateNewQuestion(category, level, mode); return; }
            setCurrentQuestionSigns(signs);
            setCorrectAnswer(word);
        }
    } else if (category === 'vocabulary' || category === 'tree') {
        if (!currentWordSet || currentWordSet.length === 0) {
            console.error("No vocabulary words available for this set.");
            setIsGenerating(false);
            return;
        }
        const vocabList = currentWordSet;
        
        if (vocabList.length < 4 && (mode === 'reversal' || activeSubCategory?.includes('reversal'))) {
            console.error("Not enough vocabulary words for a reversal quiz.");
            setIsGenerating(false);
            return;
        }

        if (mode === 'reversal') {
            const correctEntry = vocabList[Math.floor(Math.random() * vocabList.length)];
            setCorrectAnswer(correctEntry.term);
            const distractors: DictionaryEntry[] = [];
            let attempts = 0;
            while (distractors.length < 3 && attempts < vocabList.length * 2) {
                const randomEntry = vocabList[Math.floor(Math.random() * vocabList.length)];
                if (randomEntry.term !== correctEntry.term && !distractors.some(d => d.term === randomEntry.term)) {
                    distractors.push(randomEntry);
                }
                attempts++;
            }
             // Ensure enough distractors were found
            while(distractors.length < 3 && distractors.length < vocabList.length - 1) {
                const randomEntry = vocabList[Math.floor(Math.random() * vocabList.length)];
                if (!distractors.some(d => d.term === randomEntry.term)) {
                    distractors.push(randomEntry);
                }
            }
            setChoiceVocab(shuffleArray([correctEntry, ...distractors]));
        } else { // Normal vocab quiz
            const correctEntry = vocabList[Math.floor(Math.random() * vocabList.length)];
            setCurrentVocabQuestion(correctEntry);
            setCorrectAnswer(correctEntry.term);
            const distractors: string[] = [];
            let attempts = 0;
            while (distractors.length < 3 && attempts < vocabList.length * 2) {
                const randomWord = vocabList[Math.floor(Math.random() * vocabList.length)].term;
                if (randomWord !== correctEntry.term && !distractors.includes(randomWord)) {
                    distractors.push(randomWord);
                }
                attempts++;
            }
            // Ensure enough distractors were found
            while(distractors.length < 3 && distractors.length < vocabList.length -1) {
                const randomWord = vocabList[Math.floor(Math.random() * vocabList.length)].term;
                if (!distractors.includes(randomWord)) {
                    distractors.push(randomWord);
                }
            }
            setChoices(shuffleArray([correctEntry.term, ...distractors]));
        }
    } else if (category === 'phrases') {
        if (PHRASES.length === 0) {
            console.error("No phrases available to create a question.");
            setIsGenerating(false);
            return;
        }
        if (mode === 'reversal') {
            if (PHRASES.length < 4) {
                 console.error("Not enough unique phrases for reversal quiz.");
                 setIsGenerating(false);
                 return;
            }
            const correctPhrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
            setCorrectAnswer(correctPhrase.text);
            const distractors: Phrase[] = [];
            let attempts = 0;
            while (distractors.length < 3 && attempts < PHRASES.length * 2) {
                const randomPhrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
                if (randomPhrase.text !== correctPhrase.text && !distractors.some(d => d.text === randomPhrase.text)) {
                    distractors.push(randomPhrase);
                }
                attempts++;
            }
            setChoicePhrases(shuffleArray([correctPhrase, ...distractors]));
        } else { // Normal phrase quiz
            const phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
            setCurrentPhraseQuestion(phrase);
            setCorrectAnswer(phrase.text);
        }
    }


    setIsGenerating(false);
  }, [alphabetMap, activeSubCategory, currentWordSet]);

  const getQuizMode = useCallback((): 'normal' | 'reversal' => {
      return activeSubCategory === 'reversal-quiz' || activeSubCategory === 'reversal-time-attack' ? 'reversal' : 'normal';
  }, [activeSubCategory]);

  useEffect(() => {
    const isStandardQuiz = ['quiz', 'reversal-quiz'].includes(activeSubCategory || '');
    const isQuizActive = ['quiz', 'reversal-quiz', 'time-attack', 'reversal-time-attack', 'matching'].includes(activeSubCategory || '');
    const isPlayableCategory = ['alphabet', 'vocabulary', 'phrases', 'tree'].includes(activeCategory);

    if (isStandardQuiz && isPlayableCategory && !isAnswered) {
      // Don't generate question for 'tree' or 'vocabulary' if word set isn't ready
      if((activeCategory === 'tree' || activeCategory === 'vocabulary') && !currentWordSet) return;
      generateNewQuestion(activeCategory, currentLevel, getQuizMode());
    } else if (!isQuizActive) {
      // Clear question state if we are not in any quiz/game mode (e.g., on category selector, or in dictionary/collectibles)
      setCurrentQuestionSigns([]);
      setCurrentVocabQuestion(null);
      setCurrentPhraseQuestion(null);
    }
  }, [activeCategory, activeSubCategory, currentLevel, generateNewQuestion, getQuizMode, currentWordSet, isAnswered]);
  
  const handleChoiceSelection = useCallback((selectedAnswer: string) => {
    if (isAnswered) return;

    const isCorrect = selectedAnswer.toUpperCase() === correctAnswer.toUpperCase();
    setIsAnswered(true);
    setFeedback({ choice: selectedAnswer, correct: isCorrect });

    const isTimeAttack = activeSubCategory === 'time-attack' || activeSubCategory === 'reversal-time-attack';

    if (isTimeAttack) {
      if (isCorrect) {
        setTimeAttackState(prev => {
            if (!prev || !prev.isActive) return prev;
            return { ...prev, score: prev.score + POINTS_PER_CORRECT_ANSWER };
        });
      }
      setTimeout(() => generateNewQuestion(activeCategory, currentLevel, getQuizMode()), 1200);
    } else {
      if (isCorrect) {
        setGameState(prevState => ({
          ...prevState,
          points: prevState.points + POINTS_PER_CORRECT_ANSWER,
          streak: prevState.streak + 1,
        }));
      } else {
          setGameState(prevState => ({ ...prevState, streak: 0 }));
      }
    }
  }, [isAnswered, correctAnswer, generateNewQuestion, currentLevel, getQuizMode, activeCategory, activeSubCategory]);

  const handleWordSubmit = useCallback(() => {
    if (isAnswered || !userAnswer) return;
    const isCorrect = userAnswer.trim().toUpperCase() === correctAnswer.toUpperCase();
    setIsAnswered(true);
    setFeedback({ choice: userAnswer, correct: isCorrect });

    const pointsToAward = POINTS_PER_CORRECT_ANSWER * (activeCategory === 'alphabet' ? currentLevel : activeCategory === 'phrases' ? 2 : 1);
    const isTimeAttack = activeSubCategory === 'time-attack' || activeSubCategory === 'reversal-time-attack';

    if (isTimeAttack) {
        if (isCorrect) {
            setTimeAttackState(prev => {
                if (!prev || !prev.isActive) return prev;
                return { ...prev, score: prev.score + pointsToAward };
            });
        }
        setTimeout(() => generateNewQuestion(activeCategory, currentLevel, getQuizMode()), 1200);
    } else {
        if (isCorrect) {
            setGameState(prevState => ({
            ...prevState,
            points: prevState.points + pointsToAward,
            streak: prevState.streak + 1,
            }));
        } else {
            setGameState(prevState => ({ ...prevState, streak: 0 }));
        }
    }
  }, [isAnswered, userAnswer, correctAnswer, generateNewQuestion, currentLevel, getQuizMode, activeCategory, activeSubCategory]);
  
  const handleNextQuestion = useCallback(() => {
    generateNewQuestion(activeCategory, currentLevel, getQuizMode());
  }, [generateNewQuestion, activeCategory, currentLevel, getQuizMode]);

  const handleBackToActivities = useCallback(() => {
    setActiveSubCategory(null);
  }, []);

  const handleStartTimeAttack = () => {
    setTimeAttackState({ isActive: true, timeLeft: 30, score: 0, isFinished: false });
    // Don't generate question if word set isn't ready
    if((activeCategory === 'tree' || activeCategory === 'vocabulary') && !currentWordSet) return;
    generateNewQuestion(activeCategory, currentLevel, getQuizMode());
  };

  const handlePlayAgainTimeAttack = () => {
    setTimeAttackState(null);
  };
  
  const handleMatchingGameComplete = useCallback((awardedPoints: number) => {
    setGameState(prev => ({...prev, points: prev.points + awardedPoints }));
    window.alert(`You earned ${awardedPoints} points!`);
  }, []);

  const handleStoryCorrectAnswer = useCallback(() => {
    setGameState(prev => ({
        ...prev,
        points: prev.points + 2,
        streak: prev.streak + 1,
    }));
  }, []);

  const handleStoryIncorrectAnswer = useCallback(() => {
      setGameState(prev => ({ ...prev, streak: 0 }));
  }, []);

  const handleBuyFact = useCallback(() => {
    const uncollectedFacts = ASL_CULTURE_QUOTES.filter(q => !gameState.collectedFacts.includes(q));
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
  
  const handleAdReward = useCallback((rewardPoints: number) => {
    setGameState(prev => ({
        ...prev,
        points: prev.points + rewardPoints,
    }));
    alert(`You earned ${rewardPoints} points!`);
    setIsOptionsOpen(false);
  }, []);

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress? This action cannot be undone.')) {
        setGameState(initialGameState);
        setActiveCategory('tree');
        setActiveSubCategory(null);
        setActiveTopic(null);
        setActiveVocabLevel(null);
        setTreeSortMode(null);
        setCurrentLevel(1);
        setIsOptionsOpen(false);
        setActiveLevelWordPool(null);
        setCurrentWordSet(null);
    }
  };
  
  const handleSelectCategory = (category: Category) => {
      if (category === activeCategory && !['collectibles', 'dictionary', 'story'].includes(category)) {
          // Allow re-clicking tree to go back to its home
          if (category === 'tree') {
            setTreeSortMode(null);
            setActiveTopic(null);
            setActiveVocabLevel(null);
            setActiveLevelWordPool(null);
            setCurrentWordSet(null);
          }
          setActiveSubCategory(null);
          return;
      }
      setActiveCategory(category);
      setActiveSubCategory(null);
      setActiveTopic(null);
      setActiveVocabLevel(null);
      setTreeSortMode(null);
      setTimeAttackState(null);
      setActiveLevelWordPool(null);
      setCurrentWordSet(null);
  };

  const handleSelectSubCategory = (subCategory: SubCategory) => {
    setActiveSubCategory(subCategory);
    setTimeAttackState(null);
  }

  const handleLevelChange = useCallback((level: number) => {
      setCurrentLevel(level);
      generateNewQuestion(activeCategory, level, getQuizMode());
  }, [generateNewQuestion, getQuizMode, activeCategory]);

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
          setActiveVocabLevel(null);
      }
  };

  const handleShuffleWords = useCallback(() => {
    generateAndSetWordSubset(activeLevelWordPool);
  }, [activeLevelWordPool, generateAndSetWordSubset]);

  const handleSelectLevel = useCallback((level: number) => {
    setActiveVocabLevel(level);
    setActiveSubCategory(null);
    
    let wordPool: DictionaryEntry[] = [];
    if (treeSortMode === 'topic' && activeTopic) {
        const topicData = STRUCTURED_VOCAB[activeTopic.id];
        const levelData = topicData?.levels.find(l => l.level === level);
        if (levelData) {
            wordPool = levelData.words.map(word => wordMap.get(word)).filter(Boolean) as DictionaryEntry[];
        }
    } else if (treeSortMode === 'commonality') {
        const levelData = VOCAB_BY_COMMONALITY.find(l => l.level === level);
        if (levelData) {
             wordPool = levelData.words.map(word => wordMap.get(word)).filter(Boolean) as DictionaryEntry[];
        }
    }
    setActiveLevelWordPool(wordPool);
    generateAndSetWordSubset(wordPool);
  }, [activeTopic, treeSortMode, wordMap, generateAndSetWordSubset]);
  
  const handleBackToTreeHome = () => {
    setTreeSortMode(null);
    setActiveTopic(null);
    setActiveVocabLevel(null);
    setActiveLevelWordPool(null);
    setCurrentWordSet(null);
  };

  const handleBackToTopicSelector = () => {
      setActiveTopic(null);
      setActiveSubCategory(null);
      setActiveVocabLevel(null);
      setActiveLevelWordPool(null);
      setCurrentWordSet(null);
  }

  const handleBackToLevelSelector = () => {
    setActiveSubCategory(null);
    // When going back to the level list, we are leaving the "active level" context
    setActiveVocabLevel(null);
    setActiveLevelWordPool(null);
    setCurrentWordSet(null);
  }

  const areAllFactsCollected = collectedFacts.length === ASL_CULTURE_QUOTES.length;

  const quizMode = getQuizMode();
  const isTimeAttack = activeSubCategory === 'time-attack' || activeSubCategory === 'reversal-time-attack';
  
  const getTopicLabel = () => {
    if (activeCategory === 'vocabulary') return "Vocabulary Review";
    if (activeCategory !== 'tree') return undefined;
    if (treeSortMode === 'topic' && activeTopic) {
        return `${activeTopic.label}${activeVocabLevel ? ` - Level ${activeVocabLevel}` : ''}`;
    }
    if (treeSortMode === 'commonality' && activeVocabLevel) {
        return `Commonality - Level ${activeVocabLevel}`;
    }
    return undefined;
  };

  const quizComponent = useMemo(() => (
    <QuizZone
        mode={quizMode}
        category={activeCategory}
        level={currentLevel}
        onLevelChange={handleLevelChange}
        maxLevel={MAX_ALPHABET_LEVEL}
        questionSigns={currentQuestionSigns}
        questionVocab={currentVocabQuestion}
        questionPhrase={currentPhraseQuestion}
        choices={choices}
        choiceSigns={choiceSigns}
        choiceVocab={choiceVocab}
        choicePhrases={choicePhrases}
        onSelectChoice={handleChoiceSelection}
        onWordSubmit={handleWordSubmit}
        userAnswer={userAnswer}
        onUserAnswerChange={setUserAnswer}
        feedback={feedback}
        isAnswered={isAnswered}
        pointsPerCorrectAnswer={POINTS_PER_CORRECT_ANSWER}
        onBack={handleBackToActivities}
        onNextQuestion={handleNextQuestion}
        isGenerating={isGenerating}
        correctAnswer={correctAnswer}
        isTimeAttack={isTimeAttack}
        topicLabel={getTopicLabel()}
    />
  ), [
    quizMode, activeCategory, currentLevel, handleLevelChange,
    currentQuestionSigns, currentVocabQuestion, currentPhraseQuestion,
    choices, choiceSigns, choiceVocab, choicePhrases,
    handleChoiceSelection, handleWordSubmit, userAnswer,
    feedback, isAnswered, handleBackToActivities, handleNextQuestion, isGenerating,
    correctAnswer, isTimeAttack, activeTopic, activeVocabLevel, treeSortMode
  ]);

  const TimeAttackEndScreen: React.FC = () => (
      <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-sky-600 dark:text-sky-400">Time's Up!</h2>
        <p className="text-xl mt-4 text-slate-700 dark:text-slate-300">You scored</p>
        <p className="text-6xl font-bold my-4 text-amber-500">{timeAttackState?.score}</p>
        <p className="text-lg text-slate-500 dark:text-slate-400">points in 30 seconds.</p>
        <button onClick={handlePlayAgainTimeAttack} className="mt-8 w-full max-w-xs bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 transition-colors text-lg">
          Play Again
        </button>
      </div>
  );

  const TimeAttackStartScreen: React.FC = () => (
      <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-sky-600 dark:text-sky-400">Time Attack!</h2>
        <p className="text-xl mt-4 text-slate-700 dark:text-slate-300">Answer as many questions as you can in 30 seconds.</p>
          <button onClick={handleStartTimeAttack} className="mt-8 w-full max-w-xs bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 transition-colors text-lg">
          Start
        </button>
      </div>
  );
  
    const getWordsForMatching = () => {
        if ((activeCategory === 'tree' || activeCategory === 'vocabulary') && currentWordSet) {
            return currentWordSet;
        }
        // Let MatchingGameZone handle defaults for 'alphabet'.
        return undefined;
    };

  const renderContent = () => {
    const renderQuizContainer = () => {
        if (isTimeAttack) {
          if (timeAttackState?.isFinished) return <TimeAttackEndScreen />;
          if (!timeAttackState || !timeAttackState.isActive) return <TimeAttackStartScreen />;
        }

        const currentCategoryForMatching = activeCategory === 'tree' ? 'vocabulary' : activeCategory;
        
        switch (activeSubCategory) {
            case 'quiz':
            case 'reversal-quiz':
                return quizComponent;
            case 'time-attack':
            case 'reversal-time-attack':
                return (
                    <div>
                        <div className="mb-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md flex justify-between items-center font-bold">
                            <div className="text-lg text-slate-700 dark:text-slate-200">Score: <span className="text-amber-500">{timeAttackState?.score}</span></div>
                            <div className="text-lg text-red-500">Time Left: {timeAttackState?.timeLeft}s</div>
                        </div>
                        {quizComponent}
                    </div>
                );
            case 'matching':
                const wordsForMatching = getWordsForMatching();
                // Matching game needs at least 8 items for an 8-pair (16-card) board.
                if ((activeCategory === 'tree' || activeCategory === 'vocabulary') && (!wordsForMatching || wordsForMatching.length < 8)) {
                    return (
                        <PlaceholderZone
                            title="Not Enough Words"
                            message="This set doesn't have enough words for a Matching Game. Try getting a new set of words or choose another activity."
                        />
                    );
                }
                return <MatchingGameZone category={currentCategoryForMatching} topic={activeTopic ?? undefined} onGameComplete={handleMatchingGameComplete} words={wordsForMatching} />;
        }
        return null;
    }

    switch(activeCategory) {
      case 'collectibles':
        return <CollectiblesZone points={points} collectedFacts={collectedFacts} cost={COST_PER_FACT} onBuyFact={handleBuyFact} areAllFactsCollected={areAllFactsCollected} />;
      case 'tree':
        if (treeSortMode === 'topic') {
            if (activeTopic) {
                if (activeVocabLevel) {
                    if (!activeSubCategory) return <SubCategorySelector category='tree' topic={activeTopic} level={activeVocabLevel} onSelect={handleSelectSubCategory} onBack={handleBackToLevelSelector} onShuffleWords={handleShuffleWords} />;
                    return renderQuizContainer();
                }
                return <LevelSelectorZone topic={activeTopic} onSelectLevel={handleSelectLevel} onBack={handleBackToTopicSelector} />;
            }
            return <TreeZone unlockedTopics={unlockedTopics} points={points} onSelectTopic={handleSelectTopic} onUnlockTopic={handleUnlockTopic} onBack={handleBackToTreeHome} />;
        }
        if (treeSortMode === 'commonality') {
            if (activeVocabLevel) {
                if (!activeSubCategory) return <SubCategorySelector category='tree' level={activeVocabLevel} onSelect={handleSelectSubCategory} onBack={handleBackToLevelSelector} onShuffleWords={handleShuffleWords} />;
                return renderQuizContainer();
            }
            return <CommonalityLevelSelectorZone onSelectLevel={handleSelectLevel} onBack={handleBackToTreeHome} />;
        }
        return <TreeHomeZone onSelect={setTreeSortMode} />;
      case 'dictionary':
        return <DictionaryZone />;
      case 'story':
        return <StoryZone onCorrectAnswer={handleStoryCorrectAnswer} onIncorrectAnswer={handleStoryIncorrectAnswer} />;
      
      case 'alphabet':
      case 'phrases':
        if (!activeSubCategory) {
            return <SubCategorySelector category={activeCategory} onSelect={handleSelectSubCategory} />;
        }
        return renderQuizContainer();
      
      case 'vocabulary':
        if (!activeSubCategory) {
            return <SubCategorySelector category={activeCategory} onSelect={handleSelectSubCategory} onShuffleWords={handleShuffleWords} />;
        }
        return renderQuizContainer();

      default:
        return null;
    }
  }

  return (
    <>
      {isOptionsOpen && <OptionsModal 
        onClose={() => setIsOptionsOpen(false)} 
        onReset={handleResetProgress}
        theme={theme}
        onThemeToggle={handleThemeToggle} 
        onAdReward={handleAdReward}
      />}
      {isHelpOpen && <HelpModal onClose={() => setIsHelpOpen(false)} />}
      {newlyAcquiredFact && <FactModal fact={newlyAcquiredFact} onClose={handleCloseModal} />}
      <div className="min-h-screen font-sans p-4 sm:p-6 lg:p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-sky-600 dark:text-sky-400">
              ASL Clicker
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Sign, Learn, and Ascend!
            </p>
          </div>
          <div className="flex items-center space-x-2">
             <button
                onClick={() => setIsHelpOpen(true)}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 focus:ring-sky-500 transition-colors"
                aria-label="Open help menu"
              >
                <QuestionMarkCircleIcon className="h-6 w-6" />
              </button>
             <button
                onClick={() => setIsOptionsOpen(true)}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 focus:ring-sky-500 transition-colors"
                aria-label="Open options menu"
              >
                <CogIcon className="h-6 w-6" />
              </button>
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

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}