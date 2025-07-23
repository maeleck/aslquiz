
import React, { useState, useCallback, useEffect } from 'react';
import { ALPHABET, JSL_ALPHABET, JSL_KATAKANA_ALPHABET, ASL_CULTURE_QUOTES, JSL_CULTURE_QUOTES, FLUENCY_BASE_COST, FLUENCY_COST_MULTIPLIER } from './constants';
import type { AlphabetSign, Language, JSLScript } from './types';
import { StatsDisplay } from './components/StatsDisplay';
import { QuizZone } from './components/QuizZone';
import { FluencyZone } from './components/FluencyZone';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageSelector } from './components/LanguageSelector';

interface GameState {
  score: number;
  fluencyLevel: number;
  currentQuote: string;
  streak: number;
}

const STORAGE_KEY = 'aslJslQuizProgress';

const initialGameState: Record<Language, GameState> = {
  ASL: { score: 0, fluencyLevel: 0, currentQuote: 'Click "Get a Random Fact" to learn about ASL culture!', streak: 0 },
  JSL: { score: 0, fluencyLevel: 0, currentQuote: 'Click "Get a Random Fact" to learn about JSL culture!', streak: 0 },
};

export default function App() {
  const [language, setLanguage] = useState<Language>('ASL');
  const [jslScript, setJslScript] = useState<JSLScript>('Hiragana');
  
  const [gameStates, setGameStates] = useState<Record<Language, GameState>>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedState = window.localStorage.getItem(STORAGE_KEY);
        if (savedState) {
          // Basic validation to ensure the loaded state has the expected shape
          const parsed = JSON.parse(savedState);
          if (parsed.ASL && parsed.JSL) {
            return parsed;
          }
        }
      }
    } catch (error) {
      console.error("Could not load saved state:", error);
    }
    return initialGameState;
  });

  const [currentSign, setCurrentSign] = useState<AlphabetSign | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ choice: string, correct: boolean } | null>(null);

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

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(gameStates));
      }
    } catch (error) {
      console.error("Could not save state:", error);
    }
  }, [gameStates]);

  const { score, fluencyLevel, currentQuote, streak } = gameStates[language];
  const pointsPerCorrectAnswer = 1 + fluencyLevel;
  const costToGetFact = Math.ceil(FLUENCY_BASE_COST * Math.pow(FLUENCY_COST_MULTIPLIER, fluencyLevel));

  const generateNewQuestion = useCallback((currentLang: Language, currentScript: JSLScript) => {
    let sourceAlphabet: AlphabetSign[];
    if (currentLang === 'ASL') {
      sourceAlphabet = ALPHABET;
    } else {
      sourceAlphabet = currentScript === 'Hiragana' ? JSL_ALPHABET : JSL_KATAKANA_ALPHABET;
    }

    const correctSign = sourceAlphabet[Math.floor(Math.random() * sourceAlphabet.length)];
    
    const distractors: string[] = [];
    const alphabetLetters = sourceAlphabet.map(s => s.letter);
    while (distractors.length < 3) {
      const randomLetter = alphabetLetters[Math.floor(Math.random() * alphabetLetters.length)];
      if (randomLetter !== correctSign.letter && !distractors.includes(randomLetter)) {
        distractors.push(randomLetter);
      }
    }

    const allChoices = [correctSign.letter, ...distractors];
    // Fisher-Yates shuffle
    for (let i = allChoices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allChoices[i], allChoices[j]] = [allChoices[j], allChoices[i]];
    }

    setCurrentSign(correctSign);
    setChoices(allChoices);
    setIsAnswered(false);
    setFeedback(null);
  }, []);

  useEffect(() => {
    generateNewQuestion(language, jslScript);
  }, [language, jslScript, generateNewQuestion]);

  const handleChoiceSelection = useCallback((selectedLetter: string) => {
    if (isAnswered || !currentSign) return;

    const isCorrect = selectedLetter === currentSign.letter;
    setIsAnswered(true);
    setFeedback({ choice: selectedLetter, correct: isCorrect });

    if (isCorrect) {
      setGameStates(prevStates => ({
        ...prevStates,
        [language]: {
          ...prevStates[language],
          score: prevStates[language].score + pointsPerCorrectAnswer,
          streak: prevStates[language].streak + 1,
        }
      }));
    } else {
        setGameStates(prevStates => ({
            ...prevStates,
            [language]: {
                ...prevStates[language],
                streak: 0,
            }
        }));
    }

    setTimeout(() => {
      generateNewQuestion(language, jslScript);
    }, isCorrect ? 1000 : 1500);
  }, [isAnswered, currentSign, pointsPerCorrectAnswer, generateNewQuestion, language, jslScript]);
  
  const handleSkipQuestion = useCallback(() => {
    if (isAnswered) return;
    setGameStates(prevStates => ({
        ...prevStates,
        [language]: {
            ...prevStates[language],
            streak: 0,
        }
    }));
    generateNewQuestion(language, jslScript);
  }, [isAnswered, generateNewQuestion, language, jslScript]);

  const handleGetFact = useCallback(() => {
    if (score >= costToGetFact) {
      const quoteSource = language === 'ASL' ? ASL_CULTURE_QUOTES : JSL_CULTURE_QUOTES;
      const newQuote = quoteSource[Math.floor(Math.random() * quoteSource.length)];

      setGameStates(prevStates => ({
        ...prevStates,
        [language]: {
          ...prevStates[language],
          score: prevStates[language].score - costToGetFact,
          fluencyLevel: prevStates[language].fluencyLevel + 1,
          currentQuote: newQuote,
        }
      }));
    }
  }, [score, costToGetFact, language]);

  const handleLanguageChange = (newLang: Language) => {
    if (newLang !== language) {
        setLanguage(newLang);
        setJslScript('Hiragana');
    }
  };

  const handleScriptChange = (newScript: JSLScript) => {
    if (newScript !== jslScript) {
      setJslScript(newScript);
    }
  };

  const handleThemeToggle = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress? This action cannot be undone.')) {
        setGameStates(initialGameState);
    }
  };

  return (
    <>
      <div className="min-h-screen font-sans p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8 relative">
          <h1 className="text-4xl sm:text-5xl font-bold text-sky-600 dark:text-sky-400">
            {language === 'ASL' ? 'ASL Quiz' : `JSL Quiz: ${jslScript}`}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Guess the sign, earn points, and grow your fluency!
          </p>
          <div className="absolute top-0 right-0">
             <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
          </div>
          <LanguageSelector
            language={language}
            jslScript={jslScript}
            onLanguageChange={handleLanguageChange}
            onScriptChange={handleScriptChange}
          />
        </header>
        
        <main className="max-w-7xl mx-auto">
          <StatsDisplay score={score} fluencyLevel={fluencyLevel} streak={streak} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <QuizZone
                sign={currentSign}
                choices={choices}
                onSelectChoice={handleChoiceSelection}
                feedback={feedback}
                isAnswered={isAnswered}
                language={language}
                pointsPerCorrectAnswer={pointsPerCorrectAnswer}
                onSkip={handleSkipQuestion}
              />
            </div>
            
            <div className="lg:col-span-1 space-y-8">
              <FluencyZone
                score={score}
                fluencyLevel={fluencyLevel}
                cost={costToGetFact}
                currentQuote={currentQuote}
                onGetFact={handleGetFact}
                canAfford={score >= costToGetFact}
              />
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