import React from 'react';
import type { Category } from '../types';

interface CategorySelectorProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const categories: { id: Category; label: string }[] = [
  { id: 'tree', label: 'Tree' },
  { id: 'alphabet', label: 'Alphabet' },
  { id: 'vocabulary', label: 'Vocabulary' },
  { id: 'phrases', label: 'Phrases' },
  { id: 'story', label: 'Story' },
  { id: 'dictionary', label: 'Dictionary' },
  { id: 'collectibles', label: 'Collectibles' },
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700">
      <nav className="-mb-px flex flex-wrap justify-center space-x-2 sm:space-x-8" aria-label="Categories">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm sm:text-base transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-sky-500 rounded-t-lg
                ${
                  isActive
                    ? 'border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-500'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              {cat.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};