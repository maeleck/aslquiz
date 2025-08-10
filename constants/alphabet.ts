
import type { AlphabetSign, DictionaryEntry } from '../types';

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

export const ALPHABET_DICTIONARY: DictionaryEntry[] = ALPHABET.map(sign => ({
    term: sign.letter,
    mediaUrl: sign.imageUrl,
    mediaType: 'image'
}));

export const MAX_ALPHABET_LEVEL = 4;

export const WORDS_BY_LEVEL: { [key: number]: string[] } = {
  2: ["HI", "GO", "BE", "AS", "AT", "BY", "DO", "IF", "IN", "IS", "IT", "ME", "MY", "NO", "OF", "ON", "OR", "SO", "TO", "UP", "US", "WE"],
  3: ["CAT", "DOG", "SUN", "FUN", "RUN", "EAT", "ASK", "BUY", "CAN", "DAY", "FLY", "GET", "HEY", "HOW", "JOB", "LET", "MAN", "NEW", "NOT", "NOW", "OLD", "ONE", "OUT", "SAY", "SEE", "SHE", "THE", "TRY", "USE", "WAY", "WHO", "WHY", "YES", "YOU"],
  4: ["LOVE", "HOME", "WORK", "PLAY", "HELP", "GOOD", "BABY", "BACK", "BALL", "BANK", "BEAR", "BIRD", "BLUE", "BOAT", "BOOK", "BOTH", "CALL", "CARD", "CARE", "CITY", "COME", "COOK", "COOL", "DARK", "DATE", "DEAL", "DEAR", "DEEP", "DOOR", "DOWN", "DRAW", "DREAM", "DRIVE", "EASY", "EDGE", "ELSE", "EVEN", "EVER", "FACE", "FACT", "FAIL", "FALL", "FARM", "FAST", "FEEL", "FILE", "FILL", "FILM", "FIND", "FINE", "FIRE", "FISH"]
};
