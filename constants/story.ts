
import type { Story } from '../types';
import { PHRASES } from './phrases';

const phraseMap = new Map(PHRASES.map(p => [p.text, p]));

const requiredPhrases = [
    'Clear day',
    'Get a hot cup',
    'Return from business',
    'Your first game',
    'Do not laugh',
    'A beautiful relationship'
];

// Ensure all required phrases for the stories exist to prevent crashes.
const allPhrasesExist = requiredPhrases.every(p => phraseMap.has(p));

if (!allPhrasesExist) {
    console.error("One or more phrases required for stories are missing. Story mode may not work correctly.");
}


export const STORIES: Story[] = allPhrasesExist ? [
    {
        id: 'story-1',
        title: 'A Day Out',
        steps: [
            {
                id: 1,
                phrase: phraseMap.get('Clear day')!,
                prompt: 'What is the weather like?',
                choices: ['A storm is coming', 'The weather is nice', 'It is nighttime'],
                correctChoice: 'The weather is nice',
            },
            {
                id: 2,
                phrase: phraseMap.get('Get a hot cup')!,
                prompt: 'What is the person doing?',
                choices: ['Drinking cold water', 'Getting a hot drink', 'Eating ice cream'],
                correctChoice: 'Getting a hot drink',
            },
            {
                id: 3,
                phrase: phraseMap.get('Return from business')!,
                prompt: 'What happens at the end of the day?',
                choices: ['Going to work', 'Coming home from a trip', 'Visiting a friend'],
                correctChoice: 'Coming home from a trip',
            },
        ],
    },
    {
        id: 'story-2',
        title: 'A New Connection',
        steps: [
            {
                id: 1,
                phrase: phraseMap.get('Your first game')!,
                prompt: 'What are the people doing?',
                choices: ['Watching a movie', 'Playing a game together', 'Reading a book'],
                correctChoice: 'Playing a game together',
            },
            {
                id: 2,
                phrase: phraseMap.get('Do not laugh')!,
                prompt: 'What is the mood?',
                choices: ['Funny and lighthearted', 'Serious and focused', 'Sad and emotional'],
                correctChoice: 'Serious and focused',
            },
            {
                id: 3,
                phrase: phraseMap.get('A beautiful relationship')!,
                prompt: 'What is forming between them?',
                choices: ['An argument', 'A new friendship or romance', 'A business partnership'],
                correctChoice: 'A new friendship or romance',
            },
        ],
    },
] : [];
