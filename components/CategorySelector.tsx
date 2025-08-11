import React from 'react';
import type { Category } from '../types';

interface CategorySelectorProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const categories: { id: Category; label: string }[] = [
  { id: 'tree', label: 'Tree' },
  { id: 'alphabet', label: 'Alphabet' },
  { id: 'vocabulary', label: 'Wildcard' },
  { id: 'phrases', label: 'Phrases' },
  { id: 'story', label: 'Story' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'dictionary', label: 'Dictionary' },
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="border-b border-stone-200 dark:border-stone-700">
      <nav className="-mb-px flex flex-wrap justify-center space-x-2 sm:space-x-8" aria-label="Categories">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm sm:text-base transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-stone-950 focus:ring-indigo-500 rounded-t-lg
                ${
                  isActive
                    ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                    : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300 dark:text-stone-400 dark:hover:text-stone-200 dark:hover:border-stone-500'
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