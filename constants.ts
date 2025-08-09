import type { AlphabetSign, VocabTopic } from './types';

// The full alphabet, which will be used to create sets.
export const ALPHABET: AlphabetSign[] = [
  { letter: 'A', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/a.gif' },
  { letter: 'B', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/b.gif' },
  { letter: 'C', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/c.gif' },
  { letter: 'D', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/d.gif' },
  { letter: 'E', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/e.gif' },
  { letter: 'F', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/f.gif' },
  { letter: 'G', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/g.gif' },
  { letter: 'H', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/h.gif' },
  { letter: 'I', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/i.gif' },
  { letter: 'J', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/j.gif' },
  { letter: 'K', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/k.gif' },
  { letter: 'L', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/l.gif' },
  { letter: 'M', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/m.gif' },
  { letter: 'N', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/n.gif' },
  { letter: 'O', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/o.gif' },
  { letter: 'P', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/p.gif' },
  { letter: 'Q', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/q.gif' },
  { letter: 'R', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/r.gif' },
  { letter: 'S', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/s.gif' },
  { letter: 'T', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/t.gif' },
  { letter: 'U', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/u.gif' },
  { letter: 'V', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/v.gif' },
  { letter: 'W', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/w.gif' },
  { letter: 'X', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/x.gif' },
  { letter: 'Y', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/y.gif' },
  { letter: 'Z', imageUrl: 'https://www.lifeprint.com/asl101/fingerspelling/abc-gifs/z.gif' },
];

export const MAX_ALPHABET_LEVEL = 4;

export const WORDS_BY_LEVEL: { [key: number]: string[] } = {
  2: ["HI", "GO", "BE", "AS", "AT", "BY", "DO", "IF", "IN", "IS", "IT", "ME", "MY", "NO", "OF", "ON", "OR", "SO", "TO", "UP", "US", "WE"],
  3: ["CAT", "DOG", "SUN", "FUN", "RUN", "EAT", "ASK", "BUY", "CAN", "DAY", "FLY", "GET", "HEY", "HOW", "JOB", "LET", "MAN", "NEW", "NOT", "NOW", "OLD", "ONE", "OUT", "SAY", "SEE", "SHE", "THE", "TRY", "USE", "WAY", "WHO", "WHY", "YES", "YOU"],
  4: ["LOVE", "HOME", "WORK", "PLAY", "HELP", "GOOD", "BABY", "BACK", "BALL", "BANK", "BEAR", "BIRD", "BLUE", "BOAT", "BOOK", "BOTH", "CALL", "CARD", "CARE", "CITY", "COME", "COOK", "COOL", "DARK", "DATE", "DEAL", "DEAR", "DEEP", "DOOR", "DOWN", "DRAW", "DREAM", "DRIVE", "EASY", "EDGE", "ELSE", "EVEN", "EVER", "FACE", "FACT", "FAIL", "FALL", "FARM", "FAST", "FEEL", "FILE", "FILL", "FILM", "FIND", "FINE", "FIRE", "FISH"]
};

export const COST_PER_FACT = 25;
export const POINTS_PER_CORRECT_ANSWER = 5;

// Quotes about ASL and Deaf Culture
export const ASL_CULTURE_QUOTES: string[] = [
    "American Sign Language is a language of vision, a language of movement, a language of space.",
    "The hands are the voice of the Deaf.",
    "Deafness is not a disability, but a culture.",
    "ASL is not a universal language, but it is a universal concept.",
    "In American Sign Language, the face is the grammar.",
    "To be deaf is not to be silent. It is to be a part of a vibrant, visual world.",
    "The Deaf community is not a silent world. It is a world full of visual noise.",
    "What matters is not whether you can hear, but whether you can understand.",
    "Through the hands, the heart speaks.",
    "ASL is a dance that is performed with the hands.",
    "Our hands are our tongues, our bodies are our language.",
    "Deaf culture is a celebration of life, language, and community.",
    "The first permanent school for the deaf in the U.S., now the American School for the Deaf, was founded in 1817.",
    "ASL grammar is completely different from English, with its own rules for phonology, morphology, and syntax.",
    "Gallaudet University, located in Washington, D.C., is the only university in the world specifically for Deaf and hard of hearing students.",
    "Many Deaf people consider themselves part of a cultural and linguistic minority, not as disabled individuals.",
    "A 'name sign' in Deaf culture is a unique sign given to a person, serving as their name within the community."
];

export const VOCAB_TREE: VocabTopic[] = [
    {
        id: 'basics',
        label: 'Basics',
        cost: 0,
        iconId: 'graduation-cap',
        prerequisites: [],
    },
    {
        id: 'family',
        label: 'Family',
        cost: 50,
        iconId: 'users',
        prerequisites: ['basics'],
    },
    {
        id: 'food',
        label: 'Food',
        cost: 75,
        iconId: 'cake',
        prerequisites: ['basics'],
    },
    {
        id: 'animals',
        label: 'Animals',
        cost: 100,
        iconId: 'paw-print',
        prerequisites: ['family', 'food'],
    }
];