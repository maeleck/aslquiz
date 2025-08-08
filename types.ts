export interface AlphabetSign {
  letter: string; // For ASL: 'A', for JSL: 'あ', for Kanji: '日'
  imageUrl: string;
  romaji?: string; // For JSL: 'a'
}

export interface KanjiQuizQuestion {
  kanji: string;
  meaning: string;
  romaji: string;
  distractors: string[];
}

export type Language = 'ASL' | 'JSL' | 'Kanji';

export type JSLScript = 'Hiragana' | 'Katakana';

export type KanjiLevel = 1 | 2 | 3 | 4 | 5;