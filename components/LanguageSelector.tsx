
import React from 'react';
import type { Language, JSLScript, KanjiLevel } from '../types';

interface LanguageSelectorProps {
  language: Language;
  jslScript: JSLScript;
  kanjiLevel: KanjiLevel;
  onLanguageChange: (lang: Language) => void;
  onScriptChange: (script: JSLScript) => void;
  onKanjiLevelChange: (level: KanjiLevel) => void;
}

const KANJI_LEVELS: KanjiLevel[] = [1, 2, 3, 4, 5];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  jslScript,
  kanjiLevel,
  onLanguageChange,
  onScriptChange,
  onKanjiLevelChange,
}) => {
  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <div className="flex justify-center gap-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-full">
        <button
          onClick={() => onLanguageChange('ASL')}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
            language === 'ASL'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/60'
          }`}
          aria-pressed={language === 'ASL'}
        >
          ASL
        </button>
        <button
          onClick={() => onLanguageChange('JSL')}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
            language === 'JSL'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/60'
          }`}
          aria-pressed={language === 'JSL'}
        >
          JSL
        </button>
         <button
          onClick={() => onLanguageChange('Kanji')}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
            language === 'Kanji'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/60'
          }`}
          aria-pressed={language === 'Kanji'}
        >
          Kanji
        </button>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          language === 'JSL' ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={language !== 'JSL'}
      >
        <div className="flex justify-center gap-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-full mt-1">
          <button
            onClick={() => onScriptChange('Hiragana')}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              jslScript === 'Hiragana'
                ? 'bg-pink-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/60'
            }`}
            aria-pressed={jslScript === 'Hiragana'}
            tabIndex={language === 'JSL' ? 0 : -1}
          >
            Hiragana
          </button>
          <button
            onClick={() => onScriptChange('Katakana')}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              jslScript === 'Katakana'
                ? 'bg-pink-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/60'
            }`}
            aria-pressed={jslScript === 'Katakana'}
             tabIndex={language === 'JSL' ? 0 : -1}
          >
            Katakana
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          language === 'Kanji' ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={language !== 'Kanji'}
      >
        <div className="flex justify-center gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-full mt-1">
          {KANJI_LEVELS.map(level => (
            <button
              key={level}
              onClick={() => onKanjiLevelChange(level)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                kanjiLevel === level
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/60'
              }`}
              aria-pressed={kanjiLevel === level}
              tabIndex={language === 'Kanji' ? 0 : -1}
            >
              Level {level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};