
import React from 'react';
import type { Language, JSLScript } from '../types';

interface LanguageSelectorProps {
  language: Language;
  jslScript: JSLScript;
  onLanguageChange: (lang: Language) => void;
  onScriptChange: (script: JSLScript) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  jslScript,
  onLanguageChange,
  onScriptChange,
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
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          language === 'JSL' ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
        }`}
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
          >
            Katakana
          </button>
        </div>
      </div>
    </div>
  );
};
