

export interface AlphabetSign {
  letter: string;
  imageUrl: string;
}

export type Category = 'alphabet' | 'phrases' | 'tree' | 'adventure' | 'dictionary' | 'story' | 'vocabulary';
export type SubCategory = 'quiz' | 'reversal-quiz' | 'time-attack' | 'reversal-time-attack' | 'matching' | 'abc-to-sign';
export type TreeSortMode = 'topic' | 'commonality' | 'wildcard';
export type Language = 'ASL' | 'JSL' | 'LSM' | 'LSF' | 'VSL';
export type AdventureSubCategory = 'world-map' | 'city-map' | 'job' | 'quest' | 'market';
export type DictionaryTab = 'abc-flash' | 'challenge' | 'words' | 'alphabet' | 'collectibles';

export interface VocabTopic {
    id: string;
    label: string;
    cost: number;
    iconId: 'graduation-cap' | 'users' | 'cake' | 'paw-print';
    prerequisites: string[];
}

export interface DictionaryEntry {
  term: string;
  mediaUrl?: string;
  mediaType: 'image' | 'video';
}

export interface Phrase {
  text: string;
  signs: DictionaryEntry[];
}

export interface StoryStep {
  id: number;
  phrase: Phrase;
  prompt: string;
  choices: string[];
  correctChoice: string;
}

export interface Story {
  id: string;
  title: string;
  steps: StoryStep[];
}

export interface VocabLevel {
  level: number;
  words: string[];
}

export interface StructuredVocabTopic {
  label: string;
  levels: VocabLevel[];
}

export interface StructuredVocab {
  [key: string]: StructuredVocabTopic;
}
