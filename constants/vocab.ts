
import type { VocabTopic, DictionaryEntry } from '../types';
import { WORD_DICTIONARY } from './dictionary';

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

export const VOCAB_WORDS_BY_TOPIC: { [key: string]: string[] } = {
    basics: [
        "Admit", "Official", "Pull", "Performance", "Shoulder", "Sure", "Window", "Part", "Population", "Order", "Similar", "Interesting", "Message", "Interview", "Laugh", "Nature", "Chance", "Probably", "Alone", "Structure", "Last", "Expert", "Service", "Happen", "Usually", "Half", "Image", "Fail", "Large", "Vote", "Maybe", "Then", "Remove", "Return", "Seek", "Any", "Clear", "Fine", "Might", "Else", "Right", "Front", "Important", "Game", "Likely", "List", "Occur", "Business", "Collection", "Necessary", "Knowledge", "First", "On", "Bed", "Day", "Team", "Various", "Both", "Against", "Industry", "Art", "Different", "Social", "Toward", "Purpose", "Power", "Majority", "Finish", "Check", "Indicate", "Rule", "Over", "Through", "Pick", "Experience", "Fear", "Church", "Do", "Produce", "Certain", "Before", "Plan", "Your", "Place", "Bit", "Yes", "Many", "Medical", "Draw", "With", "From", "Positive", "Beautiful", "Sense", "Lead", "Single", "Size", "Room", "Can", "Blue", "Provide", "Fire", "Cultural", "Hit", "Perform", "Score", "Create", "Especially", "Not", "Magazine", "Until", "Economy", "Concern", "Specific", "Defense", "Own", "Technology", "However", "Next", "By", "Detail", "A", "Very", "Get", "Of", "Week", "Why", "Another"
    ],
    family: [
        "Owner", "Citizen", "Manager", "Employee", "Girl", "Relationship", "Boy", "Daughter", "Person", "Yourself", "Her", "Him"
    ],
    food: [
        "Eat", "Cup", "Kitchen", "Oil", "Hot", "Five", "Four"
    ],
    animals: [] // No animal signs in the current dictionary
};

const wordMap = new Map(WORD_DICTIONARY.map(e => [e.term, e]));

function getEntries(words: string[]): DictionaryEntry[] {
    return words.map(word => wordMap.get(word)).filter(Boolean) as DictionaryEntry[];
}

export const VOCAB_BY_TOPIC: { [key: string]: DictionaryEntry[] } = Object.keys(VOCAB_WORDS_BY_TOPIC).reduce((acc, key) => {
    acc[key] = getEntries(VOCAB_WORDS_BY_TOPIC[key]);
    return acc;
}, {} as { [key: string]: DictionaryEntry[] });
