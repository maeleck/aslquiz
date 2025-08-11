import React, { useEffect } from 'react';
import { Card } from './Card';
import { QuestionMarkCircleIcon, BookOpenIcon, SparklesIcon, SitemapIcon, GraduationCapIcon, GlobeAltIcon, TrophyIcon, CurrencyDollarIcon } from './Icons';
import { Category } from '../types';

interface HelpModalProps {
  onClose: () => void;
}

const helpTopics: { id: string, title: string; description: string; icon: React.FC<{className?: string}> }[] = [
    {
        id: 'tree',
        title: 'Tree',
        description: 'The main vocabulary learning hub. Progress by unlocking topics or study all words sorted by how common they are.',
        icon: SitemapIcon
    },
    {
        id: 'alphabet',
        title: 'Alphabet',
        description: 'Practice recognizing the ASL alphabet signs and fingerspelling simple words. Master the building blocks of ASL.',
        icon: GraduationCapIcon
    },
    {
        id: 'vocabulary',
        title: 'Wildcard (Review)',
        description: 'Review all the words you have unlocked so far. A great way to practice everything you\'ve learned.',
        icon: BookOpenIcon
    },
    {
        id: 'story',
        title: 'Story',
        description: 'Watch short stories told in ASL and answer questions to test your comprehension skills in a real-world context.',
        icon: SparklesIcon
    },
    {
        id: 'adventure',
        title: 'Adventure',
        description: 'Explore the world and city maps, take on jobs, or embark on quests. Earn Game Cash to spend in the market. (Coming Soon!)',
        icon: GlobeAltIcon
    },
    {
        id: 'dictionary',
        title: 'Dictionary',
        description: 'A complete reference of all signs available in the app. Look up specific words, letters, and view your collected facts.',
        icon: BookOpenIcon
    },
]

const currencyTopics: { id: string, title: string; description: string; icon: React.FC<{className?: string}> }[] = [
    {
        id: 'points',
        title: 'Points',
        description: 'Earn points by correctly answering questions. Use them to unlock vocabulary topics in the Tree and buy collectible facts in the Dictionary.',
        icon: TrophyIcon
    },
    {
        id: 'game-cash',
        title: 'Game Cash (GC)',
        description: 'The main currency for Adventure mode. Earn it from jobs and quests, then spend it in the Market. (Adventure Mode Coming Soon!)',
        icon: CurrencyDollarIcon
    }
];

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
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
      aria-labelledby="help-modal-title"
    >
      <div onClick={e => e.stopPropagation()} className="w-full max-w-lg">
        <Card className="animate-fade-in-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center mb-6">
                <QuestionMarkCircleIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400 mr-3" />
                <h2 id="help-modal-title" className="text-2xl font-bold text-stone-800 dark:text-stone-200">
                    Help
                </h2>
            </div>
            
            <div className="space-y-4">
                {helpTopics.map(topic => (
                    <div key={topic.id} className="flex items-start p-4 bg-stone-100 dark:bg-stone-800/50 rounded-lg">
                        <topic.icon className="w-7 h-7 text-indigo-500 dark:text-indigo-400 mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-lg text-stone-800 dark:text-stone-200">{topic.title}</h3>
                            <p className="text-stone-600 dark:text-stone-400">{topic.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 border-t border-stone-200 dark:border-stone-700 pt-6">
                <h3 className="text-xl font-bold text-stone-800 dark:text-stone-200 mb-4 text-center">Currencies</h3>
                <div className="space-y-4">
                     {currencyTopics.map(topic => (
                        <div key={topic.id} className="flex items-start p-4 bg-stone-100 dark:bg-stone-800/50 rounded-lg">
                            <topic.icon className="w-7 h-7 text-indigo-500 dark:text-indigo-400 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg text-stone-800 dark:text-stone-200">{topic.title}</h3>
                                <p className="text-stone-600 dark:text-stone-400">{topic.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <button
                onClick={onClose}
                className="mt-6 w-full bg-stone-200 hover:bg-stone-300 dark:bg-stone-700 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-colors"
                aria-label="Close modal"
            >
                Close
            </button>
        </Card>
      </div>
    </div>
  );
};