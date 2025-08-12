

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Card } from './Card';
import { ALPHABET, ALPHABET_DICTIONARY, WORD_DICTIONARY } from '../constants';
import type { DictionaryEntry, DictionaryTab, AlphabetSign } from '../types';
import { CollectiblesZone } from './CollectiblesZone';
import { SparklesIcon } from './Icons';

const DictionaryItem: React.FC<{ item: DictionaryEntry }> = ({ item }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);
  
  const hasMedia = !!item.mediaUrl;

  return (
    <div className="flex flex-col items-center p-2 rounded-lg bg-stone-100 dark:bg-stone-700/50 shadow-md transition-transform hover:scale-105 h-full">
      <div className="w-full h-[9.5rem] flex items-center justify-center bg-stone-200 dark:bg-stone-600 rounded-md overflow-hidden text-center p-2">
        {hasMedia ? (
          item.mediaType === 'video' ? (
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
          )
        ) : (
          <span className="text-stone-500 dark:text-stone-400 font-semibold text-sm">
            Coming Soon - {item.term}
          </span>
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

    const [inputValue, setInputValue] = useState(String(currentPage));

    useEffect(() => {
        setInputValue(String(currentPage));
    }, [currentPage]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handlePageJump = () => {
        const pageNumber = parseInt(inputValue, 10);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        } else {
            setInputValue(String(currentPage));
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handlePageJump();
        // Blur the input to remove focus after submission
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement) {
            activeElement.blur();
        }
    };

    return (
        <nav className="flex justify-center items-center gap-2 sm:gap-4 mt-8" aria-label="Dictionary pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-semibold rounded-md transition-colors bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                &larr; Previous
            </button>

            <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
                <label htmlFor="page-input" className="text-sm font-medium text-stone-600 dark:text-stone-400 sr-only">
                    Page
                </label>
                <input
                    id="page-input"
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handlePageJump}
                    className="w-16 text-center bg-stone-100 dark:bg-stone-900/50 border border-stone-300 dark:border-stone-700 rounded-md py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    min="1"
                    max={totalPages}
                />
                <span className="text-sm font-medium text-stone-600 dark:text-stone-400 whitespace-nowrap">
                    of {totalPages}
                </span>
            </form>

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

const WildcardChallengeZone: React.FC<{onStart: () => void}> = ({ onStart }) => {
    return (
        <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
            <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-4">
                <SparklesIcon className="w-10 h-10 text-indigo-500 dark:text-indigo-400" />
            </div>
            <h4 className="text-2xl font-bold text-stone-800 dark:text-stone-200">True Wildcard Challenge</h4>
            <p className="mt-2 max-w-md text-stone-600 dark:text-stone-400">Ready for the ultimate test? This will quiz you on the entire dictionary of ~3000 words. For a more structured learning path, check out the 'Tree' section.</p>
            <button
                onClick={onStart}
                className="mt-8 w-full max-w-xs bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-colors text-lg shadow-lg"
            >
                Start Challenge
            </button>
        </div>
    );
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const ABCFlashcardZone: React.FC = () => {
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [deck, setDeck] = useState<DictionaryEntry[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false);
    const [flashcardCount, setFlashcardCount] = useState(5);
    const [displayIndex, setDisplayIndex] = useState(0); // for fingerspelling animation

    const alphabetMap = useMemo(() => new Map(ALPHABET.map(sign => [sign.letter, sign])), []);
    
    const handleStartSession = () => {
        const playableWords = WORD_DICTIONARY.filter(entry => !!entry.mediaUrl);
        const shuffled = shuffleArray(playableWords);
        setDeck(shuffled.slice(0, flashcardCount));
        setCurrentIndex(0);
        setIsRevealed(false);
        setDisplayIndex(0);
        setIsSessionActive(true);
    };

    const handleNextCard = () => {
        if (currentIndex < deck.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setIsRevealed(false);
            setDisplayIndex(0);
        }
    };

    const handlePrevCard = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setIsRevealed(false);
            setDisplayIndex(0);
        }
    };
    
    const handleFinishSession = () => {
        setIsSessionActive(false);
        setDeck([]);
    }

    const currentCard = deck[currentIndex];
    const fingerspellingSigns = useMemo(() => {
        if (!currentCard) return [];
        return currentCard.term.split('').map(letter => alphabetMap.get(letter.toUpperCase())).filter((s): s is AlphabetSign => !!s);
    }, [currentCard, alphabetMap]);
    
    // Fingerspelling animation effect
    useEffect(() => {
        if (!isSessionActive || !fingerspellingSigns || fingerspellingSigns.length <= 1) {
          return;
        }
        const timerId = setInterval(() => {
          setDisplayIndex(prev => (prev + 1) % fingerspellingSigns.length);
        }, 1200);
        return () => clearInterval(timerId);
    }, [isSessionActive, fingerspellingSigns]);

    const currentDisplaySign = fingerspellingSigns[displayIndex];
    
    const restartFingerspelling = () => {
        setDisplayIndex(0);
    }
    
    if (!isSessionActive) {
        return (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mb-4">
                    <SparklesIcon className="w-10 h-10 text-teal-500 dark:text-teal-400" />
                </div>
                <h4 className="text-2xl font-bold text-stone-800 dark:text-stone-200">ABC to Sign Flashcards</h4>
                <p className="mt-2 max-w-md text-stone-600 dark:text-stone-400">Select how many random words to practice. See the fingerspelling, then click to reveal the sign.</p>
                
                <div className="my-6">
                    <span className="font-semibold text-stone-700 dark:text-stone-300 mr-4">Number of Cards:</span>
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                        {[3, 5, 10].map(count => (
                            <button
                                key={count}
                                type="button"
                                onClick={() => setFlashcardCount(count)}
                                className={`px-4 py-2 text-sm font-medium border transition-colors
                                    ${flashcardCount === count
                                        ? 'bg-teal-500 border-teal-500 text-white z-10 ring-2 ring-teal-300'
                                        : 'bg-white dark:bg-stone-700 border-stone-200 dark:border-stone-600 text-stone-900 dark:text-white hover:bg-stone-50 dark:hover:bg-stone-600'
                                    }
                                    first:rounded-l-lg last:rounded-r-lg
                                `}
                            >
                                {count}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleStartSession}
                    className="mt-4 w-full max-w-xs bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800 transition-colors text-lg shadow-lg"
                >
                    Start Practice
                </button>
            </div>
        )
    }

    if (deck.length === 0) {
        // This might briefly appear if WORD_DICTIONARY is empty or has no playable words
        return <div className="text-center p-8">Could not create a deck. Not enough playable words.</div>;
    }

    return (
        <div className="flex-grow flex flex-col items-center p-4 animate-fade-in-up">
             <div className="w-full max-w-xs flex justify-between items-center mb-4">
                <button onClick={handleFinishSession} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                    &larr; Back to Setup
                </button>
                <span className="font-bold text-stone-600 dark:text-stone-300">
                    Card {currentIndex + 1} / {deck.length}
                </span>
             </div>
            
            <div className="w-full max-w-xs aspect-square bg-stone-200 dark:bg-stone-700 rounded-lg overflow-hidden shadow-inner flex items-center justify-center cursor-pointer relative" onClick={restartFingerspelling}>
                {currentDisplaySign ? (
                    <img 
                      key={`${currentDisplaySign.imageUrl}-${displayIndex}`}
                      src={currentDisplaySign.imageUrl} 
                      alt={`Fingerspelling sign ${displayIndex + 1}`}
                      className="w-full h-full object-contain p-2 animate-fade-in-up"
                    />
                ) : (
                    <p>Error loading sign.</p>
                )}
                 <div className="absolute bottom-2 left-2 right-2 flex justify-center items-center gap-1">
                    {fingerspellingSigns.map((_, i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${displayIndex === i ? 'bg-indigo-500/80' : 'bg-stone-300/60 dark:bg-stone-900/60'}`}></div>
                    ))}
                </div>
            </div>

            <div className="w-full max-w-xs h-48 mt-6 flex items-center justify-center">
                {isRevealed ? (
                    <div className="w-full h-full bg-stone-100 dark:bg-stone-700 rounded-lg p-2 animate-fade-in-up">
                         <video
                          key={currentCard.mediaUrl}
                          src={currentCard.mediaUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-contain"
                          aria-label={`ASL sign for ${currentCard.term}`}
                        />
                    </div>
                ) : (
                     <button
                        onClick={() => setIsRevealed(true)}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-md"
                    >
                        Reveal Sign
                    </button>
                )}
            </div>
            
            <div className="w-full max-w-xs flex justify-between items-center mt-6">
                 <button onClick={handlePrevCard} disabled={currentIndex === 0} className="px-6 py-3 text-sm font-semibold rounded-md transition-colors bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 disabled:opacity-50 disabled:cursor-not-allowed">
                    Previous
                </button>

                {currentIndex < deck.length - 1 ? (
                    <button onClick={handleNextCard} className="px-6 py-3 text-sm font-semibold rounded-md transition-colors bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600">
                        Next
                    </button>
                ) : (
                    <button onClick={handleFinishSession} className="px-6 py-3 text-sm font-semibold rounded-md transition-colors bg-green-500 hover:bg-green-600 text-white">
                        Finish
                    </button>
                )}
            </div>
        </div>
    );
};


interface DictionaryZoneProps {
    points: number;
    collectedFacts: string[];
    cost: number;
    onBuyFact: () => void;
    onViewFact: (fact: string) => void;
    areAllFactsCollected: boolean;
    onStartTrueWildcard: () => void;
}

export const DictionaryZone: React.FC<DictionaryZoneProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<DictionaryTab>('abc-flash');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 18;

  const filteredEntries = useMemo(() => {
    const source = activeTab === 'alphabet' ? ALPHABET_DICTIONARY : WORD_DICTIONARY;
    if (!searchTerm) {
      return source;
    }
    return source.filter(entry =>
      entry.term.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }, [searchTerm, activeTab]);

  const totalPages = Math.ceil(filteredEntries.length / ITEMS_PER_PAGE);
  const paginatedEntries = useMemo(() => {
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      return filteredEntries.slice(start, end);
  }, [filteredEntries, currentPage]);

  const handleTabChange = (tab: DictionaryTab) => {
      setActiveTab(tab);
      setSearchTerm('');
      setCurrentPage(1);
  }
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const renderDictionaryContent = () => (
    <>
        <div className="relative mb-6">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder={`Search for a ${activeTab === 'alphabet' ? 'letter' : 'word'}...`}
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
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
        case 'abc-flash':
            return <ABCFlashcardZone />;
        case 'challenge':
            return <WildcardChallengeZone onStart={props.onStartTrueWildcard} />;
        case 'collectibles':
            return <CollectiblesZone {...props} />;
        case 'words':
        case 'alphabet':
        default:
            return renderDictionaryContent();
    }
  }

  return (
    <Card className="h-full flex flex-col min-h-[400px]">
      <h3 className="text-2xl font-bold mb-2 text-center text-stone-700 dark:text-stone-200">ASL Dictionary</h3>

      <div className="border-b border-stone-200 dark:border-stone-700 mb-6">
        <nav className="flex flex-wrap justify-center gap-x-2" aria-label="Dictionary categories">
            <TabButton label="ABC Flash" isActive={activeTab === 'abc-flash'} onClick={() => handleTabChange('abc-flash')} />
            <TabButton label="Challenge" isActive={activeTab === 'challenge'} onClick={() => handleTabChange('challenge')} />
            <TabButton label="Words" isActive={activeTab === 'words'} onClick={() => handleTabChange('words')} />
            <TabButton label="Alphabet" isActive={activeTab === 'alphabet'} onClick={() => handleTabChange('alphabet')} />
            <TabButton label="Collectibles" isActive={activeTab === 'collectibles'} onClick={() => handleTabChange('collectibles')} />
        </nav>
      </div>
      
      {renderContent()}
      
    </Card>
  );
};
