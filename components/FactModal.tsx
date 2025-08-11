import React, { useEffect } from 'react';
import { Card } from './Card';

interface FactModalProps {
  fact: string;
  title: string;
  onClose: () => void;
}

export const FactModal: React.FC<FactModalProps> = ({ fact, title, onClose }) => {
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
            <h2 id="fact-modal-title" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                {title}
            </h2>
            <blockquote className="text-lg italic text-stone-700 dark:text-stone-200 border-l-4 border-indigo-500 pl-4 py-2 bg-stone-100 dark:bg-stone-700/50 rounded-r-lg">
                {fact}
            </blockquote>
            <button
                onClick={onClose}
                className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-colors"
                aria-label="Close modal"
            >
                Awesome!
            </button>
        </Card>
      </div>
    </div>
  );
};