

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Card } from './Card';
import { ALPHABET_DICTIONARY, WORD_DICTIONARY } from '../constants';
import type { DictionaryEntry } from '../types';

const DictionaryItem: React.FC<{ item: DictionaryEntry }> = ({ item }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);
  
  return (
    <div className="flex flex-col items-center p-2 rounded-lg bg-stone-100 dark:bg-stone-700/50 shadow-md transition-transform hover:scale-105 h-full">
      <div className="w-full h-[9.5rem] flex items-center justify-center bg-stone-200 dark:bg-stone-600 rounded-md overflow-hidden">
        {item.mediaType === 'video' ? (
          <video
            ref={videoRef}
            key={item.mediaUrl}
            src={item.mediaUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
            aria-label={`ASL sign for ${item.term}`}
          />
        ) : (
          <img
            src={item.mediaUrl}
            alt={`ASL sign for ${item.term}`}
            className="w-full h-full object-contain"
          />
        )}
      </div>
      <p className="mt-2 text-lg text-center font-bold text-stone-800 dark:text-stone-200 break-words flex-grow flex items-center">{item.term}</p>
    </div>
  );
};

const TabButton: React.FC<{label: string, isActive: boolean, onClick: () => void}> = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`whitespace-nowrap py-3 px-6 border-b-2 font-semibold text-base transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-stone-950 focus:ring-indigo-500 rounded-t-lg
        ${isActive
          ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
          : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300 dark:text-stone-400 dark:hover:text-stone-200 dark:hover:border-stone-500'
        }
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </button>
  );

const Pagination: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void; }> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav className="flex justify-center items-center gap-4 mt-8" aria-label="Dictionary pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-semibold rounded-md transition-colors bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                &larr; Previous
            </button>
            <span className="text-sm font-medium text-stone-600 dark:text-stone-400">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-semibold rounded-md transition-colors bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next &rarr;
            </button>
        </nav>
    );
};

export const DictionaryZone: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDict, setActiveDict] = useState<'words' | 'alphabet'>('words');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 18;

  const filteredEntries = useMemo(() => {
    const source = activeDict === 'alphabet' ? ALPHABET_DICTIONARY : WORD_DICTIONARY;
    if (!searchTerm) {
      return source;
    }
    return source.filter(entry =>
      entry.term.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }, [searchTerm, activeDict]);

  const totalPages = Math.ceil(filteredEntries.length / ITEMS_PER_PAGE);
  const paginatedEntries = useMemo(() => {
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      return filteredEntries.slice(start, end);
  }, [filteredEntries, currentPage]);

  const handleTabChange = (dict: 'words' | 'alphabet') => {
      setActiveDict(dict);
      setSearchTerm('');
      setCurrentPage(1);
  }
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <Card className="h-full flex flex-col min-h-[400px]">
      <h3 className="text-2xl font-bold mb-2 text-center text-stone-700 dark:text-stone-200">ASL Dictionary</h3>

      <div className="border-b border-stone-200 dark:border-stone-700 mb-6">
        <nav className="flex justify-center space-x-4" aria-label="Dictionary categories">
            <TabButton label="Words" isActive={activeDict === 'words'} onClick={() => handleTabChange('words')} />
            <TabButton label="Alphabet" isActive={activeDict === 'alphabet'} onClick={() => handleTabChange('alphabet')} />
        </nav>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={`Search for a ${activeDict === 'alphabet' ? 'letter' : 'word'}...`}
          className="w-full py-3 pl-10 pr-4 bg-stone-100 dark:bg-stone-900/50 rounded-lg border-2 border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          aria-label="Search dictionary"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {paginatedEntries.length > 0 ? (
        <div className="flex flex-col flex-grow">
          <div className="flex-grow grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {paginatedEntries.map(entry => (
              <DictionaryItem key={entry.term} item={entry} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      ) : (
        <div className="text-center py-10 flex-grow flex flex-col items-center justify-center">
          <p className="text-lg font-semibold text-stone-600 dark:text-stone-300">No signs found</p>
          <p className="text-stone-500 dark:text-stone-400">Could not find a match for "{searchTerm}".</p>
        </div>
      )}
    </Card>
  );
};