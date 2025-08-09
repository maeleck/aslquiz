import React, { useEffect } from 'react';
import { Card } from './Card';
import { CogIcon } from './Icons';

interface OptionsModalProps {
  onClose: () => void;
  onReset: () => void;
}

export const OptionsModal: React.FC<OptionsModalProps> = ({ onClose, onReset }) => {
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
      aria-labelledby="options-modal-title"
    >
      <div onClick={e => e.stopPropagation()} className="w-full max-w-md">
        <Card className="animate-fade-in-up">
            <div className="flex items-center mb-4">
                <CogIcon className="w-8 h-8 text-sky-500 dark:text-sky-400 mr-3" />
                <h2 id="options-modal-title" className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                    Options
                </h2>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                More settings to customize your learning experience will be available here soon.
            </p>

            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-red-800 dark:text-red-300">Danger Zone</h3>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1 mb-3">This action cannot be undone.</p>
                <button
                    onClick={onReset}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 transition-colors"
                    aria-label="Reset all progress"
                >
                    Reset All Progress
                </button>
            </div>
            
            <button
                onClick={onClose}
                className="mt-6 w-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 transition-colors"
                aria-label="Close modal"
            >
                Close
            </button>
        </Card>
      </div>
    </div>
  );
};