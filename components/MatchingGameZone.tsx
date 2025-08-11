


import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card } from './Card';
import { ALPHABET, WORD_DICTIONARY } from '../constants';
import type { Category, AlphabetSign, DictionaryEntry, VocabTopic } from '../types';

interface GameCard {
  id: number;
  pairId: string; // The letter or term, e.g., 'A' or 'Eat'
  content: string; // The letter, word, or the media URL
  isMedia: boolean;
  mediaType: 'image' | 'video';
  isFlipped: boolean;
  isMatched: boolean;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const generateGameBoard = (category: Category, topic?: VocabTopic, words?: DictionaryEntry[]): GameCard[] => {
    if (category === 'vocabulary') {
        const source = words || WORD_DICTIONARY;
        const vocabItems = shuffleArray(source).slice(0, 8); // 8 pairs
        const textCards: GameCard[] = vocabItems.map((item: DictionaryEntry, i) => ({
            id: i * 2,
            pairId: item.term,
            content: item.term,
            isMedia: false,
            mediaType: 'video', // not used, but for type consistency
            isFlipped: false,
            isMatched: false,
        }));
        const mediaCards: GameCard[] = vocabItems.map((item: DictionaryEntry, i) => ({
            id: i * 2 + 1,
            pairId: item.term,
            content: item.mediaUrl,
            isMedia: true,
            mediaType: 'video',
            isFlipped: false,
            isMatched: false,
        }));
        return shuffleArray([...textCards, ...mediaCards]);
    }

    // Default to alphabet
    const signs = shuffleArray(ALPHABET).slice(0, 8);
    const letterCards: GameCard[] = signs.map((sign: AlphabetSign, i) => ({
        id: i * 2,
        pairId: sign.letter,
        content: sign.letter,
        isMedia: false,
        mediaType: 'image',
        isFlipped: false,
        isMatched: false,
    }));
    const signCards: GameCard[] = signs.map((sign: AlphabetSign, i) => ({
        id: i * 2 + 1,
        pairId: sign.letter,
        content: sign.imageUrl,
        isMedia: true,
        mediaType: 'image',
        isFlipped: false,
        isMatched: false,
    }));

    return shuffleArray([...letterCards, ...signCards]);
};

interface MatchingGameZoneProps {
    category: Category;
    topic?: VocabTopic;
    onGameComplete: (points: number) => void;
    words?: DictionaryEntry[];
}

const MemoizedCardFace: React.FC<{ card: GameCard }> = React.memo(({ card }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if(videoRef.current) {
            videoRef.current.playbackRate = 0.5;
        }
    }, [])

    if (card.isMedia) {
        if (card.mediaType === 'video') {
            return <video ref={videoRef} key={card.content} src={card.content} className="w-full h-full object-contain" autoPlay loop muted playsInline />;
        }
        return <img src={card.content} alt={`ASL sign for ${card.pairId}`} className="w-full h-full object-contain" />;
    }
    return <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 dark:text-stone-200 text-center break-all">{card.content}</span>;
});


export const MatchingGameZone: React.FC<MatchingGameZoneProps> = ({ category, topic, onGameComplete, words }) => {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const pointsAwarded = 15;

  const resetGame = useCallback(() => {
    setCards(generateGameBoard(category, topic, words));
    setFlippedCards([]);
    setMoves(0);
    setIsComplete(false);
  }, [category, topic, words]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.pairId === secondCard.pairId) {
        setCards(prev =>
          prev.map(card =>
            card.pairId === firstCard.pairId ? { ...card, isMatched: true, isFlipped: true } : card
          )
        );
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map((card, index) =>
              index === firstIndex || index === secondIndex ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
        }, 1200);
      }
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setIsComplete(true);
      onGameComplete(pointsAwarded);
    }
  }, [cards, onGameComplete, pointsAwarded]);


  const handleCardClick = (index: number) => {
    if (flippedCards.length >= 2 || cards[index].isFlipped) {
      return;
    }

    setMoves(prev => prev + 1);
    setFlippedCards(prev => [...prev, index]);
    setCards(prev =>
      prev.map((card, i) => (i === index ? { ...card, isFlipped: true } : card))
    );
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-stone-700 dark:text-stone-200">{topic?.label || ''} Matching Game</h3>
        <div className="text-lg font-semibold text-stone-500 dark:text-stone-400">Moves: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{moves}</span></div>
      </div>
      
      {isComplete ? (
        <div className="text-center py-16">
            <h4 className="text-3xl font-bold text-green-600 dark:text-green-500">Congratulations!</h4>
            <p className="mt-2 text-lg text-stone-600 dark:text-stone-300">You completed the game in {moves} moves and earned {pointsAwarded} points!</p>
            <button onClick={resetGame} className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg text-lg">Play Again</button>
        </div>
      ) : (
        <div className={`grid ${category === 'vocabulary' ? 'grid-cols-4' : 'grid-cols-4'} gap-2 sm:gap-4 aspect-square`}>
            {cards.map((card, index) => (
            <button
                key={card.id}
                onClick={() => handleCardClick(index)}
                disabled={flippedCards.length >= 2 || card.isFlipped}
                className="perspective-1000"
                aria-label={`Card ${index+1}`}
            >
                <div className={`relative w-full h-full transition-transform duration-500 preserve-3d ${card.isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Back of card */}
                <div className="absolute w-full h-full backface-hidden bg-indigo-500 hover:bg-indigo-600 rounded-lg flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                    ?
                </div>
                {/* Front of card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-stone-100 dark:bg-stone-700 rounded-lg flex items-center justify-center p-1 sm:p-2 shadow-lg overflow-hidden">
                    <MemoizedCardFace card={card} />
                </div>
                </div>
            </button>
            ))}
        </div>
      )}
    </Card>
  );
};
