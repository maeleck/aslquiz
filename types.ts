export interface AlphabetSign {
  letter: string;
  imageUrl: string;
}

export type Category = 'alphabet' | 'vocabulary' | 'phrases' | 'tree' | 'collectibles' | 'dictionary' | 'story';
export type SubCategory = 'quiz' | 'reversal-quiz' | 'time-attack' | 'reversal-time-attack' | 'matching';

export interface VocabTopic {
    id: string;
    label: string;
    cost: number;
    iconId: 'graduation-cap' | 'users' | 'cake' | 'paw-print';
    prerequisites: string[];
}

export interface DictionaryEntry {
  term: string;
  mediaUrl: string;
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