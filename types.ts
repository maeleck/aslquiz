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