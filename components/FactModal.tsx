import React, { useEffect } from 'react';
import { Card } from './Card';

interface FactModalProps {
  fact: string;
  onClose: () => void;
}

export const FactModal: React.FC<FactModalProps> = ({ fact, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="fact-modal-title"
    >
      <div onClick={e => e.stopPropagation()} className="w-full max-w-md">
        <Card className="animate-fade-in-up">
            <h2 id="fact-modal-title" className="text-2xl font-bold text-sky-600 dark:text-sky-400 mb-4">
                New Fact Unlocked!
            </h2>
            <blockquote className="text-lg italic text-slate-700 dark:text-slate-200 border-l-4 border-sky-500 pl-4 py-2 bg-slate-100 dark:bg-slate-700/50 rounded-r-lg">
                {fact}
            </blockquote>
            <button
                onClick={onClose}
                className="mt-6 w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 transition-colors"
                aria-label="Close modal"
            >
                Awesome!
            </button>
        </Card>
      </div>
    </div>
  );
};
