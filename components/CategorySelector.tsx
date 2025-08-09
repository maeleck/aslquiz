import React from 'react';
import type { Category } from '../types';

interface CategorySelectorProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const categories: { id: Category; label: string }[] = [
  { id: 'alphabet', label: 'Alphabet' },
  { id: 'vocabulary', label: 'Vocabulary' },
  { id: 'phrases', label: 'Phrases' },
  { id: 'collectibles', label: 'Collectibles' },
  { id: 'dictionary', label: 'Dictionary' },
  { id: 'options', label: 'Options' },
];

const categoryStyles: { [key in Category]: { base: string, active: string, hover: string } } = {
    alphabet:     { base: 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200', active: 'bg-sky-500 text-white shadow-md', hover: 'hover:bg-sky-200/70 dark:hover:bg-sky-800/60' },
    vocabulary:   { base: 'bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-200', active: 'bg-green-500 text-white shadow-md', hover: 'hover:bg-green-200/70 dark:hover:bg-green-800/60' },
    phrases:      { base: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200', active: 'bg-purple-500 text-white shadow-md', hover: 'hover:bg-purple-200/70 dark:hover:bg-purple-800/60' },
    collectibles: { base: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200', active: 'bg-amber-500 text-white shadow-md', hover: 'hover:bg-amber-200/70 dark:hover:bg-amber-800/60' },
    dictionary:   { base: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200', active: 'bg-blue-500 text-white shadow-md', hover: 'hover:bg-blue-200/70 dark:hover:bg-blue-800/60' },
    options:      { base: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200', active: 'bg-slate-500 text-white shadow-md', hover: 'hover:bg-slate-300/70 dark:hover:bg-slate-600' },
};


export const CategorySelector: React.FC<CategorySelectorProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4" aria-label="Categories">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        const styles = categoryStyles[cat.id];
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`w-full font-bold py-3 px-2 rounded-lg text-center transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-offset-2 dark:focus:ring-offset-slate-900
              ${isActive ? styles.active : `${styles.base} ${styles.hover}`}
              ${isActive ? '' : 'hover:-translate-y-1'}
            `}
            aria-current={isActive ? 'page' : undefined}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};